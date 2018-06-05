import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Pagination, DatePicker, Form, Icon, message, Button} from 'antd';
import OpinionDetail from '../../components/OpinionDetail/OpinionDetail';
import {opinionSearchRequested, searchKeywordSync, paginationPage} from '../../redux/actions/createActions';
import {URLToObject, getSecondTime} from '../../utils/format';
import {GRAY} from '../../utils/colors';
import './AllOpinion.less';
const FormItem = Form.Item;
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
      endTime: ''
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
        seltype: 'content',
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
          seltype: 'content',
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
        seltype: 'content',
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
        seltype: 'content',
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
        seltype: 'content',
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
        seltype: 'content',
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
        seltype: 'content',
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
      seltype: "content",
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
    } else if (pathname === '#/allopinion?datetag=all&neg=2') {
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
    }
    else {
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
    if (this.props.location.search !== "?type=search") {
      this.homepageMore(window.location.hash);
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

  render() {
    const {docList, carryCount, pageInfo, page} = this.props;
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
      <div className="all-opinion" id="anchor">
        <div className="close-open" style={{background:GRAY}}>
          <div className="count"> 信息列表</div>
          <div className="close" onClick={this.triggerTopShow.bind(this)}>
            <span className="closeBtn">{this.state.isTopShow ? '显示' : '隐藏'}</span>
            <Icon type={this.state.isTopShow ? 'down' : 'right'}/>
          </div>
        </div>
        <div className="sort-top" style={this.state.isTopShow ? {display: 'block'} : {display: 'none'}}>
          <div className="sort-items">
            <div className="left">时间：</div>
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
                    <DatePicker showTime placeholder="开始日期" format="YYYY-MM-DD HH:mm:ss"
                                className="DatePicker"

                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                >
                  {getFieldDecorator('range-endtime-picker'
                  )(
                    <DatePicker showTime placeholder="结束日期" format="YYYY-MM-DD HH:mm:ss"
                                className="DatePicker"
                    />
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit" style={{marginTop: '2px'}}>
                  确定
                </Button>
              </Form>
            </div>
          </div>
          <div className="sort-items">
            <div className="left">倾向：</div>
            <div className="right">
              {Trend}
            </div>
          </div>
          <div className="sort-items">
            <div className="left">排序：</div>
            <div className="right">
              {Sort}
            </div>
          </div>
          <div className="sort-items">
            <div className="left">去重：</div>
            <div className="right">
              {Filter}
            </div>
          </div>
          <div className="media-items">
            <div className="left">媒体：</div>
            <div className="right">
              {Media}
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="count">根据您的条件，为您筛选出<span className="number">{pageInfo.count}</span>条数据！</div>
          <OpinionDetail docList={docList}
                         onDataChange={this.dataChanged.bind(this)}
                         param={param}
                         pageSize={this.state.pagesize}
                         propsType='AllopinionList'
                         pageInfo={pageInfo}
                         current={page}
                         type={this.state.type}
                         searchType={this.searchType.bind(this)}
          />
        </div>
        <div className="bottom">
          <div className="pagintion-wrapper">
            <Pagination showSizeChanger
                        defaultCurrent={1}
                        defaultPageSize={20}
                        onChange={this.onPaginationChange.bind(this)}
                        onShowSizeChange={this.onShowSizeChange.bind(this)}
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
