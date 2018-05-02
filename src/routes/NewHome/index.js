import React from 'react';
import {Row, Col,Icon} from 'antd';
import request from '../../utils/request';
import {connect} from 'react-redux';
import {homeModule,informsState} from '../../redux/actions/createActions'
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
import {api_newest_opinion,
    api_newest_negative_opinion,
    api_newest_warning_opinion,
    api_weibo_opinion,
    api_count_opinion,
    api_today_opinion,
    api_main_topic_opinion,
    api_hot_word,
    api_carrier_pie,
    api_homepage_message,
    api_save_widget
} from '../../services/api';
import {formatOpinionCount,homeModuleList} from '../../utils/format';
class NewHome extends React.Component {
    constructor() {
        super();
        this.state = {
            opinionList: [],
            todayOpinionArr: [],
            yesterdayOpinion: [],
            beforeYesterdayOpinion: [],
            todayWarningOpinion: [],
            yesterdayWarningOpinion: [],
            beforeYesterdayWarningOpinion: [],
            weiboAll: [],
            weiboNegative: [],
            opinionCountArr: [],
            todayOpinionCount: {},
            topicOpinionArr: [],
            hotWordData:[],
            mediaDistributionArr:[],
            homeMessage:[],
            delMoudleList:{
                 'todayOpinion':'今日舆情',
                 'opinionTrend':'舆情走势',
                 'newestOpinion':'最新舆情',
                 'negativeOpinion':'负面舆情',
                 'newestWarningOpinion':'预警舆情',
                 'weiboOpinion':'微博舆情',
                 'topicOpinion':'专题舆情',
                 'opinionCount':'舆情统计',
                 'HotWord':'相关热词',
                 'mediaDistribution':'媒体分布'
            }
        }
    }
    componentWillMount() {
        //首页模块
        request(api_homepage_message)
            .then(res => {
               if(res.data){
                   this.props.homeModule(res.data);
                   this.setState({
                           homeMessage:res.data,
                           todayOpinion:res.data.todayOpinion,
                           mediaDistribution:res.data.mediaDistribution,
                           opinionTrend:res.data.opinionTrend,
                           newestOpinion:res.data.newestOpinion,
                           negativeOpinion:res.data.negativeOpinion,
                           newestWarningOpinion:res.data.newestWarningOpinion,
                           weiboOpinion:res.data.weiboOpinion,
                           topicOpinion:res.data.topicOpinion,
                           opinionCount:res.data.opinionCount,
                           HotWord:res.data.HotWord
                       })
               }

        // 昨日和今日舆情
        request(api_today_opinion)
            .then((res) => {
                this.setState({
                    todayOpinionCount: res.data
                });
                // 最新舆情
                request(api_newest_opinion)
                    .then((res) => {
                        if (res.data && res.data.code === 1) {
                            const opinionList = res.data.doclist.slice(0,7);
                            opinionList.forEach((item,index)=>{
                                    item.key=index+1
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
                                    const yesterdayOpinion = res.data['yestoday'].docList ? res.data['yestoday'].docList : [];
                                    const beforeYesterdayOpinion = res.data['bfyestoday'].docList ? res.data['bfyestoday'].docList : [];
                                    this.setState({
                                        todayOpinionArr: todayOpinion,
                                        yesterdayOpinion: yesterdayOpinion,
                                        beforeYesterdayOpinion: beforeYesterdayOpinion
                                    })
                                }

                                // 预警舆情
                                request(api_newest_warning_opinion)
                                    .then((res) => {
                                        if (res.data) {
                                            const todayOpinion = res.data['24hour'].docList ? res.data['24hour'].docList : [];
                                            const yesterdayOpinion = res.data['yestoday'].docList ? res.data['yestoday'].docList : [];
                                            const beforeYesterdayOpinion = res.data['bfyestoday'].docList ? res.data['bfyestoday'].docList : [];
                                            this.setState({
                                                todayWarningOpinion: todayOpinion,
                                                yesterdayWarningOpinion: yesterdayOpinion,
                                                beforeYesterdayWarningOpinion: beforeYesterdayOpinion
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
                                                    .then((res) => {
                                                        const {opinionCountArr} = formatOpinionCount(res.data);
                                                        this.setState({
                                                            opinionCountArr: opinionCountArr
                                                        });

                                                        // 专题舆情
                                                        request(api_main_topic_opinion)
                                                            .then((res) => {
                                                                const topicOpinion = Object.values(res.data);
                                                                this.setState({
                                                                    topicOpinionArr: topicOpinion
                                                                });
                                                                request(api_hot_word)
                                                                   .then(res=>{
                                                                       this.setState({
                                                                            hotWordData:res.data
                                                                       })
                                                                       request(api_carrier_pie)
                                                                         .then(res=>{
                                                                              this.setState({
                                                                                 mediaDistributionArr:res.data
                                                                              })
                                                                         })
                                                                   })
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });
        });
    }

    delHotWordBox(type){
             let homeMessage=this.state.homeMessage;
             homeMessage.HotWord=1;    
             this.setState({
                 HotWord:type,
                 homeMessage:homeMessage
             })
             request(api_save_widget,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`widget=${JSON.stringify(homeMessage)}`
                })
            this.props.homeModule(homeMessage)
    }
    delMediaDistributionBox(type){
            let homeMessage=this.state.homeMessage;
            homeMessage.mediaDistribution=1; 
           this.setState({
                 mediaDistribution:type,
                 homeMessage:homeMessage
            })
            request(api_save_widget,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`widget=${JSON.stringify(homeMessage)}`
                })
                this.props.homeModule(homeMessage)
    }
    delTodayBox(type){
            let homeMessage=this.state.homeMessage;
            homeMessage.todayOpinion=1;  
           this.setState({
                 todayOpinion:type,
                 homeMessage:homeMessage
            })

            request(api_save_widget,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`widget=${JSON.stringify(homeMessage)}`
                })
             this.props.homeModule(homeMessage) ;
    }
    delTrendBox(type){
           let homeMessage=this.state.homeMessage;
           homeMessage.opinionTrend=1; 
           this.setState({
                 opinionTrend:type,
                 homeMessage:homeMessage
           })
           request(api_save_widget,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
           body:`widget=${JSON.stringify(homeMessage)}`
            })
            this.props.homeModule(homeMessage) ;
    }
    delNewestBox(type){
            let homeMessage=this.state.homeMessage;
            homeMessage.newestOpinion=1;     
            this.setState({
                newestOpinion:type,
                homeMessage:homeMessage
             })
             request(api_save_widget,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`widget=${JSON.stringify(homeMessage)}`
                })
                this.props.homeModule(homeMessage) ;
    }
    delNegativeBox(type){
            let homeMessage=this.state.homeMessage;
            homeMessage.negativeOpinion=1;
            this.setState({
                negativeOpinion:type,
                homeMessage:homeMessage
            })
            request(api_save_widget,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`widget=${JSON.stringify(homeMessage)}`
                })
                this.props.homeModule(homeMessage) ;
    }
    delNewestWarningBox(type){
            let homeMessage=this.state.homeMessage;
            homeMessage.newestWarningOpinion=1;
            this.setState({
                newestWarningOpinion:type,
                homeMessage:homeMessage
            })
            request(api_save_widget,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`widget=${JSON.stringify(homeMessage)}`
                })
                this.props.homeModule(homeMessage) ;
    }
    delWeiboBox(type){
            let homeMessage=this.state.homeMessage;
            homeMessage.weiboOpinion=1;                                     
            this.setState({
                weiboOpinion:type,
                homeMessage:homeMessage
            })
            request(api_save_widget,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`widget=${JSON.stringify(homeMessage)}`
                })
                this.props.homeModule(homeMessage) ;
    }
    delTopicBox(type){
            let homeMessage=this.state.homeMessage;
            homeMessage.topicOpinion=1;
            this.setState({
                topicOpinion:type,
                homeMessage:homeMessage
            })
            request(api_save_widget,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`widget=${JSON.stringify(homeMessage)}`
                })
                this.props.homeModule(homeMessage) ;
    }
    delCountBox(type){
            let homeMessage=this.state.homeMessage;
            homeMessage.opinionCount=1;     
            this.setState({
                opinionCount:type,
                homeMessage:homeMessage
            })
            request(api_save_widget,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`widget=${JSON.stringify(homeMessage)}`
                })
                this.props.homeModule(homeMessage);
    }
    addModule(type){
        let homeMessage=this.state.homeMessage;
        homeMessage[type]=0;
        this.setState({
            homeMessage:homeMessage,
            [type]:0
        })
        request(api_save_widget,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
           body:`widget=${JSON.stringify(homeMessage)}`
            })
            this.props.homeModule(homeMessage) ;
    }
    informs(){
        this.props.informsState({data:false})
    }
    render() {
        const {
            todayOpinionCount,
            opinionList,
            todayOpinionArr,yesterdayOpinion,beforeYesterdayOpinion,
            todayWarningOpinion,yesterdayWarningOpinion,beforeYesterdayWarningOpinion,
            weiboAll,weiboNegative,
            opinionCountArr,
            topicOpinionArr
        } = this.state;
        const {userInfo,ModuleList} = this.props;
        const moduleList = this.state.homeMessage.length!==0?homeModuleList(this.state.homeMessage).map((item,index)=>
        <li key={index}>{this.state.delMoudleList[item]}
        <Icon type="plus-circle-o" className="addModule"
         onClick={this.addModule.bind(this,item)}
        ></Icon>
        </li>):'';
        return (
            <div> 
            <div className="informs" style={ userInfo.alerMsg===''?{display:'none'}:{display:'flex'}}>
            <span> {userInfo.alerMsg}</span>       
            <Icon type="close" onClick={ this.informs.bind(this) } style={{color:'#fff'}}/>
            </div>
            <div className="home-pages" style={this.props.type!==undefined?{'backgroundColor':'#ffffff'}:{'backgroundColor':'#e4ebf7'}}>
                <div className="home-layout" style={this.props.type!==undefined?{display:'block',width:'8%'}:{display:'none'}}>
                     <div className="layout-list">
                     <div>首页</div>
                     <ul>
                        {moduleList}
                     </ul>
                     </div>
                </div>
                <div className="container" style={this.props.type!==undefined?{width:'92%'}:{width:'100%'}}>
                    <Row gutter={16} className="row"
                     style={ModuleList.todayOpinion===1?{display:'none'}:{display:'block'}}
                    >
                        <Col span={24}
                        >
                            <TodayOpinionBox data={todayOpinionCount}
                              status={this.props.type!==undefined?'setting':''}
                              delTodayBox={this.delTodayBox.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16} className="row"
                    //  style={ModuleList.opinionTrend===1?{display:'none'}:{display:'block'}}
                    >
                        <Col span={24}>
                            {ModuleList.opinionTrend===1?'':<OpinionTrendBox
                              status={this.props.type!==undefined?'setting':''}
                              delTrendBox={this.delTrendBox.bind(this)}
                            />}

                        </Col>
                    </Row>
                    <Row gutter={16} className="row">
                    <Col span={12}
                          style={ModuleList.newestWarningOpinion===1?{display:'none'}:{display:'block'}}
                        >
                           <NewestWarningOpinionBox
                                todayOpinion={todayWarningOpinion}
                                yesterdayOpinion={yesterdayWarningOpinion}
                                beforeYesterdayOpinion={beforeYesterdayWarningOpinion}
                                status={this.props.type!==undefined?'setting':''}
                                delNewestWarningBox={this.delNewestWarningBox.bind(this)}
                            />
                        </Col>
                        <Col span={12}
                          style={ModuleList.negativeOpinion===1?{display:'none'}:{display:'block'}}
                        >
                            <NegativeOpinionBox
                                todayOpinion={todayOpinionArr}
                                yesterdayOpinion={yesterdayOpinion}
                                beforeYesterdayOpinion={beforeYesterdayOpinion}
                                status={this.props.type!==undefined?'setting':''}
                                delNegativeBox={this.delNegativeBox.bind(this)}
                            />
                        </Col>
                        <Col span={12}
                          style={ModuleList.newestOpinion===1?{display:'none'}:{display:'block'}}
                        >
                            <NewestOpinionBox opinionList={opinionList}
                            status={this.props.type!==undefined?'setting':''}
                            delNewestBox={this.delNewestBox.bind(this)}
                            />
                        </Col>
                        <Col span={12}
                          style={ModuleList.opinionCount===1?{display:'none'}:{display:'block'}}
                        >
                            <OpinionCountBox data={opinionCountArr}
                            status={this.props.type!==undefined?'setting':''}
                            delCountBox={this.delCountBox.bind(this)}
                            />
                        </Col>
                        <Col span={12}
                           style={ModuleList.weiboOpinion===1?{display:'none'}:{display:'block'}}
                        >
                            <WeiboOpinionBox
                                weiboAll={weiboAll}
                                weiboNegative={weiboNegative}
                                status={this.props.type!==undefined?'setting':''}
                                delWeiboBox={this.delWeiboBox.bind(this)}
                            />
                        </Col>

                        <Col span={12}
                          style={ModuleList.topicOpinion===1?{display:'none'}:{display:'block'}}
                        >
                            <TopicOpinionBox topicOpinion={topicOpinionArr}
                            status={this.props.type!==undefined?'setting':''}
                            delTopicBox={this.delTopicBox.bind(this)}
                            />
                        </Col>


                        <Col span={12}
                        style={ModuleList.HotWord===1?{display:'none'}:{display:'block'}}
                        >
                            <HotWordBox data={this.state.hotWordData}
                            status={this.props.type!==undefined?'setting':''}
                            delHotWordBox={this.delHotWordBox.bind(this)}
                            />
                        </Col>
                        <Col span={12}
                        >
                            {ModuleList.mediaDistribution===1?'':<MediaDistribution
                            data={this.state.mediaDistributionArr}
                            status={this.props.type!==undefined?'setting':''}
                            delMediaDistributionBox={this.delMediaDistributionBox.bind(this)}
                            />}

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
        informsstate :state.informsstate.data
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
