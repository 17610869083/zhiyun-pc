import React from 'react';
import './MyReport.less';
import {Input,DatePicker,Button,message,Pagination,Tooltip,Popconfirm,Popover,Modal} from 'antd';
import {api_get_all_report,api_update_report_name,api_search_report,
        api_new_delete_report,api_download_report} from '../../services/api';
import request from '../../utils/request';
import IconFont from '../../components/IconFont';
import {getSecondTime,templateTypeSort} from '../../utils/format';
import {history} from '../../utils/history';
class MyReport extends React.Component{
     constructor(props){
         super(props);
         this.state = {
            typeList:[],
            contentList:[],
            typeKeyList:{
                '00':'全部报告',
                '01':'简报',
                '02':'专报',
                '03':'日报',
                '04':'周报',
                '05':'半月报',
                '06':'月报',
                '07':'季报',
                '08':'年报'
            },
            type:'00',
            checkId:'1',
            editReprotName:'1',
            inputSearchValue:'',
            startTime:'',
            endTime:'',
            recordTotal:0,
            current:1,
            flag:false,
            visible:false,
            hmtlUrl:'',
            previewVisible:false,
            popoverVisible:false,
            reportType:'01',
            reportFormId:2
         }
     }
     componentWillMount(){
        request(api_get_all_report)
        .then( res => {
            if(res.data.code === 1){
            let typeList = [] ;    
            templateTypeSort(res.data.data.reportTypeList).forEach(item => {
                typeList.push({type:item,name:this.state.typeKeyList[item]}) 
            });
            this.setState({
                contentList: res.data.data.pageBean.content,
                typeList:typeList,
                recordTotal: res.data.data.pageBean.recordTotal
            })  
        }
        })
    }
    changeType(type){ 
       this.setState({
           type:type,
           current:1
       })
       request(api_search_report + `&reportType=${type}`)
       .then( res => {
            if(res.data.code === 1){
            this.setState({
                contentList:res.data.data.content,
                recordTotal: res.data.data.recordTotal
            })        
           }else{
            this.setState({
                contentList:[]
            })
           }
       })
    }
    changeReport(id,status,reportType,reportFormId){
            this.setState({
                checkId:id,
                flag:true,
                reportType:reportType,
                reportFormId: reportFormId
                //flag: status === 2 ?true :false
            })
    }
    editReportName(reportid,reportname){
        this.setState({
            editReprotName:reportid,
            inputValue:reportname
        })
    }
    //失去焦点，修改名字
    blur(reportid,e){
        if(this.state.inputValue === ''){
            message.success('报告名称不可为空')
            return;
        }
        let {type,current} = this.state;
        request(api_update_report_name + `&reportId=${reportid}&reportName=${this.state.inputValue}`)
        .then( res => {
              if(res.data.code === 1){
                request(api_search_report +`&reportType=${type}&page=${current}`)
                .then( res => {
                    if(res.data.code === 1){
                    this.setState({
                        contentList: res.data.data.content,
                        editReprotName:''
                    })  
                 }
                })
              }
        })
    }
    changeReportName(e){
        let {value} = e.target;
        this.setState({
            inputValue:value
        })
    }
    changeSearchName = (e) => { 
        let {value} = e.target;
        this.setState({
            inputSearchValue:value
        })
    }
    //搜索报告
    searchReport = () => {
         if(getSecondTime(this.state.startTime)>=getSecondTime(this.state.endTime)){
             message.error('开始时间请不要大于或等于结束时间');
             return;
         }
         if (this.state.inputSearchValue === '' && this.state.startTime === '' && this.state.endTime === '' ){
             message.error('请输入报告名称或类型或时间区间');
             return;
         }
         let str = '';
         if(this.state.inputSearchValue === ''){
             str = `&reportType=${this.state.type}&starttime=${this.state.startTime}&endtime=${this.state.endTime}`
         }else if (this.state.startTime === '' || this.state.endTime === ''){
             str = `&reportType=${this.state.type}&reportName=${this.state.inputSearchValue}`
         }else{
             str = `&reportType=${this.state.type}&reportName=${this.state.inputSearchValue}&starttime=${this.state.startTime}&endtime=${this.state.endTime}`
         }
         request(api_search_report + str)
         .then( res => {
              if(res.data.code === 1){
                  this.setState({
                    contentList:res.data.data.content,
                    recordTotal:res.data.data.recordTotal,
                    current:1
                  })
              }else{
                  message.error('未搜索到该报告，请换个条件试试')
              }
         })
    }
    //开始时间
    changeStartTime = (date, dateString) => {
         this.setState({
             startTime:dateString
         })
    }
    //结束时间 
    changeEndTime = (date, dateString) => {
        this.setState({
            endTime:dateString
        })
    } 
    //翻页
    paginationChange = (current) => {
        this.setState({
             current:current
        })
        request(api_search_report + `&reportType=${this.state.type}&page=${current}`)
        .then( res => {
             if(res.data.code === 1){
             this.setState({
                 contentList:res.data.data.content,
                 flag:false
             })        
            }
        })
    }
    //预览
    preview = () => {
        if(this.state.reportType === '01'){
            this.state.reportFormId === '1'?history.push(`/briefing?type=${this.state.reportType}&id=${this.state.checkId}&type=rebuild`):
            history.push(`/allopinion/briefingsecond?type=${this.state.reportType}&id=${this.state.checkId}&type=rebuild`)
        }else{
            request(api_download_report +`&reportId=${this.state.checkId}&dType=html`)
            .then(res =>{
                 if(res.data.code ===1){
                   this.setState({
                       hmtlUrl:res.data.fileAddress,
                       previewVisible:true
                   })
                 }else{
                   message.error(res.data.msg)
                 }
             } )
        }
    }
    //删除
    delete = () => {
        if(this.state.checkId === ''){
            message.error('请选择报告');
        }else{
            request(api_new_delete_report + `&reportId=${this.state.checkId}`)
            .then( res => {
               if(res.data.code === 1){
                    message.success('删除成功');
                    this.setState({
                        checkId:'',
                        flag:false
                    })
                    request(api_search_report + `&reportType=${this.state.type}`)
                    .then( res => {
                        if(res.data.code === 1){
                        this.setState({
                            contentList:res.data.data.content
                        })        
                        }
                    })
               }
            })
        }
    }
    //下载
    downLoad(type){
         request(api_download_report +`&reportId=${this.state.checkId}&dType=${type}`)
         .then(res =>{
              if(res.data.code ===1){
                window.location.href = './../'+res.data.fileAddress;
              }else{
                message.error(res.data.msg)
              }
         } )
         this.setState({
            visible:false
         })
    }
    handleVisibleChange = () => {
        this.setState({
            visible:true
         })
    }
    //复制 
    copy = () => {
        
    }
    //隐藏预览弹窗
    onCancel = () => {
        this.setState({
            previewVisible:false
        })
    }
    //新建报告
    addReport = () => {
        history.push('/allopinion/choosetemplate');
    }
    //报告预览
    // reportPreview = (type) => {
    //      this.setState({
    //         popoverVisible:false
    //      })
    //      if(type==='preview'){
    //         request(api_download_report +`&reportId=${this.state.checkId}&dType=html`)
    //         .then(res =>{
    //              if(res.data.code ===1){
    //                this.setState({
    //                    hmtlUrl:res.data.fileAddress,
    //                    previewVisible:true
    //                })
    //              }else{
    //                message.error(res.data.msg)
    //              }
    //          } )
    //      }else{

    //      }
    // }
    cancel = () => {
        message.warning('已取消当前操作')
    }
     render(){
         const typeList = this.state.typeList.map( (item,index) => {
             return <li key = {index} 
             style={this.state.type === item.type ?{color:'#6893ff'}:{color:'#000'}}
             onClick = {this.changeType.bind(this,item.type)}
             >{item.name}</li>
         })
         const contentList = this.state.contentList.map( (item,index) => {
             return <li key = {index} 
             className={this.state.checkId === item.id ?'cont active':'cont normal'}> 
             <img src={'./../'+item.imagepath} alt="" onClick = {this.changeReport.bind(this,item.id,item.status,item.reportType,item.reportFormId)}/>
             {
             this.state.editReprotName === item.id ? <Input  value={this.state.inputValue} onChange={this.changeReportName.bind(this)} onBlur = {this.blur.bind(this,item.id)}/>:
             <p title="双击可修改名称" onDoubleClick={this.editReportName.bind(this,item.id,item.reportName)} style={{userSelect:'none',height:'28px'}} >{item.reportName}</p>
             }
             {item.updateTime && item.updateTime!=='' ?<p style={{marginBottom:'6px',display:'flex',justifyContent:'space-between'}}>{item.updateTime}
             {item.status === '2' ?<IconFont className="status" type="icon-queren"/>:<IconFont className="status" type="icon-weiwancheng"/>}
             </p>:<p style={{textAlign:'center',color:'#ff0000',marginBottom:'6px'}}>该报告未完成</p>
            }
             </li> 
         }) 
         return (
             <div className="my-report" onScroll={this.onScroll}>
             <div className="my-report-top">
             <div className="my-add-report">
                 <span onClick={this.addReport}>+&nbsp;&nbsp;新建报告</span>
                 {/* <span>导入报告</span> */}
             </div>
             <div className="my-search-report">
                 <Input placeholder="请输入报告名称或报告类型" className="input-search"
                 onChange = {this.changeSearchName} value={this.state.inputSearchValue}
                 />
                 <span className="time">生成时间</span>
                 <DatePicker onChange={ this.changeStartTime }/>
                 <span className="time">一</span>
                 <DatePicker onChange={ this.changeEndTime }/>
                 <Button style={{marginLeft:'18px'}} onClick={this.searchReport}>搜索</Button>
             </div>
             </div>
             <div className="my-report-type">
              <ul className="my-report-type-list" >
                  <li>报告类型:</li>
                  {typeList}
              </ul>
             </div>
             <div className="my-report-content"  style={this.state.contentList.length === 0 ?{display:'none'}:{display:'block'}}>
             <p>
             {/* <Tooltip title="复制" placement="bottom">
                <Popconfirm title="确定要复制该报告吗？" onConfirm={this.copy} okText="是" cancelText="否"
                getPopupContainer={() => document.querySelector('.my-report')}  placement="topLeft"
                >
                <i> <IconFont type="icon-fuzhi1"/></i>
                </Popconfirm>
             </Tooltip> */}
             <Tooltip title="下载" placement="bottom">
             <Popover
              getPopupContainer={() => document.querySelector('.my-report')}
                content={
                <div>
                    <Button type="primary" size="small" style={{marginLeft: '10px'}} onClick={this.downLoad.bind(this,'word')}>word</Button>
                    {/* <Button type="primary" size="small" style={{marginLeft: '46px'}} onClick={this.downLoad.bind(this,'excel')}>excel</Button> */}
                </div>
                }
                title="选择下载的报告类型"
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
             >
                 <i style={this.state.flag ? {opacity:1,transition:'all 0.5s ease-in 0.5s'}:{opacity:0}}><IconFont type="icon-msnui-download"/></i>
             </Popover>
             </Tooltip>
             <Tooltip title="删除" placement="bottom">
                <Popconfirm title="确定要删除该报告吗？" onCancel={this.cancel} onConfirm={this.delete} okText="是" cancelText="否"
                getPopupContainer={() => document.querySelector('.my-report')}  placement="topLeft"
                >
                <i style={this.state.flag ? {opacity:1,transition:'all 0.5s ease-in 0.5s'}:{opacity:0}}><IconFont type="icon-shanchu1-copy-copy"/></i>
                </Popconfirm>
             </Tooltip>  
             <Tooltip title="预览" placement="bottom">

             <i onClick = {this.preview} style={this.state.flag ? {opacity:1,transition:'all 0.5s ease-in 0.5s'}:{opacity:0}}><IconFont type="icon-Dashboard-card-SQLchakan"/></i>

             </Tooltip>
             </p>
             <div className="content">
              <ul>
                  {contentList}
              </ul>
              <div className="pagination">      
              <Pagination total={this.state.recordTotal} onChange={this.paginationChange}
               current={this.state.current}/>    
              </div>
             </div>
             </div>
             <Modal visible={this.state.previewVisible} footer={null} onCancel={this.onCancel}
             width="60%" height="60%"
             >
                <iframe  title="模板预览" frameBorder="0"  width="100%" height="600px"
                src={"./../" + this.state.hmtlUrl} />  
             </Modal>
             </div>
         )
     }
}
export default MyReport;