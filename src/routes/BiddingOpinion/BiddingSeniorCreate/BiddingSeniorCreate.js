import React from 'react';
import {Input, Modal, Icon, Form, message} from 'antd';
import './BiddingSeniorCreate.less';
const FormItem = Form.Item
// import {api_topic_ruleid,api_clf_ruleid} from '../../services/api';
// import request from '../../utils/request';
// import ModalCreateTopic from './../ModalCreateTopic/ModalCreateTopic';
class BiddingSeniorCreate extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            visible: false,
            visible1: false,
            InputValue: 1,
            editindex: 0,
            disBlock: {visibility: 'visible'},
            disNone: {visibility: 'hidden'}
        }
    }
    showModal(e) {
        // console.log(e.target.getAttribute('data-index'))
        this.setState({
            visible: true,
            InputValue: this.props.num3[e.target.getAttribute('data-index')].rule,
            editindex: e.target.getAttribute('data-index')
        })
    }
    handleOk() {
        if(this.state.InputValue.trim() === '') {
            message.error('请输入关键词!')
            return
        }
        this.props.onroleChange(this.state.InputValue, this.state.editindex)
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        }) 
    }
    OnChange(e) {
        this.setState({
            InputValue: e.target.value
        })
    }
    showModal1(e) {
        this.setState({
            visible1: true,
            editindex: e.target.getAttribute('data-index')
        })
    }
    handleOk1() {
        this.props.ondelrole(this.state.editindex)
        this.setState({
            visible1: false
        })
    }
    handleCancel1() {
        this.setState({
            visible1: false
        }) 
    }
    render() {
        const list=this.props.num3.map((item,index)=><div key={index} className="mate-key">  <div>
           <Input type="textarea" className="bigInput" value={item.rule}  onClick={this.showModal.bind(this)} style={{width:'300px',height:'142px'}}
                data-index={index}
            />
        <Icon  type="minus-circle" className="seniorDelBtn"  data-index={index} onClick={this.showModal1.bind(this)} 
         style={this.props.num3.length>1?this.state.disBlock:this.state.disNone}
         />
        <Modal
          title="设置关键词组"
          visible={this.state.visible1}
          onOk={this.handleOk1.bind(this)}
          onCancel={this.handleCancel1.bind(this)}
        >
          <p className="textCenter">确定要删除这个关键词组吗?</p>

        </Modal>
        <Modal
          title="设置关键词"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
        <Form layout="vertical">            
                <FormItem>
                    <Input type="textarea" 
                     style={{height:'60px'}}
                     onChange={this.OnChange.bind(this)}
                     value={this.state.InputValue}
                     maxLength={'500'}
                    />
                </FormItem>
        </Form>
        </Modal>
                </div>
      </div>);

        return (
            <div>
            {list}
            </div>
        )
    }
}
export default BiddingSeniorCreate;