import { pipelines, aws_ssm as ssm, SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { InfrastructureStage } from './infrastructure-stage';

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const gitHubToken = ssm.StringParameter.valueForStringParameter(this, '/GITHUB/ACCESS_TOKEN');

        const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
            pipelineName: 'Todo-Pipeline',
            synth: new pipelines.CodeBuildStep('SynthStep', {
                input: pipelines.CodePipelineSource.gitHub('MaiKaY/todo-backend', 'main', {
                    authentication: SecretValue.plainText(gitHubToken)
                }),
                installCommands: ['npm install -g aws-cdk'],
                commands: ['npm ci', 'npm run test:unit', 'npm run build', 'npm ci', 'npx cdk synth']
            }),
            dockerEnabledForSelfMutation: true,
            dockerEnabledForSynth: true
        });

        const stagingInfrastructure = new InfrastructureStage(this, 'Staging', {
            environment: 'Staging'
        });
        pipeline.addStage(stagingInfrastructure);

        const productionInfrastructure = new InfrastructureStage(this, 'Production', {
            environment: 'Production'
        });
        pipeline.addStage(productionInfrastructure, {
            pre: [new pipelines.ManualApprovalStep('Approve')]
        });
    }
}
