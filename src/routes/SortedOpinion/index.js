import React from 'react';
import {connect} from 'react-redux';
import {
  Menu,
  Icon,
  Modal,
  Input,
  message,
  Dropdown,
  Spin
} from 'antd';
import {Route, Switch} from 'react-router-dom';
import {history} from '../../utils/history';
import SortedList from './SortedList';
import SortedAdd from './SortedAdd';
import SortedSetting from './SortedSetting';
import request from '../../utils/request';
import {api_sorted_cat_add, api_sorted_cat_edit, api_sorted_cat_delete, api_sorted_grade_delete} from '../../services/api';
import deleteImg from '../../assets/operate-img/delete.png';
import './index.less';
import {changeClfId, getSortedContentRequested, getCollectionLocationRequested, getSortedMenuRequested, searchState} from "../../redux/actions/createActions";
import {setTimeout} from 'timers';
import Iconfont from '../../components/IconFont';
const confirm = Modal.confirm;
class SortedOpinion extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'sortlist',
      isAddTopicShow: false,
      sortedMenu: [
        {
          catid: 1,
          catname: '默认文件夹',
          cattype: 0,
          clflist: [
            {
              clfid: 1250,
              clfname: "领导",
              typeId: 222,
              addtype: 2
            }
          ]
        }
      ],
      sortVisible: false,
      renameSortVisible: false,
      sortInputValue: '',
      sortInputRenameValue: '',
      catid: 1,
      clfId: 39,
      clfUlShow: true,
      clfUlShowIndex: 0,
      clfsname: '',
      flag: true,
      isTopShow: true
    }
  }
  // 删除分类项目
  deleteSortedItem(clfid) {
    const getSortedMenuRequested = this.props.getSortedMenuRequested;
    confirm({
      title: '您确定要删除这个方案吗？',
      content: '删除方案',
      onOk() {
        request(api_sorted_grade_delete + '&clfid=' + clfid).then(res => {
          if (res.data) {
            message.info(res.data.msg);
            getSortedMenuRequested();
          }
        });
      },
      onCancel() {
        message.info("您取消了操作！");
      }
    });
  }

  handleSortOk() {
    if (this.state.sortInputValue === '') {
      message.warning('不能为空！');
      return;
    }
    request(api_sorted_cat_add, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `catname=${this.state.sortInputValue}`
    }).then(res => {
      if (res.data) {
        message.info(res.data.msg);
        this.props.getSortedMenuRequested();
      }
      this.setState({sortVisible: false, sortInputValue: ''})
    });
  }
  handleCancel() {
    this.setState({sortVisible: false})
  }
  onChangeSortInputValue(e) {
    this.setState({sortInputValue: e.target.value});
  }
  // 删除和重命名
  operateItems(e) {
    const catid = this.state.catid;
    const getSortedMenuRequested = this.props.getSortedMenuRequested;
    if (e.key === 'rename') {
      this.setState({renameSortVisible: true})
    } else if (e.key === 'delete') {
      confirm({
        title: '您确定要删除这个分类吗？',
        content: '删除分类',
        onOk() {
          request(api_sorted_cat_delete + '&catid=' + catid).then(res => {
            if (res.data) {
              message.info(res.data.msg);
              getSortedMenuRequested();
            }
          });
        },
        onCancel() {
          message.info("您取消了操作！");
        }
      });
    }
  }
  // 设置catid
  onClickCatId(catid, e) {
    e.stopPropagation();
    this.setState({catid: catid});
  }
  handleRenameSortOk() {
    if (this.state.sortInputRenameValue === '') {
      message.warning('分类名不能为空！');
      return;
    }
    request(api_sorted_cat_edit, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `catname=${this.state.sortInputRenameValue}&id=${this.state.catid}`
    }).then(res => {
      if (res.data) {
        message.info(res.data.msg);
        this.props.getSortedMenuRequested();
      }
      this.setState({renameSortVisible: false, sortInputRenameValue: ''})
    });
  }
  handleRenameSortCancel() {
    this.setState({renameSortVisible: false})
  }
  onChangeRenameSortInputValue(e) {
    this.setState({sortInputRenameValue: e.target.value})
  }

  handleMenuClick(e) {
    this.setState({current: e.key});
    if (e.key === 'addsort') {
      this.setState({sortVisible: true})
    } else if (e.key === 'sortlist') {
      history.push({pathname: `/sortedopinion/list`, search: `?cifid=${this.props.clfId}`})
    } else if (e.key === 'setting') {
      history.push({pathname: `/sortedopinion/setting`, search: `?cifid=${this.props.clfId}`})
    } else {
      history.push({pathname: '/sortedopinion/addrule'})
    }

  }
  // 添加分类
  // showAddSortNavigate() {
  //     this.setState({
  //         isAddTopicShow: true,
  //         current: 'addtopic'
  //     });
  //     history.push({
  //         pathname: '/sortedopinion/addrule'
  //     })
  // }

  // 切换分类路由
  changeSortRoute(clfId, e) {
    this.setState({clfId: clfId, current: 'sortlist'});
    history.push({pathname: `/sortedopinion/list`, search: `?cifid=${clfId}`})
    this.props.changeClfId(clfId);
  }

  // 显示与隐藏
  toggleClfUl(catid) {
    this.props.getSortedContentRequested({catid: catid})
    const ref = this.refs['clf-ul-' + catid];
    if (ref.style.display === 'block') {
      ref.style.display = 'none';
    } else {
      ref.style.display = 'block';
    }
  }
  componentWillUnmount() {
    this.props.searchState({data: true})
  }
  componentWillMount() {
    this.props.getSortedMenuRequested();
    let clfid = '';
    for (let i = 0; i < this.props.sortedMenu.length; i++) {
      if (this.props.sortedMenu[i]['clflist'][0] !== undefined) {
        clfid = this.props.sortedMenu[i]['clflist'][0]['clfid'];
        break;
      }

    }
    this.timer = setTimeout(() => {
      const catid = this.props.sortedMenu[0]['catid'];
      const param = {
        catid: catid
      }
      this.props.changeClfId(clfid);
      this.props.getSortedContentRequested(param);
    }, 10)
  }

  componentDidMount() {
    if (history.location.pathname === '/sortedopinion/list') {
      this.setState({current: 'sortlist'});
    }
  }
  componentDidUpdate(prevProps, prevState) {

    if (prevProps.location !== this.props.location) {
      if (this.props.location.pathname === '/sortedopinion/addrule') {
        this.setState({isAddTopicShow: true})
      } else if (this.props.location.pathname === '/sortedopinion/list') {
        this.setState({isAddTopicShow: false, current: 'sortlist'})
      } else {
        this.setState({isAddTopicShow: false})
      }
    }

  }
  triggerTopShow() {
    this.setState({
      isTopShow: !this.state.isTopShow
    })
    this.props.searchState({
      data: !this.state.isTopShow
    })
  }
  render() {
    const {sortVisible, renameSortVisible, sortInputValue, clfId} = this.state;
    const {sortedMenu} = this.props;
    const OperateItems = (<Menu onClick={this.operateItems.bind(this)}>
      <Menu.Item key="rename">重命名</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
    </Menu>);
    const SortedMenu = sortedMenu.map((item) => (<ul key={item.catid} className="sort-menu-ul">
      <li className="catname">
        <div className="name" onClick={this.toggleClfUl.bind(this, item.catid)}>
          <i>< Iconfont type="icon-caidanyingyong2" style={{fill:'#00c8e7'}}/></i>
          <span className='mar'>{item.catname}</span>
        </div>
        <div className="setting" style={item.cattype === 1
            ? {
              display: 'block'
            }
            : {
              display: 'none'
            }}>
          <Dropdown overlay={OperateItems} trigger={['click']}>
            <i>< Iconfont type="icon-icon02" onClick={this.onClickCatId.bind(this, item.catid)} className="setting-icon"/></i>

          </Dropdown>
        </div>
      </li>
      <ul className="clf-ul" ref={'clf-ul-' + item.catid} style={{
          display: 'block'
        }}>
        {
          item.clflist && item.clflist.map(sortItem => <li className={clfId === sortItem.clfid
              ? 'clf-item-active'
              : 'clf-item'} key={sortItem.clfid}>
            <span className="name" onClick={this.changeSortRoute.bind(this, sortItem.clfid)} title={sortItem.clfname}>{sortItem.clfname}</span>
        
            <img src={deleteImg} alt="delete" className="delete-icon" onClick={this.deleteSortedItem.bind(this, sortItem.clfid)}/>
          </li>)
        }
      </ul>
    </ul>));

    return (<div className="sorted-opinion-container">
      <div className="sorted-menu">
        <div className="operation">
          分类
        </div>
        {SortedMenu}
      </div>
      <div className="modals">
        <Modal title="添加分类" visible={sortVisible} onOk={this.handleSortOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
          <Input placeholder="请输入分类名称" prefix={<Icon type = "folder" />} onChange={this.onChangeSortInputValue.bind(this)} value={sortInputValue} maxLength={'20'}/>
        </Modal>
        <Modal title="分类重命名" visible={renameSortVisible} onOk={this.handleRenameSortOk.bind(this)} onCancel={this.handleRenameSortCancel.bind(this)}>
          <Input placeholder="请输入分类名称" prefix={<Icon type = "folder" />} onChange={this.onChangeRenameSortInputValue.bind(this)} value={this.state.sortInputRenameValue} maxLength={'20'}/>
        </Modal>
      </div>
      <div className="sorted-opinion-option">
        <div className="topic-top">
          <div>
            <Menu onClick={this.handleMenuClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal" style={{
                backgroundColor: '#2d324f',
                paddingTop: '14px',
                color: '#fff',
                border: 'none',
                lineHeight:'40px'
              }}>
              <Menu.Item key="sortlist" style={{
                  fontSize: '16px'
                }}>
                信息列表
              </Menu.Item>
              <Menu.Item key="setting" style={{
                  fontSize: '16px'
                }}>
                修改分类设置
              </Menu.Item>
              <Menu.Item key="addtopic" style={{
                  fontSize: '16px'
                }}>
                添加话题
              </Menu.Item>
              <Menu.Item key="addsort" style={{
                  fontSize: '16px'
                }}>
                添加分类
              </Menu.Item>
            </Menu>
          </div>
          <div className="close" onClick={this.triggerTopShow.bind(this)}>
          <span>{this.state.isTopShow ? '显示' : '隐藏'}</span>
          <Icon type={this.state.isTopShow ? 'down' : 'right'} />
          </div>
        </div>
        {
          this.state.flag
            ? <div className="topic-wrapper">
                <Switch>
                  <Route path="/sortedopinion/list" component={SortedList}/>
                  <Route path="/sortedopinion/addrule" component={SortedAdd}/>
                  <Route path="/sortedopinion/setting" component={SortedSetting}/>
                </Switch>
              </div>
            : <Spin size="large"/>
        }
      </div>
    </div>)
  }
}

const mapStateToProps = state => {
  return {
    loadingState: state.getSortedContentSucceeded.data.state,
    clfId: state.changeClfId.id, sortedMenu: state.getSortedMenuSucceeded.res,
    search: state.searchStateReducer.data
    }
};

const mapDispatchToProps = dispatch => {
  return {
    changeClfId: clfid => {
      dispatch(changeClfId(clfid));
    },
    getSortedContentRequested: req => {
      dispatch(getSortedContentRequested(req));
    },
    getCollectionLocationRequested: req => {
      dispatch(getCollectionLocationRequested(req));
    },
    getSortedMenuRequested: req => {
      dispatch(getSortedMenuRequested(req));
    },
    searchState: req => {
      dispatch(searchState(req))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SortedOpinion);
