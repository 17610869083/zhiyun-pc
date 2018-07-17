import React from 'react';
import request from '../../../utils/request';
import {connect} from 'react-redux';
import {
  getCollectionOpinionListRequested,
  getReportListRequested,
} from '../../../redux/actions/createActions';
import {
  api_get_doc_detail,
  api_get_doc_similar,
  api_email_push,
  api_docsend_push,
  api_bidding_message_del
} from '../../../services/api';
import {Popconfirm, message, Select} from 'antd';
import {setHighlightTags, getMeailMessage} from '../../../utils/format';
import './Biddingpinion.less';
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

  closeSimilar() {
    this.setState({
      isClose: !this.state.isClose
    })
  }

  // 确认删除
  deleteConfirm(sid) {
    request(api_bidding_message_del + '&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        setTimeout(() => {
          window.close()
        }, 500);
      }
    });
  }

  // 取消操作
  deleteCancel(e) {
    message.error('取消操作');
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
               {/* <Icon type="rollback" className="arrowLeft" title="回到上一页" onClick={this.preUrl.bind(this)}/> */}
                <div className="wrapper">
                    <div className="Top">
                        <div className="title-wrapper">
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
                            <Popconfirm title="确定要删除这条信息吗？" onConfirm={this.deleteConfirm.bind(this, sid)} onCancel={this.deleteCancel.bind(this)} okText="是" cancelText="否">
                                <div className="operation-item" title="删除">
                                <IconFont type="icon-shanchu1-copy-copy"/>
                                </div>
                            </Popconfirm>
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
