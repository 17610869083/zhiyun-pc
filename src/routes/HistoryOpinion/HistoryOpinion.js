import React from 'react';
import {Input,DatePicker,Button,Tabs,Table,Tooltip,Icon,Modal,Cascader,message} from 'antd';
import './HistoryOpinion.less';
import request from './../../utils/request';
import {connect} from 'react-redux';
import {download_report,del_report,
        regenerate_report,api_removetitle_report,public_sentiment_report,preview_report,
        report_search,api_batch_del_report,api_export_small
} from '../../services/api';
import {getLocalTime,responseTime} from '../../utils/format';

const TabPane = Tabs.TabPane;

class HistoryOpinion extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            visibleOne:false,
            reportMessage:[],
            type:'1',
            tasklist:[],
            inputIndex:0,
            reportId:0,
            timeNumber:0,
            delSource:'',
            delId:'' ,
            num:0,
            pageCount:0,
            page:1 ,
            reportPage:1,
            reportTaskList:[] ,
            reportPageCount:0 ,
            titleInputValue:'' ,
            startTime:'',
            endTime:'' ,
            queryState:'1',
            batchdelID:[] ,
            selectedRowKeys:[] ,
            visiblePreview:false ,
            sourceSummary:0,
            sourceArr:['monitor','topic','topicReport_excel','clf'],
            sourceType:{
                 'topic':'专题舆情',
                 'monitor':'舆情监测',
                 'topicReport_excel':'专题报告',
                 'clf':'分类舆情',
                 'work':'舆情报告',
                 'topicReport_doc':'专题报告'
            },
        }
    }
    componentDidMount(){
            let searchType=this.props.location.search.split('=')[1];
            this.setState({
                  type:searchType!==undefined?searchType:'1'
            })
            request(public_sentiment_report+'&documenttype=doc').then(res=>{
                      if(res.data && res.data.code!==-1){
                       this.setState({
                          reportTaskList :res.data.taskList,
                          reportPageCount:parseInt(res.data.pageCount,10)
                       })
                    }
                  })
                  setTimeout(()=>{
                    request(public_sentiment_report+'&documenttype=doc').then(res=>{
                        if(res.data && res.data.code!==-1){
                        this.setState({
                            reportTaskList:responseTime(res.data.taskList)
                        })
                        }
                    })
                },7000)
            request(public_sentiment_report+'&documenttype=excel').then(res=>{
                if(res.data && res.data.code!==-1){
                    this.setState({
                         tasklist:res.data.taskList,
                         pageCount:parseInt(res.data.pageCount,10)
                    })
                }
             })
             setTimeout(()=>{
                request(public_sentiment_report+'&documenttype=excel').then(res=>{
                    if(res.data && res.data.code!==-1){
                    this.setState({
                         tasklist:responseTime(res.data.taskList)
                    })
                   }
                })
            },7000)
    }
    revisingReport(e){
         let index=parseInt(e.target.dataset.index,10);
         let reportId=parseInt(e.target.dataset.id,10);
         let title=document.querySelector('.title'+reportId);
         title.innerHTML='<input placeholder='+title.innerText +' maxlength=15>';
         this.setState({
              inputIndex:index,
              reportId:reportId
         })
    }
    //重命名
    blur(e){
        if(e.target.value.length>=15){
             message.error('标题名称请不要大于15个字符');
             return;
        }
        document.querySelector('.title'+this.state.reportId).innerHTML=e.target.value!==''?e.target.value:e.target.placeholder;
        let taskname=e.target.value!==''?e.target.value:e.target.placeholder;
        request(api_removetitle_report,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
           body:`taskname=${taskname}&taskid=${this.state.reportId}`
          }).then(res=>{
                 if(this.state.type==='1'){
                    request(public_sentiment_report+'&documenttype=excel').then(res=>{
                        this.setState({
                             tasklist:res.data.taskList,
                             pageCount:parseInt(res.data.pageCount,10)
                        })
                    })
                 }else{
                    request(public_sentiment_report+'&documenttype=doc').then(res=>{
                        this.setState({
                            reportTaskList:res.data.taskList,
                             pageCount:parseInt(res.data.pageCount,10)
                        })
                    })
                 }
          })
    }
    delReport(e){
         this.setState({
              visible:true,
              delSource:e.target.dataset.source,
              delId:e.target.dataset.id
         })
    }
    //删除
    handleOk(){

        request(del_report,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
           body:`taskid=${this.state.delId}`
          }).then(res=>{
            if(this.state.type==='1'){
                request(public_sentiment_report+'&documenttype=excel').then(res=>{
                    this.setState({
                         tasklist:res.data.taskList,
                         pageCount:parseInt(res.data.pageCount,10) ,
                         visible:false
                    })
                })
            }else{
                request(public_sentiment_report+'&documenttype=doc').then(res=>{
                    this.setState({
                        reportTaskList:res.data.taskList,
                         pageCount:parseInt(res.data.pageCount,10) ,
                         visible:false
                    })
                })
            }

          })

    }
    handleCancel(){
        this.setState({
            visible:false
       })
    }
    handleOkOne(){
        this.setState({
            visibleOne:false
       })
    }
    handleCancelOne(){
        this.setState({
            visibleOne:false
       })
    }
    sendReport(){
        this.setState({
            visibleOne:true
       })
    }
    onTabClick(key){
         this.setState({
             type:key
         })
         if(key==='2'){
            request(public_sentiment_report+'&documenttype=doc').then(res=>{
                this.setState({
                   reportTaskList :res.data.taskList,
                   reportPageCount:parseInt(res.data.pageCount,10)
                })
           })
         }
    }
    //再次生成报告
    Regenerate(e){
        let taskIndex=parseInt(e.target.dataset.index,10);
        let taskId=e.target.dataset.id;
        if(this.state.type==='1'){
            let taskList=this.state.tasklist;
            taskList[taskIndex]['taskstate']=1;
            this.setState({
                tasklist:taskList
            })
            setTimeout(()=>{
                request(public_sentiment_report+'&documenttype=excel').then(res=>{
                      if(res.data!==undefined){
                      this.setState({
                           tasklist:res.data.taskList
                      })
                    }
                  })
            },5000)
        }else{
            let reportList=this.state.reportTaskList;
            reportList[taskIndex]['taskstate']=1;
            this.setState({
                reportTaskList:reportList
            })
            setTimeout(()=>{
                request(public_sentiment_report+'&documenttype=doc').then(res=>{
                      if(res.data!==undefined){
                      this.setState({
                         reportTaskList:res.data.taskList
                      })
                    }
                  })
            },5000)
        }

        request(regenerate_report,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
           body:`taskid=${taskId}`
          })


    }
    //下载
    down(e){
           let tasklist=e.target.dataset.source;
           let id=e.target.dataset.id;
           let finishdate=getLocalTime(parseInt(e.target.dataset.finishdate,10));
         request(download_report,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`source=${tasklist}&taskid=${id}&finishDate=${finishdate}`
              }).then(res=>{
                 let downloadUrl= 'http://web.is8.com.cn'+res.data.downloadUrl;
                 window.location.href=downloadUrl;
              })
    }
    change(e){
        if(this.state.queryState==='1'){
            request(public_sentiment_report,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`documenttype=excel&pages=${e}`
             }).then(res=>{
                   if(res.data.taskList!==undefined){
                         this.setState({
                            tasklist:res.data.taskList,
                            page:e,
                            selectedRowKeys:[]
                         })
                   }
             })
        }else if(this.state.queryState==='3'){
              request(api_export_small +`&source=${this.state.sourceSummary}&pages=${e}`)
              .then(res=>{
                if(res.data.taskList!==undefined){
                    this.setState({
                       tasklist:res.data.taskList,
                       page:e,
                       electedRowKeys:[]
                    })
                  }
              })
        }
        else{
            request(report_search,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                },
               body:`taskname=${this.state.titleInputValue}&pages=${e}&sdate=${this.state.startTime}&edate=${this.state.endTime}`
             }).then(res=>{
                   if(res.data.taskList!==undefined){
                         this.setState({
                            tasklist:res.data.taskList,
                            page:e,
                            electedRowKeys:[]
                         })
                   }
             })
        }

    }
    reportChange(e){
        if(this.state.queryState==='1'){
        request(public_sentiment_report,{
           method: 'POST',
           headers: {
                 "Content-Type": "application/x-www-form-urlencoded"
           },
          body:`documenttype=doc&pages=${e}`
         }).then(res=>{
              if(res.data.taskList!==undefined){
                    this.setState({
                        reportTaskList:res.data.taskList,
                        reportPage:e,
                        selectedRowKeys:[]
                    })
              }
        })
    }else if(this.state.queryState==='3'){
        request(api_export_small +`&source=${this.state.sourceSummary}&pages=${e}`)
        .then(res=>{
          if(res.data.taskList!==undefined){
              this.setState({
                reportTaskList:res.data.taskList,
                reportPage:e,
                selectedRowKeys:[]
              })
            }
        })
    }else{
        request(report_search,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
           body:`taskname=${this.state.titleInputValue}&pages=${e}&sdate=${this.state.startTime}&edate=${this.state.endTime}`
         }).then(res=>{
               if(res.data.taskList!==undefined){
                     this.setState({
                        reportTaskList:res.data.taskList,
                        reportPage:e,
                        selectedRowKeys:[]
                     })
               }
         })
       }
   }
    //预览报告
    previewReport(id,e){
           request(preview_report,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
           body:`taskid=${id}&source=${e.target.dataset.source}`
           }).then(res=>{
             if(res.data.code==='1'){
                  message.warning('该报告已被删除')
             }else{
                this.setState({
                    visiblePreview:true,
                    downloadUrl:'http://web.is8.com.cn/om'+res.data.downloadUrl
                   })
             }
           })
    }

    //查询报告

    queryTitle= ()=>{
         let tasklist= this.state.type==='1'?'tasklist':'reportTaskList';
         let pageCount= this.state.type==='1'?'pageCount':'reportPageCount';
          request(report_search,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`taskname=${this.state.titleInputValue}&sdate=${this.state.startTime}&edate=${this.state.endTime}`
          }).then(res=>{
                if(res.data){
                     this.setState({
                        [tasklist] :res.data.taskList,
                        [pageCount]:parseInt(res.data.pageCount,10),
                        queryState:'2'
                     })
                }
          })
    }

    titleOnchange= (e) =>{
           const {value}=e.target;
           this.setState({
                 titleInputValue:value
           })
    }

    startTime= (date, dateString) =>{
            this.setState({
                startTime:dateString
            })
    }
    endTime= (date, dateString) =>{
        this.setState({
            endTime:dateString
        })
   }

   batchDel(){
          let batchdelID=this.state.batchdelID.join(',');
          request(api_batch_del_report,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`taskids=${batchdelID}`
          }).then(res=>{
                 message.success(res.data.mess)
                 if(res.data.mess==='删除成功'){
                    if(this.state.type==='1'){
                    request(public_sentiment_report+'&documenttype=excel').then(res=>{
                        this.setState({
                             tasklist:res.data.taskList,
                             pageCount:parseInt(res.data.pageCount,10) ,
                             selectedRowKeys:[]
                         })
                     })

                    }else{
                        request(public_sentiment_report+'&documenttype=doc').then(res=>{
                            this.setState({
                               reportTaskList :res.data.taskList,
                               reportPageCount:parseInt(res.data.pageCount,10) ,
                               selectedRowKeys:[]
                            })
                          })
                    }
                 }
          })
   }

   handleOkPreview(){
         this.setState({
               visiblePreview:false
         })
   }

   handleCancelPreview(){
    this.setState({
          visiblePreview:false
    })
   }

   searchSummary(type){
          this.setState({
             sourceSummary:type,
             queryState:'3',
             page:1
          })
          request(api_export_small +`&source=${type}&pages=1`).then(res=>{
                      this.setState({
                           tasklist :res.data.taskList,
                           pageCount:parseInt(res.data.pageCount,10)
                      })

          })
   }

   searchReportSummary(type){
        this.setState({
        sourceSummary:type,
        queryState:'3',
        reportPage:1
        })
     request(api_export_small +`&source=${type}&pages=1`).then(res=>{
                 this.setState({
                      reportTaskList :res.data.taskList,
                      reportPageCount:parseInt(res.data.pageCount,10)
                 })

     })
   }
    render(){
          const options = [
           {
            value: '邮箱一',
            label: '121212121@163.com'
           },
            {
                value: '邮箱二',
                label: '邮箱二'
            }
           ];

    const operations =<span className="moreButton"><Button type="primary" onClick={this.batchDel.bind(this)}>批量删除</Button>
                  {/* <Button type="primary">批量下载</Button> */}
                  </span>;
    const columns = [{
    title: '标题',
    dataIndex: 'name',
    width:'20%',
    render: text =><span>
        <i className={this.state.type==='1'?'fa fa-file-excel-o':'fa fa-file-word-o'} aria-hidden="true"></i>
        <span className={'title'+text.Id} onBlur={this.blur.bind(this)}
        data-id={text.Id}
        >{text.taskname}</span></span>,
  }, {
    title: '来源类型',
    dataIndex: 'type',
    width:'20%',
    render: text =><span>{this.state.sourceType[text.source]}</span>
  },{
    title: '操作',
    dataIndex: 'operation',
    width:'20%',
    render:text=>(

        <div>
        <Tooltip title="下载报告">
        <i className="fa fa-download" aria-hidden="true" style={text[0]['taskstate']==='2'?{color:'black'}:{color:'gray',cursor:'text'}}
        onClick={this.down.bind(this)}
        data-source={text[0]['source']}
        data-id={text[0]['Id']}
        data-finishdate={text[0]['finishdate']}
        />
    </Tooltip>
    {/* <Tooltip title="修改报告">
        <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={text[0]['taskstate']==='2'?this.revisingReport.bind(this):''}
        style={text[0]['taskstate']==='2'?{color:'black'}:{color:'gray',cursor:'text'}}
        data-index={text[1]}
        data-source={text[0]['source']}
        data-id={text[0]['Id']}
        />
    </Tooltip> */}
    <Tooltip title="删除报告">
        <i className="fa fa-trash-o" aria-hidden="true" onClick={text[0]['taskstate']==='2'?this.delReport.bind(this):''}
        style={text[0]['taskstate']==='2'?{color:'black'}:{color:'gray',cursor:'text'}}
        data-source={text[0]['source']}
        data-id={text[0]['Id']}
        />
    </Tooltip>
    <Tooltip title="预览报告">
        <i className="fa fa-eye" aria-hidden="true" style={this.state.type==='1'?{display:'none'}: this.state.type==='2'&& text[0]['taskstate']==='2'?{color:'black'}:{color:'gray'}}
        data-source={text[0]['source']}
        onClick={this.previewReport.bind(this,text[0]['Id'])}
        />
    </Tooltip>
    {/* <Tooltip title="发送报告">
        <i className="fa fa-envelope-o" aria-hidden="true" onClick={text[0]['taskstate']==='2'?this.sendReport.bind(this):''}
        style={text[0]['taskstate']==='2'?{color:'black'}:{color:'gray',cursor:'text'}}
        data-source={text[0]['source']}
        data-id={text[0]['Id']}
        />
    </Tooltip> */}
     </div>
    )
  }, {
    title: '时间',
    dataIndex: 'address',
    width:'20%',
  }, {
    title: '生成状态',
    dataIndex: 'status',
    width:'20%',
    render:text=>(
        status.call(this,text)
    )
  }];
  //判断生成报告的三种状态
  function status(data){
        if(data[0].taskstate==='3'){
         return   <span>失败<i className="fa fa-repeat" aria-hidden="true" title="再次生成" onClick={this.Regenerate.bind(this)}
                   data-source={data[0].source}
                   data-id={data[0].Id}
                   data-index={data[1]}
                   ></i>
                  </span>
        }else if (data[0].taskstate==='2'){
         return    <span>成功 </span>
        }else{
         return  <Icon type="loading" />
        }
    }
  const data=[];
  this.state.tasklist.map((item,index)=>
    data.push({
    key:index,
    operation:[item,index],
    type:item,
    name: item,
    address:getLocalTime(item.createdate),
    status: [item,index]
         })
      )
  const reportData=[];
  this.state.reportTaskList.forEach((item,index)=>{
    reportData.push({
        key:index,
        operation:[item,index],
        type:item,
        name: item,
        address:getLocalTime(item.createdate),
        status: [item,index]
             })
  })
  const {selectedRowKeys} =this.state;
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      let batchdelID=[];
      for(let i in selectedRows){
        batchdelID.push(selectedRows[i]['name']['Id'])
      }
         this.setState({
            batchdelID:batchdelID,
            selectedRowKeys:selectedRowKeys
         })
    },
    getCheckboxProps: record => ({
       disabled: record.name === 'Disabled User'
    })
  };
    return(
        <div className="historyBox">
           <div>
           <Tabs tabBarExtraContent={operations}
           defaultActiveKey="1"
           activeKey={this.state.type}
           onTabClick={this.onTabClick.bind(this)}
           >
           <TabPane tab="舆情摘要" key="1">
           <div className="historyHeader">
           <Input className="titleInput"
           placeholder="输入标题"
           onChange={this.titleOnchange}
           value={this.state.titleInputValue}
           />
           <span>生成时间:</span>
           <DatePicker  format="YYYY-MM-DD HH:mm:ss" className="datePicker" onChange={this.startTime}/>
           <DatePicker  format="YYYY-MM-DD HH:mm:ss" className="datePicker" onChange={this.endTime}/>
           <Button type="primary" onClick={this.queryTitle}>查询</Button>
           </div>
           <div className="historySummary">
                <div className="source">来源类型：</div>
                <div className={this.state.sourceSummary==='monitor'?'summary blueSummary':'summary'}
                onClick={this.searchSummary.bind(this,'monitor')}
                >舆情摘要</div>
                <div className={this.state.sourceSummary==='topic'?'summary blueSummary':'summary'}
                onClick={this.searchSummary.bind(this,'topic')}
                >专题摘要</div>
                <div className={this.state.sourceSummary==='topicReport_excel'?'summary blueSummary':'summary'}
                onClick={this.searchSummary.bind(this,'topicReport_excel')}
                >专题报告摘要</div>
                <div className={this.state.sourceSummary==='clf'?'summary blueSummary':'summary'}
                onClick={this.searchSummary.bind(this,'clf')}
                >分类摘要</div>
           </div>
                <Table rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                bordered
                pagination={{
                    total:this.state.pageCount,
                    onChange:this.change.bind(this),
                    current:this.state.page
                }}
                />
           </TabPane>
           <TabPane tab="舆情报告" key="2">
           <div className="historyHeader">
           <Input className="titleInput"
           placeholder="输入标题"
           onChange={this.titleOnchange}
           value={this.state.titleInputValue}
           />
           <span>生成时间:</span>
           <DatePicker  format="YYYY-MM-DD HH:mm:ss" className="datePicker" onChange={this.startTime}/>
           <DatePicker  format="YYYY-MM-DD HH:mm:ss" className="datePicker" onChange={this.endTime}/>
           <Button type="primary" onClick={this.queryTitle}>查询</Button>
           </div>
           <div className="historySummary">
                <div className="source">来源类型：</div>
                <div className={this.state.sourceSummary==='work'?'summary blueSummary':'summary'}
                onClick={this.searchReportSummary.bind(this,'work')}
                >舆情简报</div>
                <div className={this.state.sourceSummary==='topicReport_doc'?'summary blueSummary':'summary'}
                onClick={this.searchReportSummary.bind(this,'topicReport_doc')}
                >专题报告</div>
           </div>
                <Table rowSelection={rowSelection}
                columns={columns}
                dataSource={reportData}
                bordered
                pagination={{
                    total:this.state.reportPageCount,
                    onChange:this.reportChange.bind(this),
                    current:this.state.reportPage
                }}
                />
           </TabPane>
           </Tabs>
           </div>
           <Modal
          title="删除提示"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <p>是否删除此报告</p>
        </Modal>
        <Modal
          title="推送消息"
          visible={this.state.visibleOne}
          onOk={this.handleOkOne.bind(this)}
          onCancel={this.handleCancelOne.bind(this)}
        >
        <p className="conent"><span>推送邮箱：</span>
        <Cascader options={options} style={{width:'83%'}}/>
        </p>
        <p className="conent"><span>消息主题：</span><Input className="smallInput"/></p>
        <p className="conent"><Input placeholder="手动输入邮箱地址" className="bigInput"/></p>
        </Modal>
        <Modal
          title="预览报告"
          visible={this.state.visiblePreview}
          onOk={this.handleOkPreview.bind(this)}
          onCancel={this.handleCancelPreview.bind(this)}
          width="50%"

        >
         <iframe src={this.state.downloadUrl}
         title="load"
         width="100%"  height="500px"
         id="Iframe"
         ></iframe>
        </Modal>
        </div>
    )
}
}
const mapStateToProps = state => {
    return {
        propsParam: state.exportSkip,
    }
};
export default connect(mapStateToProps, null)(HistoryOpinion);
