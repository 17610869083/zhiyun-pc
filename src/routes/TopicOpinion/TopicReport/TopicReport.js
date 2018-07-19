import React from 'react';
import {Button, Row, Col,DatePicker,message,Modal,Input} from 'antd';
import { history } from '../../../utils/history';
import {connect} from 'react-redux';
import {exportSkip,topicReportExport} from '../../../redux/actions/createActions';
import './TopicReport.less';
import Store from './../../../redux/store/index';
import {formatDateTime,objectToURL,getLocalTime,getSecondTime} from '../../../utils/format';
import request from '../../../utils/request';
import {api_topic_export_word,api_topic_message} from '../../../services/api';
const {RangePicker}=DatePicker;
class TopicReport extends React.Component {
    constructor() {
        super();
        this.state = {
            layoutIndex: 0,
            orderIndex: 0,
            trendIndex: 0,
            sortIndex: 0,
            mediaIndex: 0,
            countIndex: 0,
            RangePicker:'',
            topicMessage:{},
            layout: [
                {
                    type: 'tw',
                    name: '图文混编'
                },
                {
                    type: 'wz',
                    name: '只有文章'
                }
            ],
            order: [
                {
                    type: 'date',
                    name: '时间'
                },
                {
                    type: 'hot',
                    name: '热度'
                }
            ],
            trend: [
                {
                    type: 'all',
                    name: '全部'
                },
                {
                    type: '-1',
                    name: '正面'
                },
                {
                    type: '0',
                    name: '中性'
                },
                {
                    type: '1',
                    name: '负面'
                },
                {
                    type: '2',
                    name: '预警'
                }
            ],
            sort: [
                {
                    type: 'all',
                    name: '全部'
                },
                {
                    type: 'vector',
                    name: '载体'
                }
            ],
            media: [
                {
                    type: '全部',
                    name: 'all'
                },
                {
                    type: '微博',
                    name: '微博'
                },
                {
                    type: '微信',
                    name: '微信'
                },
                {
                    type: '新闻',
                    name: '新闻'
                }
            ],
            count: [
                {
                    type: 'all',
                    name: '全部'
                },
                {
                    type: '15',
                    name: 15
                },
                {
                    type: '30',
                    name: 30
                },
                {
                    type: '40',
                    name: 40
                }
            ],
            visible:false,
            downloadVisible:false,
            fileName:'',
            sourceType:''
        }
    }

    handleLayoutClick(index) {
        this.setState({
            layoutIndex: index
        });
    }

    handleOrderClick(index) {
        this.setState({
            orderIndex: index
        });
    }

    handleTrendClick(index) {
        this.setState({
            trendIndex: index
        });
    }

    handleSortClick(index) {
        this.setState({
            sortIndex: index
        });
    }

    handleMediaClick(index) {
        this.setState({
            mediaIndex: index
        });
    }

    handleCountClick(index) {
        this.setState({
            countIndex: index
        });
    }

    componentDidMount(){    
        let topicid = Store.getState().getRouterReducer;
        request(api_topic_message +'&topicid=' +topicid.topicid).then(res=>{
            if( res.data && res.data.code!==0){
                this.setState({
                    topicMessage:res.data,
                    startTime:getLocalTime(res.data.topicbdate.time),
                    endTime:getLocalTime(res.data.topicedate.time)
                })     
            }
        })
         
    }
    // //导出excl
    exportExcl(){
        let createStartTime=this.state.topicMessage.topicbdate.time;
        let createEndTime=this.state.topicMessage.topicedate.time;
           if(createStartTime<getSecondTime(this.state.RangePicker[0])){
                    message.error('选择开始时间请不要大于创建时间')
                    return;
           }else if (createEndTime<getSecondTime(this.state.RangePicker[1])){
                    message.error('选择结束时间请不要大于创建时间')
                    return;
           }
        let topicid = Store.getState().getRouterReducer;
        let time=formatDateTime(new Date());
        let tackname=this.state.topicMessage.topicname;
        let startTime=this.state.RangePicker[0]!==undefined? this.state.RangePicker[0]+' 00:00:00':this.state.startTime;
        let endTime=this.state.RangePicker[1]!==undefined? this.state.RangePicker[1]+' 23:59:59':this.state.endTime;
        let report={
            source:'topicReport_excel',
            taskname:tackname,
            taskstate:0,
            documenttype:'excel',
            createdate:time,
            sdate:startTime,
            edate:endTime,
            layout:this.state.layout[this.state.layoutIndex]['type'],
            order:this.state.order[this.state.orderIndex]['type'],
            count:this.state.count[this.state.countIndex]['type'],
            sort:this.state.sort[this.state.sortIndex]['type'],
            medias:this.state.media[this.state.mediaIndex]['name'],
            trends:this.state.trend[this.state.trendIndex]['type'],
            topicid:topicid.topicid,
            topicName:tackname
        };
        request(api_topic_export_word,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            }, 
            body:objectToURL(report)
        }).then(res=>{
           
        })
        history.push({
            pathname:'/allopinion/myreport',
            search:'type=1'
        });
    }
    //导出word
    exportWord(){
        let topicid = Store.getState().getRouterReducer;
        let tackname=this.state.topicMessage.topicname;
        let time=formatDateTime(new Date());
        let startTime=this.state.RangePicker[0]!==undefined ?this.state.RangePicker[0]+' 00:00:00':this.state.startTime;
        let endTime=this.state.RangePicker[1]!==undefined ?this.state.RangePicker[1]+' 23:59:59':this.state.endTime;
        let report={
            source:'topicReport_doc',
            taskname:tackname,
            taskstate:0,
            documenttype:'doc',
            createdate:time,
            sdate:startTime,
            edate:endTime,
            layout:this.state.layout[this.state.layoutIndex]['type'],
            order:this.state.order[this.state.orderIndex]['type'],
            count:this.state.count[this.state.countIndex]['type'],
            sort:this.state.sort[this.state.sortIndex]['type'],
            medias:this.state.media[this.state.mediaIndex]['name'],
            trends:this.state.trend[this.state.trendIndex]['type'],
            topicid:topicid.topicid
        };  
        this.props.topicReportExport(report) ;   
        history.push('/allopinion/topic/echarts'); 
    }
    picker(date, dateString){
            this.setState({
                RangePicker:dateString
            })
            
    }
    showModal(type){
         this.setState({
            visible:true,
            fileName:this.state.topicMessage.topicname,
            sourceType:type
         })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    downloadHandleOk(){
        this.setState({
            downloadVisible:false
        })
        history.push({
            pathname:'/allopinion/myreport',
            search:'type=1'
        });
    }
    downloadHandleCancel(){
        this.setState({
            downloadVisible:false
        })
    }
    fileNameChange(e){
         const {value} = e.target;
         this.setState({
            fileName:value
         })
    }
    handleOk(){
        let createStartTime=this.state.topicMessage.topicbdate.time;
        let createEndTime=this.state.topicMessage.topicedate.time;
           if(createStartTime<getSecondTime(this.state.RangePicker[0])){
                    message.error('选择开始时间请不要大于创建时间')
                    return;
           }else if (createEndTime<getSecondTime(this.state.RangePicker[1])){
                    message.error('选择结束时间请不要大于创建时间')
                    return;
           }
        let topicid = Store.getState().getRouterReducer;
        let time=formatDateTime(new Date());
        let startTime=this.state.RangePicker[0]!==undefined? this.state.RangePicker[0]+' 00:00:00':this.state.startTime;
        let endTime=this.state.RangePicker[1]!==undefined? this.state.RangePicker[1]+' 23:59:59':this.state.endTime;
        let report={
            source:this.state.sourceType==='excel'?'topicReport_excel':'topicReport_doc',
            taskname:this.state.fileName,
            taskstate:0,
            documenttype:this.state.sourceType==='excel'?'excel':'doc',
            createdate:time,
            sdate:startTime,
            edate:endTime,
            layout:this.state.layout[this.state.layoutIndex]['type'],
            order:this.state.order[this.state.orderIndex]['type'],
            count:this.state.count[this.state.countIndex]['type'],
            sort:this.state.sort[this.state.sortIndex]['type'],
            medias:this.state.media[this.state.mediaIndex]['name'],
            trends:this.state.trend[this.state.trendIndex]['type'],
            topicid:topicid.topicid,
            topicName:this.state.fileName
        };
        if(this.state.sourceType==='excel'){
            request(api_topic_export_word,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                }, 
                body:objectToURL(report)
            })
            this.setState({
                visible:false,
                downloadVisible:true
            }) 
        }else{
            this.props.topicReportExport(report) ;   
            history.push('/allopinion/topic/echarts'); 
            this.setState({
                visible:false
            }) 
        }

    }
    render() {
        return (
            <div className="topic-report">
                <div className="sort-top">
                    <div className="row">
                        <div className="title">布局格式：</div>
                        <div className="type">
                            {
                                this.state.layout.map((item, index) => (
                                    <div key={index}
                                         onClick={this.handleLayoutClick.bind(this, index)}
                                          className={index === this.state.layoutIndex ? 'item active' : 'item'}
                                    ><span className="inner-item">{item.name}</span></div>
                                ))
                            }
                        </div>
                       
                    </div>
                    <div className="rightFloat"><RangePicker onChange={this.picker.bind(this)}/> <Button>确认</Button> </div>
                    
                    <div className="row">
                        <div className="title">排序方式：</div>
                        <div className="type">
                            {
                                this.state.order.map((item, index) => (
                                    <div key={index}
                                         onClick={this.handleOrderClick.bind(this, index)}
                                          className={index === this.state.orderIndex ? 'item active' : 'item'}
                                    ><span className="inner-item">{item.name}</span></div>
                                ))
                            }
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="title">情感倾向：</div>
                        <div className="type">
                            {
                                this.state.trend.map((item, index) => (
                                    <div key={index}
                                         onClick={this.handleTrendClick.bind(this, index)}
                                          className={index === this.state.trendIndex ? 'item active' : 'item'}
                                    ><span className="inner-item">{item.name}</span></div>
                                ))
                            }
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="title">分类方式：</div>
                        <div className="type">
                            {
                                this.state.sort.map((item, index) => (
                                    <div key={index}
                                         onClick={this.handleSortClick.bind(this, index)}
                                          className={index === this.state.sortIndex ? 'item active' : 'item'}
                                    ><span className="inner-item">{item.name}</span></div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="title">媒体类型：</div>
                        <div className="type">
                            {
                                this.state.media.map((item, index) => (
                                    <div key={index}
                                         onClick={this.handleMediaClick.bind(this, index)}
                                          className={index === this.state.mediaIndex ? 'item active' : 'item'}
                                    ><span className="inner-item">{item.type}</span></div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="title">数量：</div>
                        <div className="type">
                            {
                                this.state.count.map((item, index) => (
                                    <div key={index}
                                         onClick={this.handleCountClick.bind(this, index)}
                                          className={index === this.state.countIndex ? 'item active' : 'item'}
                                    ><span className="inner-item">{item.name}</span></div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="bottom-output">
                    <Row>
                        <Col span={6} offset={6}>
                            <Button type="primary" className="word" onClick={this.showModal.bind(this,'word')}>导出Word</Button>
                        </Col>
                        <Col span={6} offset={6}>
                            <Button type="primary" className="excl" onClick={this.showModal.bind(this,'excel')}>导出Excel</Button>
                        </Col>
                    </Row>
                </div>
                </div>
                <Modal
                  title="命名该文件"
                  visible={this.state.visible}
                  onCancel={this.handleCancel.bind(this)}
                  footer={null}
                  className="fileMdal"
                > 
                <Input value={this.state.fileName} 
                onChange={this.fileNameChange.bind(this)}
                maxLength={'20'}
                ></Input>
                <Button type="primary" 
                style={{margin:'20px 0 0 214px',width:'60px',height:'30px'}}
                onClick={this.handleOk.bind(this)}
                >确定
                </Button>
                </Modal>
                <Modal
                  title="下载"
                  visible={this.state.downloadVisible}
                  onOk={this.downloadHandleOk.bind(this)}
                  onCancel={this.downloadHandleCancel.bind(this)}
                  cancelText='留在此页'
                > 
                <p>是否去下载</p>
                </Modal>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return{
       exportSkip:key=>{
           dispatch(exportSkip(key)); 
       },
       topicReportExport:data=>{
          dispatch(topicReportExport(data)); 
       }
    }
}
export default connect(null, mapDispatchToProps)(TopicReport);