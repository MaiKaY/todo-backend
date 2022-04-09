import AWS from 'aws-sdk';

export class AbstractDynamoDb {
    constructor(protected readonly documentClient = new AWS.DynamoDB.DocumentClient()) {}

    protected async query(
        query: AWS.DynamoDB.DocumentClient.QueryInput,
        partialResults: AWS.DynamoDB.DocumentClient.ItemList = []
    ): Promise<AWS.DynamoDB.DocumentClient.ItemList> {
        const { LastEvaluatedKey, Items } = await this.documentClient.query(query).promise();
        const results = [...partialResults, ...(Items as [])];
        if (LastEvaluatedKey && (!query.Limit || results.length < query.Limit)) {
            return this.query(
                {
                    ...query,
                    ExclusiveStartKey: LastEvaluatedKey
                },
                results
            );
        }

        // we have to use ".slice" because DynamoDb might return more results than the defined limit
        return query.Limit ? results.slice(0, query.Limit) : results;
    }

    protected async scan(
        scan: AWS.DynamoDB.DocumentClient.ScanInput,
        partialResults: AWS.DynamoDB.DocumentClient.ItemList = []
    ): Promise<AWS.DynamoDB.DocumentClient.ItemList> {
        const { LastEvaluatedKey, Items } = await this.documentClient.scan(scan).promise();
        const results = [...partialResults, ...(Items as [])];
        if (LastEvaluatedKey && (!scan.Limit || results.length < scan.Limit)) {
            return this.scan(
                {
                    ...scan,
                    ExclusiveStartKey: LastEvaluatedKey
                },
                results
            );
        }

        // we have to use ".slice" because DynamoDb might return more results than the defined limit
        return scan.Limit ? results.slice(0, scan.Limit) : results;
    }
}
