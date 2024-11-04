/*

*/
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
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
    //
    const body = JSON.parse(event.body);
    const params = {
        TableName : tableName,
        Key: {
            longUrl: body.long_url||body.longUrl
        },
        ReturnValues: 'ALL_OLD'
    };
    //
    try {
        const data = await ddbDocClient.delete(params);
        console.log("Success - item added or updated", data);
    } catch (err) {
        console.log("Error", err.stack);
    }
    //
    const response = {
        statusCode: 200,
        'headers': {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Headers" : "*"
        },
        body: JSON.stringify(body)
    };
    //
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
    //
};
