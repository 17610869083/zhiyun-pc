import React from 'react';
import './index.less';
import { Form, Icon, Input, Button, Checkbox, Col, Row, message} from 'antd';
import zhiyunImg from './zhiyun.png';
import vpImg from './vp.png';
import {api_login} from '../../services/api';
import request from '../../utils/request';
import {history} from '../../utils/history';
import CRCode from './crcode.jpg';
import IosApp from './iosapp.jpg';
import {setItem,getPasswordItem,setPasswordItem} from '../../utils/localStorage';
import {DARK,BLUES} from '../../utils/colors';

const FormItem = Form.Item;

class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            isCRCodeShow: false,
            userName:'',
            password:'',
            checked:false,
            isIosAppShow:false,
            type:'',
            IE:true
        }
    }
    componentWillMount(){    
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if(isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion <11 ){
                    this.setState({
                        IE:false
                    })
                    alert('请使用IE最新版本，以获得最好的体验')
                }
            } else if(isEdge) {
                return 'edge';//edge
            } else if(isIE11) {
                return 11; //IE11  
            }else{
                return -1;//不是ie浏览器
            }
        
    }
    componentDidMount(){
           const userInfo = getPasswordItem('userPassword');
           if(userInfo!==null){
               this.setState({
                  userName:userInfo.username,
                  password:userInfo.password,
                  checked:true
               })
           }
           setItem('theme',{
            topColor: {
                backgroundColor: BLUES
            },
            bottomColor: {
                backgroundColor: DARK
            },
            textColor:{
                 color:'#fff'
            }
        });
    }
    handleSubmit (e){
        e.preventDefault();
        // if(this.state.IE){
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const userName = values.username;
                const password = values.password;
                this.setState({
                    userName:userName,
                    password:password
                })
                request(api_login + `&username=${userName}&password=${password}`).then((res) => {
                    if (res.data.code === 1) {
                        message.success(res.data.msg);
                        history.push('/home');
                    } else {
                        message.warning(res.data.msg);
                    }
                })
            }
        });
        // }
    };

    triggerCRCodeShow (){
        this.setState({
            isCRCodeShow: !this.state.isCRCodeShow,

        })
    };
    triggerIosAppShow (){
        this.setState({
            isIosAppShow: !this.state.isIosAppShow,
        })
    };
    onChange (e) {           
            const {checked} = e.target;
            this.setState({
                checked:checked
            })
            if(checked){
                setPasswordItem('userPassword',
                {'username':this.state.userName,
                'password':this.state.password})
            }else{
                localStorage.removeItem('userPassword');
            }
    }

    userChange(e){
           const {value} = e.target;
           this.setState({
               userName:value
           })
    }
    passwordChange(e){
            const {value} = e.target;
            this.setState({
                password:value
            })
    }
    show(){}
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-page">
            
                <div className="login-box">
                    <div className="header">
                        <div className="img-wrapper">
                            <img src={zhiyunImg} alt="zhiyun"/>
                        </div>
                        <div className="title">
                            {/* <h2>知云网大数据舆情云平台</h2> */}
                            <h2>知云网大数据云平台</h2>
                        </div>
                    </div>
                    <div className="login">
                        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                            <FormItem className="username-from">
                            {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入您的用户名！' }],
                                    initialValue:this.state.userName
                                })(
                                    <Input placeholder="用户名" 
                                     onChange={this.userChange.bind(this)}
                                    />
                                )}     
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入您的密码！' }],
                                    initialValue:this.state.password
                                })(
                                    <Input type="password" placeholder="密  码" 
                                    onChange={this.passwordChange.bind(this)}
                                    />
                                )}
                            </FormItem>
                            <FormItem className="check-verify" style={{display: 'none'}}>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        {getFieldDecorator('verify', {
                                        })(
                                            <Input type="password" placeholder="验证码" />
                                        )}
                                    </Col>
                                    <Col span={9}>
                                        <img src={vpImg} alt="verify code"/>
                                    </Col>
                                    <Col span={3} className="reloading">
                                        <Icon type="reload" style={{fontSize: '16px'}} className="icon-setting"/>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem className="remember-password">
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: this.state.checked,
                                })(
                                    <Checkbox onChange={this.onChange.bind(this)}>记住密码</Checkbox>
                                )}
                            </FormItem>
                            <FormItem className="submit">
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <div className="open-app">
                   <div>
                    <div className={this.state.isCRCodeShow ? 'cr-code' : 'cr-code-hide'} >
                        <img src={CRCode} alt="CRCode" className="img"/>
                    </div>
                    <Button className="open-app-btn" onClick={this.triggerCRCodeShow.bind(this)}>下载安卓APP</Button>
                    </div>
                     <div>
                     <div className={this.state.isIosAppShow ? 'cr-code' : 'cr-code-hide'} >
                        <img src={IosApp} alt="CRCode" className="img"/>
                    </div>
                    <Button className="open-app-btn" onClick={this.triggerIosAppShow.bind(this)}>下载iOS APP</Button>
                     </div>  
                </div>
            </div>
        )
    }
}

export default Form.create()(LoginPage);