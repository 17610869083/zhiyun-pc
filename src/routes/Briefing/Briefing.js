import React from 'react';
import './briefing.less';
import { Row, Col, Button, Select, DatePicker } from 'antd';
// import {history} from '../../utils/history';
// import moment from 'moment';
// const { RangePicker } = DatePicker;
// const Option = Select.Option;
// const dateFormat = 'YYYY/MM/DD';
class Briefing extends React.Component{
	constructor(){
		super()
		this.state={
			www: null
		}
	}
	handleChange(value) {
		console.log(`selected ${value}`);
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
								{/* 简报 */}
								<div className="oneButton"><Button type="primary" style={{ backgroundColor: "#5a8bff" }} className="editReport">编辑报告素材</Button></div>
								{/* 专报 */}
								{/* <div>
									<div className="twoButton">
										<Select defaultValue="lucy" style={{ width: 200, marginRight: 20 }} onChange={this.handleChange.bind(this)}>
											<Option value="jack">Jack</Option>
											<Option value="lucy">Lucy</Option>
											<Option value="Yiminghe">yiminghe</Option>
										</Select>
										<Button type="primary" style={{ backgroundColor: "#5a8bff" }}>确定</Button>
									</div>
									<span style={{ color: "red" }}>*选择专题</span>
								</div> */}
								{/* 日报 */}
								{/* <div>
									<div className="rangeData">
										<RangePicker
										  style={{ marginRight: 20 }}
											defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
											format={dateFormat}
										/>
										<Button type="primary" style={{ backgroundColor: "#5a8bff" }}>确定</Button>
									</div>
									<span style={{ color: "red" }}>*可以通过时间范围获取素材</span>
								</div> */}
							</Row>
						</div>
					</div>
				  <div className="briefingWapper">
					  <div className="briefingTitle">网络舆情简报</div>
						<div className="briefingData"><p>第52期</p></div>
						<Row type="flex" justify="space-around" style={{ padding: 25 }}>
							<Col span={12}>
								<div className="briefingBan">
									<span className="ardrss">贵州网信办</span>
								</div>
							</Col>
							<Col span={4}>
							  <div className="briefingDate">
									<span className="data">2017-11-16</span>								  
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