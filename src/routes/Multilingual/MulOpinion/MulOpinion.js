import React from 'react';
import request from '../../../utils/request';
import {connect} from 'react-redux';
import {
  getCollectionOpinionListRequested,
  getReportListRequested,
} from '../../../redux/actions/createActions';
import {
  api_edit_doc_neg,
  api_email_push,
  api_get_DetailForeign,
  api_delete_multilingual,
} from '../../../services/api';
import {Tag, Popconfirm, message, Select, Button } from 'antd';
import {opinionTypeToColor} from '../../../utils/format';
import './MulOpinion.less';
import IconFont from '../../../components/IconFont'
const Option = Select.Option;

class MulOpinion extends React.Component {
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
      sid: '',
      describe: {
        reltime: ['发布时间','게시 시간','発行時間','نام زمان','ཁྱབ་བསྒྲགས་བྱེད་ཡུན།'],
        source: ['来源','소스','ソース','منبع ','ཡོང་ཁུངས།'],
        author: ['作者','저자','著者','ساخت شخص','རྩོམ་པ་པོ།'],
        keyword: ['关键词','키워드','キーワード','کلید کلمه','གནད་ཚིག་འགའ།'],
        factor: ['要素','요소','要素','عناصر','རྒྱུ་རྐྱེན་གཙོ་བོ།']
      },
      language: ['中文', '한국어', '日本語', 'ئۇيغۇر يېزىقى', 'བོད་ཡིག། '],
      languageType: 0,
      yes: ['是', '이', 'はい', 'پۈتۈن دولەتتىن', 'རེད་'],
      no: ['否', '아니요', 'いいえ', 'ياق', 'ཧྥོའུ་'],
      warning: {
        tip: ['设为预警', '미리 경고하다', '警報に設定する', 'ئۈچۈن تەسىس قىلىنغان ئالدىن سىگنال بېرىش', 'འཛུགས་རྒྱུ་། ཉེན་ཟོན་སྔོན་བརྡ་གཏོང་བ་'],
        title: ['确定要将这条信息设置为预警吗？', '이 정보를 조기 경보로 설치 할 것 인가?', 'この情報を警報に設定しますか?', 'بۇ ئۇچۇرنى تەسىس قىلىش ئۈچۈن ئالدىن سىگنال بېرىش كېرەك ؟ ', 'ཆ་འཕྲིན་གཏན་འཁེལ་བྱ་དགོས་། དོན་ཚན་འདི་བཀོད་སྒྲིག་བྱས་པ་། ཉེན་ཟོན་སྔོན་བརྡའི་ཡོད་དམ་།']
      },
      negative: {
        tip: ['设为负面', '부정적인 것으로 꾸미다', '反対面に設定', 'يامان تەرەپكە ئۈچۈن تەسىس قىلىنغان', 'བཀག་རྒྱ་འཛུགས་རྒྱུ་།'],
        title: ['确定要将这条信息设置为负面吗', '이 정보를 부정적으로 설정 해야하 는가?', 'この情報を反対面に設定するか?', 'بۇ ئۇچۇرنى تەسىس قىلىش ئۈچۈن سەلبىي بېكىتىش كېرەك ؟ ', 'ཆ་འཕྲིན་གཏན་འཁེལ་བྱ་དགོས་། དོན་ཚན་འདི་བཀོད་སྒྲིག་བྱས་ནས་ལྡོག་ཕྱོགས་དམ་།？']
      },
      positive: {
        tip: ['设为正面', '정면으로 세우다', '良い方向に設定', 'تەسىس قىلىنغان ياخشى تەرەپكە', 'མདུན་ཕྱོགས་ལ་བསྐོ་བཞག་བྱས་'],
        title: ['确定要将这条信息设置为正面吗', '이 정보를 정면으로 설치 할 것 인가?', 'この情報を良い方向に設定するか?', 'بۇ ماددا ئۇچۇر بېكىتىش كېرەك ئۇدۇل تەسىس قىلىش ئۈچۈن', 'ཆ་འཕྲིན་གཏན་འཁེལ་བྱ་དགོས་། དོན་ཚན་འདི་བཀོད་སྒྲིག་བྱས་པ་། དྲང་ཕྱོགས་ཀྱི་དམ་།']
      },
      neutral: {
        tip: ['设为中性', '중성으로 세우다', '中性に設定する', 'نېيترال ئۈچۈن تەسىس قىلىنغان', 'མ་ནིང་འཛུགས་རྒྱུ་།'],
        title: ['确定要将这条信息设置为中性吗', '이 정보를 중성으로 만들어야 하나요?', 'この情報を中性に設定するか?', 'بۇ ئۇچۇرنى نېيترال بەلگىلەش كېرەك ؟ ', 'ཆ་འཕྲིན་གཏན་འཁེལ་བྱ་དགོས་། དོན་ཚན་འདི་བཀོད་སྒྲིག་ནི་མ་ནིང་དམ་།']
      },
      del: {
        tip: ['删除', '삭제', '削除', 'ئۆچۈرۈش', 'སུབ་པ་ ཞེས་པ་'],
        title: ['确定要删除这条信息吗？', '이 메시지를 삭제 해야 하나요?', 'この情報を削除するか？', 'بۇ ئۇچۇرنى ئۆچۈرەمسىز ؟', 'གཏན་འཁེལ་དོན་ཚན་འདི་བསུབ་ཆ་འཕྲིན་ཡོད་དམ་།？']
      },
      trend: {
        warning: ['预警', '예보', '警報', 'ئالدىن سىگنال بېرىش', 'ཉེ་བརྡ་'],
        negative: ['负面', '반면', '悪い面', 'پاسسىپ.', 'ལྡོག་ངོས་'],
        positive: ['正面', '정면', '正面', 'ئۇدۇل.', 'དྲང་ཕྱོགས་'],
        neutral: ['中性', '중성', '中性', 'نېيترال ', 'མ་ནིང།']
      }
    }
  }
  componentDidMount() {
    const sid = this.props.match.params.sid;
    const lang = this.props.match.params.param;
    this.setState({
      sid: this.props.match.params.sid,
      languageType: this.props.match.params.lang
    })
    request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + lang ).then((res) => {
      this.setState({
        data: res.data,
        keywords: Array(res.data.nztags),
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

  // 删除
  deleteConfirm(sid) {
    request(api_delete_multilingual + '&lang=' + this.props.match.params.param  + '&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        setTimeout(() => {
          window.close()
        }, 500);
      }
    });
  }

  // 确认删除
  // deleteConfirm(sid) {
  //   request(api_del_doc + '&sid=["' + sid + '"]&lang=' + this.props.match.params.param , {}).then((res) => {
  //     if (res.data.code === 1) {
  //       message.success(res.data.msg);
  //       setTimeout(() => {
  //         window.close()
  //       }, 500);
  //     }
  //   });
  // }



  // 倾向设置
  editDocNeg(sid, neg) {
    request(api_edit_doc_neg + '&lang='+ this.props.match.params.param +'&neg='+ neg +'&sid=["' + sid + '"]', {}).then(res => {
      if (res.data.code === 1) {
        message.success(res.data.msg);
        request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + this.props.match.params.param ).then((res) => {
          this.setState({
            data: res.data,
            keywords: res.data.keyword,
            content: res.data.content
          });
        })
      }
    })
  }





  // // 确定设为负面
  // negativeConfirm(sid) {
  //   request(api_edit_doc_neg + '&neg=1&sid=["' + sid + '"]' + '&lang='+ this.props.match.params.param, {}).then((res) => {
  //     if (res.data.code === 1) {
  //       message.success(res.data.msg);
  //       request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + this.props.match.params.param, {})
  //         .then((res) => {
  //           const keywords = (res.data.nrtags) ? (res.data.nrtags) : [''];
  //           this.setState({
  //             data: res.data,
  //             keywords: keywords
  //           })
  //         });
  //     }
  //   });


  // }

  // // 确定设为预警
  // warningConfirm(sid) {
  //   request(api_edit_doc_neg + '&neg=2&sid=["' + sid + '"]' + '&lang='+ this.props.match.params.param, {}).then((res) => {
  //     if (res.data.code === 1) {
  //       message.success(res.data.msg);
  //       request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + this.props.match.params.param, {})
  //         .then((res) => {
  //           const keywords = (res.data.nrtags) ? (res.data.nrtags) : [''];
  //           this.setState({
  //             data: res.data,
  //             keywords: keywords
  //           })
  //         });
  //     }
  //   });
  // }

  // // 确定设为正面
  // positiveConfirm(sid) {
  //   request(api_edit_doc_neg + '&neg=-1&sid=["' + sid + '"]' + '&lang='+ this.props.match.params.param, {}).then((res) => {
  //     if (res.data.code === 1) {
  //       message.success(res.data.msg);
  //       request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + this.props.match.params.param, {})
  //         .then((res) => {
  //           const keywords = (res.data.nrtags) ? (res.data.nrtags) : [''];
  //           this.setState({
  //             data: res.data,
  //             keywords: keywords
  //           })
  //         });
  //     }
  //   });
  // }

  // // 确定设为中性
  // neutralConfirm(sid) {
  //   request(api_edit_doc_neg + '&neg=0&sid=["' + sid + '"]' + '&lang='+ this.props.match.params.param, {}).then((res) => {
  //     if (res.data.code === 1) {
  //       message.success(res.data.msg);
  //       request(api_get_DetailForeign + '&sid=' + sid + '&lang=' + this.props.match.params.param, {})
  //         .then((res) => {
  //           const keywords = (res.data.nrtags) ? (res.data.nrtags) : [''];
  //           this.setState({
  //             data: res.data,
  //             keywords: keywords
  //           })
  //         });
  //     }
  //   });
  // }

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

  toggleLan () {
    if(this.state.languageType === 0 ){
      this.setState({
        languageType: this.props.match.params.languages
      })
    }else{
      this.setState({
        languageType: 0
      })
    }
  }
  getTag(trend) {
    switch (trend&&trend.trim()) {
      case '中性':
        return  this.state.trend.neutral[this.state.languageType]
        break;
      case '预警':
        return  this.state.trend.warning[this.state.languageType]
        break;
      case '负面':
        return  this.state.trend.negative[this.state.languageType]
        break;
      case '正面':
      return  this.state.trend.positive[this.state.languageType]
        break;
      default:
        break;
    }
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
    const Keywords = this.state.keywords.map((item, index) =>
      <span key={index} className="value-item">{item}</span>
    );
    // const factor = data.keyword !== undefined ? data.keyword : [1];
    const factor = data.keyword !== undefined ? data.keyword : [];
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
                            {/* {console.log(this.state.trend, [data.negative])} */}
                                {/* <Tag style={opinionTypeToColor(data.negative)}>{data.negative ? this.state.trend[data.negative][this.state.languageType] : ''}</Tag> */}
                                <Tag style={opinionTypeToColor(data.negative)}>{this.getTag(data.negative)}</Tag>
                            </div>
                            <p className="title">{data.title}</p>
                        </div>
                        {/* <Button type="primary" className="btn" onClick={this.toggleLan.bind(this)}>{this.state.languageType === 0? this.state.language[this.state.languageType]: '中文'}</Button> */}
                        <Button type="primary" className="btn" onClick={this.toggleLan.bind(this)}>{this.state.languageType-0 === 0 ? this.state.language[this.props.match.params.languages] : '中文'}</Button>
                        <div className="info">
                            <div className="pubdate">
                                <span className="name">{data.pubdate ? this.state.describe.reltime[this.state.languageType] + '：' : ''}</span>
                                <span className="value">{data.pubdate}</span>
                            </div>
                            <div className="pubdate">
                                <span className="name">{data.source ? this.state.describe.source[this.state.languageType] + '：' : ''}</span>
                                <span className="value"><a href={data.url} target="blank">{data.source}</a></span>
                            </div>
                            <div className="pubdate">
                                <span className="name">{data.author ? this.state.describe.author[this.state.languageType] + '：' : ''}</span>
                                <span className="value">{data.author}</span>
                            </div>
                        </div>
                        <div className="keywords">
                            <div className="keywords-left">
                                {/* <span className="name">{this.state.describe.keyword[this.state.languageType]}：</span> */}
                                <span className="name">{this.state.keywords.length >=0 ? this.state.describe.keyword[this.state.languageType] + '：' : ''}</span>
                                <div className="value">
                                    {Keywords}
                                </div>
                            </div>
                        </div>
                        <div className="mention-topic">
                            {/* <span className="name">{this.state.describe.factor[this.state.languageType]}：</span> */}
                            <span className="name">{factor.length >=0 && factor[0] ? this.state.describe.factor[this.state.languageType] + '：' : ''}</span>
                            <div className="value">
                                {factorElement}
                            </div>
                        </div>
                        <div className="operation">
                        <div className="itemBox">
                            <Popconfirm title={this.state.warning.title[this.state.languageType]} onConfirm={this.editDocNeg.bind(this, this.state.sid, 2)} onCancel={this.deleteCancel.bind(this)} okText={this.state.yes[this.state.languageType]} cancelText={this.state.no[this.state.languageType]}>
                                <div className="operation-item" title={this.state.warning.tip[this.state.languageType]}>
                                <IconFont type="icon-shandian" />
                                </div>
                            </Popconfirm>
                            <Popconfirm title={this.state.negative.title[this.state.languageType]} onConfirm={this.editDocNeg.bind(this, this.state.sid, 1)} onCancel={this.deleteCancel.bind(this)} okText={this.state.yes[this.state.languageType]} cancelText={this.state.no[this.state.languageType]}>
                                <div className="operation-item" title={this.state.negative.tip[this.state.languageType]}>
                                <IconFont type="icon-fumianxinxi"/>
                                </div>
                            </Popconfirm>
                            <Popconfirm title={this.state.positive.title[this.state.languageType]} onConfirm={this.editDocNeg.bind(this, this.state.sid, -1)} onCancel={this.deleteCancel.bind(this)} okText={this.state.yes[this.state.languageType]} cancelText={this.state.no[this.state.languageType]}>
                                <div className="operation-item" title={this.state.positive.tip[this.state.languageType]}>
                                <IconFont type="icon-zheng" style={{fontSize:'22px',marginTop:'2px'}}/>
                                </div>
                            </Popconfirm>
                            <Popconfirm title={this.state.neutral.title[this.state.languageType]} onConfirm={this.editDocNeg.bind(this, this.state.sid, 0)} onCancel={this.deleteCancel.bind(this)} okText={this.state.yes[this.state.languageType]} cancelText={this.state.no[this.state.languageType]}>
                                <div className="operation-item item-font" title={this.state.neutral.tip[this.state.languageType]}>
                                <IconFont type="icon-zhong1" style={{fontSize:'21px'}}/> 
                                </div>
                            </Popconfirm>

                            <Popconfirm title={this.state.del.title[this.state.languageType]} onConfirm={this.deleteConfirm.bind(this, this.state.sid)} onCancel={this.deleteCancel.bind(this)} okText={this.state.yes[this.state.languageType]} cancelText={this.state.no[this.state.languageType]}>
                                <div className="operation-item" title={this.state.del.tip[this.state.languageType]}>
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
export default connect(mapStateToProps, mapDispatchToProps)(MulOpinion);
