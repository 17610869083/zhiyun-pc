import React from 'react';
import {connect} from 'react-redux';
import {Checkbox, Button, Icon, Tooltip,  Modal, message,Input} from 'antd';
import {history} from '../../utils/history';
import request from '../../utils/request';
import {api_delete_report_item,api_allopinion_exportskip,api_check_report,api_put_into_report} from '../../services/api';
import {opinionTrend, opinionColor,formatDateTime} from '../../utils/format';
import {
    getReportDetailRequested,reportMessage
} from '../../redux/actions/createActions';

import './ReportOpinionDetail.less';
import Store from '../../redux/store/index';
import BlankPage from '../../base/Exception/BlankPage';
import MaterialOpinion from '../MaterialOpinion/MaterialOpinion';
const confirm = Modal.confirm;

class ReportOpinionDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            url: 222,
            checked: false,
            checkedAll: false,
            checkedLength: 0,
            arr: new Array(30).fill(false),
            reportName:Store.getState().exportSkip,
            fileNameVisible:false,
            downloadVisible:false,
            materiaVisible:false,
            sids:[],
            checkboxState:false,
            checkboxNum:1
        }
    }
    chooseAllOnChange(){}
    checkedAll(){}

    // 返回报告列表页
    goBackReportOpinionList() {
        history.push("/allopinion/reportopinion/list");
    }

    // 跳转到素材库
    goToMaterialOpinion() {
        this.setState({
            materiaVisible:true,
            checkboxNum:this.state.checkboxNum+1
        })
        // history.push("/materiaopinion");
    }

    // 点击标题跳转
    clickItemTitle(sid) {
        history.push(`/detail/${sid}`);
    }

    // 移出报告
    removeThisFromReport(id) {
        const reportId = this.state.url;
        const getReportDetail = this.props.getReportDetailRequested;
        confirm({
            title: '确定将这条舆情移出报告?',
            content: '移出报告',
            onOk() {
                request(api_delete_report_item + '&reportid=' + reportId + '&id=[' + id + ']', {}).then((res) => {
                    if (res.data.code === 1) {
                        message.success(res.data.msg);
                        getReportDetail(reportId);
                    }
                });
            },
            onCancel() {
                console.log('取消');
            },
        });
    }

    // 分页
    onPaginationChange() {}

    // 每页显示数量
    onShowSizeChange() {}


    // ---------单选与全选
    onChange(index,e) {
        const arr = this.state.arr;
        arr[index] = e.target.checked;
        const isEveryChecked = arr.every(item => {
            return (item === true);
        });
        this.setState({
            arr: arr,
            checkedAll: isEveryChecked
        });
    }
    onAllChange(e) {
        const arr = this.state.arr.fill(e.target.checked);
        this.setState({
            checkedAll: e.target.checked,
            arr: arr
        });
    }

    componentWillMount() {
        // const id = history.location.search.match(/\d+/g)[0];
        let id = 0;
        if (history.location.search) {
            id = history.location.search.match(/\d+/g)[0];
            this.setState({
                url: id
            })
        } else {
            id = this.state.url;
        }
        this.props.getReportDetailRequested(id);
    }
    fileNameChange(e){
        const {value} = e.target;
        this.setState({
             reportName:value
        })
    }
    showModal(){
        if(this.props.docList.length ===0){
               message.error('该报告内素材为空');
               return;
        }
         this.setState({
            fileNameVisible:true
         })
    }
    handleCancel(){
        this.setState({
            fileNameVisible:false
         })
    }
    handleOk(){
        this.setState({
            fileNameVisible:false,
            downloadVisible:true
         })
         let time=formatDateTime(new Date());
         request(api_check_report + '&reportid='+this.state.url).then(res=>{
             if(res.data.code==='1'){
                   message.error('当前报告内容为空，请添加后再生成报告')
                   return;
             }else{
                 request(api_allopinion_exportskip,{
                     method: 'POST',
                     headers: {
                           "Content-Type": "application/x-www-form-urlencoded"
                     }, 
                    body:`source=work&taskname=${this.state.reportName}&taskstate=0&documenttype=doc&createdate=${time}&reportid=${this.state.url}`
                   })
                   this.props.reportMessage({id:2,type:'2'})
             }
         })
    }
    downloadHandleOk(){
        this.setState({
            downloadVisible:false
         })
         history.push({
            pathname:'/allopinion/historyopinion',
            search:'type=2'
         });
    }
    downloadHandleCancel(){
        this.setState({
            downloadVisible:false
         })
    }
    materiaHandleOk(){
        this.setState({
            materiaVisible:false,
            checkboxState:false
        })
        const sidList = JSON.stringify(this.state.sids);
        request(api_put_into_report + '&reportid=' + this.state.url + '&sid=' + sidList).then(res=>{
               if(res.data.code===1){
                     message.success(res.data.msg);
                     this.props.getReportDetailRequested(this.state.url);
               }else{
                     message.error(res.data.msg);
               }
        })
 }
 materiaHandleCancel(){
         this.setState({
             materiaVisible:false
         })
  }
  getSids = (sids) =>{
        this.setState({
             sids:sids
        })
  }
    render() {
        const docList = this.props.docList ? this.props.docList : [{carry: '新闻'}];
        const OpinionDetailItems = docList.map((item, index) =>
            <li key={item.id} className="opinion-detail-item">
                <div className="item-top">
                    <Checkbox
                        checked={this.state.arr[index]}
                        onChange={this.onChange.bind(this,index)}
                    />
                    <div className="negative">
                        <div className="inner-type" style={opinionColor(item.negative)}>
                            {opinionTrend(item.negative)}
                        </div>
                    </div>
                    <div className="title" title={item.title} onClick={this.clickItemTitle.bind(this, item.sid)}>{item.title}</div>
                </div>
                <div className="item-middle">
                    <div className="left">
                        <div>
                            <span className="summary">{item.summary}</span>
                            <span className="similar-info">相似信息：{0}条</span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="base-operate">
                            <Tooltip title="移出报告">
                                <i className="fa fa-arrow-circle-right" aria-hidden="true" onClick={this.removeThisFromReport.bind(this,item.id)}/>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="item-bottom">
                    <div className="key">
                        <div className="title">关键词：</div>
                        <div className="keywords">
                            {item.nztags}
                        </div>
                    </div>
                    <div className="resource">
                        <a href="">
                            <Icon type="link" />
                            <span className="source">{item.source}</span>
                        </a>
                    </div>
                    <div className="pubdate">
                        <span className="date">{item.pubdate}</span>
                    </div>
                </div>
            </li>
        );
        return (
            <div className="report-opinion-detail">
                <div className="detail">
                    <div className="top">
                        <div className="left">
                            <div className="choose-all">
                                <Checkbox
                                    checked={this.state.checkedAll}
                                    onChange={this.onAllChange.bind(this)}
                                >全选</Checkbox>
                            </div>
                            <div className="operate-all">
                                {/* <span>预览</span> */}
                            </div>
                        </div>
                        <div className="right">
                            <Button type="primary" className="right-btn" onClick={this.goBackReportOpinionList.bind(this)}>返回列表</Button>
                            <Button type="primary" className="right-btn" onClick={this.goToMaterialOpinion.bind(this)}>从素材库选择</Button>
                            <Button type="primary" className="right-btn" onClick={this.showModal.bind(this)}>生成简报</Button>
                        </div>
                    </div>
                    <div className="bottom">
                        <ul className="opinion-detail-wrapper">
                            {this.props.docList!==undefined && this.props.docList.length!==0 ? OpinionDetailItems : <BlankPage desc='未查找到数据！'/>}
                        </ul>
                    </div>
                    <div className="pagintion-wrapper">
                        {/*<Pagination showSizeChanger*/}
                                    {/*className="pagintion"*/}
                                    {/*defaultCurrent={1}*/}
                                    {/*defaultPageSize={20}*/}
                                    {/*onChange={this.onPaginationChange.bind(this)}*/}
                                    {/*onShowSizeChange={this.onShowSizeChange.bind(this)}*/}
                                    {/*total={pageInfo.pageCount}*/}
                        {/*/>*/}
                    </div>
                </div>
                <Modal
                  title="命名该文件"
                  visible={this.state.fileNameVisible}
                  onCancel={this.handleCancel.bind(this)}
                  footer={null}
                  className="fileMdal"
                > 
                <Input value={this.state.reportName} 
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
                <Modal
                    title="从素材库选择"
                    visible={this.state.materiaVisible}
                    onOk={this.materiaHandleOk.bind(this)}
                    onCancel={this.materiaHandleCancel.bind(this)}
                    width="80%"                 
                >   
                    <div  style={{overflow:'auto',height:'500px'}}>
                    <MaterialOpinion  getSids={this.getSids} 
                    checkboxState={{num:this.state.checkboxNum,state:false}}
                    />
                    </div>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        docList: state.getReportDetailSucceeded.data.docList,
        pageInfo: state.getReportDetailSucceeded.data.pageInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getReportDetailRequested: req => {
            dispatch(getReportDetailRequested(req));
        },
        reportMessage:data=>{
            dispatch(reportMessage(data));
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(ReportOpinionDetail);

