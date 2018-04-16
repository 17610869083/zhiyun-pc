import React from 'react';
import {Row, Col,Icon} from 'antd';
import IconFont from '../../components/IconFont';
import './TodayOpinionBox.less';

class TodayOpinionBox extends React.PureComponent {

    delTodayOpinionBox(){
            this.props.delTodayBox(1);
    }
    render() {
        const {data} = this.props;
        const todayAll = data['今日舆情'] && data['今日舆情'].length!==0 ? data['今日舆情'][4]['总数'] : "";
        const todayWarning = data['今日舆情'] && data['今日舆情'].length!==0 ? data['今日舆情'][3]['预警'] : "";
        const todayNegative = data['今日舆情'] && data['今日舆情'].length!==0? data['今日舆情'][2]['负面'] : "";
        const yesterdayNegative = data['昨日舆情'] && data['昨日舆情'].length!==0? data['昨日舆情'][2]['负面'] : "";
        const ratio =  yesterdayNegative === 0 ? 0 : Number.parseInt((todayNegative - yesterdayNegative)/yesterdayNegative*100, 10);
        return (
            <div className="today-opinion-box">
                 <div className="today-opinion-top" 
                  style={this.props.status==='setting'?{display:'block'}:{display:'none'}}>
                 <Icon type="close-circle" className="delModule" style={{color: 'rgba(0,0,0,0.65)',fontSize: '18px'}}
                 onClick={this.delTodayOpinionBox.bind(this)}
                 ></Icon>
                 </div>
                 <div className="container">
                     <Row gutter={60}>
                         <Col span={6}>
                             <div className="opinion-info">
                                 <div className="content">
                                     <div className="icon-wrapper" style={{backgroundColor: '#f2a200'}}>
                                         <IconFont type="icon-shandian" style={{color: '#ffffff',fontSize: '50px'}}/>
                                     </div>
                                     <div className="count" style={{backgroundColor: '#ffbc34'}}>
                                         <div className="number">{todayWarning}</div>
                                         <div className="name">今日预警</div>
                                     </div>

                                 </div>
                             </div>
                         </Col>
                         <Col span={6}>
                             <div className="opinion-info">
                                 <div className="content">
                                         <div className="icon-wrapper">
                                         <IconFont type="icon-yuqing"
                                                   style={{color: '#FFFFFF',fontSize: '50px'}}
                                         />
                                     </div>
                                     <div className="count">
                                         <div className="number">{todayAll}</div>
                                         <div className="name">今日舆情</div>
                                     </div>

                                 </div>
                             </div>
                         </Col>
                         <Col span={6}>
                             <div className="opinion-info">
                                 <div className="content">
                                     <div className="icon-wrapper" style={{backgroundColor: '#e70078'}}>
                                         <IconFont type="icon-jinggao" style={{color: '#ffffff',fontSize: '50px'}}/>
                                     </div>
                                     <div className="count" style={{backgroundColor: '#ff2b99'}}>
                                         <div className="number">{todayNegative}</div>
                                         <div className="name">今日负面</div>
                                     </div>
                                 </div>
                             </div>
                         </Col>
                         <Col span={6}>
                             <div className="opinion-info">
                                 <div className="content">
                                     <div className="icon-wrapper" style={{backgroundColor: '#f26100'}}>
                                         <IconFont type="icon-sastaishiganzhi" style={{color: '#ffffff',fontSize: '50px'}}/>
                                     </div>
                                     <div className="count" style={{backgroundColor: '#ff8839'}}>
                                         <div className="number">{ratio}%</div>
                                         <div className="name">负面同比增长</div>
                                     </div>
                                 </div>
                             </div>
                         </Col>
                     </Row>
                 </div>
            </div>
        )
    }
}

export default TodayOpinionBox;