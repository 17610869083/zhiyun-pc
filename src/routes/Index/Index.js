import React from 'react';
import {connect} from 'react-redux';
import { Layout, Menu, Icon,Button} from 'antd';
import { Route, Switch, Link } from 'react-router-dom';
import './Index.less';
import {urlTokey} from '../../utils/format';
import {history} from '../../utils/history';
import {exportSkip} from '../../redux/actions/createActions';
import logo from '../../assets/img/logo2.png';
import CRcode from '../LoginPage/crcode.jpg';
import AsyncComponent from '../../components/AsyncComponent/AsyncComponent'
const Home = AsyncComponent ( () => import('../HomePage'))
const NewHome = AsyncComponent ( () => import('../NewHome'))
const TopicReportList = AsyncComponent ( () => import('../TopicReportList/TopicReportList'))
const SortedAdd = AsyncComponent ( () => import('../SortedOpinion/SortedAdd'))
const TopicAdd = AsyncComponent ( () => import('../TopicOpinion/TopicAdd/TopicAdd'))
const SortedOpinion = AsyncComponent ( () => import('../../routes/SortedOpinion'))
const ExcludeSetting = AsyncComponent ( () => import('../SystemSetting/ExcludeSetting/ExcludeSetting'))
const WarnSetting = AsyncComponent ( () => import('../SystemSetting/WarnSetting/WarnSetting'))
const NoticeSetting = AsyncComponent ( () => import('../SystemSetting/NoticeSetting/NoticeSetting'))
const TopicEditOpinionDetail = AsyncComponent ( () => import('../SystemSetting/TopicEditOpinionDetail/TopicEditOpinionDetail'))
const EditOpinionDetail = AsyncComponent ( () => import('../../components/EditOpinionDetail/EditOpinionDetail'))
const WarningOpinion = AsyncComponent ( () => import('../WarningOpinion/WarningOpinion'))
const HistoryOpinion = AsyncComponent ( () => import('../HistoryOpinion/HistoryOpinion'))
const CollectionOpinion = AsyncComponent ( () => import('../CollectionOpinion/CollectionOpinion'))
const MaterialOpinion = AsyncComponent ( () => import('../MaterialOpinion/MaterialOpinion'))
const ReportOpinionDetail = AsyncComponent ( () => import('../ReportOpinion/ReportOpinionDetail'))
const ReportOpinion = AsyncComponent ( () => import('../ReportOpinion/ReportOpinion'))
const TopicOpinion = AsyncComponent ( () => import('../TopicOpinion/TopicOpinion'))
const AllOpinion = AsyncComponent ( () => import('../AllOpinion/AllOpinion'))
const TrendFeeling = AsyncComponent ( () => import('../TopicOpinion/TrendFeeling/TrendFeeling'))
const BigScreen = AsyncComponent ( () => import('../BigScreen/BigScreen'))
const ZHeader = AsyncComponent ( () => import('../../components/ZHeader/Zheader'))
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            status:false,
            qqStatus:false,
            phoneStatus:false,
            weixinStatus:false
        };
        this.toggle = () => {
            this.setState({
                collapsed: !this.state.collapsed,
            });
        };
    }
    goBackIndex() {
        history.push('/home');
    }
    showQQ(e){
            this.setState({
                status:true,
                qqStatus:true
             })

    }
    hideQQ(e){
            this.setState({
                status:false,
                qqStatus:false
             })

    }
    showPhone(e){
            this.setState({
                status:true,
                phoneStatus:true
             })
    }
    hidePhone(e){
            this.setState({
                status:false,
                phoneStatus:false
             })
    }
    showWeixin(e){
            this.setState({
                status:true,
                weixinStatus:true
             })
    }
    hideWeixin(e){
            this.setState({
                status:false,
                weixinStatus:false
             })
    }
    backTop(){
       document.querySelector('.main').scrollTop =0;
    }
    render() {
        const {themeColor} =this.props;
        return (
            <div className="root-container">
                <Layout className="layout">
                    <Sider
                        className="sider"
                        trigger={null}
                        collapsible
                        style={{backgroundColor: '#0c1224'}}
                        collapsed={this.state.collapsed}
                    >
                        <div>
                            <div className="logo-wrapper" style={{backgroundColor: themeColor.topColor.backgroundColor}}>
                                <img src={logo} alt="logo" className="logo" onClick={this.goBackIndex.bind(this)} />
                            </div>
                            <div className="trigger-wrapper" onClick={this.toggle}>
                                <i className="fa fa-bars" aria-hidden="true" style={{fontSize: '14px', color: '#ffffff'}}/>
                                {/*<Icon*/}
                                    {/*className="trigger"*/}
                                    {/*type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}*/}
                                    {/*style={{fontSize: '14px', color: '#ffffff'}}*/}
                                {/*/>*/}
                            </div>
                        </div>
                        <Menu
                            defaultSelectedKeys={['2']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                            selectedKeys={[urlTokey()]}
                            style={{backgroundColor: '#0c1224'}}
                            className="selectMenu"
                        >
                            <Menu.Item key="1" style={{fontSize: '14px'}}>
                                <Link to="/home">
                                      <Icon type="home" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0'}}/>
                                    <span>首页</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4" style={{fontSize: '14px'}}>
                                <Link to="/allopinion">
                                    <Icon type="database" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',color:'#01C2E0',height:'0' }}/>
                                    <span>舆情监测</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="7" style={{fontSize: '14px'}}>
                                <Link to="/sortedopinion/list">
                                    <Icon type="layout" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',color:'#01C2E0',height:'0',height:'0' }}/>
                                    <span>分类舆情</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="6" style={{fontSize: '14px'}}>
                                <Link to="/topic/topiclist">
                                    <Icon type="solution" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0' }}/>
                                    <span>专题舆情</span>
                                </Link>
                            </Menu.Item>

                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="mail" style={{fontSize: '14px',boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0'}}/><span style={{fontSize: '14px'}}>舆情报告</span></span>}>
                                <Menu.Item key="8" >
                                    <Link to="/reportopinion/list">
                                        <span>简报列表</span>
                                    </Link>
                                </Menu.Item>
                                { /*<Menu.Item key="17" >
                                       <Link to="/topicreportlist">
                                           <span>专题报告列表</span>
                                       </Link>
                                   </Menu.Item>*/}
                                <Menu.Item key="9" >
                                    <Link to="/materiaopinion">
                                        <span>素材库</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="10" >
                                    <Link to="/collectionopinion">
                                        <span>我的收藏</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="11" >
                                    <Link to="/historyopinion">
                                        <span>我的报告库</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="appstore" style={{fontSize: '14px',boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0'}}/><span style={{fontSize: '14px'}}>系统设置</span></span>}>
                                <Menu.Item key="13">
                                    <Link to="/noticesetting">
                                        <span>通知设置</span>
                                    </Link>
                                </Menu.Item>

                                <Menu.Item key="14">
                                    <Link to="/warnsetting">
                                        <span>预警设置</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="15">
                                    <Link to="/excludesetting">
                                        <span>排除停用</span>
                                    </Link>
                                </Menu.Item>

                                <Menu.Item key="16">
                                    <Link to="/publicopinion">
                                        <span>舆情录入</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="3" style={{fontSize: '14px'}}>
                                <Link to="/bigscreen">
                                    <Icon type="pie-chart" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0' }}/>
                                    <span>大屏展示</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="push" style={{fontSize: '14px'}}>
                                <a href="http://hualong.v6plus.com/login" target="blank">
                                    <Icon type="upload" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0' }}/>
                                    <span>上报平台</span>
                                </a>
                            </Menu.Item>
                            <Menu.Item key="fuck" style={{fontSize: '14px'}}>
                                <a href="http://103.94.42.70:5000/" target="blank">
                                    <Icon type="camera-o" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0' }}/>
                                    <span>取证系统</span>
                                </a>

                            </Menu.Item>
                            <Menu.Item key="2" style={{fontSize: '14px'}}>
                                {/* <Link to="/trendfeeling"> */}
                                    <a href="http://114.242.25.234:30005/gxwhongce2/" target="blank">
                                    <Icon type="chrome" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0' }}/>
                                    <span>态势感知</span>
                                    </a>
                                {/* </Link> */}
                            </Menu.Item>
                            <Menu.Item key="protect" style={{fontSize: '14px'}}>
                                <a href="http://situation.imp.safesail.cn/?from=singlemessage" target="blank">
                                    <Icon type="laptop" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0' }}/>
                                    <span>网站防护</span>
                                </a>
                            </Menu.Item>
                            {/* <Menu.Item key="12" style={{fontSize: '14px'}}>
                                    <Icon type="setting" />
                                    <span>词库设置</span>

                                </Menu.Item> */}
                                <Menu.Item key="guide" style={{fontSize: '14px'}}>
                                <a href="http://yd.is8.com.cn/" target="blank">
                                    <Icon type="exception" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0' }}/>
                                    <span>引导系统</span>
                                </a>
                            </Menu.Item>
                            <Menu.Item key="new" style={{fontSize: '14px'}}>
                                <Link to="/newhome">
                                    <Icon type="chrome" style={{ boxShadow:'0 0 30px #01C2E0',color:'#01C2E0',height:'0' }}/>
                                    <span>新首页</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="right-layout">
                        <Header className="header" style={{backgroundColor:themeColor.topColor.backgroundColor,height:'66px'}}>
                            <ZHeader/>
                        </Header>
                        <Content className="main" ref={(main)=>{ this.main = main}}>
                            <Switch>
                                <Route path="/trendfeeling" component={TrendFeeling}/>
                                <Route path="/bigscreen" component={BigScreen} />
                                <Route path="/allopinion" component={AllOpinion}/>
                                <Route path="/topic" component={TopicOpinion}/>
                                <Route path="/test" component={EditOpinionDetail}/>
                                <Route path="/reportopinion/list" component={ReportOpinion}/>
                                <Route path="/reportopinion/detail" component={ReportOpinionDetail}/>
                                <Route path="/materiaopinion" component={MaterialOpinion}/>
                                <Route path="/collectionopinion" component={CollectionOpinion}/>
                                <Route path="/historyopinion" component={HistoryOpinion}/>
                                <Route path="/warningopinion" component={WarningOpinion}/>
                                <Route path="/home" exact component={Home}/>
                                <Route path="/newhome" component={NewHome}/>
                                <Route path="/noticesetting" component={NoticeSetting}/>
                                <Route path="/warnsetting" component={WarnSetting}/>
                                <Route path="/excludesetting" component={ExcludeSetting}/>
                                <Route path="/publicopinion" component={TopicEditOpinionDetail}/>
                                <Route path="/sortedopinion" component={SortedOpinion}/>
                                <Route path="/topic/addtopic" component={TopicAdd}/>
                                <Route path="/sortedopinion/addrule" component={SortedAdd}/>
                                <Route path="/topicreportlist" component={TopicReportList}/>
                                <Route path="/newhome" component={NewHome}/>newhome
                            </Switch>
                            <div className="suspensionBox">
                                 <div >
                                 <ul className="suspension">
                                   <li
                                        className="suspensionList"
                                        onMouseLeave={this.hideQQ.bind(this)}
                                    ><i className="fa fa-qq suspensionIcon" aria-hidden="true"
                                        onMouseEnter={this.showQQ.bind(this)}
                                     ></i>
                                            <div className={this.state.qqStatus?"qqBox active":'qqBox'}
                                            >
                                            <p>系统问题咨询</p>
                                            <p>在线沟通，请点我</p>
                                            <p>
                                                <Button type="primary" onClick={() => {window.open('tencent://message/?uin=601703164&')}}>在线咨询</Button>
                                            </p>
                                            </div>
                                   </li>
                                   <li
                                    className="suspensionList"
                                   ><i className="fa fa-phone suspensionIcon" aria-hidden="true"
                                            onMouseEnter={this.showPhone.bind(this)}
                                            onMouseLeave={this.hidePhone.bind(this)}
                                   ></i>
                                           <div className={this.state.phoneStatus?'phoneBox active':'phoneBox'}
                                            >
                                            <p>咨询热线：</p>
                                            <p>82540636</p>
                                            <p>服务热线：</p>
                                            <p>400-618-1863</p>
                                            </div>
                                   </li>

                                   <li
                                   className="suspensionList"
                                   ><i className="fa fa-weixin suspensionIcon" aria-hidden="true"
                                onMouseEnter={this.showWeixin.bind(this)}
                                onMouseLeave={this.hideWeixin.bind(this)}
                                   ></i>
                                            <div className={this.state.weixinStatus?'weixinBox active':'weixinBox'}
                                           >
                                            <img src={CRcode} alt="" width="70px" height="70px"/>
                                            <p className="appDownload">官方app下载</p>
                                            </div>
                                   </li>

                                   <li
                                    className="suspensionList"
                                    onClick={this.backTop.bind(this)}
                                   >
                                       <i className="fa fa-arrow-up suspensionIcon" aria-hidden="true">
                                       </i>
                                   </li>
                                 </ul>
                                 </div>
                            </div>
                        </Content>
                    </Layout>
                </Layout>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        themeColor: state.changeThemeReducer
    }
};
const mapDispatchToProps = dispatch => {
     return{
        exportSkip:key=>{
            dispatch(exportSkip(key));
        }
     }
};


export default connect(mapStateToProps, mapDispatchToProps)(Index);
