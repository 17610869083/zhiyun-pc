import React from 'react';
import {connect} from 'react-redux';
import {Checkbox, Icon, Tooltip, Pagination, Input, Menu, Dropdown, Modal, Form,message} from 'antd';
import request from '../../utils/request';
import {api_add_material_opinion,
    api_delete_material_opinion,
    api_edit_material_opinion,
    api_del_doc_from_cat,
    api_put_into_report
} from '../../services/api';
import {opinionTrend, opinionColor} from '../../utils/format';
import {opinionSearchRequested,
    getMaterialOpinionListRequested,
    getMaterialOpinionDetailRequested,
    getReportListRequested
} from '../../redux/actions/createActions';

import './MaterialOpinion.less';
import BlankPage from '../../base/Exception/BlankPage';
import {GRAY,BLACK} from '../../utils/colors';
import Iconfont from '../../components/IconFont'
const Search = Input.Search;
const confirm = Modal.confirm;
const FormItem = Form.Item;

class MaterialOpinion extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 1,
            currentPage: 1,
            pageSize: 20,
            removeModalVisible: false,
            outputModalVisible: false,
            addMaterialVisible: false,
            materialCurrent: 0,
            materialListItemId: 0,
            renameMaterialVisible: false,
            materialName: '',
            checked: false,
            checkedAll: false,
            checkedLength: 0,
            arr: new Array(30).fill(false),
            MaterialValue:'',
            browserHeight:300
        };
    }

    // 点击标题跳转
    clickItemTitle(sid) {
        window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
    }

    // -----------新增素材库
    showAddMaterial() {
        this.setState({
            addMaterialVisible: true
        })
    }
    handleAddMaterialOk() {
        this.handleAddMaterialSubmit();
    }
    handleAddMaterialCancel() {
        this.setState({
            addMaterialVisible: false
        })
    }
    handleAddMaterialSubmit() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                request(api_add_material_opinion + '&catname=' + values.materialName,{}).then(res => {
                    if (res.data.code === 1) {
                        message.success(res.data.msg);
                    } else if (res.data.code === 2) {
                        message.warning(res.data.msg);
                    } else {
                        message.error(res.data.msg);
                    }
                    this.setState({
                        addMaterialVisible: false
                    });
                    this.props.getMaterialOpinionListRequested();
                });
            }
        });
    }


    // --------------在素材库内搜索
    handleSearchBtn(keyword) {
        if (keyword !== '') {
            this.props.getMaterialOpinionDetailRequested(`${this.state.current}&q=${keyword}`);
        }else{
            this.props.getMaterialOpinionDetailRequested(`${this.state.current}`);
        }
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
        this.props.getReportListRequested({pagesize:1000,page:1});
        this.setState({
            materialSid: sid
        });
    }

    // 删除单项
    deleteThisFormMaterial(itemId) {
        const current = this.state.current;
		const getDetail = this.props.getMaterialOpinionDetailRequested;
		const _this = this;
        confirm({
            title: '确定将这条舆情移出素材库?',
            content: '移出素材库',
            onOk() {
                request(api_del_doc_from_cat + '&id=[' + itemId + ']', {}).then((res) => {
                    if (res.data.code === 1) {
                        message.success(res.data.msg);
                        getDetail(`${current}&page=${_this.state.currentPage}&pagesize=${_this.state.pageSize}`);
                        _this.setState({
                            arr:new Array(_this.state.pageSize).fill(false)
                        })
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
        const getMaterialDetail = this.props.getMaterialOpinionDetailRequested;
		const current = this.state.current;
		const _this = this;
        if (size === 0) {
            message.warning("至少选择一项！");
        } else {
            const sidList = JSON.stringify(arr);
            request(api_del_doc_from_cat + '&id=' + sidList, {}).then((res) => {
                if (res.data.code === 1) {
                    getMaterialDetail(`${current}&page=${_this.state.currentPage}`);
                    message.success(res.data.msg);
                    this.setState({
                        checkedAll: false,
                        arr: new Array(30).fill(false)
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
                        arr: new Array(30).fill(false)
                    });
                }
            });
        }
    }


    // ----------------多项加入收藏



    // 左侧素材库选项
    handleMeterialNavigation(itemId, index) {
        this.setState({
            current: itemId,
            materialCurrent:index

        });
        this.props.getMaterialOpinionDetailRequested(itemId);
    }

    // 分页
    onPaginationChange(page) {
        if (page !== '') {
            this.props.getMaterialOpinionDetailRequested(`${this.state.current}&page=${page}&pagesize=${this.state.pageSize}`);
            this.setState({
                currentPage: page,
                arr:new Array(40).fill(false),
                checkedAll:false
            })
        }
    }

    // 每页显示数量
    // 每页显示数量
    onShowSizeChange(current, pageSize) {
        this.props.getMaterialOpinionDetailRequested(`${this.state.current}&page=${this.state.currentPage}&pagesize=${pageSize}`);
        this.setState({pageSize: pageSize})
    }

    componentWillMount() {
        this.props.getMaterialOpinionListRequested();
        setTimeout(() => {
			const {materialList} =this.props;
			this.setState({
				  current:materialList[0]['id'],
				  browserHeight:window.innerHeight-140
			})
            this.props.getMaterialOpinionDetailRequested(materialList[0]['id']);
        },100);
    }
    componentDidUpdate(prevProps,prevState){
            if(this.props.checkboxState!==undefined){
            if(prevProps.checkboxState.num!==this.props.checkboxState.num){
                    this.setState({
                        arr: new Array(30).fill(false),
                        checkedAll:false
                    })
            }
        }
    }

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
        if(this.props.getSids!==undefined){
            this.props.getSids(this.checkedTrue())
        }
    }
    onAllChange(e) {
        const arr = this.state.arr.fill(e.target.checked);
        this.setState({
            checkedAll: e.target.checked,
            arr: arr
        });
        if(this.props.getSids!==undefined){
            this.props.getSids(this.checkedTrue())
        }
    }

    // -------------列表项编辑和删除
    onClickMaterialListItem(id) {
        this.setState({
            materialListItemId: id
        })
    }
    onClickMaterialListItemDelete({key}) {
        if (key === 'delete') {
            this.deleteMaterial(this.state.materialListItemId);
        } else if (key === 'rename') {
            this.setState({ renameMaterialVisible: true })
        }
    }
    deleteMaterial(id) {
        const getMaterialOpinionListRequested = this.props.getMaterialOpinionListRequested;
        confirm({
            title: '您确定要删除本素材库吗?',
            content: '删除素材库，里面的舆情也会一并移除。',
            onOk() {
                request(api_delete_material_opinion + '&catid=' + id,{}).then(res => {
                    if (res.data.code === 1) {
                        message.success(res.data.msg);
                    } else {
                        message.error(res.data.msg);
                    }
                    getMaterialOpinionListRequested();
                });
            },
            onCancel() {
                message.info('您取消了删除操作。')
            },
        });
    }
    handleRenameMaterialOk() {
        const getMaterialOpinionListRequested = this.props.getMaterialOpinionListRequested;
        const id = this.state.materialListItemId;
        const name = this.state.materialName;
        request(api_edit_material_opinion + '&id=' + id + '&catname=' + name,{}).then(res => {
            if (res.data.code === 1) {
                message.success(res.data.msg);
            } else {
                message.error(res.data.msg);
            }
            getMaterialOpinionListRequested();
            this.setState({ renameMaterialVisible: false });
        });
    }
    handleRenameMaterialCancel() {
        this.setState({ renameMaterialVisible: false })
    }
    onChangeMaterialName(e) {
        if(e.target.value.length>=15){
            message.error('素材库名称请不要大于14个字符');
            return;
        }
        this.setState({ materialName: e.target.value });
    }

    getReportListRequested(){
           this.props.getReportListRequested({pagesize:1000,page:1})
    }

    MaterialChange(e){
           const {value} = e.target;
           this.setState({
            MaterialValue: value
            })
           if(value.length>=14){
            message.error('素材夹名称请不要超过14个字符');
             }

    }
    render() {
        const { pageInfo, materialList, reportData} = this.props;
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


        const docList = this.props.docList ? this.props.docList : [{carry: '新闻'}];
        const OpinionDetailItems =docList.length!==0? docList.map((item, index) =>
            <li key={item.sid} className="opinion-detail-item">
                <Checkbox
                    checked={this.state.arr[index]}
                    onChange={this.onChange.bind(this,index)}
                />
                <div className="item-top">
                <div className="content">

                    <div className="negative">
                        <div className="inner-type" style={opinionColor(item.negative)}>
                            {opinionTrend(item.negative)}
                        </div>
                    </div>
                    <div className="title" title={item.title} onClick={this.clickItemTitle.bind(this, item.sid)}>
                    {item.title!==undefined&&item.title.length>58?item.title.slice(0,58)+'...':item.title}
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
                            <Tooltip title="加入简报">
                                <Dropdown overlay={addReportMenu} trigger={['click']}
                                getPopupContainer={ () => document.querySelector('.materia-opinion-wrapper')}
                                >
                                    <i className="fa fa-file-text" aria-hidden="true"
                                       onClick={this.getReportOpinionList.bind(this, item.sid)}
                                    />
                                </Dropdown>
                            </Tooltip>
                            <Tooltip title="从素材库移除">
                                <i className="fa fa-arrow-circle-right" aria-hidden="true" onClick={this.deleteThisFormMaterial.bind(this,item.id)}/>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </li>
        ):<BlankPage desc='暂无信息，请在汇总舆情内加入相应信息'/>;

        const materialSetMenu = (
            <Menu onClick={this.onClickMaterialListItemDelete.bind(this)}>
                <Menu.Item key="rename">
                    <span>重命名</span>
                </Menu.Item>
                <Menu.Item key="delete">
                    <span>删除</span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="materia-opinion-wrapper">
                <div className="materia-opinion">
                    <div className="opinion-list">
                        <div className="top" style={{background:GRAY}}>
                            <div className="left">
                                <div className="choose-all">
                                    <Checkbox
                                        checked={this.state.checkedAll}
                                        onChange={this.onAllChange.bind(this)}
                                        className="colors"
                                    >全选</Checkbox>
                                </div>
                                <div className="operate-all">
                                    <span onClick={this.showRemoveModal.bind(this)} style={{color:BLACK}}>移出素材库</span>
                                    <Modal
                                        title="移出素材库"
                                        visible={this.state.removeModalVisible}
                                        onOk={this.handleRemoveOk.bind(this)}
                                        onCancel={this.handleRemoveCancel.bind(this)}
                                    >
                                        <div>确定将这 <b>{this.state.checkedLength}</b> 项从素材库移出吗？</div>
                                    </Modal>
                                </div>
                                <div className="operate-all" onClick={this.getReportListRequested.bind(this)}>
                                    <Dropdown overlay={addMultipleReportMenu} trigger={['click']}
                                     getPopupContainer={ () => document.querySelector('.materia-opinion-wrapper')}
                                    >
                                        <span style={{color:BLACK}}>加入简报</span>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="right">
                                <Search
                                    style={{width: '200px',marginRight: '20px'}}
                                    placeholder="请输入您要搜索的内容"
                                    onSearch={this.handleSearchBtn.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="bottom" > 
                            <ul className="opinion-detail-wrapper">
                                {this.props.docList ? OpinionDetailItems : <div>暂无数据！</div>}
                            </ul>
                        </div>
                        <div className="pagintion-wrapper">
                            <Pagination showSizeChanger
                                        className="pagintion"
                                        defaultCurrent={1}
                                        defaultPageSize={20}
                                        onChange={this.onPaginationChange.bind(this)}
                                        onShowSizeChange={this.onShowSizeChange.bind(this)}
                                        total={pageInfo===undefined?0:pageInfo.rowcount}
                                        current={parseInt(pageInfo===undefined?0:pageInfo.page,10)}
                                        getPopupContainer={ () => document.querySelector('.materia-opinion-wrapper')}
                            />
                        </div>
                    </div>
                    <div className="left-boxes" style={this.props.getSids ? {left:'76%'}:{left:'85.6%'}}>
                        <div className="first-box">
                            <div className="top" style={{background:GRAY}} onClick={this.showAddMaterial.bind(this)}>
                            +新增素材库
                                <Modal
                                    title="新增素材库"
                                    visible={this.state.addMaterialVisible}
                                    onOk={this.handleAddMaterialOk.bind(this)}
                                    onCancel={this.handleAddMaterialCancel.bind(this)}
                                >
                                    <Form onSubmit={this.handleAddMaterialSubmit.bind(this)}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="素材夹名称">
                                            {getFieldDecorator('materialName', {
                                                rules: [{
                                                    required: true, message: '名称不能为空！',
                                                }],
                                                initialValue:this.state.MaterialValue
                                            })(
                                                <Input
                                                maxLength={'14'}
                                                onChange={this.MaterialChange.bind(this)}
                                                />
                                            )}
                                        </FormItem>
                                    </Form>
                                </Modal>
                            </div>
                            <div className="bottom" style={{maxHeight:this.state.browserHeight+'px'}} >
                                <ul className="material-list">
                                    {
                                        materialList.map((item, index) =>
                                            <li key={item.id} className={this.state.materialCurrent === index ? 'material-list-item-active' : 'material-list-item'}>
                                                <span className="material-name"
                                                 onClick={this.handleMeterialNavigation.bind(this, item.id, index)}
                                                 title={item.catname}
                                                 >{item.catname}</span>
                                                <span>
                                                    {
                                                        item.type === 1 ?
                                                            <Dropdown overlay={materialSetMenu} trigger={['click']}
                                                            getPopupContainer={ () => document.querySelector('.materia-opinion-wrapper')}
                                                            >
                                    <i onClick={this.onClickMaterialListItem.bind(this, item.id)}>< Iconfont type="icon-icon02" style={{color:'#000'}}/></i>                                    
                                                            </Dropdown> : null
                                                    }
                                                </span>
                                            </li>
                                        )
                                    }
                                </ul>
                                <Modal
                                    title="素材库重命名"
                                    visible={this.state.renameMaterialVisible}
                                    onOk={this.handleRenameMaterialOk.bind(this)}
                                    onCancel={this.handleRenameMaterialCancel.bind(this)}
                                >
                                    <Input
                                        placeholder="给素材库起一个新的名字吧"
                                        prefix={<Icon type="folder-open" />}
                                        value={this.state.materialName}
                                        onChange={this.onChangeMaterialName.bind(this)}
                                        maxLength={'15'}
                                    />
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        docList: state.getMaterialOpinionDetailSucceededReducer.data.docList,
        pageInfo: state.getMaterialOpinionDetailSucceededReducer.data.pageinfo,
        materialList: state.getMaterialOpinionListSucceededReducer.data.reportCatList,
        reportData: state.getReportListSucceeded.data
    }
};

const mapDispatchToProps = dispatch => {
    return {
        opinionSearchRequest: req => {
            dispatch(opinionSearchRequested(req));
        },
        getMaterialOpinionListRequested: () => {
            dispatch(getMaterialOpinionListRequested());
        },
        getMaterialOpinionDetailRequested: req => {
            dispatch(getMaterialOpinionDetailRequested(req));
        },
        getReportListRequested: (req) => {
            dispatch(getReportListRequested(req));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(MaterialOpinion));