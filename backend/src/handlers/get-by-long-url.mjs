/*
*
*/
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
//
const client = new DynamoDBClient();
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.URL_TABLE;
/*
*
*/
export const getByLongUrlHandler = async (event) => {
  //
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  //
  console.log('\n\n\n **** received:', event," ****\n\n");
  //
  const longUrl = String(event.pathParameters.longUrl).toLowerCase();
  //
  var params = {
    TableName : tableName,
    Key: { longUrl: longUrl },
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
  //
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
  //
}
//