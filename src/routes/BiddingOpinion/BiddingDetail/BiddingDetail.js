import "babel-polyfill";
import React from 'react';
import {connect} from 'react-redux';
import {
  Checkbox, Input, Popconfirm, message, Button,
  Spin, Alert, Select, Pagination, Modal,Tooltip
} from 'antd';
import {history} from '../../../utils/history';
import './BiddingDetail.less';
import {setHighlightTags, formatDateTime} from '../../../utils/format';
import request from '../../../utils/request';
import {
  api_edit_doc_neg,
  api_del_doc,
  api_push_material,
  api_push_collection,
  api_collection_opinion_list,
  api_bidding_export
} from '../../../services/api';
import {GRAY} from '../../../utils/colors';
import {
  opinionSearchRequested,
  searchKeywordSync,
  setOpinionTypeRequested,
  // getMaterialOpinionListRequested,
  // getCollectionOpinionListRequested,
  exportSkip,
  paginationPage
} from '../../../redux/actions/createActions';
import weixin from '../../../assets/icon-img/weixin.png';
import news from '../../../assets/icon-img/news.png';
import weibo from '../../../assets/icon-img/weibo.png';
import talk from '../../../assets/icon-img/talk.png';
import video from '../../../assets/icon-img/video.png';
import all from '../../../assets/icon-img/other.png';
import media from '../../../assets/icon-img/new.png';
import boke from '../../../assets/icon-img/boke.png';
import app from '../../../assets/icon-img/app.png';
import twitter from '../../../assets/icon-img/twitter.png';
import BlankPage from '../../../base/Exception/BlankPage';
import Del from '../../../assets/img/del.svg'; 
import Dowload from '../../../assets/img/dowload.svg';
const InputGroup = Input.Group;
const Option = Select.Option;
class BiddingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSummaryShow: true,
      popVisible: false,
      popIndex: 0,
      checkedAll: false,
      checkedArray: new Array(40).fill(false),
      seltype: 'content',
      keyword: '',
      carryAll: {
        '新闻': news,
        '微博': weibo,
        '论坛': talk,
        '视频': video,
        '综合': all,
        '微信': weixin,
        '平媒': media,
        '博客': boke,
        'APP': app,
        'pjljkm': twitter
      },
      showNum: 1,
      searchInputValue: '',
      page: 1,
      visible: false,
      fileName: '',
      downloadVisible: false,
      type: 0,
      downloadFlag:false,
      materialList:[],
      favCatList:[],
      isSearch: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.current !== this.props.current){
       this.setState({
         checkedAll:false,
         checkedArray:this.state.checkedArray.fill(false)
       })
    }
  }
  // ------全选
  chooseAllOnChange(e) {
    const arr = this.state.checkedArray.fill(e.target.checked);
    this.setState({
      checkedAll: e.target.checked,
      checkedArray: arr
    });
  }

  onChangeItem(index, event) {
    const arr = this.state.checkedArray;
    arr[index] = event.target.checked;
    const isEveryChecked = arr.every(item => {
      return (item === true);
    });
    this.setState({
      checkedArray: arr,
      checkedAll: isEveryChecked
    });
  }

  clickItemTitle(sid, e) {
    window.open(window.location.origin + window.location.pathname + '#/multilingual/detail/' + sid);
  }

  // 删除舆情
  deleteConfirm(sid) {
    request(api_del_doc + '&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        this.props.onDataChange(1);
        this.setState({
          checkedArray:new Array(40).fill(false)
        })
      }
    });
  }

  // 设为预警
  warningConfirm(sid) {
    request(api_edit_doc_neg + '&neg=2&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        this.props.onDataChange(1);
        this.setState({
          checkedArray:new Array(40).fill(false)
        })
      }
    });
  }


  onChangeOtherOperate({key}) {
  }

  // 取消操作
  deleteCancel(e) {
    message.error('取消操作');
  }


  // 是否显示摘要
  triggerSummaryShow() {
    this.setState({
      isSummaryShow: !this.state.isSummaryShow
    })
  }

  // -----------批量操作
  checkedTrue() {
    const arr = [];
    this.props.docList.forEach((item, index) => {
      if (this.state.checkedArray[index] === true && item.sid) {
        arr.push(item.sid);
      }
    });
    return arr;
  }

  // 批量设为正面
  setPositiveLists() {
    const arr = this.checkedTrue();
    const size = arr.length;
    if (size === 0) {
      message.warning("至少选择一项！");
    } else {
      const sidList = JSON.stringify(arr);
      request(api_edit_doc_neg + '&neg=-1&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          this.props.onDataChange(1);
          this.setState({
            checkedAll: false,
            checkedArray: new Array(40).fill(false)
          });
        }
      });
    }
  }

  // 批量设为中性
  setMiddleLists() {
    const arr = this.checkedTrue();
    const size = arr.length;
    if (size === 0) {
      message.warning("至少选择一项！");
    } else {
      const sidList = JSON.stringify(arr);
      request(api_edit_doc_neg + '&neg=0&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          this.props.onDataChange(1);
          this.setState({
            checkedAll: false,
            checkedArray: new Array(40).fill(false)
          });
        }
      });
    }
  }

  // 批量设为负面
  setNegativeLists() {
    const arr = this.checkedTrue();
    const size = arr.length;
    if (size === 0) {
      message.warning("至少选择一项！");
    } else {
      const sidList = JSON.stringify(arr);
      request(api_edit_doc_neg + '&neg=1&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          this.props.onDataChange(1);
          this.setState({
            checkedAll: false,
            checkedArray: new Array(40).fill(false)
          });
        }
      });
    }
  }

  // 批量设为预警
  setWarningLists() {
    const arr = this.checkedTrue();
    const size = arr.length;
    if (size === 0) {
      message.warning("至少选择一项！");
    } else {
      const sidList = JSON.stringify(arr);
      request(api_edit_doc_neg + '&neg=2&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          this.props.onDataChange(1);
          this.setState({
            checkedAll: false,
            checkedArray: new Array(40).fill(false)
          });
        }
      });
    }
  }

  // 批量删除
  deleteOpinionLists() {
    const arr = this.checkedTrue();
    const size = arr.length;
    if (size === 0) {
      message.warning("至少选择一项！");
    } else {
      const sidList = JSON.stringify(arr);
      request(api_del_doc + '&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          this.props.onDataChange(1);
          this.setState({
            checkedAll: false,
            checkedArray: new Array(40).fill(false)
          });
        }
      });
    }
  }

  // 搜索内容
  handleSearchChange(value) {
    this.setState({
      seltype: value
    });
    this.props.searchKeywordSync({
      seltype: value,
      keyword: this.state.searchInputValue, type: 0
    });
  }

  searchInput(e) {
    const {value} = e.target;
    if (value === '') {
      this.props.searchType(0);
      this.props.searchKeywordSync({
        seltype: this.state.seltype,
        keyword: '', type: 0
      });
    }
    this.setState({
      searchInputValue: value
    })
  }
  keyDown(e){
     if(e.keyCode === 13){
      const param = {
        seltype: this.state.seltype,
        keyword: this.state.searchInputValue,
        datetag:'all',
        neg:'all',
        order:'timedown',
        carry:'全部',
        page:1
      };
      this.props.opinionSearchRequest(param);
      this.props.searchKeywordSync({
        seltype: this.state.seltype,
        keyword: this.state.searchInputValue, type: 0
      });
      this.props.paginationPage(1);
      if (this.props.propsType === 'AllopinionList') {
        this.props.searchType(1);
      }
      this.setState({isSearch: true})
     }
     this.props.remove();
  }
  // 推送到素材库
  putIntoMaterial(e) {
    const materialId = e.key;
    const arr = this.checkedTrue();
    const size = arr.length;
    if (size === 0) {
      message.warning("至少选择一项！");
    } else {
      const sidList = JSON.stringify(arr);
      request(api_push_material + '&catid=' + materialId + '&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          this.setState({
            checkedAll: false,
            checkedArray: new Array(40).fill(false)
          });
        }
      });
    }
  }

  // 推送到收藏夹
  putIntoCollection(e) {
    const collectionId = e.key;
    const arr = this.checkedTrue();
    const size = arr.length;
    if (size === 0) {
      message.warning("至少选择一项！");
    } else {
      const sidList = JSON.stringify(arr);
      request(api_push_collection + '&catid=' + collectionId + '&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success('舆情文章添加到收藏夹成功');
          this.setState({
            checkedAll: false,
            checkedArray: new Array(40).fill(false)
          });
        }
      });
    }
  }

  // //导出功能的跳转
  // onExportSkip() {
  //   let propsType = this.props.propsType;
  //   let taskname = propsType === 'AllopinionList' ? '导出汇总舆情数据' : Store.getState().getTopicLocationSucceededReducer.res.topicname;
  //   let propsParamData = this.props.param;
  //   let arr = this.checkedTrue().join(',');
  //   if (arr.length === 0) {
  //     propsParamData.sid = 'all';
  //   } else if (this.checkedTrue().length === this.props.pageSize) {
  //     propsParamData.sid = this.props.pageSize;
  //   } else {
  //     propsParamData.sid = arr + ',';
  //   }
  //   let time = formatDateTime(new Date());
  //   if (propsType === 'AllopinionList') {
  //     request(api_bidding_export, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       },
  //       body: `page=${propsParamData.page}&sids=${propsParamData.sid}&pagesize=${propsParamData.pagesize}&datetag=${propsParamData.datetag}&taskname=${taskname}&documenttype=excel&createdate=${time}&taskstate=0&source=monitor&order=${propsParamData.order}&begin=${propsParamData.begin}&end=${propsParamData.end}&neg=${propsParamData.neg}&carry=${propsParamData.carry}&similer=${propsParamData.similer}&seltype=conten&keyword=`
  //     })

  //   } else if (propsType === 'TopicList') {
  //     request(api_allopinion_exportskip, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       },
  //       body: `topicName=${this.props.getRouterReducer.topicname}&topicid=${this.props.getRouterReducer.topicid}&sids=${propsParamData.sid}&page=${propsParamData.page}&pagesize=${propsParamData.pagesize}&datetag=${propsParamData.datetag}&taskname=${this.props.getRouterReducer.topicname}&documenttype=excel&createdate=${time}&taskstate=0&source=topic&order=${propsParamData.order}&begin=${propsParamData.begin}&end=${propsParamData.end}&neg=${propsParamData.neg}&carry=${propsParamData.carry}&similer=${propsParamData.similer}&seltype=conten&keyword=`
  //     })
  //   } else {
  //     request(api_topic_export_word, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       },
  //       body: `&clfname=${this.props.clfId.clfname}&clfid=${this.props.clfId.clfid}&sids=${propsParamData.sid}&page=${propsParamData.page}&pagesize=${propsParamData.pagesize}&datetag=${propsParamData.datetag}&taskname=${this.props.clfId.clfname}&documenttype=excel&createdate=${time}&taskstate=0&source=clf&order=${propsParamData.order}&begin=${propsParamData.begin}&end=${propsParamData.end}&neg=${propsParamData.neg}&carry=${propsParamData.carry}&similer=${propsParamData.similer}&seltype=conten&keyword=`
  //     })
  //   }

  //   history.push({
  //     pathname: '/historyopinion',
  //     search: 'type=1'
  //   });
  // }

  operation() {
    this.setState({
      showNum: 2
    })
  }

  Streamline() {
    this.setState({
      showNum: 1
    })
  }

  onPaginationChange(pagenumber) {
    this.props.paginationPage(pagenumber);
    this.setState({
      page: pagenumber,
      checkedArray:this.state.checkedArray.fill(false)
    });
    const param = this.props.param;
    param.page = pagenumber;
    if (this.props.type === 1) {
      Object.assign(param, {
        seltype: this.state.seltype, keyword: this.props.searchKeyword.keyword,
        page: pagenumber
      });
      this.props.opinionSearchRequest(param);
      // console.log(1)
    } else if (this.props.searchKeyword.type === 1) {
      this.props.opinionSearchRequest({
        seltype: this.state.seltype, keyword: this.props.searchKeyword.keyword,
        page: pagenumber
      });
      // console.log(2)
    }
    else if (this.props.propsType === 'AllopinionList') {
      this.props.opinionSearchRequest(param);
      // console.log(3)
    } else {
      this.props.onDataChange(pagenumber);
      // console.log(4)
    }
  }

  showModal() {
    let filename = '';
    // if (propsType === 'AllopinionList') {
    //   filename = '导出汇总舆情数据';
    // } else if (propsType === 'TopicList') {
    //   filename = this.props.getRouterReducer.topicname;
    // } else {
    //   filename = this.props.clfId.clfname;
    // }
    this.setState({
      visible: true,
      fileName: filename
    })
  }
  handleOk() {
    this.setState({
      visible: false,
      downloadVisible: true,
      downloadFlag:true
    })
    let propsParamData = this.props.param;
    let arr = this.checkedTrue().join(',');

    if (arr.length === 0) {
      propsParamData.sid = 'all';
    } else {
      propsParamData.sid = arr + ',';
    }
    let time = formatDateTime(new Date());
    // let clfId = window.location.hash.split('?')[1].split('=')[1]
    let clfId = this.props.catId.topicid
      request(api_bidding_export, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `page=${propsParamData.page}&sids=${propsParamData.sid}&clfid=${clfId}&pagesize=${propsParamData.pagesize}&datetag=${propsParamData.datetag}&taskname=${this.state.fileName}&documenttype=excel&createdate=${time}&taskstate=0&source=clf&order=${propsParamData.order}&begin=${propsParamData.begin}&end=${propsParamData.end}&neg=${propsParamData.neg}&carry=${propsParamData.carry}&similer=${propsParamData.similer}&seltype=conten&keyword=`
      }).then(res => {
            this.setState({
              downloadFlag:false
            })
            window.location.href = res.data.downloadUrl
      })
  }
  handleCancel() {
    this.setState({
      visible: false
    })
  }

  fileNameChange(e) {
    const {value} = e.target;
    this.setState({
      fileName: value
    })
  }

  downloadHandleOk() {
    this.setState({
      downloadVisible: false
    })
    history.push({
      pathname: '/historyopinion',
      search: 'type=1'
    });
  }

  downloadHandleCancel() {
    this.setState({
      downloadVisible: false
    })
  }

  //收藏夹目录列表
  getMaterialOpinionList(){
    request(api_collection_opinion_list)
    .then(res => {
          this.setState({
             favCatList:res.data.favCatList
          })
    })
  }
  ondragend(e) {
    console.log('拖动结束')
    e.preventDefault();
}
  render() {
    const {page} = this.props;
    const flag = this.props.docList&& this.props.docList.length === 0?true:false;
    const docList = this.props.docList ? this.props.docList : [];      

    const OpinionDetailItems = docList[0] !== undefined && docList[0]['negative'] !== undefined ? docList.map((item, index) =>
        <li key={item.sid} className="opinion-detail-item" draggable="true" onDragEnd={this.ondragend.bind(this)}>
          <div className="cheackBox">
            <Checkbox checked={this.state.checkedArray[index]}
                      onChange={this.onChangeItem.bind(this, index)}
                      className="opinionCheack"
            />
          </div>
          <div className="iconBox">
            <div className="imgBox" style={this.state.isSummaryShow ? {display: 'block'} : {display: 'none'}}>
              <Tooltip title={item.carry === '综合' ? '其它' : item.carry} placement="bottomRight">
                <img src={this.state.carryAll[item.carry]} alt="" className="carryImg"/>
              </Tooltip>
            </div>
          </div>
          <div className="content">
            <div className="item-top">
              <div className="title"
                   title={item.title}
                   onClick={this.clickItemTitle.bind(this, item.sid)}
              >
                {
                  (() => {
                    if (this.state.isSearch && this.state.seltype === 'title') {
                      return <span dangerouslySetInnerHTML={{__html: (item.title && item.title.length > 35) ? setHighlightTags(item.title.slice(0, 35), Array(this.state.searchInputValue).concat([''])) + '...' : setHighlightTags(item.title, Array(this.state.searchInputValue).concat(['']))}}></span>
                    } else {
                      return (item.title && item.title.length > 35) ? item.title.slice(0, 35) + '...' : item.title
                    }
                  })()
                } 
              </div>
            </div>
            <div className="item-middle">
              <div className="left" style={this.state.isSummaryShow ? {display: 'block'} : {display: 'none'}}>
                <div>
                    { 
                      (() => {
                        if (this.state.isSearch) {
                            if (this.state.seltype === 'content') {
                              return <span className="summary" dangerouslySetInnerHTML={{__html: setHighlightTags(item.summary, Array(this.state.searchInputValue).concat(['']) )}}></span>
                            } else if (this.state.seltype === 'title') {
                              return <span className="summary" dangerouslySetInnerHTML={{__html: item.summary}}></span>
                            }
                        } else {
                          return <span className="summary" dangerouslySetInnerHTML={{__html: setHighlightTags(item.summary, item.nztags.split(' '))}}></span>
                        }
                      })()
                    }
                </div>
              </div>
            </div>
            <div className="item-bottom" style={this.state.isSummaryShow ? {display: 'flex'} : {display: 'none'}}>
              <div className="item-left">
                <div className="key">
                  <div className="pubdate">
                    <span className="date">{item.pubdate.split(' ')[0]} &nbsp;&nbsp;{item.pubdate.split(' ')[1]}</span>
                  </div>
                  <div
                    className="similar-info">相似信息：{item.similerInfo && (item.similerInfo.similerCount ? item.similerInfo.similerCount : 0)}条
                  </div>
                  <div className="resource">
                    <a href={item.url} target="_black">
                                  <span className="source"
                                        title={item.source}
                                  >{item.source}</span>
                    </a>
                  </div>
                  <div className="title">关键词：</div>
                  <div className={this.state.isSearch ? '' : 'keywords' }>
                    {item.nztags}
                  </div>

                </div>
              </div>
              <div className="item-right">
              <div className="cirleBox">
                    <div>
                      <Tooltip title='删除' placement="bottom">
                        <Popconfirm title="确定要删除这条信息吗？" onConfirm={this.deleteConfirm.bind(this, item.sid)}
                                    onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                          <img src={Del}  alt="删除"/>
                        </Popconfirm>
                      </Tooltip>
                    </div>
                  </div>
              </div>
            </div>
          </div>

        </li>
      ) :
      <BlankPage desc={this.props.propsType === 'TopicList' ?
        '<span>空空如也，赶紧去<a href="index.html#/topic/addtopic">添加</a>关键词</span>' :
        '<span>空空如也，赶紧去<a href="index.html#/sortedopinion/addrule">添加</a>关键词</span>'
      }/>
    ;
    const Loading = (
      <Spin tip="加载中...">
        <Alert
          message="正在加载数据..."
          description="请稍等，数据即将载入..."
          type="info"
        />
      </Spin>
    );
    const downLoading = (
      <Spin tip="生成中...">
          <Alert
          message="正在生成文档..."
          description="请稍等..."
          type="info"
          />
      </Spin>
    );
    return (
      <div className="opinion-detail">
        <div className="top" style={{background:GRAY}}>
          <div className="left">
            <div className="choose-all">
              <Checkbox onChange={this.chooseAllOnChange.bind(this)} checked={this.state.checkedAll}
                        className="check"></Checkbox>
            </div>
            <div className="operate-all-operation">全选：</div>
            <Popconfirm title="是否删除您选择的舆情？" onConfirm={this.deleteOpinionLists.bind(this)}
                        onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
              <Tooltip title='删除' placement="bottom">
                <div className="operate-all">
                  <img src={Del} alt="删除" style={{ height:'22px',marginTop:'2px'}}/>
                </div>
              </Tooltip>
            </Popconfirm>
            <Tooltip title='未勾选默认导出5000条' placement="bottom">
              <div className="operate-all" onClick={this.showModal.bind(this)}>
              <img src={Dowload} alt="export" style={{height:'18px',marginTop:'2px'}}/>
              </div>
            </Tooltip>
        
          </div>
          <Pagination
            simple
            defaultCurrent={1}
            pageSize={this.props.pageSize}
            onChange={this.onPaginationChange.bind(this)}
            total={this.props.pageInfo && this.props.pageInfo.count}
            getPopupContainer={() => document.querySelector('.all-opinion')}
            current={page}
          />
          <div className="inputSearch"
               style={this.props.propsType === 'AllopinionList' ? {visibility: 'visible'} : {
                 visibility: 'hidden',
                 width: '100px'
               }}>
            <div className="right">
              <InputGroup compact>
                <Select defaultValue="content" onChange={this.handleSearchChange.bind(this)} 
                 getPopupContainer={() => document.querySelector('.opinion-detail')}
                >
                  <Option value="content" className="selectFont">搜全文</Option>
                  <Option value="title" className="selectFont">搜标题</Option>
                </Select>
                <Input
                  style={{width: '150px'}}
                  placeholder="请输入您要搜索的内容"
                  onChange={this.searchInput.bind(this)}
                  onKeyDown = {this.keyDown.bind(this)}
                />
              </InputGroup>
            </div>
          </div>
        </div>
        <div className="bottom">
          { this.state.downloadFlag?downLoading:(null)}
          {flag ? Loading : (null)}
          <ul className="opinion-detail-wrapper">
            {OpinionDetailItems}
          </ul>
        </div>
        <Modal
          title="命名该文件"
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          footer={null}
          className="fileMdal"
        >
          <Input value={this.state.fileName}
                 onChange={this.fileNameChange.bind(this)}
                 maxLength={'20'}
          ></Input>
          <Button type="primary"
                  style={{margin: '20px 0 0 214px', width: '60px', height: '30px'}}
                  onClick={this.handleOk.bind(this)}
          >确定
          </Button>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    themeColor: state.changeThemeReducer,
    editNegRes: state.setOpinionTypeSucceededReducer.res,
    // materialList: state.getMaterialOpinionListSucceededReducer.data.reportCatList,
    // favCatList: state.getCollectionOpinionListSucceeded.data.favCatList,
    clfId: state.changeClfId.id,
    getTopicMessageSucceeded: state.getTopicMessageSucceeded.data,
    getRouterReducer: state.getRouterReducer,
    page: state.paginationPageReducer,
    searchKeyword: state.searchKeywordSyncReducer.ks
  }
};

const mapDispatchToProps = dispatch => {
  return {
    opinionSearchRequest: req => {
      dispatch(opinionSearchRequested(req));
    },
    searchKeywordSync: ks => {
      dispatch(searchKeywordSync(ks));
    },
    setOpinionType: type => {
      dispatch(setOpinionTypeRequested(type));
    },
    // getCollectionOpinionListRequested: () => {
    //   dispatch(getCollectionOpinionListRequested());
    // },
    // getMaterialOpinionListRequested: () => {
    //   dispatch(getMaterialOpinionListRequested());
    // },
    exportSkip: key => {
      dispatch(exportSkip(key));
    },
    paginationPage: req => {
      dispatch(paginationPage(req));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BiddingDetail);
