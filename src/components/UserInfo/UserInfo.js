import React from 'react';
import {Input} from 'antd';
import './UserInfo.less';

class UserInfo extends React.Component {
   constructor(props){
        super(props)
        this.state={
             tel:this.props.data.tel,
             email:this.props.data.email,
             oldPassword:'',
             newPassword:'',
             confirmPassword:''
        }
   }

    changeTelephone(e){
            const {value} = e.target;           
            this.props.data.tel=value;
            this.setState({
                tel:value
            })
           this.props.UserInfoMessage(this.props.data);
    }
    changeEmail(e){
        const {value} = e.target;
        this.props.data.email=value;
        this.setState({
                email:value
        })
        this.props.UserInfoMessage(this.props.data)
    }

    oldPassword(e){
        const {value} = e.target;
        const data = this.props.data;
        data.password=value;
        this.setState({
            oldPassword:value
        })
        this.props.UserInfoMessage(data)
    }

    newPassword(e){
        const {value} = e.target;
        this.props.data.newpassword=value;
        this.setState({
            newPassword:value
        })
        this.props.UserInfoMessage(this.props.data)
    }

    confirmPassword(e){
        const {value} = e.target;
        this.props.data.confirmpassword=value;
        this.setState({
            confirmPassword:value
        })
        this.props.UserInfoMessage(this.props.data)
    }
    render() {

        const {username} = this.props.data;

        return (
            <div className="user-info-detail">
                <div className="item">
                    <span className="label">用户名</span>
                    <span className="input">{username}</span>
                </div>
                <div className="item">
                    <span className="label">原密码</span>
                    <Input className="input"  type="password"
                     value={this.state.oldPassword}
                     onChange={this.oldPassword.bind(this)}
                     />
                     <span className="star" title="标*为必填项">*</span>
                </div>
                <div className="item">
                    <span className="label">新密码</span>
                    <Input className="input"  type="password"
                    value={this.state.newPassword}
                    onChange={this.newPassword.bind(this)}
                     />
                     <span className="star" title="标*为必填项">*</span>
                </div>
                <div className="item">
                    <span className="label">确认新密码</span>
                    <Input className="input"  type="password"
                    value={this.state.confirmPassword} 
                    onChange={this.confirmPassword.bind(this)}
                    />
                    <span className="star" title="标*为必填项">*</span>
                </div>
                <div className="item">
                    <span className="label">联系邮箱</span>
                    <Input className="input" value={this.state.email} onChange={this.changeEmail.bind(this)}/>
                    
                </div>
                <div className="item">
                    <span className="label">联系手机</span>
                    <Input className="input" value={this.state.tel} onChange={this.changeTelephone.bind(this)}/>
                   
                </div>
            </div>
        )
    }
}

export default UserInfo;