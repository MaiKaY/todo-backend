import {
    aws_cloudwatch as cloudwatch,
    aws_cloudwatch_actions as cloudwatchActions,
    aws_sns as sns,
    aws_sqs as sqs,
    Duration
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface DLQProps {
    notificationTopic: sns.Topic;
}

export class DLQ extends Construct {
    public readonly queue: sqs.Queue;

    constructor(scope: Construct, id: string, props: DLQProps) {
        super(scope, id);
        this.queue = new sqs.Queue(this, id);

        const alarm = new cloudwatch.Alarm(this, `${id}Alarm`, {
            metric: new cloudwatch.Metric({
                namespace: 'AWS/SQS',
                metricName: 'ApproximateNumberOfMessagesVisible',
                dimensionsMap: {
                    QueueName: this.queue.queueName
                },
                statistic: 'Sum',
                period: Duration.minutes(5)
            }),
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            evaluationPeriods: 1,
            threshold: 1
        });

        alarm.addAlarmAction(new cloudwatchActions.SnsAction(props.notificationTopic));
    }
}
