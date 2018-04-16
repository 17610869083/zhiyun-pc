import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

import {Row, Col} from 'antd';

import topListImg from '../../assets/home-img/hot.png';
import './MediaOpinionChart.less'


// The usage of ReactEchartsCore are same with above.
export default class MediaOpinionChart extends React.Component {

    render() {

        const posNeg = this.props.posNegCount.map((item, index) => (
            <div key={index} className="pos-neg-count">
                <div className="top">
                    <span className="name">{item.name}</span>
                    <span className="value">{item.value}</span>
                </div>
                <div className="bottom">
                    <div className="outer">
                        <div className="inner" style={{width: item.ratio + '%'}} />
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="media-opinion-box">
                <div className="box-top">
                    <img src={topListImg} className="icon" alt="logo"/>
                    <span className="name">热搜媒体排行</span>
                </div>
                <Row className="box-bottom">
                    <Col span={18} className="left">
                        <ReactEchartsCore
                            echarts={echarts}
                            option={this.props.mediaChartOption}
                            lazyUpdate={true}
                            className="left"
                        />
                    </Col>
                    <Col span={6} className="right">
                        {posNeg}
                    </Col>
                </Row>
            </div>
        )
    }
}