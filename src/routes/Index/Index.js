import React from 'react';
import {connect} from 'react-redux';
import {Layout, Menu, Icon, Button} from 'antd';
import {Route, Switch, Link} from 'react-router-dom';
import './Index.less';
import {history} from '../../utils/history';
import {exportSkip} from '../../redux/actions/createActions';
import logo from '../../assets/img/logo2.png';
import CRcode from '../LoginPage/crcode.jpg';
import {api_get_channel} from '../../services/api';
import request from '../../utils/request';
import {urlTokey} from '../../utils/format';
import Iconfont from '../../components/IconFont';
import AsyncComponent from '../../components/AsyncComponent/AsyncComponent'

const NewHome = AsyncComponent(() => import('../NewHome'))
const TopicReportList = AsyncComponent(() => import('../TopicReportList/TopicReportList'))
const SortedAdd = AsyncComponent(() => import('../SortedOpinion/SortedAdd'))
const TopicAdd = AsyncComponent(() => import('../TopicOpinion/TopicAdd/TopicAdd'))
const SortedOpinion = AsyncComponent(() => import('../../routes/SortedOpinion'))
const ExcludeSetting = AsyncComponent(() => import('../SystemSetting/ExcludeSetting/ExcludeSetting'))
const WarnSetting = AsyncComponent(() => import('../SystemSetting/WarnSetting/WarnSetting'))
const NoticeSetting = AsyncComponent(() => import('../SystemSetting/NoticeSetting/NoticeSetting'))
const TopicEditOpinionDetail = AsyncComponent(() => import('../SystemSetting/TopicEditOpinionDetail/TopicEditOpinionDetail'))
const EditOpinionDetail = AsyncComponent(() => import('../../components/EditOpinionDetail/EditOpinionDetail'))
const HistoryOpinion = AsyncComponent(() => import('../HistoryOpinion/HistoryOpinion'))
const CollectionOpinion = AsyncComponent(() => import('../CollectionOpinion/CollectionOpinion'))
const MaterialOpinion = AsyncComponent(() => import('../MaterialOpinion/MaterialOpinion'))
const ReportOpinionDetail = AsyncComponent(() => import('../ReportOpinion/ReportOpinionDetail'))
const ReportOpinion = AsyncComponent(() => import('../ReportOpinion/ReportOpinion'))
const TopicOpinion = AsyncComponent(() => import('../TopicOpinion/TopicOpinion'))
const AllOpinion = AsyncComponent(() => import('../AllOpinion/AllOpinion'))
const TrendFeeling = AsyncComponent(() => import('../TopicOpinion/TrendFeeling/TrendFeeling'))
const BigScreen = AsyncComponent(() => import('../BigScreen/BigScreen'))
const ZHeader = AsyncComponent(() => import('../../components/ZHeader/Zheader'))
const {Header, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      status: false,
      qqStatus: false,
      phoneStatus: false,
      weixinStatus: false,
      channelList: [{channelname: '首页', channelurl: '/webpart/index.html#/home', key: "1"}]
    };
    this.toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
  }

  componentWillMount() {
    request(api_get_channel)
      .then(res => {
        if (res.data.code === 1) {
          this.setState({
            channelList: res.data.channelList
          })
        }
      })
  }

  goBackIndex() {
    history.push('/home');
  }

  showQQ(e) {
    this.setState({
      status: true,
      qqStatus: true
    })
  }

  hideQQ(e) {
    this.setState({
      status: false,
      qqStatus: false
    })
  }

  showPhone(e) {
    this.setState({
      status: true,
      phoneStatus: true
    })
  }

  hidePhone(e) {
    this.setState({
      status: false,
      phoneStatus: false
    })
  }

  showWeixin(e) {
    this.setState({
      status: true,
      weixinStatus: true
    })
  }

  hideWeixin(e) {
    this.setState({
      status: false,
      weixinStatus: false
    })
  }

  backTop() {
    document.querySelector('.main').scrollTop = 0;
  }

  render() {
    const {themeColor} = this.props;
    let menuList = [];
    this.state.channelList.map((item, index) => {
      if (item.channelurl === '/reportopinion/list') {
        menuList.push(<SubMenu
          key={item.key}
          title={<span><Icon type={item.type} style={{fontSize: '14px'}}/><span
            style={{fontSize: '14px'}}>舆情报告</span></span>}>
          <Menu.Item key="reportopinion" style={{fontSize: '14px'}}>
            <Link to="/reportopinion/list">
              <span>简报列表</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="materiaopinion" style={{fontSize: '14px'}}>
            <Link to="/materiaopinion">
              <span>素材库</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="collectionopinion" style={{fontSize: '14px'}}>
            <Link to="/collectionopinion">
              <span>我的收藏</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="historyopinion" style={{fontSize: '14px'}}>
            <Link to="/historyopinion">
              <span>我的报告库</span>
            </Link>
          </Menu.Item>
        </SubMenu>)
      } else if (item.channelurl === '../systemMan/systemManDo?action=userList') {
        menuList.push(<SubMenu key={item.key}
                               title={<span><Icon type={item.type}
                                                  style={{fontSize: '14px'}}/><span
                                 style={{fontSize: '14px'}}>系统设置</span></span>}>
          <Menu.Item key="noticesetting" style={{fontSize: '14px'}}>
            <Link to="/noticesetting">
              <span>通知设置</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="warnsetting" style={{fontSize: '14px'}}>
            <Link to="/warnsetting">
              <span>预警设置</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="excludesetting" style={{fontSize: '14px'}}>
            <Link to="/excludesetting">
              <span>排除停用</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="publicopinion" style={{fontSize: '14px'}}>
            <Link to="/publicopinion">
              <span>舆情录入</span>
            </Link>
          </Menu.Item>
        </SubMenu>)
      } else {
        menuList.push(<Menu.Item key={item.key} style={{fontSize: '14px'}}>
          {item.channelurl.indexOf('http') !== -1 ?
            <a href={item.channelurl} target="blank">
              <Icon type={item.type} style={{fontSize: '14px'}}/>
              <span>{item.channelname}</span>
            </a> : <Link to={item.channelurl}>
              <Icon type={item.type} style={{fontSize: '14px'}}></Icon>
              <span>{item.channelname}</span>
            </Link>
          }
        </Menu.Item>)
      }
      return 3
    })
    return (
      <div className="root-container">
        <Layout className="layout">
          <Sider
            className="sider siders"
            trigger={null}
            collapsible
            style={{backgroundColor: '#2d324f'}}
            collapsed={this.state.collapsed}
          >
            <div>
              <div className="logo-wrapper" >
                <img src={logo} alt="logo" className="logo" onClick={this.goBackIndex.bind(this)}/>
              </div>
              <div className="trigger-wrapper" onClick={this.toggle}>
                <i className="fa fa-bars" aria-hidden="true" style={{fontSize: '14px', color: '#ffffff'}}/>
              </div>
            </div>
            <Menu
              defaultSelectedKeys={['1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
              style={this.state.collapsed ? {
                backgroundColor: '#2d324f',
                maxHeight: '700px'
              } : {backgroundColor: '#2d324f', maxHeight: '700px', overflow: 'auto'}}
              className="selectMenu"
              selectedKeys={[urlTokey()]}
            >
              {menuList}
            </Menu>
          </Sider>
          <Layout className="right-layout">
            <Header className="header" style={{backgroundColor: themeColor.topColor.backgroundColor, height: '66px'}}>
              <ZHeader/>
            </Header>
            <Content className="main" ref={(main) => {
              this.main = main
            }}>
              <Switch>
                <Route path="/trendfeeling" component={TrendFeeling}/>
                <Route path="/bigscreen" component={BigScreen}/>
                <Route path="/allopinion" component={AllOpinion}/>
                <Route path="/topic" component={TopicOpinion}/>
                <Route path="/test" component={EditOpinionDetail}/>
                <Route path="/reportopinion/list" component={ReportOpinion}/>
                <Route path="/reportopinion/detail" component={ReportOpinionDetail}/>
                <Route path="/materiaopinion" component={MaterialOpinion}/>
                <Route path="/collectionopinion" component={CollectionOpinion}/>
                <Route path="/historyopinion" component={HistoryOpinion}/>
                <Route path="/home" exact component={NewHome}/>
                <Route path="/noticesetting" component={NoticeSetting}/>
                <Route path="/warnsetting" component={WarnSetting}/>
                <Route path="/excludesetting" component={ExcludeSetting}/>
                <Route path="/publicopinion" component={TopicEditOpinionDetail}/>
                <Route path="/sortedopinion" component={SortedOpinion}/>
                <Route path="/topic/addtopic" component={TopicAdd}/>
                <Route path="/sortedopinion/addrule" component={SortedAdd}/>
                <Route path="/topicreportlist" component={TopicReportList}/>
              </Switch>
              <div className="suspensionBox">
                <div>
                  <ul className="suspension">
                    <li
                      className="suspensionList"
                      onMouseLeave={this.hideQQ.bind(this)}
                    ><i className="fa fa-qq suspensionIcon" aria-hidden="true"
                        onMouseEnter={this.showQQ.bind(this)}
                    ></i>
                      <div className={this.state.qqStatus ? "qqBox active" : 'qqBox'}
                      >
                        <p>系统问题咨询</p>
                        <p>在线沟通，请点我</p>
                        <p>
                          <Button type="primary" onClick={() => {
                            window.open('tencent://message/?uin=601703164&')
                          }}>在线咨询</Button>
                        </p>
                      </div>
                    </li>
                    <li
                      className="suspensionList"
                    ><i className="fa fa-phone suspensionIcon" aria-hidden="true"
                        onMouseEnter={this.showPhone.bind(this)}
                        onMouseLeave={this.hidePhone.bind(this)}
                    ></i>
                      <div className={this.state.phoneStatus ? 'phoneBox active' : 'phoneBox'}
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
                      <div className={this.state.weixinStatus ? 'weixinBox active' : 'weixinBox'}
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
  return {
    exportSkip: key => {
      dispatch(exportSkip(key));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Index);
