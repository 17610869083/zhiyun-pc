import React from 'react';
import './briefing.less';
import { Row, Col, Button, Select, DatePicker } from 'antd';
import EditText from '../../components/editText/editText';
// import EditData from '../../components/editData/editData';
import request from '../../utils/request';
import {
	api_new_preview_report,
} from '../../services/api';
// import {history} from '../../utils/history';
// import moment from 'moment';
const { RangePicker } = DatePicker;
const Option = Select.Option;
// const dateFormat = 'YYYY/MM/DD';
class Briefing extends React.Component{
	constructor(){
		super()
		this.state={
			type: "",
			typeId: "",
			date: "",
			blockOne: ""
		}
	}
	componentWillMount(){
		// console.log(this.props.location.search);
		let search = this.props.location.search.split('&');
		let templateType = search[0].split('=')[1];
		let templateId = parseInt(search[1].split('=')[1],10);
		request(api_new_preview_report + '&reportFormId=' + templateId).then((res) => {
			// 遍历对象Object.keys()
			// Object.values(）对象转数组
			this.setState({
				date: res.data.data
			})
			// Object.keys(this.state.date).map(item => 
			// 	this.state.date[item].briefing.forEach((i, index) => 
      //     console.log(i, index)
			// 	)
			// 	// for (let i of this.state.date[item].briefing) {
      //   //   console.log(i);
			// 	// }
			// )
			// if (res.data.code === 1) {
				// message.success(res.data.msg);
			// }
			// ))
		});
		this.setState({
			type: templateType,
			typeId: templateId
		})
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
	render() {
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
									<div className="briefingTitle">
										<EditText
											value={this.state.date[item].reportTitle}
										/>
									</div>
									<div className="briefingData">
										<span>
											<EditText value={this.state.date[item].periods}/>
										</span>
									</div>
									<Row type="flex" justify="space-around" style={{ padding: "15px 25px 25px 55px" }}>
										<Col span={12}>
											<div className="briefingBan">
												<span className="ardrss">
													<EditText
														value={this.state.date[item].editor}
													/>
												</span>
											</div>
										</Col>
										<Col span={4}>
											<div className="briefingDate">
												<span className="data">
													<EditText
														value={this.state.date[item].date}
													/>
												</span>								  
											</div>
										</Col>
									</Row>
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
}
export default Briefing;