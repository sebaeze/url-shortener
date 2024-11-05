/*
*
*/
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
} ;
//
export const fetchUrlInfo = (longUrl) => {
    return new Promise((resOk,resErr)=>{
        try {
            const url = process.env.REACT_APP_API_SHORTENER+"/"+longUrl ;
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
                    resOk(data);
                })
                .catch(resErr);
        } catch(err){
            resErr(err);
        }
    })
};
//
export const fetchShortUrlInfo = (shortUrl) => {
    return new Promise((resOk,resErr)=>{
        try {
            const url = process.env.REACT_APP_API_SHORTENER+"/shortUrl/"+shortUrl ;
            fetch(url)
                .then((resp)=>{
                    if ( resp.status>100 & resp.status<400 ){
                        return resp.json();
                    } else {
                        console.log("\n\n***ERROR::status: ",resp.status,"***\n\n");
                        throw new Error("Error fetch shortUrl: "+url+"***");
                    }
                })
                .then((data)=>{
                    resOk(data);
                })
                .catch(resErr);
        } catch(err){
            resErr(err);
        }
    })
};
//
export const apiMakeUrlShorter = (longUrl) => {
    return new Promise((resOk,resErr)=>{
        try {
            //
            const url = process.env.REACT_APP_API_SHORTENER ;
            const dataToStore = {
                long_url: longUrl,
                short_url: (Math.random() + 1).toString(36).substring(7),
                counter: 1
            }
            //
            fetch(url,{method: "POST", headers: HEADERS, body: JSON.stringify(dataToStore)})
                .then((resp)=>{
                    if ( resp.status>100 & resp.status<400 ){
                        return resp.json();
                    } else {
                        console.log("\n\n***ERROR::status: ",resp.status,"***\n\n");
                        throw new Error("Error fetch url: "+url+"***");
                    }
                })
                .then((data)=>{
                    resOk(data);
                })
                .catch(resErr);
        } catch(err){
            resErr(err);
        }
    })
};
//
export const apiDeleteUrl = (longUrl) => {
    return new Promise((resOk,resErr)=>{
        try {
            //
            const url = process.env.REACT_APP_API_SHORTENER ;
            const dataToStore = { long_url: longUrl }
            //
            fetch(url,{method: "DELETE", headers: HEADERS, body: JSON.stringify(dataToStore)})
                .then((resp)=>{
                    if ( resp.status>100 & resp.status<400 ){
                        return {...dataToStore,message:"deleted"};
                    } else {
                        console.log("\n\n***ERROR::status: ",resp.status,"***\n\n");
                        throw new Error("Error fetch url: "+url+"***");
                    }
                })
                .then((data)=>{
                    resOk(data);
                })
                .catch(resErr);
        } catch(err){
            resErr(err);
        }
    })
};
//
export const apiUpdateCounter = (argLongUrl) => {
    return new Promise((resOk,resErr)=>{
        try {
            //
            const url = process.env.REACT_APP_API_SHORTENER+"/counter" ;
            fetch(url,{method: "POST", headers: HEADERS, body: JSON.stringify({ long_url: argLongUrl })})
                .then((resp)=>{
                    if ( resp.status>100 & resp.status<400 ){
                        return resp.json();
                    } else {
                        console.log("\n\n***ERROR::status: ",resp.status,"***\n\n");
                        throw new Error("Error fetch url: "+url+"***");
                    }
                })
                .then((data)=>{
                    resOk({...data, longUrl: argLongUrl});
                })
                .catch(resErr);
        } catch(err){
            resErr(err);
        }
    })
};
//