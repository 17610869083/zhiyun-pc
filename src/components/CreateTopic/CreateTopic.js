import React from 'react';
import {Input, Modal, Form, message, Row, Col, Icon} from 'antd';
import './CreateTopic.less';

const FormItem = Form.Item;


class CreateTopic extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            visible: false,
            visible1: false,
            objectValue: [],
            subject1Value: [],
            subject2Value: [],
            filterValue: [],
            objectValueInput: '',
            subject1ValueInput: '',
            subject2ValueInput: '',
            filterValueInput: '',
            disBlock: {visibility: 'visible',color:'#ff0000'},
            disNone: {visibility: 'hidden',color:'#ff0000'},
            texts:[],
            index:[],
            delArr:[],
            propsData:[],
            inputIndex:0
        }
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps===this.props){
        this.props.onCreateTopic(this.state.propsData)
      }
  }
    onModelCancel() {
        this.setState({
            visible: false
        })
    }
    onModelOk(e) {
        let propsData=this.props.num1;  
        let num=this.state.inputIndex;
        let  objectValue=this.state.objectValueInput!==''?this.state.objectValueInput:propsData[num]['rule1'];
        let  subject1Value=this.state.subject1ValueInput!==''?this.state.subject1ValueInput:propsData[num]['rule2'];
        let  subject2Value=this.state.subject2ValueInput!==''?this.state.subject2ValueInput:propsData[num]['rule3'];
        let  filterValue=this.state.filterValueInput!==''?this.state.filterValueInput:propsData[num]['rule4'];        
        propsData[num]['rule1']=objectValue;
        propsData[num]['rule2']=subject1Value;
        propsData[num]['rule3']=subject2Value;
        propsData[num]['rule4']=filterValue;
        if(objectValue === "") {
            message.warning('主题词不能为空！');
            return;
        }
        this.setState((prevState,props)=>({
            visible: false,
            objectValueInput: '',
            subject1ValueInput: '',
            subject2ValueInput: '',
            filterValueInput: '',
            propsData:propsData
        }),()=>{ 	
        })
    }
    showModal(e) {
        let inputIndex=parseInt(e.target.dataset.index,10);        
        this.setState({
            visible: true,
            inputIndex:inputIndex
        },()=>{
              
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
            filterValueInput:value
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
      index:parseInt(e.target.dataset.index,10)
    });
  }
  handleOk1 = (e) => {
    let objectValueInput=this.state.propsData.length!==0?this.state.propsData:this.props.num1;
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
        const modal= <div>
        <Modal
        visible={this.state.visible}
        title="设置关键词"
        okText="保存"
        onCancel={this.onModelCancel.bind(this)}
        onOk={this.onModelOk.bind(this)}
    > 
        <Form layout="vertical">
            <FormItem label="主题词">  
                <Input type="textarea"
                       onChange={this.onChangeObject.bind(this)}
                       value={this.state.objectValueInput}
                       placeholder={this.props.num1[inputIndex]['rule1']!==''?
                       this.props.num1[inputIndex]['rule1']:'主题词不能为空'
                       }
                       data-index={inputIndex}
                       />
            </FormItem>
            <FormItem label="关联词 1">
                <Input type="textarea"
                       value={this.state.subject1ValueInput}
                       onChange={this.onChangeSubject1.bind(this)}
                       placeholder={this.props.num1[inputIndex]['rule2']}
                />
            </FormItem>
            <FormItem label="关联词 2">
                <Input type="textarea"
                       value={this.state.subject2ValueInput}
                       onChange={this.onChangeSubject2.bind(this)}
                       placeholder={this.props.num1[inputIndex]['rule3']}
                />
            </FormItem>
            <FormItem label="排除词">
                <Input type="textarea"
                       value={this.state.filterValueInput}
                       onChange={this.onChangeFilter.bind(this)}
                       placeholder={this.props.num1[inputIndex]['rule4']}
                />
            </FormItem>
        </Form>
    </Modal></div> ;
    	const suffix=<span onClick={this.onDel.bind(this)} className="del"><Icon type="close"/></span>;
        const list=this.props.num1.map((item,index)=>
        <div key={index} className="mate-key">  <div>
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

                            />
                        </Col>

        <Icon  type="minus-circle" className="delBtn" onClick={this.showModal1.bind(this)} 
         style={this.props.num1.length>1?this.state.disBlock:this.state.disNone}
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
</div>);
        return (
            <div className="rightBox">

            {list}
             {modal} 
            </div>
        )
    }
}

export default CreateTopic;