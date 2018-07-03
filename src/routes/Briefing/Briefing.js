import React from 'react';
import './briefing.less';
import { Row, Col, Button, Select, DatePicker, message } from 'antd';
import EditText from '../../components/editText/editText';
import request from '../../utils/request';
import {
	api_new_preview_report,
	api_update_report,
	api_add_brief_report,
} from '../../services/api';
import {connect} from 'react-redux';
const { RangePicker } = DatePicker;
const Option = Select.Option;
class Briefing extends React.Component{
	constructor(){
		super()
		this.state={
			type: "",
			typeId: "",
			date: "",
			blockOne: "",
			dataID: "",
			componentID: "",
			reportId: ""
		}
	}
	componentWillMount(){
		console.log(this.props);
		let search = this.props.location.search.split('&');
		let templateType = search[0].split('=')[1];
		let templateId = parseInt(search[1].split('=')[1],10);
		this.setState({
			type: templateType,
			typeId: templateId
		})
		if (this.props.briefingData.length === 0) {
			request(api_new_preview_report + '&reportFormId=' + templateId).then((res) => {
				// 遍历对象Object.keys()
				// Object.values(）对象转数组
				this.setState({
					date: res.data.data,
					dataID: res.data.component[0]
				})
			});
		} else if (this.props.briefingData.length > 0) {
			request(api_add_brief_report + '&reportFormId=' + templateId + '&reportType=' + templateType + '&sids=["' + this.props.briefingData + '"]').then((res) => {
				console.log(res);
				// 遍历对象Object.keys()
				// Object.values(）对象转数组
				this.setState({
					date: res.data.data,
					dataID: res.data.component[0],
					reportId: res.data.reportId
				})
			});
		}
	}
	handleChange(value) {
		console.log(`selected ${value}`);
	}
	onChange(dates, dateStrings) {
		console.log('From: ', dates[0], ', to: ', dates[1]);
		console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
	}
	onOkData() {

	}
	onChangeCellTitle(e) {
		console.log(e)
    request(api_update_report + '&reportId=' + this.state.reportId + '&reportTitle=' + e).then((res) => {
			console.log(res.data.code);
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	onChangeCellEditor(e) {
		request(api_update_report + '&reportId=' + this.state.reportId + '&editor=' + e).then((res) => {
			console.log(res.data.code);
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	onChangeCellDate(e) {
		request(api_update_report + '&reportId=' + this.state.reportId + '&date=' + e).then((res) => {
			console.log(res.data.code);
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	onChangeCellPeriods(e) {
		console.log(e)
		request(api_update_report + '&reportId=' + this.state.reportId + '&periods=' + e).then((res) => {
			console.log(res.data.code);
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	render() {
		return (
			<div>
				{
					(() => {
            if (this.props.briefingData.length > 0) {
              return (
								<div>
								<Row>
									<Col span={12} offset={6}>
										<div className="headers">
											<Row type="flex" justify="space-between" className="one">
												<Col span={3}>
													<span className="yulan"><b>报告预览</b></span>
												</Col>
												  {
														(() => {
															if(this.props.briefingData.length > 0) {
																return (
																	<Button type="primary" className="report" style={{ backgroundColor: "#5a8bff" }}>生成报告</Button>
																)
															} else if (this.props.briefingData.length === 0) {
                                return (
																	<Button type="primary" className="report" style={{ backgroundColor: "#5a8bff", display: "none" }}>生成报告</Button>
																)
															}
														})()
													}
											</Row>
											<div className="two">
												<Row type="flex" justify="space-between">
													<Col span={3}>
													</Col>
													{
														(() => {
															if (this.state.type === "01") {
																return <div className="oneButton"><Button type="primary" style={{ backgroundColor: "#5a8bff" }} className="editReport">编辑报告素材</Button></div>
															} else if (this.state.type === "02") {
																return <div>
																	<div className="twoButton">
																		<Select defaultValue="lucy" style={{ width: 200, marginRight: 20 }} onChange={this.handleChange.bind(this)}>
																			<Option value="jack">Jack</Option>
																			<Option value="lucy">Lucy</Option>
																			<Option value="Yiminghe">yiminghe</Option>
																		</Select>
																		<Button type="primary" style={{ backgroundColor: "#5a8bff" }}>确定</Button>
																	</div>
																	<span style={{ color: "red" }}>*选择专题</span>
																</div>
															} else if (this.state.type === "03") {
																return <div>
																	<div className="rangeData">
																		<RangePicker
																			// ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
																			showTime
																			format="YYYY/MM/DD"
																			onChange={this.onChange}
																			onOk={this.onOkData}
																		/>
																	</div>
																	<span style={{ color: "red" }}>*可以通过时间范围获取素材</span>
																</div>
															}
														})()
													}
												</Row>
											</div>
										</div>
										{
											Object.keys(this.state.date).map(item => (
												<div className="briefingWapper" key={item}>
													{
														this.state.dataID === item ? (
															<div>
																<div className="briefingTitle">
																	<EditText
																		value={this.state.date[item].reportTitle}
																		onChange={this.onChangeCellTitle.bind(this)}
																	/>
																</div>
																<div className="briefingData">
																	<span>
																		<EditText value={this.state.date[item].periods}
																			onChange={this.onChangeCellPeriods.bind(this)}														  
																		/>
																	</span>
																</div>
																<Row type="flex" justify="space-around" style={{ padding: "0px 25px 0px 0px" }}>
																	<Col span={12}>
																		<div className="briefingBan">
																			<span className="ardrss">
																				<EditText
																					value={this.state.date[item].editor}
																					onChange={this.onChangeCellEditor.bind(this)}
																				/>
																			</span>
																		</div>
																	</Col>
																	<Col span={4}>
																		<div className="briefingDate">
																			<span className="data">
																				<EditText
																					value={this.state.date[item].date}
																					onChange={this.onChangeCellDate.bind(this)}
																				/>
																			</span>								  
																		</div>
																	</Col>
																</Row>
															</div>
														) : null
													}
													{/* {
														(() => {
															if (this.state.date[item].edit === "1") {
                                return (
																	<Row type="flex" justify="space-around" style={{ padding: "0 0 20px 0", display: "block" }}>
																		<Col span={19}>
																		</Col>
																		<Col span={2}>
																			<Button style={{ marginLeft: 30 }}>编辑</Button>
																		</Col>
																	</Row>
																)
															} else if(this.state.date[item].edit === "0") {
                                return (
																	<Row type="flex" justify="space-around" style={{ padding: "0 0 20px 0", display: "none" }}>
																		<Col span={12}>
																		</Col>
																		<Col span={4}>
																			<Button style={{ marginLeft: 38 }}>编辑</Button>
																		</Col>
																	</Row>
																)
															}
														})()
													} */}
													{
														this.state.date[item].briefing !== undefined ? (
															this.state.date[item].briefing.map((i, index) => 
															<div key={index}>
																<Row key={index}>
																	<Col span={12} offset={2}>
																		<div className="briefingContent">
																			<div className="title">
																				<strong>
																					<span>{index + 1}. </span>
																					<span>{i.title}</span>
																				</strong>
																			</div>
																			<div className="pubdate">
																				<strong>
																					<span>发布时间：</span>
																				</strong>
																				<span>{i.pubdate}</span>										                  
																			</div>
																			<div className="source">
																				<strong>
																					<span>来源：</span>
																				</strong>
																				<span>{i.source}</span>		
																			</div>
																			<div className="tremUrl">
																				<strong>
																					<span>链接：</span>
																				</strong>
																				<span>{i.url}</span>	
																			</div>
																			<div className="content">
																				<strong>
																					<p>内容：</p>
																				</strong>
																				<p className="contentText" dangerouslySetInnerHTML={{__html: i.content}}></p>	
																			</div>
																		</div>
																	</Col>
																	<Col span={4}>
																		<div className="briefingExamine">
																			<p><b>领导批示:</b></p>
																		</div>
																	</Col>
																</Row>
																</div>
															)
														) : null
													}
												</div>
											))
										}
									</Col>
								</Row>
							</div>
							)
						} else if(this.props.briefingData.length === 0) {
							return (
								<div>
								<Row>
									<Col span={12} offset={6}>
										<div className="headers">
											<Row type="flex" justify="space-between" className="one">
												<Col span={3}>
													<span className="yulan"><b>报告预览</b></span>
												</Col>
													<Button type="primary" className="report" style={{ backgroundColor: "#5a8bff" }}>生成报告</Button>
											</Row>
											<div className="two">
												<Row type="flex" justify="space-between">
													<Col span={3}>
													</Col>
													{
														(() => {
															if (this.state.type === "01") {
																return <div className="oneButton"><Button type="primary" style={{ backgroundColor: "#5a8bff" }} className="editReport">编辑报告素材</Button></div>
															} else if (this.state.type === "02") {
																return <div>
																	<div className="twoButton">
																		<Select defaultValue="lucy" style={{ width: 200, marginRight: 20 }} onChange={this.handleChange.bind(this)}>
																			<Option value="jack">Jack</Option>
																			<Option value="lucy">Lucy</Option>
																			<Option value="Yiminghe">yiminghe</Option>
																		</Select>
																		<Button type="primary" style={{ backgroundColor: "#5a8bff" }}>确定</Button>
																	</div>
																	<span style={{ color: "red" }}>*选择专题</span>
																</div>
															} else if (this.state.type === "03") {
																return <div>
																	<div className="rangeData">
																		<RangePicker
																			// ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
																			showTime
																			format="YYYY/MM/DD"
																			onChange={this.onChange}
																			onOk={this.onOkData}
																		/>
																	</div>
																	<span style={{ color: "red" }}>*可以通过时间范围获取素材</span>
																</div>
															}
														})()
													}
												</Row>
											</div>
										</div>
										{
											Object.keys(this.state.date).map(item => (
												<div className="briefingWapper" key={item}>
													{
														this.state.dataID === item ? (
															<div>
																<div className="briefingTitle">
																	{this.state.date[item].reportTitle}
																</div>
																<div className="briefingData">
																	<span style={{ textAlign: "center", display: "block" }}>
																		{this.state.date[item].periods}
																	</span>
																</div>
																<Row type="flex" justify="space-around" style={{ padding: "15px 25px 25px 55px" }}>
																	<Col span={12}>
																		<div className="briefingBan">
																			<span className="ardrss">
																				{this.state.date[item].editor}
																			</span>
																		</div>
																	</Col>
																	<Col span={4}>
																		<div className="briefingDate">
																			<span className="data">
																				{this.state.date[item].date}  
																			</span>								  
																		</div>
																	</Col>
																</Row>
															</div>
														) : null
													}
													<Row type="flex" justify="space-around" style={{ padding: "0 0 20px 0", display: "none" }}>
														<Col span={12}>
														</Col>
														<Col span={4}>
															<Button style={{ marginLeft: 38 }}>编辑</Button>
														</Col>
													</Row>
													{
														this.state.date[item].briefing !== undefined ? (
															this.state.date[item].briefing.map((i, index) => 
															<div key={index}>
																<Row key={index}>
																	<Col span={12} offset={2}>
																		<div className="briefingContent">
																			<div className="title">
																				<strong>
																					<span>{index + 1}. </span>
																					<span>{i.title}</span>
																				</strong>
																			</div>
																			<div className="pubdate">
																				<strong>
																					<span>发布时间：</span>
																				</strong>
																				<span>{i.pubdate}</span>										                  
																			</div>
																			<div className="source">
																				<strong>
																					<span>来源：</span>
																				</strong>
																				<span>{i.source}</span>		
																			</div>
																			<div className="tremUrl">
																				<strong>
																					<span>链接：</span>
																				</strong>
																				<span>{i.url}</span>	
																			</div>
																			<div className="content">
																				<strong>
																					<p>内容：</p>
																				</strong>
																				<p className="contentText">{i.content}</p>	
																			</div>
																		</div>
																	</Col>
																	<Col span={4}>
																		<div className="briefingExamine">
																			<p><b>领导批示:</b></p>
																		</div>
																	</Col>
																</Row>
																</div>
															)
														) : null
													}
												</div>
											))
										}
									</Col>
								</Row>
							</div>
							)
						}
					})()
				}
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		briefingData:state.briefingSwitchDataReducer.data
	}
 };
 export default connect(mapStateToProps,null)(Briefing);