import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Pagination, DatePicker, Form, Icon, message, Button, LocaleProvider} from 'antd';
import OpinionDetail from './MultilingualDetail/MultilingualDetail';
import {opinionSearchRequested, searchKeywordSync, paginationPage} from '../../redux/actions/createActions';
import {URLToObject, getSecondTime} from '../../utils/format';
import {GRAY} from '../../utils/colors';
import './Multilingual.less';
import { stat } from 'fs';
const FormItem = Form.Item;
class AllOpinion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: [
        {
          name: ['全部', '전부', 'すべて','بارلىق', 'ཚང་མ།'],
          value: 'all'
        },
        {
          name: ['今天', '오늘', '今日', 'بۈگۈن', 'དི་རིང་'],
          value: 'today'
        },
        {
          name: ['昨天', '어제', '昨日', 'تۈنۈگۈن', 'ཁ་སང།'],
          value: 'yestoday'
        },
        {
          name: ['近7天', '7일이내', '7日間', 'كىرىپ يەتتە كۈن', 'ཉེ་བའི་ཉིན་བདུན་'],
          value: '7day'
        },
        {
          name: ['近30天', '30일이내', '30日間', 'كىرىش 30 كۈن', 'ལོ་ངོ་སུམ་བཅུ་ཉིན།'],
          value: '30day'
        },
        {
          name: ['自定义', '사용자 정의', 'カスタマイズ', 'ئۆزلۈكىدىن ئېنىقلىما بېرىش', 'རང་གི་མཚན་ཉིད།'],
          value: 'custom'
        }
      ],
      isTopShow: true,
      timeValue: 'all',
      trend: [
        {
          name: ['全部', '전부', 'すべて','ھەممىسى.', 'ཚང་མ།'],
          value: 'all'
        },
        {
          name: ['正面', '정면', '正面', 'ئۇدۇل.', 'དྲང་ཕྱོགས་'],
          value: -1
        },
        {
          name: ['中性', '중성', '中性', 'نېيترال', 'མ་ནིང།'],
          value: 0
        },
        {
          name: ['负面', '반면', '悪い面', 'پاسسىپ.', 'ལྡོག་ངོས་'],
          value: 1
        },
        {
          name: ['预警', '예보', '警報', 'ئالدىن سىگنال بېرىش', 'ཉེ་བརྡ་'],
          value: 2
        }
      ],
      trendValue: 'all',
      sort: [
        {
          name: ['时间降序', ' 시간의 오름차순', '時間降順', 'ۋاقىت تۆۋەنلەش تەرتىپى', 'དུས་ཚོད་ཀྱི་ཕྱགས་རིམ།པ་'],
          value: 'timedown'
        },
        {
          name: ['时间升序', '시간의 내림차순', '時間昇順', 'ۋاقىت ئىچىدە', 'དུས་ཚོད་ཀྱི་ཕར་རིམ།'],
          value: 'timeup'
        }
      ],
      sortValue: 'timedown',
      filter: [
        {
          name: ['不去重', '중복허가', '重複を取り除かない', 'تەكرار يوقىتىش ئەمەس ', 'བྱེད་བསྐྱར་ཟློས།'],
          value: 1
        },
        {
          name: ['去重', '중복배제', '重複を取り除く', 'چىقىرىپ تەكرار.', 'མི་བྱེད་བསྐྱར་ཟློས།'],
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
        time: ['时间', '시간', '時間', 'ۋاقىت ', 'དུས་ཚོད་'],
        inclination: ['倾向', '경향', '倾向', 'خاھىش', 'خاھىش ', 'ཁ་ཕྱོགས་པ་'],
        sort: ['排序', '정렬', '順位', 'تەرتىپ بويىچە ', 'གོ་རིམ།'],
        removal: ['去重', '중복배제','重複' , 'تەكرار ', 'གོ་རིམ།'],
        media: ['媒体', '미디어', 'メディア', 'ئاخبارات ۋاستىلىرى.', 'ཆ་འཕྲིན་'],
      },
      infoList: ['信息列表', '정보 목록', '情報リスト', 'ئۇچۇر جەدۋىلى', 'ཆ་འཕྲིན་རེའུ་མིག་བཀོད།'],
      language: ['', 'kr', 'jp', 'uygur', 'zang'],
      CHlan: ['中文', '한국어', '日本語', 'ئۇيغۇر يېزىقى', 'བོད་ཡིག། '],
      timePlaceholder: {
        begin: ['开始日期', '시작일', '開始日', 'باشلىنىش كۈنى ', 'འགོ་ཚུགས་པའི་ཉིན།'],
        end: ['结束日期', '종료일', '終了日', 'ئاخىرلاشتۇرغان كۈن ', 'ཚར་བའི་ཉིན་'],
        submit: ['确定', '확인', '確定', 'بېكىتىلگەن ', 'གཏན་ཁེལ།']
      }
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
        lang:this.state.language[this.props.match.params.languages],
        pagesize: this.state.pagesize,
        datetag: value,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        page:this.props.page,
        carry: this.state.mediaValue
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
        message.error('开始时间请不要大于当前时间');
        return;
      }
      else if (getSecondTime(begin) > getSecondTime(end)) {
        message.error('开始时间请不要大于结束时间');
        return;
      }
      const timeValue = 'custom';
      this.setState({
        begin: begin,
        end: end,
        timeValue: 'custom',
      });
        const param = {
          lang:this.state.language[this.props.match.params.languages],
          pagesize: this.state.pagesize,
          datetag: timeValue,
          neg: this.state.trendValue,
          order: this.state.sortValue,
          similer: this.state.filterValue,
          page:this.props.page,
          carry: this.state.mediaValue,
          begin: begin,
          end: end
        }
        this.props.opinionSearchRequest(param);
        this.props.paginationPage(1);
    });
  }

  trendClick(value) {
    this.setState({
      trendValue: value
    });
    const param = {
      lang:this.state.language[this.props.match.params.languages],
      pagesize: this.state.pagesize,
      datetag: this.state.timeValue,
      neg: value,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      page:this.props.page,
      carry: this.state.mediaValue
    };
    this.props.opinionSearchRequest(param);
    this.props.paginationPage(1);
  }

  sortClick(value) {
    this.setState({
      sortValue: value
    });
    const param = {
      lang:this.state.language[this.props.match.params.languages],
      pagesize: this.state.pagesize,
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: value,
      similer: this.state.filterValue,
      page:this.props.page,
      carry: this.state.mediaValue
    };
    this.props.opinionSearchRequest(param);
    this.props.paginationPage(1);
      
  }

  filterClick(value) {
    this.setState({
      filterValue: value
    });
      const param = {
        lang:this.state.language[this.props.match.params.languages],
        pagesize: this.state.pagesize,
        datetag: this.state.timeValue,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: value,
        page:this.props.page,
        carry: this.state.mediaValue
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
      
  }

  mediaClick(value) {
    this.setState({
      mediaValue: value
    });
    const param = {
      lang:this.state.language[this.props.match.params.languages],
      pagesize: this.state.pagesize,
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      page:this.props.page,
      carry: value
    };
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
    };
    // lang:this.state.language[this.props.match.params.languages],
    // pagesize: this.state.pagesize,
    // datetag: value,
    // neg: this.state.trendValue,
    // order: this.state.sortValue,
    // similer: this.state.filterValue,
    // page:pagenumber,
    // carry: this.state.mediaValue
    // begin: this.state.begin,
    // end: this.state.end,
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

  dataChanged() {
    const searchMessage = this.props.ks;
    if (this.state.type !== 1) {
      const param = {
        datetag: this.state.timeValue,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        page: this.props.page,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
    } else {
      const param = {
        seltype: searchMessage.seltype,
        keyword: searchMessage.keyword,
        similer:this.state.filterValue,
        datetag:this.state.timeValue,
        neg:this.state.trendValue,
        order:this.state.sortValue,
        carry:this.state.mediaValue,
        page:this.props.page
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
    }
  }

  homepageMore(pathname) {
    if (pathname === '#/allopinion?datetag=today') {
      this.setState({
        timeValue: 'today'
      })
    } else if (pathname === '#/allopinion?datetag=today&neg=1') {
      this.setState({
        timeValue: 'today',
        trendValue: 1
      })
    } else if (pathname === '#/allopinion?datetag=all&neg=1') {
      this.setState({
        timeValue: 'all',
        trendValue: 1
      })
    }
    else if (pathname === '#/allopinion?datetag=today&neg=2') {
      this.setState({
        timeValue: 'today',
        trendValue: 2
      })
    }else if (pathname === '#/allopinion?datetag=today&neg=all') {
      this.setState({
        timeValue: 'today',
        trendValue: 'all'
      })
    }else if (pathname === '#/allopinion?datetag=all&neg=2') {
      this.setState({
        timeValue: 'all',
        trendValue: 2
      })
    } 
    else if (pathname === '#/allopinion?carry=weibo&neg=all') {
      this.setState({
        mediaValue: '微博',
        trendValue: 'all'
      })
    } else if (pathname === '#/allopinion?carry=weibo&neg=1') {
      this.setState({
        mediaValue: '微博',
        trendValue: 1
      })
    }else if (pathname.indexOf('media') !== -1){
       let media =  pathname.split('&')[0].split('=')[1];
       let day =  pathname.split('&')[1].split('=')[1];
       this.setState({
        mediaValue: this.state.mediaList[media],
        timeValue: day
       })
    } else {
      this.setState({
        timeValue: 'all'
      })
    }
    const obj = URLToObject(pathname);
    const param = {
      lang:this.state.language[this.props.match.params.languages],
      pagesize: this.state.pagesize,
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      page:this.props.page
    }  
    const newParam = Object.assign(param, obj);
    this.props.opinionSearchRequest(newParam);
  }

  componentWillMount() {
    let reg = /^[0-4]$/
    if(reg.test(this.props.match.params.languages)) {
      this.setState({
        languageType: this.props.match.params.languages
      })
    } else {
      this.setState({
        languageType: 0
      })
    }
    // console.log(this.props.match.params.languages)
    if (this.props.location && this.props.location.search !== "?type=search") {
      this.homepageMore(window.location.hash);
    }
    
  }

  componentWillReceiveProps(newProps){
    let reg = /^[0-4]$/
    if(reg.test(newProps.match.params.languages)) {
      this.setState({
        languageType: newProps.match.params.languages
      })
    } else {
      this.setState({
        languageType: 0
      })
    }
    if(newProps.match.params.languages !== this.state.languageType){
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
    }
    if (this.state.languageType === newProps.match.params.languages) return false;

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
  render() {
    let {docList, carryCount=[{count: 0, key: "all", value: "全部"}], pageInfo={count:0}, page} = this.props;
    if(!carryCount instanceof Array) carryCount = [{count: 0, key: "all", value: "全部"}];
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

    // 时间
    const Time = this.state.time.map((item, index) =>
      <div
        key={index}
        onClick={this.timeClick.bind(this, item.value)}
        className={item.value === this.state.timeValue ? 'item active' : 'item'}
      ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
    );

    // 倾向
    const Trend = this.state.trend.map((item, index) =>
      <div
        key={index}
        onClick={this.trendClick.bind(this, item.value)}
        className={item.value === this.state.trendValue ? 'item active' : 'item'}
      ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
    );

    // 排序
    const Sort = this.state.sort.map((item, index) =>
      <div
        key={index}
        onClick={this.sortClick.bind(this, item.value)}
        className={item.value === this.state.sortValue ? 'fours active' : 'fours'}
      ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
    );

    // 去重
    const Filter = this.state.filter.map((item, index) =>
      <div
        key={index}
        onClick={this.filterClick.bind(this, item.value)}
        className={item.value === this.state.filterValue ? 'item active' : 'item'}
      ><span className="item-inner">{item.name[this.state.languageType]}</span></div>
    );


    // 媒体类型
    const Media = carryCount.map((item, index) =>
      <div
        key={index}
        onClick={this.mediaClick.bind(this, item.value)}
        className={item.value === this.state.mediaValue ? 'item active' : 'item'}
      ><p className="item-inner">{item.key === 'docSearch' ? '其它' : item.value}</p>
        <p className="count">{item.count}</p>
      </div>
    );
    // 搜索数据数量 
    const searchNum = (num) => {
      let leftarr = ['根据您的条件，为您筛选出','님이 지정한 조건에 부합되는', 'あなたの条件によると、', '', ''];
      let rightarr = ['条数据', '개의 데이터를 검색하였습니다!', '件のデータをピックアップします!', '','']
      return `${leftarr[this.state.languageType]}<span class="number">${num}</span>${rightarr[this.state.languageType]}！`
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
      <div className="all-opinion" id="anchor">
        <div className="close-open" style={{background:GRAY}}>
          <div className="count">{this.state.infoList[this.state.languageType]}</div>
          <div className="close" onClick={this.triggerTopShow.bind(this)}>
            <span className="closeBtn">{this.state.languageType === 0 ? this.state.CHlan[this.props.match.params.languages] : '中文'}</span>
          </div>
        </div>
        <div className="sort-top" style={this.state.isTopShow ? {display: 'block'} : {display: 'none'}}>
          <div className="sort-items">
            <div className="left">{this.state.OptiionTitle.time[this.state.languageType]}：</div>
            <div className="right">
              {Time}
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
                    <LocaleProvider>
                      <DatePicker showTime
                        placeholder={this.state.timePlaceholder.end[this.state.languageType]}
                        format="YYYY-MM-DD HH:mm:ss"
                        className="DatePicker"
                      />
                    </LocaleProvider>
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit" style={{marginTop: '2px'}}>
                  {this.state.timePlaceholder.submit[this.state.languageType]}
                </Button>
              </Form>
            </div>
          </div>
          <div className="sort-items">
            <div className="left">{this.state.OptiionTitle.inclination[this.state.languageType]}：</div>
            <div className="right">
              {Trend}
            </div>
          </div>
          <div className="sort-items">
            <div className="left">{this.state.OptiionTitle.sort[this.state.languageType]}：</div>
            <div className="right">
              {Sort}
            </div>
          </div>
          <div className="sort-items">
            <div className="left">{this.state.OptiionTitle.removal[this.state.languageType]}：</div>
            <div className="right">
              {Filter}
            </div>
          </div>
          <div className="media-items">
            <div className="left">{this.state.OptiionTitle.media[this.state.languageType]}：</div>
            <div className="right">
              {Media}
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
          />
        </div>
        <div className="bottom">
          <div className="pagintion-wrapper">
            <Pagination defaultCurrent={1}
                        defaultPageSize={20}
                        onChange={this.onPaginationChange.bind(this)}
                        total={pageInfo.count}
                        getPopupContainer={() => document.querySelector('.all-opinion')}
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
    docList: state.opinionSearchSucceededReducer.data.docList,
    carryCount: state.opinionSearchSucceededReducer.data.carryCount,
    pageInfo: state.opinionSearchSucceededReducer.data.pageInfo,
    ks: state.searchKeywordSyncReducer.ks,
    page: state.paginationPageReducer
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
    paginationPage: req => {
      dispatch(paginationPage(req));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)((Form.create()(AllOpinion)));
