import React from 'react';
import {Input, Modal, Icon, Form, message, Button} from 'antd';
import './newSeniorCreate.less';
import {connect} from 'react-redux';
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
            disNone: {visibility: 'hidden'},
            lang: 0,
            confirm: ['确认', '확인', '確認', 'بېكىتىش ', 'ཁས་ལེན་གསལ་ཐག་ཆོད་པ་', 'confirm'],
            cancel: ['取消', '취소', 'キャンセル', 'ئەمەلدىن قالدۇرماق ', 'མི་དགོས་པར་བཟོ་བ་', 'cancel'],
            keywords: ['设置关键词', '설치 키워드', 'キーワードを設ける', 'ئاچقۇچلۇق سۆز تەسىس قىلىش', 'གནད་ཚིག་ཁོངས་སུ་།', 'Set keywords'],
            delKeyWord: ['确定要删除这个关键词组吗?', '이 키워드 그룹을 삭제 하시겠습니까?', 'このキーワードグループを削除してもよろしいですか？', 'ئۆچۈرەمسىز بۇ ئاچقۇچلۇق سۆز بىرىكمىسى بارمۇ ؟', 'གནད་ཚིག་དེ་བསུབ་རོགས་། གཏན་འཁེལ་ཚོགས་ཆུང་ཡོད་དམ་།', 'Are you sure you want to delete this keyword group?'],
            enterKeyWords: ['请输入关键词', '입력 하세요 키워드', 'キーワードを入力してください', 'ئاچقۇچلۇق سۆزنى كىرگۈزۈڭ', 'རོགས་གནད་ཚིག་ནང་འཇུག་།', 'Please enter key words']
        }
    }
    componentWillReceiveProps(nextprops) {
        if(nextprops.type === 'mul'){
            // console.log(this.props.languages)
            this.setState({
                lang: nextprops.languages
            })
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
            message.error(this.state.enterKeyWords[this.state.lang])
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
        const modalFooter = (handleCancel, handleOk, _this) => {
            return (<div><Button size="large" onClick={handleCancel.bind(_this)}>{this.state.cancel[this.state.lang]}</Button><Button type="primary" size="large" onClick={handleOk.bind(_this)}>{this.state.confirm[this.state.lang]}</Button></div>)
        }
        const list=this.props.num3.map((item,index)=><div key={index} className="mate-key">  <div>
           <Input type="textarea" className="bigInput" value={item.rule}  onClick={this.showModal.bind(this)} style={{width:'300px',height:'142px'}}
                data-index={index}
            />
        <Icon  type="minus-circle" className="seniorDelBtn"  data-index={index} onClick={this.showModal1.bind(this)} 
         style={this.props.num3.length>1?this.state.disBlock:this.state.disNone}
         />
        <Modal
          title={this.state.keywords[this.state.lang]}
          visible={this.state.visible1}
          onOk={this.handleOk1.bind(this)}
          onCancel={this.handleCancel1.bind(this)}
          footer={modalFooter(this.handleCancel1, this.handleOk1, this)}
        >
          <p className="textCenter">{this.state.delKeyWord[this.state.delKeyWord[this.state.lang]]}</p>

        </Modal>
        <Modal
          title={this.state.keywords[this.state.lang]}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          footer={modalFooter(this.handleCancel, this.handleOk, this)}
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
const mapStateToProps = state => {
    return {
        languages: state.mulLanToggleReducer
    }
};

export default connect(mapStateToProps)(BiddingSeniorCreate)