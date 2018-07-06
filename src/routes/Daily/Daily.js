import React from 'react';
import './Daily.less';
import { Row, Col, message, Table } from 'antd';
import EditText from '../../components/editText/editText';
import EditData from '../../components/editData/editData';
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
			number: []
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
				componentId: res.data.component
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
	onChangeCellMonth(e) {
		request(api_update_report + '&reportId=' + this.state.reportId + '&date=' + e + '&moduleId=' + this.state.dataID).then((res) => {
			if(res.data.code === 1) {
				message.success(res.data.msg);
			} else {
				message.error(res.data.msg);
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
		const columns = [{
			title: '序号',
			dataIndex: 'index',
			key: 'index',
			render: (text, record, index) => (
				console.log(text, record, index)
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
			<div>
				<Row>
					<Col span={12} offset={6}>
						<ReportHeader
							briefingData={this.props.briefingData}
							type={this.state.type}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12} offset={6}>
						<div className="daily">
							{/* 日报模板第一页 */}
							{
								Object.keys(this.state.date).map((item, index) => (
									this.state.componentId[0] === item ? (
										<div className="dailyTitle" key={item}>
											<div className="dailyModule">
												<span className="dailyM">
													<EditText
														value={this.state.date[item].coverTitle}
														onChange={this.onChangeCellTitle.bind(this)}
													/>
												</span>
											</div>
											<div className="dailyDate">
											<EditData/>
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
										<Table columns={columns} dataSource={this.state.data} rowKey="id" pagination={false}/>
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
												<div style={{ height: "100%", borderBottom: "1px solid #000", borderTop: "1px solid #000", padding: "10px 0px", margin: "10px 0px" }}>
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