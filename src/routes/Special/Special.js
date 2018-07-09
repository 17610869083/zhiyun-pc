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
						  {/* 标题 */}
						  <div className="specialTitle">
							  <div className="specialModule">
									<span className="specialM">这是专报</span>
								</div>
								<div className="specialEditorDate">
									<Row>
										<Col span={20} offset={2}>
											<div className="editor">
											  <span>北京软云神州科技有限公司</span>
											</div>
											<div className="date">
												<span>2018年03月01日</span>											
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
							{/* 导读 */}
							<div className="specialTakeaway">
								<Row>
									<Col span={20} offset={2}>
										<div className="takeAway"><span>一. 导读</span></div>
										<div className="takeAwayContent">
											<p style={{ textIndent: "2em", fontSize: 14, lineHeight: "30px" }}>通过对平面媒体、网络媒体、微博平台等全网范围信息监测，2018-06-27至2018-06-28期间，共产生相关报道795篇。从报道倾向性观察，本时段正面报道599篇，占75.35%，负面报道10篇，占比1.26%，中性169篇占比21.26%，预警17篇，占比2.14%。按媒体类型进行分析，微博报道最多占报道总数的75.97%，微信次之占报道总数的17.74%，新闻报道最少仅占报道总数的6.29%。</p>
										</div>
										<div className="takeAwayEchars">
										  <Row>
												<Col span={11} offset={1}>12</Col>
												<Col span={11} offset={1}>21</Col>
											</Row>
										</div>							
									</Col>
								</Row>
							</div>
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