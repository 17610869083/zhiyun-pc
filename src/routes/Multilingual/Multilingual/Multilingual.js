import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Pagination, DatePicker, Form, message, Button} from 'antd';
import OpinionDetail from '../MultilingualDetail/MultilingualDetail';
import {opinionSearchRequested, searchKeywordSync, paginationPage, getSortedContentRequested, mulLanToggle} from '../../../redux/actions/createActions';
// import {} from '../../../redux/actions/actions'
import {URLToObject, getSecondTime} from '../../../utils/format';
import {GRAY} from '../../../utils/colors';
import './Multilingual.less';
const FormItem = Form.Item;
class AllOpinion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: [
        {
          name: ['全部', '전부', 'すべて','بارلىق', 'ཚང་མ།', 'All'],
          value: 'all'
        },
        {
          name: ['今天', '오늘', '今日', 'بۈگۈن', 'དི་རིང་', 'Nowadays'],
          value: 'today'
        },
        {
          name: ['昨天', '어제', '昨日', 'تۈنۈگۈن', 'ཁ་སང།', 'yesterday'],
          value: 'yestoday'
        },
        {
          name: ['近7天', '7일이내', '7日間', 'كىرىپ يەتتە كۈن', 'ཉེ་བའི་ཉིན་བདུན་', 'Nearly 7 days'],
          value: '7day'
        },
        {
          name: ['近30天', '30일이내', '30日間', 'كىرىش 30 كۈن', 'ལོ་ངོ་སུམ་བཅུ་ཉིན།', 'Nearly 30 days'],
          value: '30day'
        },
        {
          name: ['自定义', '사용자 정의', 'カスタマイズ', 'ئۆزلۈكىدىن ئېنىقلىما بېرىش', 'རང་གི་མཚན་ཉིད།', 'customize'],
          value: 'custom'
        }
      ],
      isTopShow: true,
      timeValue: 'all',
      trend: [
        {
          name: ['全部', '전부', 'すべて','بارلىق .', 'ཚང་མ།', 'All'],
          value: 'all'
        },
        {
          name: ['正面', '정면', '正面', 'ئۇدۇل.', 'དྲང་ཕྱོགས་', 'positive'],
          value: -1
        },
        {
          name: ['中性', '중성', '中性', 'نېيترال', 'མ་ནིང།', 'neutral'],
          value: 0
        },
        {
          name: ['负面', '반면', '悪い面', 'پاسسىپ.', 'ལྡོག་ངོས་', 'Negative'],
          value: 1
        },
        {
          name: ['预警', '예보', '警報', 'ئالدىن سىگنال بېرىش', 'ཉེ་བརྡ་', 'Early warning'],
          value: 2
        }
      ],
      trendValue: 'all',
      sort: [
        {
          name: ['时间降序', ' 시간의 오름차순', '時間降順', 'ۋاقىت تۆۋەنلەش تەرتىپى', 'དུས་ཚོད་ཀྱི་ཕྱགས་རིམ།པ་', 'Time descending'],
          value: 'timedown'
        },
        {
          name: ['时间升序', '시간의 내림차순', '時間昇順', 'ۋاقىت ئىچىدە', 'དུས་ཚོད་ཀྱི་ཕར་རིམ།', 'Time ascending'],
          value: 'timeup'
        }
      ],
      sortValue: 'timedown',
      filter: [
        {
          name: ['不去重', '중복허가', '重複を取り除かない', 'تەكرار يوقىتىش ئەمەس ', 'བྱེད་བསྐྱར་ཟློས།', 'Don\'t go heavy'],
          value: 1
        },
        { 
          name: ['去重', '중복배제', '重複を取り除く', 'چىقىرىپ تەكرار.', 'མི་བྱེད་བསྐྱར་ཟློས།', 'De-weighting'],
          value: 0
        }
      ],
      filterValue: 1,
      media: [
        {count: 0, value: "全部", key: "docApp"},

        {count: 0, value: "APP", key: "docApp"},

      ],
      mediaValue: '全部',
      page: 1,
      pagesize: 20,
      pageCount: 500,
      count: 0,
      begin: '0000-00-00 01:00:00',
      end: '0000-00-00 02:00:00',
      timePickerShow: false,
      current: 1,
      type: 0,
      endTime: '',
      mediaList:{
        'app':'APP',
        'blog':'博客',
        'medium':'平媒',
        'wechat':'微信',
        'weibo':'微博',
        'news':'新闻',
        'forum':'论坛'
      },
      languageType: 0,
      // allLanguage: ['中文', '韩文']
      OptiionTitle:{
        time: ['时间：', '시간：', '時間：', '：ۋاقىت ', 'དུས་ཚོད：་', 'time'],
        inclination: ['倾向：', '경향：', '倾向：', '：خاھىش',  'ཁ་ཕྱོགས་པ་：', 'tendency'],
        sort: ['排序：', '정렬：', '順位：', '：تەرتىپ بويىچە ', 'མོ་ཊ་ནས་མར་བབས་རོགས་：', 'Sort'],
        removal: ['去重：', '중복배제：','重複：' , '：تەكرار ', 'བསྐྱར་ཟློས་：', 'Whether to go heavy'],
        media: ['媒体：', '미디어：', 'メディア：', '：ئاخبارات ۋاستىلىرى.', 'ཆ་འཕྲིན་：', 'media']
      },
      infoList: ['信息列表', '정보 목록', '情報リスト', 'ئۇچۇر جەدۋىلى', 'ཆ་འཕྲིན་རེའུ་མིག་བཀོད།', ''],
      language: ['', 'kr', 'jp', 'uygur', 'zang', 'en'],
      CHlan: ['中文', '한국어', '日本語', 'ئۇيغۇر يېزىقى', 'བོད་ཡིག། ', 'English'],
      timePlaceholder: {
        begin: ['开始日期', '시작일', '開始日', 'باشلىنىش كۈنى ', 'འགོ་ཚུགས་པའི་ཉིན།', 'start date'],
        end: ['结束日期', '종료일', '終了日', 'ئاخىرلاشتۇرغان كۈن ', 'ཚར་བའི་ཉིན་', 'End date'],
        submit: ['确定', '확인', '確定', 'بېكىتىلگەن ', 'གཏན་ཁེལ།', 'determine']
      },
      StateMediaList: {
        '全部': ['全部', '전부', 'すべて', 'بارلىق ', 'ཚང་མ།', 'All'],
        '新闻': ['新闻', '뉴스', 'ニュース', 'ئاخبارات.', 'གསར་འགྱུར།', 'news'],
        '论坛': ['论坛', '포럼', 'フォーラム', 'مۇنبەر.', 'གླེང་སྟེགས།', 'forum'],
        '博客': ['博客', '블로그', 'ブログ', 'بىلوگ.', 'པོད་ཁུག་', 'Blog'],
        '微博': ['微博', '웨이보', '微博', 'مىكرو بىلوگ.', 'དཔོད་ཆུང།', 'Weibo'],
        '微信': ['微信', 'WeChat', 'WeChat', 'ئۈندىدار.', 'འཕྲིན་ཐུང།', 'WeChat'],
        '平媒': ['平媒', '플랫 미디어', '平面メディア', 'تەكشى ۋاسىتىسى', 'ངོས་མཉམ་གྱི་ཆ་འཕྲིན', 'Flat media'],
        'APP': ['APP', 'APP', 'アプリ', 'APP', 'APP', 'APP']
      },
      timeError: {
        startBigToEnd: ['开始时间请不要大于结束时间', '시간이 짧은 시간 보다는 시간을 더 주십시오', '開始時間は終了時間より大きくないでください。', 'باشلىنىش ۋاقتى قىلماڭ ئاخىرلاشقان ۋاقىت تىن يۇقىرى', 'མ་བྱེད་རོགས་། མཇུག་རྫོགས་པའི་དུས་ཚོད་ལས་ཆེ་བ་འགོ་ཚུགས་པའི་དུས་ཚོད་།', 'Please do not start longer than the end time'],
        startBigToNow: ['开始时间请不要大于当前时间', '시작 시간은 현재의 시간보다 더 크게 하지 마세요', '開始時間は、現在の時間より大きくないでください。', 'باشلىنىش ۋاقتى قىلماڭ كۈندىكى ۋاقىت', 'མ་བྱེད་རོགས་། སྐབས་དེའི་དུས་ཚོད་ལས་ཆེ་བ་འགོ་ཚུགས་པའི་དུས་ཚོད་།', 'Please do not start more than the current time'],
        endBigToNow: ['结束时间请不要大于当前时间', '마감 시간은 현재의 시간보다 크게 마시지 마세요', '終了時間は、現在の時間より大きくないでください。', 'ئاخىرلاشقان ۋاقىت قىلماڭ كۈندىكى ۋاقىت ', 'དུས་ཚོད་མཇུག་རྫོགས་སྐབས་དེའི་དུས་ཚོད་ལས་ཆེ་བ་མ་བྱེད་རོགས་།', 'Please do not exceed the current time at the end time']
      },
      prevhash: '',
      prevlan: ''
    }
    
  }
  timeClick(value) {
    this.setState({
      timeValue: value
    });
    if (value === 'custom') {
      this.setState({
        timePickerShow: !this.state.timePickerShow
      })
      return
    } else {
      this.setState({
        timePickerShow: false
      })
    }
      const param = {
        pagesize: this.state.pagesize,
        datetag: value,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        page:this.props.page,
        carry: this.state.mediaValue,
        lang: this.state.language[this.props.match.params.languages],
        clfid: this.props.getRouter.topicid
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
  }

  // 选择具体时间
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      let rangeTimeValue = fieldsValue['range-time-picker'];
      const rangeEndTimeValue = fieldsValue['range-endtime-picker'];
      const values = {
        ...fieldsValue,
        'range-time-picker': [
          rangeTimeValue.format('YYYY-MM-DD HH:mm:ss'),
          rangeEndTimeValue.format('YYYY-MM-DD HH:mm:ss'),
        ]
      };
      const begin = values['range-time-picker'][0];
      const end = values['range-time-picker'][1];
      if (getSecondTime(begin) > Math.round(new Date())) {
        message.error(this.state.timeError.startBigToNow[this.state.languageType]);
        return;
      }
      else if (getSecondTime(begin) > getSecondTime(end)) {
        message.error(this.state.timeError.startBigToEnd[this.state.languageType]);
        return;
      }
      else if (getSecondTime(end) > Math.round(new Date())){
        message.error(this.state.timeError.endBigToNow[this.state.languageType])
      }
      const timeValue = 'custom';
      this.setState({
        begin: begin,
        end: end,
        timeValue: 'custom',
      });
        const param = {
          pagesize: this.state.pagesize,
          datetag: timeValue,
          neg: this.state.trendValue,
          order: this.state.sortValue,
          similer: this.state.filterValue,
          page:this.props.page,
          carry: this.state.mediaValue,
          begin: begin,
          end: end,
          clfid: this.props.getRouter.topicid,
          lang:this.state.language[this.props.match.params.languages]
        }
        this.props.opinionSearchRequest(param);
        this.props.paginationPage(1);
    });
  } 

  trendClick(value) {
    this.setState({
      trendValue: value
    });
    let param = {
      lang:this.state.language[this.props.match.params.languages],
      pagesize: this.state.pagesize,
      datetag: this.state.timeValue,
      neg: value,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      page:this.props.page,
      carry: this.state.mediaValue,
      clfid: this.props.getRouter.topicid
    };
    if (this.state.timeValue === 'custom') {
      param.begin = this.state.begin
      param.end = this.state.end
    }
    
    this.props.opinionSearchRequest(param);
    this.props.paginationPage(1);
  }

  sortClick(value) {
    this.setState({
      sortValue: value
    });
    let param = {
      lang:this.state.language[this.props.match.params.languages],
      pagesize: this.state.pagesize,
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: value,
      similer: this.state.filterValue,
      page:this.props.page,
      carry: this.state.mediaValue,
      clfid: this.props.getRouter.topicid
    };
    if (this.state.timeValue === 'custom') {
      param.begin = this.state.begin
      param.end = this.state.end
    }
    this.props.opinionSearchRequest(param);
    this.props.paginationPage(1);
      
  }

  filterClick(value) {
    this.setState({
      filterValue: value
    });
      let param = {
        lang:this.state.language[this.props.match.params.languages],
        pagesize: this.state.pagesize,
        datetag: this.state.timeValue,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: value,
        page:this.props.page,
        carry: this.state.mediaValue,
        clfid: this.props.getRouter.topicid
      };
      if (this.state.timeValue === 'custom') {
        param.begin = this.state.begin
        param.end = this.state.end
      }
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
      
  }

  mediaClick(value) {
    this.setState({
      mediaValue: value
    });
    let param = {
      lang:this.state.language[this.props.match.params.languages],
      pagesize: this.state.pagesize,
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      page:this.props.page,
      carry: value,
      clfid: this.props.getRouter.topicid
    };
    if (this.state.timeValue === 'custom') {
      param.begin = this.state.begin
      param.end = this.state.end
    }
    this.props.opinionSearchRequest(param);
    this.props.paginationPage(1);
  }


  onPaginationChange(pagenumber) {
    this.setState({
      page: pagenumber
    });
    let param='';
      param = {
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      carry: this.state.mediaValue,
      begin: this.state.begin,
      end: this.state.end,
      page: pagenumber,
      pagesize: this.state.pagesize,
      lang:this.state.language[this.props.match.params.languages],
      clfid: this.props.getRouter.topicid
    };
    this.props.opinionSearchRequest(param);
    this.props.paginationPage(pagenumber);
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  triggerTopShow() {
    if(this.state.languageType === 0 ){
      this.setState({
        languageType: this.props.match.params.languages
      });
    } else {
      this.setState({
        languageType: 0
      });
    }
  }

  dataChanged(pagenum) {
      const param = {
        datetag: this.state.timeValue,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        page: pagenum,
        pagesize: this.state.pagesize,
        lang: this.state.language[this.props.match.params.languages],
        clfid: this.props.getRouter.topicid
      };
      this.props.opinionSearchRequest(param);
  }

  homepageMore(pathname) {
    // if (pathname === '#/allopinion?datetag=today') {
    //   this.setState({
    //     timeValue: 'today'
    //   })
    // } else if (pathname === '#/allopinion?datetag=today&neg=1') {
    //   this.setState({
    //     timeValue: 'today',
    //     trendValue: 1
    //   })
    // } else if (pathname === '#/allopinion?datetag=all&neg=1') {
    //   this.setState({
    //     timeValue: 'all',
    //     trendValue: 1
    //   })
    // }
    // else if (pathname === '#/allopinion?datetag=today&neg=2') {
    //   this.setState({
    //     timeValue: 'today',
    //     trendValue: 2
    //   })
    // }else if (pathname === '#/allopinion?datetag=today&neg=all') {
    //   this.setState({
    //     timeValue: 'today',
    //     trendValue: 'all'
    //   })
    // }else if (pathname === '#/allopinion?datetag=all&neg=2') {
    //   this.setState({
    //     timeValue: 'all',
    //     trendValue: 2
    //   })
    // } 
    // else if (pathname === '#/allopinion?carry=weibo&neg=all') {
    //   this.setState({
    //     mediaValue: '微博',
    //     trendValue: 'all'
    //   })
    // } else if (pathname === '#/allopinion?carry=weibo&neg=1') {
    //   this.setState({
    //     mediaValue: '微博',
    //     trendValue: 1
    //   })
    // }else if (pathname.indexOf('media') !== -1){
    //    let media =  pathname.split('&')[0].split('=')[1];
    //    let day =  pathname.split('&')[1].split('=')[1];
    //    this.setState({
    //     mediaValue: this.state.mediaList[media],
    //     timeValue: day
    //    })
    // } else {
    //   this.setState({
    //     timeValue: 'all'
    //   })
    // }
    // debugger
    // const obj = URLToObject(pathname);
    // const newabj = {clfid: this.props.getRouter.topicid}
    // const param = {
    //   lang:this.state.language[this.props.match.params.languages],
    //   pagesize: this.state.pagesize,
    //   datetag: this.state.timeValue,
    //   neg: this.state.trendValue,
    //   order: this.state.sortValue,
    //   similer: this.state.filterValue,
    //   page:this.props.page,
    // }  
    // const newParam = Object.assign(param, newabj);
    // console.log(this.props.getRouter)
    // this.props.opinionSearchRequest(newParam);
  }

  componentWillMount() {
    window.onload = () => {this.props.mulLanToggle(this.props.match.params.languages)}
      // this.props.mulLanToggle(this.props.match.params.languages)
      let reg = /^[0-5]$/
      if(reg.test(this.props.match.params.languages)) {
        this.setState({
          languageType: this.props.match.params.languages
        })
      }
    // if (this.props.location && this.props.location.search !== "?type=search") {
    //   this.homepageMore(window.location.hash);
    // }
  }
  componentWillReceiveProps(newProps){
    // if(this.props.match.url !== newProps.match.url) {
    //   this.setState({
    //     languageType: newProps.languages
    //   })
    // }
    // else{
    //   this.setState({
    //     languageType: newProps.match.params.languages
    //   })
    // }
    this.setState({
        languageType: newProps.languages
    })
    this.setState({
      prevhash: window.location.hash
    })
    if(newProps.match.params.languages !== this.props.match.params.languages){
      newProps.mulLanToggle(newProps.match.params.languages)
      this.setState({
        timeValue: 'all',
        trendValue: 'all',
        sortValue: 'timedown',
        filterValue: 1,
        mediaValue: '全部',
        begin: '0000-00-00 01:00:00',
        end: '0000-00-00 02:00:00',
      })
    }
    let param = {
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      carry: this.state.mediaValue,
      begin: this.state.begin,
      end: this.state.end,
      page: this.state.page,
      pagesize: this.state.pagesize,
      lang: this.state.language[newProps.match.params.languages],
      clfid: newProps.getRouter.topicid
    }
    if (this.props.location.search === newProps.location.search) return false;
    this.props.opinionSearchRequest(param);
    this.props.paginationPage(1);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  componentWillUnmount() {
    this.props.paginationPage(1);
  }

  dateChange(date, dateString) {
    this.setState({
      endTime: dateString
    })
  }

  remove(){
    this.setState({
       timeValue:'all', 
       trendValue:'all' ,
       filterValue:1,
       mediaValue:'全部',
       sortValue:'timedown'
    })
  }
  myReverse (arr) {
    let [...newArr] = arr
    return newArr.reverse()
  }
  render() {
    let {docList, carryCount=[{count: 0, key: "all", value: "全部"}], pageInfo={count:0}, page} = this.props;
    if (!(carryCount instanceof Array)) carryCount = [{count: 0, key: "all", value: "全部"}]
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
      },
    };

    // const Time = this.state.time.map((item, index) =>
    //   <div
    //     key={index}
    //     onClick={this.timeClick.bind(this, item.value)}
    //     className={item.value === this.state.timeValue ? 'item active' : 'item'}
    //   ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
    // );
    // 时间
    const Time =  () => {
      if (this.state.languageType-0 === 3) {
        return this.myReverse(this.state.time).map((item, index) =>
          <div
            key={index}
            onClick={this.timeClick.bind(this, item.value)}
            className={item.value === this.state.timeValue ? 'item active' : 'item'}
          ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
        );
        
      } else{
        return this.state.time.map((item, index) =>
          <div
            key={index}
            onClick={this.timeClick.bind(this, item.value)}
            className={item.value === this.state.timeValue ? 'item active' : 'item'}
          ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
        );
      }
    }


    // 倾向
    // const Trend = this.state.trend.map((item, index) =>
    //   <div
    //     key={index}
    //     onClick={this.trendClick.bind(this, item.value)}
    //     className={item.value === this.state.trendValue ? 'item active' : 'item'}
    //   ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
    // );
   // 倾向
    const Trend = () => {
      if (this.state.languageType-0 === 3) {
          return this.myReverse(this.state.trend).map((item, index) =>
          <div
            key={index}
            onClick={this.trendClick.bind(this, item.value)}
            className={item.value === this.state.trendValue ? 'item active' : 'item'}
          ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
        );
      }else {
        return this.state.trend.map((item, index) =>
                <div
                  key={index}
                  onClick={this.trendClick.bind(this, item.value)}
                  className={item.value === this.state.trendValue ? 'item active' : 'item'}
                ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
        );
      }
    }
    // 排序
    // const Sort = this.state.sort.map((item, index) =>
    //   <div
    //     key={index}
    //     onClick={this.sortClick.bind(this, item.value)}
    //     className={item.value === this.state.sortValue ? 'fours active' : 'fours'}
    //   ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
    // );

    // 排序
    const Sort = () => {
      if (this.state.languageType-0 === 3) {
        return this.myReverse(this.state.sort).map((item, index) =>
                <div
                  key={index}
                  onClick={this.sortClick.bind(this, item.value)}
                  className={item.value === this.state.sortValue ? 'fours active' : 'fours'}
                ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
                );
      } else {
        return this.state.sort.map((item, index) =>
                  <div
                    key={index}
                    onClick={this.sortClick.bind(this, item.value)}
                    className={item.value === this.state.sortValue ? 'fours active' : 'fours'}
                  ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
                );
      }      
    }

    // 去重
    // const Filter = this.state.filter.map((item, index) =>
    //   <div
    //     key={index}
    //     onClick={this.filterClick.bind(this, item.value)}
    //     className={item.value === this.state.filterValue ? 'item active' : 'item'}
    //   ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
    // );

    // 去重
    const Filter = () => {
      if(this.state.languageType-0 === 3) {
        return this.myReverse(this.state.filter).map((item, index) =>
                <div
                  key={index}
                  onClick={this.filterClick.bind(this, item.value)}
                  className={item.value === this.state.filterValue ? 'item active' : 'item'}
                ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
              );
      }else{
        return this.state.filter.map((item, index) =>
                <div
                  key={index}
                  onClick={this.filterClick.bind(this, item.value)}
                  className={item.value === this.state.filterValue ? 'item active' : 'item'}
                ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
              );
      }
    }

    // 媒体类型
    // const Media = carryCount.map((item, index) =>
    //   <div
    //     key={index}
    //     onClick={this.mediaClick.bind(this, item.value)}
    //     className={item.value === this.state.mediaValue ? 'item active' : 'item'}
    //   ><p className="item-inner">{item.key === 'docSearch' ? '其它' : this.state.StateMediaList[item.value][this.state.languageType]}</p>
    //     <p className="count">{item.count}</p>
    //   </div>
    // );

    // 媒体类型
    const Media = () => {
      if (this.state.languageType-0 === 3) {
        return this.myReverse(carryCount).map((item, index) =>
                  <div
                    key={index}
                    onClick={this.mediaClick.bind(this, item.value)}
                    className={item.value === this.state.mediaValue ? 'item active' : 'item'}
                  ><p className="item-inner">{item.key === 'docSearch' ? '其它' : this.state.StateMediaList[item.value][this.state.languageType]}</p>
                    <p className="count">{item.count}</p>
                  </div>
                );
      }else {
        return carryCount.map((item, index) =>
                <div
                  key={index}
                  onClick={this.mediaClick.bind(this, item.value)}
                  className={item.value === this.state.mediaValue ? 'item active' : 'item'}
                ><p className="item-inner">{item.key === 'docSearch' ? '其它' : this.state.StateMediaList[item.value][this.state.languageType]}</p>
                  <p className="count">{item.count}</p>
                </div>
              );
      }
    }
    // 搜索数据数量  //      -ماددا سانلىق مەلۇمات
    const searchNum = (num) => {
      let leftarr = ['根据您的条件，为您筛选出','님이 지정한 조건에 부합되는', 'あなたの条件によると、', '! ماددا سانلىق مەلۇمات'+ '-' , 'ལ་གཞིགས་ནས་ཁྱེད་ཀྱི་ཆ་རྐྱེན་ཁྱེད་འདེམས་སྒྲུག་ཐོན་', 'Filter'];
      let rightarr = ['条数据!', '개의 데이터를 검색하였습니다!', '件のデータをピックアップします!', 'سىزنىڭ شەرتىڭىز ئاساسەن ، سىز ئۈچۈن تاللاپ چىقىلغان','དོན་ཚན་གཞི་གྲངས།!', 'data for you based on your criteria!']
      return `<span style=float:left>${leftarr[this.state.languageType]}</span><span class="number">${num}</span><span>${rightarr[this.state.languageType]}</span>`
    }
    const param = {
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      carry: this.state.mediaValue,
      begin: this.state.begin,
      end: this.state.end,
      page: this.state.page,
      pagesize: this.state.pagesize,
    };
    return (
      <div className="all-opinion2" id="anchor">
        {/* <div className="close-open" style={{background:GRAY}}>
          <div className="count">{this.state.infoList[this.state.languageType]}</div>
          <div className="close" onClick={this.triggerTopShow.bind(this)}>
            <span className="closeBtn">{this.state.languageType === 0 ? this.state.CHlan[this.props.match.params.languages] : '中文'}</span>
          </div>
        </div> */}
        <div className="sort-top" style={this.state.isTopShow ? {display: 'block'} : {display: 'none'}}>
          <div className={this.state.languageType-0 === 3? 'uygur sort-items' : 'sort-items'}>
            <div className="left">{this.state.OptiionTitle.time[this.state.languageType]}</div>
            <div className="right">
              {Time()}
            </div>
            <div className="other" style={this.state.timePickerShow ? {display: 'block'} : {display: 'none'}}>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                  {...formItemLayout}
                >
                  {getFieldDecorator('range-time-picker'
                  )(
                    <DatePicker
                        showTime
                        placeholder={this.state.timePlaceholder.begin[this.state.languageType]}
                        format="YYYY-MM-DD HH:mm:ss"
                        className="DatePicker"
                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                >
                  {getFieldDecorator('range-endtime-picker'
                  )(
                      <DatePicker showTime
                        placeholder={this.state.timePlaceholder.end[this.state.languageType]}
                        format="YYYY-MM-DD HH:mm:ss"
                        className="DatePicker"
                      />
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit" style={{marginTop: '2px'}}>
                  {this.state.timePlaceholder.submit[this.state.languageType]}
                </Button>
              </Form>
            </div>
          </div>
          <div className={this.state.languageType-0 === 3? 'uygur sort-items' : 'sort-items'}>
            <div className="left">{this.state.OptiionTitle.inclination[this.state.languageType]}</div>
            <div className="right">
              {Trend()}
            </div>
          </div>
          <div className={this.state.languageType-0 === 3? 'uygur sort-items' : 'sort-items'}>
            <div className="left">{this.state.OptiionTitle.sort[this.state.languageType]}</div>
            <div className="right">
              {Sort()}
            </div>
          </div>
          <div className={this.state.languageType-0 === 3? 'uygur sort-items' : 'sort-items'}>
            <div className="left">{this.state.OptiionTitle.removal[this.state.languageType]}</div>
            <div className="right">
              {Filter()}
            </div>
          </div>
          <div className={this.state.languageType-0 === 3? 'uygur media-items' : 'media-items'}>
            <div className="left">{this.state.OptiionTitle.media[this.state.languageType]}</div>
            <div className="right">
              {Media()}
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="count" dangerouslySetInnerHTML={{__html: searchNum(pageInfo.count)}}></div>
          <OpinionDetail docList={docList}
                         onDataChange={this.dataChanged.bind(this)}
                         param={param}
                         pageSize={this.state.pagesize}
                         pageInfo={pageInfo}
                         current={page}
                         remove = {this.remove.bind(this)}
                         languageType={this.state.languageType}
                         langnum={this.props.match.params.languages}
                         lang={this.state.language[this.props.match.params.languages]}
          />
        </div>
        <div className="bottom">
          <div className="pagintion-wrapper">
            <Pagination defaultCurrent={1}
                        defaultPageSize={20}
                        onChange={this.onPaginationChange.bind(this)}
                        total={pageInfo.count}
                        getPopupContainer={() => document.querySelector('.all-opinion2')}
                        current={page}
            />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    themeColor: state.changeThemeReducer,
    docList: state.getSortedContentSucceeded.data.docList,
    carryCount: state.getSortedContentSucceeded.data.carryCount,
    // pageInfo: state.opinionSearchSucceededReducer.data.pageInfo,
    ks: state.searchKeywordSyncReducer.ks,
    page: state.paginationPageReducer,
    pageInfo: state.getSortedContentSucceeded.data.pageInfo,
    languages: state.mulLanToggleReducer,
    getRouter: state.getRouterReducer,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    opinionSearchRequest: req => {
      dispatch(getSortedContentRequested(req));
    },
    searchKeywordSync: ks => {
      dispatch(searchKeywordSync(ks));
    },
    paginationPage: req => {
      dispatch(paginationPage(req));
    },
    mulLanToggle: req => {
      dispatch(mulLanToggle(req))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)((Form.create()(AllOpinion)));
