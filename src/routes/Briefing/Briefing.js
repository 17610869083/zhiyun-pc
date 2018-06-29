import React from 'react';
import './briefing.less';
import { Row, Col, Button, Select, DatePicker } from 'antd';
import EditText from '../../components/editText/editText';
import EditData from '../../components/editData/editData';
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
			typeId: ""
		}
	}
	componentWillMount(){
		console.log(this.props.location.search);
		let search = this.props.location.search.split('&');
		let templateType = search[0].split('=')[1];
		let templateId = parseInt(search[1].split('=')[1],10);
		request(api_new_preview_report + '&reportFormId=' + templateId).then((res) => {
			console.log(res);
			// if (res.data.code === 1) {
				// message.success(res.data.msg);
			// }
		});
		this.setState({
			type: templateType,
			typeId: templateId
		})
		// api_new_preview_report
		console.log(templateType, templateId);
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
				  <div className="briefingWapper">
					  <div className="briefingTitle">
						  <EditText/>
						</div>
						<div className="briefingData"><p>第52期</p></div>
						<Row type="flex" justify="space-around" style={{ padding: 25 }}>
							<Col span={12}>
								<div className="briefingBan">
									<span className="ardrss">贵州网信办</span>
								</div>
							</Col>
							<Col span={4}>
							  <div className="briefingDate">
									<span className="data"><EditData/></span>								  
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
						<Row>
							<Col span={12} offset={2}>
							  <div className="briefingContent">
								  <div className="title">
										<strong>
											<span>1. </span>
											<span>中国联通“隐私小号”来了：每月5元</span>
										</strong>
									</div>
									<div className="pubdate">
										<strong>
											<span>发布时间：</span>
                    </strong>
										<span>2017-11-16 05:35:48</span>										                  
									</div>
									<div className="source">
										<strong>
											<span>来源：</span>
                    </strong>
										<span>中关村在线</span>		
									</div>
									<div className="tremUrl">
										<strong>
											<span>链接：</span>
                    </strong>
										<span>http://cpu.zol.com.cn/665/6657809.html</span>	
									</div>
									<div className="content">
										<strong>
											<p>内容：</p>
                    </strong>
										<p className="contentText">说点不自谦的话，高中的时候写作文，运气好，将自己的情绪挥洒在字里行间，总能被语文老师选中当做范文，然后我站在讲台上跟同学分享，课后之余，还被同学借走传阅。也就是那个时候，我特别羡慕饮酒作诗的李白，所有的情仇爱恨都可以在诗歌里表达的隐晦而自由，洒脱而豪迈。于是，在我的文字里，也有另一种故事，只是他人看不穿，也看不懂，所以会觉得那是一幅画，抽象的画。我想，那时候，或许也是优秀吧。</p>	
									</div>
								</div>
							</Col>
							<Col span={4}>
							  <div className="briefingExamine">
								  <p><b>领导批示:</b></p>
								</div>
							</Col>
						</Row>
						<Row>
							<Col span={12} offset={2}>
							  <div className="briefingContent">
								  <div className="title">
										<strong>
											<span>1. </span>
											<span>中国联通“隐私小号”来了：每月5元</span>
										</strong>
									</div>
									<div className="pubdate">
										<strong>
											<span>发布时间：</span>
                    </strong>
										<span>2017-11-16 05:35:48</span>										                  
									</div>
									<div className="source">
										<strong>
											<span>来源：</span>
                    </strong>
										<span>中关村在线</span>		
									</div>
									<div className="tremUrl">
										<strong>
											<span>链接：</span>
                    </strong>
										<span>http://cpu.zol.com.cn/665/6657809.html</span>	
									</div>
									<div className="content">
										<strong>
											<p>内容：</p>
                    </strong>
										<p className="contentText">说点不自谦的话，高中的时候写作文，运气好，将自己的情绪挥洒在字里行间，总能被语文老师选中当做范文，然后我站在讲台上跟同学分享，课后之余，还被同学借走传阅。也就是那个时候，我特别羡慕饮酒作诗的李白，所有的情仇爱恨都可以在诗歌里表达的隐晦而自由，洒脱而豪迈。于是，在我的文字里，也有另一种故事，只是他人看不穿，也看不懂，所以会觉得那是一幅画，抽象的画。我想，那时候，或许也是优秀吧。</p>	
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
				</Col>
			</Row>
		)
	}
}
export default Briefing;