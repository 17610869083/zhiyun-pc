import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Form, DatePicker, Pagination, message, Button} from 'antd';
import {getSortedContentRequested, paginationPage} from '../../redux/actions/createActions';
import OpinionDetail from '../../components/OpinionDetail/OpinionDetail';
import './SortedList.less';
import {getSecondTime} from '../../utils/format';

const FormItem = Form.Item;

class SortedList extends React.Component {
  constructor() {
    super();
    this.state = {
      clfid: 1,
      typeid: 0,
      datetag: 'all',
      datetagArray: [
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
      neg: 'all',
      negArray: [
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
      carry: '全部',
      carryArray: [
        {count: 0, value: "全部", key: "all"}
      ],
      similer: 0,
      similerArray: [
        {
          name: '去重',
          value: 0
        },
        {
          name: '不去重',
          value: 1
        }
      ],
      order: 'timedown',
      orderArray: [
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
      begin: '0000-00-00 00:00:00',
      end: '2222-22-22 22:22:22',
      page: 1,
      pagesize: 20,
      pageCount: 500,
      docList: [],
      count: 0,
      isTopShow: true,
      timeValue: 'all',
      trendValue: 'all',
      sortValue: 'timedown',
      filterValue: 0,
      mediaValue: '全部',
      timePickerShow: false,
    };
  }

  timeClick(index, value) {
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
    this.setState({
      datetag: value
    });
    const param = {
      clfid: this.props.clfId,
      datetag: value,
      neg: this.state.neg,
      order: this.state.order,
      similer: this.state.similer,
      carry: this.state.carry,
      page: 1,
      pagesize: this.state.pagesize,
    };
    this.props.getSortedContentRequested(param);
    this.props.paginationPage(1);
  }

  trendClick(value) {
    this.setState({
      neg: value
    });
    const param = {
      clfid: this.props.clfId,
      datetag: this.state.datetag,
      neg: value,
      order: this.state.order,
      similer: this.state.similer,
      carry: this.state.carry,
      page: 1,
      pagesize: this.state.pagesize,
    };
    this.props.getSortedContentRequested(param);
    this.props.paginationPage(1);
  }

  mediaClick(value) {
    this.setState({
      carry: value
    });
    const param = {
      clfid: this.props.clfId,
      datetag: this.state.datetag,
      neg: this.state.neg,
      order: this.state.order,
      similer: this.state.similer,
      carry: value,
      page: 1,
      pagesize: this.state.pagesize,
    };
    this.props.getSortedContentRequested(param);
    this.props.paginationPage(1);
  }

  filterClick(value) {
    this.setState({
      similer: value
    });
    const param = {
      clfid: this.props.clfId,
      datetag: this.state.datetag,
      neg: this.state.neg,
      order: this.state.order,
      similer: value,
      carry: this.state.carry,
      page: 1,
      pagesize: this.state.pagesize,
    };
    this.props.getSortedContentRequested(param);
    this.props.paginationPage(1);
  }

  sortClick(value) {
    this.setState({
      order: value
    });
    const param = {
      clfid: this.props.clfId,
      datetag: this.state.datetag,
      neg: this.state.neg,
      order: value,
      similer: this.state.similer,
      carry: this.state.carry,
      page: 1,
      pagesize: this.state.pagesize,
    };
    this.props.getSortedContentRequested(param);
    this.props.paginationPage(1);
  }

  handleSubmit(event) {
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

      this.setState({
        begin: begin,
        end: end,
        timeValue: 'custom',
        timeIndex: 0
      });
      const param = {
        clfid: this.props.clfId,
        datetag: this.state.datetag,
        neg: this.state.neg,
        order: this.state.order,
        similer: this.state.similer,
        carry: this.state.carry,
        page: 1,
        pagesize: this.state.pagesize,
        begin: begin,
        end: end
      };
      this.props.getSortedContentRequested(param);
      this.props.paginationPage(1);
    })

  }

  onPaginationChange(value) {
    this.setState({
      page: value
    });
    const param = {
      clfid: this.props.clfId,
      datetag: this.state.datetag,
      neg: this.state.neg,
      order: this.state.order,
      similer: this.state.similer,
      carry: this.state.carry,
      page: value,
      pagesize: this.state.pagesize,
    };
    this.props.getSortedContentRequested(param);
    this.props.paginationPage(value);
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  onShowSizeChange(current, pageSize) {
    this.setState({
      page: current,
      pagesize: pageSize
    });
    const param = {
      clfid: this.props.clfId,
      datetag: this.state.datetag,
      neg: this.state.neg,
      order: this.state.order,
      similer: this.state.similer,
      carry: this.state.carry,
      page: this.state.page,
      pagesize: pageSize,
    };
    this.props.getSortedContentRequested(param);
  }

  dataChanged(data) {
    const param = {
      clfid: this.props.clfId,
      datetag: this.state.datetag,
      neg: this.state.neg,
      order: this.state.order,
      similer: this.state.similer,
      carry: this.state.carry,
      page: data,
      pagesize: this.state.pagesize,
    };
    this.props.getSortedContentRequested(param);
  }

  // 头部显示和隐藏
  triggerTopShow() {
    this.setState({
      isTopShow: !this.state.isTopShow
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      const param = {
        clfid: this.props.clfId,
      };
      this.props.getSortedContentRequested(param);
    } else if (prevProps.page !== this.props.page) {

    }
  }

  componentWillUnmount() {
    this.props.paginationPage(1);
  }

  render() {
    const {docList, pageInfo, carryCount, page} = this.props;
    const {
      datetag, neg, carry, similer, order,
      datetagArray, negArray, carryArray, similerArray, orderArray
    } = this.state;
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
    const Time = datetagArray.map((item, index) =>
      <div
        key={item.value}
        onClick={this.timeClick.bind(this, index, item.value)}
        className={item.value === datetag ? 'item active' : 'item'}
      ><span className="item-inner">{item.name}</span></div>
    );
    // 倾向
    const Trend = negArray.map((item) =>
      <div
        key={item.value}
        onClick={this.trendClick.bind(this, item.value)}
        className={item.value === neg ? 'item active' : 'item'}
      ><span className="item-inner">{item.name}</span></div>
    );
    // 媒体类型
    const carryRender = carryCount ? carryCount : carryArray;
    const Media = carryRender.map((item) =>
      <div
        key={item.value}
        onClick={this.mediaClick.bind(this, item.value)}
        className={item.value === carry ? 'item active' : 'item'}
      ><p className="item-inner">{item.value}</p>
        <p className="count"> {item.count}</p>
      </div>
    );
    // 去重
    const Filter = similerArray.map((item) =>
      <div
        key={item.value}
        onClick={this.filterClick.bind(this, item.value)}
        className={item.value === similer ? 'item active' : 'item'}
      ><span className="item-inner">{item.name}</span></div>
    );
    // 排序
    const Sort = orderArray.map((item) =>
      <div
        key={item.value}
        onClick={this.sortClick.bind(this, item.value)}
        className={item.value === order ? 'item active' : 'fours'}
      ><span className="item-inner">{item.name}</span></div>
    );
    const param = {
      datetag: this.state.datetag,
      neg: this.state.neg,
      order: this.state.order,
      similer: this.state.similer,
      carry: this.state.carry,
      begin: this.state.begin,
      end: this.state.end,
      page: this.state.page,
      pagesize: this.state.pagesize
    };
    return (
      <div className="sorted-opinion-list-container">
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
          <div className="count">根据您的条件，为您筛选出<span className="number">{pageInfo && pageInfo.count}</span>条数据！</div>
          <OpinionDetail
            docList={docList}
            onDataChange={this.dataChanged.bind(this)}
            param={param}
            propsType='SortedList'
            pageSize={this.state.pagesize}
            pageInfo={pageInfo}
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
                        total={pageInfo && pageInfo.count}
                        getPopupContainer={() => document.querySelector('.sorted-opinion-list-container')}
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
    keyword: state.onSearchContentReducer.keyword,
    docList: state.getSortedContentSucceeded.data.docList,
    carryCount: state.getSortedContentSucceeded.data.carryCount,
    pageInfo: state.getSortedContentSucceeded.data.pageInfo,
    clfId: state.changeClfId.id,
    page: state.paginationPageReducer,
    search: state.searchStateReducer.data
  }
};
const mapDispatchToProps = dispatch => {
  return {
    getSortedContentRequested: req => {
      dispatch(getSortedContentRequested(req));
    },
    paginationPage: req => {
      dispatch(paginationPage(req));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)((Form.create()(SortedList)));