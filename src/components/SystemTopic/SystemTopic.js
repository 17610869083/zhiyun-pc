import React from 'react';
import {Input, Modal, Form, message, Row, Col, Icon,Cascader,Tooltip} from 'antd';
import './SystemTopic.less';
import {api_topic_ruleid,save_negative_orWarning_extend,edit_negative_orWarning_extend,
    edit_disuse_extend,api_deleteNegativeOr_WarningExtend,api_delete_DisuseExtend,api_save_disuse_extend} from '../../services/api';
import request from '../../utils/request';
import {keywordDuplicateCheck} from '../../utils/format';
const FormItem = Form.Item;
class SystemTopic extends React.Component {
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
            index:[],
            ruleId:-1,
            num:0,
            inputIndex:0,
            propsData:[],
            cascader:2
        }
    }
    onModelCancel() {
        this.setState({
            visible: false
        })
    }
    onModelOk(e){
        let id = this.props.num1[this.state.inputIndex]['id'];
        let objectValueInput=this.state.objectValueInput===1?this.props.num1[this.state.inputIndex]['rule1']:this.state.objectValueInput;
        let subject1ValueInput=this.state.subject1ValueInput===1?this.props.num1[this.state.inputIndex]['rule2']:this.state.subject1ValueInput;
        let subject2ValueInput=this.state.subject2ValueInput===1?this.props.num1[this.state.inputIndex]['rule3']:this.state.subject2ValueInput;
        let filterValueInput=this.state.filterValueInput===1?this.props.num1[this.state.inputIndex]['rule4']:this.state.filterValueInput;
        if(objectValueInput === ""){
            message.warning('主题词不能为空！');
            return;
        }else if (subject1ValueInput === ""&&subject2ValueInput!==""){
            message.warning('关联词1不能为空！');
            return;
        }
     if(this.props.model==='warnSetting'){
        if(id===''){
            request(save_negative_orWarning_extend,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                }, 
               body:`type=${this.props.type}&scope=${this.state.cascader}&rule1=${objectValueInput}&rule2=${subject1ValueInput}&rule3=${subject2ValueInput}&rule4=${filterValueInput}`
            }).then(res=>{
                   message.success(res.data.message);
                   this.props.saveMessage(res.data.message+new Date())
            }) 
        }else{
             request(edit_negative_orWarning_extend,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                }, 
                body:`id=${id}&type=${this.props.type}&scope=${this.state.cascader}&rule1=${objectValueInput}&rule2=${subject1ValueInput}&rule3=${subject2ValueInput}&rule4=${filterValueInput}`
             }).then(res=>{
                message.success(res.data.message);
                this.props.saveMessage(res.data.message+new Date())
              }) 
        }
    }else{
        if(id===''){
            request(api_save_disuse_extend,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                }, 
               body:`type=${this.props.type}&scope=${this.state.cascader}&rule1=${objectValueInput}&rule2=${subject1ValueInput}&rule3=${subject2ValueInput}&rule4=${filterValueInput}`
            }).then(res=>{
                   message.success(res.data.message);
                   this.props.saveMessage(res.data.message+new Date())
            }) 
        }else{
             request(edit_disuse_extend,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                }, 
                body:`id=${id}&type=${this.props.type}&scope=${this.state.cascader}&rule1=${objectValueInput}&rule2=${subject1ValueInput}&rule3=${subject2ValueInput}&rule4=${filterValueInput}`
             }).then(res=>{
                message.success(res.data.message);
                this.props.saveMessage(res.data.message+new Date())
              }) 
        }
    }
        this.setState((prevState,props)=>({
            visible: false, 
            objectValueInput:1,
            subject1ValueInput:1,
            subject2ValueInput:1,
            filterValueInput:1
        }))

    }
    showModal(e) {
        let inputIndex=parseInt(e.target.dataset.index,10);
        let cascader=this.props.num1[inputIndex]['scope']===''?2:this.props.num1[inputIndex]['scope'];       
        this.setState({
            visible: true,
            inputIndex:inputIndex,
            cascader:cascader
        })
        
    }

    onChangeObject(e) {
        const { value } = e.target;
        let ObjectArr=value.split(' '); 
        if(/~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|\(|\)|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\./.test(value)){ 
            message.warning('请不要带有特殊字符');
        }else if (keywordDuplicateCheck(ObjectArr)){
            message.warning('请不要出现重复的关键词或多余的空格');
        }
        this.setState({
            objectValueInput:value
        })
    }
    onChangeSubject1(e) {
        const { value } = e.target; 
        let Subject1Arr=value.split(' '); 
        if(/~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|\(|\)|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\./.test(value)){  
            message.warning('请不要带有特殊字符');
        }else if (keywordDuplicateCheck(Subject1Arr)){
            message.warning('请不要出现重复的关键词或多余的空格');
        }
        this.setState({
            subject1ValueInput: value
        })
    }
    onChangeSubject2(e) {
        const { value } = e.target;
        let Subject2Arr=value.split(' '); 
        if(/~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|\(|\)|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\./.test(value)){ 
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
        if(/~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|\(|\)|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\./.test(value)){  
            message.warning('请不要带有特殊字符');
        }else if (keywordDuplicateCheck(FilterArr)){
            message.warning('请不要出现重复的关键词或多余的空格');
        }
        this.setState({
            filterValueInput: value
        })
    }

    showModal1 = (e) => {
    this.setState({
      visible1: true,
      index:parseInt(e.target.dataset.index,10),
      inputIndex:this.state.inputIndex-1
    });
    request(api_topic_ruleid,{
        method:'POST',
        headers: {
           "Content-Type": "application/x-www-form-urlencoded"
        },
        body:`ruleid=${e.target.dataset.delid}`
    }).then(res=>{
    })
  }
  handleOk1 = (e) => {
    let delId=this.props.num1[this.state.index]['id'];
    if(this.props.model==='warnSetting'){
    request(api_deleteNegativeOr_WarningExtend,{
        method:'POST',
        headers: {
           "Content-Type": "application/x-www-form-urlencoded"
        },
        body:`id=${delId}`
    }).then(res=>{
          if(res.data.message){
              message.success(res.data.message);
              this.props.onDelwayRule(res.data.message+new Date())
          }
    })
     }else{
        request(api_delete_DisuseExtend,{
            method:'POST',
            headers: {
               "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`id=${delId}`
        }).then(res=>{
              if(res.data.message){
                  message.success(res.data.message);
                  this.props.onDelwayRule(res.data.message+new Date())
              }
        })
     }
    this.setState({
        visible1: false
     });

  }
  handleCancel1 = (e) => {
    this.setState({
      visible1: false,
    });
  }   
  cascaderChange= (value) =>{
      this.setState({
          cascader:value[0]
      })
}
    render() {
        const cascaderOptinion=[{
            value:1,
            label:'标题'
            },{
            value:2,
            label:'标题+正文'
           }];
        let inputIndex=this.state.inputIndex<0?0:this.state.inputIndex;
        const suffix=<span  className="del"><Icon type="close"/></span>;
        const cascaderTip=<span>匹配范围 <Tooltip placement="bottom" title='对标题生效，或者标题加正文生效。'>
        <Icon type="question-circle" className="iconMessage"></Icon>
        </Tooltip>
        </span>;

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
        okText="保存"
        onCancel={this.onModelCancel.bind(this)}
        onOk={this.onModelOk.bind(this)}
    > 
        <Form layout="vertical">
        <FormItem label={cascaderTip}>  
        <Cascader options={cascaderOptinion} onChange={this.cascaderChange} placeholder="请选择匹配范围"
          value={[this.state.cascader]}
        />
        </FormItem>   
            <FormItem label={objectValueTip}>  
                <Input type="textarea"
                       onChange={this.onChangeObject.bind(this)}
                       value={this.state.objectValueInput!==1?this.state.objectValueInput:
                       this.props.num1[inputIndex]['rule1']
                       }
                       data-index={inputIndex}
                       maxLength={'50'}
                       />
            </FormItem>
            <FormItem label={subject1ValueTip}>
                <Input type="textarea"
                       onChange={this.onChangeSubject1.bind(this)}
                       value={this.state.subject1ValueInput===1?
                       this.props.num1[inputIndex]['rule2']:this.state.subject1ValueInput
                       }
                       maxLength={'500'}
                />
            </FormItem>
            <FormItem label={subject2ValueTip}>
                <Input type="textarea"                
                       onChange={this.onChangeSubject2.bind(this)}
                       value={this.state.subject2ValueInput===1?
                       this.props.num1[inputIndex]['rule3']:this.state.subject2ValueInput
                       }
                       maxLength={'500'}
                />
            </FormItem>
            <FormItem label={filterValueTip}>
                <Input type="textarea"                   
                       onChange={this.onChangeFilter.bind(this)}
                       value={this.state.filterValueInput===1?
                       this.props.num1[inputIndex]['rule4']:this.state.filterValueInput
                       }
                       maxLength={'50'}
                />
            </FormItem>
                    <Tooltip placement="bottom" title={title}>
                    <Icon type="question-circle" style={{color:'#000000'}}></Icon>
                    </Tooltip>
        </Form>
    </Modal></div> ;
        const list=this.props.num1.map((item,index)=>
        <div key={index} className="mate-key"><div>
                    <Row>
                        <Col span={4}>
                            <Input
                                placeholder="主题词"
                                readOnly
                                onClick={this.showModal.bind(this)}
                                value={this.state.propsData[index]!==undefined?this.state.propsData[index]['rule1']:item['rule1']}
                                suffix={suffix}
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
                                   value={this.state.propsData[index]!==undefined?this.state.propsData[index]['rule2']:item['rule2']}
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
                                   value={this.state.propsData[index]!==undefined?this.state.propsData[index]['rule3']:item['rule3']}
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
                                   value={this.state.propsData[index]!==undefined?this.state.propsData[index]['rule4']:item['rule4']}
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
         </Row>
                </div></div>);
        return (
            <div className="rightBox">

            {list}
            {modal}
        <Modal
          title="设置关键词组"
          visible={this.state.visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
        >
          <p className="textCenter">确定要删除这个关键词组吗?</p>

        </Modal>
            </div>
        )
    }
}

export default SystemTopic;