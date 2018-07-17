import React from 'react';
import {connect} from 'react-redux';
import {Input, Icon, Menu, Dropdown, Modal, Avatar, Badge, Popover,message} from 'antd';
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
import NewHome from '../../routes/NewHome';
import logo from '../../assets/img/newLogo.png';
import {Link} from 'react-router-dom';
const Search = Input.Search;
const confirm = Modal.confirm;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Zheader extends React.Component {
    constructor() {
        super();
        this.state = {
            userInfoVisible: false,
            themeVisible: false,
            visible: false,
            layoutVisible:false,
            userInfoMessage:{}
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
          this.setState({
              layoutVisible:true
          })
    }

    handleLayoutCancel(){
          this.setState({
            layoutVisible:false
          })
          request(api_homepage_message)
          .then(res => {
             if(res.data){
                 this.props.homeModule(res.data); 
             }
            })
    }
    goBackIndex(){

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
                <Menu.Item key="3">
                    <span onClick={this.showlayoutModal.bind(this)}>&nbsp;&nbsp;&nbsp;&nbsp;首页布局&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Menu.Item>
                {/*<Menu.Item key="3">*/}
                    {/*<span>&nbsp;&nbsp;&nbsp;&nbsp;系统设置&nbsp;&nbsp;&nbsp;&nbsp;</span>*/}
                {/*</Menu.Item>*/}
                <Menu.Divider />
                <Menu.Item key="5"><span>&nbsp;&nbsp;&nbsp;&nbsp;退出</span></Menu.Item>
            </Menu>
        );
        const moreMenu = (
            <Menu style={{marginTop:'16px'}}>
                <Menu.Item key="0">
                    <Link to="/situational" >&nbsp;&nbsp;&nbsp;&nbsp;态势感知&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">
                    <Link to="/guard" >&nbsp;&nbsp;&nbsp;&nbsp;网站防护&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">
                    <Link to="/bidding">&nbsp;&nbsp;&nbsp;&nbsp;招投标&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">
                    <Link to="/multilingual/3">&nbsp;&nbsp;&nbsp;&nbsp;维语监测&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="4">
                    <Link to="/multilingual/2">&nbsp;&nbsp;&nbsp;&nbsp;日语监测&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                </Menu.Item>
                
            </Menu>
        );
        // 消息列表
        const PoverMenu = (
            <div>
                <ul>
                </ul>
            </div>
        );
        
        return (
            <div className="z-header" style={{backgroundColor:themeColor.topColor.backgroundColor}}>
                <div className="top">
                    <div className="left" onClick={this.goBackIndex.bind(this)}>
                         <img src={logo} alt="logo" className="logo" onClick={this.goBackIndex.bind(this)}/>
                         {/* <span className="name" style={{color:'#fff'}}>{userInfo.sysname}</span> */}
                    </div>
                    <div className="right">
                        <ul className="nav-bar">
                          <li><Link to="/home">首页</Link></li>
                          <li><Link to="/allopinion/allopiniondetail">舆情监测</Link></li>
                          <li><Link to="/evidence">互联网取证</Link></li>
                          <li><Link to="/upreport">上报平台</Link></li>
                          <li><Link to="/guide">引导系统</Link></li>
                          <li>
                            <Dropdown overlay={moreMenu} trigger={['click']} placement={'bottomCenter'}>
                              <Link to="/home">更多</Link>
                            </Dropdown> 
                          </li>
                          <li> <Link to="/appcenter">应用中心</Link></li>
                          <li><a>消息</a></li>
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
                            <Dropdown overlay={menu} trigger={['click']} placement={'bottomCenter'}>
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
                    <Modal title="首页布局"
                           visible={this.state.layoutVisible}
                           footer={null}
                           onCancel={this.handleLayoutCancel.bind(this)}
                           width='90%'
                    >
                          <NewHome type="homeLayout"/>
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