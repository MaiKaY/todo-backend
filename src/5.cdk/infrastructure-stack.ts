import { join } from 'path';

import {
    aws_apigateway as apigateway,
    aws_dynamodb as dynamodb,
    aws_lambda as lambda,
    aws_lambda_nodejs as nodejslambda,
    aws_logs as logs,
    aws_sns as sns,
    aws_sns_subscriptions as snsSubscriptions,
    Duration,
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

        const monitoringTopic = new sns.Topic(this, 'MonitoringTopic');
        monitoringTopic.addSubscription(
            new snsSubscriptions.EmailSubscription('maik.schmidt.hl+github-todo@gmail.com')
        );

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
            defaultCorsPreflightOptions: {
                allowMethods: ['OPTIONS', 'POST'],
                allowHeaders: ['Content-Type', 'X-Amz-Date', 'x-amz-user-agent', 'Authorization'],
                allowCredentials: true,
                allowOrigins: ['*']
            }
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
