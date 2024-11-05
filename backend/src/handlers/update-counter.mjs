/*

*/
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
//
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.URL_TABLE;
/*
*
*/
export const updateCounterHandler = async (event) => {
    //
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    //
    console.info('\n\n /updateCounterHandler::received:', event);
    const body = JSON.parse(event.body);
    //
    try {
        //
        const params = {
            TableName: tableName,
            Key: {
              longUrl: {S: body.long_url||body.longUrl},
            },
            UpdateExpression: "SET #counter = if_not_exists(#counter, :initial) + :num",
            ExpressionAttributeNames:{
                "#counter": "counter"
            },
            ExpressionAttributeValues: {
              ":num": {N: "1"},
              ":initial": {N: "1"},
            },
        } ;
        //
        params.Key.longUrl.S = String(params.Key.longUrl.S).trim().toLowerCase();
        console.log("....params: ",params,";***");
        //
        const result = await ddbDocClient.send(new UpdateItemCommand(params));
        //
        console.log("....UpdateItemCommand::result: ",result,";");
        //
    } catch (err) {
        console.log("***ERROR::catch:", err);
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
    return response;
    //
};