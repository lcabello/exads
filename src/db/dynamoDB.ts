import * as AWS from 'aws-sdk';

const AWSaccessKeyId = 'not-important';
const AWSsecretAccessKey = 'not-important';
const AWSregion = 'local';
const AWSendpoint = 'http://localhost:8000'


const dynamodb = new AWS.DynamoDB.DocumentClient({
  accessKeyId: AWSaccessKeyId,
  secretAccessKey: AWSsecretAccessKey,
  region: AWSregion,
  endpoint: AWSendpoint
});

export default dynamodb;
