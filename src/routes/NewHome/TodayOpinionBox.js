import React from 'react';
import {connect} from 'react-redux';
import {Row, Col,Icon,Progress} from 'antd';
import IconFont from '../../components/IconFont';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/pie';
import './TodayOpinionBox.less';
import {api_today_opinion} from '../../services/api';
import request from '../../utils/request';
import {GRAY,BLUES} from '../../utils/colors';
import {history} from '../../utils/history';
class TodayOpinionBox extends React.PureComponent {
    constructor(){
        super();
        this.state={
             todayAll:0,
             todayWarning:0,
             todayNegative:0,
						 ratio:0,
						 echartData: [
							 {
								 value: 0,
								 name: '今日预警'
							 },
							 {
								value: 1,
								name: '今日负面'
							},
							{
								value: 0,
								name: '今日舆情'
							},
						 ]
        }
    }
    componentWillUnmount(){
         if(this.allTimer) clearInterval(this.allTimer);
         if(this.warningTimer) clearInterval(this.warningTimer);
         if(this.negativeTimer) clearInterval(this.negativeTimer);
         if(this.ratioTimer) clearInterval(this.ratioTimer);
    }
    // componentDidMount(){
    //     request(api_today_opinion)
    //     .then(res => {
    //     if(res.data){
    //     const data = res.data;    
    //     const todayAll = data['今日舆情'] && data['今日舆情'].length!==0 ? data['今日舆情'][4]['总数'] : 0;
	// 	const todayWarning = data['今日舆情'] && data['今日舆情'].length!==0 ? data['今日舆情'][3]['预警'] : 0;
    //     const todayNegative = data['今日舆情'] && data['今日舆情'].length!==0? data['今日舆情'][2]['负面'] : 0;
    //     const yesterdayNegative = data['昨日舆情'] && data['昨日舆情'].length!==0? data['昨日舆情'][2]['负面'] : 0;
    //     const ratio = yesterdayNegative === 0 ? 0 : Number.parseInt((todayNegative - yesterdayNegative)/yesterdayNegative*100, 10);  
    //     if(todayAll !==0){
    //         this.allTimer=setInterval(()=>{
    //             if(this.state.todayAll>=todayAll){
    //                 this.setState({
    //                     todayAll:todayAll
    //                 })
    //                 clearInterval(this.allTimer)
    //             }else{
    //                 this.setState({
    //                     todayAll:this.state.todayAll+(Math.floor(todayAll/10))
    //                 })
    //             }
    //         },100)  
    //         }
    //         if(todayWarning !==0){
    //             this.warningTimer=setInterval(()=>{
    //                 if(this.state.todayWarning>=todayWarning){
    //                     this.setState({
    //                         todayWarning:todayWarning
    //                     })
    //                     clearInterval(this.warningTimer)
    //                 }else{
    //                     this.setState({
    //                         todayWarning:this.state.todayWarning+(Math.floor(todayWarning/10))
    //                     })
    //                 }
    //             },100)  
    //         }
    //         if(todayNegative !==0){
    //             this.negativeTimer=setInterval(()=>{
    //                 if(this.state.todayNegative>=todayNegative){
    //                     this.setState({
    //                         todayNegative:todayNegative
    //                     })
    //                     clearInterval(this.negativeTimer)
    //                 }else{
    //                     this.setState({
    //                         todayNegative:this.state.todayNegative+(Math.floor(todayNegative/10))
    //                     })
    //                 }
    //             },100)  
    //         }
    //         if(ratio !==0){
    //             this.ratioTimer=setInterval(()=>{
    //                 if(this.state.ratio>=ratio){
    //                     this.setState({
    //                         ratio:ratio
    //                     })
    //                     clearInterval(this.ratioTimer)
    //                 }else{
    //                     this.setState({
    //                         ratio:this.state.ratio+(Math.floor(ratio/10))
    //                     })
    //                 }
    //             },100)  
    //         }
    //     }    
    //     }) 
        
    // }
    delTodayOpinionBox(){
            this.props.delTodayBox(1);
    }
    goAllOpinion(type){
        history.push({
            pathname: '/allopinion/allopiniondetail?datetag=today&neg=' + type
        });
	}
	
    render() {
			const {themeColor,todayOpinion} = this.props;
			const labelTop = {
					normal : {
						label : {
							show : true,
							position : 'center',
							formatter : '{b}',
							padding: [50, 0, 0, 0],
							textStyle: {
								baseline : 'center',
								fontSize: 14,
								color: "#ccc"
							}
						},
						labelLine : {
							show : false
						}
					}
			  };
				// 今日预警\n' + this.state.todayWarning
				const mediaOption= {
					animation: false,
					series: [{
						// name: '今日预警',
						type: 'pie',
						radius: ['50%', '65%'],
						label: {
							normal: {
								position: 'center'
							},
						},
						data: [
							{
								name:'\n今日预警\n\n' + (todayOpinion['今日舆情']?todayOpinion['今日舆情'][3]['预警']:0), 
								value:todayOpinion['今日舆情']?todayOpinion['今日舆情'][3]['预警']:300, 
								itemStyle : labelTop,
								hoverAnimation: false
							},{
								value: 100,
								tooltip: {
									show: false
								},
								itemStyle: {
									normal: {
											color: '#e1e7f0'
									},
									emphasis: {
											color: '#e1e7f0'
									}
								},
								hoverAnimation: false
							},
						],
						color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: '#5384b1'
						}, {
							offset: 1,
							color: '#5bcf3c'
						}]), "transparent"],
					}]
				};
				const mediaOptionNegative= {
					animation: false,
					series: [{
						// name: '今日预警',
						type: 'pie',
						radius: ['50%', '65%'],
						label: {
							normal: {
								position: 'center'
							},
						},
						data: [
							{
								name:'\n 今日负面\n\n' + (todayOpinion['今日舆情']?todayOpinion['今日舆情'][2]['负面']:0), 
								value:todayOpinion['今日舆情']?todayOpinion['今日舆情'][2]['负面']:300, 
								itemStyle : labelTop,
								hoverAnimation: false
							},{
								value: 100,
								tooltip: {
									show: false
								},
								itemStyle: {
									normal: {
											color: '#e1e7f0'
									},
									emphasis: {
											color: '#e1e7f0'
									}
								},
								hoverAnimation: false
							},
						],
						color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: '#fe018a'
						}, {
							offset: 1,
							color: '#ffa800'
						}]), "transparent"],
					}]
				};
				const mediaOptionPublic= {
					animation: false,
					series: [{
						// name: '今日预警',
						type: 'pie',
						radius: ['50%', '65%'],
						label: {
							normal: {
								position: 'center'
							},
						},
						data: [
							{
								name:'\n 今日舆情\n\n' + (todayOpinion['今日舆情']?todayOpinion['今日舆情'][4]['总数']:0), 
								value: todayOpinion['今日舆情']?todayOpinion['今日舆情'][4]['总数']:300, 
								itemStyle : labelTop,
								hoverAnimation: false
							},{
								value: 100,
								tooltip: {
									show: false
								},
								itemStyle: {
									normal: {
											color: '#e1e7f0'
									},
									emphasis: {
											color: '#e1e7f0'
									}
								},
								hoverAnimation: false
							},
						],
						color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: '#5a8bff'
						}, {
							offset: 1,
							color: '#00deff'
						}]), "transparent"],
					}]
				};
        return (
            <div className="today-opinion-box" draggable="true" style={{background:themeColor.bottomColor.backgroundColor}}>
								<div className="today-opinion-top" 
                  style={this.props.status==='setting'?{display:'block',background:GRAY}:{display:'none'}}>
                 <Icon type="close-circle" className="delModule" style={{fontSize: '18px',color:BLUES}}
                 onClick={this.delTodayOpinionBox.bind(this)}
                 ></Icon>
                 </div>
                 <div className="container">
								 {/* {this.state.num} */}
								 	<div className="top" style={{borderBottom: `1px solid ${themeColor.borderColor.color}`}}>
									 	<div className="title">
												<IconFont type="icon-tongji1" style={{fontSize: '28px',color:BLUES,verticalAlign:'-8px'}}/>
												<span className="txt" style={{color:themeColor.textColor.color}}>今日统计</span>
										</div>
									</div>
									<div className="bottom">
										<Row gutter={60}>
											<Col span={24}>
												<span style={{ fontSize: 16, color: themeColor.textColor.color, float: "right", paddingRight: 30, marginTop: 15 }}>负面同比增长：{this.state.ratio}%</span>
											</Col>
										</Row>
                      <Row  style={{ marginTop: 50 }}>
                         <Col span={8} >
														<div className="opinion-info" onClick = {this.goAllOpinion.bind(this,2)}>
														 	<ReactEchartsCore
																echarts={echarts}
																option={mediaOption}
																lazyUpdate={true}
																style={{ height: 170, width: '100%' }}
															/>
														</div>
                         </Col>
                         <Col span={8}>
                            <div className="opinion-info"  onClick = {this.goAllOpinion.bind(this,1)}>
														 	<ReactEchartsCore
																echarts={echarts}
																option={mediaOptionNegative}
																lazyUpdate={true}
																style={{ height: 170, width: '100%' }}
															/>
                             </div>
                         </Col>
                         <Col span={8} style={{ paddingLeft: 0 }}>
														<div className="opinion-info" onClick = {this.goAllOpinion.bind(this,'all')}>
															<ReactEchartsCore
																echarts={echarts}
																option={mediaOptionPublic}
																lazyUpdate={true}
																style={{ height: 170, width: '100%' }}
															/>
														</div>
                         </Col>
                      </Row>
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
export default  connect(mapStateToProps, null)(TodayOpinionBox);