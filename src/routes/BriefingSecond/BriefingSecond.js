import React from 'react';
import './BriefingSecond.less';
import { Row, Col,message} from 'antd';
import EditText from '../../components/editText/editText';
import EditData from '../../components/editData/editData';
import ReportHeader from '../../components/reportHeader/reportHeader';
import request from '../../utils/request';
import {
	api_new_preview_report,
	api_update_report,
	api_add_brief_report
} from '../../services/api';
import {connect} from 'react-redux';
class BriefingSecond extends React.Component{
	constructor(){
		super()
		this.state={
			type: "",
			typeId: "",
			date: "",
			blockOne: "",
			dataID: "",
			componentID: "",
			reportId: "",
			negative: {
				'-1': "正面",
				'0': "中性",
				'1': "负面",
				'2': "预警"
			},
			visible:false,
			isShowModalMaterial:false,
			request:''
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
	onChangeCellPeriods(e) {
		const num = e.replace(/[^0-9]/ig,"");
		request(api_update_report + '&reportId=' + this.state.reportId + '&periods=' + num + '&moduleId=' + this.state.dataID).then((res) => {
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
								<div className="col">
								<Row>
									<Col span={12} offset={6}>
										<ReportHeader
											briefingData={this.props.briefingData}
											type={this.state.type}
										/>
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
																	<Row type="flex" justify="space-around">
																		<Col span={4}>
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
																			<div className="briefingData" style={{ marginTop: 20 }}>
																				<span style={{ textAlign: "center", display: "block" }}>
																					<EditText value={this.state.date[item].periods}
																						onChange={this.onChangeCellPeriods.bind(this)}														  
																					/>
																				</span>
																			</div>
																		</Col>
																		<Col span={4}>
																			<div className="briefingDate">
																				<span className="data">
																					<EditData
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
														{
															this.state.dataID === item ? (
																<div style=
																	{{
																		border: "1px solid red",
																		borderBottom: "none",
																		borderLeft: "none",
																		borderRight: "none",
																		color: "red",
																		width: "74%",
																		marginLeft: 117,
																		marginBottom: 2
																	}}>
																</div>
															) : null
														}
														{
															this.state.dataID === item ? (
																<div style=
																	{{
																		border: "4px solid red",
																		borderBottom: "none",
																		borderLeft: "none",
																		borderRight: "none",
																		color: "red",
																		width: "74%",
																		marginLeft: 117,
																	}}>
																</div>
															) : null
														}
														{
															this.state.date[item].briefing !== undefined ? (
																this.state.date[item].briefing.map((i, index) => 
																<div key={index}>
																	<Row key={index}>
																		<Col span={18} offset={2}>
																			<div className="tableContent">
																			  <div className="title">
																					<strong style={{ display: "inherit",marginTop: 25 }}>
																						<span>{index + 1}. </span>
																						<span>{i.title}</span>
																					</strong>
																				</div>
																				<div className="contentWapper">
                                          <div className="collection">
																						<Row>
																							<Col span={8}>
																								<div className="nature">
																								  <strong style={{ display: "inherit", marginTop: 25 }}>
																										<span style={{ fontSize: 16, textAlign: "center", display: "inherit" }}>性质</span>
																									</strong>
																								</div>																						
																								<div className="nature"
																								  style={{
																										width: "50%",
																										height: 70,
																										borderLeft: "1px solid #000",
																										float: "left"
																									}}>
																										<span style={{ fontSize: 16, textAlign: "center", display: "inherit", marginTop: 25 }}>{this.state.negative[i.negative]}</span>
																								</div>																						
																							</Col>
																							<Col span={8}>
																								<div className="source" style={{ width: "50%", height: 70, borderLeft: "1px solid #000", float: "left" }}>
																									<strong style={{ display: "inherit", marginTop: 25 }}>
																										<span style={{ fontSize: 16, textAlign: "center", display: "inherit" }}>文章来源</span>
																									</strong>
																								</div>
																								<div className="source" style={{ width: "50%", height: 70, borderLeft: "1px solid #000", float: "left" }}>
																									<span style={{ fontSize: 16, textAlign: "center", display: "inherit", marginTop: 25 }}>{i.source}</span>
																								</div>																							
																							</Col>
																							<Col span={8}>
																								<div className="timeData" style={{ width: "50%", height: 70, borderLeft: "1px solid #000", float: "left" }}>
																									<strong style={{ display: "inherit", marginTop: 25 }}>
																										<span style={{ fontSize: 16, textAlign: "center", display: "inherit" }}>时间</span>
																									</strong>
																								</div>
																								<div className="timeData" style={{ width: "50%", height: 70, borderLeft: "1px solid #000", float: "left" }}>
																									<span style={{ fontSize: 16, textAlign: "center", display: "inherit", marginTop: 12 }}>{new Date(i.pubdate).toLocaleString()}</span>																								  
																								</div>																	
																							</Col>
																						</Row>
																					</div>
                                          <div className="cont">
																						<Row>
																							<Col span={4} style={{ display: "inherit", textAlign: "center" }}>
																								<div className="source" style={{margin: "27% 0 0 0"}}>
																									<strong>
																										<p style={{ fontSize: 16 }}>内容</p>
																									</strong>
																								</div>
																							</Col>
																							<Col span={20}>
																								<div className="timeData"
																								  ref="timeData"
																								  style={{
																										borderLeft: "1px solid #000"
																									}}>
																									<p style={{ fontSize: 16, textIndent: "2em" }}>{i.content}</p>																								  
																								</div>
																							</Col>
																						</Row>
																					</div>
                                          <div className="yuanUrl" style={{ height: 80 }}>
																						<Col span={24}>
																							<div className="source" style={{ width: "16.7%", height: 78, borderRight: "1px solid #000", float: "left" }}>
																								<strong style={{ display: "inherit", marginTop: 25 }}>
																									<span
																									  style={{
																											fontSize: 16,
																											textAlign: "center",
																											display: "inherit"
																										}}
																										>原文链接
																									</span>
																								</strong>
																							</div>
																							<div className="timeData"
																							  style={{
																									height: 100,
																								}}
																								>
																								<p style={{ fontSize: 16, marginTop: 25 }}>{i.url}</p>																								  
																							</div>
																						</Col>
																					</div>
																				</div>
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
								<div className="col">
									<Row>
										<Col span={12} offset={6}>
											<ReportHeader
												briefingData={this.props.briefingData}
												type={this.state.type}
											/>
											{
												Object.keys(this.state.date).map(item => (
													<div className="briefingWapper" key={item}>
														{
															this.state.dataID === item ? (
																<div>
																	<div className="briefingTitle">
																		{this.state.date[item].reportTitle}
																	</div>
																	<Row type="flex" justify="space-around" style={{ padding: "15px 25px 25px 55px" }}>
																		<Col span={5}>
																			<div className="briefingBan">
																				<span className="ardrss">
																					{this.state.date[item].editor}
																				</span>
																			</div>
																		</Col>
																		<Col span={8}>
																			<div className="briefingData">
																				<span style={{ textAlign: "center", display: "block" }}>
																					{this.state.date[item].periods}
																				</span>
																			</div>
																		</Col>
																		<Col span={6}>
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
														{
															this.state.dataID === item ? (
																<div style=
																	{{
																		border: "1px solid red",
																		borderBottom: "none",
																		borderLeft: "none",
																		borderRight: "none",
																		color: "red",
																		width: "74%",
																		marginLeft: 117,
																		marginBottom: 2
																	}}>
																</div>
															) : null
														}
														{
															this.state.dataID === item ? (
																<div style=
																	{{
																		border: "4px solid red",
																		borderBottom: "none",
																		borderLeft: "none",
																		borderRight: "none",
																		color: "red",
																		width: "74%",
																		marginLeft: 117,
																	}}>
																</div>
															) : null
														}
														{
															this.state.date[item].briefing !== undefined ? (
																this.state.date[item].briefing.map((i, index) => 
																<div key={index}>
																	<Row key={index}>
																		<Col span={18} offset={2}>
																			<div className="tableContent">
																			  <div className="title">
																					<strong style={{ display: "inherit",marginTop: 25 }}>
																						<span>{index + 1}. </span>
																						<span>{i.title}</span>
																					</strong>
																				</div>
																				<div className="contentWapper">
                                          <div className="collection">
																						<Row>
																							<Col span={8}>
																								<div className="nature">
																								  <strong style={{ display: "inherit", marginTop: 25 }}>
																										<span style={{ fontSize: 16, textAlign: "center", display: "inherit" }}>性质</span>
																									</strong>
																								</div>																						
																								<div className="nature"
																								  style={{
																										width: "50%",
																										height: 70,
																										borderLeft: "1px solid #000",
																										float: "left"
																									}}>
																										<span style={{ fontSize: 16, textAlign: "center", display: "inherit", marginTop: 25 }}>{this.state.negative[i.negative]}</span>
																								</div>																						
																							</Col>
																							<Col span={8}>
																								<div className="source" style={{ width: "50%", height: 70, borderLeft: "1px solid #000", float: "left" }}>
																									<strong style={{ display: "inherit", marginTop: 25 }}>
																										<span style={{ fontSize: 16, textAlign: "center", display: "inherit" }}>文章来源</span>
																									</strong>
																								</div>
																								<div className="source" style={{ width: "50%", height: 70, borderLeft: "1px solid #000", float: "left" }}>
																									<span style={{ fontSize: 16, textAlign: "center", display: "inherit", marginTop: 25 }}>{i.source}</span>
																								</div>																							
																							</Col>
																							<Col span={8}>
																								<div className="timeData" style={{ width: "50%", height: 70, borderLeft: "1px solid #000", float: "left" }}>
																									<strong style={{ display: "inherit", marginTop: 25 }}>
																										<span style={{ fontSize: 16, textAlign: "center", display: "inherit" }}>时间</span>
																									</strong>
																								</div>
																								<div className="timeData" style={{ width: "50%", height: 70, borderLeft: "1px solid #000", float: "left" }}>
																									<span style={{ fontSize: 16, textAlign: "center", display: "inherit", marginTop: 12 }}>{i.pubdate}</span>																								  
																								</div>																	
																							</Col>
																						</Row>
																					</div>
                                          <div className="cont">
																						<Row>
																							<Col span={4} style={{ display: "inherit", textAlign: "center" }}>
																								<div className="source" style={{margin: "27% 0 0 0"}}>
																									<strong>
																										<p style={{ fontSize: 16 }}>内容</p>
																									</strong>
																								</div>
																							</Col>
																							<Col span={20}>
																								<div className="timeData"
																								  ref="timeData"
																								  style={{
																										borderLeft: "1px solid #000"
																									}}>
																									<p style={{ fontSize: 16, textIndent: "2em" }}>{i.content}</p>																								  
																								</div>
																							</Col>
																						</Row>
																					</div>
                                          <div className="yuanUrl" style={{ height: 80 }}>
																						<Col span={24}>
																							<div className="source" style={{ width: "16.7%", height: 78, borderRight: "1px solid #000", float: "left" }}>
																								<strong style={{ display: "inherit", marginTop: 25 }}>
																									<span
																									  style={{
																											fontSize: 16,
																											textAlign: "center",
																											display: "inherit"
																										}}
																										>原文链接
																									</span>
																								</strong>
																							</div>
																							<div className="timeData"
																							  style={{
																									height: 100,
																								}}
																								>
																								<p style={{ fontSize: 16, marginTop: 25 }}>{i.url}</p>																								  
																							</div>
																						</Col>
																					</div>
																				</div>
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
 export default connect(mapStateToProps,null)(BriefingSecond);