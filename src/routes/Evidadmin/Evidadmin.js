import React from 'react'
import { Form, Input, Button, Menu, message} from 'antd';
import Select from '../../components/Select/Select'
import request from '../../utils/request';
import {api_evidadmin_typeList} from '../../services/api'
import './Evidadmin.less'
const FormItem = Form.Item;
 class Evidadmin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nameValue: '',
            typeValue: '',
            option: []
        }
    }
    componentDidMount() {
        request(api_evidadmin_typeList).then(res => {
            this.setState({
                option: res.data.data
            })
        })
    }
    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
              return message.error('请把表单填写完整')
            }
            console.log(values, this.state.nameValue, this.state.typeValue)
        });
    }
    onNameChange(e) {
        this.setState({
            nameValue: e.target.value
        })
    }
    onTypeChange(e) {
        console.log(e.target.value)
    }
    onTypeOk(value) {
        this.setState({
            typeValue: value
        })
        console.log(value)
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 300 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 3000 },
                sm: { span: 14 },
            },
        };
        const { getFieldDecorator } = this.props.form;
      
        return (
        <div className="evidadmin">
            <div className="title">
                <Menu 
                        selectedKeys={['alone']}
                        style={{lineHeight:'26px',backgroundColor: '#f0f2fb',border:'none'}}
                >
                    <Menu.Item key="alone" style={{fontSize:'16px'}}>
                        互联网单词取证
                    </Menu.Item>
                </Menu>
            </div>
            <div className="content">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem
                            {...formItemLayout}
                            label="证明名称"
                            className="label"
                        >
                        <Input placeholder="证明名称" onChange={this.onNameChange.bind(this)}/>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="案件类型"
                            onChange={this.onTypeChange.bind(this)}
                            className="case-type"
                        >
                            <Select list={this.state.option} onOk={this.onTypeOk.bind(this)}></Select>
                        </FormItem>

                        

                        <FormItem
                            {...formItemLayout}
                            label="证据URL"
                            className="label"
                        >
                        {getFieldDecorator('url', {rules: [{required: true, whitespace: true, message: '请输入证据URL',}, {pattern: /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/, message: '请输入正确的URL地址'}]})(<Input placeholder="证据URL"/>)}
                        </FormItem>
                        <div className="submit">
                            <Button type="primary" htmlType="submit" className="button">
                                提交
                            </Button>
                        </div>
                    </Form>
            </div>
        </div>
        )
    }
}
Evidadmin = Form.create()(Evidadmin);
export default Evidadmin