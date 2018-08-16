import React from 'react';
import {connect} from 'react-redux';
import { Form,Layout,Menu} from 'antd';
import './AllOpinion.less';
import {Route, Switch, Link} from 'react-router-dom';
import {api_get_channel} from '../../services/api';
import Iconfont from '../../components/IconFont'
import request from '../../utils/request';
import {urlTokey} from '../../utils/format';
import AsyncComponent from '../../components/AsyncComponent/AsyncComponent'
const TopicReportList = AsyncComponent(() => import('../TopicReportList/TopicReportList'))
const AllOpinionDetail = AsyncComponent(() => import('../AllOpinionDetail/AllOpinionDetail'))
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
const BigScreen = AsyncComponent(() => import('../BigScreen/BigScreen'))
const ReportTemplate = AsyncComponent(() => import('../ReportTemplate/ReportTemplate'))
const ChooseTemplate = AsyncComponent(() => import('../ChooseTemplate/ChooseTemplate'))
const CustomHome= AsyncComponent(() => import('../CustomHome/CustomHome'))
const MyReport= AsyncComponent(() => import('../MyReport/MyReport'))
const Drag= AsyncComponent(() => import('../Drag/Drag'))
const Briefing= AsyncComponent(() => import('../Briefing/Briefing'))
const BriefingSecond = AsyncComponent(() => import('../BriefingSecond/BriefingSecond'))
const Daily = AsyncComponent(() => import('../Daily/Daily'))
const Special = AsyncComponent(() => import('../Special/Special'))
const Multilingual= AsyncComponent(() => import('../Multilingual/MultilingualInfo'))
const BiddingOpinion = AsyncComponent(() => import('../BiddingOpinion/BiddingOpinion'))
const FocusSetting = AsyncComponent(() => import('../FocusSetting/FocusSetting'))
const Evidadmin = AsyncComponent(() => import('../Evidadmin/Evidadmin'))
const EvidenceManagement = AsyncComponent(() => import('../EvidenceManagement/EvidenceManagement'))
const Evideinfo = AsyncComponent(() => import('../Evideinfo/Evideinfo'))
const { Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;
class AllOpinion extends React.Component {
  constructor() {
    super();
    this.state = {
     channelList:[],
     key:'4',
     flag:true,
     collapsed: true
    }
  }
  componentWillMount(){
    request(api_get_channel)
    .then(res => {
        if(res.data.code === 1){
          this.setState({
            channelList:res.data.channelList
          })
        }
    })
    if(this.props.location && this.props.location.pathname ===  "/allopinion/topic/topiclist"){
       this.setState({
           key:'7'
       })
    }
  }
  changeItem(item){
        this.setState({
           key:item.key
        })
  }
  toggle = () => {
      this.setState({
        flag:!this.state.flag
      })
  }
  mouseEnterToggle = () => {
    if(this.state.collapsed){
    this.setState({
      collapsed:false
    })
   }
  }
  mouseLeaveToggle = () => {
    if(!this.state.collapsed){
    this.setState({
      collapsed:true
    })
  }
 }
  render() {
    console.log()
    const {themeColor} = this.props;
    const haverClass = themeColor.topColor.backgroundColor === '#5a8bff' ? 'white':'black'; 
    let menuList = [];
    this.state.channelList.map((item, index) => {
      if (item.channelurl === '/allopinion/reportopinion/list') {
        menuList.push(<SubMenu className={haverClass}
          key={item.key}
          title={<span>
            <i className="anticon"><Iconfont type={item.type} style={{fontSize: '16px'}}/></i>
            <span
              style={{fontSize: '16px'}} className={haverClass}>舆情报告</span>
            </span>
          }>
          {/* <Menu.Item key="reportopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/reportopinion/list">
              <span>简报列表</span>
            </Link>
          </Menu.Item> */}
          <Menu.Item key="materiaopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/materiaopinion">
              <span>素材库</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="collectionopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/collectionopinion">
              <span>我的收藏</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="myreport" style={{fontSize: '16px'}}>
            <Link to="/allopinion/myreport">
              <span>我的报告库</span>
            </Link>
          </Menu.Item>
        </SubMenu>)
      } else if (item.channelurl === '../systemMan/systemManDo?action=userList') {
        menuList.push(<SubMenu key={item.key}  className={haverClass}
                               title={<Link to="/allopinion/noticesetting"><span><i className="anticon"><Iconfont type={item.type}
                               style={{fontSize: '16px'}}/></i><span
                               style={{fontSize: '16px'}}>系统设置</span></span> </Link>}>
          <Menu.Item key="noticesetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/noticesetting">
              <span >通知设置</span>
            </Link>
          </Menu.Item>
          
          <Menu.Item key="warnsetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/warnsetting">
              <span>预警设置</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="excludesetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/excludesetting">
              <span>排除停用</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="publicopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/publicopinion">
              <span>舆情录入</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="focus" style={{fontSize: '16px'}}>
            <Link to="/allopinion/focus">
              <span>重点关注媒体</span>
            </Link>
          </Menu.Item>
          
        </SubMenu>)
      } else if (item.channelurl === '/multilingual') {
        menuList.push(<SubMenu key={item.key}  className={haverClass}
          title={<Link to="/multilingual/0"><span><i className="anticon"><Iconfont type={item.type}
            style={{fontSize: '16px'}}/></i><span
            style={{fontSize: '16px'}}>多语种检测</span></span> </Link>}>
            <Menu.Item key="noticesetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/multilingual/1">
            <span><Iconfont type='icon-hanyu' style={{fontSize: '16px'}}/>韩语检测</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="warnsetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/multilingual/2">
            <span><Iconfont type='icon-riyu1' style={{fontSize: '16px'}}/>日语检测</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="excludesetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/multilingual/3">
            <span><Iconfont type='icon-xinjiang' style={{fontSize: '16px'}}/>维语检测</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="publicopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/multilingual/4">
            <i className="anticon"><Iconfont type='icon-xicangzizhiqu' style={{fontSize: '16px'}}/>藏语检测</i>
            </Link>
            </Menu.Item>
            </SubMenu>)
      }else {
        menuList.push(<Menu.Item key={item.key} style={{fontSize: '16px'}} className={haverClass}>
          {item.channelurl.indexOf('http') !== -1 ?
            <a href={item.channelurl} target="blank">
              <i className="anticon"><Iconfont type={item.type} style={{fontSize: '16px'}}/></i>
              <span>{item.channelname}</span>
            </a> : <Link to={item.channelurl}>
            <i className="anticon"><Iconfont type={item.type} style={{fontSize: '16px'}}/></i>
              <span>{item.channelname}</span>
            </Link>
          }
        </Menu.Item>)
      }
      return 3
    });

    return (
      <div style={{display:'flex',width:"100%",height:'100%'}}>
            <Layout className='layout'>
            <Sider
            className="sider siders"
            trigger={null}
            style={{position: 'fixed', left: 0,backgroundColor: themeColor.bottomColor.backgroundColor}}
            collapsed={this.state.collapsed && this.state.flag}
            onMouseEnter={this.mouseEnterToggle} 
            onMouseLeave={this.mouseLeaveToggle}
          >
            <div>
              <div className="trigger-wrapper" onClick={this.toggle}
              style={haverClass === 'white' ?{backgroundColor:'#fff'}:{backgroundColor:themeColor.bottomColor.backgroundColor}}
              >
                <i className="fa fa-bars" aria-hidden="true" style={{fontSize: '14px', color: '#5a8bff'}}/>
              </div>
            </div>
            <Menu
              defaultSelectedKeys={['4']}
              mode="inline"
              style={ {backgroundColor: themeColor.bottomColor.backgroundColor, overflow: 'auto',maxHeight: '600px',border:'none'}}
              className="selectMenu"
              selectedKeys={[urlTokey()]}
              onClick={this.changeItem.bind(this)}
            >
              {menuList}
            </Menu>
          </Sider>
          <Layout style={this.state.collapsed&&this.state.flag?{marginLeft:'64px',background:'#E4EbF7'}:{marginLeft:'200px',background:'#E4EbF7'}}>
          <Content>
          <Switch>
                <Route path="/allopinion/bigscreen" component={BigScreen}/>
                <Route path="/allopinion/topic" component={TopicOpinion}/>
                <Route path="/allopinion/topic" component={TopicOpinion}/>
                <Route path="/allopinion/test" component={EditOpinionDetail}/>
                <Route path="/allopinion/allopiniondetail" exact component={AllOpinionDetail}/>
                <Route path="/allopinion/reportopinion/list" component={ReportOpinion}/>
                <Route path="/allopinion/reportopinion/detail" component={ReportOpinionDetail}/>
                <Route path="/allopinion/materiaopinion" component={MaterialOpinion}/>
                <Route path="/allopinion/collectionopinion" component={CollectionOpinion}/>
                <Route path="/allopinion/historyopinion" component={HistoryOpinion}/>
                <Route path="/allopinion/noticesetting" component={NoticeSetting}/>
                <Route path="/allopinion/warnsetting" component={WarnSetting}/>
                <Route path="/allopinion/excludesetting" component={ExcludeSetting}/>
                <Route path="/allopinion/publicopinion" component={TopicEditOpinionDetail}/>
                <Route path="/allopinion/sortedopinion" component={SortedOpinion}/>
                <Route path="/allopinion/topic/addtopic" component={TopicAdd}/>
                <Route path="/allopinion/sortedopinion/addrule" component={SortedAdd}/>
                <Route path="/allopinion/topicreportlist" component={TopicReportList}/>
                <Route path="/allopinion/reporttemplate" component={ReportTemplate}/>
                <Route path="/allopinion/choosetemplate" component={ChooseTemplate}/>
                <Route path="/allopinion/customhome" component={CustomHome}/>
                <Route path="/allopinion/myreport" component={MyReport}/>
                <Route path="/allopinion/drag" component={Drag}/>
                <Route path="/allopinion/briefing" component={Briefing}/>
                <Route path="/allopinion/briefingsecond" component={BriefingSecond}/>
                <Route path="/allopinion/daily" component={Daily}/>
                <Route path="/allopinion/special" component={Special}/>
                <Route path="/allopinion/multilingual/:languages" component={Multilingual}/>
                <Route path="/allopinion/bidding/information" component={BiddingOpinion}/>
                <Route path="/allopinion/bidding" component={BiddingOpinion}/>
                <Route path="/allopinion/focus" component={FocusSetting}/>
                <Route path="/allopinion/evidadmin" component={Evidadmin}/>
                <Route path="/allopinion/evidencemanagement" component={EvidenceManagement}/>
                <Route path="/allopinion/evidinfo" component={Evideinfo}/>
              </Switch>
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

export default connect(mapStateToProps, null)((Form.create()(AllOpinion)));
