import React from 'react';
import {Row, Col,Icon} from 'antd';
import IconFont from '../../components/IconFont';
import './TodayOpinionBox.less';
import {api_today_opinion} from '../../services/api';
import request from '../../utils/request';
class TodayOpinionBox extends React.PureComponent {
    constructor(){
        super();
        this.state={
             todayAll:0,
             todayWarning:0,
             todayNegative:0,
             ratio:0
        }
    }
    componentWillUnmount(){
         if(this.allTimer) clearInterval(this.allTimer);
         if(this.warningTimer) clearInterval(this.warningTimer);
         if(this.negativeTimer) clearInterval(this.negativeTimer);
         if(this.ratioTimer) clearInterval(this.ratioTimer);
    }
    componentDidMount(){
        request(api_today_opinion)
        .then(res => {
        const data = res.data;    
        const todayAll = data['今日舆情'] && data['今日舆情'].length!==0 ? data['今日舆情'][4]['总数'] : 0;
        const todayWarning = data['今日舆情'] && data['今日舆情'].length!==0 ? data['今日舆情'][3]['预警'] : 0;
        const todayNegative = data['今日舆情'] && data['今日舆情'].length!==0? data['今日舆情'][2]['负面'] : 0;
        const yesterdayNegative = data['昨日舆情'] && data['昨日舆情'].length!==0? data['昨日舆情'][2]['负面'] : 0;
        const ratio =  yesterdayNegative === 0 ? 0 : Number.parseInt((todayNegative - yesterdayNegative)/yesterdayNegative*100, 10);  
        if(todayAll !==0){
            this.allTimer=setInterval(()=>{
                this.setState({
                    todayAll:this.state.todayAll+(Math.floor(todayAll/10))
                })
                if(this.state.todayAll>=todayAll){
                    clearInterval(this.allTimer)
                }
            },100)  
            }
            if(todayWarning !==0){
                this.warningTimer=setInterval(()=>{
                    this.setState({
                        todayWarning:this.state.todayWarning+(Math.floor(todayWarning/10))
                    })
                    if(this.state.todayWarning>=todayWarning){
                        clearInterval(this.warningTimer)
                    }
                },100)  
            }
            if(todayNegative !==0){
                this.negativeTimer=setInterval(()=>{
                    this.setState({
                        todayNegative:this.state.todayNegative+(Math.floor(todayNegative/10))
                    })
                    if(this.state.negativeTimer>=todayNegative){
                        clearInterval(this.negativeTimer)
                    }
                },100)  
            }
            if(ratio !==0){
                this.ratioTimer=setInterval(()=>{
                    this.setState({
                        ratio:this.state.ratio+(Math.floor(ratio/10))
                    })
                    if(this.state.ratio>=ratio){
                        clearInterval(this.ratioTimer)
                    }
                },100)  
            }
        }) 
    }
    delTodayOpinionBox(){
            this.props.delTodayBox(1);
    }
    render() {
        const {todayAll,todayWarning,todayNegative,ratio} = this.state;

        return (
            <div className="today-opinion-box">
                 <div className="today-opinion-top"
                  style={this.props.status==='setting'?{display:'block'}:{display:'none'}}>
                 <Icon type="close-circle" className="delModule" style={{fontSize: '18px',color: '#ffffff'}}
                 onClick={this.delTodayOpinionBox.bind(this)}
                 ></Icon>
                 </div>
                 <div className="container">
                 {this.state.num}
                     <Row gutter={60}>
                         <Col span={6}>
                             <div className="opinion-info">
                                 <div className="content">
                                     <div className="icon-wrapper" style={{backgroundColor: '#f2a200'}}>
                                         <IconFont type="icon-shandian22-copy" style={{color: '#ffffff',fontSize: '50px'}}/>
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
                                     <div className="icon-wrapper" style={{backgroundColor: '#e70000'}}>
                                         <IconFont type="icon-jinggao" style={{color: '#ffffff',fontSize: '50px'}}/>
                                     </div>
                                     <div className="count" style={{backgroundColor: '#ff3f3f'}}>
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
