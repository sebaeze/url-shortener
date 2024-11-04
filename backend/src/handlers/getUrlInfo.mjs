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
  const longUrl = String(event.pathParameters.id||event.pathParameters.longUrl||event.pathParameters.long_url).toLowerCase();
  let params = {
    TableName : tableName,
    Key: { longUrl: longUrl },
  };
  params.Key.longUrl = String(params.Key.longUrl).trim().toLowerCase();
  //
  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    var item = data.Item;
  } catch (err) {
    console.log("Error", err);
  }
  //
  let outData = {
    counter: 0,
    ...item,
    longUrl
  }
  //
  const response = {
    statusCode: 200,
    'headers': {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Allow" : "*",
        "Access-Control-Allow-Methods" : "*",
        "Access-Control-Allow-Headers" : "*"
    },
    body: JSON.stringify(outData)
  };
  //
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
  //
}
//