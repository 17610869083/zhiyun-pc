import React from 'react';
import request from '../../utils/request';
import Kindeditor from '../../components/Kindeditor/Kindeditor.js';
import {connect} from 'react-redux';
import {
  getCollectionOpinionListRequested,
  getReportListRequested,
} from '../../redux/actions/createActions';
import {
  api_edit_doc_neg,
  api_del_doc,
  api_get_doc_detail,
  api_get_doc_similar,
  api_put_into_report,
  api_push_collection,
  api_docedit_save,
  api_email_push,
  api_docsend_push
} from '../../services/api';
import EditOpinionDetail from '../../components/EditOpinionDetail/EditOpinionDetail';
import {Tag, Popconfirm, message, Icon, Modal, Menu, Dropdown, Select, Input} from 'antd';
import {history} from '../../utils/history';
import {setHighlightTags, opinionTypeToColor, getMeailMessage} from '../../utils/format';
import './DetailOpinion.less';
import Store from '../../redux/store/index'
import IconFont from '../../components/IconFont'
const Option = Select.Option;

class DetailOpinion extends React.Component {
  constructor() {
    super();
    this.state = {
      isClose: true,
      data: {},
      current: '0',
      keywords: [''],
      content: '',
      similar: [],
      editModalVisible: false,
      editModalConfirmLoading: false,
      propsEdit: '',
      num: 1,
      visibleOne: false,
      emailData: [],
      selectValue: [],
      emailInput: '',
      contents: '',
      sid: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.num !== this.state.num) {
      const id = this.props.match.params.id;
      request(api_get_doc_detail + '&sid=' + id, {}).then((res) => {
        const keywords = res.data.nstags ? (res.data.nstags.split(' ')) : [''];
        const content = setHighlightTags(res.data.content, keywords);
        this.setState({
          data: res.data,
          keywords: keywords,
          content: content
        });
        request(api_get_doc_similar + '&sid=' + id, {}).then((res) => {

          const similar = (res.data.similerCount) ? (res.data.similerDocList) : [''];
          this.setState({
            similar: similar
          });
        })
      });
    }
  }

  // 显示和关闭相关舆情
  clickSimilar(sid) {
    history.push(`/info/${sid}`);
    request(api_get_doc_detail + '&sid=' + sid, {})
      .then((res) => {
        const keywords = (res.data.nrtags) ? (res.data.nrtags) : [''];
        this.setState({
          data: res.data,
          keywords: keywords
        })
      });
    request(api_get_doc_similar + '&sid=' + sid, {})
      .then((res) => {
        const similar = (res.data.similerCount) ? (res.data.similerDocList) : [''];
        this.setState({
          similar: similar
        });
      })
  }

  closeSimilar() {
    this.setState({
      isClose: !this.state.isClose
    })
  }

  // 确认删除
  deleteConfirm(sid) {
    request(api_del_doc + '&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        setTimeout(() => {
          history.goBack();
        }, 500);
        // this.props.onDataChange();
      }
    });
  }

  // 确定设为负面
  negativeConfirm(sid) {
    request(api_edit_doc_neg + '&neg=1&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);

        request(api_get_doc_detail + '&sid=' + sid, {})
          .then((res) => {
            const keywords = (res.data.nrtags) ? (res.data.nrtags) : [''];
            this.setState({
              data: res.data,
              keywords: keywords
            })
          });
      }
    });


  }

  // 确定设为预警
  warningConfirm(sid) {
    request(api_edit_doc_neg + '&neg=2&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        request(api_get_doc_detail + '&sid=' + sid, {})
          .then((res) => {
            const keywords = (res.data.nrtags) ? (res.data.nrtags) : [''];
            this.setState({
              data: res.data,
              keywords: keywords
            })
          });
      }
    });
  }

  // 确定设为正面
  positiveConfirm(sid) {
    request(api_edit_doc_neg + '&neg=-1&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        request(api_get_doc_detail + '&sid=' + sid, {})
          .then((res) => {
            const keywords = (res.data.nrtags) ? (res.data.nrtags) : [''];
            this.setState({
              data: res.data,
              keywords: keywords
            })
          });
      }
    });
  }

  // 确定设为中性
  neutralConfirm(sid) {
    request(api_edit_doc_neg + '&neg=0&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        request(api_get_doc_detail + '&sid=' + sid, {})
          .then((res) => {
            const keywords = (res.data.nrtags) ? (res.data.nrtags) : [''];
            this.setState({
              data: res.data,
              keywords: keywords
            })
          });
      }
    });
  }

  // 取消操作
  deleteCancel(e) {
    message.error('取消操作');
  }

  // 编辑舆情详情 edit
  showEditModal() {
    this.setState({
      editModalVisible: true
    })
  }

  editModalHandleOk() {
    let editData = Store.getState().addMessageReducer;
    const id = this.state.id;
    request(api_docedit_save, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `sid=${editData.sid}&title=${editData.title}&pubdate=${editData.pubdate}&timestamp=${editData.timestamp}&source=${editData.source}&url=${editData.url}&clickcount=${editData.clickcount}&replycount=${editData.replycount}&hot=${editData.hot}&nrtags=${editData.nrtags}&keyword=${editData.keyword}&match=${editData.match}&carry=${editData.carry}&negative=${editData.negative}&summary=${editData.summary}&content=${editData.content}&reloadtag=${editData.reloadtag}`
    }).then(res => {
      message.success(res.data.message);
      request(api_get_doc_detail + '&sid=' + id, {}).then((res) => {
        const keywords = (res.data.nstags) ? (res.data.nstags.split(' ')) : [''];
        const content = setHighlightTags(res.data.content, keywords);
        this.setState({
          data: res.data,
          keywords: keywords,
          content: content
        });
      })
    })

    this.setState({
      editModalConfirmLoading: true,
      editModalVisible: false,
      num: new Date()
    });
  }

  editModalHandleCancel() {
    this.setState({
      editModalVisible: false,
    });
  }

  // 推送
  pushConfirm() {
    setTimeout(() => {
      message.success("推送成功！");
    }, 1000);

  }

  // 引导
  pushToGuide() {
    setTimeout(() => {
      message.success("推送成功！");
    }, 1000);
  }

  // 追踪
  pushToFollow() {
    setTimeout(() => {
      message.success("推送成功！");
    }, 1000);
  }

  // 上报
  pushToReport() {
    setTimeout(() => {
      message.success("推送成功！");
    }, 1000);
  }

  // 取证
  pushToObtainEvidence() {
    setTimeout(() => {
      message.success("推送成功！");
    }, 1000);
  }

  // 阻断
  pushToFilter() {
    setTimeout(() => {
      message.success("推送成功！");
    }, 1000);
  }

  //返回上一页
  // preUrl(){
  //     history.go(-1)
  // }

  // 展示收藏列表
  showCollectionMenu() {
    this.props.getCollectionOpinionList();
  }

  // 展示报告列表
  showReportMenu() {
    this.props.getReportList({pagesize: '1000', page: '1'});
  }

  // 加入收藏
  clickCollectionMenuItem(e) {
    const id = this.state.sid;
    const collectionId = e.key;
    request(api_push_collection + '&catid=' + collectionId + '&sid=["' + id + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success("舆情文章添加到收藏夹成功");
      } else if (res.data.code === 2) {
        message.info("该舆情文章已存在于收藏夹中");
      } else {
        message.error("添加失败");
      }
    });
  }

  // 加入报告
  clickReportMenuItem(e) {
    const id = this.state.sid;
    const reportId = e.key;
    request(api_put_into_report + '&reportid=' + reportId + '&sid=["' + id + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
      }
    });
  }

  componentDidMount() {
    const id = this.props.location.pathname.split('detail/')[1]
    request(api_get_doc_detail + '&sid=' + id, {}).then((res) => {
      const keywords = (res.data.nstags) ? (res.data.nstags.split(' ')) : [''];
      const content = setHighlightTags(res.data.content, keywords);
      this.setState({
        data: res.data,
        keywords: keywords,
        content: content,
        sid: id
      });
      request(api_get_doc_similar + '&sid=' + id, {}).then((res) => {
        const similar = (res.data.similerCount) ? (res.data.similerDocList) : [''];
        this.setState({
          similar: similar
        });
      })
    });
  }

  handleChange = (value) => {
    this.setState({
      contents: value
    })
  }
  emailInput = (e) => {
    const {value} = e.target;
    this.setState({
      emailInput: value
    })
  }

  handleOkOne() {
    let idArr = [];
    let emailArr = [];
    for (let i in this.state.selectValue) {
      idArr.push(this.state.selectValue[i]['key']);
      emailArr.push(this.state.selectValue[i]['label']);
    }
    let idStr = idArr.join(',');
    let emailStr = emailArr.join(',');
    if (idStr === '' && this.state.emailInput !== '') {
      emailStr += `${this.state.emailInput}`;
      idStr += 'noid';
    } else if (idStr !== '' && this.state.emailInput !== '') {
      emailStr += `,${this.state.emailInput}`;
      idStr += ',noid';
    }
    if (emailStr === '') {
      message.success('请添加或选择要推送的邮箱')
      return;
    }
    let subject = this.state.emailData.simpleEmail[0]['title'];
    let sid = this.state.emailData.simpleEmail[0]['sid'];
    this.setState({
      visibleOne: false
    })
    request(api_docsend_push, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `sid=${sid}&emailmsgUid=${idStr}&emailmsgUemail=${emailStr}&subject=${subject}&content=${this.state.contents}`
    }).then(res => {
      message.success(res.data.message)
    })

  }

  handleCancelOne() {
    this.setState({
      visibleOne: false
    })
  }

  searchEmail() {
    const sid = this.state.sid;
    request(api_email_push + '&sid=' + sid).then(res => {
      this.setState({
        emailData: res.data
      })
    })
    this.setState({
      visibleOne: true
    })
  }

  selectChange = (value) => {
    this.setState({
      selectValue: value
    })
  }

  messageChange(e) {
    const {value} = e.target;
    let emailData = this.state.emailData;
    emailData.simpleEmail[0]['title'] = value;
    this.setState({
      emailData: emailData
    })
  }

  render() {
    const children = [];
    if (this.state.emailData.emailAddressee) {
      const emailAddressee = this.state.emailData.emailAddressee;
      for (let i = 0; i < emailAddressee.length; i++) {
        children.push(<Option key={emailAddressee[i]['id']}>{emailAddressee[i]['email']}</Option>);
      }
    }
    const conent = getMeailMessage(this.state.emailData);
    const data = this.state.data;
    const sid = this.state.sid;
    const Keywords = this.state.keywords.map((item, index) =>
      <span key={index} className="value-item">{item}</span>
    );
    const factor = data.keyword !== undefined ? data.keyword : [1];
    const factorElement = factor.map((item, index) =>
      <span key={index} className="value-item">{item}</span>
    );
    const Similar = this.state.similar[0] !== undefined && this.state.similar[0] !== '' ? this.state.similar.map((item, index) =>
      <li key={index} className="similar-item">
        <div className="name">
          <span>名称：</span>
          <a href={item.url}
             target="black">{item.title !== undefined && item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title}</a>

        </div>
        <div className="pubdate">
          <span>发布时间：</span>
          <span>{item.pubdate}</span>
        </div>
      </li>
    ) : '';
    // 收藏列表
    const CollectionMenu = (
      <Menu
        onClick={this.clickCollectionMenuItem.bind(this)}
        selectedKeys={[this.state.current]}
      >
        {this.props.favCatList.map(item =>
          <Menu.Item key={item.id}>
            <Icon type="folder-add"/>&nbsp;
            <span>{item.catname}</span>
          </Menu.Item>
        )}
      </Menu>
    );
    // 报告列表
    const ReportMenu = (
      <Menu
        selectedKeys={[this.state.current]}
        onClick={this.clickReportMenuItem.bind(this)}
      >
        {this.props.reportData.map(item =>
          <Menu.Item key={item.id}>
            <Icon type="folder-add"/>&nbsp;
            <span>{item.name}</span>
          </Menu.Item>
        )}

      </Menu>
    );
      
        return (            
            <div className="detail-opinion">
               {/* <Icon type="rollback" className="arrowLeft" title="回到上一页" onClick={this.preUrl.bind(this)}/> */}
                <div className="wrapper">
                    <div className="Top">
                        <div className="title-wrapper">
                            <div className="negative">
                                <Tag style={opinionTypeToColor(data.negative)}>{data.negative}</Tag>
                            </div>
                            <p className="title">{data.title}</p>
                        </div>
                        <div className="info">
                            <div className="pubdate">
                                <span className="name">发布时间：</span>
                                <span className="value">{data.pubdate}</span>
                            </div>
                            <div className="pubdate">
                                <span className="name">来源：</span>
                                <span className="value"><a href={data.url} target="blank">{data.source}</a></span>
                            </div>
                            <div className="pubdate">
                                <span className="name">作者：</span>
                                <span className="value">{data.author}</span>
                            </div>
                        </div>
                        <div className="keywords">
                            <div className="keywords-left">
                                <span className="name">关键词：</span>
                                <div className="value">
                                    {Keywords}
                                </div>
                            </div>
                        </div>
                        <div className="mention-topic">
                            <span className="name">要素：</span>
                            <div className="value">
                                    {factorElement}
                            </div>
                        </div>
                        <div className="operation">
                        <div className="itemBox">
                            <Popconfirm title="确定要将这条信息设置为预警吗？" onConfirm={this.warningConfirm.bind(this, sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item" title="设为预警">
                                <IconFont type="icon-shandian"/>
                                    {/* <img src={warningImg} alt="warning"/> */}
                                </div>
                            </Popconfirm>
                            <Popconfirm title="确定要将这条信息设置为负面吗？" onConfirm={this.negativeConfirm.bind(this, sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item" title="设为负面">
                                <IconFont type="icon-fumianxinxi"/>
                                    {/* <img src={negativeImg} alt="negative"/> */}
                                </div>
                            </Popconfirm>
                            <Popconfirm title="确定要将这条信息设置为正面吗？" onConfirm={this.positiveConfirm.bind(this, sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item" title="设为正面">
                                <IconFont type="icon-zheng"/>
                                </div>
                            </Popconfirm>
                            <Popconfirm title="确定要将这条信息设置为中性吗？" onConfirm={this.neutralConfirm.bind(this, sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item item-font" title="设为中性">
                                中
                                </div>
                            </Popconfirm>

                            <Popconfirm title="确定要删除这条信息吗？" onConfirm={this.deleteConfirm.bind(this, sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item" title="删除">
                                <IconFont type="icon-shanchu1"/>
                                    {/* <img src={deleteImg} alt="delete"/> */}
                                </div>
                            </Popconfirm>
                            <div className="operation-item" title="修改" onClick={this.showEditModal.bind(this)}>
                               <IconFont type="icon-iconfontbianji1"/>
                                {/* <img src={editImg} alt="edit"/> */}
                            </div>
                           
                                <div className="operation-item" title="推送" onClick={this.searchEmail.bind(this)}>
                                <IconFont type="icon-tuisongguize"/>
                                    {/* <img src={pushImg} alt="push" onClick={this.searchEmail.bind(this)}/> */}
                                </div>
                            </div>
                            <div className="keywords-right">
                                <Dropdown overlay={CollectionMenu} trigger={['click']}
                                getPopupContainer={ () => document.querySelector('.detail-opinion')}
                                >
                                    <div className="watch" onClick={this.showCollectionMenu.bind(this)}>
                                        <Icon type="star" className="star"/>
                                        <span>加入收藏</span>
                                    </div>
                                </Dropdown>
                                <Dropdown overlay={ReportMenu} trigger={['click']}
                                getPopupContainer={ () => document.querySelector('.detail-opinion')}
                                >
                                    <div className="watch" onClick={this.showReportMenu.bind(this)}>
                                        <Icon type="file-text" className="star" />
                                        <span>加入报告</span>
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="middle">
                        <p className="content" dangerouslySetInnerHTML={{__html: this.state.content}}></p>
                    </div>
                    <div className="bottom" style={Similar===''?{display:'none'}:{display:'block'}}>
                        <span onClick={this.closeSimilar.bind(this)} className="trigger-similar">相关转载</span>
                        <ul style={this.state.isClose ? {display: 'none'} : {display: 'block'}} className="similar">
                        {Similar}</ul>

                    </div>
                    <div className="modals">
                        <Modal title="修改"
                               visible={this.state.editModalVisible}
                               onOk={this.editModalHandleOk.bind(this)}
                               onCancel={this.editModalHandleCancel.bind(this)}
                               width="50%"
                               style={{marginLeft:'30%'}}
                        >
                            <EditOpinionDetail titleSid={sid}/>
                        </Modal>
                        <Modal
                          title="推送消息"
                          visible={this.state.visibleOne}
                           onOk={this.handleOkOne.bind(this)}
                           onCancel={this.handleCancelOne.bind(this)}
                        >
                         <div className="conent">
                         <div className="pushEmail">推送邮箱：</div>
                         <Select
                            mode="tags"
                            style={{ width: '100%'}}
                            size='small'
                            placeholder="请选择要推送的邮箱"
                            onChange={this.selectChange}
                            labelInValue
                            >
                          {children}
                         </Select>
                         </div>
                          <p className="conent"><span>消息主题：</span>
                          <Input className="smallInput" value={
                        this.state.emailData.simpleEmail!==undefined?this.state.emailData.simpleEmail[0]['title']:''}
                        onChange={this.messageChange.bind(this)}
                        /></p>
                         <p className="conent">
                         <Input placeholder="手动输入邮箱地址" className="bigInput"
                         onChange={this.emailInput}
                         /></p>
                         <Kindeditor contents={this.state.contents.length===0?conent:this.state.contents}
                           onChange={this.handleChange}/>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    favCatList: state.getCollectionOpinionListSucceeded.data.favCatList,
    reportData: state.getReportListSucceeded.data
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getCollectionOpinionList: () => {
      dispatch(getCollectionOpinionListRequested());
    },
    getReportList: (req) => {
      dispatch(getReportListRequested(req));
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailOpinion);
