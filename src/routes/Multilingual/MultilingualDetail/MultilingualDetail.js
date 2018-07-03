import "babel-polyfill";
import React from 'react';
import {connect} from 'react-redux';
import {
  Checkbox, Input, Menu, Dropdown, Popconfirm, message, Popover, Button,
  Spin, Alert, Select, Pagination, Modal,Tooltip
} from 'antd';
import {history} from '../../../utils/history';
import './MultilingualDetail.less';
import {opinionColor, setHighlightTags, formatDateTime} from '../../../utils/format';
import request from '../../../utils/request';
import {
  api_edit_doc_neg, api_del_doc, api_push_material, api_push_collection,
  api_allopinion_exportskip, api_topic_export_word, api_delete_multilingual } from '../../../services/api';
import {GRAY} from '../../../utils/colors';
import {
  opinionSearchRequested,
  searchKeywordSync,
  setOpinionTypeRequested,
  deleteMultilingual,
  exportSkip,
  paginationPage
} from '../../../redux/actions/createActions';
import Store from '../../../redux/store/index';
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
import Qing from '../../../assets/img/qing.svg';
import Del from '../../../assets/img/del.svg'; 
import Dowload from '../../../assets/img/dowload.svg';
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from "constants";
const InputGroup = Input.Group;
const Option = Select.Option;
class OpinionDetail extends React.Component {
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
      isSearch: false,
      negText: {
        positive: ['正面', '정면', '正面', 'ئۇدۇل.', 'དྲང་ཕྱོགས་'],
        neutral: ['中性', '중성', '中性', 'نېيترال ', 'མ་ནིང།'],
        negative: ['负面', '반면', '悪い面', 'پاسسىپ.', 'ལྡོག་ངོས'],
        warning: ['预警', '예보', '警報', 'ئالدىن سىگنال بېرىش ', 'ཉེ་བརྡ་']
      },
      allSelect: ['全选', '전부', 'すべて', 'بارلىق ', 'ཚང་མ།'],
      similarInfo: ['相似信息', '비슷 한 정보', '相似信息', 'ئوخشاش ئۇچۇر.', 'འདྲ་མཚུངས་ཀྱི་ཆ་འཕྲིན།'],
      infoCompany: ['条', '건수', '条', 'ماددا ', 'དོན་ཚན།'],
      keyWord:['关键词', '키워드', 'キーワード', 'ھالقىلىق سۆز بولۇپ قالدى.', 'གནད་ཚིག་འགའ།']
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
    // window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
    window.open(window.location.origin + window.location.pathname + '#/multilingual/detail/' + sid + '/'+ this.props.languageType +'/'+ this.props.lang)
  }

  // 删除
  deleteConfirm(sid) {
    request(api_delete_multilingual + '&lang=' + this.props.lang  + '&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        this.props.onDataChange(1);
        this.setState({
          checkedArray:new Array(40).fill(false)
        })
      }
    });
  }


  // 倾向设置
  editDocNeg(sid,neg) {
    request(api_edit_doc_neg + '&lang='+ this.props.lang +'&neg='+ neg +'&sid=["' + sid + '"]', {}).then(res => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        this.props.onDataChange(1);
        this.setState({
          checkedArray:new Array(40).fill(false)
        })
      }
    })
    this.setState({
      popVisible: false,
    });
  }

  handleVisibleChange(index, popVisible) {
    this.setState({
      popIndex: index,
      popVisible,
    });
  }


  // 取消操作
  deleteCancel(e) {
    message.error('取消操作');
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
      request(api_edit_doc_neg + '&lang='+ this.props.lang + '&neg=-1&sid=' + sidList, {}).then((res) => {
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
      request(api_edit_doc_neg + '&lang='+ this.props.lang + '&neg=0&sid=' + sidList, {}).then((res) => {
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
      request(api_edit_doc_neg + '&lang='+ this.props.lang + '&neg=1&sid=' + sidList, {}).then((res) => {
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
      request(api_edit_doc_neg + '&lang='+ this.props.lang + '&neg=2&sid=' + sidList, {}).then((res) => {
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
      request(api_delete_multilingual + '&lang='+ this.props.lang + '&sid=' + sidList, {}).then((res) => {
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

  //导出功能的跳转
  onExportSkip() {
    let propsType = this.props.propsType;
    let taskname = propsType === 'AllopinionList' ? '导出汇总舆情数据' : Store.getState().getTopicLocationSucceededReducer.res.topicname;
    let propsParamData = this.props.param;
    let arr = this.checkedTrue().join(',');
    if (arr.length === 0) {
      propsParamData.sid = 'all';
    } else if (this.checkedTrue().length === this.props.pageSize) {
      propsParamData.sid = this.props.pageSize;
    } else {
      propsParamData.sid = arr + ',';
    }
    let time = formatDateTime(new Date());
    if (propsType === 'AllopinionList') {
      request(api_allopinion_exportskip, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `page=${propsParamData.page}&sids=${propsParamData.sid}&pagesize=${propsParamData.pagesize}&datetag=${propsParamData.datetag}&taskname=${taskname}&documenttype=excel&createdate=${time}&taskstate=0&source=monitor&order=${propsParamData.order}&begin=${propsParamData.begin}&end=${propsParamData.end}&neg=${propsParamData.neg}&carry=${propsParamData.carry}&similer=${propsParamData.similer}&seltype=conten&keyword=`
      })

    } else if (propsType === 'TopicList') {
      request(api_allopinion_exportskip, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `topicName=${this.props.getRouterReducer.topicname}&topicid=${this.props.getRouterReducer.topicid}&sids=${propsParamData.sid}&page=${propsParamData.page}&pagesize=${propsParamData.pagesize}&datetag=${propsParamData.datetag}&taskname=${this.props.getRouterReducer.topicname}&documenttype=excel&createdate=${time}&taskstate=0&source=topic&order=${propsParamData.order}&begin=${propsParamData.begin}&end=${propsParamData.end}&neg=${propsParamData.neg}&carry=${propsParamData.carry}&similer=${propsParamData.similer}&seltype=conten&keyword=`
      })
    } else {
      request(api_topic_export_word, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `&clfname=${this.props.clfId.clfname}&clfid=${this.props.clfId.clfid}&sids=${propsParamData.sid}&page=${propsParamData.page}&pagesize=${propsParamData.pagesize}&datetag=${propsParamData.datetag}&taskname=${this.props.clfId.clfname}&documenttype=excel&createdate=${time}&taskstate=0&source=clf&order=${propsParamData.order}&begin=${propsParamData.begin}&end=${propsParamData.end}&neg=${propsParamData.neg}&carry=${propsParamData.carry}&similer=${propsParamData.similer}&seltype=conten&keyword=`
      })
    }

    history.push({
      pathname: '/historyopinion',
      search: 'type=1'
    });
  }

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
    } else if (this.props.searchKeyword.type === 1) {
      this.props.opinionSearchRequest({
        seltype: this.state.seltype, keyword: this.props.searchKeyword.keyword,
        page: pagenumber
      });
    }
    else if (this.props.propsType === 'AllopinionList') {
      this.props.opinionSearchRequest(param);
    } else {
      this.props.onDataChange(pagenumber);
    }
  }

  showModal() {
    let propsType = this.props.propsType;
    let filename = '';
    if (propsType === 'AllopinionList') {
      filename = '导出汇总舆情数据';
    } else if (propsType === 'TopicList') {
      filename = this.props.getRouterReducer.topicname;
    } else {
      filename = this.props.clfId.clfname;
    }
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
    let propsType = this.props.propsType;
    let propsParamData = this.props.param;
    let arr = this.checkedTrue().join(',');

    if (arr.length === 0) {
      propsParamData.sid = 'all';
    } else {
      propsParamData.sid = arr + ',';
    }
    let time = formatDateTime(new Date());
    request(api_allopinion_exportskip, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `page=${propsParamData.page}&sids=${propsParamData.sid}&lang=${this.props.lang}&pagesize=${propsParamData.pagesize}&datetag=${propsParamData.datetag}&taskname=${this.state.fileName}&documenttype=excel&createdate=${time}&taskstate=0&source=monitor&order=${propsParamData.order}&begin=${propsParamData.begin}&end=${propsParamData.end}&neg=${propsParamData.neg}&carry=${propsParamData.carry}&similer=${propsParamData.similer}&seltype=conten&keyword=`
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

  //单条加入素材库
  materialConfirm(sid, e) {
    request(api_push_material + '&catid=' + e.key + '&sid=["' + sid + '"]').then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
      }
    });
  }

  //单条加入收藏
  collectionlConfirm(sid, e) {
    request(api_push_collection + '&catid=' + e.key + '&sid=["' + sid + '"]').then((res) => {
      if (res.data.code === 1) {
        message.success('舆情文章添加到收藏夹成功');
      }
    });
  }

  // 舆情负面类型
  opinionTrend(num) {
    let type = '正面';
    if (num === -1) {
        type = this.state.negText.positive[this.props.languageType];
    } else if (num === 0) {
        type = this.state.negText.neutral[this.props.languageType];
    } else if (num === 1) {
        type = this.state.negText.negative[this.props.languageType];
    } else {
        type = this.state.negText.warning[this.props.languageType];
    }
    return type;
  }
  render() {
    const {page} = this.props;
    // console.log
    const flag = this.props.docList&& this.props.docList.length === 0?true:false;
    const docList = this.props.docList ? this.props.docList : [];    


    const OpinionDetailItems = docList[0] !== undefined && docList[0]['negative'] !== undefined ? docList.map((item, index) =>
        <li key={item.sid} className="opinion-detail-item">
          <div className="cheackBox">
            <Checkbox checked={this.state.checkedArray[index]}
                      onChange={this.onChangeItem.bind(this, index)}
                      className="opinionCheack"
            />
          </div>
          <div className="iconBox">
            <div className="negative">
              <div className="inner-type" style={opinionColor(item.negative)}>
                {this.opinionTrend(item.negative)}
              </div>
            </div>
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
                    className="similar-info">{this.state.similarInfo[this.props.languageType]}：{item.similerInfo && (item.similerInfo.similerCount ? item.similerInfo.similerCount : 0)}{this.state.infoCompany[this.props.languageType]}
                  </div>
                  <div className="resource">
                    <a href={item.url} target="_black">
                                  <span className="source"
                                        title={item.source}
                                  >{item.source}</span>
                    </a>
                  </div>
                  <div className="title">{this.state.keyWord[this.props.languageType]}：</div>
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
                    <div>
                      <Tooltip title='设置倾向' placement="bottom">
                        <Popover
                          content={
                            <div>
                              <Button type="primary" size="small"
                                      onClick={this.editDocNeg.bind(this, item.sid, 1)}>负面</Button>
                              <Button type="primary" size="small" style={{marginLeft: '30px'}}
                                      onClick={this.editDocNeg.bind(this, item.sid, 0)}>中性</Button>
                              <Button type="primary" size="small" style={{marginLeft: '30px'}}
                                      onClick={this.editDocNeg.bind(this, item.sid, -1)}>正面</Button>
                              <Button type="primary" size="small" style={{marginLeft: '30px'}}
                                      onClick={this.editDocNeg.bind(this, item.sid, 2)}>预警</Button>
                            </div>
                          }
                          title="设置这条信息的倾向"
                          trigger="click"
                          onVisibleChange={this.handleVisibleChange.bind(this, index)}
                          visible={this.state.popVisible && this.state.popIndex === index}
                        >
                         <img src={Qing} alt="倾向" style={{height:'18px',width:'18px'}}/>
                        </Popover>
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
    const ChangeTrendMenu = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={this.setPositiveLists.bind(this)}>正面</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span onClick={this.setMiddleLists.bind(this)}>中性</span>
        </Menu.Item>
        <Menu.Item key="2">
          <span onClick={this.setNegativeLists.bind(this)}>负  面</span>
        </Menu.Item>
        <Menu.Item key="3">
          <span onClick={this.setWarningLists.bind(this)}>预  警</span>
        </Menu.Item>
      </Menu>
    );
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
            <div className="operate-all-operation">{this.state.allSelect[this.props.languageType]}：</div>
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
            <Dropdown overlay={ChangeTrendMenu} trigger={['click']}
                      getPopupContainer={() => document.querySelector('.opinion-detail')}>
              <Tooltip title='倾向' placement="bottom">
                <div className="operate-all">
                <img src={Qing} alt="倾向" style={{height:'18px',width:'18px'}}/>
                </div>
              </Tooltip>
            </Dropdown>
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
        {/* <Modal
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
    deleteMultilingual: req => {
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

export default connect(mapStateToProps, mapDispatchToProps)(OpinionDetail);
