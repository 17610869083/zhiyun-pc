import React from 'react';
import {connect} from 'react-redux';
import {Input, Menu, Dropdown, Modal, Avatar, Badge, Popover,message} from 'antd';
import {setItem, getItem} from '../../utils/localStorage';
import {history} from '../../utils/history';
import request from '../../utils/request';
import {api_logout,api_revise_userinfo,api_get_userinfo,api_homepage_message} from '../../services/api';
import './ZHeader.less';
import user from '../../assets/icon-img/user.png';
import UserInfo from '../UserInfo/UserInfo';
import {changeTheme,  getUserInfo} from '../../redux/actions/actions';
import {opinionSearchRequested,searchKeywordSync,homeModule} from '../../redux/actions/createActions';
import ChangeTheme from '../ChangeTheme/ChangeTheme';
import logo from '../../assets/img/newLogo.png';
import {Link} from 'react-router-dom';
const confirm = Modal.confirm;
class Zheader extends React.Component {
    constructor() {
        super();
        this.state = {
            userInfoVisible: false,
            themeVisible: false,
            visible: false,
            userInfoMessage:{},
            type:'',
            itemsOne: [
                // { text: '韩语监测', color: '#f7b55d', href: '/multilingual/1', hrefType: 'history'},
                // { text: '日语监测', color: '#4ba9eb', href: '/multilingual/2', hrefType: 'history'},
                // { text: '维语监测', color: '#6296f1', href: '/multilingual/3', hrefType: 'history'},
                // { text: '藏语监测', color: '#4ba9eb', href: '/multilingual/4', hrefType: 'history'},
                // {text: '英语监测', color: '#04c0b3',href:'javascript();'},
                { text: '民情管理', color: '#4ba9eb',href:'/allopinion/allopiniondetail',hrefType:'http'},
                { text: '网站监测预警', color: '#4ba9eb', href: 'https://114.242.25.234:38447/', hrefType: 'login'},
                { text: '网站安全治理', color: '#6296f1', href: 'https://119.88.190.68', hrefType: 'login'}, // ***
                { text: '网站空间探测', color: '#04c0b3', href: 'https://119.88.190.71/', hrefType: 'login'},
                {text: '网站安全防护', color: '#4ba9eb', href: '/competitiveIntelligence', hrefType: 'http'},
                { text: '僵木蠕监测', color: '#4ba9eb', href: '/safetyprotection', hrefType: 'http'},
                { text: '预警通报', color: '#f7b55d', href: '/alertnotifications', hrefType: 'http'}
                
            ],
            itemsTwo: [
                {text: '流量监测引擎', color: '#4ba9eb', href: 'https://119.88.190.68/', hrefType: 'login'}, // 图标   
                { text: '流量监测大屏', color: '#4ba9eb', href: 'http://119.88.190.68:3000/', hrefType: 'login'}, // 图标
                { text: '通报处置', color: '#4ba9eb', href: '/disposal', hrefType: 'http'} ,
                { text: '智慧党建', color: '#4ba9eb', href: '/partybuilding', hrefType: 'http'},
                { text: '行业资讯', color: '#4ba9eb', href: 'http://119.90.61.155/om3', hrefType: 'login'},
                { text: '竞争情报', color: '#f7b55d', href: 'http://119.90.61.155/om3', hrefType: 'login'},
                {text: '决策预判', color: '#4ba9eb',href: 'http://119.90.61.155/om3', hrefType: 'login'}
         
            ],
            itemsThree: [
                // { text: '招投标', color: '#6296f1', href: '/bidding/information', hrefType: 'http'},
                { text: '企业画像', color: '#4ba9eb', href: 'http://119.90.61.155/om3', hrefType: 'login'},
                { text: '人物画像', color: '#6296f1', href: 'http://119.90.61.155/om3', hrefType: 'login'},
                { text: '微信围栏', color: '#4ba9eb', href: '/wechatfence', hrefType: 'http'},
                { text: '私有云盘', color: '#04c0b3', href: '/clouddisk', hrefType: 'http'},
                { text: '华知云平台', color: '#6296f1', href: 'http://119.90.158.98:8888/auth/login/', hrefType: 'login'}
            ]
        }
    }
    componentDidMount(){
        this.props.getUserInfo("");
    }
    // 显示隐藏用户信息模块
    showUserInfoModal() {
        this.setState({
            userInfoVisible: true,
        });
        this.props.getUserInfo("");
    }
    handleUserInfoOk() {    
        let userMessage=this.state.userInfoMessage;
        request(api_get_userinfo).then(res=>{
            if(userMessage.id===undefined){
                message.error('未做任何修改');
                return;
          }else if (res.data.password!==userMessage.password){
            message.error('请确认原密码是否相同密码');
            return;
          }
          else if (userMessage.newpassword===undefined){
                message.error('请添加新密码');
                return;
          }else if (userMessage.confirmpassword===undefined || userMessage.newpassword!==userMessage.confirmpassword){
                message.error('密码不一致，请重新输入');
                return;         
          }else{
              request(api_revise_userinfo,{
                 method: 'POST',
                  headers: {
                       "Content-Type": "application/x-www-form-urlencoded"
                 }, 
                 body:`nickname=${userMessage.nickname}&password=${userMessage.newpassword}&tel=${userMessage.tel}&email=${userMessage.email}`
             }).then(res=>{
                 if(res.data.code===1){
                 message.success(res.data.msg);
                    this.setState({
                        ModalText: 'The modal will be closed after two seconds',
                        userInfoVisible: false,
                    });
                    history.push('/login')
                }
              })
             }
        })



    }
    handleUserInfoCancel() {
        this.setState({
            userInfoVisible: false,
        });
    }

    // 显示隐藏主题颜色设置模块
    showThemeModal() {
        this.setState({
            themeVisible: true,
        });
    }
    handleThemeOk() {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            setItem('theme', this.props.themeColor);
            this.setState({
                themeVisible: false,
                confirmLoading: false
            });
        }, 500);
    }
    handleThemeCancel() {
        const theme = getItem('theme');
        this.props.onChangeTheme(theme);
        this.setState({
            themeVisible: false,
        });
    }

    // 点击logo返回首页
    goBackIndex() {
        history.push('/home')
    }

    // 点击头部搜索框
    handleSearchContent(value) {
        const param = {
            seltype: "content",
            keyword: value
        };
        this.props.opinionSearchRequest(param);
        this.props.searchKeywordSync({seltype: "content",
        keyword: value,type:1});
        history.push({
               pathname:"/allopinion",
               search:'type=search'
        });

    }
    // 登出系统
    logoutSystem(data) {
        if(data.key === '5'){
        confirm({
            title: '您确定要退出系统吗？',
            content: '退出系统',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                request(api_logout).then((res) => {
                    history.push("/login");
                    message.success('您已退出了系统！');
                })
            },
            onCancel() {
                message.info('您取消了操作！');
            },
          });
        }
    }

    // 消息列表
    hide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    //修改后的用户信息
    UserInfoMessage(data){
          this.setState({
                userInfoMessage:data
          })
    }

    showlayoutModal(){
         history.push('/allopinion/customhome')
    }

    handleLayoutCancel(){
          request(api_homepage_message)
          .then(res => {
             if(res.data){
                 this.props.homeModule(res.data); 
             }
            })
    }
    goBackIndex(){

    }

    changeNav(type){
          this.setState({
            type:type
          })
    }
    render() {
        const {onChangeTheme, userInfo,themeColor} = this.props;
        const { userInfoVisible, themeVisible, confirmLoading} = this.state;
        const menu = (
            <Menu onClick={this.logoutSystem.bind(this)}>
                <Menu.Item key="0">
                    <span onClick={this.showUserInfoModal.bind(this)}>&nbsp;&nbsp;&nbsp;&nbsp;用户信息&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Menu.Item>
                {/*<Menu.Item key="1">*/}
                    {/*<span> &nbsp;&nbsp;&nbsp;&nbsp;首页布局&nbsp;&nbsp;&nbsp;&nbsp; </span>*/}
                {/*</Menu.Item>*/}
                <Menu.Item key="2">
                    <span onClick={this.showThemeModal.bind(this)}>&nbsp;&nbsp;&nbsp;&nbsp;颜色设置&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Menu.Item>
                {/* <Menu.Item key="3">
                    <span onClick={this.showlayoutModal.bind(this)}>&nbsp;&nbsp;&nbsp;&nbsp;首页布局&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Menu.Item> */}
                <Menu.Divider />
                <Menu.Item key="5"><span>&nbsp;&nbsp;&nbsp;&nbsp;退出</span></Menu.Item>
            </Menu>
        );
        const itemMenuOne =this.state.itemsOne.map((item,index) => {
                      return  <Menu.Item key={index} style={{textAlign:'left',width:'130px'}}>
                              {item.hrefType === 'login' ? <a target="_blank" href={item.href}>{item.text}</a>:
                              <Link to={item.href} >{item.text}</Link>}
                            </Menu.Item>
                    });
        const itemMenuTwo =this.state.itemsTwo.map((item,index) => {
            return  <Menu.Item key={index} style={{textAlign:'left',width:'130px'}}>
                    {item.hrefType === 'login' ? <a target="_blank" href={item.href}>{item.text}</a>:
                    <Link to={item.href} >{item.text}</Link>}
                    </Menu.Item>
            });
            const itemMenuThree =this.state.itemsThree.map((item,index) => {
            return  <Menu.Item key={index} style={{textAlign:'left',width:'130px'}}>
                    {item.hrefType === 'login' ? <a target="_blank" href={item.href}>{item.text}</a>:
                    <Link to={item.href} >{item.text}</Link>}
                    </Menu.Item>
            });
        // 消息列表
        const PoverMenu = (
            <div>
                <ul>
                </ul>
            </div>
        );
        const moreMenu = <div style={{marginTop:'16px',display:'flex',width:'100px'}}>
                         <Menu> 
                         {itemMenuOne}
                         </Menu>
                         <Menu> 
                         {itemMenuTwo}
                         </Menu>
                         <Menu> 
                         {itemMenuThree}
                         </Menu>
                         </div>;                 
        return (
            <div className="z-header" style={{backgroundColor:themeColor.topColor.backgroundColor}}>
                <div className="top">
                    <div className="left" onClick={this.goBackIndex.bind(this)}>
                         <img src={logo} alt="logo" className="logo" onClick={this.goBackIndex.bind(this)}/>
                         {/* <span className="name" style={{color:'#fff'}}>{userInfo.sysname}</span> */}
                    </div>
                    <div className="right">
                        <ul className="nav-bar">
                          <li onClick={this.changeNav.bind(this,'home')} className={this.state.type !== 'home' ?'normal':'active'}><Link to="/home">首页</Link></li>
                          <li onClick={this.changeNav.bind(this,'allopinion')} className={this.state.type !== 'allopinion' ?'normal':'active'}><Link to="/allopinion/allopiniondetail">舆情监测</Link></li>
                          {/* <li onClick={this.changeNav.bind(this,'evidence')} className={this.state.type !== 'evidence' ?'normal':'active'}><Link to="/evidence">互联网取证</Link></li>
                          <li onClick={this.changeNav.bind(this,'upreport')} className={this.state.type !== 'upreport' ?'normal':'active'}><Link to="/upreport">上报平台</Link></li>
                          <li onClick={this.changeNav.bind(this,'guide')} className={this.state.type !== 'guide' ?'normal':'active'}><Link to="/guide">网评管理</Link></li>
                          <li onClick={this.changeNav.bind(this,'more')} className={this.state.type !== 'more' ?'normal':'active'}>
                            <Dropdown overlay={moreMenu} trigger={['click']} placement={'bottomCenter'}
                             getPopupContainer={() => document.querySelector('.z-header')}
                            >
                              <a>更多</a>
                            </Dropdown> 
                          </li> */}
                          <li onClick={this.changeNav.bind(this,'appcenter')} className={this.state.type !== 'appcenter' ?'normal':'active'}> <Link to="/appcenter">应用中心</Link></li>
                          <li onClick={this.changeNav.bind(this,'message')} className={this.state.type !== 'message' ?'normal':'active'}><a>消息</a></li>
                        </ul>
                        {/* <div className="notify">
                            <Popover
                                content={PoverMenu}
                                title="暂无通知"
                                trigger="click"
                                visible={this.state.visible}
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <Badge count={0} overflowCount={10}>
                                    <Icon type="mail" style={{color:themeColor.textColor.color}}/>
                                </Badge>
                            </Popover>
                        </div> */}
                        <div className="user-info">
                            <Dropdown overlay={menu} trigger={['click']}  placement={'bottomLeft'}
                            getPopupContainer={() => document.querySelector('.z-header')}
                            >
                                <div className="avatar">
                                    <Avatar src={user} />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal title="用户信息"
                           visible={userInfoVisible}
                           onOk={this.handleUserInfoOk.bind(this)}
                           confirmLoading={confirmLoading}
                           onCancel={this.handleUserInfoCancel.bind(this)}
                           width={320}
                           okText='确认修改'
                    >
                        <UserInfo data={userInfo} UserInfoMessage={this.UserInfoMessage.bind(this)}/>
                    </Modal>
                    <Modal title="颜色设置"
                           visible={themeVisible}
                           onOk={this.handleThemeOk.bind(this)}
                           confirmLoading={confirmLoading}
                           onCancel={this.handleThemeCancel.bind(this)}
                           width={320}
                    >
                        <ChangeTheme onChangeTheme={onChangeTheme}/>
                    </Modal>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.userFetchSuccess,
        email: state.userFetchSuccess.email,
        themeColor: state.changeThemeReducer
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onChangeTheme: theme => {
            dispatch(changeTheme(theme))
        },
        getUserInfo: info => {
            dispatch(getUserInfo(info))
        },
        opinionSearchRequest: req => {
            dispatch(opinionSearchRequested(req));
        },
        searchKeywordSync: ks => {
            dispatch(searchKeywordSync(ks));
        } ,      
         homeModule: data => {
            dispatch(homeModule(data))
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Zheader);