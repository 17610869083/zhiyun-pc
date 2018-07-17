import React from 'react';
import {Input, Modal, Form, message, Row, Col, Icon,Tooltip, Button} from 'antd';
import './BiddingCreate.less';
const FormItem = Form.Item;
class BiddingCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            visible1: false,
            prevhash: '',
            num1: [],
            disBlock: {visibility: 'visible',color:'#ff0000'},
            disNone: {visibility: 'hidden',color:'#ff0000'},
            editRoleId: 0,
            editInput: [],
            modalinput: {},
            delIndex: 0
        }
    }
    componentWillReceiveProps(nextprops) {
        // console.log(nextprops, this.props)
        // if(this.state.prevhash !== window.location.hash) {
        //     console.log(nextprops.num1)
        //     this.setState({
        //         num1: JSON.parse(nextprops.num1)
        //     }, () =>{console.log(this.state.num1)})
            
        // }
        // console.log(this.state.num1)
        let jsoNextprops = JSON.stringify(nextprops.num1)
        let jsonProps = JSON.stringify(this.props.num1)
        if(!jsonProps !== jsoNextprops && window.location.hash.split('&')[0] !== '#/bidding/setting?type=add' && this.state.num1.length <= 0) {
            this.setState({
                num1: JSON.parse(nextprops.num1)
            })
        }
        if(this.state.prevhash !== window.location.hash && window.location.hash.split('&')[0] === '#/bidding/setting?type=add') {
            this.setState({
                num1: [{rule1: '', rule2: '', rule3: '', rule4: ''}]
            })
        }
        this.setState({
            prevhash: window.location.hash
        })
    }
    showModal(index) {
        this.state.modalinput.rule1 = this.state.num1[index].rule1
        this.state.modalinput.rule2 = this.state.num1[index].rule2
        this.state.modalinput.rule3 = this.state.num1[index].rule3
        this.state.modalinput.rule4 = this.state.num1[index].rule4
        this.setState({
            editRoleId: index,
            visible: true
        })
    }
    onModelCancel() {
        // console.log(this.state.modalinput)
        // Object.keys(this.state.num1[this.state.editRoleId]).forEach((k) => {
        //     // console.log()
        //     this.state.num1[this.state.editRoleId][k] = this.props.num1[this.state.editRoleId][k]
        // })
        this.setState({
            visible: false,
            modalinput: []
        })
    }
    onModelOk() {
        // console.log(this.state.num1)
        // console.log(this.state.modalinput)
        // console.log(this.state.editRoleId)
        this.state.num1[this.state.editRoleId]['rule1'] = this.state.modalinput['rule1']
        this.state.num1[this.state.editRoleId]['rule2'] = this.state.modalinput['rule2']
        this.state.num1[this.state.editRoleId]['rule3'] = this.state.modalinput['rule3']
        this.state.num1[this.state.editRoleId]['rule4'] = this.state.modalinput['rule4']
        this.setState({
            visible: false
        })
        this.props.onEditRole(this.state.num1)

    }
    addRole() {
        let newRole = [{
            "rule1":"",
            "rulecode1":"",
            "id":"",
            "rule2":"",
            "rulecode2":"",
            "rule3":"",
            "rulecode3":"",
            "rule4":"",
            "rulecode4":""
        }]
        this.setState({
            num1: this.state.num1.concat(newRole)
        }, () => {this.props.onAddRole(this.state.num1)})
    }
    delOneRole(e) {
        this.setState({
            visible1:true,
            delIndex: e.target.getAttribute('data-index')
        })
    }
    handleOk1() {
        let index = this.state.delIndex;
        let delrole = this.state.num1.splice(index,1)
        this.setState({
            num1: this.state.num1,
            editRoleId: 0,
            visible1: false
        },() => {this.props.onDelRow(delrole)})
    }
    handleCancel1() {
        this.setState({
            visible1: false,
            delIndex: 0
        })
    }
    clear(rulenum, index) {
        this.state.num1[index][rulenum] = ''
        this.setState({}, () => {this.props.onDelOne(this.state.num1)})
    }
    onChangeInput(rulenum, e) {
        let value = e.target.value
        let newValue
        let reg = /~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\./g
        if(reg.test(value)){
            newValue  = value.replace(reg,'')
            message.warning('请不要带有特殊字符');
        }
        this.state.modalinput[rulenum] = newValue
        this.setState({})
        // let newnum =
        // this.state.editInput.indexOf(rulenum) === -1 ? this.state.editInput.push(rulenum) : this.state.editInput
        //  this.state.num1[this.state.editRoleId][rulenum] = e.target.value
        // console.log(newnum)
        // this.setState({
        //     num1:this.state.num1
        // })
        // console.log(e.target.value)
    }
    
    render() {
        // let inputIndex=this.state.inputIndex<0?0:this.state.inputIndex;
        const suffix = (rulenum, index) => {
            return <span className="del" onClick={this.clear.bind(this, rulenum, index)}><Icon type="close"/></span>;
        }
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
            {/* {console.log(this.state.editRoleId, this.state.num1)} */}
                <Input type="textarea"
                       onChange={this.onChangeInput.bind(this, 'rule1')}
                       maxLength={'50'}
                       value={this.state.modalinput.rule1}
                       />
            </FormItem>
            <FormItem label={subject1ValueTip}>
                <Input type="textarea"
                       onChange={this.onChangeInput.bind(this, 'rule2')}
                       maxLength={'500'}
                       value={this.state.modalinput.rule2}
                />
            </FormItem>
            <FormItem label={subject2ValueTip}>
                <Input type="textarea"
                       onChange={this.onChangeInput.bind(this, 'rule3')} 
                       maxLength={'500'}
                       value={this.state.modalinput.rule3}
                />
            </FormItem>
            <FormItem label={filterValueTip}>
                <Input type="textarea"
                       onChange={this.onChangeInput.bind(this, 'rule4')}
                       maxLength={'50'}
                       value={this.state.modalinput.rule4}
                />
            </FormItem>
        </Form>
        <Tooltip placement="bottom" title={title}>
        <Icon type="question-circle" style={{color:'#000000'}}></Icon>
        </Tooltip>
    </Modal></div> ;
        const list=this.state.num1.map((item,index)=>
        <div key={index} className="mate-key"><div>
                    <Row>
                        <Col span={4}>
                            <Input
                                placeholder="主题词"
                                readOnly
                                onClick={this.showModal.bind(this,index)}
                                // suffix={suffix}
                                value={item.rule1}
                            />  
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <span className="bigFont">*</span>
                        </Col>
                        <Col span={4}>
                            <Input placeholder="关联词1"
                                   readOnly
                                   onClick={this.showModal.bind(this,index)}
                                   suffix={suffix('rule2', index)}
                                   value={item.rule2}
                               
                            />
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <span className="bigFont">*</span>
                        </Col>
                        <Col span={4}>
                            <Input placeholder="关联词2"
                                   readOnly
                                   onClick={this.showModal.bind(this,index)}
                                   suffix={suffix('rule3', index)}
                                   value={item.rule3}
                                   />
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <Icon type="minus"/>
                        </Col>
                        <Col span={4}>
                            <Input placeholder="排除词"
                                   readOnly
                                   onClick={this.showModal.bind(this,index)}
                                   suffix={suffix('rule4', index)}
                                   value={item.rule4}
                            />
                        </Col>

        <Icon  type="minus-circle" className="delBtn" onClick={this.delOneRole.bind(this)}
         style={this.state.num1.length>1?this.state.disBlock:this.state.disNone}
        //  data-delid={item.id}
         data-index={index}
         />
        <Modal
          title="设置关键词组"
          visible={this.state.visible1}
          onOk={this.handleOk1.bind(this)}
          onCancel={this.handleCancel1.bind(this)}
        >
          <p className="textCenter">确定要删除这个关键词组吗?</p>

        </Modal></Row>
                </div></div>);
        return (
            <div className="rightBox">

            {list}
            {modal}
            <Button type="primary" size="small" onClick={this.addRole.bind(this)}>+ 添加规则</Button>
            </div>
        )
    }
}

export default BiddingCreate;
