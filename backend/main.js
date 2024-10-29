/*
*
*/
var ApiBuilder = require('claudia-api-builder'),
	// AWS = require('aws-sdk'),
	api = new ApiBuilder();
//	dynamoDb = new AWS.DynamoDB.DocumentClient();
//
module.exports = api;
//
api.get('/hola', function (request) {
	'use strict';
  console.log("...request: ",request,";");
	// post-process dynamo result before returning
	return "____/hola____";
});
//
/*
exports.handler=function (event, context) {
	'use strict';
	console.log(event);
	context.succeed('__mandale fruta___');
};
*/
/*
const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');
//
async function connectToDynamoDb() {
  //
  console.log("\n\n voy a CreateTableCommand:: ");
  //
  const client = new DynamoDBClient();
  const command = new CreateTableCommand({
    TableName: 'URL',
    KeySchema: [
      { AttributeName: 'LONG_URL', KeyType: 'HASH' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'LONG_URL', AttributeType: 'S' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'SHORT_URL', AttributeType: 'S' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'CREATION_TS', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });
  //
  let result = await client.send(command);
  console.log("\n\nresult: ",result,"\n\n");
  //
}
*/
/*
exports.handler = async (event, context) => {
  try {
    await connectToDynamoDb();
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
}
*/