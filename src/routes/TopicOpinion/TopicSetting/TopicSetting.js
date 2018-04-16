import React from 'react';
import {Tabs, Form, Input, Button ,Select, DatePicker,message,Tooltip,Icon} from 'antd';
import SettingCreateTopic from '../../../components/SettingCreateTopic/SettingCreateTopic';
// import SettingPreciseTopic from '../../../components/SettingPreciseTopic/SettingPreciseTopic';
import SettingSeniorTopic from '../../../components/SettingSeniorTopic/SettingSeniorTopic';
import request from '../../../utils/request';
import Store from '../../../redux/store/index';
import {api_topic_revise,api_topic_message,api_top_nav} from '../../../services/api';
import { createHashHistory } from 'history';
import {getLocalTime,topicData,getSecondTime} from '../../../utils/format';
import {connect} from 'react-redux';
import {topicNavMessageRequested} from '../../../redux/actions/createActions';
import moment from 'moment';
import './TopicSetting.less';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const history = createHashHistory();
class TopicSetting extends React.Component {
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
            num3:[{"rule1":"","rulecode1":"","id":"","rule2":"",
            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
            "rulecode4":""}],
            data:[],
            SeniorTopicRule:[],
            createTopicRule:[],
            preciseTopicRule:[],
            checked:0,
            disBlock: {visibility: 'visible'},
            disNone: {visibility: 'hidden'},
            topicCatList:[],
            topicAlldata:Store.getState().getTopicLocationSucceededReducer.res,
            topicbDate:0,
            topiceDate:0,
            addType:1,
            select:0,
            delRule:[],
            DelwayRule:[],
            ruleId:[],
            topicNameValue:''
        }
    }
    componentWillMount(){   
         let topicid=this.props.location.search.split('=')[1];       
         request(api_topic_message +'&topicid=' +topicid).then(res=>{
             if(res.data && res.data.code!==0){
                let addtypeStr='num'+(res.data.addtype);
                  this.setState({
                     topicAlldata:res.data,
                     [addtypeStr]:res.data.rulearr.length === 0?[{"rule1":"","rulecode1":"","id":"","rule2":"",
                     "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
                     "rulecode4":""}]:res.data.rulearr,
                     addType: res.data.addtype ,
                     select:res.data.catid,
                     topicbDate:getLocalTime(res.data.topicbdate.time) ,
                     topiceDate:getLocalTime(res.data.topicedate.time) ,
                     topicNameValue:res.data.topicname                     
                  })
              }
                request(api_top_nav).then(res=>{
                 if(res.data){
                    this.setState({
                        topicCatList:res.data,                   
                       })
                 }
                 })
          })

        //  request(api_topic_typeList).then(res=>{
        //          if(res.data){
        //             this.setState({
        //                 [addtypeStr]:topicAlldatas.rulearr,
        //                 select:topicAlldatas.catid,
        //                 topicbDate:getLocalTime(topicAlldatas.topicbdate.time) ,
        //                 topiceDate:getLocalTime(topicAlldatas.topicedate.time) ,
        //                 addType: topicAlldatas.addtype ,
        //                 topicAlldata:topicAlldatas  ,
        //                 topicCatList:res.data.topicCatList,                   
        //                })
        //          }
        //  })


         
        //  if(topicAlldatas.code!==0){
    	//   request(api_topic_typeList).then(res=>{
    	//   	     if(res.data){
    	//   	     	  this.setState({
        //                      topicCatList:res.data.topicCatList,
        //                      [addtypeStr]:topicAlldatas.rulearr,
        //                      select:topicAlldatas.catid,
        //                      topicbDate:getLocalTime(topicAlldatas.topicbdate.time) ,
        //                      topiceDate:getLocalTime(topicAlldatas.topicedate.time)                         
        //                     })
    	//    	     }
        //   });       

        // }

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
        "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
        "rulecode4":"","rule":''}])})  	  
     }
    // 改变设置方式
    handleOnChange(key) {
        let ruleIdArr=[];
        let oldruleId=this.state.topicAlldata.rulearr;  
        for(let i in oldruleId){
            ruleIdArr.push(oldruleId[i]['id'])
        }
        this.setState({
            ruleId:ruleIdArr,
            addType:parseInt(key,10)
        })
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
    onModelCancel() {
        this.setState({
            visible: false
        })
    }
    onInputConent(e){ 
          let rule=[];
          if(e.length>0){
            for(let i in e){
                rule.push({});
                rule[i]['rule']=e[i].rule;
                rule[i]['id']=e[i].id;

            }
         } 
         this.setState({
            SeniorTopicRule:rule
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
                rule[i]['id']=e[i].id; 
            }
       } 
       this.setState({
          createTopicRule:rule
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
            rule[i]['id']=e[i].id; 
          }
       } 
       this.setState({
           preciseTopicRule:rule
       })
    }
    handleSubmit(e) {         
           let rules;
           if(this.state.addType===3){
               rules=JSON.stringify(this.state.SeniorTopicRule.length===0?
                topicData(this.state.topicAlldata.rulearr,this.state.addType):this.state.SeniorTopicRule);
           
            }else if(this.state.addType===1){
               rules=JSON.stringify(this.state.createTopicRule.length===0?
                topicData(this.state.topicAlldata.rulearr,this.state.addType):this.state.createTopicRule);
            
           }else if(this.state.addType===2){
               rules=JSON.stringify(this.state.preciseTopicRule.length===0?
                topicData(this.state.topicAlldata.rulearr,this.state.addType):this.state.preciseTopicRule);     
           }
        e.preventDefault();
        let topicId=Store.getState().getRouterReducer;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(getSecondTime(this.state.topicbDate)>=getSecondTime(this.state.topiceDate)){
                    message.error('开始时间请不要大于或等于结束时间');
                    return ;
                }else if (this.state.topicNameValue.length===0){
                    message.error('专题名称请不要为空');
                    return ;
                }
            request(api_topic_revise,{
        	method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`action=editTopic&topicid=${topicId}&addtype=${this.state.addtype}&begin=${this.state.topicbDate}&end=${this.state.topiceDate}&bind=${this.state.checked}&tname=${this.state.topicNameValue}&catid=${this.state.select}&rule=${encodeURIComponent(rules)}`
        }).then((res) => {
        	if(res.data.code===1){
                  message.success('关键词修改成功');
                  this.props.topicNavMessageRequested(new Date())
          	      history.push({
                   pathname: '/topic/topiclist'
                   })
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
    this.setState({num2:this.state.num2.splice(0,1),
                    visible1: false
    });    
  }
  handleCancel1 = (e) => {
    this.setState({
      visible1: false
    });
  }
  onSelect(value){
       this.setState({
            select:value
       })
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
 
  goTopiclist(){
        history.push('/topic/topiclist')
  }
  startTime(date,dateString){
           this.setState({
               topicbDate:dateString
           })
  }
  endTime(date,dateString){
          this.setState({
               topiceDate:dateString
          })
  }
  TopicNameChange(e){
        const {value} = e.target;
        if(value.length>=14){
              message.error('专题名称请不要超过14个字符');
              return;
        }
        this.setState({
           topicNameValue:value
        })
  }
    render() {
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
    let topicbDateTime=this.state.topicbDate!==0?this.state.topicbDate:new Date();
    let topiceDateTime=this.state.topiceDate!==0?this.state.topiceDate:new Date();
    let topicCatid=this.state.topicAlldata.catid?this.state.topicAlldata.catid:75;
        const topicCatList=this.state.topicCatList.length!==0 && topicCatid!==75?
        this.state.topicCatList.map((item,index)=> 
        <Option value={(item.catid).toString()} key={index}>{item.catname}</Option>
         ):<Option value={'75'}>默认文件夹</Option>; 
         
         
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
            <div className="topic-add-wrapper">
                <Tabs onChange={this.handleOnChange.bind(this)} type="card" activeKey={this.state.addType!==undefined?this.state.addType.toString():'1'}>
                    <TabPane tab="快速设置" key="1">                  
                        <div className="fast-setting">
             <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem
                                    label="专题名称"
                                    {...formItemLayout}
                                >
                            <Input placeholder='专题名称' style={{width: '300px'}}
                             maxLength={'15'}
                             onChange={this.TopicNameChange.bind(this)}
                             value={this.state.topicNameValue}
                            />          
                                </FormItem>                                
                                <FormItem
                                    label="类型"
                                    {...formItemLayout}
                                >
                                <Select style={{width: '154px'}} onSelect={this.onSelect.bind(this)} 
                                value={this.state.select!==0?this.state.select.toString():topicCatid.toString()}>
                                    {topicCatList}
                                </Select>

                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="开始时间"
                                >                
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" 
                               value={moment(topicbDateTime,'YYYY-MM-DD HH:mm:ss')}
                               onChange={this.startTime.bind(this)}
                            />
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="结束时间"
                                >
                                    
                           <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
                            value={moment(topiceDateTime,'YYYY-MM-DD HH:mm:ss')}
                            onChange={this.endTime.bind(this)}
                           />

                              
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
                                type="topic"
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
                                <Select style={{width: '154px'}} onSelect={this.onSelect.bind(this)} 
                                value={this.state.select!==0?this.state.select.toString():topicCatid.toString()}>
                                         {topicCatList}
                                        </Select>                                 
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
                                    label="匹配关键词"
                                >
      <SettingPreciseTopic num2={this.state.num2}  
               onDelrule={this.onDelrule.bind(this)}
               onDelwayRule={this.onDelwayRule.bind(this)}
               ruleId={this.state.ruleId}
               onPreciseTopic={this.onPreciseTopic.bind(this)}
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
                                        maxLength={'15'}
                                        onChange={this.TopicNameChange.bind(this)}
                                        value={this.state.topicNameValue}
                                        />                                   
                                </FormItem>
                                
                                <FormItem
                                    label="类型"
                                    {...formItemLayout}
                                >
                                <Select style={{width: '154px'}} onSelect={this.onSelect.bind(this)} 
                                value={this.state.select!==0?this.state.select.toString():topicCatid.toString()}>
                                         {topicCatList}
                                        </Select>
                                
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="开始时间"
                                >
                                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
                                        value={moment(topicbDateTime,'YYYY-MM-DD HH:mm:ss')}
                                        onChange={this.startTime.bind(this)}
                                        />
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="结束时间"
                                >
            
                                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
                                        value={moment(topiceDateTime,'YYYY-MM-DD HH:mm:ss')}
                                        onChange={this.endTime.bind(this)}
                                        />
                       
                                </FormItem>
                                <div className="text" >匹配关键词
                                <Tooltip placement="bottom" title={titleTip}>
                                <Icon type="question-circle" 
                                className="iconMessage"
                                style={{marginLeft:'10px'}}
                                ></Icon>
                                </Tooltip>
                                </div>
                                <FormItem
                                    {...formItemLayout}
                                    label="关键词组合"
                                >
                                <SettingSeniorTopic num3={this.state.num3}  
                                    onDelrule={this.onDelrule.bind(this)}
                                    onDelwayRule={this.onDelwayRule.bind(this)}
                                    ruleId={this.state.ruleId}
                                    onInputConent={this.onInputConent.bind(this)}
                                    type="topic"
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
export default connect(null,mapDispatchToProps)(Form.create()(TopicSetting));