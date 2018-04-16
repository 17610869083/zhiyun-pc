import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import 'whatwg-fetch';
import {history} from '../../utils/history';
import './Login.less';

const FormItem = Form.Item;


class NormalLoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch(`http://117.78.52.164:8003/om/common/login/loginDo?action=login2`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    credentials: 'include',
                    body: "username=gzwxb&password=gzwxb"
                }).then(response => response.json())
                    .then((data) => {
                        if (data.code === 1) {

                            history.push('/home');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名！' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码！' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {/*{getFieldDecorator('remember', {*/}
                            {/*valuePropName: 'checked',*/}
                            {/*initialValue: true,*/}
                        {/*})(*/}
                            {/*<Checkbox>记住密码</Checkbox>*/}
                        {/*)}*/}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;