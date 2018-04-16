import React from 'react';
import { Row, Col } from 'antd';
import './BigScreen.less';
import BigScreenAll from '../../assets/img/bigscreen_all.png';
import BigScreenTopic from '../../assets/img/bigscreen_topic.png';


function BigScreen() {
    return (
        <div className="big-screen">
            <div className="top">
                <span>大屏展示</span>
            </div>
            <div className="bottom">
                <Row gutter={16}>
                    <Col span={6}>
                        <div className="box">
                            <div className="inner-box">
                                <a href="http://web.is8.com.cn/om/dev/visual/all/index.html" className="link" target="blank">
                                    <span className="title">数据可视化总览</span>
                                    <img src={BigScreenAll} alt="all" className="img" />
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="box">
                            <div className="inner-box">
                                <a href="http://web.is8.com.cn/om/dev/visual/topic/index.html#/1" className="link" target="blank">
                                    <span className="title">数据可视化专题</span>
                                    <img src={BigScreenTopic} alt="topic" className="img" />
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="box">&nbsp;</div>
                    </Col>
                    <Col span={6}>
                        <div className="box">&nbsp;</div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

BigScreen.propTypes = {
};

export default BigScreen;
