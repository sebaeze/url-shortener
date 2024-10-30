/*
*
*/
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
//
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
//
const tableName = process.env.URL_TABLE;
console.log("\n\n tableName: ",tableName,"\n\n");
/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
export const getByIdHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  //
  console.info('received:', event);
  //
  const id = String(event.pathParameters.id).toLowerCase();
  //
  var params = {
    TableName : tableName,
    Key: { id: id },
  };
  //
  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    var item = data.Item;
  } catch (err) {
    console.log("Error", err);
  }
  //
  let outData = {
    message: "__procesando__",
    ...item
  }
  //
  const response = {
    statusCode: 200,
    body: JSON.stringify(outData)
  };

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
