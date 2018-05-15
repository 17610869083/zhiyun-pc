import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Icon, Tooltip, Pagination, Input, Menu, Dropdown, Modal, Form, message } from 'antd';
import request from '../../utils/request';
import {
    api_add_collection_opinion,
    api_delete_collection_opinion,
    api_edit_collection_opinion,
    api_del_doc_from_collection,
    api_put_into_report,
    api_push_material
} from '../../services/api';
import { opinionTrend, opinionColor } from '../../utils/format';
import {
    opinionSearchRequested,
    getCollectionOpinionDetailRequested,
    getCollectionOpinionListRequested,
    getReportListRequested,
    getMaterialOpinionListRequested
} from '../../redux/actions/createActions';

import './CollectionOpinion.less';
import BlankPage from '../../base/Exception/BlankPage';
const Search = Input.Search;
const confirm = Modal.confirm;
const FormItem = Form.Item;

class CollectionOpinion extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 21,
            currentPage: 1,
            pageSize: 20,
            removeModalVisible: false,
            outputModalVisible: false,
            addCollectionVisible: false,
            CollectionCurrent: 0,
            CollectionListItemId: 0,
            renameCollectionVisible: false,
            CollectionName: '',
            checkedLength: 0,
            checked: false,
            checkedAll: false,
            arr: new Array(40).fill(false),
            materialSid: '',
            CollectionValue: ''
        };
    }

    // 点击标题跳转
    clickItemTitle(sid) {
        window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
    }

    // -----------新增收藏库
    showAddCollection() {
        this.setState({
            addCollectionVisible: true
        })
    }
    handleAddCollectionOk() {
        this.handleAddCollectionSubmit();
    }
    handleAddCollectionCancel() {
        this.setState({
            addCollectionVisible: false
        })
    }
    handleAddCollectionSubmit() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                request(api_add_collection_opinion + '&catname=' + values.CollectionName, {}).then(res => {
                    if (res.data.code === 1) {
                        message.success(res.data.msg);
                    } else if (res.data.code === 2) {
                        message.warning(res.data.msg);
                    } else {
                        message.error(res.data.msg);
                    }
                    this.setState({
                        addCollectionVisible: false
                    });
                    this.props.getCollectionOpinionListRequested();
                });
            }
        });
    }


    // --------------在收藏库内搜索
    handleSearchBtn(keyword) {
        if (keyword !== '') {
            this.props.getCollectionOpinionDetailRequested(`${this.state.CollectionCurrent}&q=${keyword}`);
        }
        console.log(keyword);
    }

    // 单项加入素材库
    handleAddCollectionMenu(e) {
        const sid = this.state.materialSid;
        const materialId = e.key;
        request(api_push_material + '&catid=' + materialId + '&sid=["' + sid + '"]', {}).then((res) => {
            if (res.data.code === 1) {
                message.success(res.data.msg);
            }
        });
    }
    // 获取素材库列表
    getMaterialOpinionList(sid) {
        this.props.getMaterialOpinionListRequested();
        this.setState({
            materialSid: sid
        });
    }


    // 单项加入简报
    handleAddReportMenu(e) {
        const sid = this.state.materialSid;
        const reportId = e.key;
        request(api_put_into_report + '&reportid=' + reportId + '&sid=["' + sid + '"]', {}).then((res) => {
            if (res.data.code === 1) {
                message.success(res.data.msg);
            }
        });
    }
    // 获取报告列表
    getReportOpinionList(sid) {
        this.props.getReportListRequested({ pagesize: 1000, page: 1 });
        this.setState({
            materialSid: sid
        });
    }

    // 删除单项
    deleteThisFormCollection(itemId) {
        const current = this.state.current;
        const getDetail = this.props.getCollectionOpinionDetailRequested;
        confirm({
            title: '确定将这条舆情移出收藏夹?',
            content: '移出收藏夹',
            onOk() {
                request(api_del_doc_from_collection + '&id=[' + itemId + ']', {}).then((res) => {
                    if (res.data.code === 1) {
                        message.success(res.data.msg);
                        getDetail(current);
                    }
                });
            },
            onCancel() {
                console.log('取消');
            },
        });
    }


    // -----------------移除多项
    checkedTrue() {
        const arr = [];
        this.props.docList.forEach((item, index) => {
            if (this.state.arr[index] === true && item.sid) {
                arr.push(item.sid);
            }
        });
        return arr;
    }
    checkedIdTrue() {
        const arr = [];
        this.props.docList.forEach((item, index) => {
            if (this.state.arr[index] === true && item.id) {
                arr.push(item.id);
            }
        });
        return arr;
    }
    showRemoveModal() {
        const arr = this.checkedIdTrue();
        const length = arr.length;
        this.setState({
            checkedLength: length,
            removeModalVisible: true
        })
    }
    handleRemoveOk() {
        const arr = this.checkedIdTrue();
        const size = arr.length;
        const getMaterialDetail = this.props.getCollectionOpinionDetailRequested;
        const current = this.state.current;
        if (size === 0) {
            message.warning("至少选择一项！");
        } else {
            const sidList = JSON.stringify(arr);
            request(api_del_doc_from_collection + '&id=' + sidList, {}).then((res) => {
                if (res.data.code === 1) {
                    getMaterialDetail(current);
                    message.success(res.data.msg);
                    this.setState({
                        checkedAll: false,
                        arr: new Array(40).fill(false)
                    });
                }
            });
        }
        this.setState({
            removeModalVisible: false
        })
    }
    handleRemoveCancel() {
        this.setState({
            removeModalVisible: false
        })
    }

    // -----------------多项加入简报
    handleAddMultipleReportMenu(e) {
        const arr = this.checkedTrue();
        const size = arr.length;
        const reportid = e.key;
        if (size === 0) {
            message.warning("至少选择一项！");
        } else {
            const sidList = JSON.stringify(arr);
            request(api_put_into_report + '&reportid=' + reportid + '&sid=' + sidList, {}).then((res) => {
                if (res.data.code === 1) {
                    message.success(res.data.msg);
                    this.setState({
                        checkedAll: false,
                        arr: new Array(40).fill(false)
                    });
                }
            });
        }
    }


    // ----------------多项加入素材库
    handleAddMultipleMaterialMenu(e) {
        const arr = this.checkedTrue();
        const size = arr.length;
        const materialId = e.key;
        if (size === 0) {
            message.warning("至少选择一项！");
        } else {
            const sidList = JSON.stringify(arr);
            request(api_push_material + '&catid=' + materialId + '&sid=' + sidList, {}).then((res) => {
                if (res.data.code === 1) {
                    message.success(res.data.msg);
                    this.setState({
                        checkedAll: false,
                        arr: new Array(40).fill(false)
                    });
                }
            });
        }
    }

    // 左侧收藏库选项
    handleMeterialNavigation(itemId, index) {
        this.setState({
            current: itemId,
            CollectionCurrent: index
        });
        this.props.getCollectionOpinionDetailRequested(`${itemId}`);
    }

    // 分页
    onPaginationChange(page) {
        if (page !== '') {
            this.props.getCollectionOpinionDetailRequested(`${this.state.current}&page=${page}&pagesize=${this.state.pageSize}`);
            this.setState({
                currentPage: page,
                arr: new Array(40).fill(false),
                checkedAll: false
            })
        }
    }

    // 每页显示数量
    onShowSizeChange(current, pageSize) {
        this.props.getCollectionOpinionDetailRequested(`${this.state.current}&page=${this.state.currentPage}&pagesize=${pageSize}`);
        this.setState({ pageSize: pageSize })
    }

    componentWillMount() {
        this.props.getCollectionOpinionListRequested();
        setTimeout(() => {
            this.props.getCollectionOpinionDetailRequested(21);
        }, 10);
    }

    // ---------单选与全选
    onChange(index, e) {
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

    // -------------列表项编辑和删除
    onClickCollectionListItem(id) {
        this.setState({
            CollectionListItemId: id
        })
    }
    onClickCollectionListItemDelete({ key }) {
        if (key === 'delete') {
            this.deleteCollection(this.state.CollectionListItemId);
        } else if (key === 'rename') {
            this.setState({ renameCollectionVisible: true })
        }
    }
    deleteCollection(id) {
        const getCollectionOpinionListRequested = this.props.getCollectionOpinionListRequested;
        confirm({
            title: '您确定要删除本收藏夹吗?',
            content: '删除收藏夹，里面的舆情也会一并移除。',
            onOk() {
                request(api_delete_collection_opinion + '&catid=' + id, {}).then(res => {
                    if (res.data.code === 1) {
                        message.success(res.data.msg);
                    } else {
                        message.error(res.data.msg);
                    }
                    getCollectionOpinionListRequested();
                });
            },
            onCancel() {
                message.info('您取消了删除操作。')
            },
        });
    }
    handleRenameCollectionOk() {
        const getCollectionOpinionListRequested = this.props.getCollectionOpinionListRequested;
        const id = this.state.CollectionListItemId;
        const name = this.state.CollectionName;
        request(api_edit_collection_opinion + '&id=' + id + '&catname=' + name, {}).then(res => {
            if (res.data.code === 1) {
                message.success(res.data.msg);
            } else {
                message.error(res.data.msg);
            }
            getCollectionOpinionListRequested();
            this.setState({ renameCollectionVisible: false });
        });
    }
    handleRenameCollectionCancel() {
        this.setState({ renameCollectionVisible: false })
    }
    onChangeCollectionName(e) {
        if (e.target.value.length >= 15) {
            message.error('收藏夹名称请不要大于14个字符');
            return;
        }
        this.setState({ CollectionName: e.target.value });
    }

    CollectionChange(e) {
        const { value } = e.target;
        this.setState({
            CollectionValue: value
        })
        if (value.length >= 14) {
            message.error('素材夹名称请不要超过14个字符');
        }
    }
    render() {
        const { pageInfo, favCatList, materialList, reportData } = this.props;
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

        // 单条舆情加入素材库
        const addCollectionMenu = (
            <Menu onClick={this.handleAddCollectionMenu.bind(this)}>
                {
                    materialList ? materialList.map(item =>
                        <Menu.Item key={item.id}>{item.catname}</Menu.Item>
                    ) : <Menu.Item key="0">默认简报</Menu.Item>
                }
            </Menu>
        );

        // 单条舆情加入简报
        const addReportMenu = (
            <Menu onClick={this.handleAddReportMenu.bind(this)}>
                {
                    reportData ? reportData.map(item =>
                        <Menu.Item key={item.id}>{item.name}</Menu.Item>
                    ) : <Menu.Item key="0">默认简报</Menu.Item>
                }
            </Menu>
        );

        // 多项加入素材库
        const addMultipleCollectionMenu = (
            <Menu onClick={this.handleAddMultipleMaterialMenu.bind(this)}>
                {
                    materialList ? materialList.map(item =>
                        <Menu.Item key={item.id}>{item.catname}</Menu.Item>
                    ) : <Menu.Item key="0">默认简报</Menu.Item>
                }
            </Menu>
        );

        // 多项加入简报
        const addMultipleReportMenu = (
            <Menu onClick={this.handleAddMultipleReportMenu.bind(this)}>
                {
                    reportData ? reportData.map(item =>
                        <Menu.Item key={item.id}>{item.name}</Menu.Item>
                    ) : <Menu.Item key="0">默认简报</Menu.Item>
                }
            </Menu>
        );

        const docList = this.props.docList ? this.props.docList : [{ carry: '新闻' }];
        const OpinionDetailItems = docList.length !== 0 ? docList.map((item, index) =>
            <li key={item.sid} className="opinion-detail-item">
                <Checkbox className="labe"
                    checked={this.state.arr[index]}
                    onChange={this.onChange.bind(this, index)}
                />
                <div className="item-top">
                    <div className="conent">
                        <div className="negative">
                            <div className="inner-type" style={opinionColor(item.negative)}>
                                {opinionTrend(item.negative)}
                            </div>
                        </div>
                        <div className="title" title={item.title} onClick={this.clickItemTitle.bind(this, item.sid)}>
                            {item.title !== undefined && item.title.length > 58 ? item.title.slice(0, 58) + '...' : item.title}
                        </div>
                    </div>
                    <div className="item-bottom">
                        <div className="resource">
                            <a href="">
                                <span className="source">{item.source}</span>
                            </a>
                        </div>

                    </div>
                </div>


                <div className="item-middle">

                    <div className="right">
                        <div className="base-operate">
                            <Tooltip title="加入素材库">
                                <Dropdown overlay={addCollectionMenu} trigger={['click']}
                                    getPopupContainer={() => document.querySelector('.collection-opinion-wrapper')}
                                >
                                    <i className="fa fa-book" aria-hidden="true"
                                        onClick={this.getMaterialOpinionList.bind(this, item.sid)}
                                    />
                                </Dropdown>
                            </Tooltip>
                            <Tooltip title="加入简报">
                                <Dropdown overlay={addReportMenu} trigger={['click']}
                                    getPopupContainer={() => document.querySelector('.collection-opinion-wrapper')}
                                >
                                    <i className="fa fa-file-text" aria-hidden="true"
                                        onClick={this.getReportOpinionList.bind(this, item.sid)}
                                    />
                                </Dropdown>
                            </Tooltip>
                            <Tooltip title="从收藏夹移除">
                                <i className="fa fa-arrow-circle-right" aria-hidden="true" onClick={this.deleteThisFormCollection.bind(this, item.id)} />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </li>
        ) : <BlankPage desc='暂无信息，请在汇总舆情内加入相应信息' />;

        const CollectionSetMenu = (
            <Menu onClick={this.onClickCollectionListItemDelete.bind(this)}>
                <Menu.Item key="rename">
                    <span>重命名</span>
                </Menu.Item>
                <Menu.Item key="delete">
                    <span>删除</span>
                </Menu.Item>
            </Menu>
        );

        return (<div className="collection-opinion-wrapper">
            <div className="collection-opinion">

                <div className="opinion-list">
                    <div className="top">
                        <div className="left">
                            <div className="choose-all">
                                <Checkbox checked={this.state.checkedAll} onChange={this.onAllChange.bind(this)}>全选</Checkbox>
                            </div>
                            <div className="operate-all">
                                <span onClick={this.showRemoveModal.bind(this)}>移出收藏夹</span>
                                <Modal title="移出收藏夹" visible={this.state.removeModalVisible} onOk={this.handleRemoveOk.bind(this)} onCancel={this.handleRemoveCancel.bind(this)}>
                                    <div>确定将这
                <b>{this.state.checkedLength}</b>
                                        项从素材库移出吗？</div>
                                </Modal>
                            </div>
                            <div className="operate-all" onClick={this.props.getReportListRequested.bind(this)}>
                                <Dropdown overlay={addMultipleReportMenu} trigger={['click']} getPopupContainer={() => document.querySelector('.collection-opinion-wrapper')}>
                                    <span>加入简报</span>
                                </Dropdown>
                            </div>
                            <div className="operate-all" onClick={this.props.getMaterialOpinionListRequested.bind(this)}>
                                <Dropdown overlay={addMultipleCollectionMenu} trigger={['click']} getPopupContainer={() => document.querySelector('.collection-opinion-wrapper')}>
                                    <span>加入素材库</span>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="right">
                            <Search style={{
                                width: '200px',
                                marginRight: '20px'
                            }} placeholder="请输入您要搜索的内容" onSearch={this.handleSearchBtn.bind(this)} />
                        </div>
                    </div>
                    <div className="bottom">
                        <ul className="opinion-detail-wrapper">
                            {
                                this.props.docList
                                    ? OpinionDetailItems
                                    : <div>数据为空！</div>
                            }
                        </ul>
                    </div>
                    <div className="pagintion-wrapper">
                        <Pagination showSizeChanger={true} className="pagintion" defaultCurrent={1} defaultPageSize={20} onChange={this.onPaginationChange.bind(this)} onShowSizeChange={this.onShowSizeChange.bind(this)} total={pageInfo === undefined
                            ? 0
                            : pageInfo.rowcount} current={parseInt(
                                pageInfo === undefined
                                    ? 0
                                    : pageInfo.page,
                                10)} getPopupContainer={() => document.querySelector('.collection-opinion-wrapper')} />
                    </div>
                </div>

                <div className="left-boxes">
                    <div className="first-box">
                        <div className="top" onClick={this.showAddCollection.bind(this)}>
                            +新增收藏夹

          <Modal title="新增收藏夹" visible={this.state.addCollectionVisible} onOk={this.handleAddCollectionOk.bind(this)} onCancel={this.handleAddCollectionCancel.bind(this)}>
                                <Form onSubmit={this.handleAddCollectionSubmit.bind(this)}>
                                    <FormItem {...formItemLayout} label="收藏夹名称">
                                        {
                                            getFieldDecorator('CollectionName', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '名称不能为空！'
                                                    }
                                                ],
                                                initialValue: this.state.CollectionValue
                                            })(<Input onChange={this.CollectionChange.bind(this)} maxLength={'14'} />)
                                        }
                                    </FormItem>
                                </Form>
                            </Modal>
                        </div>
                        <div className="bottom">
                            <ul className="collection-list">
                                {
                                    favCatList.map((item, index) => <li key={item.id} className={this.state.CollectionCurrent === index
                                        ? 'collection-list-item-active'
                                        : 'collection-list-item'}>
                                        <span className="collection-name" onClick={this.handleMeterialNavigation.bind(this, item.id, index)} title={item.catname}>{item.catname}</span>
                                        <span>
                                            {
                                                item.type === 1
                                                    ? <Dropdown overlay={CollectionSetMenu} trigger={['click']} getPopupContainer={() => document.querySelector('.collection-opinion-wrapper')}>
                                                        <Icon type="setting" style={{
                                                            fontSize: '18px'
                                                        }} className="collection-icon" onClick={this.onClickCollectionListItem.bind(this, item.id)} />
                                                    </Dropdown>
                                                    : null
                                            }
                                        </span>
                                    </li>)
                                }
                            </ul>
                            <Modal title="收藏夹重命名" visible={this.state.renameCollectionVisible} onOk={this.handleRenameCollectionOk.bind(this)} onCancel={this.handleRenameCollectionCancel.bind(this)}>
                                <Input placeholder="给收藏夹起一个新的名字吧" prefix={<Icon type="folder-open" />} value={this.state.CollectionName} onChange={this.onChangeCollectionName.bind(this)} maxLength={'15'} />
                            </Modal>
                        </div>
                    </div>
                </div>

            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        docList: state.getCollectionOpinionDetailSucceeded.data.docList,
        pageInfo: state.getCollectionOpinionDetailSucceeded.data.pageinfo,
        materialList: state.getMaterialOpinionListSucceededReducer.data.reportCatList,
        favCatList: state.getCollectionOpinionListSucceeded.data.favCatList,
        reportData: state.getReportListSucceeded.data
    }
};

const mapDispatchToProps = dispatch => {
    return {
        opinionSearchRequest: req => {
            dispatch(opinionSearchRequested(req));
        },
        getCollectionOpinionListRequested: () => {
            dispatch(getCollectionOpinionListRequested());
        },
        getCollectionOpinionDetailRequested: req => {
            dispatch(getCollectionOpinionDetailRequested(req));
        },
        getMaterialOpinionListRequested: () => {
            dispatch(getMaterialOpinionListRequested());
        },
        getReportListRequested: (req) => {
            dispatch(getReportListRequested(req));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CollectionOpinion));
