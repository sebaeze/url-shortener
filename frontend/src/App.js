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
import { fetchUrlInfo, shortUrl } from './api';
//
const pattern = regexValidateUrl();
//
const App = () => {
    //
    document.title="URL Shortener";
    //
    const [longUrlInput,setLongUrlInput] = useState("");
    const [validUrl,setValidUrl] = useState(false);
    const [flagLoading,setFlagLoading] = useState(false);
    const [urlInfo,setUrlInfo] = useState(undefined);
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
        setFlagLoading(true);
        fetchUrlInfo(longUrlInput)
            .then((data)=>{
                console.log("****afterfetch:: ",data,"***");
                setUrlInfo(data)
                setFlagLoading(false);
            })
            .catch(()=>{
                setFlagLoading(false);
            }) ;
    };
    //
    const onMakeshort = () => {
        setFlagLoading(true);
        shortUrl(longUrlInput)
            .then((data)=>{
                console.log("****after_shortUrl:: ",data,"***");
                setUrlInfo(data)
                setFlagLoading(false);
            })
            .catch(()=>{
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
                        <h2 style={{fontSize:'64px'}}>Input an URL to make shorter:</h2>
                    </Row>
                    <Row>
                        <Form name="manage_url" 
                                span={24}
                                initialValues={{ remember: true }}
                                autoComplete="off"
                                //onFinish={onSearch}
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
                                                <Button type="primary" danger ghost disabled={(validUrl!==true || urlInfo===undefined)}>
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
                    urlInfo===undefined
                    ?   null
                    :   <Row>
                            <Divider />
                            <Col span={10} style={{textAlign:'center'}} >
                                <a icon={<LinkOutlined />} href={urlInfo.shortUrl} target="_blank" rel="noreferrer" color="#55acee" style={{fontSize:'24px',lineHeight:'90px'}} >
                                {urlInfo.shortUrl}
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
                }
                </Col>
            </Row>
        </> ;
        //
        return outRender ;
        //
};
export default App;