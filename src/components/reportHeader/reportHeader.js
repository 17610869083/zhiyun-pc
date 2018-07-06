import React from 'react';
import './reportHeader.less';
import { Row, Col, Button, Select, DatePicker, message } from 'antd';
import request from '../../utils/request';
import {
	api_get_data_daily_preview,
} from '../../services/api';
const Option = Select.Option;
class reportHeader extends React.Component{
	constructor(){
		super()
		this.state={
			startValue: null,
			endValue: null,
			endOpen: false,
			startMsDate: "",
			endMsDate: "",
			startDate: "",
			endDate: "",
		}
	}
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
		console.log(field, value)
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value, dateString) => {
		console.log(value, dateString);
		// const starttime = dateString.replace(new RegExp("-","gm"),"/");
		const starttimeHaoMiao = (new Date(dateString)).getTime();
		console.log(starttimeHaoMiao)
		this.setState({
			startMsDate: starttimeHaoMiao,
			startDate: dateString
		})
    this.onChange('startValue', value);
  }

  onEndChange = (value, dateString) => {
		console.log(value, dateString);
		// const starttime = dateString.replace(new RegExp("-","gm"),"/");
		const starttimeHaoMiao = (new Date(dateString)).getTime();
		console.log(starttimeHaoMiao)
		this.setState({
			endMsDate: starttimeHaoMiao,
			endDate: dateString
		})
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  onOkDate(value) {
		request(api_get_data_daily_preview + '&reportFormId=' + this.props.typeId + '&reportType=' + this.props.type + '&starttime=' + this.state.startDate + '&endtime=' + this.state.endDate).then((res) => {
			const myDate = new Date();
			const starttimeHaoMiao = (new Date(myDate)).getTime();
			console.log(starttimeHaoMiao);
			if (this.state.startMsDate > starttimeHaoMiao && this.state.endMsDate > starttimeHaoMiao) {
				message.warning("您的选的日期超出了当前时间，请重新选择");
			} else if (this.state.startMsDate > starttimeHaoMiao && this.state.endMsDate < starttimeHaoMiao) {
				message.warning("您的选的日期超出了当前时间，请重新选择");
			} else if (this.state.startMsDate < starttimeHaoMiao && this.state.endMsDate > starttimeHaoMiao) {
				message.warning("您的选的日期超出了当前时间，请重新选择");
			} else if (this.state.endMsDate - this.state.startMsDate > 86400) {
				console.log(this.state.endMsDate - this.state.startMsDate)
				message.warning("您选择的时间超过了24个小时，请重新选择");
			} else if (this.state.startMsDate < starttimeHaoMiao && this.state.endMsDate < starttimeHaoMiao) {
				message.success(res.data.msg);
				this.props.hanldle(res.data)				
			}
		});
	}
	render() {
		const { type, briefingData } = this.props;
		const { startValue, endValue, endOpen } = this.state;
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
										<Button type="primary" className="report" style={{ backgroundColor: "#5a8bff" }}>生成报告</Button>
									)
								} else if (briefingData.length === 0) {
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
								if (type === "01") {
									return <div className="oneButton"><Button type="primary" style={{ backgroundColor: "#5a8bff" }} className="editReport">编辑报告素材</Button></div>
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
											<DatePicker
												disabledDate={this.disabledStartDate.bind(this)}
												showTime
												format="YYYY-MM-DD HH:mm:ss"
												value={startValue}
												placeholder="Start"
												onChange={this.onStartChange.bind(this)}
												onOpenChange={this.handleStartOpenChange.bind(this)}
											/>
											<DatePicker
												disabledDate={this.disabledEndDate.bind(this)}
												showTime
												format="YYYY-MM-DD HH:mm:ss"
												value={endValue}
												placeholder="End"
												onChange={this.onEndChange.bind(this)}
												open={endOpen}
												onOpenChange={this.handleEndOpenChange.bind(this)}
												onOk={this.onOkDate.bind(this)}
											/>
										</div>
										<span style={{ color: "red" }}>*可以通过时间范围获取素材,时间周期为24时制</span>
									</div>
								}
							})()
						}
					</Row>
				</div>
			</div>							
		)
	}
}
 export default reportHeader;