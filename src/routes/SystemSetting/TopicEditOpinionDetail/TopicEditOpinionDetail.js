import React from 'react';
import { connect } from 'react-redux';
import Kindeditor from '../../../components/Kindeditor/Kindeditor.js';
import './TopicEditOpinionDetail.less';
import { Form, Input, InputNumber, DatePicker, Button, Cascader, message, Select } from 'antd';
import { public_opinion_entry, api_material_opinion_list, api_add_doc_from_mat } from '../../../services/api';
import {
	getMaterialOpinionDetailRequested
} from '../../../redux/actions/createActions';
import request from '../../../utils/request';

const FormItem = Form.Item;
const Option = Select.Option;


class TopicEditOpinionDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			dateTime: '',
			updateTiem: '',
			negtiveValue: [-1],
			mediaValue: ['论坛'],
			file: [],
			id: null
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(value) {
		this.setState({ text: value })
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				request(public_opinion_entry, {
					method: 'POST',
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: `title=${values.title}&pubdate=${this.state.dateTime}&timestamp=${this.state.updateTiem}&source=${values.source}&url=${values.url}&clickcount=${values.clickCount}&replycount=${values.replyCount}&hot=${values.hot}&nrtags=${values.nrtags}&keyword=${values.keyword}&match=1&carry=${this.state.mediaValue[0]}&negative=${this.state.negtiveValue[0]}&summary=${values.summary}&content=${this.state.text}`
				}).then(res => {
					message.success(res.data.message)
					for (let i in values) {
						values[i] = '';
					}

				})
			}
		});
	};
	handleSubmitMat(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const ids = parseInt(values.file,10);
			if (!err) {
				request(api_add_doc_from_mat, {
					method: 'POST',
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: `catid=${values.file}&title=${values.title}&pubdate=${this.state.dateTime}&timestamp=${this.state.updateTiem}&source=${values.source}&url=${values.url}&clickcount=${values.clickCount}&replycount=${values.replyCount}&hot=${values.hot}&nrtags=${values.nrtags}&keyword=${values.keyword}&match=1&carry=${this.state.mediaValue[0]}&negative=${this.state.negtiveValue[0]}&summary=${values.summary}&content=${this.state.text}`
				}).then(res => {
					message.success(res.data.message)
					request(api_material_opinion_list)
					.then(ret => {
						if (ret.data) {
							this.props.getMaterialOpinionDetailRequested(`catid=${ids}`);
						}
					})		
					this.props.handle(false);			
					for (let i in values) {
						values[i] = '';
					}

				})
			}
		});
	}
	dateChange(date, dateString) {
		this.setState({
			dateTime: dateString
		})
	}
	updateChange(date, dateString) {
		this.setState({
			updateTime: dateString
		})
	}
	mediaChange(value) {

		this.setState({
			mediaValue: value
		})
	}
	negtiveChange(value) {
		this.setState({
			negtiveValue: value
		})
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 14 },
			},
		};
		// const options = [
		//     {
		//      value: 1,
		//      label: '相关舆情'
		//     },
		//      {
		//          value:2,
		//          label: '关注舆情'
		//      }
		//     ];
		const mediaOptions = [
			{
				value: '论坛',
				label: '论坛'
			},
			{
				value: '视频',
				label: '视频'
			},
			{
				value: '综合',
				label: '综合'
			},
			{
				value: '新闻',
				label: '新闻'
			},
			{
				value: '微博',
				label: '微博'
			},
			{
				value: '微信',
				label: '微信'
			},
			{
				value: '平媒',
				label: '平媒'
			},
			{
				value: '博客',
				label: '博客'
			},
			{
				value: 'APP',
				label: 'APP'
			}
		];
		const negtiveOptions = [
			{
				value: -1,
				label: '正面'
			},
			{
				value: 0,
				label: '中性'
			},
			{
				value: 1,
				label: '负面'
			},
			{
				value: 2,
				label: '预警'
			}
		]

		return (
			<div className="topicpublic-cell">
				<div className="publicTop"></div>
				<div className="topicpublicbox">
					{
						this.props.visible === true ? (
							<Form style={{ marginTop: '20px', height: '120%' }} onSubmit={this.handleSubmitMat.bind(this)}>
								<FormItem
									{...formItemLayout}
									label="文件夹"
								> 
									{getFieldDecorator('file', {
										initialValue: this.props.file[0]['id'] +''
									})(
										<Select style={{ width: 150 }}>
										{
											this.props.file.map((item, index) => {
												return <Option value={item.id +''} key={item.id}>{item.catname}</Option>											
											})
										}
										</Select>
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="标题"
								>
									{getFieldDecorator('title', {
										rules: [{ required: true, message: '标题不能为空！' }],
									})(
										<Input placeholder="标题" />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="时间"
								>
									{getFieldDecorator('date-time-picker', {
										rules: [{ required: true, message: '时间不能为空！' }],
									})(
										<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.dateChange.bind(this)} />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="更新时间"
								>
									{getFieldDecorator('date-time-picker-update', {
										rules: [{ required: true, message: '时间不能为空！' }],
									})(
										<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.updateChange.bind(this)} />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="来源"
								>
									{getFieldDecorator('source', {
										rules: [{ required: true, message: '来源不能为空！' }],
									})(
										<Input placeholder="来源" />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="URL"
								>
									{getFieldDecorator('url', {
										rules: [{ required: true, message: 'URL不能为空！' }],
									})(
										<Input placeholder="URL" />
									)}
								</FormItem>
								{/* <FormItem
												{...formItemLayout}
												label="更新状态"
										>
												{getFieldDecorator('radio-group', {
														initialValue: "未更新"
												})(
														<RadioGroup>
																<Radio value="未更新">未更新</Radio>
																<Radio value="已更新">已更新</Radio>
														</RadioGroup>
												)}
										</FormItem> */}
								<FormItem
									{...formItemLayout}
									label="要素"
								>
									{getFieldDecorator('nrtags', {
										rules: [{ required: true, message: '要素不能为空！' }],
									})(
										<Input placeholder="以空格隔开" />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="关键字"							
								>
									{getFieldDecorator('keyword', {
										rules: [{ required: true, message: '关键字不能为空！' }],
									})(
										<Input placeholder="以空格隔开" />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="属性"
								>
									{getFieldDecorator('attribute', {
										rules: [{ required: 'array', message: '请选择相关属性' }],
										initialValue: ['论坛', -1]
									})(
										<div>
											{/* <Cascader options={options} style={{width:'20%',marginRight:'5%'}} defaultValue={['1']} allowClear={false}/> */}
											<Cascader options={mediaOptions} style={{ width: '20%', marginRight: '5%' }}
												defaultValue={['论坛']} allowClear={false}
												onChange={this.mediaChange.bind(this)}
											/>
											<Cascader options={negtiveOptions} style={{ width: '20%', marginRight: '5%' }}
												defaultValue={[-1]} allowClear={false}
												onChange={this.negtiveChange.bind(this)}
											/>
										</div>
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="摘要"
								>
									{getFieldDecorator('summary', {
										rules: [{ required: true, message: '摘要不能为空！' }],
									})(
										<Input type="textarea" />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="点击数"
								>
									{getFieldDecorator('clickCount', {
										initialValue: 0
									})(
										<InputNumber min={0} />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="回复数"
								>
									{getFieldDecorator('replyCount', {
										initialValue: 0
									})(
										<InputNumber min={0} />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="热度"
								>
									{getFieldDecorator('hot', {
										initialValue: 0
									})(
										<InputNumber min={0} />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="编辑器"
								>
									<Kindeditor contents={this.state.text}
										onChange={this.handleChange} />
								</FormItem>
								<div className="publicBox">
									<Button type="primary" htmlType="submit" className="submitBtn" style={{ width: 250 }}>保存</Button>
								</div>
							</Form>
								) : (
							<Form style={{ marginTop: '20px', height: '120%' }} onSubmit={this.handleSubmit.bind(this)}>
								<FormItem
									{...formItemLayout}
									label="标题"
								>
									{getFieldDecorator('title', {
										rules: [{ required: true, message: '标题不能为空！' }],
									})(
										<Input placeholder="标题" />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="时间"
								>
									{getFieldDecorator('date-time-picker', {
										rules: [{ required: true, message: '时间不能为空！' }],
									})(
										<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.dateChange.bind(this)} />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="更新时间"
								>
									{getFieldDecorator('date-time-picker-update', {
										rules: [{ required: true, message: '时间不能为空！' }],
									})(
										<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.updateChange.bind(this)} />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="来源"
								>
									{getFieldDecorator('source', {
										rules: [{ required: true, message: '来源不能为空！' }],
									})(
										<Input placeholder="来源" />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="URL"
								>
									{getFieldDecorator('url', {
										rules: [{ required: true, message: 'URL不能为空！' }],
									})(
										<Input placeholder="URL" />
									)}
								</FormItem>
								{/* <FormItem
												{...formItemLayout}
												label="更新状态"
										>
												{getFieldDecorator('radio-group', {
														initialValue: "未更新"
												})(
														<RadioGroup>
																<Radio value="未更新">未更新</Radio>
																<Radio value="已更新">已更新</Radio>
														</RadioGroup>
												)}
										</FormItem> */}
								<FormItem
									{...formItemLayout}
									label="要素"
								>
									{getFieldDecorator('nrtags', {
										rules: [{ required: true, message: '要素不能为空！' }],
									})(
										<Input placeholder="以空格隔开" />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="关键字"							
								>
									{getFieldDecorator('keyword', {
										rules: [{ required: true, message: '关键字不能为空！' }],
									})(
										<Input placeholder="以空格隔开" />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="属性"
								>
									{getFieldDecorator('attribute', {
										rules: [{ required: 'array', message: '请选择相关属性' }],
										initialValue: ['论坛', -1]
									})(
										<div>
											{/* <Cascader options={options} style={{width:'20%',marginRight:'5%'}} defaultValue={['1']} allowClear={false}/> */}
											<Cascader options={mediaOptions} style={{ width: '20%', marginRight: '5%' }}
												defaultValue={['论坛']} allowClear={false}
												onChange={this.mediaChange.bind(this)}
											/>
											<Cascader options={negtiveOptions} style={{ width: '20%', marginRight: '5%' }}
												defaultValue={[-1]} allowClear={false}
												onChange={this.negtiveChange.bind(this)}
											/>
										</div>
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="摘要"
								>
									{getFieldDecorator('summary', {
										rules: [{ required: true, message: '摘要不能为空！' }],
									})(
										<Input type="textarea" />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="点击数"
								>
									{getFieldDecorator('clickCount', {
										initialValue: 0
									})(
										<InputNumber min={0} />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="回复数"
								>
									{getFieldDecorator('replyCount', {
										initialValue: 0
									})(
										<InputNumber min={0} />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="热度"
								>
									{getFieldDecorator('hot', {
										initialValue: 0
									})(
										<InputNumber min={0} />
									)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="编辑器"
								>
									<Kindeditor contents={this.state.text}
										onChange={this.handleChange} />
								</FormItem>
								<div className="publicBox">
									<Button type="primary" htmlType="submit" className="submitBtn" style={{ width: 250 }}>保存</Button>
								</div>
							</Form>
					  )
					}
				</div>
			</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		docList: state.getMaterialOpinionDetailSucceededReducer.data.docList,
		pageInfo: state.getMaterialOpinionDetailSucceededReducer.data.pageinfo		
	}
};

const mapDispatchToProps = dispatch => {
	return {
		getMaterialOpinionDetailRequested: req => {
			dispatch(getMaterialOpinionDetailRequested(req));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TopicEditOpinionDetail));