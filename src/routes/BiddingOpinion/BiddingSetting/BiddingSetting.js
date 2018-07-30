import React from 'react';
import {Tabs, Form, Input, Button ,Select,message,Tooltip,Icon} from 'antd';
import SettingSeniorTopic from '../../../components/SettingSeniorTopic/SettingSeniorTopic';
import BiddingSeniorCreate from '../BiddingSeniorCreate/BiddingSeniorCreate'
import BiddingCreate from '../BiddingCreate/BiddingCreate'
import request from '../../../utils/request';
import Store from '../../../redux/store/index';
import {
        api_get_BiddingetgradeCatList,
        api_get_BiddingaddGrade,
        api_get_BiddinggetGradeAndRule,
        api_get_BiddinggetEditRule,
        api_get_BiddinggetDelRule
} from '../../../services/api';
import { createHashHistory } from 'history';
import {connect} from 'react-redux';
import {topicNavMessageRequested} from '../../../redux/actions/createActions';
import './BiddingSetting.less'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const history = createHashHistory();
class BiddingSetting extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            visible1:false,
            num1:[],
            num2:[{"rule1":"","rulecode1":"","id":"","rule2":"",
            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
            "rulecode4":""}],
            num3:[{"rule": "", "rule1":"","rulecode1":"","id":"","rule2":"",
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
            addType:1,
            select:0,
            delRule:[],
            DelwayRule:[],
            ruleId:[],
            topicNameValue:'',
            addOrSetting:'',
            roleArr: []
        }
    }
    componentWillReceiveProps(nextprops){
            if (this.search2Obj(nextprops.location.search).type === 'add' && this.props.location.search !== nextprops.location.search) {
                request(api_get_BiddingetgradeCatList).then((res) => {
                    this.setState({
                        topicCatList: res.data.gradeCatList,
                        topicNameValue: '',
                        select: this.search2Obj(nextprops.location.search).catid,
                        addType: 1,
                        num3: [{"rule1":"","rulecode1":"","id":"","rule2":"",
                        "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
                        "rulecode4":""}]
                    })
                })
            }
            this.setState({
                addOrSetting: this.search2Obj(nextprops.location.search).type || 'setting'
            })
    }
    componentWillMount(){
        if (this.search2Obj(this.props.location.search).type === 'add') {
            // this.setState({

            // })
           
            this.setState({
                select: this.search2Obj(this.props.location.search).catid
            })
            
            request(api_get_BiddingetgradeCatList).then((res) => {
                this.setState({
                    topicCatList: res.data.gradeCatList
                })
            })
        } else {
            let topicid = this.search2Obj(this.props.location.search).topicid
            
            request(api_get_BiddingetgradeCatList).then((res) => {

                request(api_get_BiddinggetGradeAndRule +'&clfid=' +topicid).then(res2=>{
                    if(res2.data && res2.data.code!==0){
                    let addtypeStr='num'+(res2.data.addtype);
                        this.setState({
                            topicAlldata:res2.data,
                            [addtypeStr]:res2.data.rulearr.length === 0?[{"rule": "", "rule1":"","rulecode1":"","id":"","rule2":"",
                            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
                            "rulecode4":""}]:res2.data.rulearr,
                            addType: res2.data.addtype ,
                            select:res2.data.catid,
                            topicNameValue:res2.data.clfname
                        })
                    }
                })
                this.setState({
                    topicCatList: res.data.gradeCatList
                })
            })
        }
        
        //  let topicid=this.props.location.search.split('=')[1];
        //  request(api_topic_message +'&topicid=' +topicid).then(res=>{
        //      if(res.data && res.data.code!==0){
        //         let addtypeStr='num'+(res.data.addtype);
        //           this.setState({
        //              topicAlldata:res.data,
        //              [addtypeStr]:res.data.rulearr.length === 0?[{"rule1":"","rulecode1":"","id":"","rule2":"",
        //              "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
        //              "rulecode4":""}]:res.data.rulearr,
        //              addType: res.data.addtype ,
        //              select:res.data.catid,
        //              topicNameValue:res.data.topicname
        //           })
        //       }
        //         request(api_top_nav).then(res=>{
        //             if(res.data){
        //                 this.setState({
        //                     topicCatList:res.data,
        //                 })
        //             }
        //          })
        //   })

    }
    search2Obj(str) {
        let obj = {}, sumarr = []
        str.slice(1, str.length).split('&').forEach(item => {
            sumarr = item.split('=')
            obj[sumarr[0]] = sumarr[1]
        })
        return obj
    }
     //快速添加规则
    //  addRule(e){
    //        this.setState({num1:this.state.num1.concat([{"rule1":"","rulecode1":"","id":"","rule2":"",
    //        "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
    //        "rulecode4":""}])})
    //  }
     //精准添加规则
     PreciseRule(e){
        this.setState({num2:this.state.num2.concat([{"rule1":"","rulecode1":"","id":"","rule2":"",
        "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
        "rulecode4":""}])})
     }
     //高级添加规则
     seniorRule(e){
        if(this.state.num3[this.state.num3.length-1].rule.trim() === '' || this.state.num3[this.state.num3.length-1].rule.trim() === undefined ) {
            message.error('请添加上一条规则')
            return false
        }
        this.setState({num3:this.state.num3.concat([{"rule": "", "rule1":"","rulecode1":"","id":"","rule2":"",
        "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
        "rulecode4":"","rule":''}])})
     }
    // 改变设置方式
    handleOnChange(key) {
        if(this.search2Obj(this.props.location.search).type === 'add') {
            this.setState({
                addType: this.state.addType-0 === 3? 1 : 3 
            })
        }
        if(key===this.state.addType){
            let ruleIdArr=[];
            let oldruleId=this.state.topicAlldata.rulearr;
            for(let i in oldruleId){
                ruleIdArr.push(oldruleId[i]['id'])
            }
            this.setState({
                ruleId:ruleIdArr,
                addType:parseInt(key,10)
            })
        }else{
            // this.setState({
            //     addType:parseInt(key,10)
            // })
            return;

        }
        // if(this.state.topicNameValue.trim().length <= 0 && this.state.createTopicRule.length <= 0 ) {
        //     this.setState({
        //         addType:parseInt(key,10)
        //     })
        // }
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
          e.preventDefault();
        //    let rules;
        //    if(this.state.addType===3){
        //        rules=JSON.stringify(this.state.SeniorTopicRule.length===0?
        //         topicData(this.state.topicAlldata.rulearr,this.state.addType):this.state.SeniorTopicRule);
           
        //     }else if(this.state.addType===1){
        //        rules=JSON.stringify(this.state.createTopicRule.length===0?
        //         topicData(this.state.topicAlldata.rulearr,this.state.addType):this.state.createTopicRule);
            
        //    }else if(this.state.addType===2){
        //        rules=JSON.stringify(this.state.preciseTopicRule.length===0?
        //         topicData(this.state.topicAlldata.rulearr,this.state.addType):this.state.preciseTopicRule);     
        //    }
        //    let rulelist = JSON.parse(rules)[0];
        //    if( rulelist.rule1 ==='' && rulelist.rule2 ==='' && rulelist.rule3 === '' && rulelist.rule4 === ''){
        //     message.success('规则不能为空');
        //      return;
        //    }
        // let topicId=Store.getState().getRouterReducer.topicid;
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         request(api_get_BiddingaddGrade,{
        //             method: 'POST',
        //             headers: {
        //                 "Content-Type": "application/x-www-form-urlencoded"
        //             },
        //             // body:`action=editTopic&topicid=${topicId}&addtype=${this.state.addtype}&bind=${this.state.checked}&tname=${this.state.topicNameValue}&catid=${this.state.select}&rule=${encodeURIComponent(rules)}`
        //             body:`action=addGrade&addtype=${this.state.addtype}&clfname=${this.state.topicNameValue}&catid=${this.search2Obj(this.props.location.search).catid}&rule=${encodeURIComponent(rules)}`
        //         }).then((res) => {
        //             if(res.data.code===1){
        //                 message.success('关键词添加成功');
        //                 history.push({
        //                     pathname: '/bidding/information'
        //                 })
        //             }
        //         })
        //     }               
        // });
        if (this.state.topicNameValue.trim() === '') {
            message.error('专题名称不能为空!')
            return false
        }
        let rules = this.state.roleArr.length === 0 ? JSON.stringify(this.state.num1) : JSON.stringify(this.state.roleArr)
        let ruleArr = JSON.parse(rules)
        if(this.state.addType === 1) {
            if(this.search2Obj(this.props.location.search).type === 'add') {
                if(ruleArr.length === 0 || ruleArr[ruleArr.length-1]['rule1'].trim() === '') {
                    message.error('请把规则填写完整!')
                    return false
                }
            } else {
                
                if(ruleArr.length > 0) {
                    if(ruleArr[ruleArr.length-1].rule1.trim() === '') {
                        message.error('请把规则填写完整!')
                        return false
                    }
                } else{
                    if(!this.isLegitimate(this.state.num1)) {
                        message.error('请把规则填写完整!')
                        return false
                    }
                }
    
            }
        }
        


        if(this.state.addType === 3 && this.state.num3[this.state.num3.length-1]['rule'].trim() === '' ) {
            message.error('请把规则添加完整!')
            return false
        }
        
        if( this.search2Obj(this.props.location.search).type === 'add' ) {
            request(api_get_BiddingaddGrade, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`action=addGrade&addtype=${this.state.addtype}&clfname=${this.state.topicNameValue}&catid=${this.state.select}&rule=${this.state.addType-0 === 3 ? encodeURIComponent(JSON.stringify(this.state.num3)) :encodeURIComponent(rules)}`
            }).then((res) => {
                if(res.data.code===1){
                    message.success('关键词添加成功');
                    history.push({
                        pathname: '/bidding/information'
                    })
                }else {
                    message.error(res.data.msg)
                }
            })
        } else {
            request(api_get_BiddinggetEditRule, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`action=editGrade&addtype=${this.state.addtype}&catid=${this.state.select}&clfid=${this.props.location.search.split('=')[1]}&clfname=${this.state.topicNameValue}&rule=${this.state.addType-0 === 3 ? encodeURIComponent(JSON.stringify(this.state.num3)) :encodeURIComponent(rules)}`
            }).then((res) => {
                if(res.data.code===1){
                    message.success('关键词修改成功');
                    history.push({
                        pathname: '/bidding/information'
                    })
                } else {
                    message.error('关键词修改失败')
                }
            })
        }
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
        history.push('/bidding/information')
  }

  TopicNameChange(e){
        const {value} = e.target;
        if(value.length>=28){
              message.error('专题名称请不要超过28个字符');
              return;
        }
        this.setState({
           topicNameValue:value
        })
  }
  clearAll() {
      this.setState({
        num1:[
                {   
                    "rule1":"",
                    "rulecode1":"",
                    "id":"",
                    "rule2":"",
                    "rulecode2":"",
                    "rule3":"",
                    "rulecode3":"",
                    "rule4":"",
                    "rulecode4":""
                }
            ]
      })
  }

  addRole(role) {
    const [...newArr] = role
    this.setState({
        roleArr: newArr
    })
  }
  editRole(role) {
    const [...newArr] = role
    this.setState({
        roleArr: newArr
    })
  }
  delOne(role) {
    const [...newArr] = role
    this.setState({
        roleArr: newArr
    })
  }
  delRow(delrole, role) {
    const [...newArr] = role
    this.setState({
        roleArr: newArr
    })
    if ( this.search2Obj(this.props.location.search).type === 'add' ) {
    }else {
    request(api_get_BiddinggetDelRule, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `&ruleid=${delrole[0].id}`
    }).then((res) => {
        if(res.code === 1) {
            message.success('删除成功');
        }
    })
    }

  }
  onroleChange(value, index) {
      this.state.num3[index].rule = value
  }
  ondelrole(index) {
    if(this.search2Obj(this.props.location.search).type !== 'add') {
        request(api_get_BiddinggetDelRule, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `&ruleid=${this.state.num3[index].id}`
        }).then((res) => {
            if(res.code === 1) {
                message.success('删除成功');
            }
        })
    }

    this.state.num3.splice(index, 1)
    this.setState({})
  }
  isLegitimate(arr) {
      let falg = true
      if(arr.length === 0) {
        return false
      }else {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if(element.rule.trim() === '') {
                  falg =  false
                  break
            }
        }
     }
        return falg
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
    let topicCatid=this.search2Obj(this.props.location.search).catid? this.search2Obj(this.props.location.search).catid:115;
        const topicCatList=this.state.topicCatList.length!==0?
        this.state.topicCatList.map((item,index)=>
        <Option value={(item.id).toString()} disabled={item.id === 115} key={index}>{item.catname}</Option>
         ):<Option value={'75'} disabled>默认文件夹</Option>;
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
            <div className="bidding-setting">
                <Tabs tabBarStyle={{color:'#C1C1C1'}} onChange={this.handleOnChange.bind(this)} type="card" activeKey={this.state.addType!==undefined?this.state.addType.toString():'1'}>
                    <TabPane tab="快速设置" key="1">                  
                        <div className="fast-setting">
                        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem
                                    label="专题名称"
                                    {...formItemLayout}
                                >
                            <Input placeholder='专题名称' style={{width: '300px'}}
                             maxLength={'28'}
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

                                {/* <FormItem
                                     label="行业"
                                     {...formItemLayout}
                                >
                                    <Select style={{width: '154px'}} onSelect={this.onSelect.bind(this)} 
                                        value={this.state.select!==0?this.state.select.toString():topicCatid.toString()}>
                                        <Option value="lucy">lucy</Option>
                                        <Option value="lucy">lucy</Option>
                                        <Option value="lucy">lucy</Option>
                                        <Option value="lucy">lucy</Option>
                                        <Option value="lucy">lucy</Option>
                                    </Select>
                                </FormItem>

                                <FormItem
                                     label="地区"
                                     {...formItemLayout}
                                >
                                    <Select style={{width: '154px'}} onSelect={this.onSelect.bind(this)}>
                                        <Option value="lucy2">lucy</Option>
                                        <Option value="lucy3">1</Option>
                                        <Option value="lucy4">2</Option>
                                        <Option value="lucy7">l3ucy</Option>
                                        <Option value="lucy">l3ucy</Option>
                                    </Select>
                                </FormItem> */}

                                <FormItem
                                    {...formItemLayout}
                                    label={tipMessage}
                                >
                                {/* <SettingCreateTopic num1={this.state.num1} name="email" 
                                    onDelrule={this.onDelrule.bind(this)}
                                    onDelwayRule={this.onDelwayRule.bind(this)}
                                    ruleId={this.state.ruleId}
                                    onCreateTopic={this.onCreateTopic.bind(this)}
                                    type="topic"
                                    addOrSetting={this.state.addOrSetting}
                                /> */}
                                <BiddingCreate 
                                    num1={JSON.stringify(this.state.num1)}
                                    onAddRole={this.addRole.bind(this)}
                                    onEditRole={this.editRole.bind(this)}
                                    onDelOne={this.delOne.bind(this)}
                                    onDelRow={this.delRow.bind(this)}
                                >
                                </BiddingCreate>
                                </FormItem> 
                                <FormItem className="addRule"
                                    {...tailFormItemLayout} 
                                >
              {/* <Button  type="primary" size="small" onClick={this.addRule.bind(this)} > */}
                                      {/* + 添加规则 */}
                                 {/* </Button> */}
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
                    <TabPane tab="高级设置" key="3">
                     <div className="fast-setting">
                     <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem
                                    label="专题名称"
                                    {...formItemLayout}
                                >
                                        <Input placeholder="专题名称" style={{width: '300px'}}
                                        maxLength={'28'}
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
                                {/* <SettingSeniorTopic num3={this.state.num3}  
                                    onDelrule={this.onDelrule.bind(this)}
                                    onDelwayRule={this.onDelwayRule.bind(this)}
                                    ruleId={this.state.ruleId}
                                    onInputConent={this.onInputConent.bind(this)}
                                    type="topic"
                                /> */}
                                <BiddingSeniorCreate num3={this.state.num3}
                                    onroleChange={this.onroleChange.bind(this)}
                                    ondelrole={this.ondelrole.bind(this)}
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
export default connect(null,mapDispatchToProps)(Form.create()(BiddingSetting));