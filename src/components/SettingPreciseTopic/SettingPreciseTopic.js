import React from 'react';
import {Input, Modal, Form, message, Row, Col, Icon} from 'antd';
import './SettingPreciseTopic.less';
import Store from '../../redux/store/index';
import {api_topic_ruleid} from '../../services/api';
import request from '../../utils/request';
const FormItem = Form.Item;
class SettingPreciseTopic extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            visible: false,
            visible1: false,
            objectValue: [],
            subject1Value: [],
            subject2Value: [],
            filterValue: [],
            objectValueInput:'',
            subject1ValueInput:'',
            subject2ValueInput:'',
            filterValueInput:'',
            objectValueCode:'',
            subject1ValueCode:'',
            subject2ValueCode:'',
            filterValueCode:'',
            disBlock: {visibility: 'visible'},
            disNone: {visibility: 'hidden'},
            texts:[],
            box:0,
            code:[],
            monitoringType:[
               {
               	id:1,
               	type:'人物',
               	code:'RT_PEOPLE'
               },
               {
               	id:2,
               	type:'机构',
               	code:'RT_ORGANIZATION'
               },
               {
               	id:3,
               	type:'产品',
               	code:'RT_PRODUCT'
               },
               {
               	id:4,
               	type:'品牌',
               	code:'RT_BRAND'
               },
                {
               	id:5,
               	type:'事件',
               	code:'RT_EVENT'
               },
                {
               	id:6,
               	type:'其他',
               	code:'RT_OTHER'
               }
            ],
            allValue:[],
            rulecodeArr:[],
            index:[],
            ruleId:-1,
            delArr:[],
            num:-1,
            inputIndex:0,
            propsData:[]
        }
    }

    componentDidMount(){
        let topicAlldatas=Store.getState().getTopicLocationSucceededReducer.res;
        if(topicAlldatas!==1){
             this.setState({
                allValue:topicAlldatas.rulearr             
             })
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps===this.props){
        this.props.onPreciseTopic(this.state.propsData)
      }
  }
    onModelCancel() {
        this.setState({
            visible: false
        })
    }
    onModelOk(e){
        let propsData=this.props.num2;
        var num=this.state.inputIndex;
        let backGroundBlueNode=document.querySelectorAll('.form'+num+' .backGroundBlue');
        let backGroundBlueArr=[];
        for(let i=0;i<backGroundBlueNode.length;i++){
            backGroundBlueArr.push(backGroundBlueNode[i].dataset.code||'');
            backGroundBlueNode[i].className='monitoring-type';
        }
        let ruleId=this.props.ruleId[num]!==undefined?this.props.ruleId[num]:propsData[num]['id'];
        let  objectValue=this.state.objectValueInput!==''?this.state.objectValueInput:propsData[num]['rule1'];
        let  subject1Value=this.state.subject1ValueInput!==''?this.state.subject1ValueInput:propsData[num]['rule2'];
        let  subject2Value=this.state.subject2ValueInput!==''?this.state.subject2ValueInput:propsData[num]['rule3'];
        let  filterValue=this.state.filterValueInput!==''?this.state.filterValueInput:propsData[num]['rule4'];        
        propsData[num]['rule1']=objectValue;
        propsData[num]['rule2']=subject1Value;
        propsData[num]['rule3']=subject2Value;
        propsData[num]['rule4']=filterValue;
        propsData[num]['id']=ruleId;         
        propsData[num]['rulecode1']=backGroundBlueArr[0];
        propsData[num]['rulecode2']=backGroundBlueArr[1];
        propsData[num]['rulecode3']=backGroundBlueArr[2];
        propsData[num]['rulecode4']=backGroundBlueArr[3];
        if(objectValue ==="") {
            message.warning('主题词不能为空！');
            return;
        } 
        this.setState((prevState,props)=>({
            visible: false,
            rulecodeArr:backGroundBlueArr,
            allValue:[],
            objectValueInput:'',
            subject1ValueInput:'',
            subject2ValueInput:'',
            filterValueInput:'',
            ruleId:this.state.ruleId+1 ,
            propsData:propsData
        }),()=>{
        })       	
    }
    showModal(e) {
        let inputIndex=parseInt(e.target.dataset.index,10); 
        let propsData=this.state.propsData.length!==0?this.state.propsData:this.props.num2;  
        this.setState({
            visible: true,
            num:this.state.num+1,
            inputIndex:inputIndex
        },()=>{
            let siblings=(elm)=> {
                var a = [];
                var p = elm.parentNode.children;
                for(var i =0,pl= p.length;i<pl;i++) {
                if(p[i] !== elm) a.push(p[i]);
                }
                return a;
                }
                let rulecode1=propsData[inputIndex]!==undefined?propsData[inputIndex]['rulecode1']:'';
                let rulecode2=propsData[inputIndex]!==undefined?propsData[inputIndex]['rulecode2']:'';
                let rulecode3=propsData[inputIndex]!==undefined?propsData[inputIndex]['rulecode3']:'';
                for(let i=0;i<this.refs.theme.children.length;i++){
                    if(this.refs.theme.children[i].dataset.code===rulecode1){                
                          this.refs.theme.children[i].className='monitoring-type  backGroundBlue'; 
                          siblings(this.refs.theme.children[i]).map((item,index)=>{
                            return  item.className="monitoring-type";
                         }); 
                      }
                    if(this.refs.theme0.children[i].dataset.code===rulecode2){                     
                        this.refs.theme0.children[i].className='monitoring-type  backGroundBlue';
                        siblings(this.refs.theme0.children[i]).map((item,index)=>{
                            return  item.className="monitoring-type";
                         }); 
                    }
                    if(this.refs.theme1.children[i].dataset.code===rulecode3){                     
                        this.refs.theme1.children[i].className='monitoring-type  backGroundBlue';
                        siblings(this.refs.theme1.children[i]).map((item,index)=>{
                            return  item.className="monitoring-type";
                         });
                    }
                
               }
        })
        

    }

    onChangeObject(e) {
    	const { value } = e.target;
        this.setState({
            objectValueInput:value
        })
    }
    onChangeSubject1(e) {
        const { value } = e.target;

        this.setState({
            subject1ValueInput: value
        })
    }
    onChangeSubject2(e) {
        const { value } = e.target;
        this.setState({
            subject2ValueInput: value
        })
    }
    onChangeFilter(e) {
        const { value } = e.target;
        this.setState({
            filterValueInput: value
        })
    }
    onDel(e){
        let targetNode=e.target.parentNode.parentNode.parentNode.firstChild; 
        let ruleArr=['rule1','rule2','rule3','rule4'];      
        let ruleCodeArr=['rulecode1','rulecode2','rulecode3','rulecode4'];      
        let num=parseInt(targetNode.dataset.num,10);
        let index=parseInt(targetNode.dataset.index,10);
        let propsData=this.props.num2;
        propsData[index][ruleArr[num]]='';
        propsData[index][ruleCodeArr[num]]='';
        this.setState({delArr:this.state.delArr.concat({num:num,index:index}),
        propsData:propsData
        },()=>{
            this.props.onPreciseTopic(this.state.propsData);
            this.props.onPreciseTopic(this.state.propsData)
        })
    }
    onchangeBackground(index,e){
        let siblings=(elm)=> {
            var a = [];
            var p = elm.parentNode.children;
            for(var i =0,pl= p.length;i<pl;i++) {
            if(p[i] !== elm) a.push(p[i]);
            }
            return a;
            }
         e.target.className='monitoring-type  backGroundBlue'; 
         siblings(e.target).map((item,index)=>{
            return  item.className="monitoring-type";
         }); 
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
    let objectValueInput=this.state.propsData.length!==0?this.state.propsData:this.props.num2;
    objectValueInput.splice(this.state.index,1);
    this.setState({
            visible1: false
    });
    this.props.onDelwayRule(this.state.index)  
    this.props.onPreciseTopic(objectValueInput)     
  }
  handleCancel1 = (e) => {
    this.setState({
      visible1: false,
    });
  }
    render() {  
        let inputIndex=this.state.inputIndex<0?0:this.state.inputIndex;      
    	const monitoringType=this.state.monitoringType.map((item, index) =>
            <div
                key={index}  className="monitoring-type" onClick={(e)=>this.onchangeBackground(index,e)}
                data-code={item.code}               
                >{item.type}</div>
       );
       const modal=<div>
               <Modal
                    onChange={this.props.handleEmail}
                    visible={this.state.visible}
                    title="设置关键词"
                    okText="保存"
                    onCancel={this.onModelCancel.bind(this)}
                    onOk={this.onModelOk.bind(this)}
                >         
                    <Form layout="vertical" className={'form'+inputIndex}>                   
                        <FormItem label="主题词" className="smallFont">
                            <div className="type">监控类型</div>
                            <div ref="theme" data-num="0">{monitoringType}</div> 
                            <Input type="textarea"
                                   onChange={this.onChangeObject.bind(this)}
                                   placeholder={this.props.num2[inputIndex]['rule1']!==''?
                                   this.props.num2[inputIndex]['rule1']:'主题词不能为空'}
                                   value={this.state.objectValueInput}
                            />
                        </FormItem>
                        <FormItem label="关联词 1" className="smallFont">
                        <div className="type">监控类型</div>
                         <div ref="theme0" data-num="1">{monitoringType}</div> 
                            <Input type="textarea"
                                   onChange={this.onChangeSubject1.bind(this)}
                                   placeholder={this.props.num2[inputIndex]['rule2']}
                                   value={this.state.subject1ValueInput}
                            />
                        </FormItem>
                        <FormItem label="关联词 2" className="smallFont">
                        <div className="type">监控类型</div>
                        <div ref="theme1" data-num="2"> {monitoringType}</div>
                            <Input type="textarea"
                                   onChange={this.onChangeSubject2.bind(this)}
                                   placeholder={this.props.num2[inputIndex]['rule3']}
                                   value={this.state.subject2ValueInput}
                            />
                        </FormItem>
                        <FormItem label="排除词" className="smallFont">
                        <div className="type">监控类型</div>
                        <div ref="theme2">{monitoringType}</div>
                            <Input type="textarea"
                                   onChange={this.onChangeFilter.bind(this)}
                                   placeholder={this.props.num2[inputIndex]['rule4']}
                                   value={this.state.filterValueInput}
                            />
                        </FormItem>
                    </Form>
                </Modal>
       </div>;       
    	const suffix=<span onClick={this.onDel.bind(this)} className="del"><Icon type="close"/></span>;
        const list=this.props.num2.map((item,index)=><div key={index} className="mate-key">  <div>
                    <Row>
                        <Col span={4}>
                            <Input
                                placeholder="主题词"
                                readOnly
                                onClick={this.showModal.bind(this)}
                                value={this.state.propsData[index]!==undefined?this.state.propsData[index]['rule1']:item['rule1']}
                                suffix={suffix}
                                data-index={index}
                                data-num='0'
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
                                   data-index={index}
                                   data-num='1'
                                   ref='test'
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
                                   data-index={index}
                                   data-num='2'
                                   ref='test'
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
                                   data-index={index}
                                   data-num='3'
                                   ref='test'
                            />
                        </Col>
        <Icon  type="minus-circle" className="delBtn" onClick={this.showModal1}  
        style={this.props.num2.length>1?this.state.disBlock:this.state.disNone}
        data-delid={item.id}
        data-index={index}
        />
        <Modal
          title="设置关键词组"
          visible={this.state.visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
        >
          <p className="textCenter" >确定要删除这个关键词组吗?</p>

        </Modal>

                    </Row>
                </div>
            
                </div>);

        return (
            <div>
            {list}
            {modal}
            </div>
        )
    }
}
export default SettingPreciseTopic;