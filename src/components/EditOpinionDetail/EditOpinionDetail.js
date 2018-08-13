import React from 'react';
import Kindeditor from '../Kindeditor/Kindeditor.js';
import {connect} from 'react-redux';
import './EditOpinionDetail.less';
import { Form, Input, InputNumber,DatePicker} from 'antd';
import request from '../../utils/request';
import {docdetail_remove} from '../../services/api';
import {getLocalTime} from '../../utils/format';
import {addMessageRemove} from '../../redux/actions/createActions';
import moment from 'moment';
const FormItem = Form.Item;
class EditOpinionDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            text: '' ,
            singleData:[],
            nztags:'',
            keyword:''
        } 
       
    }
    componentDidMount(){
          request(docdetail_remove,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            }, 
            body:`sid=${this.props.titleSid}`
          }).then(res=>{
                let nztagsStr=res.data.singleData[0].nztags?res.data.singleData[0].nztags.join(' '):res.data.singleData[0].nrtags.join(' ') ;
                let keywordStr=res.data.singleData[0].keyword!==undefined? res.data.singleData[0].keyword.join(' '):'';
                this.setState({
                    singleData:res.data.singleData[0],
                    text:res.data.singleData[0]['content'],
                    nztags:nztagsStr,
                    keyword:keywordStr
                })
                res.data.singleData[0]['nrtags']=nztagsStr;
                res.data.singleData[0]['keyword']=keywordStr;
                this.props.addMessageRemove(res.data.singleData[0]);
          })
    }
    handleChange(value) {
     
        let singleData=this.state.singleData;
        singleData.content=value;
        this.setState({ text: value })
        this.props.addMessageRemove(singleData);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    dateChange(date,dateString){
           let singleData=this.state.singleData;
           singleData.pubdate=dateString;
           this.setState({
               singleData:singleData
           })
           this.props.addMessageRemove(singleData);
    }
    updateChange(date,dateString){
          let singleData=this.state.singleData;
          singleData.timestamp=dateString;
          this.setState({
             singleData:singleData
          })
          this.props.addMessageRemove(singleData);
    }

    titleChange(e){
          const {value}=e.target;
          let singleData=this.state.singleData;
          singleData.title=value;
          this.setState({
              singleData:singleData
          })
          this.props.addMessageRemove(singleData);
    }
    sourceChange(e){
        const {value}=e.target;
        let singleData=this.state.singleData;
        singleData.source=value;
        this.setState({
            singleData:singleData
        })
        this.props.addMessageRemove(singleData);
    }
    urlChange(e){
        const {value}=e.target;
        let singleData=this.state.singleData;
        singleData.url=value;
        this.setState({
            singleData:singleData
        })
        this.props.addMessageRemove(singleData);
    }
    clickChange(value){
        let singleData=this.state.singleData;
        singleData.clickcount=value;
        this.setState({
            singleData:singleData
        })
        this.props.addMessageRemove(singleData);
    }
    replyChange(value){
        let singleData=this.state.singleData;
        singleData.replycount=value;
        this.setState({
            singleData:singleData
        })
        this.props.addMessageRemove(singleData);
    }
    carryChange(e){
        const {value}=e.target;
        let singleData=this.state.singleData;
        singleData.carry=value;
        this.setState({
            singleData:singleData
        })
        this.props.addMessageRemove(singleData);
    }
    hotChange(value){
        let singleData=this.state.singleData;
        singleData.hot=value;
        this.setState({
            singleData:singleData
        })
        this.props.addMessageRemove(singleData);
    }
    nrtagsChange(e){
        const {value}=e.target;
        this.setState({
            nztags:value
        },()=>{
            let singleData=this.state.singleData;
            singleData.nrtags=value;
            this.props.addMessageRemove(singleData);
        })
        
    }
    keywordChange(e){
        const {value}=e.target;

        this.setState({
            keyword:value
        },()=>{
            let singleData=this.state.singleData;
            singleData.keyword=this.state.keyword;
            this.props.addMessageRemove(singleData);
        })       
    }
    summaryChange(e){
        const {value}=e.target;
        let singleData=this.state.singleData;
        singleData.summary=value;
        this.setState({
            singleData:singleData
        })
        this.props.addMessageRemove(singleData);
    }
    authorChange(e){
        const {value}=e.target;
        let singleData=this.state.singleData;
        singleData.summary=value;
        this.setState({
            singleData:singleData
        })
        this.props.addMessageRemove(singleData);
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        // const options = [
        //     {
        //      value: 1,
        //      label: '相关舆情'
        //     },
        //      {
        //          value:1,
        //          label: '关注舆情'
        //      }
        //     ];
        // const mediaOptions =[
        //      {
        //         value: '论坛',
        //         label: '论坛' 
        //      },
        //      {
        //         value: '视频',
        //         label: '视频'  
        //      },
        //      {
        //         value: '综合',
        //         label: '综合'  
        //      },
        //      {
        //         value: '新闻',
        //         label: '新闻'  
        //      },
        //      {
        //         value: '微博',
        //         label: '微博'   
        //      },
        //      {
        //         value: '微信',
        //         label: '微信'   
        //      },
        //      {
        //         value: '平媒',
        //         label: '平媒' 
        //      },
        //      {
        //         value: '博客',
        //         label: '博客'
        //      },
        //      {
        //         value: 'APP',
        //         label: 'APP'   
        //      }
        // ] ;
        // const negtiveOptions=[
        //      {
        //         value: -1,
        //         label: '正面'
        //      },
        //      {
        //         value: 0,
        //         label: '中性'
        //      },
        //      {
        //         value: 1,
        //         label: '负面'
        //      },
        //      {
        //         value: 2,
        //         label: '预警'
        //      }
        // ] 

        let  data=this.state.singleData; 
        const config = {
            rules: [{ type: 'object'}],
            initialValue:moment(getLocalTime(data.pubdate ),'YYYY-MM-DD HH:mm:ss')
        };  
        const updateconfig = {
            rules: [{ type: 'object'}],
            initialValue:moment(getLocalTime(data.timestamp ),'YYYY-MM-DD HH:mm:ss')
        }; 
        return (
            <div>
            <div className="detailpublicTop"></div>    
            <div className="publicbox">
            <Form style={{marginTop:'20px',height:'120%'}} onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
                {...formItemLayout}
                label="标题"
            >                                         
                    <Input placeholder="标题" onChange={this.titleChange.bind(this)}
                      value={data.title!==undefined?data.title:''}
                    />
             
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="作者"
            >                                         
                    <Input placeholder="作者" onChange={this.authorChange.bind(this)}
                      value={data.author!==undefined?data.author:''}
                    />
             
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="时间"
            >   
                {getFieldDecorator('date-time-picker',config)(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.dateChange.bind(this)}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="更新时间"
            >
                {getFieldDecorator('date-time-picker-update',updateconfig)(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.updateChange.bind(this)}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="来源"
            >
                {getFieldDecorator('source',{
                      initialValue:data.source!==undefined?data.source:''
                })(
                    <Input placeholder="来源" onChange={this.sourceChange.bind(this)}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="URL"
            >
                {getFieldDecorator('url',{
                     initialValue:data.url!==undefined?data.url:''
                })(
                    <Input placeholder="URL" onChange={this.urlChange.bind(this)}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="点击数"
            >
                {getFieldDecorator('clickCount', {
                    initialValue:data.clickcount!==undefined?data.clickcount:''                    
                })(
                    <InputNumber min={0} onChange={this.clickChange.bind(this)}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="回复数"
            >
                {getFieldDecorator('replyCount', {
                    initialValue: data.replycount!==undefined?data.replycount:''                    
                })(
                    <InputNumber min={0} onChange={this.replyChange.bind(this)}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="载体"
            >
                {getFieldDecorator('carry',{
                    initialValue: data.carry!==undefined?data.carry:''
                })(
                    <Input placeholder="载体" onChange={this.carryChange.bind(this)}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="热度"
            >
                {getFieldDecorator('hot', {
                    initialValue: data.hot!==undefined?data.hot:''
                })(
                    <InputNumber min={0} onChange={this.hotChange.bind(this)}/>
                )}
            </FormItem>
            {/* <FormItem
                {...formItemLayout}
                label="更新状态"
            >
                {getFieldDecorator('radio-group', {
                    initialValue: "未更新"
                })(
                    <RadioGroup>
                        <Radio value="未更新">未更新</Radio>
                        <Radio value="已更新">已更新</Radio>
                    </RadioGroup>
                )}
            </FormItem> */}
            <FormItem
                {...formItemLayout}
                label="要素"
            >
                {getFieldDecorator('nrtags',{
                     initialValue:this.state.keyword!==''? this.state.keyword:''                    
                })(
                    <Input placeholder="要素" onChange={this.keywordChange.bind(this)}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="关键字"
            >
                {getFieldDecorator('keyword',{
                     initialValue:this.state.nztags!==''?this.state.nztags:'' 
                })(
                    <Input placeholder="关键字" onChange={this.nrtagsChange.bind(this)}/>
                )}
            </FormItem>
            {/* <FormItem
                {...formItemLayout}
                label="属性"
            >
                {getFieldDecorator('attribute',{
                  rules: [{ required:'array', message: 'Please input your username!' }],
                           initialValue:[1,data.carry!==undefined?data.carry:'',data.negative!==undefined?data.negative:'']
                        })(
                    <div>
                    <Cascader options={options} style={{width:'20%',marginRight:'5%'}} defaultValue={[1]}/>
                    <Cascader options={mediaOptions} style={{width:'20%',marginRight:'5%'}} defaultValue={['论坛']}/>
                    <Cascader options={negtiveOptions} style={{width:'20%',marginRight:'5%'}} defaultValue={[-1]}/>
                    </div>
                )}
            </FormItem> */}
            <FormItem
                {...formItemLayout}
                label="摘要"
            >
                {getFieldDecorator('summary',{
                     initialValue:data.summary!==undefined?data.summary:''                     
                })(
                    <Input type="textarea" onChange={this.summaryChange.bind(this)}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="编辑器"
            >
                 <Kindeditor contents={this.state.text}
                 onChange={this.handleChange.bind(this)}/>
            </FormItem>
        </Form>

                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addMessageRemove: req => {
            dispatch(addMessageRemove(req));
        }
    }
};


export default connect(null, mapDispatchToProps)(Form.create()(EditOpinionDetail));