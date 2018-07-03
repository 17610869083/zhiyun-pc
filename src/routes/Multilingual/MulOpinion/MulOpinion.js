import React from 'react';
import request from '../../../utils/request';
import Kindeditor from '../../../components/Kindeditor/Kindeditor.js';
import {connect} from 'react-redux';
import {
  getCollectionOpinionListRequested,
  getReportListRequested,
} from '../../../redux/actions/createActions';
import {
  api_edit_doc_neg,
  api_del_doc,
  api_get_doc_detail,
  api_get_doc_similar,
  api_put_into_report,
  api_push_collection,
  api_docedit_save,
  api_email_push,
  api_docsend_push,
  api_get_DetailForeign
} from '../../../services/api';
import EditOpinionDetail from '../../../components/EditOpinionDetail/EditOpinionDetail';
import {Tag, Popconfirm, message, Icon, Modal, Menu, Dropdown, Select, Input} from 'antd';
import {history} from '../../../utils/history';
import {setHighlightTags, opinionTypeToColor, getMeailMessage} from '../../../utils/format';
import './MulOpinion.less';
import Store from '../../../redux/store/index'
import IconFont from '../../../components/IconFont'
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
  componentDidMount() {
    const sid = this.props.match.params.sid;
    const lang = this.props.match.params.param;
    this.setState({
      sid: this.props.match.params.sid
    })
    request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + lang ).then((res) => {
      this.setState({
        data: res.data,
        keywords: res.data.keyword,
        content: res.data.content
      });
    })
  }
  // componentDidUpdate(prevProps, prevState) {
  //   // console.log(this.props.match.params.sid, this.props.match.params.languages, this.props.match.params.param)
  //   if (prevState.num !== this.state.num) {
  //     const sid = this.props.match.params.sid;
  //     const lang = this.props.match.params.param;
  //     request (api_get_DetailForeign + '&sid=' + sid + '&lang=' + lang ).then((res) => {
  //       console.log(res)
  //     })
  //   }
  // }


  closeSimilar() {
    this.setState({
      isClose: !this.state.isClose
    })
  }

  // 确认删除
  deleteConfirm(sid) {
    request(api_del_doc + '&sid=["' + sid + '"]&lang=' + this.props.match.params.param , {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        setTimeout(() => {
          window.close()
        }, 500);
      }
    });
  }

  // 确定设为负面
  negativeConfirm(sid) {
    request(api_edit_doc_neg + '&neg=1&sid=["' + sid + '"]' + '&lang='+ this.props.match.params.param, {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + this.props.match.params.param, {})
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
    request(api_edit_doc_neg + '&neg=2&sid=["' + sid + '"]' + '&lang='+ this.props.match.params.param, {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + this.props.match.params.param, {})
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
    request(api_edit_doc_neg + '&neg=-1&sid=["' + sid + '"]' + '&lang='+ this.props.match.params.param, {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + this.props.match.params.param, {})
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
    request(api_edit_doc_neg + '&neg=0&sid=["' + sid + '"]' + '&lang='+ this.props.match.params.param, {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + this.props.match.params.param, {})
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


  // 推送
  pushConfirm() {
    setTimeout(() => {
      message.success("推送成功！");
    }, 1000);

  }


  emailInput = (e) => {
    const {value} = e.target;
    this.setState({
      emailInput: value
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
        return (            
            <div className="detail-opinion">
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
                            <Popconfirm title="确定要将这条信息设置为预警吗？" onConfirm={this.warningConfirm.bind(this, this.state.sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item" title="设为预警">
                                <IconFont type="icon-shandian" />
                                </div>
                            </Popconfirm>
                            <Popconfirm title="确定要将这条信息设置为负面吗？" onConfirm={this.negativeConfirm.bind(this, this.state.sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item" title="设为负面">
                                <IconFont type="icon-fumianxinxi"/>
                                </div>
                            </Popconfirm>
                            <Popconfirm title="确定要将这条信息设置为正面吗？" onConfirm={this.positiveConfirm.bind(this, this.state.sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item" title="设为正面">
                                <IconFont type="icon-zheng" style={{fontSize:'22px',marginTop:'2px'}}/>
                                </div>
                            </Popconfirm>
                            <Popconfirm title="确定要将这条信息设置为中性吗？" onConfirm={this.neutralConfirm.bind(this, this.state.sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item item-font" title="设为中性">
                                <IconFont type="icon-zhong1" style={{fontSize:'21px'}}/> 
                                </div>
                            </Popconfirm>

                            <Popconfirm title="确定要删除这条信息吗？" onConfirm={this.deleteConfirm.bind(this, this.state.sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item" title="删除">
                                <IconFont type="icon-shanchu1-copy-copy"/>
                                </div>
                            </Popconfirm>
                                {/* <div className="operation-item" title="推送" onClick={this.searchEmail.bind(this)}>
                                <IconFont type="icon-tuisongguize"/> 
                                </div> */}
                            </div>
                            <div className="keywords-right">
                              
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
