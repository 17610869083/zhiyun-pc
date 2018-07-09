import React from 'react';
import './Special.less';
import { Row, Col, message, Table, Button } from 'antd';
// import EditText from '../../components/editText/editText';
// import EditData from '../../components/editData/editData';
import ReportHeader from '../../components/reportHeader/reportHeader';
// import ReactEchartsCore from 'echarts-for-react/lib/core';
// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/chart/pie';
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
			reportId: ""
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
			console.log(res.data.data)
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
			console.log(res);
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
			jiaData: data
		})
		console.log(this.state.jiaData);
		Object.keys(this.state.jiaData.data).map(item => {
			if (this.state.componentId[2] === item) {
				this.setState({
					reportId: this.state.jiaData.reportId,
					data: this.state.jiaData.data[item].informationExcerpt
				})
			}
		})
	}
	render() {
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