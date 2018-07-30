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
  api_edit_doc_neg, api_push_material, api_push_collection,
  api_allopinion_exportskip, api_topic_export_word, api_delete_multilingual } from '../../../services/api';
import {GRAY} from '../../../utils/colors';
import {
  opinionSearchRequested,
  searchKeywordSync,
  setOpinionTypeRequested,
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
        positive: ['正面', '정면', '正面', 'ئۇدۇل.', 'དྲང་ཕྱོགས་', 'positive'],
        neutral: ['中性', '중성', '中性', 'نېيترال ', 'མ་ནིང།', 'neutral'],
        negative: ['负面', '반면', '悪い面', 'پاسسىپ.', 'ལྡོག་ངོས', 'Negative'],
        warning: ['预警', '예보', '警報', 'ئالدىن سىگنال بېرىش ', 'ཉེ་བརྡ་', 'Early warning']
      },
      allSelect: ['全选：', '모두 선택:', '全選：', 'ھەممىسى. ', 'ཡོངས་འདེམས།：', 'select all'],
      similarInfo: ['相似信息', '비슷 한 정보', '相似信息', 'ئوخشاش ئۇچۇر.', 'འདྲ་མཚུངས་ཀྱི་ཆ་འཕྲིན།', 'Similar information'],
      infoCompany: ['条', '건수', '条', 'ماددا ', 'དོན་ཚན།', 'Article'],
      keyWord:['关键词', '키워드', 'キーワード', 'ھالقىلىق سۆز بولۇپ قالدى.', 'གནད་ཚིག་འགའ།', 'Key words'],
      deltips:{
        tip: ['删除', '삭제', '削除', 'ئۆچۈرۈش', ' སུབ་པ་ ཞེས་པ་', 'delete'],
        title: ['确定要删除这条信息吗？', '이 메시지를 삭제 해야 하나요?', 'この情報を削除するか？', 'بۇ ئۇچۇرنى ئۆچۈرەمسىز ؟', 'གཏན་འཁེལ་དོན་ཚན་འདི་བསུབ་ཆ་འཕྲིན་ཡོད་དམ་།', 'Are you sure you want to delete this message?'],
        yes: ['是', '이', 'はい', 'پۈتۈن دولەتتىن', 'རེད་', 'yes'],
        no: ['否', '아니요', 'いいえ', 'ياق', 'ཧྥོའུ་', 'no']
      },
      trendtips: {
        tips: ['设置倾向', '경향을 세우다', '傾向性を設定する', 'تەسىس قىلىش خاھىشى ', 'ཕྱོགས་ལྷུང་བཀོད་སྒྲིག་', 'Setting tendency'],
        title: ['设置这条信息的倾向', '이 소식을 세우는 경향', 'このメッセージの傾向性を設定する', 'بۇ خەۋەر تەسىس قىلىش خاھىشى', 'གནས་ཚུལ་འདི་བཀོད་སྒྲིག་བྱེད་པའི་ཕྱོགས་ལྷུང་', 'The tendency to set this message'],
        Positive: ['正面', '정면', '正面', 'ئۇدۇل.', 'དྲང་ཕྱོགས་', 'positive'],
        neutral: ['中性', '중성', '中性', 'نېيترال ', 'མ་ནིང།', 'neutral'],
        negative: ['负面', '반면', '悪い面', 'پاسسىپ.', 'ལྡོག་ངོས་', 'Negative'],
        warning: ['预警', '예보', '警報', 'ئالدىن سىگنال بېرىش', 'ཉེ་བརྡ་', 'Early warning']
      },
      delActiveTips: {
        tip: ['删除', '삭제', '削除', 'ئۆچۈرۈش', ' སུབ་པ་ ཞེས་པ་', 'delete'],
        title: ['是否删除您选择的舆情？', '당신이 선택 한 언론 정보를 삭제하 는가？', '選択した世論情報を削除するか？', 'مەشغۇلاتنى بىكار قىلىش？', 'ཁྱོད་ཀྱིས་གདམས་པའི་གླེང་ཕྱོགས་སུབ་པ་མིན་？', 'Whether to delete the lyrics of your choice?'],
        yes: ['是', '이', 'はい', 'پۈتۈن دولەتتىن', 'རེད་', 'yes'],
        no: ['否', '아니요', 'いいえ', 'ياق', 'ཧྥོའུ་', 'no'] 
      },
      trendActiveTips: {
        trend: ['倾向','경향', '倾向', 'خاھىش', 'ཁ་ཕྱོགས་པ་', 'tendency'],
        Positive: ['正面', '정면', '正面', 'ئۇدۇل.', 'དྲང་ཕྱོགས་', 'positive'],
        neutral: ['中性', '중성', '中性', 'نېيترال ', 'མ་ནིང།', 'neutral'],
        negative: ['负面', '반면', '悪い面', 'پاسسىپ.', 'ལྡོག་ངོས་', 'Negative'],
        warning: ['预警', '예보', '警報', 'ئالدىن سىگنال بېرىش', 'ཉེ་བརྡ་', 'Early warning']
      },
      export: {
        tip: ['未勾选默认导出5000条', '선택이 없는 상태에서 5000 건을 묵인 했다', '未選択の場合、5000件を導出する', 'كۆڭۈلدىكى تېخى تاللىسىڭىز ، 5000 كەلتۈرۈپ چىقىرىلغان ماددا', 'མ་5000 དྲངས་ཕྱུང་ཀུན་གྱི་ཁས་ལེན་བཅད་བདམས་།', 'Unchecked default export 5000'],
        title: ['命名该文件', '이 문건을 명명하다', 'この文書を命名する', 'بۇ ھۆججەت نام بېرىش', 'མིང་བཏགས་ཡིག་ཆ་', 'Name the file'],
        submit: ['确定', '확정', '確定', 'ئېنىق', 'གཏན་ལ་ཕབ་པ་', 'determine']
      },
      leastOne:  ['至少选择一项', '적어도 한 개를 선택 해라', '少なくとも1つ選択する。', 'ھېچ بولمىغاندا بىر تۈرلۈك ', 'མ་མཐར་ཡང་གདམ་ག་ཞིག་', 'Choose at least one item'],
      cancel: ['取消操作', '조작을 취소하다', '取り消す', 'مەشغۇلاتنى بىكار قىلىش', 'བཀོལ་སྤྱོད་མེད་པ་བཟོས་', 'Cancel operation'],
      generation: ['生成中...', '생성 과정...', '作成中...', '...ھاسىل قىلىش داۋامىدا', 'སྐྱེས་གྲུབ་ནང་...', 'Generated...'],
      handleTip: {
        delsucess: ['删除成功', '성공을 지우다', '削除成功', 'ئۆچۈرۈلدى. ئۆچۈرۈلدى', 'སྐོར་བསུབས་ཡོད་པ་བཅས་གྲུབ་འབྲས་ཐོབ་པའི་ངང་', 'successfully deleted'],
        positivesucess: ['成功设置为正面', '성공', '成功', 'مۇۋەپپەقىيەت', 'གྲུབ་འབྲས་ཐོབ་པའི་ངང་འཇོག་དཔྲལ་པའི་', 'Successfully placed positive'],
        neutralsuccess: ['成功设置为中性', '성공', '成功', 'مۇۋەپپەقىيەت', 'གྲུབ་འབྲས་ཐོབ་པའི་ངང་མ་ནིང་འཇོག་ཆེད་།', 'Successfully set to neutral'],
        negativesuccess: ['成功设置为负面', '성공', '成功', 'مۇۋەپپەقىيەت', 'གྲུབ་འབྲས་ཐོབ་པའི་ངང་བཀོད་ནས་ལྡོག་ཕྱོགས་', 'Success is negative'],
        warningsuccess: ['成功设置为预警', '성공', '成功', 'مۇۋەپپەقىيەت', 'གྲུབ་འབྲས་ཐོབ་པའི་ངང་སྔོན་བརྡའི་ཆེད་འཇོག་', 'Successfully set an early warning'],
      },
      wait: ['请稍等', '잠깐기다 려 주세요.', 'ちょっとお待ちください', 'سەل ساقلاڭلار', 'ཏོག་ཙམ་སྒུག་གནང་ཨ་', 'Please wait'],
      Loading: ['加载中', '적재 중', 'ローディング中', 'يۈكلىنۋاتىدۇ', 'ཤུགས་སྣོན་ཁྲོད་', 'Loading'],
      Generationdoc: ['正在生成文档', '서류 가 만들어 져 있다', '作成中， ちょっとお待ちください', 'ھازىر ھاسىل قىلىش ئارخىپ', 'སྐྱེས་གྲུབ་ཡིག་ཚགས་བཞིན་ཡོད་།', 'Generating document']
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
    window.open(window.location.origin + window.location.pathname + '#/multilingual/detail/' + sid + '/'+ this.props.langnum +'/'+ this.props.lang+ '/'+ this.props.languageType)
  }

  // 删除
  deleteConfirm(sid) {
    request(api_delete_multilingual + '&lang=' + this.props.lang  + '&sid=["' + sid + '"]', {}).then((res) => {
      if (res.data.code === 1) {
        message.success(this.state.handleTip.delsucess[this.props.languageType]);
        this.props.onDataChange(this.state.page);
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
        switch (neg) {
          case 1:
            // 负面
            message.success(this.state.handleTip.negativesuccess[this.props.languageType]);
            break;
          case 0:
            // 中性
            message.success(this.state.handleTip.neutralsuccess[this.props.languageType]);
            break
          case -1:
            // 正面
            message.success(this.state.handleTip.positivesucess[this.props.languageType]);
            break
          case 2:
            // 预警
            message.success(this.state.handleTip.warningsuccess[this.props.languageType]);
            break
        }
        
        this.props.onDataChange(this.state.page);
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
    message.error(this.state.cancel[this.props.languageType]);
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
      message.warning(this.state.leastOne[this.props.languageType]);
    } else {
      const sidList = JSON.stringify(arr);
      request(api_edit_doc_neg + '&lang='+ this.props.lang + '&neg=-1&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(this.state.handleTip.positivesucess[this.props.languageType]);
          this.props.onDataChange(this.state.page);
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
      message.warning(this.state.leastOne[this.props.languageType]);
    } else {
      const sidList = JSON.stringify(arr);
      request(api_edit_doc_neg + '&lang='+ this.props.lang + '&neg=0&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(this.state.handleTip.neutralsuccess[this.props.languageType]);
          this.props.onDataChange(this.state.page);
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
      message.warning(this.state.leastOne[this.props.languageType]);
    } else {
      const sidList = JSON.stringify(arr);
      request(api_edit_doc_neg + '&lang='+ this.props.lang + '&neg=1&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(this.state.handleTip.negativesuccess[this.props.languageType]);
          this.props.onDataChange(this.state.page);
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
      message.warning(this.state.leastOne[this.props.languageType]);
    } else {
      const sidList = JSON.stringify(arr);
      request(api_edit_doc_neg + '&lang='+ this.props.lang + '&neg=2&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(this.state.handleTip.warningsuccess[this.props.languageType]);
          this.props.onDataChange(this.state.page);
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
      message.warning(this.state.leastOne[this.props.languageType]);
    } else {
      const sidList = JSON.stringify(arr);
      request(api_delete_multilingual + '&lang='+ this.props.lang + '&sid=' + sidList, {}).then((res) => {
        if (res.data.code === 1) {
          message.success(this.state.handleTip.delsucess[this.props.languageType]);
          this.props.onDataChange(this.state.page);
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
      message.warning(this.state.leastOne[this.props.languageType]);
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
                  <div className="similar-info">
                    <div className="similar-left">
                      {this.state.similarInfo[this.props.languageType]}：
                    </div>
                    <div className="similar-right">
                      {item.similerInfo && (item.similerInfo.similerCount ? item.similerInfo.similerCount : 0)}{this.state.infoCompany[this.props.languageType]}
                    </div>
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
                      <Tooltip title={this.state.deltips.tip[this.props.languageType]} placement="bottom">
                        <Popconfirm title={this.state.deltips.title[this.props.languageType]} onConfirm={this.deleteConfirm.bind(this, item.sid)}
                                    onCancel={this.deleteCancel.bind(this)} okText={this.state.deltips.yes[this.props.languageType]} cancelText={this.state.deltips.no[this.props.languageType]}>
                          <img src={Del}  alt="删除"/>
                        </Popconfirm>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title={this.state.trendtips.tips[this.props.languageType]} placement="bottom">
                        <Popover
                          content={
                            <div>
                              <Button type="primary" size="small"
                                      onClick={this.editDocNeg.bind(this, item.sid, 1)}>{this.state.trendtips.negative[this.props.languageType]}</Button>
                              <Button type="primary" size="small" style={{marginLeft: '30px'}}
                                      onClick={this.editDocNeg.bind(this, item.sid, 0)}>{this.state.trendtips.neutral[this.props.languageType]}</Button>
                              <Button type="primary" size="small" style={{marginLeft: '30px'}}
                                      onClick={this.editDocNeg.bind(this, item.sid, -1)}>{this.state.trendtips.Positive[this.props.languageType]}</Button>
                              <Button type="primary" size="small" style={{marginLeft: '30px'}}
                                      onClick={this.editDocNeg.bind(this, item.sid, 2)}>{this.state.trendtips.warning[this.props.languageType]}</Button>
                            </div>
                          }
                          title={this.state.trendtips.title[this.props.languageType]}
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
          <span onClick={this.setPositiveLists.bind(this)} className="inclination">{this.state.trendActiveTips.Positive[this.props.languageType]}</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span onClick={this.setMiddleLists.bind(this)} className="inclination">{this.state.trendActiveTips.neutral[this.props.languageType]}</span>
        </Menu.Item>
        <Menu.Item key="2">
          <span onClick={this.setNegativeLists.bind(this)} className="inclination">{this.state.trendActiveTips.negative[this.props.languageType]}</span>
        </Menu.Item>
        <Menu.Item key="3">
          <span onClick={this.setWarningLists.bind(this)} className="inclination">{this.state.trendActiveTips.warning[this.props.languageType]}</span>
        </Menu.Item>
      </Menu>
    );
    const Loading = (
      <Spin tip={this.state.Loading[this.props.languageType] + '...'}>
        <Alert style={{height: 100}}
          type="info"
        />
      </Spin>
    );
    const downLoading = (
      <Spin tip={this.state.generation[this.props.languageType]}>
          <Alert 
          message={this.state.Generationdoc[this.props.languageType] + '...'}
          description={this.state.wait[this.props.languageType] + '...'}
          type="info"
          />
      </Spin>
    );
    const left = () => {
      // console.log(this.props.lang, this.props.languageType)
      if(this.props.languageType-0 === 3) {
        return <div className="left">
            <Dropdown overlay={ChangeTrendMenu} trigger={['click']}
                      getPopupContainer={() => document.querySelector('.mul-detail')}>
              <Tooltip title={this.state.trendActiveTips.trend[this.props.languageType]} placement="bottom">
                <div className="operate-all">
                <img src={Qing} alt="倾向" style={{height:'18px',width:'18px'}}/>
                </div>
              </Tooltip>
            </Dropdown>
            <Tooltip title={this.state.export.tip[this.props.languageType]} placement="bottom">
              <div className="operate-all" onClick={this.showModal.bind(this)}>
              <img src={Dowload} alt="export" style={{height:'18px',marginTop:'2px'}}/>
              </div>
            </Tooltip>
            <Popconfirm title={this.state.delActiveTips.title[this.props.languageType]} onConfirm={this.deleteOpinionLists.bind(this)}
                        onCancel={this.deleteCancel.bind(this)} okText={this.state.delActiveTips.yes[this.props.languageType]} cancelText={this.state.delActiveTips.no[this.props.languageType]}>
              <Tooltip title={this.state.delActiveTips.tip[this.props.languageType]} placement="bottom">
                <div className="operate-all">
                  <img src={Del} alt="删除" style={{ height:'22px',marginTop:'2px'}}/>
                </div>
              </Tooltip>
            </Popconfirm>
            <div className="choose-all">
                <Checkbox onChange={this.chooseAllOnChange.bind(this)} checked={this.state.checkedAll}
                          className="check">
                </Checkbox>
            </div>
            <div className="operate-all-operation">{this.state.allSelect[this.props.languageType]}</div>
          </div>
      } else {
        return <div className="left">
            <div className="choose-all">
                <Checkbox onChange={this.chooseAllOnChange.bind(this)} checked={this.state.checkedAll}
                          className="check"></Checkbox>
              </div>
              <div className="operate-all-operation">{this.state.allSelect[this.props.languageType]}</div>
              <Popconfirm title={this.state.delActiveTips.title[this.props.languageType]} onConfirm={this.deleteOpinionLists.bind(this)}
                        onCancel={this.deleteCancel.bind(this)} okText={this.state.delActiveTips.yes[this.props.languageType]} cancelText={this.state.delActiveTips.no[this.props.languageType]}>
              <Tooltip title={this.state.delActiveTips.tip[this.props.languageType]} placement="bottom">
                <div className="operate-all">
                  <img src={Del} alt="删除" style={{ height:'22px',marginTop:'2px'}}/>
                </div>
              </Tooltip>
            </Popconfirm>
              <Tooltip title={this.state.export.tip[this.props.languageType]} placement="bottom">
                <div className="operate-all" onClick={this.showModal.bind(this)}>
                <img src={Dowload} alt="export" style={{height:'18px',marginTop:'2px'}}/>
                </div>
              </Tooltip>
              <Dropdown overlay={ChangeTrendMenu} trigger={['click']}
                        getPopupContainer={() => document.querySelector('.mul-detail')}>
                <Tooltip title={this.state.trendActiveTips.trend[this.props.languageType]} placement="bottom">
                  <div className="operate-all">
                  <img src={Qing} alt="倾向" style={{height:'18px',width:'18px'}}/>
                  </div>
                </Tooltip>
              </Dropdown>
          </div>
      }
    }
    
    return (
      <div className="mul-detail">
        <div className={this.props.languageType-0 === 3 ? 'uygur top' : 'top'} style={{background:GRAY}} >
        {left()}
          {/* <div className="left">
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
          </div> */}

          <Pagination
            simple
            defaultCurrent={1}
            pageSize={this.props.pageSize}
            onChange={this.onPaginationChange.bind(this)}
            total={this.props.pageInfo && this.props.pageInfo.count}
            getPopupContainer={() => document.querySelector('.all-opinion2')}
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
          title={this.state.export.title[this.props.languageType]}
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
          >{this.state.export.submit[this.props.languageType]}
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
