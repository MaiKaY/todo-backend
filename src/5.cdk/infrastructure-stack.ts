import { join } from 'path';

import {
    aws_apigateway as apigateway,
    aws_dynamodb as dynamodb,
    aws_events as events,
    aws_lambda as lambda,
    aws_lambda_nodejs as nodejslambda,
    aws_logs as logs,
    aws_sns as sns,
    aws_sns_subscriptions as snsSubscriptions,
    Duration,
    aws_route53 as route53,
    aws_route53_targets as route53targets,
    aws_certificatemanager as certificatemanager,
    Stack,
    StackProps
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface InfrastructureStackProps extends StackProps {
    readonly environment: 'Staging' | 'Production';
}

const nodeJsFunctionProps: nodejslambda.NodejsFunctionProps = {
    bundling: {
        externalModules: ['aws-sdk']
    },
    depsLockFilePath: join(__dirname, '../../package-lock.json'),
    timeout: Duration.seconds(10),
    memorySize: 1024,
    runtime: lambda.Runtime.NODEJS_14_X,
    logRetention: logs.RetentionDays.TWO_WEEKS
};

export class InfrastructureStack extends Stack {
    constructor(scope: Construct, id: string, props: InfrastructureStackProps) {
        super(scope, id, props);

        const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
            hostedZoneId: 'Z3RTWM8AWT41HI',
            zoneName: 'maikay.de'
        });
        const domainName = props.environment === 'Production' ? 'api.todo.maikay.de' : 'staging-api.todo.maikay.de';
        const certificate = new certificatemanager.Certificate(this, 'Certificate', {
            domainName,
            validation: certificatemanager.CertificateValidation.fromDns(hostedZone)
        });

        const monitoringTopic = new sns.Topic(this, 'MonitoringTopic');
        monitoringTopic.addSubscription(
            new snsSubscriptions.EmailSubscription('maik.schmidt.hl+github-todo@gmail.com')
        );

        const eventBus = new events.EventBus(this, 'EventBus', {
            eventBusName: props.stackName
        });

        eventBus.archive('EventBusArchive', {
            eventPattern: {
                account: [Stack.of(this).account]
            },
            retention: Duration.days(365)
        });

        const todoEventStore = new dynamodb.Table(this, 'TodoEventStore', {
            partitionKey: {
                name: 'userId',
                type: dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: 'eventDate',
                type: dynamodb.AttributeType.STRING
            },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
        });

        const api = new apigateway.RestApi(this, 'API', {
            domainName: {
                domainName,
                certificate,
                securityPolicy: apigateway.SecurityPolicy.TLS_1_2
            },
            disableExecuteApiEndpoint: true,
            defaultCorsPreflightOptions: {
                allowMethods: ['OPTIONS', 'POST'],
                allowHeaders: ['Content-Type', 'X-Amz-Date', 'x-amz-user-agent', 'Authorization'],
                allowCredentials: true,
                allowOrigins: ['*']
            }
        });

        new route53.ARecord(this, 'APIDNS', {
            zone: hostedZone,
            recordName: domainName,
            target: route53.RecordTarget.fromAlias(new route53targets.ApiGateway(api))
        });

        const apiLambda = new nodejslambda.NodejsFunction(this, 'Api', {
            ...nodeJsFunctionProps,
            entry: join(__dirname, '../4.bin/aws/api-gateway/api.ts'),
            environment: {
                TODO_EVENT_STORE: todoEventStore.tableName
            }
        });

        todoEventStore.grantReadWriteData(apiLambda);

        const graphql = api.root.addResource('graphql');
        graphql.addMethod('POST', new apigateway.LambdaIntegration(apiLambda), {
            authorizationType: apigateway.AuthorizationType.NONE
        });
    }
}
