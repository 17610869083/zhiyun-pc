import React from 'react';
import './ExcludeSetting.less';
import {Tabs,Col,Row,Button,Tooltip,Icon} from 'antd';
import SystemTopic from '../../../components/SystemTopic/SystemTopic';
import {exclude_discontinuation} from '../../../services/api';
import request from '../../../utils/request';
const TabPane = Tabs.TabPane;
class ExcludeSetting extends React.Component{
       constructor(){
           super()
           this.state={
               allKeywords:[{"rule1":"","rule2":"","rule3":"","rule4":"","id":"","scope":""}],
               negativeExclusion:[{"rule1":"","rule2":"","rule3":"","rule4":"","id":"","scope":""}],
               negativeDiscontinuation:[{"rule1":"","rule2":"","rule3":"","rule4":"","id":"","scope":""}],
               waring:[{"rule1":"","rule2":"","rule3":"","rule4":"","id":"","scope":""}],
               type:'2000',
               saveMessage:'1',
               delMessage:'1'
           }
      }
      componentDidMount(){
        request(exclude_discontinuation,{
          method:'POST',
          headers: {
             "Content-Type": "application/x-www-form-urlencoded"
          },
          body:`type=2000`
        }).then(res=>{
              if(res.data.show2000List){
                   this.setState({
                     allKeywords:res.data.show2000List
                   })
              }
        })
      }
      tabsChange(key){
            this.setState({
                  type:key
            })
            if(key==='2020'){
                  request(exclude_discontinuation,{
                    method:'POST',
                    headers: {
                       "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:`type=2020`
                  }).then(res=>{
                       if(res.data.show2020List){
                            this.setState({
                              negativeExclusion:res.data.show2020List,

                            })
                       }
                  })
            }else if(key==='1020'){
              request(exclude_discontinuation,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`type=1020`
              }).then(res=>{
                   if(res.data.show1020List){
                        this.setState({
                          negativeDiscontinuation:res.data.show1020List,
                        })
                   }
              })
            }else if (key === '3020'){
              request(exclude_discontinuation,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`type=3020`
              }).then(res=>{
                   if(res.data.show3020List){
                        this.setState({
                          waring:res.data.show3020List,
                        })
                   }
              })
            }

      }
      componentDidUpdate(prevProps,prevState){
        if(prevState.delMessage!==this.state.delMessage){
            request(exclude_discontinuation,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`type=2000`
            }).then(res=>{
                if(res.data.show2000List){
                       this.setState({
                           allKeywords:res.data.show2000List,
                       })
                }

                request(exclude_discontinuation,{
                  method:'POST',
                  headers: {
                     "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body:`type=2020`
              }).then(res=>{
                  if(res.data.show2020List){
                         this.setState({
                          negativeExclusion:res.data.show2020List
                         })
                  }

                  request(exclude_discontinuation,{
                    method:'POST',
                    headers: {
                       "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:`type=1020`
                }).then(res=>{
                    if(res.data.show1020List){
                           this.setState({
                            negativeDiscontinuation:res.data.show1020List
                           })
                    }
                    request(exclude_discontinuation,{
                      method:'POST',
                      headers: {
                         "Content-Type": "application/x-www-form-urlencoded"
                      },
                      body:`type=3020`
                  }).then(res=>{
                      if(res.data.show3020List){
                             this.setState({
                              waring:res.data.show3020List
                             })
                      }
                    })
                })
              })
        })

        }else if(prevState.saveMessage!==this.state.saveMessage){
            request(exclude_discontinuation,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`type=2000`
            }).then(res=>{
                if(res.data.show2000List){
                       this.setState({
                        allKeywords:res.data.show2000List
                       })
                }
                request(exclude_discontinuation,{
                  method:'POST',
                  headers: {
                     "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body:`type=2020`
              }).then(res=>{
                  if(res.data.show2020List){
                         this.setState({
                          negativeExclusion:res.data.show2020List
                         })
                  }

                  request(exclude_discontinuation,{
                    method:'POST',
                    headers: {
                       "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:`type=1020`
                }).then(res=>{
                    if(res.data.show1020List){
                           this.setState({
                            negativeDiscontinuation:res.data.show1020List
                           })
                    }
                  request(exclude_discontinuation,{
                    method:'POST',
                    headers: {
                       "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:`type=3020`
                }).then(res=>{
                    if(res.data.show3020List){
                           this.setState({
                            waring:res.data.show3020List
                           })
                    }
                  })
              })
          })
        })
        }
       }

      saveMessage(data){
           this.setState({
               saveMessage:data
           })
      }
      addRule(type){
        this.setState({
           [type]:this.state[type].concat({"rule1":"","id":"","rule2":"","rule3":"","rule4":"","scope":""})
        })
          // this.setState({
          //   negativeExclusion:this.state.negativeExclusion.concat({"rule1":"","id":"","rule2":"","rule3":"","rule4":"","scope":""}),
          //   allKeywords:this.state.allKeywords.concat({"rule1":"","id":"","rule2":"","rule3":"","rule4":"","scope":""}),
          //   negativeDiscontinuation:this.state.negativeDiscontinuation.concat({"rule1":"","id":"","rule2":"","rule3":"","rule4":"","scope":""}),
          //   waring:this.state.waring.concat({"rule1":"","id":"","rule2":"","rule3":"","rule4":"","scope":""}),
          // })
      }
      onDelwayRule(data){
             this.setState({
                   delMessage:data
             })
      }
      onCreateTopic(){
        
      }
      render(){
           return (
               <div className="excludeBox">
                   <Tabs defaultActiveKey="2000" onChange={this.tabsChange.bind(this)}>
                   <TabPane tab="全局排除" key="2000" style={{marginLeft:'3%'}}>
                   <p><i className="fa fa-bell" aria-hidden="true" style={{marginRight:'5px'}}></i>全局排除条件
                   <Tooltip placement="bottom" title='全局排除：系统全局排除满足关键词规则的数据，即相关数据不会进入到系统。(适用于排除广告和垃圾数据)'>
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
                          mode='excludeSetting'
                       />
                     </Col>
                     </div>
                     </Row>
                     <Button type="primary" style={{marginLeft:'131px',marginTop:'30px'}}
                     onClick={this.addRule.bind(this,'allKeywords')}
                     >+添加规则</Button>
                   </TabPane>
                   <TabPane tab="负面排除" key="2020">
                   <p><i className="fa fa-bell" aria-hidden="true" style={{marginRight:'5px'}}></i>负面排除条件
                   <Tooltip placement="bottom" title='负面排除：满足关键词规则的数据，在倾向性判断时不会判断为负面。(适用于纠正误判的负面信息)'>
                   <Icon type="question-circle" className="iconMessage"></Icon>
                   </Tooltip>
                   </p>
                     <Row>
                     <div className="mediaType" >

                     <span style={{marginRight:'29px',float:'left'}}>关键词组合</span>
                     <Col span={14}>
                     <SystemTopic num1={this.state.negativeExclusion} name="email"
                          onDelwayRule={this.onDelwayRule.bind(this)}
                          onCreateTopic={this.onCreateTopic.bind(this)}
                          type={this.state.type}
                          saveMessage={this.saveMessage.bind(this)}
                          mode='excludeSetting'
                     />
                     </Col>
                     </div>
                     </Row>
                     <Button type="primary" style={{marginLeft:'131px'}}
                     onClick={this.addRule.bind(this,'negativeExclusion')}
                     >+添加规则</Button>
                   </TabPane>

                   <TabPane tab="负面停用" key="1020">
                   <p><i className="fa fa-bell" aria-hidden="true" style={{marginRight:'5px'}}></i>负面停用条件
                   <Tooltip placement="bottom" title='负面停用：在进行负面判断时，会忽略信息中与“负面停用”匹配的关键词。'>
                   <Icon type="question-circle" className="iconMessage"></Icon>
                   </Tooltip>
                   </p>

                     <Row>
                     <div className="mediaType" >

                     <span style={{marginRight:'29px',float:'left'}}>关键词组合</span>
                     <Col span={14}>
                     <SystemTopic num1={this.state.negativeDiscontinuation} name="email"
                           onDelwayRule={this.onDelwayRule.bind(this)}
                           onCreateTopic={this.onCreateTopic.bind(this)}
                           type={this.state.type}
                           saveMessage={this.saveMessage.bind(this)}
                           mode='excludeSetting'
                     />
                     </Col>
                     </div>
                     </Row>
                     <Button type="primary" style={{marginLeft:'131px'}}
                     onClick={this.addRule.bind(this,'negativeDiscontinuation')}
                     >+添加规则</Button>
                   </TabPane>

                   <TabPane tab="预警排除" key="3020">
                   <p><i className="fa fa-bell" aria-hidden="true" style={{marginRight:'5px'}}></i>预警排除条件
                   <Tooltip placement="bottom" title='预警排除：在进行预警判断时，会忽略信息中与“预警排除”匹配的关键词。'>
                   <Icon type="question-circle" className="iconMessage"></Icon>
                   </Tooltip>
                   </p>

                     <Row>
                     <div className="mediaType" >
                     <span style={{marginRight:'29px',float:'left'}}>关键词组合</span>
                     <Col span={14}>
                     <SystemTopic num1={this.state.waring} name="email"
                           onDelwayRule={this.onDelwayRule.bind(this)}
                           onCreateTopic={this.onCreateTopic.bind(this)}
                           type={this.state.type}
                           saveMessage={this.saveMessage.bind(this)}
                           mode='excludeSetting'
                     />
                     </Col>
                     </div>
                     </Row>
                     <Button type="primary" style={{marginLeft:'131px'}}
                     onClick={this.addRule.bind(this,'waring')}
                     >+添加规则</Button>
                   </TabPane>
                   </Tabs>
               </div>
           )
      }
}
export default ExcludeSetting;
