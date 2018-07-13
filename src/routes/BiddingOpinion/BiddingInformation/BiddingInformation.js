import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Pagination, DatePicker, Form, message, Button} from 'antd';
import request from '../../../utils/request';
// import OpinionDetail from '../../../components/OpinionDetail/OpinionDetail';
import BiddingDetail from '../BiddingDetail/BiddingDetail'
import './BiddingInformation.less'
import {getTopicRequested, paginationPage, searchKeywordSync} from '../../../redux/actions/createActions';
import {
  api_topic_message_list,
  api_bidding_message_list 
} from '../../../services/api';
import {getSecondTime} from '../../../utils/format';
import { setTimeout } from 'timers';

const FormItem = Form.Item;

class BiddingInformation extends React.Component {
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
      loading: true,
      timeIndex: 0,
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
      trendIndex: 0,
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
      sortIndex: 0,
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
      filterIndex: 0,
      filterValue: 1,
      media: [
        {count: 0, value: "全部", key: "docApp"},
      ],
      mediaIndex: 0,
      mediaValue: '全部',
      page: 1,
      pagesize: 20,
      pageCount: 0,
      count: 0,
      docList: [],
      begin: '0000-00-00 00:00:00',
      end: '2222-22-22 22:22:22',
      timePickerShow: false,
      topicID: 1,
      pageInfo: {},
      current: 1
    }
  }

  timeClick(index, value) {
    this.setState({
      timeIndex: index,
      timeValue: value
    });
    if (index === 5) {
      this.setState({
        timePickerShow: !this.state.timePickerShow
      })
      return
    } else {
      this.setState({
        timePickerShow: false
      })
    }
    request(api_bidding_message_list + `&pagesize=${this.state.pagesize}&clfid=${this.state.topicID}&datetag=${value}&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}`
     ).then((res) => {
      if (res.data && res.data.docList) {
        this.setState({
          docList: res.data.docList,
          pageCount: res.data.pageInfo.pageCount,
          count: res.data.pageInfo.count,
          pageInfo: res.data.pageInfo,
          media: res.data.carryCount,
        });
      }
    })
    this.props.paginationPage(1);
    this.props.searchKeywordSync({keyword: "1", seltype: "1", type: 0});
  }

  // 选择具体时间
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const rangeTimeValue = fieldsValue['range-time-picker'];
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
      if (getSecondTime(begin) > getSecondTime(end)) {
        message.error('开始时间请不要大于结束时间');
        return;
      }
      const timeValue = 'custom';
      this.setState({
        begin: begin,
        end: end,
        timeValue: 'custom',
        timeIndex: 0
      });

      request(api_bidding_message_list + `&pagesize=${this.state.pagesize}&clfid=${this.state.topicID}&datetag=${timeValue}&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}&begin=${begin}&end=${end}`)
      .then((res) => {
        if (res.data && res.data.docList) {
          this.setState({
            docList: res.data.docList,
            pageCount: res.data.pageInfo.pageCount,
            count: res.data.pageInfo.count,
            pageInfo: res.data.pageInfo,
            media: res.data.carryCount,
          });
        }
      })
    });
    this.props.paginationPage(1);
    this.props.searchKeywordSync({keyword: "1", seltype: "1", type: 0});
  }

  trendClick(index, value) {
    this.setState({
      trendIndex: index,
      trendValue: value
    });
    const requestStr = this.state.timeValue !== 'custom' ?
    `clfid=${this.state.topicID}&datetag=${this.state.timeValue}&neg=${value}&order=${this.state.sortValue}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}`
    :`clfid=${this.state.topicID}&datetag=custom&neg=${value}&order=${this.state.sortValue}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}&begin=${this.state.begin}&end=${this.state.end}`
    request(api_bidding_message_list + `&${requestStr}` ).then((res) => {
      if (res.data ) {
        this.setState({
          docList: res.data.docList,
          pageCount: res.data.pageInfo.pageCount,
          count: res.data.pageInfo.count,
          pageInfo: res.data.pageInfo,
          media: res.data.carryCount,
        });
      }
    })
    this.props.paginationPage(1);
    this.props.searchKeywordSync({keyword: "1", seltype: "1", type: 0});
  }

  sortClick(index, value) {
    this.setState({
      sortIndex: index,
      sortValue: value
    });
        const requestStr = this.state.timeValue !== 'custom' ?
        `clfid=${this.state.topicID}&datetag=${this.state.timeValue}&neg=${this.state.trendValue}&order=${value}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}`
        :`clfid=${this.state.topicID}&datetag=custom&neg=${this.state.trendValue}&order=${value}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}&begin=${this.state.begin}&end=${this.state.end}`
        request(api_bidding_message_list +`&${requestStr}`).then((res) => {
            if(res.data&&res.data.code!==0){
            this.setState({
                docList: res.data.docList,
                pageCount: res.data.pageInfo.pageCount,
                count: res.data.pageInfo.count,
                pageInfo:res.data.pageInfo,
                media: res.data.carryCount,
            });
        }
        })
        this.props.paginationPage(1);
        this.props.searchKeywordSync({keyword: "1", seltype: "1",type:0});
    }

  filterClick(index, value) {
    this.setState({
      filterIndex: index,
      filterValue: value
    });
        const requestStr = this.state.timeValue !== 'custom' ?
        `clfid=${this.state.topicID}&datetag=${this.state.timeValue}&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${value}&carry=${this.state.mediaValue}`
        :`clfid=${this.state.topicID}&datetag=custom&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${value}&carry=${this.state.mediaValue}&begin=${this.state.begin}&end=${this.state.end}`
        request(api_bidding_message_list + `&${requestStr}`).then((res) => {
            if(res.data&&res.data.docList){
            this.setState({
                docList: res.data.docList,
                pageCount: res.data.pageInfo.pageCount,
                count: res.data.pageInfo.count,
                pageInfo:res.data.pageInfo,
                media: res.data.carryCount,
            });
           }
        })
        this.props.paginationPage(1);
        this.props.searchKeywordSync({keyword: "1", seltype: "1",type:0});
    }

  mediaClick(index, value) {
    this.setState({
      mediaIndex: index,
      mediaValue: value
    });
        const requestStr = this.state.timeValue !== 'custom' ?
        `clfid=${this.state.topicID}&datetag=${this.state.timeValue}&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${value}&carry=${value}`
        :`clfid=${this.state.topicID}&datetag=custom&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${value}&carry=${value}&begin=${this.state.begin}&end=${this.state.end}`
        request(api_bidding_message_list +`&${requestStr}`).then((res) => {
            if(res.data&&res.data.docList){
            this.setState({
                docList: res.data.docList,
                pageCount: res.data.pageInfo.pageCount,
                pageInfo:res.data.pageInfo,
                media: res.data.carryCount,
            });
        }
        })
        this.props.paginationPage(1);
        this.props.searchKeywordSync({keyword: "1", seltype: "1",type:0});
    }

  onShowSizeChange(current, pageSize) {
    this.setState({
      page: current,
      pagesize: pageSize
    });
    const requestStr = this.state.timeValue !== 'custom' ?
      `clfid=${this.state.topicID}&datetag=${this.state.timeValue}&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}&pagesize=${pageSize}`
      : `clfid=${this.state.topicID}&datetag=custom&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}&begin=${this.state.begin}&end=${this.state.end}&pagesize=${pageSize}`
    request(api_bidding_message_list + `&${requestStr}`).then((res) => {
      if (res.data && res.data.docList) {
        this.setState({
          docList: res.data.docList,
          pageCount: res.data.pageInfo.pageCount,
          count: res.data.pageInfo.count,
          pageInfo: res.data.pageInfo,
          media: res.data.carryCount,
        });
      }
    })
    this.props.paginationPage(1);
    this.props.searchKeywordSync({keyword: "1", seltype: "1", type: 0});
  }

  onPaginationChange(pagenumber) {
    this.setState({
      page: pagenumber
    });
    this.props.paginationPage(pagenumber);
    const requestStr = this.state.timeValue !== 'custom' ?
      `clfid=${this.state.topicID}&datetag=${this.state.timeValue}&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}&page=${pagenumber}&pagesize=${this.state.pagesize}`
      : `clfid=${this.state.topicID}&datetag=custom&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}&page=${pagenumber}&pagesize=${this.state.pagesize}&begin=${this.state.begin}&end=${this.state.end}`
    request(api_bidding_message_list + `&${requestStr}`).then((res) => {
      if (res.data && res.data.code !== 0) {
        this.setState({
          docList: res.data.docList,
          pageCount: res.data.pageInfo.pageCount,
          count: res.data.pageInfo.count,
          pageInfo: res.data.pageInfo,
          media: res.data.carryCount
        });
      }
    })
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  dataChanged(data) {
    this.dataChangeTimer = setTimeout(() => {
      const requestStr = this.state.timeValue !== 'custom' ?
      `clfid=${this.state.topicID}&datetag=${this.state.timeValue}&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}&page=${this.props.page}&pagesize=${this.state.pagesize}`
      : `clfid=${this.state.topicID}&datetag=custom&neg=${this.state.trendValue}&order=${this.state.sortValue}&similer=${this.state.filterValue}&carry=${this.state.mediaValue}&page=${this.props.page}&pagesize=${this.state.pagesize}&begin=${this.state.begin}&end=${this.state.end}`
      request(api_bidding_message_list + `&${requestStr}`).then((res) => {
      if (res.data) {
        this.setState({
          docList: res.data.docList,
          media: res.data.carryCount,
          pageCount: res.data.pageInfo.pageCount,
          count: res.data.pageInfo.count,
          pageInfo: res.data.pageInfo,
        });
      }
      }); 
    },10)
  }
      componentDidMount() {  
        this.topicTimer = setTimeout( ()=>{
        let topicID=this.props.getRouter;
        if(topicID.topicid){
          request(api_bidding_message_list + '&clfid=' + topicID.topicid).then((res) => {
              if(res.data.code === 1){
                this.setState({
                    docList: res.data.docList,
                    media: res.data.carryCount,
                    pageCount: res.data.pageInfo.pageCount,
                    count: res.data.pageInfo.count,
                    pageInfo:res.data.pageInfo,
                    topicID:topicID.topicid
                });
              }else{
                this.setState({
                  docList:'[]'
                })
              }
          });
        }
       },700)   
    }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      let topicID = this.props.getRouter;
      if (topicID.topicid) {
        request(api_bidding_message_list +`&clfid=${topicID.topicid}`).then((res) => {
          if (res.data.code === 1) {
            this.setState({
              docList: res.data.docList,
              media: res.data.carryCount,
              pageCount: res.data.pageInfo.pageCount,
              count: res.data.pageInfo.count,
              pageInfo: res.data.pageInfo,
              topicID: topicID.topicid,
              timeIndex: 0,
              sortIndex: 0,
              filterIndex: 0,
              mediaIndex: 0,
              trendIndex: 0
            });
          }else{
            this.setState({
              docList:'[]'
            })
          }
        });
      }
    }
    if (prevProps.current !== this.props.current) {
      this.setState({
        checkedAll: false
      })
    }
  }

  componentWillUnmount() {
    this.props.paginationPage(1);
    clearTimeout(this.dataChangeTimer); 
    clearTimeout(this.topicTimer); 
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {page} = this.props;
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
        onClick={this.timeClick.bind(this, index, item.value)}
        className={index === this.state.timeIndex ? 'item active' : 'item'}
      ><span className="item-inner">{item.name}</span></div>
    );

    // 倾向
    const Trend = this.state.trend.map((item, index) =>
      <div
        key={index}
        onClick={this.trendClick.bind(this, index, item.value)}
        className={index === this.state.trendIndex ? 'item active' : 'item'}
      ><span className="item-inner">{item.name}</span></div>
    );

    // 排序
    const Sort = this.state.sort.map((item, index) =>
      <div
        key={index}
        onClick={this.sortClick.bind(this, index, item.value)}
        className={index === this.state.sortIndex ? 'fours active' : 'fours'}
      ><span className="item-inner">{item.name}</span></div>
    );

    // 去重
    const Filter = this.state.filter.map((item, index) =>
      <div
        key={index}
        onClick={this.filterClick.bind(this, index, item.value)}
        className={index === this.state.filterIndex ? 'item active' : 'item'}
      ><span className="item-inner">{item.name}</span></div>
    );

    // 媒体类型
    const Media = this.state.media.map((item, index) =>
      <div
        key={index}
        onClick={this.mediaClick.bind(this, index, item.value)}
        className={index === this.state.mediaIndex ? 'item active' : 'item'}
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
      <div className="topic-list-opinion">
        <div className="sort-top" style={this.props.search ? {display: 'block'} : {display: 'none'}}>
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
                  {getFieldDecorator('range-time-picker')(
                    <DatePicker showTime placeholder="开始日期" format="YYYY-MM-DD HH:mm:ss"/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                >
                  {getFieldDecorator('range-endtime-picker')(
                    <DatePicker showTime placeholder="结束日期" format="YYYY-MM-DD HH:mm:ss"
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
          <div className="count">根据您的条件，为您筛选出<span className="number">{this.state.pageInfo.count}</span>条数据！</div>
          <BiddingDetail docList={this.state.docList}
                         onDataChange={this.dataChanged.bind(this)}
                         param={param}
                         pageSize={this.state.pagesize}
                         propsType='TopicList'
                         pageInfo={this.state.pageInfo}
                         current={page}
          />
        </div>
        <div className="bottom">
          <div className="pagintion-wrapper">
            <Pagination showSizeChanger
                        defaultCurrent={1}
                        defaultPageSize={20}
                        onChange={this.onPaginationChange.bind(this)}
                        onShowSizeChange={this.onShowSizeChange.bind(this)}
                        total={this.state.count}
                        current={page}
                        getPopupContainer={() => document.querySelector('.topic-list-opinion')}
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
    keyword: state.onSearchContentReducer.keyword,
    page: state.paginationPageReducer,
    search: state.searchStateReducer.data,
    getRouter: state.getRouterReducer
  }
};
const mapDispatchToProps = dispatch => {
  return {
    topicListRequest: req => {
      dispatch(getTopicRequested(req));
    },
    paginationPage: req => {
      dispatch(paginationPage(req));
    },
    searchKeywordSync: ks => {
      dispatch(searchKeywordSync(ks));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)((Form.create()(BiddingInformation)));
