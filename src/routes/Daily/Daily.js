import React from 'react';
import './Daily.less';
import { Row, Col, Button, Select, DatePicker } from 'antd';
// import EditText from '../../components/editText/editText';
import request from '../../utils/request';
import {
	api_new_preview_report,
	// api_update_report,
	api_add_brief_report,
} from '../../services/api';
import {connect} from 'react-redux';
const { RangePicker } = DatePicker;
const Option = Select.Option;
class Daily extends React.Component{
	constructor(){
		super()
		this.state={}
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
			const sidList = JSON.stringify(this.props.briefingData);
			request(api_add_brief_report + '&reportFormId=' + templateId + '&reportType=' + templateType + '&sids=' + sidList).then((res) => {
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