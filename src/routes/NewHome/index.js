import React from 'react';
import {Icon} from 'antd';
import request from '../../utils/request';
import {connect} from 'react-redux';
import {homeModule, informsState} from '../../redux/actions/createActions'
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
  api_count_charts
} from '../../services/api';
import {formatOpinionCount} from '../../utils/format';

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
      opinionCountArr:[],
      opinionCount:{},
      data:[],
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
            homeMessage: res.data
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
                            if (res.data.all) {
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
                });
  }
  informs() {
    this.props.informsState({data: false})
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
      weiboAll, weiboNegative,opinionCountArr,homeMessage,hotWordData} = this.state;
    const {userInfo,themeColor} = this.props;
      const Notification = (state,size) => {
          switch (state) {
            case 'TodayOpinionBox':
              return <TodayOpinionBox />;
            case 'OpinionTrendBox':
              return <OpinionTrendBox />;
            case 'NewestOpinionBox':
              return <NewestOpinionBox opinionList={opinionList}/>;
            case 'NegativeOpinionBox':
              return <NegativeOpinionBox  todayOpinion={todayOpinionArr} alldayOpinion={alldayOpinion}/>;
            case 'NewestWarningOpinionBox':
              return <NewestWarningOpinionBox todayOpinion={todayWarningOpinion} alldayOpinion={alldayWarningOpinion}/>;
            case 'WeiboOpinionBox':
              return <WeiboOpinionBox weiboAll={weiboAll} weiboNegative={weiboNegative}/>;
            case 'OpinionCountBox':
              return <OpinionCountBox data={opinionCountArr}/>;
            case 'TopicOpinionBox':
              return <TopicOpinionBox />;
            case 'HotWordBox':
              return <HotWordBox data={hotWordData}/>;
            case 'MediaDistribution':
              return <MediaDistribution data={this.state.mediaDistributionArr}/>;
            default:
              return null;
          }
        }  
    return (
      <div style={{backgroundColor: themeColor.grounding.color}}>
        <div className="informs" style={userInfo.alerMsg === '' ? {display: 'none'} : {display: 'flex'}}>
          <span> {userInfo.alerMsg}</span>
          <Icon type="close" onClick={this.informs.bind(this)} style={{color: '#fff'}}/>
        </div>
        <div className="home-pages" >
          <div className="container" style={this.props.type !== undefined ? {width: '92%'} : {width: '100%',display:'flex',flexWrap:'wrap'}}>
         { homeMessage.map((item,index) => {
            return <div key={index} style={{width:`${item.defaultSize-2}%`,margin:'1%'}}>{Notification(item.name,item.defaultSize)}</div>
          })
         }
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
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(NewHome);