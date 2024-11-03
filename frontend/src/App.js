/*
*
*/
import React from 'react';
import { Form, Input } from 'antd';
//
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
//
// //type: new RegExp("/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/","i")
const App = () => (
  <Form name="manage_url" 
        labelCol={{ span: 8, }}
        wrapperCol={{ span: 16, }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
  >
    <Form.Item label="Input URL....." name="long_url"
      rules={[
        {
          required: true,
          message: 'Please input a real URL',
        },
      ]}
    >
      <Input />
    </Form.Item>

  </Form>
);
export default App;