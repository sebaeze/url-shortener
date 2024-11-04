/*
*
*/
export const fetchUrlInfo = (longUrl) => {
    return new Promise((resOk,resErr)=>{
        try {
            const url = process.env.REACT_APP_API_SHORTENER+"/"+longUrl ;
            console.log("\n\n...fetching:: "+url+"\n\n");
            fetch(url)
                .then((resp)=>{
                    if ( resp.status>100 & resp.status<400 ){
                        return resp.json();
                    } else {
                        console.log("\n\n***ERROR::status: ",resp.status,"***\n\n");
                        throw new Error("Error fetch url: "+url+"***");
                    }
                })
                .then((data)=>{
                    console.log("***DATA: ",data,"***");
                    resOk(data);
                })
                .catch(resErr);
        } catch(err){
            resErr(err);
        }
    })
};
//
export const shortUrl = (longUrl) => {
    return new Promise((resOk,resErr)=>{
        try {
            //
            const url = process.env.REACT_APP_API_SHORTENER ;
            console.log("\n\n...POSTTTT:: "+url+"\n\n");
            //
            let currentUrl = window.location.href ;
            if ( currentUrl.substring(currentUrl.length-1)!=="/" ){currentUrl=currentUrl+"/";};
            const dataToStore = {
                long_url: longUrl,
                short_url: currentUrl+(Math.random() + 1).toString(36).substring(7),
                counter: 1
            }
            //
            fetch(url,{
                //mode: 'no-cors',
                method: "POST",
                body: JSON.stringify(dataToStore),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Credentials": "true"
                }
            })
                .then((resp)=>{
                    if ( resp.status>100 & resp.status<400 ){
                        return resp.json();
                    } else {
                        console.log("\n\n***ERROR::status: ",resp.status,"***\n\n");
                        throw new Error("Error fetch url: "+url+"***");
                    }
                })
                .then((data)=>{
                    console.log("***DATA: ",data,"***");
                    resOk(data);
                })
                .catch(resErr);
        } catch(err){
            resErr(err);
        }
    })
};
//