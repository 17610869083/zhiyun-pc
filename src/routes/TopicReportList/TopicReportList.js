import React from 'react';
import {Button,  Modal, Input, Form, Checkbox} from 'antd';
const FormItem = Form.Item;
class TopicReportList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            createReportModalVisible:false,
            reportValue:'',
            deleteMultipleModalVisible:false,
            sidArr:[]
        }
    }
    

    createReport(){

    }

    handleCreateReportOk(){

    }
    handleCreateReportCancel(){

    }
    reportChange(){

    }
    deleteMultipleReport(){

    }
    handleDeleteMultipleOk(){

    }
    handleDeleteMultipleCancel(){

    }
    handleCreateReportSubmit(){

    }
    render(){
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
          return (
            <div>                  
            <div className="route-report-opinion">
            <div className="top">
            <div>
            <Button type="primary" onClick={this.createReport.bind(this)}>新建简报</Button>
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
                            maxLength={'28'}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
            <Button type="primary" className="delete-multiple-btn" onClick={this.deleteMultipleReport.bind(this)}>批量删除</Button>
            <Modal
                title="批量删除简报"
                visible={this.state.deleteMultipleModalVisible}
                onOk={this.handleDeleteMultipleOk.bind(this)}
                onCancel={this.handleDeleteMultipleCancel.bind(this)}
            >
                <div>确定删除您选中的 <span style={{color: 'red'}}>{this.state.sidArr.length}</span> 份简报？</div>
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
                                        // checked={this.state.allCheacked}
                                        // onChange={this.onAllChange.bind(this)}
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
                                {/* {dataNewList} */}
                            </ul>
                    </div>
                </div>
                <div className="paginationBox">
                    {/* <Pagination showSizeChanger
                    className="pagintion"
                    defaultCurrent={1}
                    defaultPageSize={10}
                    onChange={this.onPaginationChange.bind(this)}
                    onShowSizeChange={this.onShowSizeChange.bind(this)}
                    total={pageInfo.rowcount}
                    current={parseInt(pageInfo.page,10)}
                    getPopupContainer={ () => document.querySelector('.route-report-opinion')}
                     /> */}
                    </div>
            </div>
            {/* <Modal
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
                </Modal> */}
            </div>
          )
    }
}

export default Form.create()(TopicReportList);