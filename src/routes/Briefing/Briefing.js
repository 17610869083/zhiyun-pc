import React from 'react';
import './briefing.less';
import { Row, Col, message } from 'antd';
import EditText from '../../components/editText/editText';
import EditData from '../../components/editData/editData';
import ReportHeader from '../../components/reportHeader/reportHeader';
import request from '../../utils/request';
import {briefingSwitch} from '../../redux/actions/createActions';
import {
	api_new_preview_report,
	api_update_report,
	api_add_brief_report,
	api_refresh_brief
} from '../../services/api';
import {connect} from 'react-redux';
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
			reportId: "",
			page:1
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
	componentDidMount(){
		let _this = this;
		window.addEventListener('scroll', () =>{
		if( document.documentElement.scrollTop+ window.innerHeight -60 >= document.body.scrollHeight){
			request(api_refresh_brief + `&reportId=${this.state.reportId}&page=${this.state.page+1}`)
			.then(res => {
				if(res.data.code === 1){	
					let date = _this.state.date;
					Object.keys(date).forEach((item,index) => {
						if(date[item]['briefing']!==undefined){
						   date[item]['briefing'] = date[item]['briefing'].concat(res.data.data.briefing);
						}
				   })			
				   _this.setState({
					   date: date,
					   page:_this.state.page+1
				    })
			    }
			})
		}
	    }
	  )
	}
	componentWillUnmount(){
		this.props.briefingSwitch([]);
	}
	handleChange(value) {
	}
	onChange(dates, dateStrings) {
	}
	onOkData() {

	}
	onChangeCellTitle(e) {
		let {date} = this.state;
    request(api_update_report + '&reportId=' + this.state.reportId + '&reportTitle=' + e + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
				Object.keys(date).forEach(item => {
					 if(date[item]['date']){
                           date[item]['reportTitle'] = e
					 }
				})
				this.setState({
					date:date
				})
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	onChangeCellEditor(e) {
		let {date} = this.state;
		request(api_update_report + '&reportId=' + this.state.reportId + '&editor=' + e + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
				Object.keys(date).forEach(item => {
					if(date[item]['date']){
						  date[item]['editor'] = e
					}
			   })
			   this.setState({
				   date:date
			   })
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	onChangeCellDate(e) {
		let {date} = this.state;
		request(api_update_report + '&reportId=' + this.state.reportId + '&date=' + e + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
				Object.keys(date).forEach(item => {
					if(date[item]['date']){
						  date[item]['date'] = e
					}
			   })
			   this.setState({
				   date:date
			   })
			} else {
				message.error(res.data.msg);
			}
 		})
	}
	onChangeCellPeriods(e) {
		let {date} = this.state;
		const num = e.replace(/[^0-9]/ig,"");
		request(api_update_report + '&reportId=' + this.state.reportId + '&periods=' + num + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
				Object.keys(date).forEach(item => {
					if(date[item]['date']){
						  date[item]['periods'] = e
					}
			   })
			   this.setState({
				   date:date
			   })
			} else {
				message.error(res.data.msg);
			}
 		})
	}

	//筛选数据后，刷新报告
	refreshBrief = (data,status) => {
		let {date} = this.state;
		if(status){
			Object.keys(data.data).forEach((item,index) => {
				if(date[item]['briefing']!==undefined){
				   date[item]['briefing'] = data.data[item]['briefing'];
				}
				if(date[item]['date']!==undefined){
					date[item]= data.data[item];
				 }
		    })
			this.setState({
				reportId:data.reportId,
				dataID:data.component[0]
			})
		}else{
			Object.keys(date).forEach((item,index) => {
				if(date[item]['briefing']!==undefined){
				   date[item]['briefing'] = data.briefing;
				}

		   })
		}
		this.setState({
			date: date
		})
	}
	render() {
		return (
			<div>
				{
					(() => {
            if (this.props.briefingData.length > 0 || this.state.reportId !== "") {
              return (
								<div className="col">
								<Row>
									<Col span={12} offset={6}>
										<ReportHeader
											briefingData={this.props.briefingData}
											type={this.state.type}
											reportId={this.state.reportId}
											refreshBrief={this.refreshBrief}
											typeId={this.state.typeId}
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
																<div className="briefingData">
																	<span>
																		<EditText value={this.state.date[item].periods}
																			onChange={this.onChangeCellPeriods.bind(this)}														  
																		/>
																	</span>
																</div>
																<Row type="flex" justify="space-around">
																	<Col span={4}>
																		<div className="briefingBan" style={{ marginLeft: 50 }}>
																			<span className="ardrss">
																				<EditText
																					value={this.state.date[item].editor}
																					onChange={this.onChangeCellEditor.bind(this)}
																				/>
																			</span>
																		</div>
																	</Col>
																	<Col span={4}>
																	</Col>
																	<Col span={4}>
																	</Col>
																	<Col span={4}>
																		<div className="briefingDate" style={{ marginLeft: -35 }}>
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
																				<p style={{ width: "63%", wordBreak: "break-word" }}><a href={i.url} target="_blank">{i.url}</a></p>	
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
									  <div style={{ height: 100, backgroundColor: "#fff" }}></div>
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
											reportId={this.state.reportId}
											refreshBrief={this.refreshBrief}
											typeId={this.state.typeId}
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
																<div className="briefingData">
																	<span style={{ textAlign: "center", display: "block" }}>
																		{this.state.date[item].periods}
																	</span>
																</div>
																<Row type="flex" justify="space-around" style={{ padding: "15px 25px 25px 55px", height: -1 }}>
																	<Col span={4}>
																		<div className="briefingBan">
																			<span className="ardrss">
																				{this.state.date[item].editor}
																			</span>
																		</div>
																	</Col>
																	<Col span={4}>
																	</Col>
																	<Col span={4}>
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
																				<p style={{width: "63%", wordBreak: "break-word" }}><a href={i.url} target="_blank">{i.url}</a></p>	
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
										<div style={{ height: 100, backgroundColor: "#fff" }}></div>
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
 const mapDispatchToProps = dispatch => {
	return {
	  briefingSwitch: req => {
		dispatch(briefingSwitch(req))
	  }
	}
  };
 export default connect(mapStateToProps,mapDispatchToProps)(Briefing);