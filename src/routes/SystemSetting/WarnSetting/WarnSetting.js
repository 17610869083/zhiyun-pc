import React from 'react';
import './WarnSetting.less';
import {Tabs,Col,Row,Button,Tooltip,Icon} from 'antd';
import SystemTopic from '../../../components/SystemTopic/SystemTopic';
import {system_warning_setting} from '../../../services/api';
import request from '../../../utils/request';
const TabPane = Tabs.TabPane;
class WarnSetting extends React.Component{
       constructor(){
           super()
           this.state={
               allKeywords:[{"rule1":"","rule2":"","rule3":"","rule4":"","id":"","scope":""}],
               type:'602',
               delMessage:'1',
               saveMessage:'1',
               negative:[{"rule1":"","rule2":"","rule3":"","rule4":"","id":"","scope":""}]
           }
       }
       componentDidMount(){
              request(system_warning_setting,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`type=602`
              }).then(res=>{
                     if(res.data.show602List){
                            this.setState({
                                allKeywords:res.data.show602List
                            })
                     }                   
              })
       }
       componentDidUpdate(prevProps,prevState){
        if(prevState.delMessage!==this.state.delMessage){
            request(system_warning_setting,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`type=602`
            }).then(res=>{
                if(res.data.show602List){
                       this.setState({
                           allKeywords:res.data.show602List
                       })
                }                   
            })
            request(system_warning_setting,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`type=601`
            }).then(res=>{
                if(res.data.show601List){
                       this.setState({
                           negative:res.data.show601List
                       })
                }                   
            })
        }else if(prevState.saveMessage!==this.state.saveMessage){
            request(system_warning_setting,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`type=602`
            }).then(res=>{
                if(res.data.show602List){
                       this.setState({
                           allKeywords:res.data.show602List
                       })
                }                   
            })
            request(system_warning_setting,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`type=601`
            }).then(res=>{
                if(res.data.show601List){
                       this.setState({
                           negative:res.data.show601List
                       })
                }                   
            })
        }
       }
      tabsChange(key){
          this.setState({
                type:key
          })
          if(key==='601')
          request(system_warning_setting,{
            method:'POST',
            headers: {
               "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`type=601`
          }).then(res=>{       
                if(res.data.show601List){
                    this.setState({
                        negative:res.data.show601List
                    })
            }                   
         })

         } 
      onChange(){

      }   
      onDel(){

      }
      showModal(){
           
      }
      addRule(){
          this.setState({
            negative:this.state.negative.concat({"rule1":"","id":"","rule2":"","rule3":"","rule4":"","scope":""}),
            allKeywords:this.state.allKeywords.concat({"rule1":"","id":"","rule2":"","rule3":"","rule4":"","scope":""})
          })
      }

      onModelOk(){
      }
      onDelwayRule(data){
              this.setState({
                    delMessage:data
              })
      }

      //保存信息
      saveMessage(data){
           this.setState({
            saveMessage:data
           })
      }
      onCreateTopic(){

      }


      render(){
           return (
               <div className="warnBox">                   
                   <Tabs activeKey={this.state.type} onChange={this.tabsChange.bind(this)}>
                   <TabPane tab="预警设置" key="602" style={{marginLeft:'3%'}}>
                   <p><i className="fa fa-bell" aria-hidden="true" style={{marginRight:'5px'}}></i>预警条件
                   <Tooltip placement="bottom" title='预警设置：满足预警条件的数据会被认为是预警信息。'>
                   <Icon type="question-circle" className="iconMessage"></Icon>
                   </Tooltip>
                   </p>
                    
                     <Row>
                     <div className="mediaType" >
                     <span style={{marginRight:'29px',float:'left'}}>关键词组合</span>
                     <Col span={14}>
                     <SystemTopic num1={this.state.allKeywords} name="email" 
                            onDelwayRule={this.onDelwayRule.bind(this)}
                            onCreateTopic={this.onCreateTopic.bind(this)}
                            type={this.state.type}
                            saveMessage={this.saveMessage.bind(this)}
                            model='warnSetting'
                     /> 
                     </Col>
                     </div>
                     </Row>
                     <Button type="primary" style={{marginLeft:'131px',marginTop:'30px'}}
                     onClick={this.addRule.bind(this)}
                     >+添加规则</Button>
                   </TabPane>
                   {/* <TabPane tab="负面设置" key="601">
                   <p><i className="fa fa-bell" aria-hidden="true" style={{marginRight:'5px'}}></i>
                   负面条件
                   <Tooltip placement="bottom" title='负面设置：自定义负面数据匹配规则，满足条件的数据会被认为是负面信息。(适用于针对自己的行业和环境需求自定义负面词汇)'>
                   <Icon type="question-circle" className="iconMessage"></Icon>
                   </Tooltip>
                   </p>
                     <Row>
                     <div className="mediaType" >
                     
                     <span style={{marginRight:'29px',float:'left'}}>关键词组合</span>
                     <Col span={14}>
                     <SystemTopic num1={this.state.negative} name="email" 
                            onDelwayRule={this.onDelwayRule.bind(this)}
                            onCreateTopic={this.onCreateTopic.bind(this)}
                            type={this.state.type}
                            saveMessage={this.saveMessage.bind(this)}
                            model='warnSetting'
                     /> 
                     </Col>
                     </div>
                     </Row>
                     <Button type="primary" style={{marginLeft:'131px'}}
                     onClick={this.addRule.bind(this)}
                     >+添加规则</Button>                    
                   </TabPane> */}
                   </Tabs>
               </div>
           )
      } 
}
export default WarnSetting;