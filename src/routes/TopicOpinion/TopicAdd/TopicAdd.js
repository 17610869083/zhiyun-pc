import React from 'react';
import {Tabs, Form, Input, Button ,Select, DatePicker,message,Icon,Tooltip} from 'antd';
// import PreciseTopic from '../../../components/PreciseTopic/PreciseTopic';
import SettingCreateTopic from '../../../components/SettingCreateTopic/SettingCreateTopic';
import SettingSeniorTopic from '../../../components/SettingSeniorTopic/SettingSeniorTopic';
import request from '../../../utils/request';
import {api_topic_add,api_top_nav} from '../../../services/api';
import {history} from '../../../utils/history';
import './TopicAdd.less';
import {connect} from 'react-redux';
import {topicNavMessageRequested} from '../../../redux/actions/createActions';
import {getSecondTime} from '../../../utils/format';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
class TopicAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            visible1:false,
            num1:[{"rule1":"","rulecode1":"","id":"","rule2":"",
            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
            "rulecode4":""}],
            num2:[{"rule1":"","rulecode1":"","id":"","rule2":"",
            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
            "rulecode4":""}],
            num3:[{"rule1":"","rulecode1":"","id":"","rule2":"","rule":"",
            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
            "rulecode4":""}],
            data:[],
            rule:[],
            checked:0,
            disBlock: {visibility: 'visible'},
            disNone: {visibility: 'hidden'},
            addtype:0,
            topicCatList:[],
            topicArr:['一','二','三','四','五','六','七'],
            delRule:[],
            DelwayRule:[],
            ruleId:[],
            firstTopicid:'70',
            topicNameValue:'',
            // flag:false,
            // activeKey:'1'
        }
    }
    componentWillMount(){
    	  request(api_top_nav).then(res=>{
    	  	     if(res.data && res.data.code!==0){
    	  	     	  this.setState({
                             topicCatList:res.data,
                             firstTopicid:res.data[0]['catid']
                            })
    	  	     }
    	  })
    }
     //快速添加规则
     addRule(e){
     	  this.setState({num1:this.state.num1.concat([{"rule1":"","rulecode1":"","id":"","rule2":"",
           "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
           "rulecode4":""}])})
     }
     //精准添加规则
     PreciseRule(e){
     	  this.setState({num2:this.state.num2.concat([{"rule1":"","rulecode1":"","id":"","rule2":"",
           "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
           "rulecode4":""}])})
     }
     //高级添加规则
     seniorRule(e){
     	  this.setState({num3:this.state.num3.concat([{"rule1":"","rulecode1":"","id":"","rule2":"",
           "rulecode2":"","rule3":"","rulecode3":"","rule4":"","rule":"",
           "rulecode4":""}])});   	  
     }
    // 改变设置方式
    // handleOnChange(key) { 
    //      if(this.state.flag){
    //         return;
    //      }else{
    //         this.setState({
    //             flag:true,
    //             activeKey:key
    //          })
    //      }
    // }

    goTopiclist(){
         history.push('/topic/topiclist')
    }
    onAddtype(){
    	 this.setState({addtype:1})
    }
    onAddtypeOne(){
    	 this.setState({addtype:2})
    }
    onAddtypeTwo(){
    	 this.setState({addtype:3})
    }
    onModelOk(data){         
    	  this.setState({visible:false});
    	  let rule=[];
          this.setState({data:this.state.data.concat([data])},()=>{
          	for(let i=0;i<this.state.data.length;i++){
       	      rule.push({});
    	     for(let j=0;j<this.state.data[i].length;j++){
	     	     rule[i]['rule'+(j+1)]=this.state.data[i][j]; 
	     	     this.setState({rule:rule});
              } 
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
    onModelOkOne(data){
    	  this.setState({visible:false});
    	  let rule=[];
          this.setState({data:this.state.data.concat([data])},()=>{
          	for(let i=0;i<this.state.data.length;i++){
       	      rule.push({});
    	     for(let j=0;j<this.state.data[i].length-1;j++){
	     	     rule[i]['rule'+(j+1)]=this.state.data[i][j+1]; 
	     	     rule[i]['rulecode'+(j+1)]=this.state.data[i][0][j]; 
	     	     	     	     
              } 
             }
             this.setState({rule:rule});
          });  
    }
    onModelCancel() {
        this.setState({
            visible: false
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
  onPreciseTopic(e){
    let rule=[];
    if(e.length>0){
    for(let i in e){
        rule.push({});
        rule[i]['rule1']=e[i].rule1;
        rule[i]['rule2']=e[i].rule2;
        rule[i]['rule3']=e[i].rule3;
        rule[i]['rule4']=e[i].rule4;
        rule[i]['rulecode1']=e[i].rulecode1;
        rule[i]['rulecode2']=e[i].rulecode2;
        rule[i]['rulecode3']=e[i].rulecode3;
        rule[i]['rulecode4']=e[i].rulecode4;   
    }
   } 
   this.setState({
       rule:rule
   })
}
    handleSubmit(e) {
        let rules=JSON.stringify(this.state.rule);
        e.preventDefault();     
        this.props.form.validateFields((err, values) => {           
            if (!err) {               
                let startTime = values['start-time'].format('YYYY-MM-DD HH:mm:ss');
                let endTime = values['end-time'].format('YYYY-MM-DD HH:mm:ss');
                if(getSecondTime(startTime)>=getSecondTime(endTime)){
                          message.error('开始时间请不要大于或等于结束时间');
                          return ;
                }else if (this.state.topicNameValue.length===0){
                          message.error('专题名称请不要为空');
                          return ;
                }
                
            request(api_topic_add,{
        	method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            }, 
            body:`action=addTopic&addtype=${this.state.addtype}&begin=${startTime}&end=${endTime}&bind=${this.state.checked}&tname=${this.state.topicNameValue}&catid=${values['topicFile']}&rule=${encodeURIComponent(rules)}`
            }).then((res) => {
        	 if(res.data.code===1){
                this.props.topicNavMessageRequested(new Date())
                message.success('专题添加成功');
             	history.push({
                   pathname: '/topic/topiclist',
                   search:''
                   })
        	    }else{
                message.error(res.data.msg);  
                }
            })
          }               
        });
    }
    onChange(checked){
    	   this.setState({checked:checked===true?1:0})
    	   
    }
    showModal() {
        this.setState({
            visible: true
        })
    }
    showModal1(){
    	this.setState({
            visible1: true
        })
    }
  handleOk1 = (e) => {
    this.setState({num3:this.state.num3.splice(0,1),
                    visible1: false
    });    
  }
  handleCancel1 = (e) => {
    this.setState({
      visible1: false,
    });
  }
  topicNameChange(e){
         const {value} = e.target;
         if(value.length>=28){
               message.error('专题名称请不要超过28个字符');
               return;
         }
         this.setState({
            topicNameValue:value
         })
  }
    render() {
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
        const config = {
            rules: [{ type: 'object', required: true, message: '时间未选择' }],
        };  
        const topicCatList=this.state.topicCatList&&this.state.topicCatList.map((item,index)=>
         <Option value={item.catid.toString()} key={index}>{item.catname}
         </Option>
    );
        const tipMessage=<span> <Tooltip placement="bottom" title='关键词组合由主题词、关联词1、关联词2和排除词共4组词组成。'>
            <Icon type="question-circle" className="iconMessage"></Icon>
            </Tooltip>
            匹配关键词组合</span>;

        const titleTip= <div>
               <p>关键词组合：关键词之间用“+”、“-”或者“*”连接，符号均为英文状态。</p>
               <p>①“+”代表或(或者) </p>
               <p>②“-”代表排除</p>
               <p>③“*”代表与(并且)</p>
               <p>④“( )”在多个词之间是或(或者)的关系时用括号包起来</p>
               <p>例子：</p>
               <p>关键词组合：北京*(暴雨+暴雪)*(预警+受灾+伤亡)-暴雪公司系统会匹配舆情信息中出现北京与(暴雨或者暴雪)与(预警或者受灾或者伤亡)排除暴雪公司相关的数据</p>
        </div>;        
        return (

            <div className="topic-add-wrapper">

                {/* <Tabs tabBarStyle={this.state.flag?{color:'#C1C1C1'}:{color:'#000'}} onChange={this.handleOnChange.bind(this)} type="card" activeKey={this.state.activeKey}> */}
                <Tabs type="card" >
                    <TabPane tab="快速设置" key="1">
                    
                        <div className="fast-setting">

             <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem
                                    label="专题名称"
                                    {...formItemLayout}
                                >
                    <Input placeholder="专题名称" style={{width: '300px'}}
                    maxLength={'28'}
                     onChange={this.topicNameChange.bind(this)}
                     value={this.state.topicNameValue}
                    />                              
               {/* <span className="floatRigth">关键词同步到采集
               <Switch defaultChecked={false} onChange={this.onChange.bind(this)} className="Switch"/>
               </span>            */}
                                </FormItem>
                                
                                <FormItem
                                    label="类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('topicFile', {
                                        initialValue: this.state.firstTopicid+'',
                                    })(
                                        <Select style={{width: '154px'}}>
                                        {topicCatList}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="开始时间"
                                >
                                    {getFieldDecorator('start-time', config)(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="结束时间"
                                >
                                    {getFieldDecorator('end-time', config)(
                           <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                    )}
                                </FormItem>
                                <div>
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
                                </div>
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
                      <Button type="primary" htmlType="submit" className="gap" onClick={
                      	  this.onAddtype.bind(this)
                      } >
                                        保存
                                    </Button>
                                    <Button  type="primary" onClick={this.goTopiclist.bind(this)}>
                                        取消
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </TabPane>
                    {/* <TabPane tab="精准设置" key="2"> */}
                    {/* <div className="fast-setting">
                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem
                                    label="专题名称"
                                    {...formItemLayout}
                                >
                     {getFieldDecorator('topicName', {
                    rules: [{ required: true, message: '请输入您要设置的专题名称！' }],
                                    })(
                           <Input placeholder="专题名称" style={{width: '300px'}}/>
                                    )}
               <span className="floatRigth">关键词同步到采集
               <Switch defaultChecked={false} onChange={this.onChange.bind(this)} className="Switch"/>
               </span>    
                                </FormItem> 
                                <FormItem
                                    label="类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('topicFile', {
                                        initialValue: '1',
                                    })(
                                        <Select style={{width: '154px'}}>
                                         {topicCatList}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="开始时间"
                                >
                                    {getFieldDecorator('start-time', config)(
                                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="结束时间"
                                >
                                    {getFieldDecorator('end-time', config)(
                                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="匹配关键词组合" 
                                >
      <PreciseTopic num2={this.state.num2} name="email" onModelOkOne={this.onModelOkOne.bind(this)}
       onDelrule={this.onDelrule.bind(this)}
       onDelwayRule={this.onDelwayRule.bind(this)}
      />
                                    
                                </FormItem>
                                
                                
                                <FormItem className="addRule"
                                    {...tailFormItemLayout} 
                                >
             <Button  type="primary" size="small" onClick={this.PreciseRule.bind(this)} >
                                      + 添加规则
                                 </Button>      
                                </FormItem>                               
                                <FormItem
                                    {...tailFormItemLayout}
                                >
                     <Button type="primary" htmlType="submit" className="gap" 
                       onClick={this.onAddtypeOne.bind(this)}
                     >
                                        保存
                                    </Button>
                                    <Button  type="primary" htmlType="submit">
                                        取消
                                    </Button>
                                </FormItem>
                                
                            </Form>
                        </div> */}
                        {/* </TabPane> */}
                    <TabPane tab="高级设置" key="3">
                     <div className="fast-setting">
     <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem
                                    label="专题名称"
                                    {...formItemLayout}
                                >
                                        <Input placeholder="专题名称" style={{width: '300px'}}
                                            maxLength={'28'}
                                            onChange={this.topicNameChange.bind(this)}
                                            value={this.state.topicNameValue}
                                        />
               {/* <span className="floatRigth">关键词同步到采集
               <Switch defaultChecked={false} onChange={this.onChange.bind(this)} className="Switch"/>
               </span> */}
                                    
                                </FormItem>
                                
                                <FormItem
                                    label="类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('topicFile', {
                                        initialValue:this.state.firstTopicid+'',
                                    })(
                                        <Select style={{width: '154px'}}>
                                         {topicCatList}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="开始时间"
                                >
                                    {getFieldDecorator('start-time', config)(
                                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="结束时间"
                                >
                                    {getFieldDecorator('end-time', config)(
                                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                    )}
                                </FormItem>
                                <div className="text">匹配关键词 <Tooltip placement="bottom" title={titleTip}>
                                <Icon type="question-circle" className="iconMessage"></Icon>
                                </Tooltip></div>
                                <FormItem
                                    {...formItemLayout}
                                    label="匹配关键词组合" 
                                >
                                    <SettingSeniorTopic num3={this.state.num3}  
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
                                    
                                    <Button  type="primary" onClick={this.goTopiclist.bind(this)}>
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

const mapDispatchToProps = dispatch => {
    return {
        topicNavMessageRequested:req=>{
            dispatch(topicNavMessageRequested(req));
        }
    }
};

export default connect(null,mapDispatchToProps)(Form.create()(TopicAdd)) ;