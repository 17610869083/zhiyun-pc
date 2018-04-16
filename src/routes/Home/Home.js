import React from 'react';
import {Row, Col} from 'antd';
import request from '../../utils/request';
import {api_newest_warning_opinion,
    api_today_opinion,
    api_media_opinion,
    api_media_count,
    api_newest_opinion,
    api_newest_negative_opinion,
    api_weibo_opinion,
    api_people_opinion,
    api_count_opinion
} from '../../services/api';
import {formatOpinion,
    formatWeiboOpinion,
    formatTodayOpinion,
    formatMediaChart,
    formatPosNegCount,
    formatOpinionCount} from '../../utils/format';
import OpinionBox from '../../components/OpinionBox/OpinionBox';
import NewestOpinionBox from '../../components/NewestOpinionBox/NewestOpinionBox';
import TodayOpinion from '../../components/TodayOpinion/TodayOpinion';
import MediaOpinionChart from '../../components/MediaOpinionChart/MediaOpinionChart';
import OpinionCountTable from '../../components/OpinionCountTable/OpinionCountTable';
import TopicOpinionBox from '../../components/TopicOpinionBox/TopicOpinionBox';
import './Home.less';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            newestKeys: [],
            newestValues: [],
            yesterdayOpinion: [],
            todayOpinion: [],
            newestNegativeKeys: [],
            newestNegativeValues: [],
            weiboOpinionKeys: [],
            weiboOpinionValues: [],
            mediaChartOption: {},
            posNegCount: [],
            peopleOpinionKeys: [],
            peopleOpinionValues: [],
            newestOpinionData: [],
            opinionCountArr: [],
            topicOpinionData: []
        }
    }

    componentDidMount() {
        // 最新预警舆情
        request(api_newest_warning_opinion)
            .then((res) => {
                const {keys, values} = formatOpinion(res.data);
                this.setState({
                    newestKeys: keys,
                    newestValues: values
                });
                // 昨日和今日舆情
                request(api_today_opinion)
                    .then((res) => {
                        const {yesterdayOpinion, todayOpinion} = formatTodayOpinion(res.data);
                        this.setState({
                            yesterdayOpinion: yesterdayOpinion,
                            todayOpinion: todayOpinion
                        });
                        // 热搜媒体排行
                        request(api_media_opinion)
                            .then((res) => {
                                const {mediaChartOption} = formatMediaChart(res.data);
                                this.setState({
                                    mediaChartOption: mediaChartOption
                                });
                                request(api_media_count)
                                    .then((res) => {
                                        const posNegCount = formatPosNegCount(res.data.series[0].data);
                                        this.setState({
                                            posNegCount: posNegCount
                                        });
                                        // 最新舆情
                                        request(api_newest_opinion)
                                            .then((res) => {

                                                if(res.data.code !== 0){
                                                this.setState({
                                                    newestOpinionData: res.data.doclist.slice(0, 7)
                                                });
                                               }
                                            
                                                // 最新负面舆情
                                                request(api_newest_negative_opinion)
                                                    .then((res) => {
                                                        const {keys, values} = formatOpinion(res.data);
                                                        this.setState({
                                                            newestNegativeKeys: keys,
                                                            newestNegativeValues: values
                                                        });
                                                        // 微博舆情
                                                        request(api_weibo_opinion)
                                                            .then((res) => {
                                                                const {keys, values} = formatWeiboOpinion(res.data);
                                                                this.setState({
                                                                    weiboOpinionKeys: keys,
                                                                    weiboOpinionValues: values
                                                                });
                                                                // 人物舆情
                                                                request(api_people_opinion)
                                                                    .then((res) => {
                                                                        const {keys, values} = formatOpinion(res.data);
                                                                        this.setState({
                                                                            peopleOpinionKeys: keys,
                                                                            peopleOpinionValues: values
                                                                        });
                                                                        // 舆情统计
                                                                        request(api_count_opinion)
                                                                            .then((res) => {
                                                                                const {opinionCountArr} = formatOpinionCount(res.data);
                                                                                this.setState({
                                                                                    opinionCountArr: opinionCountArr
                                                                                });

                                                                            })
                                                                    })
                                                            })
                                                    })

                                            });

                                    });
                            });

                    });
            });
    }

    render() {
        return (
            <div className="home">
                <Row gutter={16} className="row">
                    <Col span={12}>
                        <OpinionBox
                            newestKeys={this.state.newestKeys}
                            newestValues={this.state.newestValues}
                            header="newestOpinion"
                        />
                    </Col>
                    <Col span={12}>
                        <TodayOpinion yesterdayOpinion={this.state.yesterdayOpinion} todayOpinion={this.state.todayOpinion}/>
                    </Col>
                </Row>
                <Row gutter={16} className="row">
                    <Col span={24}>
                        <MediaOpinionChart mediaChartOption={this.state.mediaChartOption} posNegCount={this.state.posNegCount}/>
                    </Col>
                </Row>
                <Row gutter={16} className="row">
                    <Col span={12}>
                        <NewestOpinionBox newestOpinionData={this.state.newestOpinionData}/>
                    </Col>
                    <Col span={12}>
                        <OpinionBox
                            newestKeys={this.state.newestNegativeKeys}
                            newestValues={this.state.newestNegativeValues}
                            header="newestNegativeOpinion"
                        />
                    </Col>
                </Row>
                <Row gutter={16} className="row">
                    <Col span={12}>
                        <OpinionBox
                            newestKeys={this.state.peopleOpinionKeys}
                            newestValues={this.state.peopleOpinionValues}
                            header="peopleOpinion"
                        />
                    </Col>
                    <Col span={12}>
                        <OpinionBox
                            newestKeys={this.state.weiboOpinionKeys}
                            newestValues={this.state.weiboOpinionValues}
                            header="weiboOpinion"
                        />
                    </Col>
                </Row>
                <Row gutter={16} className="row">
                    <Col span={12}>
                        <TopicOpinionBox
                            data={this.state.topicOpinionData}
                            title="专题舆情"
                        />
                    </Col>
                    <Col span={12}>
                        <OpinionCountTable data={this.state.opinionCountArr}/>
                    </Col>
                </Row>
                <div>
                </div>
            </div>
        )
    }
}

export default Home;