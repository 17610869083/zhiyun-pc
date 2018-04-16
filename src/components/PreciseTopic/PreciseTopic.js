import React from 'react';
import {Input, Modal, Form, message, Row, Col, Icon} from 'antd';
import './PreciseTopic.less';

const FormItem = Form.Item;


class PreciseTopic extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            visible: false,
            visible1: false,
            visible2:false,
            objectValue: [],
            subject1Value: [],
            subject2Value: [],
            filterValue: [],
            objectValueInput: '',
            subject1ValueInput: '',
            subject2ValueInput: '',
            filterValueInput: '',
            disBlock: {visibility: 'visible'},
            disNone: {visibility: 'hidden'},
            texts:[],
            box:0,
            code:[],
            index:[],
            delArr:[],
            ruleArr:[],
            ruleCodeId:-1,
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
            ]

        }
    }


    onModelCancel() {
        this.setState({
            visible: false
        })
    }
    onModelOk(e) {
        let propsData=this.props.num2;
        let num=propsData.length-1;
        let monitoringTypeLength=document.querySelectorAll('.form'+num+' .backGroundBlue');
        var arr=[];
        for(let i=0;i<monitoringTypeLength.length;i++){
                arr.push(monitoringTypeLength[i].dataset.code);
        }   
        if(this.state.objectValueInput === "") {
            message.warning('主题词不能为空！');
            return;
        }
        if(arr.length===0){
            this.setState({
                 visible2:true
            })
        }
        this.setState((prevState,props)=>({
            visible: false,
            objectValue:prevState.objectValue.concat(this.state.objectValueInput),
            subject1Value:prevState.subject1Value.concat(this.state.subject1ValueInput),
            subject2Value:prevState.subject2Value.concat(this.state.subject2ValueInput),
            filterValue:prevState.filterValue.concat(this.state.filterValueInput),
            objectValueInput:'',
            subject1ValueInput:'',
            subject2ValueInput:'',
            filterValueInput:''
        }),()=>{
           
        }) 
        this.props.onModelOkOne([arr,this.state.objectValueInput,this.state.subject1ValueInput,this.state.subject2ValueInput,this.state.filterValueInput]) 
        
    }
    showModal() {
        this.setState({
            visible: true
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
        let num=parseInt(targetNode.dataset.num,10);
        let index=parseInt(targetNode.dataset.index,10);
        let objectValue=this.state.objectValue;
        let subject1Value=this.state.subject1Value;
        let subject2Value=this.state.subject2Value;
        let filterValue=this.state.filterValue;
        this.setState({delArr:this.state.delArr.concat({num:num,index:index})},()=>{
              this.props.onDelrule(this.state.delArr)
        },()=>{
        })
        if(num===1){
            objectValue[index]='';
            this.setState({objectValue:objectValue});
        }else if (num===2){
            subject1Value[index]='';
            this.setState({subject1Value:subject1Value});
        }else if (num===3){
            subject2Value[index]='';
            this.setState({subject2Value:subject2Value});
        }else{
            filterValue[index]='';
            this.setState({filterValue:filterValue});
        }
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
      index:this.state.index.concat(parseInt(e.target.dataset.index,10))
    });
  }
  handleOk1 = (e) => {
    this.props.num2.splice(this.props.num2.length-1,1);
    this.setState({
                    visible1: false
    }); 
    this.props.onDelwayRule(this.state.index)   
  }
  handleCancel1 = (e) => {
    this.setState({
      visible1: false,
      visible:true
    });
  }
  hideModal(){
      this.setState({
        visible2:false,
        visible:true
      })
  }
    render() {
    	const monitoringType=this.state.monitoringType.map((item, index) =>
            <div
                key={index}  className="monitoring-type" onClick={(e)=>this.onchangeBackground(index,e)}  data-code={item.code}
            >{item.type}</div>
       );
    	const suffix=<span onClick={this.onDel.bind(this)} className="del"><Icon type="close"/></span>;
        const list=this.props.num2.map((item,index)=><div key={index} className="mate-key">  <div>
                    <Row>
                        <Col span={4}>
                            <Input
                                placeholder="主题词"
                                readOnly
                                onClick={this.showModal.bind(this)}
                                value={this.state.objectValue[index]}
                                suffix={suffix}
                                data-index={index}
                                data-num='1'
                            />
                         
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <span className="bigFont">*</span>
                        </Col>
                        <Col span={4}>
                            <Input placeholder="关联词1"
                                   readOnly
                                   onClick={this.showModal.bind(this)}
                                   value={this.state.subject1Value[index]}
                                   suffix={suffix}
                                   data-index={index}
                                   data-num='2'
                            />
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <span className="bigFont">*</span>
                        </Col>
                        <Col span={4}>
                            <Input placeholder="关联词2"
                                   readOnly
                                   onClick={this.showModal.bind(this)}
                                   value={this.state.subject2Value[index]}
                                   suffix={suffix}
                                   data-index={index}
                                   data-num='3'
                                   />
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <Icon type="minus"/>
                        </Col>
                        <Col span={4}>
                            <Input placeholder="排除词"
                                   readOnly
                                   onClick={this.showModal.bind(this)}
                                   value={this.state.filterValue[index]}
                                   suffix={suffix}
                                   data-index={index}
                                   data-num='4'
                            />
                        </Col>


        <Icon  type="minus-circle" className="delBtn" onClick={this.showModal1}  
        style={this.props.num2.length>1?this.state.disBlock:this.state.disNone}
        data-index={index}
        />
        <Modal
          title="设置关键词组"
          visible={this.state.visible1}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
        >
          <p className="textCenter">确定要删除这个关键词组吗?</p>

        </Modal>

                    </Row>
                </div>
                <Modal
                    onChange={this.props.handleEmail}
                    visible={this.state.visible}
                    title="设置关键词"
                    okText="保存"
                    onCancel={this.onModelCancel.bind(this)}
                    onOk={this.onModelOk.bind(this)}
                >  
               
                    <Form layout="vertical" className={'form'+index}>
                    
                        <FormItem label="主题词" className="smallFont">
                            <div className="type">监控类型</div>
                            <div>{monitoringType}</div> 
                            <Input type="textarea"
                                   onChange={this.onChangeObject.bind(this)}
                                   value={this.state.objectValueInput}
                                   placeholder="主题词不能为空！"/>
                        </FormItem>
                        <FormItem label="关联词 1" className="smallFont">
                        <div className="type">监控类型</div>
                        <div>{monitoringType}</div> 
                            <Input type="textarea"
                                   onChange={this.onChangeSubject1.bind(this)}
                                   value={this.state.subject1ValueInput}
                            />
                        </FormItem>
                        <FormItem label="关联词 2" className="smallFont">
                        <div className="type">监控类型</div>
                        <div>{monitoringType}</div> 
                            <Input type="textarea"
                                   onChange={this.onChangeSubject2.bind(this)}
                                   value={this.state.subject2ValueInput}
                            />
                        </FormItem>
                        <FormItem label="排除词" className="smallFont">
                        <div className="type">监控类型</div>
                        <div>{monitoringType}</div> 
                            <Input type="textarea"
                                   onChange={this.onChangeFilter.bind(this)}
                                   value={this.state.filterValueInput}
                            />
                        </FormItem>
                    </Form>
                </Modal>
          <Modal
          title="精准设置"
          visible={this.state.visible2}
          onOk={this.hideModal.bind(this)}
          onCancel={this.hideModal.bind(this)}
          okText="确认"
          cancelText="取消"
        >
          <p>请选择监控类型！</p>
        </Modal>
                </div>);

        return (
            <div>
            {list}
            </div>

        )
    }
}
export default PreciseTopic;