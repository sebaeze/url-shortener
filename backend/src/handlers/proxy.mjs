/*
*
*/
export const setCors = (event) => {
    //
    console.log("/proxyHandlers:: event: ",event) ;
    //
    return {
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
  }