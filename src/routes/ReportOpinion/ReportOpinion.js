import React from 'react';
import 'whatwg-fetch';
import {connect} from 'react-redux';
import './ReportOpinion.less';
import request from '../../utils/request';
import {Button,  Tooltip, Modal, Input, Form,  message,Checkbox,Pagination} from 'antd';
import {history} from '../../utils/history';
import { api_add_report, api_delete_report, api_edit_report ,
    api_allopinion_exportskip,api_check_report,api_del_report} from '../../services/api';
import {
    getReportListRequested,
    exportSkip,
    reportMessage
} from '../../redux/actions/createActions';
import {formatDateTime} from '../../utils/format';
import BlankPage from '../../base/Exception/BlankPage';
const confirm = Modal.confirm;
const FormItem = Form.Item;
class TopicReport extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            sendModalVisible: false,
            uploadModalVisible: false,
            deleteMultipleModalVisible: false,
            createReportModalVisible: false,
            chooseItemId: "0",
            reportData: [{
                id: 111,
                key: '1',
                name: 'John',
                date: '2017-11-11 11:11',
                address: 'New York No. 1 Lake Park',
            }],
            reportMessage:{},
            selectedRowKeys:[],
            arr: new Array(40).fill(false),
            flag:false,
            pageinfo:{rowcount:0,page:1,pagesize:10},
            sidArr:[],
            fileNameVisible:false,
            downloadVisible:false,
            fileName:'',
            report:'',
            reportValue:'',
            allCheacked:false,
            chooseItemName:''
        }
    }

    componentWillMount() {
        this.props.getReportListRequested({pagesize:10,page:1});
    }

    // 导出word
    outputReportAsWord(record) {
        let time=formatDateTime(new Date());
        request(api_check_report + '&reportid='+record.id).then(res=>{
               if(res.data.code==='1'){
                     message.error('当前报告内容为空，请添加后再生成报告')
                     return;
               }else{
                      request(api_allopinion_exportskip,{
                       method: 'POST',
                       headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                        body:`source=work&taskname=${record.name}&taskstate=0&documenttype=doc&createdate=${time}&reportid=${record.id}`
                            })
                            this.props.exportSkip('11');
                            record.type='2';
                            this.props.reportMessage(record);
                            history.push({
                                pathname:'/historyopinion',
                                search:'type=2'
                            });
                                    }
                            })


    }
    // 删除报告
    deleteReport(id) {
        const getReportListRequested = this.props.getReportListRequested;
        let pageInfo=this.state.pageinfo;
        confirm({
            title: '确认删除该简报？',
            content: '删除简报',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                request(api_delete_report + '&reportid=' + id, {}).then(res => {
                    getReportListRequested({pagesize:pageInfo.pagesize,page:pageInfo.page});
                    message.success(res.data.msg);
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    // 修改报告
    editReport(record) {
        this.setState({
            visible: true,
            chooseItemId: record.id,
            chooseItemName:record.name
        })
    }
    // 确认修改报告
    handleOk(record) {
      const reportName=this.state.chooseItemName;
      const getReportListRequested = this.props.getReportListRequested;
     if(reportName.length>=15){
            message.error('简报名称请不要大于15个字符');
            return;
      }
      this.setState({
          visible: false
      })
      request(api_edit_report + '&reportid=' + this.state.chooseItemId + '&reportname=' + reportName, {}).then(res => {
          getReportListRequested({pagesize:10,page:1});
          message.success(res.data.msg);
      })
    }
    // 取消修改报告
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    // 预览报告
    previewReport(record) {
        console.log(record);
    }
    // 确认发送报告
    handleSendOk(record) {
        const id = record.key;
        this.setState({
            sendModalVisible: false,
            chooseItemId: id
        });
        this.handleSendFormSubmit();
    }
    // 取消发送报告
    handleSendCancel() {
        this.setState({
            sendModalVisible: false
        })
    }
    // 提交发送表单
    handleSendFormSubmit() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    // 简报批量删除
    deleteMultipleReport() {
        let sidArr=this.checkedIdTrue();
        if (sidArr.length === 0) {
            message.warning("至少选择一份简报！");
            return;
        }

        this.setState({
            deleteMultipleModalVisible: true
        })
    }
    checkedIdTrue() {
        const arr = [];
        this.props.reportData.forEach((item, index) => {
            if (this.state.arr[index] === true && item.id) {
                arr.push(item.id);
            }
        });
        return arr;
    }
    // 确认批量删除
    handleDeleteMultipleOk() {
        let sidArr=this.checkedIdTrue();
        let pageInfo=this.state.pageinfo;
        request(api_del_report,{
            method: 'POST',
            headers: {
                     "Content-Type": "application/x-www-form-urlencoded"
                 },
             body: `reportid=[${sidArr}]`
        }).then(res=>{
             if(res.data.code===1){
                message.success(res.data.msg);
                this.props.getReportListRequested({pagesize:pageInfo.pagesize,page:pageInfo.page});
                this.setState({
                    arr: new Array(40).fill(false)
                })
             }
        })
        this.setState({
            deleteMultipleModalVisible: false
        })
    }
    // 取消批量删除
    handleDeleteMultipleCancel() {
        this.setState({
            deleteMultipleModalVisible: false
        })
    }


    // 创建简报
    createReport(e) {
        e.preventDefault();
        this.setState({
            createReportModalVisible: true
        })
    }
    // 确认创建简报
    handleCreateReportOk() {

        this.handleCreateReportSubmit();
    }
    // 取消创建简报
    handleCreateReportCancel() {
        this.setState({
            createReportModalVisible: false
        });
    }
    // 创建提交
    handleCreateReportSubmit() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const newReportName = values.newReportName;
                if(newReportName.length>14){
                      message.error('简报名称请不要大于14个字符');
                      return;
                }
                request(api_add_report + '&reportname=' + newReportName, {}).then(res => {
                    message.success(res.data.msg);
                    this.props.getReportListRequested({pagesize:10,page:1});
                })
                this.setState({
                    createReportModalVisible: false
                });
            }
        });
    }


    // 跳转到报告详情页
    linkToReportDetail(record,e) {
        e.preventDefault();
        this.props.exportSkip(record.name)
        history.push({
            pathname: '/reportopinion/detail',
            search: `?id=${record.id}`
        });
    }
    onChange(index,e){
        const arr = this.state.arr;
        arr[index] = e.target.checked;
        let sidArr=this.checkedIdTrue();
        this.setState({
            arr: arr,
            sidArr: sidArr
        });
    }
    onAllChange(e) {
        const arr = this.state.arr.fill(!this.state.flag);
        let sidArr=this.checkedIdTrue();
        this.setState({
            arr: arr,
            flag:!this.state.flag,
            sidArr:sidArr,
            allCheacked:!this.state.allCheacked
        });
    }
    onPaginationChange(page){
            let pageInfo=this.state.pageinfo;
            pageInfo.page=page;
            this.props.getReportListRequested({pagesize:pageInfo.pagesize,page:pageInfo.page});
            this.setState({
                pageinfo:pageInfo
            })
    }
    onShowSizeChange(current, pageSize){
            this.props.getReportListRequested({pagesize:pageSize,page:current});
    }

    showModal(record){
         request(api_check_report + '&reportid='+record.id).then(res=>{
                if(res.data.code==='1'){
                      message.error('当前报告内容为空，请添加后再生成报告')
                      return;
                }else{
                       this.setState({
                        fileNameVisible:true,
                        fileName:record.name,
                        report:record
                       })

                     }
            })
    }
    fileNameChange(e){
         const {value} = e.target;
         this.setState({
            fileName:value
         })
    }
    handleOkFileName(){
        this.setState({
            fileNameVisible:false,
            downloadVisible:true
         })

        let time=formatDateTime(new Date());
        request(api_allopinion_exportskip,{
            method: 'POST',
            headers: {
                     "Content-Type": "application/x-www-form-urlencoded"
                 },
             body:`source=work&taskname=${this.state.fileName}&taskstate=0&documenttype=doc&createdate=${time}&reportid=${this.state.report.id}`
                 })
                 this.props.exportSkip('11');
                 let reportMessage= this.state.report;
                 reportMessage.type='2';
                 this.props.reportMessage(reportMessage);

    }
    handleCancelFileName(){
        this.setState({
            fileNameVisible:false
        })
    }
    downloadHandleOk(){
        history.push({
           pathname:'/historyopinion',
           search:'type=2'
          });
        this.setState({
            downloadVisible:false
        })
    }
    downloadHandleCancel(){
        this.setState({
            downloadVisible:false
        })
    }
    reportChange(e){
         const {value} = e.target;
         if(value.length>=14){
              message.error('简报名称请不要超过14个字符')
         }
         this.setState({
            reportValue: value
         })
    }
    chooseNameChange(e){
          const {value} = e.target;
          this.setState({
               chooseItemName:value
          })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { reportData } = this.props;
        const pageInfo=reportData[0]!==undefined?reportData[0]['pageinfo']:{rowcount:10,page:1}
        const dataNewList =reportData[0]!==undefined?reportData.map((item, index) =>
        <li key={item.id} className="opinion-detail-item">
             <div className="reportConent">
                <div className="checkBox">
                <Checkbox
                    checked={this.state.arr[index]}
                    onChange={this.onChange.bind(this,index)}
                />
                </div>
                <div className="reportMessage">
                    <div className="reportName" onClick={this.linkToReportDetail.bind(this, item)}
                    title="点击进入报告"
                    >{item.name}</div>

                </div>
                <div className="reportDates">{item.date}</div>
                <div className="reportCunt">
                  <div className="reportNames">
                  {item.count===''?0:item.count}条素材
                  </div>
                </div>
                <div className="reportOperation">
                   <div className="deleteReport">
                   <Tooltip title="生成报告">
                        <i className="fa fa-file-word-o" aria-hidden="true" onClick={this.showModal.bind(this,item)}/>
                    </Tooltip>
                    </div>
                    <div className="deleteReport">
                    <Tooltip title="删除报告">
                        <i className="fa fa-trash-o" aria-hidden="true" onClick={this.deleteReport.bind(this,item.id)}/>
                    </Tooltip>
                    </div>
                    <div className="deleteReport">
                    <Tooltip title="修改报告">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={this.editReport.bind(this,item)}/>
                    </Tooltip>
                    </div>
                </div>
            </div>
        </li>
    ):<BlankPage desc="报告素材夹为空，请手动添加"/>;
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
        return (
           <div>
            <div className="route-report-opinion">
            <div className="top">
            <div>
            <Button type="primary" onClick={this.deleteMultipleReport.bind(this)}>批量删除</Button>
            <Modal
                title="批量删除简报"
                visible={this.state.deleteMultipleModalVisible}
                onOk={this.handleDeleteMultipleOk.bind(this)}
                onCancel={this.handleDeleteMultipleCancel.bind(this)}
            >
                <div>确定删除您选中的 <span style={{color: 'red'}}>{this.state.sidArr.length}</span> 份简报？</div>
            </Modal>
            <Button type="primary" className="new-multiple-btn" onClick={this.createReport.bind(this)}>新建简报</Button>
            <Modal
                title="新建简报"
                visible={this.state.createReportModalVisible}
                onOk={this.handleCreateReportOk.bind(this)}
                onCancel={this.handleCreateReportCancel.bind(this)}
            >
                <Form onSubmit={this.handleCreateReportSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label="简报名称">
                        {getFieldDecorator('newReportName', {
                               initialValue:this.state.reportValue
                        })(
                            <Input
                            onChange={this.reportChange.bind(this)}
                            maxLength={'14'}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
            </div>
        </div>
                <div className="report">

                    <div className="middle">
                        {/* <Table
                            bordered
                            rowSelection={rowSelection}
                            columns={columns}
                            style={{fontSize: '22px'}}
                            dataSource={dataNew}

                            // /> */}
                            <ul>
                                <li className="opinion-detail-item">
                                <div className="reportConent">
                                    <div className="checkBox">
                                    <Checkbox
                                        checked={this.state.allCheacked}
                                        onChange={this.onAllChange.bind(this)}
                                    />
                                    </div>
                                    <div className="reportMessage">
                                          简报名称
                                    </div>
                                    <div className="reportDate">
                                          日期
                                    </div>
                                    <div className="reportCunt">
                                          数量
                                    </div>
                                    <div className="reportOperation-other">
                                          操作
                                    </div>
                                    </div>
                                </li>
                                {dataNewList}
                            </ul>
                    </div>
                </div>
                <div className="paginationBox">
                    <Pagination showSizeChanger
                    className="pagintion"
                    defaultCurrent={1}
                    defaultPageSize={10}
                    onChange={this.onPaginationChange.bind(this)}
                    onShowSizeChange={this.onShowSizeChange.bind(this)}
                    total={pageInfo.rowcount}
                    current={parseInt(pageInfo.page,10)}
                    getPopupContainer={ () => document.querySelector('.route-report-opinion')}
                     />
                    </div>
            </div>
            <Modal
                  title="命名该文件"
                  visible={this.state.fileNameVisible}
                  onCancel={this.handleCancelFileName.bind(this)}
                  footer={null}
                  className="fileMdal"
                >
                <Input value={this.state.fileName}
                onChange={this.fileNameChange.bind(this)}
                maxLength={'20'}
                ></Input>
                <Button type="primary"
                style={{margin:'20px 0 0 214px',width:'60px',height:'30px'}}
                onClick={this.handleOkFileName.bind(this)}
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
                    title="修改简报名称"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                        >
                        <Input
                            value={this.state.chooseItemName}
                            maxLength={'15'}
                            onChange={this.chooseNameChange.bind(this)}
                        />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reportData: state.getReportListSucceeded.data
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getReportListRequested: (req) => {
            dispatch(getReportListRequested(req));
        },
        exportSkip:key=>{
            dispatch(exportSkip(key));
        },
        reportMessage:data=>{
            dispatch(reportMessage(data));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TopicReport));
