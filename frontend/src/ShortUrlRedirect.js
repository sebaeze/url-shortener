/*
*
*/
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { apiUpdateCounter, fetchShortUrlInfo } from "./api";
import { Spin } from "antd";
import { Row, Col } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
//
const ShortUrlRedirect = () => {
    //
    const [searching,setSearching] = useState(true);
    const [url2redirect,setUrl2redirect] = useState("");
    const {shortUrl} = useParams();
    //
    useEffect(() => {
        console.log("...useEffect:shortUrl: ",shortUrl,";");
        fetchShortUrlInfo(shortUrl)
            .then((data)=>{
                //setUrl2redirect(data.longUrl);
                return apiUpdateCounter(data.longUrl) ;
            })
            .then((resp)=>{
                setTimeout(()=>{
                    setSearching(false);
                    window.location = resp.longUrl.indexOf("http")===-1 ? `https://${resp.longUrl}` : resp.longUrl ;
                },300)
            })
            .catch((err)=>{
                setSearching(false);
            })
    }, [shortUrl]);
    //
    return( 
        <>
        {
            searching===true
            ?   <Spin fullscreen={true} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            :   <>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <Row>
                        <Col span={6}></Col>
                        <Col span={8}><h1 style={{fontSize:'64px'}}>{url2redirect}</h1></Col>
                    </Row>
                </>
        }
        </>
    ) ;
    //
} ;
//
export default ShortUrlRedirect;
//