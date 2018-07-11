import React from 'react';
import './MyReport.less';
import {Input,DatePicker,Button,message,Pagination,Tooltip,Popconfirm,Popover,Modal} from 'antd';
import {api_get_all_report,api_update_report_name,api_search_report,
        api_new_delete_report,api_download_report} from '../../services/api';
import request from '../../utils/request';
import IconFont from '../../components/IconFont';
import img from '../../assets/img/1.png';
import {getLocalTime,getSecondTime,templateTypeSort} from '../../utils/format';
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
            popoverVisible:false
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
                contentList:res.data.data.content
            })        
           }else{
            this.setState({
                contentList:[]
            })
           }
       })
    }
    changeReport(id,status){
            this.setState({
                checkId:id,
                flag:true
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
        request(api_update_report_name + `&reportId=${reportid}&reportName=${this.state.inputValue}`)
        .then( res => {
              if(res.data.code === 1){
                request(api_get_all_report)
                .then( res => {
                    if(res.data.code === 1){
                    this.setState({
                        contentList: res.data.data.pageBean.content,
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
             str = `&reportType=${this.state.type}&starttime=${this.state.startTime}$endtime=${this.state.endTime}`
         }else if (this.state.startTime === '' || this.state.endTime === ''){
             str = `&reportType=${this.state.type}&reportName=${this.state.inputSearchValue}`
         }else{
             str = `&reportType=${this.state.type}&reportName=${this.state.inputSearchValue}&starttime=${this.state.startTime}$endtime=${this.state.endTime}`
         }
         request(api_search_report + str)
         .then( res => {
              if(res.data.code === 1){
                  this.setState({
                    contentList:res.data.data.content
                  })
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
                 contentList:res.data.data.content
             })        
            }
        })
    }
    //预览
    preview = () => {
        this.setState({
            popoverVisible:true
        })
    }
    //删除
    delete = () => {
        request(api_new_delete_report + `&reportId=${this.state.checkId}`)
        .then( res => {
           if(res.data.code === 1){
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
    //下载
    downLoad(type){
         request(api_download_report +`&reportId=${this.state.checkId}&dType=${type}`)
         .then(res =>{
              if(res.data.code ===1){
                window.location.href = res.data.fileAddress
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
        history.push('/choosetemplate');
    }
    //报告预览
    reportPreview = (type) => {
         this.setState({
            popoverVisible:false
         })
         if(type==='preview'){
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
         }else{
            history.push('/choosetemplate');  
         }
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
             <img src={img} alt="" onClick = {this.changeReport.bind(this,item.id,item.status)}/>
             {
             this.state.editReprotName === item.id ? <Input  value={this.state.inputValue} onChange={this.changeReportName.bind(this)} onBlur = {this.blur.bind(this,item.id)}/>:
             <p title="双击可修改名称" onDoubleClick={this.editReportName.bind(this,item.id,item.reportName)} style={{userSelect:'none',height:'28px'}} >{item.reportName}</p>
             }
             <p style={{marginBottom:'6px'}}>{getLocalTime(item.updateTime)} 
             {item.status === '2' ?<IconFont className="status" type="icon-queren"/>:<IconFont className="status" type="icon-weiwancheng"/>}
             </p>
             </li> 
         }) 
         return (
             <div className="my-report">
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
              <ul className="my-report-type-list">
                  <li>报告类型:</li>
                  {typeList}
              </ul>
             </div>
             <div className="my-report-content">
             <p style={this.state.flag ? {opacity:1,transition:'all 0.5s ease-in 0.5s'}:{opacity:0}}>
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
                    <Button type="primary" size="small" style={{marginLeft: '46px'}} onClick={this.downLoad.bind(this,'excel')}>excel</Button>
                </div>
                }
                title="选择下载的报告类型"
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
             >
                 <i><IconFont type="icon-msnui-download"/></i>
             </Popover>
             </Tooltip>
             <Tooltip title="删除" placement="bottom">
                <Popconfirm title="确定要删除该报告吗？" onConfirm={this.delete} okText="是" cancelText="否"
                getPopupContainer={() => document.querySelector('.my-report')}  placement="topLeft"
                >
                <i><IconFont type="icon-shanchu1-copy-copy"/></i>
                </Popconfirm>
             </Tooltip>  
             <Tooltip title="预览" placement="bottom">
             <Popover
              getPopupContainer={() => document.querySelector('.my-report')}
                content={
                <div>
                    <Button type="primary" size="small" style={{marginLeft: '10px'}} onClick={this.reportPreview.bind(this,'preview')}>预览</Button>
                    <Button type="primary" size="small" style={{marginLeft: '46px'}} onClick={this.reportPreview.bind(this,'edit')}>再编辑</Button>
                </div>
                }
                trigger="click"
                visible={this.state.popoverVisible}
             >
             <i onClick = {this.preview}><IconFont type="icon-Dashboard-card-SQLchakan"/></i>
             </Popover>
             </Tooltip>
             </p>
             <div className="content">
              <ul>
                  {contentList}
              </ul>
              <div className="pagination">      
              <Pagination total={this.state.recordTotal} onChange={this.paginationChange} current={this.state.current}/>    
              </div>
             </div>
             </div>
             <Modal visible={this.state.previewVisible} footer={null} onCancel={this.onCancel}
             width="60%" height="60%"
             >
                <iframe  title="模板预览" frameBorder="0"  width="100%" height="600px"
                src={"http://119.90.61.155/om31/" + this.state.hmtlUrl} />  
             </Modal>
             </div>
         )
     }
}
export default MyReport;