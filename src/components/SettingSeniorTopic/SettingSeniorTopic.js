import React from 'react';
import {Input, Modal, message, Icon} from 'antd';
import Store from '../../redux/store/index';
import './SettingSeniorTopic.less';
import {api_topic_ruleid,api_clf_ruleid} from '../../services/api';
import request from '../../utils/request';
import ModalCreateTopic from './../ModalCreateTopic/ModalCreateTopic';
class SettingSeniorTopic extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            visible: false,
            visible1: false,
            objectValue: [],
            objectValueInput:[],
            disBlock: {visibility: 'visible'},
            disNone: {visibility: 'hidden'},
            texts:[],
            box:0,
            topicRulearr:Store.getState().getTopicLocationSucceededReducer.res.rulearr,
            index:[],
            ruleId:-1,
            inputIndex:0,
            propsData:Store.getState().getTopicLocationSucceededReducer.res.rulearr
        }
    }
    componentDidMount(){   
        let topicAlldatas=Store.getState().getTopicLocationSucceededReducer.res;
        if(topicAlldatas.rulearr){
             this.setState({
                topicRulearr:topicAlldatas.rulearr
             })
        }
    }
    
    componentDidUpdate(prevProps,prevState){
          if(prevState.objectValueInput!==this.state.objectValueInput){
          this.props.onInputConent(this.state.objectValueInput)
        }
    }
    onModelCancel(state) {
        this.setState({
            visible: state 
        })
    }
    onModelOk(state,data) { 
        let num=this.state.inputIndex;            
        let propsdata=this.props.num3;
        let ruleId=this.props.ruleId[num]!==undefined?this.props.ruleId[num]:propsdata[num]['id'];
        propsdata[num]['rule']=data;      
        propsdata[num]['id']=ruleId;      
        let objectValueInput=this.state.objectValueInput.length!==0?this.state.objectValueInput:this.props.num3[num]['rule'];
        if(objectValueInput === "") {
            message.warning('主题词不能为空！');
            return;
        }
        this.setState((prevState,props)=>({
            visible: state,
            objectValue:this.state.objectValue.concat(objectValueInput),
            objectValueInput:propsdata
        }))
    }
    showModal(e) {
        let inputIndex=parseInt(e.target.dataset.index,10); 
        this.setState({
            visible: true,
            inputIndex:inputIndex
            // propsData:e.target.value
        })
    }
    showModal1 (index,e){
        let number = 0;
        if(this.props.num3[index]['rule'] === ''){
    
        }else{
                this.props.num3.forEach( item => {
                        if(item.rule !== ''){
                            ++number;
                        } 
                })
                if(number<2 ){
                    message.error('当前只有一组关键词，不可删除');
                    return;
                }
        }
    this.setState({
      visible1: true,
      index:parseInt(e.target.dataset.index,10),
      inputIndex:this.state.inputIndex
    });
    if(this.props.type!=='sort'){
        request(api_topic_ruleid,{
            method:'POST',
            headers: {
               "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`ruleid=${e.target.dataset.delid}`
        })
    }else {
        request(api_clf_ruleid,{
            method:'POST',
            headers: {
               "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`ruleid=${e.target.dataset.delid}`
        })
    }

  }
  handleOk1 = (e) => {
    let objectValueInput=this.props.num3;
    objectValueInput.splice(this.state.index,1);
    this.setState({
                    visible1: false,
                    objectValueInput:objectValueInput,
                    inputIndex:0
    });
    this.props.onDelwayRule(this.state.index)
    this.props.onInputConent(objectValueInput)    
  }
  handleCancel1 = (e) => {
    this.setState({
      visible1: false,
    });
  }

 
    render() {             
        const list=this.props.num3.map((item,index)=><div key={index} className="mate-key">  <div>
           <Input type="textarea" className="bigInput" onClick={this.showModal.bind(this)} value={
                this.state.objectValueInput[index]!==undefined?this.state.objectValueInput[index]['rule']
                :item['rule']}  style={{width:'300px',height:'142px'}}
                data-index={index}
                />
        <Icon  type="minus-circle" className="seniorDelBtn" onClick={this.showModal1.bind(this,index)} 
         style={this.props.num3.length>1?this.state.disBlock:this.state.disNone}
         data-delid={item.id}
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
      </div>);

        return (
            <div>
            {list}
            <ModalCreateTopic visible={this.state.visible}
             onModelOk={this.onModelOk.bind(this)}
             onModelCancel={this.onModelCancel.bind(this)}
             propsData={this.props.num3}
             inputIndex={this.state.inputIndex}
           />
            </div>
        )
    }
}
export default SettingSeniorTopic;