import React from 'react';
import './Daily.less';
import { Row, Col, message, Table, Button } from 'antd';
import EditText from '../../components/editText/editText';
// import EditData from '../../components/editData/editData';
import ReportHeader from '../../components/reportHeader/reportHeader';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/pie';
import request from '../../utils/request';
import {
	api_new_preview_report,
	api_update_report,
} from '../../services/api';
import {connect} from 'react-redux';
class Daily extends React.Component{
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
			echartsReact: "",
			echartsMediaTypeTrendOption: ""
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
			Object.keys(this.state.date).map(item => {
				if (this.state.componentId[2] === item) {
          this.setState({
						data: this.state.date[item].informationExcerpt
					})
				}
			})
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
	onChangeCellMonth(e) {
		request(api_update_report + '&reportId=' + this.state.reportId + '&coverMonth=' + e + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	onChangeCellDay(e) {
		request(api_update_report + '&reportId=' + this.state.reportId + '&coverDay=' + e + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	onChangeCellYear(e) {
		request(api_update_report + '&reportId=' + this.state.reportId + '&coverYear=' + e + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	hanldle= data => {
		this.setState({
			jiaData: data,
		})
		Object.keys(this.state.jiaData.data).map(item => {
			if (this.state.componentId[2] === item) {
				this.setState({
					reportId: this.state.jiaData.reportId,
					data: this.state.jiaData.data[item].informationExcerpt,
				})
			} else if (this.state.componentId[1] === item) {
        this.setState({
					emotionDistributionImg: this.state.jiaData.data[item].emotionDistributionImg,
					mediaDistributionImg: this.state.jiaData.data[item].mediaDistributionImg,
					echartsReact: this.echarts_react,
					echartsMediaTypeTrendOption: this.echartsMediaTypeTrendOption
				})
			}
		})
		console.log(this.echarts_react)
		console.log(this.state.echartsReact)
		console.log(this.state.echartsMediaTypeTrendOption)
		console.log(this.echartsMediaTypeTrendOption)
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
		const columns = [{
			title: '序号',
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => (
				<span>{index + 1}</span>
			),
		}, {
			title: '文章标题',
			dataIndex: 'title',
			key: 'title',
		}, {
			title: '时间',
			dataIndex: 'pubdate',
			key: 'pubdate',
		}];
		return (
			<div className="col">
				<Row>
					<Col span={12} offset={6}>
						<ReportHeader
							briefingData={this.props.briefingData}
							type={this.state.type}
							typeId={this.state.typeId}
							hanldle={this.hanldle}
							echartsReact={this.state.echartsReact}
							echartsMediaTypeTrendOption={this.echartsMediaTypeTrendOption}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12} offset={6}>
						<div className="daily">
							{/* 日报模板第一页 */}
							{
								(() => {
									if (this.state.jiaData.msg === "拼装数据成功") {
                    return (
											<div>
													{
														Object.keys(this.state.date).map((item, index) => (
															this.state.componentId[0] === item ? (
																<div className="dailyTitle" key={item}>
																	<div className="dailyModule">
																		<span className="dailyM">
																			{this.state.date[item].coverTitle}
																		</span>
																	</div>
																	<div className="dailyDate">
																		<span
																			className="month"
																			style={{ fontSize: 27, color: "red", fontWeight: 400 }}
																		>
																			{this.state.date[item].coverMonth}月
																			<span
																				className="day"
																				style={{ fontSize: 67, color: "red", fontWeight: 400 }}
																			>
																				{this.state.date[item].coverDay}
																			</span>
																			日
																		</span>
																	</div>
																	<div className="line">
																		<Row>
																			<Col span={18} offset={3}>
																				<div style={{borderBottom: "3px solid red"}}></div>
																			</Col>
																		</Row>
																	</div>
																	<div className="dailyYear">
																		<span className="dailyY"
																			style={{ fontSize: 27, color: "red", fontWeight: 400 }}
																		>
																			{this.state.date[item].coverYear}年
																		</span>
																	</div>
																	<div className="zhiyun">
																		<span className="dailyZ" style={{ fontSize: 29 }}>{this.state.date[item].coverEditor}</span>
																	</div>
																</div>
															) : null
														))
													}
													{/* 日报导读 */}
													<div className="dailyTakeaway">
														<Row style={{ marginBottom: 20 }}>
															<Col span={18} offset={3}>
																<strong>
																	<span style={{ fontSize: 21, fontWeight: 400, color: "#000" }}>一.</span><span style={{ fontSize: 21, fontWeight: 400, color: "#000" }}>导读</span>
																</strong>
															</Col>
														</Row>
														<Row>
															<Col span={18} offset={3}>
																{
																	Object.keys(this.state.date).map(item => (
																		this.state.componentId[1] === item ? (
																			<p key={item} style={{ color: "#000", fontSize: 14, textIndent: "2em" }}>{this.state.date[item].guideReadingContent}</p>
																		) : null
																	))
																}
															</Col>
														</Row>
														<Row style={{ marginTop: 50 }}>
															<Col span={18} offset={3}>
																<Row>
																	<Col span={11}>
																		<div style={{ height: 500 }}>
																			<ReactEchartsCore
																				echarts={echarts}
																				option={mediaOption}
																				lazyUpdate={true}
																				style={{ height:'400px', width: 300 }}
																			/>												  
																		</div>
																	</Col>
																	<Col span={11}>
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
															</Col>
														</Row>
													</div>
													{/* 日报摘录 */}
													<div className="dailyExcerpts">
														<Row style={{ marginBottom: 20 }}>
															<Col span={18} offset={3}>
																<strong>
																	<span style={{ fontSize: 21, fontWeight: 400, color: "#000" }}>二.</span><span style={{ fontSize: 21, fontWeight: 400, color: "#000" }}>信息摘录</span>
																</strong>
															</Col>
														</Row>
														<Row>
															<Col span={18} offset={3}>
																<Table rowKey="id" columns={columns} dataSource={this.state.data} pagination={false}/>
															</Col>
														</Row>
														<Row>
															<Col span={18} offset={3}>
																<div style={{ height: 80, lineHeight: "80px", fontSize: 16, color: "#ccc" }}>列表中事件报道摘要：</div>
															</Col>
														</Row>
														<Row>
															<Col span={18} offset={3}>
																{
																	this.state.data.map((item, index) => 
																		<div key={index} style={{ height: "100%", borderBottom: "1px solid #000", borderTop: "1px solid #000", padding: "10px 0px", margin: "10px 0px" }}>
																			<strong>
																				<p style={{ color: "#1E82A9", fontSize: 14 }}><span>{index + 1}.</span><span>{item.title}</span></p>
																			</strong>
																			<div><p style={{ textIndent: "2em", color: "#ccc", fontSize: 14, lineHeight: "30px" }}>{item.summary}</p></div>
																			<div>
																				<p style={{ fontSize: 14, color: "#1E82A9" }}>原文链接：</p>
																				<p style={{ fontSize: 14 }}><a>{item.url}</a></p>
																			</div>
																		</div>
																	)
																}
															</Col>
														</Row>
													</div>
											</div>
										)
									} else if (this.state.jiaData.msg === "生成预览数据成功！") {
										return (
											<div>
													{
														Object.keys(this.state.jiaData.data).map((item, index) => (
															this.state.componentId[0] === item ? (
																<div className="dailyTitle" key={item}>
																	<div className="dailyModule">
																		<span className="dailyM">
																			<EditText
																			  value={this.state.jiaData.data[item].coverTitle}
																				onChange={this.onChangeCellTitle.bind(this)}
																			/>
																		</span>
																	</div>
																	<div className="dailyDate">
																		<span
																			className="month"
																			style={{ fontSize: 27, color: "red", fontWeight: 400 }}
																		>
																			<EditText
																			  style={{ display: "inline-block", width: 40 }}
																			  value={this.state.jiaData.data[item].coverMonth}
																				onChange={this.onChangeCellMonth.bind(this)}
																			/>月
																			<span
																				className="day"
																				style={{ fontSize: 67, color: "red", fontWeight: 400 }}
																			>
																			  <EditText
																					style={{ display: "inline-block", width: 82 }}
																					value={this.state.jiaData.data[item].coverDay}
																					onChange={this.onChangeCellDay.bind(this)}
																				/>
																			</span>
																			日
																		</span>
																	</div>
																	<div className="line">
																		<Row>
																			<Col span={18} offset={3}>
																				<div style={{borderBottom: "3px solid red"}}></div>
																			</Col>
																		</Row>
																	</div>
																	<div className="dailyYear">
																		<span className="dailyY"
																			style={{ fontSize: 27, color: "red", fontWeight: 400 }}
																		>
																			<EditText
																				style={{ display: "inline-block", width: 70 }}
																				value={this.state.jiaData.data[item].coverYear}
																				onChange={this.onChangeCellYear.bind(this)}
																			/>年
																		</span>
																	</div>
																	<div className="zhiyun">
																		<span className="dailyZ" style={{ fontSize: 29 }}>
																			<EditText
																				value={this.state.jiaData.data[item].coverEditor}
																				onChange={this.onChangeCellEditor.bind(this)}
																			/>
																		</span>
																	</div>
																</div>
															) : null
														))
													}
													{/* 日报导读 */}
													<div className="dailyTakeaway">
														<Row style={{ marginBottom: 20 }}>
															<Col span={18} offset={3}>
																<strong>
																	{
																		Object.keys(this.state.jiaData.data).map(item => (
																			this.state.componentId[1] === item ? (
																				<span key={item}><span style={{ fontSize: 21, fontWeight: 400, color: "#000" }}>一.</span><span style={{ fontSize: 21, fontWeight: 400, color: "#000" }}>{this.state.jiaData.data[item].guideReadingTitle}</span></span>
																			) : null
																		))
																	}
																</strong>
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
															</Col>
														</Row>
														<Row>
															<Col span={18} offset={3}>
																{
																	Object.keys(this.state.jiaData.data).map(item => (
																		this.state.componentId[1] === item ? (
																			<p key={item} style={{ color: "#000", fontSize: 14, textIndent: "2em" }}>{this.state.jiaData.data[item].guideReadingContent}</p>
																		) : null
																	))
																}
															</Col>
														</Row>
														<Row style={{ marginTop: 50 }}>
															<Col span={18} offset={3}>
																<Row>
																	<Col span={11}>
																		<div style={{ height: 500 }}>
																			<ReactEchartsCore
																				echarts={echarts}
																				option={this.state.emotionDistributionImg}
																				lazyUpdate={true}
																				style={{ height:'400px', width: 300 }}
																				ref={(e) => { this.echarts_react = e; }}
																			/>												  
																		</div>
																	</Col>
																	<Col span={11}>
																		<div style={{ height: 500, float: "right" }}>
																			<ReactEchartsCore
																				echarts={echarts}
																				option={this.state.mediaDistributionImg}
																				lazyUpdate={true}
																				style={{ height:'400px', width: 300 }}
																				ref={(e) => { this.echartsMediaTypeTrendOption = e; }}
																			/>
																		</div>
																	</Col>
																</Row>
															</Col>
														</Row>
													</div>
													{/* 日报摘录 */}
													<div className="dailyExcerpts">
														<Row style={{ marginBottom: 20 }}>
															<Col span={18} offset={3}>
																<strong>
																	{
																		Object.keys(this.state.jiaData.data).map(item => (
																			this.state.componentId[2] === item ? (
																				<span key={item}><span style={{ fontSize: 21, fontWeight: 400, color: "#000" }}>二.</span><span style={{ fontSize: 21, fontWeight: 400, color: "#000" }}>{this.state.jiaData.data[item].informationExcerptTitle}</span></span>
																			) : null
																		))
																	}
																</strong>
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
															</Col>
														</Row>
														<Row>
															<Col span={18} offset={3}>
																<Table rowKey="id" columns={columns} dataSource={this.state.data} pagination={false}/>
															</Col>
														</Row>
														<Row>
															<Col span={18} offset={3}>
																<div style={{ height: 80, lineHeight: "80px", fontSize: 16, color: "#ccc" }}>列表中事件报道摘要：</div>
															</Col>
														</Row>
														<Row>
															<Col span={18} offset={3}>
																{
																	this.state.data.map((item, index) => 
																		<div key={index} style={{ height: "100%", borderBottom: "1px solid #000", borderTop: "1px solid #000", padding: "10px 0px", margin: "10px 0px" }}>
																			<strong>
																				<p style={{ color: "#1E82A9", fontSize: 14 }}><span>{index + 1}.</span><span>{item.title}</span></p>
																			</strong>
																			<div><p style={{ textIndent: "2em", color: "#ccc", fontSize: 14, lineHeight: "30px" }}>{item.summary}</p></div>
																			<div>
																				<p style={{ fontSize: 14, color: "#1E82A9" }}>原文链接：</p>
																				<p style={{ fontSize: 14, color: "#1E82A9", wordBreak: "break-word" }}>
																				  {item.url}
																				</p>
																			</div>
																		</div>
																	)
																}
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
 export default connect(mapStateToProps,null)(Daily);