import React from 'react';
import {Input, Modal, Form, message, Row, Col, Icon,Tooltip} from 'antd';
import './SettingCreateTopic.less';
import {api_topic_ruleid,api_clf_ruleid} from '../../services/api';
import request from '../../utils/request';
import {keywordDuplicateCheck} from '../../utils/format';
const FormItem = Form.Item;
class SettingCreateTopic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            visible1: false,
            objectValue: [],
            subject1Value: [],
            subject2Value: [],
            filterValue: [],
            objectValueInput:1,
            subject1ValueInput:1,
            subject2ValueInput:1,
            filterValueInput:1,
            disBlock: {visibility: 'visible',color:'#ff0000'},
            disNone: {visibility: 'hidden',color:'#ff0000'},
            texts:[],
            allValue:[],
            index:[],
            delArr:[],
            ruleId:-1,
            num:0,
            inputIndex:0,
            propsData:[],
            updateNum:1,
            flag:false
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.updateNum!==this.state.updateNum){
        this.props.onCreateTopic(this.state.propsData)
      }
  }
    onModelCancel() {
        // if(this.state.objectValueInput === ''){
        //     message.warning('主题词不能为空！');
        //     return;
        // }
        this.setState({
            visible: false,
            objectValueInput:1,
            subject1ValueInput:1,
            subject2ValueInput:1,
            filterValueInput:1,
            flag:false
        })
    }
    onModelOk(e){
        let propsData=this.props.num1;    
        let num=this.state.inputIndex;
        let ruleId=this.props.ruleId[num]!==undefined?this.props.ruleId[num]:propsData[num]['id'];
        let  objectValue=this.state.objectValueInput!==1?this.state.objectValueInput:propsData[num]['rule1'];
        let  subject1Value=this.state.subject1ValueInput!==1?this.state.subject1ValueInput:propsData[num]['rule2'];
        let  subject2Value=this.state.subject2ValueInput!==1?this.state.subject2ValueInput:propsData[num]['rule3'];
        let  filterValue=this.state.filterValueInput!==1?this.state.filterValueInput:propsData[num]['rule4'];        
        if(objectValue === "") {
            message.warning('主题词不能为空！');
            return;            
        }
        propsData[num]['rule1']=objectValue.trim();
        propsData[num]['rule2']=subject1Value.trim();
        propsData[num]['rule3']=subject2Value.trim();
        propsData[num]['rule4']=filterValue.trim();
        propsData[num]['id']=ruleId;
        this.setState((prevState,props)=>({
            visible: false,
            propsData:propsData,
            allValue:[],
            objectValueInput:1,
            subject1ValueInput:1,
            subject2ValueInput:1,
            filterValueInput:1,
            ruleId:this.state.ruleId+1 ,
            updateNum:new Date() ,
            flag:true     
        }))

    }
    showModal(e) {
        let inputIndex=parseInt(e.target.dataset.index,10);        
        this.setState({
            visible: true,
            inputIndex:inputIndex
        })
    }
  
    onChangeObject(e) {
        let { value } = e.target;
        let ObjectArr=value.split(' '); 
        if(/~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\.|\+/.test(value)){ 
             message.warning('请不要带有特殊字符');
        }else if (keywordDuplicateCheck(ObjectArr)){
             message.warning('请不要出现重复的关键词或多余的空格');
        }
        this.setState({
            objectValueInput:value.trim()
        })
    }
    onChangeSubject1(e) {
        const { value } = e.target; 
        let Subject1Arr=value.split(' '); 
        if(/~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\.|\+/.test(value)){ 
            message.warning('请不要带有特殊字符');
       }else if (keywordDuplicateCheck(Subject1Arr)){
            message.warning('请不要出现重复的关键词或多余的空格');
       }
       console.log(value)
        this.setState({
            subject1ValueInput: value
        })
    }
    onChangeSubject2(e) {
        const { value } = e.target;
        let Subject2Arr=value.split(' ');
        if(/~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|（|）|(%)|【|】|\{|\}|；|;|(%)|,|，|。|\.|\+/.test(value)){  
            message.warning('请不要带有特殊字符');
       }else if (keywordDuplicateCheck(Subject2Arr)){
            message.warning('请不要出现重复的关键词或多余的空格');
       }
        this.setState({
            subject2ValueInput: value
        })
    }
    onChangeFilter(e) {
        const { value } = e.target;
        let FilterArr=value.split(' ');
        if(/~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\.|\+/.test(value)){ 
            message.warning('请不要带有特殊字符');
       }else if (keywordDuplicateCheck(FilterArr)){
            message.warning('请不要出现重复的关键词或多余的空格');
       }
        this.setState({
            filterValueInput: value
        })
    }
    onDel(e){
        let targetNode=e.target.parentNode.parentNode.parentNode.firstChild;
        let ruleArr=['rule1','rule2','rule3','rule4'];
        let num=parseInt(targetNode.dataset.num,10);
        let index=parseInt(targetNode.dataset.index,10);
        let propsData=this.props.num1;
        propsData[index][ruleArr[num]]='';
        this.setState({delArr:this.state.delArr.concat({num:num,index:index}),
                       propsData:propsData
        },()=>{
            this.props.onCreateTopic(this.state.propsData);
        })      

    }
    showModal1 = (e) => {
    this.setState({
      visible1: true,
      index:parseInt(e.target.dataset.index,10),
      inputIndex:this.state.inputIndex-1
    });
    if(this.props.type==="topic"){
    request(api_topic_ruleid,{
        method:'POST',
        headers: {
           "Content-Type": "application/x-www-form-urlencoded"
        },
        body:`ruleid=${e.target.dataset.delid}`
    })
    }else{
        request(api_clf_ruleid,{
            method:'POST',
            headers: {
               "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`ruleid=${e.target.dataset.delid}`
        })
    }
  }
  handleOk1 = (e) => {
    let objectValueInput=this.props.num1;
    objectValueInput.splice(this.state.index,1);
    this.setState({
        visible1: false
    });
    this.props.onDelwayRule(this.state.index)
    this.props.onCreateTopic(objectValueInput)
  }
  handleCancel1 = (e) => {
    this.setState({
      visible1: false,
    });
  }   
 
    render() { 
        let inputIndex=this.state.inputIndex<0?0:this.state.inputIndex;
    	const suffix=<span onClick={this.onDel.bind(this)} className="del"><Icon type="close"/></span>;
        const objectValueTip=<span>主题词&nbsp;<Tooltip placement="bottom" title='核心词汇，例如事件的名称、地域、人名、产品名称、公司企业名称等。(不能为空)'>
            <Icon type="question-circle" className="iconMessageTip"></Icon>
            </Tooltip>
            </span>;

        const subject1ValueTip=<span>关联词1<Tooltip placement="bottom" title='描述“主题词”的词汇。(可以为空)'>
        <Icon type="question-circle" className="iconMessageTip"></Icon>
        </Tooltip>
        </span>;

        const subject2ValueTip=<span>关联词2<Tooltip placement="bottom" title='描述“主题词”与“关联词1”的词汇。(可以为空)'>
        <Icon type="question-circle" className="iconMessageTip"></Icon>
        </Tooltip>
        </span>;

        const filterValueTip=<span>排除词&nbsp;<Tooltip placement="bottom" title='排除歧义词或不相关的词汇、容易产生误解的词汇。(可以为空)'>
        <Icon type="question-circle" className="iconMessageTip"></Icon>
        </Tooltip>
        </span>;

        const title =<div>
             <p>①主题词：北京 河北</p>
             <p>②关联词1：暴雨 冰雹 暴雪 </p>
             <p>③关联词2：预警 受灾 伤亡 </p>
             <p>④排除词：暴雪公司 (歧义词) </p>
             <p>系统会匹配舆情信息中出现主题词[北京或者河北]，并且包含关联词1[暴雨或者冰雹或者暴雪],包含关联词2[预警或者受灾或者伤亡]的数据,其中不包含排除词[暴雪公司]。 </p>
        </div>
        const modal= <div>
        <Modal
        visible={this.state.visible}
        title="设置关键词"
        okText="确定"
        onCancel={this.onModelCancel.bind(this)}
        onOk={this.onModelOk.bind(this)}
    > 
        <Form layout="vertical">
            <FormItem label={objectValueTip}>  
                <Input type="textarea"
                       onChange={this.onChangeObject.bind(this)}
                       value={this.state.objectValueInput!==1 ?this.state.objectValueInput:this.props.num1[inputIndex]['rule1']}
                       data-index={inputIndex}
                       maxLength={'50'} 
                       />
            </FormItem>
            <FormItem label={subject1ValueTip}>
                <Input type="textarea"
                       value={this.state.subject1ValueInput!==1?this.state.subject1ValueInput:this.props.num1[inputIndex]['rule2']}
                       onChange={this.onChangeSubject1.bind(this)}
                       maxLength={'500'} 
                />
            </FormItem>
            <FormItem label={subject2ValueTip}>
                <Input type="textarea"
                       value={this.state.subject2ValueInput!==1?this.state.subject2ValueInput:this.props.num1[inputIndex]['rule3']}
                       onChange={this.onChangeSubject2.bind(this)} 
                       maxLength={'500'}                   
                />
            </FormItem>
            <FormItem label={filterValueTip}>
                <Input type="textarea"
                       value={this.state.filterValueInput!==1?this.state.filterValueInput:this.props.num1[inputIndex]['rule4']}
                       onChange={this.onChangeFilter.bind(this)}  
                       maxLength={'50'}                  
                />
            </FormItem>
        </Form>
        <Tooltip placement="bottom" title={title}>
        <Icon type="question-circle" style={{color:'#000000'}}></Icon>
        </Tooltip>
    </Modal></div> ;
        const list=this.props.num1.map((item,index)=>
        <div key={index} className="mate-key"><div>
                    <Row>
                        <Col span={4}>
                            <Input
                                placeholder="主题词"
                                readOnly
                                onClick={this.showModal.bind(this)}
                                value={this.state.propsData[index]!==undefined && this.state.flag?this.state.propsData[index]['rule1']:item['rule1']}
                                // suffix={suffix}
                                data-num='0'
                                data-index={index}
                                                         
                            />  
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <span className="bigFont">*</span>
                        </Col>
                        <Col span={4}>
                            <Input placeholder="关联词1"
                                   readOnly
                                   onClick={this.showModal.bind(this)}
                                   value={this.state.propsData[index]!==undefined  && this.state.flag?this.state.propsData[index]['rule2']:item['rule2']}
                                   suffix={suffix}
                                   data-num='1'
                                data-index={index}
                               
                            />
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <span className="bigFont">*</span>
                        </Col>
                        <Col span={4}>
                            <Input placeholder="关联词2"
                                   readOnly
                                   onClick={this.showModal.bind(this)}
                                   value={this.state.propsData[index]!==undefined  && this.state.flag?this.state.propsData[index]['rule3']:item['rule3']}
                                   suffix={suffix}
                                   data-num='2'
                                   data-index={index}
                                   />
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <Icon type="minus"/>
                        </Col>
                        <Col span={4}>
                            <Input placeholder="排除词"
                                   readOnly
                                   onClick={this.showModal.bind(this)}
                                   value={this.state.propsData[index]!==undefined  && this.state.flag?this.state.propsData[index]['rule4']:item['rule4']}
                                   suffix={suffix}
                                   data-num='3'
                                   data-index={index}
                            />
                        </Col>
        <Icon  type="minus-circle" className="delBtn" onClick={this.showModal1} 
         style={this.props.num1.length>1?this.state.disBlock:this.state.disNone}
         data-delid={item.id}
         data-index={index}
         />
        <Modal
          title="设置关键词组"
          visible={this.state.visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
        >
          <p className="textCenter">确定要删除这个关键词组吗?</p>

        </Modal></Row>
                </div></div>);
        return (
            <div className="rightBox">

            {list}
            {modal}
            </div>
        )
    }
}

export default SettingCreateTopic;