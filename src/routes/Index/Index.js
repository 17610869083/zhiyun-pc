import React from 'react';
import {connect} from 'react-redux';
import {Layout, Menu,Button} from 'antd';
import {Route, Switch, Link} from 'react-router-dom';
import './Index.less';
import {exportSkip} from '../../redux/actions/createActions';
import CRcode from '../LoginPage/crcode.jpg';
import AsyncComponent from '../../components/AsyncComponent/AsyncComponent'
// import Bidding from '../BiddingOpinion/BiddingOpinion'

const NewHome = AsyncComponent(() => import('../NewHome'))
const TopicReportList = AsyncComponent(() => import('../TopicReportList/TopicReportList'))
const AllOpinion = AsyncComponent(() => import('../AllOpinion/AllOpinion'))
const TrendFeeling = AsyncComponent(() => import('../TopicOpinion/TrendFeeling/TrendFeeling'))
const ZHeader = AsyncComponent(() => import('../../components/ZHeader/Zheader'))
const Evidence = AsyncComponent(() => import('../Evidence/Evidence'))
const UpReport = AsyncComponent(() => import('../UpReport/UpReport'))
const Guide = AsyncComponent(() => import('../Guide/Guide'))
const Situational = AsyncComponent(() => import('../Situational/Situational'))
const Bidding= AsyncComponent(() => import('../BiddingOpinion/BiddingOpinion'))
const Multilingual= AsyncComponent(() => import('../Multilingual/Multilingual'))
const AppCenter= AsyncComponent(() => import('../AppCenter/AppCenter'))
const Guard= AsyncComponent(() => import('../Guard/Guard'))
const { Content} = Layout;
class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      flag:true,
      status: false,
      qqStatus: false,
      phoneStatus: false,
      weixinStatus: false,
      channelList: [{channelname: '首页', channelurl: '/webpart/index.html#/home', key: "1"}]
    };
    this.toggle = () => {
      this.setState({
        flag: !this.state.flag,
      });
    };
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
  goBackIndex() {
      if(this.state.collapsed){
      this.setState({
        collapsed:false
      })
    }
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
    // 统计报告-舆情报告   
    return (
      <div className="root-container">
       <ZHeader/> 
          <Layout className="right-layout">
            <Content className="main" ref={(main) => {
              this.main = main
            }}>
              <Switch>
                <Route path="/trendfeeling" component={TrendFeeling}/>
                <Route path="/allopinion" component={AllOpinion}/>
                <Route path="/home" exact component={NewHome}/>
                <Route path="/topicreportlist" component={TopicReportList}/>
                <Route path="/evidence" component={Evidence}/>
                <Route path="/upreport" component={UpReport}/>
                <Route path="/guide" component={Guide}/>
                <Route path="/situational" component={Situational}/>
                <Route path="/bidding" component={Bidding}/>
                <Route path="/multilingual/:languages" component={Multilingual}/>
                <Route path="/appcenter" component={AppCenter}/> 
                <Route path="/Guard" component={Guard}/> 
                
              </Switch>
              <div className="suspensionBox" style={{display:"none"}}>
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
                      <div className={this.state.phoneStatus ? 'phoneBox active' : 'phoneBox'}>
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
