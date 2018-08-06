import React from 'react';
import {Row, Col, Icon} from 'antd';
import request from '../../utils/request';
import {connect} from 'react-redux';
import {homeModule, informsState} from '../../redux/actions/createActions';
import {userFetchSuccess} from '../../redux/actions/actions';
import './index.less';
import TodayOpinionBox from './TodayOpinionBox';
import OpinionTrendBox from './OpinionTrendBox';
import NewestOpinionBox from './NewestOpinionBox';
import NegativeOpinionBox from './NegativeOpinion';
import NewestWarningOpinionBox from './NewestWarningOpinionBox';
import WeiboOpinionBox from './WeiboOpinionBox';
import OpinionCountBox from './OpinionCountBox';
import TopicOpinionBox from './TopicOpinionBox';
import HotWordBox from './HotWordBox';
import MediaDistribution from './MediaDistribution';
import {
  api_newest_opinion,
  api_newest_negative_opinion,
  api_newest_warning_opinion,
  api_weibo_opinion,
  api_count_opinion,
  api_hot_word,
  api_carrier_pie,
  api_homepage_message,
  api_save_widget,
  api_count_charts,
  api_get_userinfo,
  api_today_opinion
} from '../../services/api';
import {formatOpinionCount, homeModuleList} from '../../utils/format';

class NewHome extends React.Component {
  constructor() {
    super();
    this.state = {
      opinionList: [],
      todayOpinionArr: [],
      alldayOpinion:[],
      todayWarningOpinion: [],
      alldayWarningOpinion: [],
      weiboAll: [],
      weiboNegative: [],
      hotWordData: [],
      mediaDistributionArr: [],
      homeMessage: [],
      opinionCount:{},
      data:[],
      todayOpinion:[],
      delMoudleList: {
        'todayOpinion': '今日舆情',
        'opinionTrend': '舆情走势',
        'newestOpinion': '最新舆情',
        'negativeOpinion': '负面舆情',
        'newestWarningOpinion': '预警舆情',
        'weiboOpinion': '微博舆情',
        'topicOpinion': '专题舆情',
        'opinionCount': '舆情统计',
        'HotWord': '相关热词',
        'mediaDistribution': '媒体分布'
      },
      legend:[],
      series:[]
    }
  }

  componentDidMount() {
    //首页模块
    request(api_homepage_message)
      .then(res => {
        if (res.data) {
          this.props.homeModule(res.data);
          this.setState({
            homeMessage: res.data,
          })
        }
        request(api_today_opinion)
        .then(res => {
           if(res.data){
             this.setState({
              todayOpinion:res.data
             })
           }    
            // 最新舆情
            request(api_newest_opinion)
              .then((res) => {
                if (res.data && res.data.code === 1) {
                  const opinionList = res.data.doclist.slice(0,7);
                  opinionList.forEach((item, index) => {
                    item.key = index + 1
                  })
                  this.setState({
                    opinionList: opinionList
                  })
                }

                // 负面舆情
                request(api_newest_negative_opinion)
                  .then((res) => {
                    if (res.data) {
                      const todayOpinion = res.data['24hour'].docList ? res.data['24hour'].docList : [];
                      const alldayOpinion = res.data['all'].docList ? res.data['all'].docList : [];
                      this.setState({
                        todayOpinionArr: todayOpinion,
                        alldayOpinion: alldayOpinion
                      })
                    }

                    // 预警舆情
                    request(api_newest_warning_opinion)
                      .then((res) => {
                        if (res.data) {
                          const todayOpinion = res.data['24hour'].docList ? res.data['24hour'].docList : [];
                          const alldayOpinion = res.data['all'].docList ? res.data['all'].docList : [];
                          this.setState({
                            todayWarningOpinion: todayOpinion,
                            alldayWarningOpinion: alldayOpinion,
                          })
                        }
                        // 微博舆情
                        request(api_weibo_opinion)
                          .then((res) => {
                            if (res.data) {
                              this.setState({
                                weiboAll: res.data.all,
                                weiboNegative: res.data.negative
                              })
                            }
                            // 舆情统计
                            request(api_count_opinion)
                            .then( res => {
                              if(res.data){
                              this.setState({
                                data: formatOpinionCount(res.data),
                                opinionCount:res.data
                                })
                              }
                                request(api_count_charts +`&data=${JSON.stringify(res.data.all)}`)
                                .then(res => {
                                  if(res.data.code === 1){
                                    this.setState({
                                      legend:res.data.legend,
                                      series:res.data.series
                                     })
                                    }
                                    request(api_hot_word)
                                      .then(res => {
                                        this.setState({
                                          hotWordData: res.data
                                        })
                                        request(api_carrier_pie)
                                          .then(res => {
                                            this.setState({
                                              mediaDistributionArr: res.data
                                            })
                                          })
                                      })
                                  });
                              });
                            })
                          });
                      });
                  });
                })
                });
  }

  delHotWordBox(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage.HotWord = 1;
    this.setState({
      HotWord: type,
      homeMessage: homeMessage
    })
    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage)
  }

  delMediaDistributionBox(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage.mediaDistribution = 1;
    this.setState({
      mediaDistribution: type,
      homeMessage: homeMessage
    })
    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage)
  }

  delTodayBox(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage.todayOpinion = 1;
    this.setState({
      todayOpinion: type,
      homeMessage: homeMessage
    })

    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage);
  }

  delTrendBox(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage.opinionTrend = 1;
    this.setState({
      opinionTrend: type,
      homeMessage: homeMessage
    })
    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage);
  }

  delNewestBox(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage.newestOpinion = 1;
    this.setState({
      newestOpinion: type,
      homeMessage: homeMessage
    })
    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage);
  }

  delNegativeBox(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage.negativeOpinion = 1;
    this.setState({
      negativeOpinion: type,
      homeMessage: homeMessage
    })
    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage);
  }

  delNewestWarningBox(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage.newestWarningOpinion = 1;
    this.setState({
      newestWarningOpinion: type,
      homeMessage: homeMessage
    })
    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage);
  }

  delWeiboBox(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage.weiboOpinion = 1;
    this.setState({
      weiboOpinion: type,
      homeMessage: homeMessage
    })
    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage);
  }

  delTopicBox(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage.topicOpinion = 1;
    this.setState({
      topicOpinion: type,
      homeMessage: homeMessage
    })
    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage);
  }

  delCountBox(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage.opinionCount = 1;
    this.setState({
      opinionCount: type,
      homeMessage: homeMessage
    })
    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage);
  }

  addModule(type) {
    let homeMessage = this.state.homeMessage;
    homeMessage[type] = 0;
    this.setState({
      homeMessage: homeMessage,
      [type]: 0
    })
    request(api_save_widget, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `widget=${JSON.stringify(homeMessage)}`
    })
    this.props.homeModule(homeMessage);
  }

  informs() {
    request(api_get_userinfo).then(res => {
         this.props.userFetchSuccess(Object.assign(res.data,{alerMsg:''}))
    })   
  }
  changeChart(type){
    request(api_count_charts +`&data=${JSON.stringify(this.state.opinionCount[type])}`)
    .then(res => {
      if(res.data.code === 1){
        this.setState({
          legend:res.data.legend,
          series:res.data.series
        })
      }
    })
  }
  render() {
    const {opinionList,todayOpinionArr, alldayOpinion,todayWarningOpinion, alldayWarningOpinion, 
      weiboAll, weiboNegative} = this.state;
    const {userInfo, ModuleList,themeColor} = this.props;
    const moduleList = this.state.homeMessage.length !== 0 ? homeModuleList(this.state.homeMessage).map((item, index) =>
      <li key={index}>{this.state.delMoudleList[item]}
        <Icon type="plus-circle-o" className="addModule"
              onClick={this.addModule.bind(this, item)}
        ></Icon>
      </li>) : '';
    return (
      <div style={{backgroundColor: themeColor.grounding.color}}>
        <div className="informs" style={userInfo.alerMsg === '' ? {display: 'none'} : {display: 'flex'}}>
          <span> {userInfo.alerMsg}</span>
          <Icon type="close" onClick={this.informs.bind(this)} style={{color: '#fff'}}/>
        </div>
        <div className="home-pages">
             {/* style={this.props.type !== undefined ? {'backgroundColor': '#ffffff'} : {'backgroundColor': '#e4ebf7'}}> */}
          <div className="home-layout"
               style={this.props.type !== undefined ? {display: 'block', width: '8%'} : {display: 'none'}}>
            <div className="layout-list">
              <div>首页</div>
              <ul>
                {moduleList}
              </ul>
            </div>
          </div>
          <div className="container" style={this.props.type !== undefined ? {width: '92%'} : {width: '100%'}}>
            <Row gutter={10} className="row"
                 style={ModuleList.todayOpinion === 1 ? {display: 'none'} : {display: 'block',background:themeColor.grounding.color}}
            >
              <Col span={8}
              >
                <TodayOpinionBox status={this.props.type !== undefined ? 'setting' : ''}
                                 delTodayBox={this.delTodayBox.bind(this)}   
                                 todayOpinion={this.state.todayOpinion}                           
                />
              </Col>
              <Col span={16}>
                {ModuleList.opinionTrend === 1 ? '' : <OpinionTrendBox
                  status={this.props.type !== undefined ? 'setting' : ''}
                  delTrendBox={this.delTrendBox.bind(this)}
                />}

              </Col>
            </Row>
             <Row gutter={10} className="row"
            style={{background:themeColor.grounding.color}}
            >
              <Col span={24} style={ModuleList.opinionCount === 1 ? {display: 'none'} : {display: 'block'}}>
                <OpinionCountBox status={this.props.type !== undefined ? 'setting' : ''}
                                 delCountBox={this.delCountBox.bind(this)}
                                 data={this.state.data}
                                 opinionCount={this.state.opinionCount}
                                 legend={this.state.legend}
                                 series={this.state.series}
                                 changeChart={this.changeChart.bind(this)}
                />
              </Col>
            </Row>
            <Row gutter={10} className="row" style={{background:themeColor.grounding.color}}>
            <Col span={8}
                   style={ModuleList.HotWord === 1 ? {display: 'none'} : {display: 'block'}}
              >
                <HotWordBox data={this.state.hotWordData}
                            status={this.props.type !== undefined ? 'setting' : ''}
                            delHotWordBox={this.delHotWordBox.bind(this)}
                />
              </Col>

              <Col span={8}
                   style={ModuleList.newestWarningOpinion === 1 ? {display: 'none'} : {display: 'block'}}
              >
                <NewestWarningOpinionBox
                  todayOpinion={todayWarningOpinion}
                  alldayOpinion={alldayWarningOpinion}
                  status={this.props.type !== undefined ? 'setting' : ''}
                  delNewestWarningBox={this.delNewestWarningBox.bind(this)}
                />
              </Col>
              <Col span={8}
                   style={ModuleList.negativeOpinion === 1 ? {display: 'none'} : {display: 'block'}}
              >
                <NegativeOpinionBox
                  todayOpinion={todayOpinionArr}
                  alldayOpinion={alldayOpinion}
                  status={this.props.type !== undefined ? 'setting' : ''}
                  delNegativeBox={this.delNegativeBox.bind(this)}
                />
              </Col>
              </Row>
              <Row gutter={10}>
              <Col span={12}
                   style={ModuleList.newestOpinion === 1 ? {display: 'none'} : {display: 'block'}}
              >
                <NewestOpinionBox opinionList={opinionList}
                                  status={this.props.type !== undefined ? 'setting' : ''}
                                  delNewestBox={this.delNewestBox.bind(this)}
                />
              </Col>
              <Col span={12}
                   style={ModuleList.weiboOpinion === 1 ? {display: 'none'} : {display: 'block'}}
              >
                <WeiboOpinionBox
                  weiboAll={weiboAll}
                  weiboNegative={weiboNegative}
                  status={this.props.type !== undefined ? 'setting' : ''}
                  delWeiboBox={this.delWeiboBox.bind(this)}
                />
              </Col>
              </Row>
              <Row gutter={10}>
              <Col span={12}>
                {ModuleList.mediaDistribution === 1 ? '' : <MediaDistribution
                  data={this.state.mediaDistributionArr}
                  status={this.props.type !== undefined ? 'setting' : ''}
                  delMediaDistributionBox={this.delMediaDistributionBox.bind(this)}
                />}

              </Col>
              <Col span={12} style={ModuleList.topicOpinion === 1 ? {display: 'none'} : {display: 'block'}}>
                <TopicOpinionBox status={this.props.type !== undefined ? 'setting' : ''}
                                 delTopicBox={this.delTopicBox.bind(this)}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ModuleList: state.homeModuleReducer,
    userInfo: state.userFetchSuccess,
    informsstate: state.informsstate.data,
    themeColor: state.changeThemeReducer
  }
};
const mapDispatchToProps = dispatch => {
  return {
    homeModule: data => {
      dispatch(homeModule(data))
    },
    informsState: data => {
      dispatch(informsState(data))
    },
    userFetchSuccess:data => {
      dispatch(userFetchSuccess(data))
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(NewHome);