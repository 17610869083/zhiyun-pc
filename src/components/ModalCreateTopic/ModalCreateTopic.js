import React from 'react';
import {Modal,Form,Input,message} from 'antd';
const FormItem = Form.Item;
class ModalCreateTopic extends React.Component{
     constructor(prop) {
        super(prop);
        this.state={
            visible:true,
            InputValue:'',
            flag:false
        }
    }
    onModelCancel(){
        this.props.onModelCancel(false)  
        this.setState({
            flag:false
        })
    }
    onModelOk(){
        let InputValue = this.state.flag?this.state.InputValue:this.props.propsData[this.props.inputIndex]['rule'];
        if(InputValue.trim() === ''){
            message.error('关键词不可为空');
            return;
        }
        this.props.onModelOk(false,InputValue);
        this.setState({
            flag:false
        })
    }
    OnChange(e){
          const {value} =e.target;
          if(/~|!|@|#|\$|\^|&|=|\?|~|@|#|￥|……|-|（|）|\{|\}|\[|\]/.test(value)){ 
              message.warning('请不要带有特殊字符');
          }
          this.setState({
              InputValue:value ,
              flag:true
          })
    }
    render(){
          return(
            <Modal
            visible={this.props.visible}
            title="设置关键词"
            okText="确定"
            onCancel={this.onModelCancel.bind(this)}
            onOk={this.onModelOk.bind(this)}  
            className="report-modal"        
        >  
            <Form layout="vertical">            
                <FormItem>
                    <Input type="textarea" 
                     style={{height:'60px'}}
                     onChange={this.OnChange.bind(this)}
                     value={this.state.flag?this.state.InputValue:
                     this.props.propsData[this.props.inputIndex]['rule']}
                     maxLength={'500'}
                    />
                </FormItem>
            </Form>
        </Modal>
          )
    }
}
export default ModalCreateTopic;