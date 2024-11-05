/*
*
*/
import React, { useState } from 'react';
import { Card, Divider, Flex, Form, Input, Spin, Statistic } from 'antd';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { ArrowUpOutlined, LinkOutlined, LoadingOutlined } from '@ant-design/icons';

//
import { regexValidateUrl } from './util';
import { fetchUrlInfo, apiMakeUrlShorter, apiDeleteUrl } from './api';
//
let currentUrl = window.location.href ;
if ( currentUrl.substring(currentUrl.length-1)!=="/" ){currentUrl=currentUrl+"/";};
const pattern = regexValidateUrl();
//
const App = () => {
    //
    const [longUrlInput,setLongUrlInput] = useState("");
    const [validUrl,setValidUrl] = useState(false);
    const [flagLoading,setFlagLoading] = useState(false);
    const [urlInfo,setUrlInfo] = useState(undefined);
    const [searchMessage,setMearchMessage] = useState("");
    //
    const onChangeInputUrl = (argStr) => {
        if ( argStr!==longUrlInput ){
            setUrlInfo(undefined);
        }
        if ( !!pattern.test(argStr) ){
            setValidUrl(true);
        } else {
            setValidUrl(false);
        }
        setLongUrlInput(argStr);
    }
    //
    const onSearch = () => {
        //
        setFlagLoading(true);
        setMearchMessage("");
        //
        fetchUrlInfo(longUrlInput)
            .then((data)=>{
                const newData = {
                    shortUrl: data.shortUrl||data.short_url,
                    counter: data.counter||0,
                    longUrl: longUrlInput
                }
                if ( newData.counter===0 ){
                    setMearchMessage("Not Found");
                }
                setUrlInfo(newData)
                setFlagLoading(false);
            })
            .catch(()=>{
                setFlagLoading(false);
                setMearchMessage("Not Found");
            }) ;
    };
    //
    const onMakeshort = () => {
        setFlagLoading(true);
        apiMakeUrlShorter(longUrlInput)
            .then((data)=>{
                const newData = {
                    shortUrl: data.shortUrl||data.short_url,
                    counter: data.counter||0,
                    longUrl: longUrlInput
                }
                if ( newData.counter===0 ){
                    setMearchMessage("Not Found");
                }
                setUrlInfo(newData)
                setFlagLoading(false);
            })
            .catch(()=>{
                setFlagLoading(false);
            }) ;
    }
    //
    const onDeleteUrl = () => {
        setFlagLoading(true);
        apiDeleteUrl(longUrlInput)
            .then(()=>{
                setUrlInfo(undefined);
                setMearchMessage("Deleted");
                setFlagLoading(false);
            })
            .catch((errrr)=>{
                setFlagLoading(false);
            }) ;
    }
    //
    let outRender = <>
            <br/><br/><br/><br/><br/>
            <Row>
                <Col span={4}></Col>
                <Col span={19}>
                    <Row>
                        <h2 style={{fontSize:'48px'}}>Input an URL to make shorter:</h2>
                    </Row>
                    <Row>
                        <Form name="manage_url" 
                                span={24}
                                initialValues={{ remember: true }}
                                autoComplete="off"
                        >
                            <Form.Item name="long_url"
                                span={22}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input a valid URL',
                                    pattern: pattern
                                },
                                ]}
                            >
                                <Input style={{fontSize:'48px'}} onChange={(event)=>{onChangeInputUrl(event.target.value)}} />
                            </Form.Item>
                            {
                                flagLoading===true
                                    ?   <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                                    :   <Row>
                                            <Flex wrap gap="small" className="site-button-ghost-wrapper">
                                                <Button type="primary" ghost onClick={onSearch}>
                                                Search
                                                </Button>
                                                <Button type="dashed" style={{border:'1px solid orange'}} disabled={validUrl!==true} onClick={onMakeshort}>
                                                Make It Short
                                                </Button>
                                                <Button type="primary" danger ghost disabled={(validUrl!==true || urlInfo===undefined)}  onClick={onDeleteUrl} >
                                                Delete
                                                </Button>
                                            </Flex>
                                        </Row>
                            }
                            
                        </Form>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={3}></Col>
                <Col span={15}>
                {
                    (urlInfo!==undefined && urlInfo.shortUrl!==undefined)
                    ?   <Row>
                            <Divider />
                            <Col span={10} style={{textAlign:'center'}} >
                                <a icon={<LinkOutlined />} href={currentUrl+urlInfo.shortUrl} target="_blank" rel="noreferrer" color="#55acee" style={{fontSize:'24px',lineHeight:'90px'}} >
                                {currentUrl+urlInfo.shortUrl}
                                </a>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <Statistic
                                        title="Counter"
                                        value={urlInfo.counter||0}
                                        precision={0}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix=""
                                        />
                                </Card>
                            </Col>
                        </Row>
                    :   (longUrlInput!==undefined && longUrlInput.length>2 && validUrl===true)
                        ?   <Row>
                                <Col span={6}></Col>
                                <Col span={12}><h1>{searchMessage}</h1></Col>
                            </Row>
                        :   null
                }
                </Col>
            </Row>
        </> ;
        //
        return outRender ;
        //
};
//
export default App;
//