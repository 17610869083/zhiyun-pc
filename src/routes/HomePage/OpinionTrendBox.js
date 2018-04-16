import React from 'react';
import {Row, Col} from 'antd';
import IconFont from '../../components/IconFont';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import request from '../../utils/request';
import {api_media_opinion,api_media_count} from '../../services/api';
import {formatMediaChart,formatPosNegCount} from '../../utils/format';
import './OpinionTrendBox.less';

class OpinionTrendBox extends React.Component {
    constructor() {
        super();
        this.state = {
            mediaChartOption: {},
            monthCount: [
                {value: ""},
                {value: ""},
                {value: ""}
            ]
        }
    }

    componentDidMount() {
        request(api_media_opinion)
            .then((res) => {
                if(res.data ){
                const {mediaChartOption} = formatMediaChart(res.data);
                this.setState({
                    mediaChartOption: mediaChartOption
                });
                request(api_media_count)
                    .then((res) => {
                        const data = formatPosNegCount(res.data.series[0].data);
                        this.setState({
                            monthCount: data
                        })
                        let echarts_instance = this.echarts_react.getEchartsInstance();
                        echarts_instance.resize();
                    });
                }
            });
    }

    render() {
        const {monthCount} = this.state;
        return (
            <div className="opinion-trend-box">
          
                <div className="container">
                    <div className="top">
                        <div className="title">
                            <IconFont type="icon-qushi" style={{color: '#3F94FD',fontSize: '18px'}}/>
                            <span className="txt">舆情走势</span>
                        </div>
                        <Row className="row">
                            <Col span={8} className="col">
                                <div className="opinion-info">
                                    <div className="count">
                                        <div className="number">{monthCount[0].value}</div>
                                        <div className="test">月 舆情总量</div>
                                    </div>
                                    <div className="icon-wrapper" style={{backgroundColor: '#009efb'}}>
                                        <IconFont type="icon-yuqing" style={{color: '#ffffff',fontSize: '40px'}}/>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} className="col">
                                <div className="opinion-info">
                                    <div className="count">
                                        <div className="number">{monthCount[1].value}</div>
                                        <div className="test">月 负面总量</div>
                                    </div>
                                    <div className="icon-wrapper" style={{backgroundColor: '#ff6600'}}>
                                        <IconFont type="icon-jinggao-white" style={{fontSize: '40px'}}/>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} className="col">
                                <div className="opinion-info">
                                    <div className="count">
                                        <div className="number">{monthCount[2].value}</div>
                                        <div className="test">月 预警总量</div>
                                    </div>
                                    <div className="icon-wrapper" style={{backgroundColor: '#ffab00'}}>
                                        <IconFont type="icon-shandian-white" style={{fontSize: '40px'}}/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="bottom">
                        {/*<div id="chart" style={{width: '100%', height: '300px'}}></div>*/}
                        <ReactEchartsCore
                            echarts={echarts}
                            option={this.state.mediaChartOption}
                            lazyUpdate={true}
                            style={{height: '350px', width: '100%', marginBottom: '-20px'}}
                            ref={(e) => { this.echarts_react = e; }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default OpinionTrendBox;