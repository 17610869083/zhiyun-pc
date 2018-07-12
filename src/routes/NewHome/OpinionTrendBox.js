import React from 'react';
import {connect} from 'react-redux';
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
import {GRAY,BLACK,BLUES} from '../../utils/colors';
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
                    if(this.echarts_react) {
                    let echarts_instance = this.echarts_react.getEchartsInstance();
                    echarts_instance.resize();
                    }
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
        const {themeColor} = this.props;
        return (
            <div className="opinion-trend-box"  style={{background:themeColor.bottomColor.backgroundColor}}>
                <div className="container">
                    <div className="top">
                        <div className="title">
                            <IconFont type="icon-qushi" style={{color: BLUES,fontSize: '18px'}}/>
                            <span className="txt" style={{color:BLACK}}>舆情走势</span>
                            {/* <span className="txt" style={{color:BLACK}}>信息走势</span> */}
                            <span className="btnBox">
                            <Button onClick={this.trendChange.bind(this,'day',1)}
                            style={this.state.buttonState===1?{color:'#fff',borderColor:'#108ee9',backgroundColor:'#5a8bff'}:{}}
                            >日</Button>
                            <Button onClick={this.trendChange.bind(this,'week',2)}
                             style={this.state.buttonState===2?{color:'#fff',borderColor:'#108ee9',backgroundColor:'#5a8bff'}:{}}
                            >周</Button>
                            <Button onClick={this.trendChange.bind(this,'month',3)}
                             style={this.state.buttonState===3?{color:'#fff',borderColor:'#108ee9',backgroundColor:'#5a8bff'}:{}}
                            >月</Button>
                            </span>
                            <Icon type="close-circle" className="delModule"
                            style={this.props.status==='setting'?{'visibility':'visible',color:BLUES}:{'visibility':'hidden'}}
                            onClick={this.delOpinionTrendBox.bind(this)}
                            ></Icon>
                        </div>
                    </div>
                    <div className="bottom">
                            <ReactEchartsCore
                            echarts={echarts}
                            option={this.state.mediaChartOption}
                            lazyUpdate={true}
                            style={{height: '310px', width: '75%', marginBottom: '-20px'}}
                            ref={(e) => { this.echarts_react = e; }}
                            />
                                <div className="total">
                                <div className="opinion-info">

                                    <div className="count">
                                      <div className="number">{monthCount[4]['all']}</div>
                                      <div className="test">舆情总量</div>
                                      {/* <div className="test">信息总量</div> */}
                                    </div>
                                    <div className="icon-wrapper" style={{backgroundColor: '#009efb'}}>
                                         <IconFont type="icon-yuqing" style={{color: '#ffffff',fontSize: '40px'}}/>
                                     </div>

                                </div>
                                <div className="opinion-info">
                                    <div className="count">
                                        <div className="number">{monthCount[2]['negative']}</div>
                                        <div className="test">负面总量</div>
                                        {/* <div className="test">重点总量</div> */}
                                    </div>
                                    <div className="icon-wrapper" style={{backgroundColor: '#ff6600'}}>
                                            <IconFont type="icon-jinggao-white" style={{fontSize: '40px'}}/>
                                        </div>
                                </div>
                                <div className="opinion-info">
                                    <div className="count">
                                        <div className="number">{monthCount[3]['warn']}</div>
                                        <div className="test">预警总量</div>
                                        {/* <div className="test">特推总量</div> */}
                                    </div>
                                    <div className="icon-wrapper" style={{backgroundColor: '#ffab00'}}>
                                        <IconFont type="icon-shandian-white" style={{fontSize: '40px'}}/>
                                    </div>
                                </div>
                                </div>
                    </div>
                    </div>
                </div>

        )
    }
}
const mapStateToProps = state => {
    return {
      themeColor: state.changeThemeReducer
    }
  };
export default  connect(mapStateToProps, null)(OpinionTrendBox);
