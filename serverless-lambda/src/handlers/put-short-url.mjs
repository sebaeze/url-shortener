/*

*/
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { STATUS_URL } from './model/status.mjs';
//
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
//
const tableName = process.env.URL_TABLE;
/*
*
*/
export const putShortUrlHandler = async (event) => {
    //
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    //
    console.info('\n\n /putShortUrlHandler::received:', event);
    //
    const body = JSON.parse(event.body);
    const params = {
        TableName : tableName,
        Item: {
            id : body.id,
            shortUrl: body.short_url,
            counter: 1,
            status: STATUS_URL.ENABLE
        }
    };
    //
    try {
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added or updated", data);
    } catch (err) {
        console.log("Error", err.stack);
    }
    //
    const response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };
    //
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
    //
};