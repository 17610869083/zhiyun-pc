import React from 'react';
import {Button,Row,Col,Checkbox,Input,Icon,TimePicker,Cascader,Radio,Form,message} from 'antd';
import {user_message,save_mail_Config,del_email_Config,api_update_eamil_push_state} from '../../../services/api';
import request from '../../../utils/request';
import './NoticeSetting.less';
import moment from 'moment';
const format = 'HH:mm';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
class NoticeSetting extends React.Component{
       constructor(){
            super()
            this.state={
                addInput:[''],
                valueInput:[''],
                styleBtn:1,
                timeBtn:1,
                disBlock: {visibility: 'visible',color:'#ff0000',marginTop:'7px'},
                disNone: {visibility: 'hidden'},
                pushState:'0',
                startEveryDay:0,
                endEveryDay:0,
                emailConfig:'' ,
                frequency:0
            }
       }
    onChange(e){
         console.log(e)
    }
    componentDidMount(){
          request(user_message).then(res=>{

                 if(res.data.emailConfig!==undefined){
                 this.setState({
                        valueInput:res.data.emailAddressList,
                        pushState:res.data.emailConfig.pushState,
                        startEveryDay:res.data.emailConfig.startEveryDay,
                        endEveryDay:res.data.emailConfig.endEveryDay,
                        emailConfig:res.data.emailConfig!==undefined?res.data.emailConfig:'1',
                        frequency:res.data.emailConfig.frequency,
                 })
                }
          })
    }
    addInput(){
          this.setState({
            valueInput:this.state.valueInput.concat({email:''})
          })

    }
    delInput(index,id,e){
        let valueInput=this.state.valueInput;
        valueInput.splice(index,1);
        this.setState({
            valueInput:valueInput
        })
        if(id!==undefined){
        request(del_email_Config,{
          method: 'POST',
          headers: {
                "Content-Type": "application/x-www-form-urlencoded"
          },
          body:`id=${id}`
        }).then(res=>{
             message.success(res.data.message)
        })
        }
    }
    changeValue(index,e){
         let {value}=e.target;
         let valueInput=this.state.valueInput;
         valueInput[index]['email']=value;
         this.setState({
            valueInput:valueInput
         })
    }
    //改变按钮样式
    chageStyle(){
       let delemailConfig=this.state.emailConfig;
       delemailConfig.pushState='0';
        request(save_mail_Config,{
          method: 'POST',
          headers: {
                "Content-Type": "application/x-www-form-urlencoded"
          },
          body:`emailAddressList=${JSON.stringify(this.state.valueInput)}&emailConfig=${JSON.stringify(delemailConfig)}`
        })
         message.success('邮箱推送关闭')
         this.setState({
               styleBtn:1,
               pushState:'0'
         })
      }
      //打开预警
    openWarn(){
      request(api_update_eamil_push_state + '&pushState=1').then(res=>{
            message.success(res.data.message)
      })
      this.setState({
        styleBtn:2,
        pushState:'1'
       })
    }
    //实时预警
    realTimeBtn(){
      this.setState({
        timeBtn:2,
        frequency:0
       })
    }
    //自定义
    customBtn(){
      this.setState({
        timeBtn:1,
        frequency:1
       })
    }
    //时间选择器
    timePicker(time, timeString){
    }
    //提交内容
    settingSubmit(){
      this.props.form.validateFields((err, values) => {
        if (!err) {
            let frequency=parseInt(values.frequency[0],10);
            let startTime=values['startTime'].format('HH:mm');
            let endTime=values['endTime'].format('HH:mm');
            let warningNum,negativeNum,emailConfig;
            if(values.service.length===2){
                   warningNum='1';
                   negativeNum='1';
            }else if(values.service[0]==='warning'){
                   warningNum='1';
                   negativeNum='0';
            }else{
                   warningNum='0';
                   negativeNum='1';
            }
            if(this.state.emailConfig!==''){
                emailConfig={
                endEveryDay:endTime,
                frequency:frequency,
                id:this.state.emailConfig.id,
                negative:negativeNum,
                pushState:this.state.pushState,
                startEveryDay:startTime,
                userId:this.state.emailConfig.userId,
                warning:warningNum,
                weekendOpen:values.weekendOpen.toString()
                }
            }else{
              emailConfig={
                endEveryDay:endTime,
                frequency:frequency,
                negative:negativeNum,
                pushState:this.state.pushState,
                startEveryDay:startTime,
                userId:this.state.emailConfig.userId,
                warning:warningNum,
                weekendOpen:values.weekendOpen.toString()
                }
            }

            request(save_mail_Config,{
              method: 'POST',
              headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
              },
              body:`emailAddressList=${JSON.stringify(this.state.valueInput)}&emailConfig=${JSON.stringify(emailConfig)}`
            })
        }
    })
    }
      render(){
           const {getFieldDecorator}=this.props.form;
           const input=this.state.valueInput.map((item,index)=>
           <Row key={index} className="inputBox">
            <Col span={5}></Col>
            <Col span={5}>
            <div className="inputBoxs">
            <FormItem className="timePickerBox">
                {getFieldDecorator('userEmail'+index,{
                    rules: [{ required:'string', message: 'Please input your username!' }],
                             initialValue:item.email
                 })(
                  <Input  style={{width:'240px'}} placeholder="请输入正确的邮箱地址"
                  onChange={this.changeValue.bind(this,index)}
                 />
                  )}
            </FormItem >
            <Icon type="minus-circle" onClick={this.delInput.bind(this,index,item.id)} className="closeBtn"
            style={this.state.valueInput.length>1?this.state.disBlock:this.state.disNone}
            ></Icon>
            </div>
            </Col>
            </Row>
            );
            const plainOptions = [
              { label: '开启预警', value: 'warning' },
              { label: '开启负面', value: 'negative'},
            ];
            const options = [
              {
                value: '0分钟',
                label: '0分钟'
              },
              {
                value: '5分钟',
                label: '5分钟'
              },
              {
                value: '10分钟',
                label: '10分钟'
              }
            ];
            const style={'background': '#808080',
              'border':'none'};
            const style1={
              'background': '#108ee9',
              'border':'none'
            }
            let frequency=[this.state.frequency+'分钟'];
            const startConfig = {
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
              initialValue:moment(this.state.startEveryDay,format)
            };
            const endConfig = {
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
              initialValue:moment(this.state.endEveryDay,format)
            };
            return(

                 <div className="noticeBox">
                      <div>
                    <p className="backgroundBox"> 推送开关</p>
                            <Row>
                               <Col span={5}></Col>

                               <Col >
                               <Button type="primary" className="sizingButton" style={this.state.pushState==='1'?style1:style}
                               onClick={this.openWarn.bind(this)}
                               >打开</Button>
                               <Button type="primary" style={this.state.pushState==='0'?style1:style}
                               onClick={this.chageStyle.bind(this)}
                               >
                               关闭</Button>
                                </Col>

                            </Row>
                      </div>
                      <Form onSubmit={this.settingSubmit.bind(this)}>
                      <div className="slider" ref="slider"
                      style={this.state.pushState==='0'?{height:'0px'}:{height:(450+this.state.valueInput.length*50)+'px'}}>
                      <p className="backgroundBox">  推送方式</p>
                            <Row >
                               <Col span={3}></Col>
                               <Col span={2}><span style={{fontSize:'14px'}}>邮件推送：</span></Col>
                               <Col span={5}>
                               <div className="inputBoxs">
                               <FormItem className="timePickerBox">
                                    {getFieldDecorator('service',
                                    {rules: [{ required:'array',message: '请至少选择一种'}],
                                         initialValue:[this.state.emailConfig.negative==='1'?'negative':0,
                                         this.state.emailConfig.warning==='1'?'warning':0
                                         ]
                                    })(
                                         <CheckboxGroup options={plainOptions}/>
                                    )}
                                </FormItem>
                                </div>
                               </Col>
                            </Row>
                            {input}
                            <Row>
                                <Col span={5}></Col>
                                <Col>
                                <Button type="primary" className="mlBox" onClick={this.addInput.bind(this)}>+新增地址</Button>
                                </Col>
                            </Row>
                            <p className="backgroundBox">推送时间设置</p>
                            <Row >
                               <Col span={3}></Col>
                               <Col span={2}><span style={{fontSize:'14px'}}>推送时间：</span></Col>
                               <Col span={5}>
                               <div className="inputBoxs">
                               <FormItem className="timePickerBox">
                                    {getFieldDecorator('startTime', startConfig)(
                                        <TimePicker  format={format} onChange={this.timePicker.bind(this)}/>
                                    )}
                                </FormItem>
                               <div className="timePicker">--</div>
                               <FormItem className="timePickerBox">
                                    {getFieldDecorator('endTime', endConfig)(
                                        <TimePicker  format={format} onChange={this.timePicker.bind(this)}/>
                                    )}
                                </FormItem>
                                </div>
                               </Col>
                            </Row>
                            <Row>
                             <Col span={3}></Col>
                             <Col span={2}><span style={{fontSize:'14px'}}>推送频次：</span></Col>
                             <Col span={15}>
                             <div className="inputBoxs">
                             <Button type="primary" className="sizingButton"
                             onClick={this.realTimeBtn.bind(this)}
                             style={this.state.frequency===0?style1:style}
                             >实时推送</Button>
                             <Button type="primary" className="sizingButton"
                             onClick={this.customBtn.bind(this)}
                             style={this.state.frequency!==0?style1:style}
                             >自定义</Button>
                             <FormItem className="timePickerBox">
                               {getFieldDecorator('frequency', {
                                 rules: [{ required:'array', message: 'Please input your username!' }],
                                         initialValue:frequency
                               })(
                               <Cascader options={options}  placeholder="推送时间"  />
                              )}
                           </FormItem >
                             <span style={{fontSize:'14px',marginLeft:'10px',marginTop:'5px'}}>推送一次</span>
                             </div>
                             </Col>
                            </Row>
                            <Row>
                             <Col span={3}></Col>
                             <Col span={2}><span style={{fontSize:'14px'}}>周末推送：</span></Col>
                             <Col span={5}>
                             <div className="inputBoxs">
                             <FormItem className="timePickerBox">
                               {getFieldDecorator('weekendOpen', {
                                 rules: [{ required: true, message: 'Please input your username!' }],
                                         initialValue:parseInt(this.state.emailConfig.weekendOpen,10)
                               })(
                                <RadioGroup name="radiogroup"  >
                                <Radio value={1}>推送</Radio>
                                <Radio value={2}>不推送</Radio>
                                </RadioGroup>
                              )}
                           </FormItem >
                             </div>
                             </Col>
                            </Row>

                      <Row>
                      <Col span={5}></Col>
                      <Col ><Button type="primary" htmlType="submit" style={{marginTop:'20px'}}
                      >保存</Button></Col>
                      </Row>
                      </div>
                      </Form>
                 </div>

            )
      }
}
export default Form.create()(NoticeSetting);;
