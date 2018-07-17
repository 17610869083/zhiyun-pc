import React from 'react';
import {connect} from 'react-redux';
import {Row, Col,Icon, Card, Progress} from 'antd';
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
             todayWarning:1000,
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
    componentDidMount(){
        request(api_today_opinion)
        .then(res => {
        if(res.data){
        const data = res.data;    
        const todayAll = data['今日舆情'] && data['今日舆情'].length!==0 ? data['今日舆情'][4]['总数'] : 0;
        const todayWarning = data['今日舆情'] && data['今日舆情'].length!==0 ? data['今日舆情'][3]['预警'] : 0;
        const todayNegative = data['今日舆情'] && data['今日舆情'].length!==0? data['今日舆情'][2]['负面'] : 0;
        const yesterdayNegative = data['昨日舆情'] && data['昨日舆情'].length!==0? data['昨日舆情'][2]['负面'] : 0;
        const ratio = yesterdayNegative === 0 ? 0 : Number.parseInt((todayNegative - yesterdayNegative)/yesterdayNegative*100, 10);  
        if(todayAll !==0){
            this.allTimer=setInterval(()=>{
                if(this.state.todayAll>=todayAll){
                    this.setState({
                        todayAll:todayAll
                    })
                    clearInterval(this.allTimer)
                }else{
                    this.setState({
                        todayAll:this.state.todayAll+(Math.floor(todayAll/10))
                    })
                }
            },100)  
            }
            if(todayWarning !==0){
                this.warningTimer=setInterval(()=>{
                    if(this.state.todayWarning>=todayWarning){
                        this.setState({
                            todayWarning:todayWarning
                        })
                        clearInterval(this.warningTimer)
                    }else{
                        this.setState({
                            todayWarning:this.state.todayWarning+(Math.floor(todayWarning/10))
                        })
                    }
                },100)  
            }
            if(todayNegative !==0){
                this.negativeTimer=setInterval(()=>{
                    if(this.state.todayNegative>=todayNegative){
                        this.setState({
                            todayNegative:todayNegative
                        })
                        clearInterval(this.negativeTimer)
                    }else{
                        this.setState({
                            todayNegative:this.state.todayNegative+(Math.floor(todayNegative/10))
                        })
                    }
                },100)  
            }
            if(ratio !==0){
                this.ratioTimer=setInterval(()=>{
                    if(this.state.ratio>=ratio){
                        this.setState({
                            ratio:ratio
                        })
                        clearInterval(this.ratioTimer)
                    }else{
                        this.setState({
                            ratio:this.state.ratio+(Math.floor(ratio/10))
                        })
                    }
                },100)  
            }
        }    
        }) 
        
    }
    delTodayOpinionBox(){
            this.props.delTodayBox(1);
    }
    goAllOpinion(type){
        history.push({
            pathname: '/allopinion?datetag=today&neg=' + type
        });
    }
    render() {
				// const {todayAll ,todayNegative,} = this.state;sss
				// ratio
				const {themeColor} = this.props;
				const value = this.state.todayWarning;
				const valueNegative = this.state.todayNegative;
				const valueAll = this.state.todayAll;
				// const unit = "%";
				const initcolor = "#fff";
				const min = 0;
				const max = 10000	
				const color = initcolor;
				const background = "none"; //背景
				const dataStyle = {
						normal: {
								label: {
										show: false
								},
								labelLine: {
										show: false
								},
								shadowBlur: 40,
								shadowColor: 'rgba(40, 40, 40, 0.5)'
						}
				};
				const placeHolderStyle = {
						normal: {
								color: 'rgba(44,59,70,0)', //未完成的圆环的颜色
								label: {
										show: false
								},
								labelLine: {
										show: false
								}
						}
				};
				const mediaOption= {
				  title: {
						text: '今日预警\n' + this.state.todayWarning,
						x: 'center',
						y: 'center',
						// top: '53%',
						textStyle: {
								fontWeight: 'normal',
								color: color,
								fontSize: 16
						}
					},
					backgroundColor: background,
					color: [color, '#313443', '#fff'],
					tooltip: {
							show: false,
							formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
							show: false,
							// itemGap: 12,
							data: ["01", "02"],
							// left: 'center',
							// top: 'center',
							// icon: 'none',
							// align: 'center',
							textStyle: {
									color: "#fff",
									fontSize: 16
							},
					},
					toolbox: {
							show: false,
							feature: {
									mark: {
											show: true
									},
									dataView: {
											show: true,
											readOnly: false
									},
									restore: {
											show: true
									},
									saveAsImage: {
											show: true
									}
							}
					},
					series: [{
							name: '今日预警',
							type: 'pie',
							clockWise: false,
							radius: ['50%', '58%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							data: [{
											value: value - min,
											name: '01',
											itemStyle: {
												normal: {
													color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
														offset: 0,
														color: '#7777eb'
													}, {
														offset: 1,
														color: '#70ffac'
													}]),
												},
											},

									}, {
											value: max - value,
											name: 'invisible',
											itemStyle: placeHolderStyle
									}
			
							]
					}, {
							name: 'Line 2',
							type: 'pie',
							animation: false,
							clockWise: false,
							radius: ['58%', '60%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							tooltip: {
									show: false
							},
							data: [{
											value: 100,
											name: '02',
											itemStyle: {
													normal: {
															color: "#3c6482",
													},
											}
							}]
					}, {
							name: 'Line 3',
							type: 'pie',
							animation: false,
							clockWise: false,
							radius: ['48%', '50%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							tooltip: {
									show: false
							},
							data: [{
											value: 100,
											name: '02',
											itemStyle: {
													normal: {
															color: "#3c6482",
													},
											}
									}
							]
					}]
				};
				const mediaOptionNegative= {
				  title: {
						text: '今日负面\n' + this.state.todayNegative,
						x: 'center',
						y: 'center',
						// top: '53%',
						textStyle: {
								fontWeight: 'normal',
								color: color,
								fontSize: 16
						}
					},
					backgroundColor: background,
					color: [color, '#313443', '#fff'],
					tooltip: {
							show: false,
							formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
							show: false,
							// itemGap: 12,
							data: ["01", "02"],
							// left: 'center',
							// top: 'center',
							// icon: 'none',
							// align: 'center',
							textStyle: {
									color: "#fff",
									fontSize: 16
							},
					},
					toolbox: {
							show: false,
							feature: {
									mark: {
											show: true
									},
									dataView: {
											show: true,
											readOnly: false
									},
									restore: {
											show: true
									},
									saveAsImage: {
											show: true
									}
							}
					},
					series: [{
							name: '今日负面',
							type: 'pie',
							clockWise: false,
							radius: ['50%', '58%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							data: [{
											value: valueNegative - min,
											name: '01',
											itemStyle: {
												normal: {
													color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
														offset: 0,
														color: '#7777eb'
													}, {
														offset: 1,
														color: '#70ffac'
													}]),
												},
											},

									}, {
											value: max - valueNegative,
											name: 'invisible',
											itemStyle: placeHolderStyle
									}
			
							]
					}, {
							name: 'Line 2',
							type: 'pie',
							animation: false,
							clockWise: false,
							radius: ['58%', '60%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							tooltip: {
									show: false
							},
							data: [{
											value: 100,
											name: '02',
											itemStyle: {
													normal: {
															color: "#3c6482",
													},
											}
							}]
					}, {
							name: 'Line 3',
							type: 'pie',
							animation: false,
							clockWise: false,
							radius: ['48%', '50%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							tooltip: {
									show: false
							},
							data: [{
											value: 100,
											name: '02',
											itemStyle: {
													normal: {
															color: "#3c6482",
													},
											}
									}
							]
					}]
				};
				const mediaOptionPublic= {
				  title: {
						text: '今日舆情\n' + this.state.todayAll,
						x: 'center',
						y: 'center',
						// top: '53%',
						textStyle: {
								fontWeight: 'normal',
								color: color,
								fontSize: 16
						}
					},
					backgroundColor: background,
					color: [color, '#313443', '#fff'],
					tooltip: {
							show: false,
							formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
							show: false,
							// itemGap: 12,
							data: ["01", "02"],
							// left: 'center',
							// top: 'center',
							// icon: 'none',
							// align: 'center',
							textStyle: {
									color: "#fff",
									fontSize: 16
							},
					},
					toolbox: {
							show: false,
							feature: {
									mark: {
											show: true
									},
									dataView: {
											show: true,
											readOnly: false
									},
									restore: {
											show: true
									},
									saveAsImage: {
											show: true
									}
							}
					},
					series: [{
							name: '今日舆情',
							type: 'pie',
							clockWise: false,
							radius: ['50%', '58%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							data: [{
											value: valueAll - min,
											name: '01',
											itemStyle: {
												normal: {
													color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
														offset: 0,
														color: '#7777eb'
													}, {
														offset: 1,
														color: '#70ffac'
													}]),
												},
											},

									}, {
											value: max - valueAll,
											name: 'invisible',
											itemStyle: placeHolderStyle
									}
			
							]
					}, {
							name: 'Line 2',
							type: 'pie',
							animation: false,
							clockWise: false,
							radius: ['58%', '60%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							tooltip: {
									show: false
							},
							data: [{
											value: 100,
											name: '02',
											itemStyle: {
													normal: {
															color: "#3c6482",
													},
											}
							}]
					}, {
							name: 'Line 3',
							type: 'pie',
							animation: false,
							clockWise: false,
							radius: ['48%', '50%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							tooltip: {
									show: false
							},
							data: [{
											value: 100,
											name: '02',
											itemStyle: {
													normal: {
															color: "#3c6482",
													},
											}
									}
							]
					}]
				};
        return (
            <div className="today-opinion-box" draggable="true">
                 <div className="today-opinion-top" 
                  style={this.props.status==='setting'?{display:'block',background:GRAY}:{display:'none'}}>
                 <Icon type="close-circle" className="delModule" style={{fontSize: '18px',color:BLUES}}
                 onClick={this.delTodayOpinionBox.bind(this)}
                 ></Icon>
                 </div>
                 <div className="container">
								 {/* {this.state.num} */}
								    <Card title="今日统计" style={{ width: "100%", height: 377, marginTop: 20,background:themeColor.bottomColor.backgroundColor }}>
										  <Row gutter={60}>
												<Col span={24}>
												  <span style={{ fontSize: 14, color: "#fff", float: "right", paddingRight: 30 }}>负面同比增长：{this.state.ratio}%</span>
												</Col>
											</Row>
                      <Row gutter={60} style={{ marginTop: 50 }}>
                         <Col span={8} >
														<div className="opinion-info" onClick = {this.goAllOpinion.bind(this,2)}>
														 	<ReactEchartsCore
																echarts={echarts}
																option={mediaOption}
																lazyUpdate={true}
																style={{ height: 170, width: 170 }}
															/>
														</div>
                         </Col>
                         <Col span={8}>
                            <div className="opinion-info"  onClick = {this.goAllOpinion.bind(this,'all')}>
														 	<ReactEchartsCore
																echarts={echarts}
																option={mediaOptionNegative}
																lazyUpdate={true}
																style={{ height: 170, width: 170 }}
															/>
                             </div>
                         </Col>
                         <Col span={8} style={{ paddingLeft: 0 }}>
														<div className="opinion-info" onClick = {this.goAllOpinion.bind(this,1)}>
															<ReactEchartsCore
																echarts={echarts}
																option={mediaOptionPublic}
																lazyUpdate={true}
																style={{ height: 170, width: 170 }}
															/>
														</div>
                         </Col>
                      </Row>
										</Card>
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
