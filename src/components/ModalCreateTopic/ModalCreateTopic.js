import React from 'react';
import {Modal,Form,Input,message} from 'antd';
const FormItem = Form.Item;
class ModalCreateTopic extends React.Component{
     constructor(prop) {
        super(prop);
        this.state={
            visible:true,
            InputValue:1
        }
    }
    onModelCancel(){
        this.props.onModelCancel(false)  
    }
    onModelOk(){
        this.props.onModelOk(false,this.state.InputValue);
        this.setState({
            InputValue:''
        })
    }
    OnChange(e){
          const {value} =e.target;
          if(/~|!|@|#|\$|\^|&|=|\?|~|@|#|￥|……|-|\(|\)|（|）|\{|\}|\[|\]/.test(value)){ 
              message.warning('请不要带有特殊字符');
          }
          this.setState({
              InputValue:value 
          })
    }
    render(){
          return(
            <Modal
            visible={this.props.visible}
            title="设置关键词"
            okText="保存"
            onCancel={this.onModelCancel.bind(this)}
            onOk={this.onModelOk.bind(this)}          
        >  
            <Form layout="vertical">            
                <FormItem>
                    <Input type="textarea" 
                     style={{height:'60px'}}
                     onChange={this.OnChange.bind(this)}
                     value={this.state.InputValue!==1?this.state.InputValue:
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