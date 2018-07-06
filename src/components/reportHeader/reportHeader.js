import React from 'react';
import './reportHeader.less';
import { Row, Col, Button, Select, DatePicker,Modal } from 'antd';
import ModalReport from '../../components/ModalReport/ModalReport';
import ModalMaterial from '../../components/ModalMaterial/ModalMaterial';
import {api_update_brief_item} from '../../services/api';
const { RangePicker } = DatePicker;
const Option = Select.Option;
class reportHeader extends React.Component{
	constructor(){
		super()
		this.state={
		   requestUrl:''
		}
	}
	//简报编辑按钮
	editBriefing(type){
			if(type === 'have'){
				this.setState({
					requestUrl:api_update_brief_item +`&reportId=${this.state.reportId}`,
					visible:true
				})
			}else{
				this.setState({
				  isShowModalMaterial:true
				})
			}
		}
	//隐藏弹窗
	hideModal = () => {
		this.setState({
			visible:false
		})
	}
	//隐藏素材库
	hideModalMaterial = () => {
		this.setState({
			isShowModalMaterial:false
		})
	}	
	render() {
		const { type, briefingData } = this.props;
		let haveData = briefingData.length>0?'have':'none'
		return (
			<div className="headers">
				<Row type="flex" justify="space-between" className="one">
					<Col span={3}>
						<span className="yulan"><b>报告预览</b></span>
					</Col>
						{
							(() => {
								if(briefingData.length > 0) {
									return (
										<Button type="primary" className="report" style={{ backgroundColor: "#5a8bff" }} >生成报告</Button>
									)
								} else if (briefingData.length === 0) {
									return (
										<Button type="primary" className="report" style={{ backgroundColor: "#5a8bff", display: "none" }} >生成报告</Button>
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
								if (type === "01") {
									return <div className="oneButton"><Button type="primary" style={{ backgroundColor: "#5a8bff" }} className="editReport" onClick={this.editBriefing.bind(this,haveData)}>编辑报告素材</Button></div>
								} else if (type === "02") {
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
								} else if (type === "03") {
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
				<Modal  visible={this.state.visible} footer={null} onCancel={this.hideModal}
                width="70%"
                >
                <ModalReport requestUrl={this.state.request}/>
                </Modal>
				<Modal  visible={this.state.isShowModalMaterial} footer={null} onCancel={this.hideModalMaterial}
                width="70%"
                >
                <ModalMaterial/>
                </Modal>
			</div>							
		)
	}
}
 export default reportHeader;