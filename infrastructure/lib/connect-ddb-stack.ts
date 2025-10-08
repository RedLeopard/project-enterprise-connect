import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

export class ConnectDdbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1) DynamoDB table to store call events
    const table = new ddb.Table(this, 'CallEventsTable', {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'contactId', type: ddb.AttributeType.STRING },
      sortKey: { name: 'ts', type: ddb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY, // DEV: destroys with `cdk destroy`
    });

    // 2) Lambda that writes items into DynamoDB
    const writerFn = new NodejsFunction(this, 'ConnectEventWriterFn', {
      entry: path.join(__dirname, '../src/connect-writer.ts'),
      runtime: lambda.Runtime.NODEJS_20_X,
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // 3) Allow Lambda to write to the table
    table.grantWriteData(writerFn);

    // 4) Helpful outputs
    new cdk.CfnOutput(this, 'WriterFunctionName', { value: writerFn.functionName });
    new cdk.CfnOutput(this, 'WriterFunctionArn',  { value: writerFn.functionArn });
    new cdk.CfnOutput(this, 'TableName',          { value: table.tableName });
  }
}
