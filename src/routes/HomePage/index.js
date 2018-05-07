import React from 'react';
import {Row, Col} from 'antd';
import request from '../../utils/request';
import './index.less';
import TodayOpinionBox from './TodayOpinionBox';
import OpinionTrendBox from './OpinionTrendBox';
import NewestOpinionBox from './NewestOpinionBox';
import NegativeOpinionBox from './NegativeOpinion';
import NewestWarningOpinionBox from './NewestWarningOpinionBox';
import WeiboOpinionBox from './WeiboOpinionBox';
import OpinionCountBox from './OpinionCountBox';
import TopicOpinionBox from './TopicOpinionBox';

import {api_newest_opinion,
    api_newest_negative_opinion,
    api_newest_warning_opinion,
    api_weibo_opinion,
    api_count_opinion,
    api_today_opinion,
    api_main_topic_opinion,
    api_get_userinfo
} from '../../services/api';

import {formatOpinionCount} from '../../utils/format'
class HomePage extends React.Component {

    constructor() {
      super();
      this.state = {
        opinionList: [],
        todayOpinion: [],
        yesterdayOpinion: [],
        beforeYesterdayOpinion: [],
        todayWarningOpinion: [],
        yesterdayWarningOpinion: [],
        beforeYesterdayWarningOpinion: [],
        weiboAll: [],
        weiboNegative: [],
        opinionCountArr: [],
        todayOpinionCount: {},
        topicOpinion: [],
        alertMsg: ''
      }
    }

    componentDidMount() {
      // 昨日和今日舆情
      request(api_today_opinion).then((res) => {
        this.setState({todayOpinionCount: res.data});
        // 最新舆情
        request(api_newest_opinion).then((res) => {
          if (res.data && res.data.code === 1) {
            const opinionList = res.data.doclist.slice(0, 7);
            this.setState({opinionList: opinionList})
          }

          // 负面舆情
          request(api_newest_negative_opinion).then((res) => {
            if (res.data) {
              const todayOpinion = res.data['24hour'].docList
                ? res.data['24hour'].docList
                : [];
              const yesterdayOpinion = res.data['yestoday'].docList
                ? res.data['yestoday'].docList
                : [];
              const beforeYesterdayOpinion = res.data['bfyestoday'].docList
                ? res.data['bfyestoday'].docList
                : [];
              this.setState({todayOpinion: todayOpinion, yesterdayOpinion: yesterdayOpinion, beforeYesterdayOpinion: beforeYesterdayOpinion})
            }

            // 预警舆情
            request(api_newest_warning_opinion).then((res) => {
              if (res.data) {
                const todayOpinion = res.data['24hour'].docList
                  ? res.data['24hour'].docList
                  : [];
                const yesterdayOpinion = res.data['yestoday'].docList
                  ? res.data['yestoday'].docList
                  : [];
                const beforeYesterdayOpinion = res.data['bfyestoday'].docList
                  ? res.data['bfyestoday'].docList
                  : [];
                this.setState({todayWarningOpinion: todayOpinion, yesterdayWarningOpinion: yesterdayOpinion, beforeYesterdayWarningOpinion: beforeYesterdayOpinion})
              }

              // 微博舆情
              request(api_weibo_opinion).then((res) => {
                if (res.data.all) {
                  this.setState({weiboAll: res.data.all, weiboNegative: res.data.negative})
                }

                // 舆情统计
                request(api_count_opinion).then((res) => {
                  const {opinionCountArr} = formatOpinionCount(res.data);
                  this.setState({opinionCountArr: opinionCountArr});

                  // 专题舆情
                  request(api_main_topic_opinion).then((res) => {
                    console.log(res);
                    const topicOpinion = Object.values(res.data);
                    this.setState({topicOpinion: topicOpinion});
                  });
                });
              });
            });
          });
        });
      });
      request(api_get_userinfo).then(res => {
        if (res.data.alerMsg !== '') {
          this.setState({alertMsg: res.data.alerMsg})
        }
      })
    }
    informs() {
      this.setState({alertMsg: ''})
    }
    render() {
        const {
            todayOpinionCount,
            opinionList,
            todayOpinion,yesterdayOpinion,beforeYesterdayOpinion,
            todayWarningOpinion,yesterdayWarningOpinion,beforeYesterdayWarningOpinion,
            weiboAll,weiboNegative,
            opinionCountArr,
            topicOpinion,
            alertMsg
        } = this.state;
        return (
            <div>
          
            <div className="home-page">
                <div className="container">
                    {/* <Row gutter={16} className="row">
                        <Col span={24}>
                            <TodayOpinionBox data={todayOpinionCount}/>
                        </Col>
                    </Row>
                    <Row gutter={16} className="row">
                        <Col span={24}>
                            <OpinionTrendBox/>
                        </Col>
                    </Row>
                    <Row gutter={16} className="row">
                        <Col span={12}>
                            <NewestOpinionBox opinionList={opinionList}/>
                        </Col>
                        <Col span={12}>
                            <NegativeOpinionBox
                                todayOpinion={todayOpinion}
                                yesterdayOpinion={yesterdayOpinion}
                                beforeYesterdayOpinion={beforeYesterdayOpinion}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16} className="row">
                        <Col span={12}>
                            <NewestWarningOpinionBox
                                todayOpinion={todayWarningOpinion}
                                yesterdayOpinion={yesterdayWarningOpinion}
                                beforeYesterdayOpinion={beforeYesterdayWarningOpinion}
                            />
                        </Col>
                        <Col span={12}>
                            <WeiboOpinionBox
                                weiboAll={weiboAll}
                                weiboNegative={weiboNegative}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16} className="row">
                        <Col span={12}>
                            <TopicOpinionBox topicOpinion={topicOpinion}/>
                        </Col>
                        <Col span={12}>
                            <OpinionCountBox data={opinionCountArr}/>
                        </Col>
                    </Row> */}
                </div>
            </div>
         </div>
        )
    }
}

export default HomePage;
