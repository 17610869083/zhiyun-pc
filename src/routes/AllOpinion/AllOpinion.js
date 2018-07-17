import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Pagination, DatePicker, Form, Icon, message, Button,Layout,Menu} from 'antd';
import OpinionDetail from '../../components/OpinionDetail/OpinionDetail';
import {opinionSearchRequested, searchKeywordSync, paginationPage} from '../../redux/actions/createActions';
import {URLToObject, getSecondTime} from '../../utils/format';
import {GRAY} from '../../utils/colors';
import './AllOpinion.less';
import {urlTokey} from '../../utils/format';
import {Route, Switch, Link,HashRouter as Router} from 'react-router-dom';
import {api_get_channel} from '../../services/api';
import Iconfont from '../../components/IconFont'
import request from '../../utils/request';
import AsyncComponent from '../../components/AsyncComponent/AsyncComponent'
const TopicReportList = AsyncComponent(() => import('../TopicReportList/TopicReportList'))
const AllOpinionDetail = AsyncComponent(() => import('../AllOpinionDetail/AllOpinionDetail'))
const SortedAdd = AsyncComponent(() => import('../SortedOpinion/SortedAdd'))
const TopicAdd = AsyncComponent(() => import('../TopicOpinion/TopicAdd/TopicAdd'))
const SortedOpinion = AsyncComponent(() => import('../../routes/SortedOpinion'))
const ExcludeSetting = AsyncComponent(() => import('../SystemSetting/ExcludeSetting/ExcludeSetting'))
const WarnSetting = AsyncComponent(() => import('../SystemSetting/WarnSetting/WarnSetting'))
const NoticeSetting = AsyncComponent(() => import('../SystemSetting/NoticeSetting/NoticeSetting'))
const TopicEditOpinionDetail = AsyncComponent(() => import('../SystemSetting/TopicEditOpinionDetail/TopicEditOpinionDetail'))
const EditOpinionDetail = AsyncComponent(() => import('../../components/EditOpinionDetail/EditOpinionDetail'))
const HistoryOpinion = AsyncComponent(() => import('../HistoryOpinion/HistoryOpinion'))
const CollectionOpinion = AsyncComponent(() => import('../CollectionOpinion/CollectionOpinion'))
const MaterialOpinion = AsyncComponent(() => import('../MaterialOpinion/MaterialOpinion'))
const ReportOpinionDetail = AsyncComponent(() => import('../ReportOpinion/ReportOpinionDetail'))
const ReportOpinion = AsyncComponent(() => import('../ReportOpinion/ReportOpinion'))
const TopicOpinion = AsyncComponent(() => import('../TopicOpinion/TopicOpinion'))
const BigScreen = AsyncComponent(() => import('../BigScreen/BigScreen'))
const ReportTemplate = AsyncComponent(() => import('../ReportTemplate/ReportTemplate'))
const ChooseTemplate = AsyncComponent(() => import('../ChooseTemplate/ChooseTemplate'))
const CustomHome= AsyncComponent(() => import('../CustomHome/CustomHome'))
const MyReport= AsyncComponent(() => import('../MyReport/MyReport'))
const Drag= AsyncComponent(() => import('../Drag/Drag'))
const Briefing= AsyncComponent(() => import('../Briefing/Briefing'))
const BriefingSecond = AsyncComponent(() => import('../BriefingSecond/BriefingSecond'))
const Daily = AsyncComponent(() => import('../Daily/Daily'))
const Special = AsyncComponent(() => import('../Special/Special'))
const Evidence = AsyncComponent(() => import('../Evidence/Evidence'))
const UpReport = AsyncComponent(() => import('../UpReport/UpReport'))
const Guide = AsyncComponent(() => import('../Guide/Guide'))
const Situational = AsyncComponent(() => import('../Situational/Situational'))
const Bidding= AsyncComponent(() => import('../BiddingOpinion/BiddingOpinion'))
const Multilingual= AsyncComponent(() => import('../Multilingual/Multilingual'))
const {Header, Sider, Content} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
class AllOpinion extends React.Component {
  constructor() {
    super();
    this.state = {
      time: [
        {
          name: '全部',
          value: 'all'
        },
        {
          name: '今天',
          value: 'today'
        },
        {
          name: '昨天',
          value: 'yestoday'
        },
        {
          name: '近7天',
          value: '7day'
        },
        {
          name: '近30天',
          value: '30day'
        },
        {
          name: '自定义',
          value: 'custom'
        }
      ],
      isTopShow: true,
      timeValue: 'all',
      trend: [
        {
          name: '全部',
          value: 'all'
        },
        {
          name: '正面',
          value: -1
        },
        {
          name: '中性',
          value: 0
        },
        {
          name: '负面',
          value: 1
        },
        {
          name: '预警',
          value: 2
        }
      ],
      trendValue: 'all',
      sort: [
        {
          name: '时间降序',
          value: 'timedown'
        },
        {
          name: '时间升序',
          value: 'timeup'
        },
        {
          name: '热搜排序',
          value: 'hot'
        },
      ],
      sortValue: 'timedown',
      filter: [
        {
          name: '不去重',
          value: 1
        },
        {
          name: '去重',
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
      docList: [],
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
     channelList:[]
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
    if (this.state.type !== 1) {
      const param = {
        datetag: value,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        carry: this.state.mediaValue,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
      //this.props.searchKeywordSync({keyword: "", seltype: "1", type: 0});
    } else {
      const param = {
        datetag: value,
        seltype:  this.props.ks.seltype,
        keyword: this.props.ks.keyword,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
    }

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

      if (this.state.type !== 1) {
        const param = {
          datetag: timeValue,
          neg: this.state.trendValue,
          order: this.state.sortValue,
          similer: this.state.filterValue,
          carry: this.state.mediaValue,
          begin: begin,
          end: end,
          pagesize: this.state.pagesize
        };
        this.props.opinionSearchRequest(param);
        this.props.paginationPage(1);
        //this.props.searchKeywordSync({keyword: "", seltype: "1", type: 0});
      } else {
        const param = {
          datetag: timeValue,
          seltype:  this.props.ks.seltype,
          keyword: this.props.ks.keyword,
          neg: this.state.trendValue,
          order: this.state.sortValue,
          similer: this.state.filterValue,
          carry: this.state.mediaValue,
          begin: begin,
          end: end,
          pagesize: this.state.pagesize
        };
        this.props.opinionSearchRequest(param);
        this.props.paginationPage(1);
      }
    });
  }

  trendClick(value) {
    this.setState({
      trendValue: value
    });
    if (this.state.type !== 1) {
      const param = {
        datetag: this.state.timeValue,
        neg: value,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
      //this.props.searchKeywordSync({keyword: "", seltype: "1", type: 0});
    } else {
      const param = {
        datetag: this.state.timeValue,
        seltype:  this.props.ks.seltype,
        keyword: this.props.ks.keyword,
        neg: value,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
    }
  }

  sortClick(value) {
    this.setState({
      sortValue: value
    });
    if (this.state.type !== 1) {
      const param = {
        datetag: this.state.timeValue,
        neg: this.state.trendValue,
        order: value,
        similer: this.state.filterValue,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
      //this.props.searchKeywordSync({keyword: "", seltype: "1", type: 0});
    } else {
      const param = {
        datetag: this.state.timeValue,
        seltype:  this.props.ks.seltype,
        keyword: this.props.ks.keyword,
        neg: this.state.trendValue,
        order: value,
        similer: this.state.filterValue,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
    }
  }

  filterClick(value) {
    this.setState({
      filterValue: value
    });
    if (this.state.type !== 1) {
      const param = {
        datetag: this.state.timeValue,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: value,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
      //this.props.searchKeywordSync({keyword: "", seltype: "1", type: 0});
    } else {
      const param = {
        datetag: this.state.timeValue,
        seltype:  this.props.ks.seltype,
        keyword: this.props.ks.keyword,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: value,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
    }
  }

  mediaClick(value) {
    this.setState({
      mediaValue: value
    });
    if (this.state.type !== 1) {
      const param = {
        datetag: this.state.timeValue,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        carry: value,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
      //this.props.searchKeywordSync({keyword: "", seltype: "1", type: 0});
    } else {
      const param = {
        datetag: this.state.timeValue,
        seltype:  this.props.ks.seltype,
        keyword: this.props.ks.keyword,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        carry: value,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: this.state.pagesize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
    }
  }

  onShowSizeChange(current, pageSize) {
    this.setState({
      page: current,
      pagesize: pageSize
    });
    if (this.state.type !== 1) {
      const param = {
        datetag: this.state.timeValue,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: pageSize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
     // this.props.searchKeywordSync({keyword: "", seltype: "1", type: 0});
    } else {
      const param = {
        datetag: this.state.timeValue,
        seltype:  this.props.ks.seltype,
        keyword: this.props.ks.keyword,
        neg: this.state.trendValue,
        order: this.state.sortValue,
        similer: this.state.filterValue,
        carry: this.state.mediaValue,
        begin: this.state.begin,
        end: this.state.end,
        pagesize: pageSize
      };
      this.props.opinionSearchRequest(param);
      this.props.paginationPage(1);
    }
  }

  onPaginationChange(pagenumber) {
    this.setState({
      page: pagenumber
    });
    let param='';
    if(this.props.ks.keyword===''){
      param = {
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      carry: this.state.mediaValue,
      begin: this.state.begin,
      end: this.state.end,
      page: pagenumber,
      pagesize: this.state.pagesize
    };
   }else{
      param = {
      seltype: this.props.ks.seltype,
      keyword:this.props.ks.keyword,
      page:pagenumber,
      similer:1
     }
   }
    this.props.opinionSearchRequest(param);
    this.props.paginationPage(pagenumber);
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  triggerTopShow() {
    this.setState({
      isTopShow: !this.state.isTopShow
    });
    this.props.searchKeywordSync({keyword: "", seltype: "1", type: 0});
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
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      carry: this.state.mediaValue,
      begin: this.state.begin,
      end: this.state.end,
      page: this.state.page,
      pagesize: this.state.pagesize
    };
    const newParam = Object.assign(param, obj);
    this.props.opinionSearchRequest(newParam);
  }

  componentWillMount() {
    if (this.props.location && this.props.location.search !== "?type=search") {
      request(api_get_channel)
      .then(res => {
        if (res.data.code === 1) {
          this.setState({
            channelList: res.data.channelList
          })
        }
        this.homepageMore(window.location.hash);
      })
      
    }

  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).scrollIntoView();
    if(this.props.ks.keyword !==''){
      this.setState({
          type:1
      })
   }
  }

  componentWillUnmount() {
    this.props.paginationPage(1);
  }

  dateChange(date, dateString) {
    this.setState({
      endTime: dateString
    })
  }

  searchType(data) {
    this.setState({
      type: data
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
    const {docList, carryCount, pageInfo, page,themeColor} = this.props;
    const haverClass = themeColor.topColor.backgroundColor === '#5a8bff' ? 'white':'black'; 
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    let menuList = [];
    this.state.channelList.map((item, index) => {
      if (item.channelurl === '/allopinion/reportopinion/list') {
        menuList.push(<SubMenu
          key={item.key}
          title={<Link to="/allopinion/myreport"><span>
            <i className="anticon"><Iconfont type={item.type} style={{fontSize: '16px'}}/></i>
            <span
              style={{fontSize: '16px'}} className={haverClass}>舆情报告</span>
            </span></Link>}>
          <Menu.Item key="reportopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/reportopinion/list">
              <span>简报列表</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="materiaopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/materiaopinion">
              <span>素材库</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="collectionopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/collectionopinion">
              <span>我的收藏</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="myreport" style={{fontSize: '16px'}}>
            <Link to="/allopinion/myreport">
              <span>我的报告库</span>
            </Link>
          </Menu.Item>
        </SubMenu>)
      } else if (item.channelurl === '../systemMan/systemManDo?action=userList') {
        menuList.push(<SubMenu key={item.key} 
                               title={<Link to="/noticesetting"><span><i className="anticon"><Iconfont type={item.type}
                                 style={{fontSize: '16px'}}/></i><span
                                 style={{fontSize: '16px'}}>系统设置</span></span> </Link>}>
          <Menu.Item key="noticesetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/noticesetting">
              <span >通知设置</span>
            </Link>
          </Menu.Item>
          
          <Menu.Item key="warnsetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/warnsetting">
              <span>预警设置</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="excludesetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/excludesetting">
              <span>排除停用</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="publicopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/publicopinion">
              <span>舆情录入</span>
            </Link>
          </Menu.Item>
        </SubMenu>)
      } else if (item.channelurl === '/multilingual') {
        menuList.push(<SubMenu key={item.key} 
          title={<Link to="/multilingual/0"><span><i className="anticon"><Iconfont type={item.type}
            style={{fontSize: '16px'}}/></i><span
            style={{fontSize: '16px'}}>多语种检测</span></span> </Link>}>
            <Menu.Item key="noticesetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/multilingual/1">
            <span><Iconfont type='icon-hanyu' style={{fontSize: '16px'}}/>韩语检测</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="warnsetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/multilingual/2">
            <span><Iconfont type='icon-riyu1' style={{fontSize: '16px'}}/>日语检测</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="excludesetting" style={{fontSize: '16px'}}>
            <Link to="/allopinion/multilingual/3">
            <span><Iconfont type='icon-xinjiang' style={{fontSize: '16px'}}/>维语检测</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="publicopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/multilingual/4">
            <span><Iconfont type='icon-xicangzizhiqu' style={{fontSize: '16px'}}/>藏语检测</span>
            </Link>
            </Menu.Item>
            </SubMenu>)
      }else {
        menuList.push(<Menu.Item key={item.key} style={{fontSize: '16px'}}>
          {item.channelurl.indexOf('http') !== -1 ?
            <a href={item.channelurl} target="blank">
              <i className="anticon"><Iconfont type={item.type} style={{fontSize: '16px'}}/></i>
              <span>{item.channelname}</span>
            </a> : <Link to={item.channelurl}>
            <i className="anticon"><Iconfont type={item.type} style={{fontSize: '16px'}}/></i>
              <span>{item.channelname}</span>
            </Link>
          }
        </Menu.Item>)
      }
      return 3
    });
    // 时间
    const Time = this.state.time.map((item, index) =>
      <div
        key={index}
        onClick={this.timeClick.bind(this, item.value)}
        className={item.value === this.state.timeValue ? 'item active' : 'item'}
      ><span className="item-inner">{item.name}</span></div>
    );

    // 倾向
    const Trend = this.state.trend.map((item, index) =>
      <div
        key={index}
        onClick={this.trendClick.bind(this, item.value)}
        className={item.value === this.state.trendValue ? 'item active' : 'item'}
      ><span className="item-inner">{item.name}</span></div>
    );

    // 排序
    const Sort = this.state.sort.map((item, index) =>
      <div
        key={index}
        onClick={this.sortClick.bind(this, item.value)}
        className={item.value === this.state.sortValue ? 'fours active' : 'fours'}
      ><span className="item-inner">{item.name}</span></div>
    );

    // 去重
    const Filter = this.state.filter.map((item, index) =>
      <div
        key={index}
        onClick={this.filterClick.bind(this, item.value)}
        className={item.value === this.state.filterValue ? 'item active' : 'item'}
      ><span className="item-inner">{item.name}</span></div>
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

    const param = {
      datetag: this.state.timeValue,
      neg: this.state.trendValue,
      order: this.state.sortValue,
      similer: this.state.filterValue,
      carry: this.state.mediaValue,
      begin: this.state.begin,
      end: this.state.end,
      page: this.state.page,
      pagesize: this.state.pagesize
    };
    return (
      <div style={{display:'flex',width:"100%",height:'100%'}}>
            <div className={`layout ${haverClass}`}>
            <Sider
            className="sider siders"
            trigger={null}
            collapsible
            style={{backgroundColor: themeColor.bottomColor.backgroundColor}}
            collapsed={this.state.collapsed && this.state.flag}
            onMouseEnter={this.mouseEnterToggle} 
            onMouseLeave={this.mouseLeaveToggle}
          >
            <div>
              <div className="trigger-wrapper" onClick={this.toggle}
              style={{backgroundColor:themeColor.bottomColor.backgroundColor}}
              >
                <i className="fa fa-bars" aria-hidden="true" style={{fontSize: '14px', color: '#5a8bff'}}/>
              </div>
            </div>
            <Menu
              defaultSelectedKeys={['1']}
              mode="inline"
              style={ {backgroundColor: themeColor.bottomColor.backgroundColor, overflow: 'auto',maxHeight: '600px'}}
              className="selectMenu"
              selectedKeys={[urlTokey()]}
            >
              {menuList}
              {/* <Menu.Item key="reportopinion" style={{fontSize: '16px'}}>
            <Link to="/allopinion/topic">
              <span>简报列表</span>
            </Link>
            </Menu.Item> */}
            </Menu>
          </Sider>
          </div>
          <Switch>
                <Route path="/allopinion/bigscreen" component={BigScreen}/>
                <Route path="/allopinion/topic" component={TopicOpinion}/>
                <Route path="/allopinion/topic" component={TopicOpinion}/>
                <Route path="/allopinion/test" component={EditOpinionDetail}/>
                <Route path="/allopinion/allopiniondetail" exact component={AllOpinionDetail}/>
                <Route path="/allopinion/reportopinion/list" component={ReportOpinion}/>
                <Route path="/allopinion/reportopinion/detail" component={ReportOpinionDetail}/>
                <Route path="/allopinion/materiaopinion" component={MaterialOpinion}/>
                <Route path="/allopinion/collectionopinion" component={CollectionOpinion}/>
                <Route path="/allopinion/historyopinion" component={HistoryOpinion}/>
                <Route path="/allopinion/noticesetting" component={NoticeSetting}/>
                <Route path="/allopinion/warnsetting" component={WarnSetting}/>
                <Route path="/allopinion/excludesetting" component={ExcludeSetting}/>
                <Route path="/allopinion/publicopinion" component={TopicEditOpinionDetail}/>
                <Route path="/allopinion/sortedopinion" component={SortedOpinion}/>
                <Route path="/allopinion/topic/addtopic" component={TopicAdd}/>
                <Route path="/allopinion/sortedopinion/addrule" component={SortedAdd}/>
                <Route path="/allopinion/topicreportlist" component={TopicReportList}/>
                <Route path="/allopinion/reporttemplate" component={ReportTemplate}/>
                <Route path="/allopinion/choosetemplate" component={ChooseTemplate}/>
                <Route path="/allopinion/customhome" component={CustomHome}/>
                <Route path="/allopinion/myreport" component={MyReport}/>
                <Route path="/allopinion/drag" component={Drag}/>
                <Route path="/allopinion/briefing" component={Briefing}/>
                <Route path="/allopinion/briefingsecond" component={BriefingSecond}/>
                <Route path="/allopinion/daily" component={Daily}/>
                <Route path="/special" component={Special}/>
              </Switch>
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
