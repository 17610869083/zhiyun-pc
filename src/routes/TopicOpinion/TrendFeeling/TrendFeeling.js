import React from 'react';
import { Row, Col } from 'antd';
import './TrendFeeling.less';
import tfBg1 from '../../../assets/img/tf_bg_01.png';
import tfBg2 from '../../../assets/img/tf_bg_02.png';
import tfBg3 from '../../../assets/img/tf_bg_03.png';
import tfBg4 from '../../../assets/img/tf_bg_04.png';
import tfBg5 from '../../../assets/img/tf_bg_05.png';
import tfBg6 from '../../../assets/img/tf_bg_06.png';

function TrendFeeling() {
  return (
    <div className="trend-feeling">
      <div className="top">态势感知</div>
      <div className="bottom">
        <Row>
          <Col span={6}>
            <a className="box" href="http://114.242.25.234:3002/gxwhongce2/sec/toBulletinWarning" target="blank">
              <div className="box-hover box-color-1">
                <div className="box-hover-1">
                  <img src={tfBg3} alt="tfBg3" className="img" />
                </div>
                <div className="box-hover-2">.</div>
                <div className="box-hover-3">.</div>
              </div>
              <span className="name">通报预警</span>
            </a>
          </Col>
          <Col span={6}>
            <a className="box" href="http://119.88.190.69:3000 " target="blank">
              <div className="box-hover box-color-2">
                <div className="box-hover-1">
                  <img src={tfBg4} alt="tfBg3" className="img" />
                </div>
                <div className="box-hover-2">.</div>
                <div className="box-hover-3">.</div>
              </div>
              <span className="name">僵木蠕检测</span>
            </a>
          </Col>
          <Col span={6}>
            <a className="box" href="http://114.242.25.234:3002/gxwhongce2/sec/adminHomeZhiDui" target="blank">
              <div className="box-hover box-color-3">
                <div className="box-hover-1">
                  <img src={tfBg2} alt="tfBg3" className="img" />
                </div>
                <div className="box-hover-2">.</div>
                <div className="box-hover-3">.</div>
              </div>
              <span className="name">用户管理</span>
            </a>
          </Col>
          <Col span={6}>
            <a className="box" href="https://119.88.190.67/" target="blank">
              <div className="box-hover box-color-4">
                <div className="box-hover-1">
                  <img src={tfBg1} alt="tfBg3" className="img" />
                </div>
                <div className="box-hover-2">.</div>
                <div className="box-hover-3">.</div>
              </div>
              <span className="name">网站检测</span>
            </a>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <a className="box" href="http://114.242.25.234:3001/main" target="blank">
              <div className="box-hover box-color-5">
                <div className="box-hover-1">
                  <img src={tfBg5} alt="tfBg3" className="img" />
                </div>
                <div className="box-hover-2">.</div>
                <div className="box-hover-3">.</div>
              </div>
              <span className="name">监控预警</span>
            </a>
          </Col>
          <Col span={6}>
            <a className="box" href="http://114.242.25.234:3002/gradeprotection/bei/toIndex" target="blank">
              <div className="box-hover box-color-6">
                <div className="box-hover-1">
                  <img src={tfBg6} alt="tfBg3" className="img" />
                </div>
                <div className="box-hover-2">.</div>
                <div className="box-hover-3">.</div>
              </div>
              <span className="name">网站治理</span>
            </a>
          </Col>
          <Col span={6}>
            <a className="box" href="https://114.242.25.234:3003/login/" target="blank">
              <div className="box-hover box-color-7">
                <div className="box-hover-1">
                  <img src={tfBg6} alt="tfBg3" className="img" />
                </div>
                <div className="box-hover-2">.</div>
                <div className="box-hover-3">.</div>
              </div>
              <span className="name">云防护</span>
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

TrendFeeling.propTypes = {
};

export default TrendFeeling;
