import React from 'react';
import './Special.less';
import { Row, Col, message, Button } from 'antd';
import EditText from '../../components/editText/editText';
import EditData from '../../components/editData/editData';
import ReportHeader from '../../components/reportHeader/reportHeader';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import request from '../../utils/request';
import {
	api_new_preview_report,
	api_update_report,
} from '../../services/api';
import {connect} from 'react-redux';
class Special extends React.Component{
	constructor(){
		super()
		this.state={
			componentId: [],
			date: "",
			dataID: 1,
			type: 1,
			typeId: 1,
			data: [],
			number: [],
			jiaData: {},
			reportId: "",
			emotionDistributionImg: {},
			mediaDistributionImg: {},
			mediaAnalysisImg: {},
			negativeCarrierAnalysisImg: {},
			mediaEwarningDistributionImg: {}
		}
	}
	componentWillMount(){
		let search = this.props.location.search.split('&');
		let templateType = search[0].split('=')[1];
		let templateId = parseInt(search[1].split('=')[1],10);
		this.setState({
			type: templateType,
			typeId: templateId
		})
		request(api_new_preview_report + '&reportFormId=' + templateId).then((res) => {
			// 遍历对象Object.keys()
			// Object.values(）对象转数组

			this.setState({
				date: res.data.data,
				dataID: res.data.component[0],
				componentId: res.data.component,
				jiaData: res.data
			})
			// Object.keys(this.state.date).map(item => {
			// 	if (this.state.componentId[2] === item) {
      //     this.setState({
			// 			data: this.state.date[item].informationExcerpt
			// 		})
			// 	}
			// })
		});
	}
	onChangeCellTitle(e) {
    request(api_update_report + '&reportId=' + this.state.reportId + '&reportTitle=' + e + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	onChangeCellEditor(e) {
		request(api_update_report + '&reportId=' + this.state.reportId + '&editor=' + e + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	onChangeCellDate(e) {
		request(api_update_report + '&reportId=' + this.state.reportId + '&date=' + e + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	hanldle= data => {
		this.setState({
			jiaData: data
		})
		Object.keys(this.state.jiaData.data).map(item => {
			this.setState({
				reportId: this.state.jiaData.reportId
			})
			if (this.state.componentId[1] === item) {
				this.setState({
					emotionDistributionImg: this.state.jiaData.data[item].emotionDistributionImg,
					mediaDistributionImg: this.state.jiaData.data[item].mediaDistributionImg
				})
			} else if (this.state.componentId[3] === item) {
        this.setState({
					mediaAnalysisImg: this.state.jiaData.data[item].mediaAnalysisImg,
				})
			} else if (this.state.componentId[4] === item) {
        this.setState({
					negativeCarrierAnalysisImg: this.state.jiaData.data[item].negativeCarrierAnalysisImg
				})
			} else if (this.state.componentId[5] === item) {
				this.setState({
					mediaEwarningDistributionImg: this.state.jiaData.data[item].mediaEwarningDistributionImg
				})
			}
		})
	}
	render() {
		const mediaOption= {
			title: {
        text: '媒体分布图',
        left: 'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{d}%"
			},
			legend: {
				// orient: 'vertical',
				// top: 'middle',
				bottom: 10,
				left: 'center',
				data: ['平面媒体', '网络媒体','论坛报道','博客报道','微信平台','APP客户端']
			},
    	series : [
        {
					type: 'pie',
					radius : '65%',
					center: ['50%', '50%'],
					selectedMode: 'single',
					data:[
						{value:1548, name: '平面媒体'},
						{value:535, name: '网络媒体'},
						{value:510, name: '论坛报道'},
						{value:634, name: '博客报道'},
						{value:735, name: '微信平台'},
						{value:735, name: 'APP客户端'}
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
        }
    	]
		};
		const mediaOptionEmotional= {
			title: {
        text: '情感分布图',
        left: 'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{d}%"
			},
			legend: {
				// orient: 'vertical',
				// top: 'middle',
				bottom: 10,
				left: 'center',
				data: ['正面倾向言论', '负面倾向言论','中立倾向言论','单纯表示关注或无意义言论']
			},
    	series : [
        {
					type: 'pie',
					radius : '65%',
					center: ['50%', '50%'],
					selectedMode: 'single',
					data:[
						{value:1548, name: '正面倾向言论'},
						{value:535, name: '负面倾向言论'},
						{value:510, name: '中立倾向言论'},
						{value:634, name: '单纯表示关注或无意义言论'}
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
        }
    	]
		};
		const analysisBar = {
			title: {
        // text: '2016年12月长宁区合规成本分析'
			},
			tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
			},
			legend: {
					// data: ['包租费', '装修费', '保洁费', '物业费'],
					// align: 'right',
					// right: 10
			},
			grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
			},
			xAxis: [{
					type: 'category',
					data: ['新闻', '论坛', '博客', '微博', '微信', '平煤', 'APP', '境外', '综合', '视频']
			}],
			yAxis: [{
					type: 'value',
					// name: '总价(万元)',
					axisLabel: {
							formatter: '{value}'
					}
			}],
			series: [{
					name: '负面',
					type: 'bar',
					data: [20, 12, 31, 34, 31, 22, 45, 54, 32, 52]
			}, {
					name: '中性',
					type: 'bar',
					data: [10, 20, 5, 9, 3, 4, 8, 9, 10, 23]
			}, {
					name: '正面',
					type: 'bar',
					data: [1, 1, 2, 3, 1, 4, 6, 7, 9, 23]
			}]
		}
		const carrierOption = {
			title : {
        text: '负面载体分布',
        // subtext: '纯属虚构',
        x:'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{d}%"
			},
			// legend: {
			// 	orient: 'vertical',
			// 	left: 'left',
			// 	data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			// },
			series : [
					{
							name: '访问来源',
							type: 'pie',
							radius : '55%',
							center: ['50%', '60%'],
							data:[
									{value:335, name:'微信'},
									{value:310, name:'新闻'},
									{value:234, name:'微博'},
									{value:135, name:'境外'},
									{value:154, name:'综合'},
									{value:234, name:'视频'},
									{value:456, name:'论坛'},
									{value:678, name:'平煤'},
									{value:789, name:'博客'},
									{value:890, name:'APP'},
							],
							itemStyle: {
									emphasis: {
											shadowBlur: 10,
											shadowOffsetX: 0,
											shadowColor: 'rgba(0, 0, 0, 0.5)'
									}
							}
					}
			]
		}
		const carrierOptionZhai = {
			// title : {
      //   text: '负面载体分布',
      //   subtext: '纯属虚构',
      //   x:'center'
			// },
			tooltip : {
				trigger: 'item',
				formatter: "{d}%"
			},
			// legend: {
			// 	orient: 'vertical',
			// 	left: 'left',
			// 	data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			// },
			series : [
					{
							name: '访问来源',
							type: 'pie',
							radius : '55%',
							center: ['50%', '60%'],
							data:[
									{value:335, name:'西部网'},
									{value:310, name:'中国亳州网'},
									{value:234, name:'中青网'},
									{value:135, name:'延边新闻网'},
									{value:154, name:'搜狐'},
									{value:234, name:'新浪博客'},
									{value:456, name:'枞阳在线'},
									{value:678, name:'浙江新闻网'}
							],
							itemStyle: {
									emphasis: {
											shadowBlur: 10,
											shadowOffsetX: 0,
											shadowColor: 'rgba(0, 0, 0, 0.5)'
									}
							}
					}
			]
		}
		return (
			<div className="col">
				<Row>
					<Col span={12} offset={6}>
						<ReportHeader
							briefingData={this.props.briefingData}
							type={this.state.type}
							typeId={this.state.typeId}
							hanldle={this.hanldle}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12} offset={6}>
						<div className="special">
							{/* 标题 */}
							{
								(() => {
                  if (this.state.jiaData.msg === "拼装数据成功") {
										return (
											<div>
													{
													Object.keys(this.state.date).map(item => (
														this.state.componentId[0] === item ? (
															<div className="specialTitle" key={item}>
																<div className="specialModule">
																	<span className="specialM">
																		{this.state.date[item].reportTitle}										  
																	</span>
																</div>
																<div className="specialEditorDate">
																	<Row>
																		<Col span={20} offset={2}>
																			<div className="editor">
																				<span>
																				  {this.state.date[item].editor}
																				</span>
																			</div>
																			<div className="date">
																				<span>
																				  {this.state.date[item].date}
																				</span>											
																			</div>
																		</Col>
																	</Row>
																</div>
																<div className="line">
																	<Row>
																		<Col span={20} offset={2}>
																			<div style={{borderBottom: "3px solid red"}}></div>
																		</Col>
																	</Row>
																</div>
															</div>
														) : null
													))
												}
												<div className="specialTakeaway">
													<Row>
														<Col span={20} offset={2}>
															<div className="takeAway"><span>一. 导读</span></div>
															{
																Object.keys(this.state.date).map(item => (
																	this.state.componentId[1] === item ? (
																		<div className="takeAwayContent" key={item}>
																			<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px", padding: "0px 0px 20px 0px" }}>
																				{this.state.date[item].guideReadingContent}
																			</p>
																		</div>
																	) : null
																))
															}
															<div className="takeAwayEchars">
																<Row>
																	<Col span={11} offset={1}>
																		<div style={{ height: 500 }}>
																			<ReactEchartsCore
																				echarts={echarts}
																				option={mediaOption}
																				lazyUpdate={true}
																				style={{ height:'400px', width: 300 }}
																			/>												  
																		</div>
																	</Col>
																	<Col span={11} offset={1}>
																		<div style={{ height: 500, float: "right" }}>
																			<ReactEchartsCore
																				echarts={echarts}
																				option={mediaOptionEmotional}
																				lazyUpdate={true}
																				style={{ height:'400px', width: 300 }}
																			/>
																		</div>
																	</Col>
																</Row>
															</div>							
														</Col>
													</Row>
												</div>
												{/* 处置建议 */}
												<div className="specialAdvice">
													<Row>
														<Col span={20} offset={2}>
															<div className="specialTitle"><span>二. 处置建议</span></div>
															{
																Object.keys(this.state.date).map(item => (
																	this.state.componentId[2] === item ? (
																		<div className="specialContent" key={item}>
																			<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px", padding: "0px 0px 20px 0px" }}>
																				{this.state.date[item].disposalSuggestionsContent}													  
																			</p>
																		</div>
																	) : null
																))
															}							  
														</Col>
													</Row>
												</div>
												{/* 媒体倾向性分析 */}
												<div className="specialAnalysis">
													<Row>
														<Col span={20} offset={2}>
															<div className="specialAnalTitle"><span>三. 媒体倾向性分析</span></div>
															{
																Object.keys(this.state.date).map(item => (
																	this.state.componentId[3] === item ? (
																		<div className="specialAnalContent" key={item}>
																			<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px", padding: "0px 0px 20px 0px" }}>
																				{this.state.date[item].mediaAnalysisContent}													  														  
																			</p>
																		</div>
																	) : null
																))
															}
															<div style={{ height: 500 }}>
																<ReactEchartsCore
																	echarts={echarts}
																	option={analysisBar}
																	lazyUpdate={true}
																	style={{ height:'400px' }}
																/>
															</div>		  
														</Col>
													</Row>
												</div>
												{/* 负面载体分析 */}
												<div className="specialCarrier">
													<Row>
														<Col span={20} offset={2}>
															<div className="specialCarTitle"><span>四. 负面载体分析</span></div>
															{
																Object.keys(this.state.date).map(item => (
																	this.state.componentId[4] === item ? (
																		<div className="specialCarContent" key={item}>
																			<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px", padding: "0px 0px 20px 0px" }}>
																				{this.state.date[item].negativeCarrierAnalysisContent}													  														  														  
																			</p>
																		</div>
																	) : null
																))
															}
															<div style={{ height: 500 }}>
																<ReactEchartsCore
																	echarts={echarts}
																	option={carrierOption}
																	lazyUpdate={true}
																	style={{ height:'400px' }}
																/>
															</div>
														</Col>
													</Row>
												</div>
												<div className="specialWarning">
													<Row>
														<Col span={20} offset={2}>
															<div className="specialWarnTitle"><span>五. 媒体预警分析</span></div>
															{
																Object.keys(this.state.date).map(item => (
																	this.state.componentId[5] === item ? (
																		<div className="specialAnalContent" key={item}>
																			<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px", padding: "0px 0px 20px 0px" }}>
																				{this.state.date[item].mediaEwarningDistributionContent}													  														  														  														  
																			</p>
																		</div>
																	) : null
																))
															}
															<div style={{ height: 500 }}>
																<ReactEchartsCore
																	echarts={echarts}
																	option={carrierOptionZhai}
																	lazyUpdate={true}
																	style={{ height:'400px' }}
																/>
															</div>
														</Col>
													</Row>
												</div>
												<div className="specialExcerpts">
													<Row>
														<Col span={20} offset={2}>
															<div className="specialExcTitle"><span>六. 摘录</span></div>
															{
																Object.keys(this.state.date).map((item, index) => (
																	this.state.componentId[6] === item ? (
																		this.state.date[item].informationExcerpt.map((i, ins) => 
																			<div key={ins} className="specialAnalContent" style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", padding: "8px 0px 8px 0px", marginBottom: 5 }}>
																				<strong>
																					<p style={{ color: "#1E82A9", fontSize: 14 }}><span>{ins + 1}.</span><span>{i.title}</span></p>
																				</strong>
																				<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px" }}>{i.summary}</p>
																				<div className="specialExcerptsContent">
																					<p style={{ fontSize: 14, color: "#1E82A9" }}>原文链接：</p>
																					<p style={{ fontSize: 14, color: "#1E82A9", wordBreak: "break-word" }}>
																						{i.url}
																					</p>
																				</div>
																			</div>
																		)
																	) : null
																))
															}
															<div style={{ height: 50, backgroundColor: "#fff" }}></div>
														</Col>
													</Row>
												</div>
											</div>
										)
									} else if (this.state.jiaData.msg === "生成预览数据成功！") {
										return (
											<div>
												{
													Object.keys(this.state.jiaData.data).map(item => (
														this.state.componentId[0] === item ? (
															<div className="specialTitle" key={item}>
																<div className="specialModule">
																	<span className="specialM">
																		<EditText
																			value={this.state.jiaData.data[item].reportTitle}	
																			onChange={this.onChangeCellTitle.bind(this)}
																		/>											  
																	</span>
																</div>
																<div className="specialEditorDate">
																	<Row>
																		<Col span={20} offset={2}>
																			<div className="editor">
																				<span>
																					<EditText
																						value={this.state.jiaData.data[item].editor}
																						onChange={this.onChangeCellEditor.bind(this)}
																					/>
																				</span>
																			</div>
																			<div className="date">
																				<span>
																					<EditData
																						value={this.state.jiaData.data[item].date}
																						onChange={this.onChangeCellDate.bind(this)}
																					/>
																				</span>											
																			</div>
																		</Col>
																	</Row>
																</div>
																<div className="line">
																	<Row>
																		<Col span={20} offset={2}>
																			<div style={{borderBottom: "3px solid red"}}></div>
																		</Col>
																	</Row>
																</div>
															</div>
														) : null
													))
												}
												<div className="specialTakeaway">
													<Row>
														<Col span={20} offset={2}>
															<div className="takeAway">
															  <span>一. 导读</span>
																{
																	Object.keys(this.state.jiaData.data).map(item => (
																		this.state.componentId[1] === item ? (
																			(() => {
                                        if (this.state.jiaData.data[item].edit === "1") {
																					return <Button key={item} style={{ display: "inline-block", float: "right" }}>编辑</Button>
																				} else if (this.state.jiaData.data[item].edit === "0") {
																					return <Button key={item} style={{ display: "none" }}>编辑</Button>
																				}
																			})()
																		) : null
																	))
																}
															</div>
															{
																Object.keys(this.state.jiaData.data).map(item => (
																	this.state.componentId[1] === item ? (
																		<div className="takeAwayContent" key={item}>
																			<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px", padding: "0px 0px 20px 0px" }}>
																				{this.state.jiaData.data[item].guideReadingContent}
																			</p>
																		</div>
																	) : null
																))
															}
															<div className="takeAwayEchars">
																<Row>
																	<Col span={11} offset={1}>
																		<div style={{ height: 500 }}>
																			<ReactEchartsCore
																				echarts={echarts}
																				option={this.state.emotionDistributionImg}
																				lazyUpdate={true}
																				style={{ height:'400px', width: 300 }}
																			/>												  
																		</div>
																	</Col>
																	<Col span={11} offset={1}>
																		<div style={{ height: 500, float: "right" }}>
																			<ReactEchartsCore
																				echarts={echarts}
																				option={this.state.mediaDistributionImg}
																				lazyUpdate={true}
																				style={{ height:'400px', width: 300 }}
																			/>
																		</div>
																	</Col>
																</Row>
															</div>							
														</Col>
													</Row>
												</div>
												{/* 处置建议 */}
												<div className="specialAdvice">
													<Row>
														<Col span={20} offset={2}>
															<div className="specialTitle">
															  <span>二. 处置建议</span>
																{
																	Object.keys(this.state.jiaData.data).map(item => (
																		this.state.componentId[2] === item ? (
																			(() => {
                                        if (this.state.jiaData.data[item].edit === "1") {
																					return <Button key={item} style={{ display: "inline-block", float: "right" }}>编辑</Button>
																				} else if (this.state.jiaData.data[item].edit === "0") {
																					return <Button key={item} style={{ display: "none" }}>编辑</Button>
																				}
																			})()
																		) : null
																	))
																}
															</div>
															{
																Object.keys(this.state.jiaData.data).map(item => (
																	this.state.componentId[2] === item ? (
																		<div className="specialContent" key={item}>
																			<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px", padding: "0px 0px 20px 0px" }}>
																				{this.state.jiaData.data[item].disposalSuggestionsContent}													  
																			</p>
																		</div>
																	) : null
																))
															}							  
														</Col>
													</Row>
												</div>
												{/* 媒体倾向性分析 */}
												<div className="specialAnalysis">
													<Row>
														<Col span={20} offset={2}>
															<div className="specialAnalTitle">
															  <span>三. 媒体倾向性分析</span>
																{
																	Object.keys(this.state.jiaData.data).map(item => (
																		this.state.componentId[3] === item ? (
																			(() => {
                                        if (this.state.jiaData.data[item].edit === "1") {
																					return <Button key={item} style={{ display: "inline-block", float: "right" }}>编辑</Button>
																				} else if (this.state.jiaData.data[item].edit === "0") {
																					return <Button key={item} style={{ display: "none" }}>编辑</Button>
																				}
																			})()
																		) : null
																	))
																}
															</div>
															{
																Object.keys(this.state.jiaData.data).map(item => (
																	this.state.componentId[3] === item ? (
																		<div className="specialAnalContent" key={item}>
																			<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px", padding: "0px 0px 20px 0px" }}>
																				{this.state.jiaData.data[item].mediaAnalysisContent}													  														  
																			</p>
																		</div>
																	) : null
																))
															}
															<div style={{ height: 500 }}>
																<ReactEchartsCore
																	echarts={echarts}
																	option={this.state.mediaAnalysisImg}
																	lazyUpdate={true}
																	style={{ height:'400px' }}
																/>
															</div>		  
														</Col>
													</Row>
												</div>
												{/* 负面载体分析 */}
												<div className="specialCarrier">
													<Row>
														<Col span={20} offset={2}>
															<div className="specialCarTitle">
															  <span>四. 负面载体分析</span>
																{
																	Object.keys(this.state.jiaData.data).map(item => (
																		this.state.componentId[4] === item ? (
																			(() => {
                                        if (this.state.jiaData.data[item].edit === "1") {
																					return <Button key={item} style={{ display: "inline-block", float: "right" }}>编辑</Button>
																				} else if (this.state.jiaData.data[item].edit === "0") {
																					return <Button key={item} style={{ display: "none" }}>编辑</Button>
																				}
																			})()
																		) : null
																	))
																}
															</div>
															{
																Object.keys(this.state.date).map(item => (
																	this.state.componentId[4] === item ? (
																		<div className="specialCarContent" key={item}>
																			<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px", padding: "0px 0px 20px 0px" }}>
																				{this.state.jiaData.data[item].negativeCarrierAnalysisContent}													  														  														  
																			</p>
																		</div>
																	) : null
																))
															}
															<div style={{ height: 500 }}>
																<ReactEchartsCore
																	echarts={echarts}
																	option={this.state.negativeCarrierAnalysisImg}
																	lazyUpdate={true}
																	style={{ height:'400px' }}
																/>
															</div>
														</Col>
													</Row>
												</div>
												<div className="specialWarning">
													<Row>
														<Col span={20} offset={2}>
															<div className="specialWarnTitle">
															  <span>五. 媒体预警分析</span>
																{
																	Object.keys(this.state.jiaData.data).map(item => (
																		this.state.componentId[5] === item ? (
																			(() => {
                                        if (this.state.jiaData.data[item].edit === "1") {
																					return <Button key={item} style={{ display: "inline-block", float: "right" }}>编辑</Button>
																				} else if (this.state.jiaData.data[item].edit === "0") {
																					return <Button key={item} style={{ display: "none" }}>编辑</Button>
																				}
																			})()
																		) : null
																	))
																}
															</div>
															{
																Object.keys(this.state.jiaData.data).map(item => (
																	this.state.componentId[5] === item ? (
																		<div className="specialAnalContent" key={item}>
																			<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px", padding: "0px 0px 20px 0px" }}>
																				{this.state.jiaData.data[item].mediaEwarningDistributionContent}													  														  														  														  
																			</p>
																		</div>
																	) : null
																))
															}
															<div style={{ height: 500 }}>
																<ReactEchartsCore
																	echarts={echarts}
																	option={this.state.mediaEwarningDistributionImg}
																	lazyUpdate={true}
																	style={{ height:'400px' }}
																/>
															</div>
														</Col>
													</Row>
												</div>
												<div className="specialExcerpts">
													<Row>
														<Col span={20} offset={2}>
															<div className="specialExcTitle">
															  <span>六. 摘录</span>
																{
																	Object.keys(this.state.jiaData.data).map(item => (
																		this.state.componentId[6] === item ? (
																			(() => {
                                        if (this.state.jiaData.data[item].edit === "1") {
																					return <Button key={item} style={{ display: "inline-block", float: "right" }}>编辑</Button>
																				} else if (this.state.jiaData.data[item].edit === "0") {
																					return <Button key={item} style={{ display: "none" }}>编辑</Button>
																				}
																			})()
																		) : null
																	))
																}
															</div>
															{
																Object.keys(this.state.jiaData.data).map((item, index) => (
																	this.state.componentId[6] === item ? (
																		this.state.jiaData.data[item].informationExcerpt.map((i, ins) => 
																			<div key={ins} className="specialAnalContent" style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", padding: "8px 0px 8px 0px", marginBottom: 5 }}>
																				<strong>
																					<p style={{ color: "#1E82A9", fontSize: 14 }}><span>{ins + 1}.</span><span>{i.title}</span></p>
																				</strong>
																				<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px" }}>{i.summary}</p>
																				<div className="specialExcerptsContent">
																					<p style={{ fontSize: 14, color: "#1E82A9" }}>原文链接：</p>
																					<p style={{ fontSize: 14, color: "#1E82A9", wordBreak: "break-word" }}>
																						{i.url}
																					</p>
																				</div>
																			</div>
																		)
																	) : null
																))
															}
															<div style={{ height: 50, backgroundColor: "#fff" }}></div>
														</Col>
													</Row>
												</div>
											</div>
										)
									}
								})()
							}
						</div>
						{/* 结束 */}
					</Col>
				</Row>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		briefingData:state.briefingSwitchDataReducer.data
	}
 };
 export default connect(mapStateToProps,null)(Special);