import React from 'react';
import {Button,Icon} from 'antd';
import IconFont from '../../components/IconFont';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import request from '../../utils/request';
import {api_new_total} from '../../services/api';
import {formatMediaChart} from '../../utils/format';
import './OpinionTrendBox.less';
import { setTimeout } from 'timers';

class OpinionTrendBox extends React.Component {
    constructor() {
        super();
        this.state = {
            mediaChartOption: {},
            monthCount: [
                {'positive': ""},
                {'neutral': ""},
                {'negative': ""},
                {'warn': ""},
                {'all': ""}
            ],
            dateObj:{
                'week':7,
                'month':30,
                'day':1
            },
            buttonState:2
        }
    }

    componentDidMount() {
        request(api_new_total + '&day=7')
            .then((res) => {
                if(res.data){
                const {mediaChartOption} = formatMediaChart(res.data);
                this.setState({
                    mediaChartOption: mediaChartOption,
                    monthCount:res.data.total
                });
                      setTimeout(()=>{
                        let echarts_instance = this.echarts_react.getEchartsInstance();
                        echarts_instance.resize();
                      },10)

         }
        })
    }
    trendChange(date,state){
        request(api_new_total + '&day='+this.state.dateObj[date])
            .then(res=>{
                if(res.data){
                    const {mediaChartOption} = formatMediaChart(res.data);
                    this.setState({
                        mediaChartOption: mediaChartOption,
                        monthCount:res.data.total,
                        buttonState:state
                    });
                }
            })
    }
    delOpinionTrendBox(){
        this.props.delTrendBox(1);
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
                            <span className="btnBox">
                            <Button onClick={this.trendChange.bind(this,'day',1)}
                            style={this.state.buttonState===1?{color:'#108ee9',borderColor:'#108ee9',backgroundColor:'#1780cc',color:'#fff'}:{}}
                            >日</Button>
                            <Button onClick={this.trendChange.bind(this,'week',2)}
                             style={this.state.buttonState===2?{color:'#108ee9',borderColor:'#108ee9',backgroundColor:'#1780cc',color:'#fff'}:{}}
                            >周</Button>
                            <Button onClick={this.trendChange.bind(this,'month',3)}
                             style={this.state.buttonState===3?{color:'#108ee9',borderColor:'#108ee9',backgroundColor:'#1780cc',color:'#fff'}:{}}
                            >月</Button>
                            </span>
                            <Icon type="close-circle" className="delModule"
                            style={this.props.status==='setting'?{'visibility':'visible'}:{'visibility':'hidden'}}
                            onClick={this.delOpinionTrendBox.bind(this)}
                            ></Icon>
                        </div>
                    </div>
                    <div className="bottom">
                            <ReactEchartsCore
                            echarts={echarts}
                            option={this.state.mediaChartOption}
                            lazyUpdate={true}
                            style={{height: '350px', width: '100%', marginBottom: '-20px'}}
                            ref={(e) => { this.echarts_react = e; }}
                            />
                                <div className="total">
                                <div className="opinion-info">
                                   <div className="icon-wrapper" style={{backgroundColor: '#009efb'}}>
                                        <IconFont type="icon-yuqing" style={{color: '#ffffff',fontSize: '40px'}}/>
                                    </div>
                                    <div className="count">
                                        <div className="test">舆情总量</div>
                                        <div className="number">{monthCount[4]['all']}</div>
                                    </div>

                                </div>
                                <div className="opinion-info">
                                <div className="icon-wrapper" style={{backgroundColor: '#ff6600'}}>
                                        <IconFont type="icon-jinggao-white" style={{fontSize: '40px'}}/>
                                    </div>
                                    <div className="count">
                                        <div className="test">负面总量</div>
                                        <div className="number">{monthCount[2]['negative']}</div>
                                    </div>
                                </div>
                                <div className="opinion-info">
                                    <div className="icon-wrapper" style={{backgroundColor: '#ffab00'}}>
                                        <IconFont type="icon-shandian-white" style={{fontSize: '40px'}}/>
                                    </div>
                                    <div className="count">
                                        <div className="test">预警总量</div>
                                        <div className="number">{monthCount[3]['warn']}</div>
                                    </div>
                                </div>
                                </div>
                    </div>
                    </div>
                </div>

        )
    }
}

export default OpinionTrendBox;
