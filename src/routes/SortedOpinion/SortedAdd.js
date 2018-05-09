import React from 'react';
import {connect} from 'react-redux';
import {Tabs, Form, Input, Button ,Select,message,Tooltip,Icon} from 'antd';
import request from '../../utils/request';
import {api_sorted_cat_list,api_sorted_rule_add} from '../../services/api';
import SettingCreateTopic from '../../components/SettingCreateTopic/SettingCreateTopic';
import SettingSeniorTopic from '../../components/SettingSeniorTopic/SettingSeniorTopic';
import {history} from "../../utils/history";
import './SortedSetting.less';
import {getSortedContentRequested,getSortedMenuRequested} from "../../redux/actions/createActions";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

class SortedAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            sortCatList: [],
            num1:[{"rule1":"","rulecode1":"","id":"","rule2":"",
                "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
                "rulecode4":""}],
            num3:[{"rule1":"","rulecode1":"","id":"","rule2":"",
                "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
                "rulecode4":""}],
            addtype:1,
            delRule:[],
            DelwayRule:[],
            ruleId:[],
            firstSortid:"1",
            sortedNameValue:''
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const getSortedMenuRequested = this.props.getSortedMenuRequested;
        const clfId = this.props.clfId;
        let rules=JSON.stringify(this.state.rule);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(this.state.sortedNameValue===''){
                     message.error('话题名称请不要为空');
                     return;
                }
                request(api_sorted_rule_add,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:`addtype=${this.state.addtype}&clfname=${this.state.sortedNameValue}&catid=${values['topicFile']}&rule=${encodeURIComponent(rules)}`
                }).then((res) => {
                    if(res.data.code===1){
                        message.success(res.data.msg);
                        getSortedMenuRequested();
                        history.push({
                            pathname: '/sortedopinion/list',
                            search:`?clfid=${clfId}`
                        })
                    } else {
                        message.info(res.data.msg);
                    }
                })
            }
        });
    }

    //删除单条规则
    onDelrule(data){
        this.setState({
            delRule:data
        })
    }
    //删除整行规则
    onDelwayRule(data){
        this.setState({
            DelwayRule:data
        })
    }
    //快速添加规则
    addRule(e){
        this.setState({num1:this.state.num1.concat([{"rule1":"","rulecode1":"","id":"","rule2":"",
            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
            "rulecode4":""}])})
    }
    //高级添加规则
    seniorRule(e){
        this.setState({num3:this.state.num3.concat([{"rule1":"","rulecode1":"","id":"","rule2":"",
            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
            "rulecode4":""}])});
    }
    onAddtype(){
        this.setState({addtype:1})

    }
    onAddtypeTwo(){
        this.setState({addtype:3})
    }
    // 取消操作
    cancelAddType() {
        const getSortedMenuRequested = this.props.getSortedMenuRequested;
        const clfId = this.props.clfId;
        getSortedMenuRequested();
        history.push({
            pathname: '/sortedopinion/list',
            search:`?clfid=${clfId}`
        })
    }
    onCreateTopic(e){
        let rule=[];
        if(e.length>0){
            for(let i in e){
                rule.push({});
                rule[i]['rule1']=e[i].rule1;
                rule[i]['rule2']=e[i].rule2;
                rule[i]['rule3']=e[i].rule3;
                rule[i]['rule4']=e[i].rule4;
            }
        }
        this.setState({
            rule:rule
        })
    }
    onInputConent(e){
        let rule=[];
        if(e.length>0){
            for(let i in e){
                rule.push({});
                rule[i]['rule']=e[i].rule;
            }

        }
        this.setState({
            rule:rule
        })
    }

    componentDidMount() {
        request(api_sorted_cat_list).then(res => {
            if (res.data) {
                this.setState({
                    sortCatList:res.data.gradeCatList,
                    firstSortid:res.data.gradeCatList[0]['id']
                })
            }
        })
    }

    sortedNameChange(e){
        const {value} = e.target;
        if(value.length>=28){
              message.error('专题名称请不要超过14个字符');
              return;
        }
        this.setState({
              sortedNameValue:value
        })
    }
    render() {
        const {sortCatList} = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span:16,
                    offset: 8,
                },
            },
        };
        const titleTip= <div>
        <p>关键词组合：关键词之间用“+”、“-”或者“*”连接，符号均为英文状态。</p>
        <p>①“+”代表或(或者) </p>
        <p>②“-”代表排除</p>
        <p>③“*”代表与(并且)</p>
        <p>④“( )”在多个词之间是或(或者)的关系时用括号包起来</p>
        <p>例子：</p>
        <p>关键词组合：北京*(暴雨+暴雪)*(预警+受灾+伤亡)-暴雪公司系统会匹配舆情信息中出现北京与(暴雨或者暴雪)与(预警或者受灾或者伤亡)排除暴雪公司相关的数据</p>
        </div>; 
        const tipMessage=<span> <Tooltip placement="bottom" title='关键词组合由主题词、关联词1、关联词2和排除词共4组词组成。'>
        <Icon type="question-circle" className="iconMessage"></Icon>
        </Tooltip>
        匹配关键词组合</span>;
        return (
            <div className="sorted-add-wrapper">
                <Tabs type="card">
                    <TabPane tab="快速设置" key="1">
                        <div className="fast-setting">
                            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem
                                    label="话题名称"
                                    {...formItemLayout}
                                >
                                        <Input placeholder="话题名称" style={{width: '300px'}}
                                            maxLength={'15'}
                                            onChange={this.sortedNameChange.bind(this)}
                                            value={this.state.sortedNameValue}
                                        />
                                </FormItem>
                                <FormItem
                                    label="类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('topicFile', {
                                        initialValue:this.state.firstSortid+'' ,
                                    })(
                                        <Select style={{width: '154px'}}>
                                            {sortCatList && sortCatList.map(item =>
                                                <Option value={item.id.toString()} key={item.id}>{item.catname}</Option>
                                            )}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label={tipMessage}
                                >
                                    <SettingCreateTopic num1={this.state.num1} name="email"
                                                        onDelrule={this.onDelrule.bind(this)}
                                                        onDelwayRule={this.onDelwayRule.bind(this)}
                                                        ruleId={this.state.ruleId}
                                                        onCreateTopic={this.onCreateTopic.bind(this)}
                                    />
                                </FormItem>
                                <FormItem className="addRule"
                                          {...tailFormItemLayout}
                                >
                                    <Button  type="primary" size="small" onClick={this.addRule.bind(this)} >
                                        + 添加规则
                                    </Button>
                                </FormItem>
                                <FormItem
                                    {...tailFormItemLayout}
                                >
                                    <Button type="primary" htmlType="submit" className="gap" onClick={this.onAddtype.bind(this)} >
                                        保存
                                    </Button>
                                    <Button  type="primary" onClick={this.cancelAddType.bind(this)}>
                                        取消
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </TabPane>
                    <TabPane tab="高级设置" key="3">
                        <div className="fast-setting">
                            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem
                                    label="话题名称"
                                    {...formItemLayout}
                                >
                                    {/* {getFieldDecorator('topicName', {
                                        rules: [{ required: true, message: '请输入您要设置的专题名称！' }],
                                    })( */}
                                        <Input placeholder="专题名称" style={{width: '300px'}}
                                        maxLength={'15'}
                                        onChange={this.sortedNameChange.bind(this)}
                                        value={this.state.sortedNameValue}
                                        />
                                    {/* )} */}
                                </FormItem>
                                <FormItem
                                    label="类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('topicFile', {
                                        initialValue: this.state.firstSortid+'',
                                    })(
                                        <Select style={{width: '154px'}}>
                                            {sortCatList && sortCatList.map(item =>
                                                <Option value={item.id.toString()} key={item.id}>{item.catname}</Option>
                                            )}
                                        </Select>
                                    )}
                                </FormItem>
                                <div className="text">匹配关键词 <Tooltip placement="bottom" title={titleTip}>
                                <Icon type="question-circle" className="iconMessage"></Icon>
                                </Tooltip></div>
                                <FormItem
                                    {...formItemLayout}
                                    label="匹配关键词组合"
                                >
                                    <SettingSeniorTopic num3={this.state.num3} name="email"
                                                        onDelrule={this.onDelrule.bind(this)}
                                                        onDelwayRule={this.onDelwayRule.bind(this)}
                                                        ruleId={this.state.ruleId}
                                                        onInputConent={this.onInputConent.bind(this)}
                                    />
                                </FormItem>
                                <FormItem className="addRule"
                                          {...tailFormItemLayout}
                                >
                                    <Button  type="primary" size="small"  onClick={this.seniorRule.bind(this)} >
                                        + 添加规则
                                    </Button>
                                </FormItem>
                                <FormItem
                                    {...tailFormItemLayout}
                                >
                                    <Button type="primary" htmlType="submit" className="gap" onClick={this.onAddtypeTwo.bind(this)} >
                                        保存
                                    </Button>

                                    <Button  type="primary" onClick={this.cancelAddType.bind(this)}>
                                        取消
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </TabPane>

                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        clfId: state.changeClfId.id
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getSortedContentRequested: req => {
            dispatch(getSortedContentRequested(req));
        },
        getSortedMenuRequested: req => {
            dispatch(getSortedMenuRequested(req));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SortedAdd));