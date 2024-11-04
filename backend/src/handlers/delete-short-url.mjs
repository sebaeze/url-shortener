/*

*/
import { DynamoDBClient, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
//
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
//
const tableName = process.env.URL_TABLE;
/*
*
*/
export const deleteShortUrlHandler = async (event) => {
    //
    if (event.httpMethod !== 'DELETE') {
        throw new Error(`DELETE method only, you tried: ${event.httpMethod} method.`);
    }
    //
    console.info('\n\n /deleteShortUrlHandler::received:', event);
    const body = JSON.parse(event.body);
    const response = {
        statusCode: 200,
        'headers': {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS, POST, DELETE",
            "Access-Control-Allow-Methods" : "GET, OPTIONS, POST, DELETE",
            "Access-Control-Allow-Headers" : "*"
        }
    };
    //
    try {
        //
        const params = {
            TableName : tableName,
            Key: {
                longUrl: {S: body.long_url||body.longUrl}
            }
        };
        params.Key.longUrl.S = String(params.Key.longUrl.S).trim().toLowerCase();
        //
        const data = await ddbDocClient.send(new DeleteItemCommand(params));
        console.log("Success - item deleted", data);
        //
    } catch (err) {
        console.log("***ERROR: ", err);
        response.statusCode = 500 ;
    }
    //
    return response;
    //
};
