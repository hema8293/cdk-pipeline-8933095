import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class CdkProject8933095Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ✅ S3 Bucket
    const myBucket = new s3.Bucket(this, 'MyS3Bucket8933095', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // ✅ DynamoDB Table
    const myTable = new dynamodb.Table(this, 'MyDynamoDB8933095', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'MyTable8933095',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // ✅ Lambda Function
    const myLambda = new lambda.Function(this, 'MyLambda8933095', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log("Lambda triggered!");
          return { statusCode: 200, body: "Hello from Lambda!" };
        };
      `),
      environment: {
        BUCKET_NAME: myBucket.bucketName,
      }
    });

    // Optional: Permissions
    myBucket.grantReadWrite(myLambda);
    myTable.grantReadWriteData(myLambda);
  }
}
