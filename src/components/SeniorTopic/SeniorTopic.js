import React from 'react';
import {Input, Modal, Form, message, Icon} from 'antd';
import './SeniorTopic.less';

const FormItem = Form.Item;


class SeniorTopic extends React.Component {
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
            disBlock: {visibility: 'visible'},
            disNone: {visibility: 'hidden'},
            texts:[],
            box:0,
            index:[]
        }
    }


    onModelCancel() {
        this.setState({
            visible: false
        })
    }
    onModelOk(e) {
        if(this.state.objectValueInput === "") {
            message.warning('主题词不能为空！');
            return;
        }
        this.setState((prevState,props)=>({
            visible: false,
            objectValue:prevState.objectValue.concat(this.state.objectValueInput),
            objectValueInput: '',
            subject1ValueInput: '',
            subject2ValueInput: '',
            filterValueInput: ''
        }),()=>{ 
        	
        })
        this.props.onModelOkTwo(this.state.objectValueInput)
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
    onchangeBackground(index,e){
	e.target.style.cssText='background: #008CEE;color:#FFFFFF';
    	 
    }
      showModal1 = (e) => {
    this.setState({
      visible1: true,
      index:this.state.index.concat(parseInt(e.target.dataset.index,10))
    });
  }
  handleOk1 = (e) => {
    this.props.num3.splice(this.props.num3.length-1,1);
    this.setState({
                    visible1: false
    });  
    this.props.onDelwayRule(this.state.index)  
  }
  handleCancel1 = (e) => {
    this.setState({
      visible1: false,
    });
  }

    render() {
        const list=this.props.num3.map((item,index)=><div key={index} className="mate-key">  <div>
           <Input type="textarea" className="bigInput" onClick={this.showModal.bind(this)} value={this.state.objectValue[index]}  style={{width:'300px',height:'142px'}}/>
           <Icon  type="minus-circle" className="delBtn" onClick={this.showModal1}  
           style={this.props.num3.length>1?this.state.disBlock:this.state.disNone}
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
                </div>
                <Modal
                    visible={this.state.visible}
                    title="设置关键词"
                    okText="保存"
                    onCancel={this.onModelCancel.bind(this)}
                    onOk={this.onModelOk.bind(this)}
                >  
                    <Form layout="vertical">
                    
                        <FormItem>
                            <Input type="textarea" placeholder="主题词不能为空！"
                            onChange={this.onChangeObject.bind(this)}
                             style={{height:'60px'}}
                            />
                        </FormItem>
                    </Form>
                </Modal></div>);

        return (
            <div>
            {list}
            </div>
        )
    }
}
export default SeniorTopic;