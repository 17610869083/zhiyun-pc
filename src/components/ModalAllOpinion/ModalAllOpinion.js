import React from 'react';
import {connect} from 'react-redux';
import {opinionSearchRequested} from '../../redux/actions/createActions';
import './ModalAllOpinion.less';
import '../../routes/AllOpinion/AllOpinion.less';
import {Select,Input,Button,DatePicker,Form,Checkbox,message} from 'antd';
import IconFont from '../IconFont';
import ReportDetailList from '../ReportDetailList/ReportDetailList';
import BlankPage from '../../base/Exception/BlankPage';
import {api_total_opinion} from '../../services/api';
import request from '../../utils/request';
import {getSecondTime,checkedTrueSid} from '../../utils/format';
const Option = Select.Option;
const InputGroup = Input.Group;
const FormItem = Form.Item;
class ModalAllOpinion extends React.Component{
     constructor(){
         super()
         this.state = {
            searchSeltype: 'content',
            isTopShow:false,
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
                {count: 0, value: "全部", key: "docApp"}  
            ],
            mediaValue: '全部',
            page:1,     
            begin:'0000-00-00 02:00:00',
            end:'0000-00-00 02:00:00',
            checkedArray:new Array(20).fill(false),
            flag:false,
            docList:[],
            pageInfo:{count:0},
            checkedAll:false,
            timePickerShow:false,
            searchKeyword:'',
            isSearch:false
         }
     }
     
    componentWillMount(){
        const {timeValue,trendValue,sortValue,filterValue,mediaValue,begin,end,page} = this.state;
        const {seltype,keyword} = this.props;
        request(api_total_opinion + `&datetag=${timeValue}&neg=${trendValue}&order=${sortValue}
                &similer=${filterValue}&carry=${mediaValue}&begin=${begin}&end=${end}&page=${page}&seltype=${seltype}&keyword=${keyword}`
        ).then((res) => {
            if (res.data.code ===1) {
                this.setState({
                  docList: res.data.docList,
                  pageInfo: res.data.pageInfo,
                  media: res.data.carryCount,
                });
              }else{
               this.setState({
                   docList:'[]',
                   pageInfo: {count:0},
                   media: [{count: 0, value: "全部", key: "docApp"}]
                 });
              }
       })
    }
    componentWillReceiveProps(nextPorps){
      if(nextPorps.keyword!==this.props.keyword){
          const {timeValue,trendValue,sortValue,filterValue,mediaValue,begin,end,page} = this.state;
          const {seltype} = this.props;
          request(api_total_opinion + `&datetag=${timeValue}&neg=${trendValue}&order=${sortValue}
                  &similer=${filterValue}&carry=${mediaValue}&begin=${begin}&end=${end}&page=${page}&seltype=${seltype}&keyword=${nextPorps.keyword}`
          ).then((res) => {
              if (res.data.code ===1) {
                  this.setState({
                    docList: res.data.docList,
                    pageInfo: res.data.pageInfo,
                    media: res.data.carryCount,
                  });
                }else{
                this.setState({
                    docList:'[]',
                    pageInfo: {count:0},
                    media: [{count: 0, value: "全部", key: "docApp"}]
                  });
                }
            })
          }
    }
     //下拉框事件
     handleChange(value){
         this.setState({
           searchSeltype:value
         })
     }
     //显示与隐藏
     isTopShow = () => {
         this.setState({
            isTopShow:!this.state.isTopShow
         })
     }
     //选择时间
     timeClick(value){
         this.setState({
            timeValue:value
         })
         if(value === 'custom'){
            this.setState({
               timePickerShow:!this.state.timePickerShow
            })
            return;
        }else{
            this.setState({
                timePickerShow:false
             })
        }
          const {trendValue,sortValue,filterValue,mediaValue,begin,end,page,isSearch,searchSeltype,searchKeyword} = this.state;
          const {seltype,keyword} = this.props;
          let newSeltype = isSearch? searchSeltype : seltype;
          let newKeyword = isSearch? searchKeyword : keyword;
          request(api_total_opinion + `&datetag=${value}&neg=${trendValue}&order=${sortValue}
         &similer=${filterValue}&carry=${mediaValue}&begin=${begin}&end=${end}&page=${page}&seltype=${newSeltype}&keyword=${newKeyword}`
          ).then((res) => {
           if (res.data.code ===1) {
             this.setState({
               docList: res.data.docList,
               pageInfo: res.data.pageInfo,
               media: res.data.carryCount,
             });
           }else{
            this.setState({
                docList:'[]',
                pageInfo: {count:0},
                media: [{count: 0, value: "全部", key: "docApp"}]
              });
           }
         }) 
     }
    //选择倾向
    trendClick(value){
        this.setState({
            trendValue:value
         })
         const {timeValue,sortValue,filterValue,mediaValue,begin,end,page,isSearch,searchSeltype,searchKeyword} = this.state;
         const {seltype,keyword} = this.props;
         let newSeltype = isSearch? searchSeltype : seltype;
         let newKeyword = isSearch? searchKeyword : keyword;
          request(api_total_opinion + `&datetag=${timeValue}&neg=${value}&order=${sortValue}
          &similer=${filterValue}&carry=${mediaValue}&begin=${begin}&end=${end}&page=${page}&seltype=${newSeltype}&keyword=${newKeyword}`
          ).then((res) => {
           if (res.data.code ===1) {
             this.setState({
               docList: res.data.docList,
               pageInfo: res.data.pageInfo,
               media: res.data.carryCount,
             });
           }else{
            this.setState({
                docList:'[]',
                pageInfo: {count:0},
                media: [{count: 0, value: "全部", key: "docApp"}]
              });
           }
         }) 
    }
    //选择排序
    sortClick(value){
        this.setState({
            sortValue:value
         })
         const {timeValue,trendValue,filterValue,mediaValue,begin,end,page,isSearch,searchSeltype,searchKeyword} = this.state;
         const {seltype,keyword} = this.props;
         let newSeltype = isSearch? searchSeltype : seltype;
         let newKeyword = isSearch? searchKeyword : keyword;
         request(api_total_opinion + `&datetag=${timeValue}&neg=${trendValue}&order=${value}
                 &similer=${filterValue}&carry=${mediaValue}&begin=${begin}&end=${end}&page=${page}&seltype=${newSeltype}&keyword=${newKeyword}`
         ).then((res) => {
             if (res.data.code ===1) {
                 this.setState({
                   docList: res.data.docList,
                   pageInfo: res.data.pageInfo,
                   media: res.data.carryCount,
                 });
               }else{
                this.setState({
                    docList:'[]',
                    pageInfo: {count:0},
                    media: [{count: 0, value: "全部", key: "docApp"}]
                  });
               }
        })
    }
    //选择去重
    filterClick(value){
        this.setState({
            filterValue:value
         })
         const {timeValue,trendValue,sortValue,mediaValue,begin,end,page,isSearch,searchSeltype,searchKeyword} = this.state;
         const {seltype,keyword} = this.props;
         let newSeltype = isSearch? searchSeltype : seltype;
         let newKeyword = isSearch? searchKeyword : keyword;
         request(api_total_opinion + `&datetag=${timeValue}&neg=${trendValue}&order=${sortValue}
                 &similer=${value}&carry=${mediaValue}&begin=${begin}&end=${end}&page=${page}&seltype=${newSeltype}&keyword=${newKeyword}`
         ).then((res) => {
             if (res.data.code ===1) {
                 this.setState({
                   docList: res.data.docList,
                   pageInfo: res.data.pageInfo,
                   media: res.data.carryCount,
                 });
               }else{
                this.setState({
                    docList:'[]',
                    pageInfo: {count:0},
                    media: [{count: 0, value: "全部", key: "docApp"}]
                  });
               }
        })
    }
    //选择媒体
    mediaClick(value){
        this.setState({
            mediaValue:value
         })
         const {timeValue,trendValue,sortValue,filterValue,begin,end,page,isSearch,searchSeltype,searchKeyword} = this.state;
         const {seltype,keyword} = this.props;
         let newSeltype = isSearch? searchSeltype : seltype;
         let newKeyword = isSearch? searchKeyword : keyword;
         request(api_total_opinion + `&datetag=${timeValue}&neg=${trendValue}&order=${sortValue}
                 &similer=${filterValue}&carry=${value}&begin=${begin}&end=${end}&page=${page}&seltype=${newSeltype}&keyword=${newKeyword}`
         ).then((res) => {
             if (res.data.code ===1) {
                 this.setState({
                   docList: res.data.docList,
                   pageInfo: res.data.pageInfo,
                   media: res.data.carryCount,
                 });
               }else{
                this.setState({
                    docList:'[]',
                    pageInfo: {count:0},
                    media: [{count: 0, value: "全部", key: "docApp"}]
                  });
               }
        })
    }
    //自定义时间
    handleSubmit(event){
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
          this.setState({
            begin:begin,
            end:end
        })
        const {timeValue,trendValue,sortValue,mediaValue,filterValue,page,isSearch,searchSeltype,searchKeyword} = this.state;
        const {seltype,keyword} = this.props;
        let newSeltype = isSearch? searchSeltype : seltype;
        let newKeyword = isSearch? searchKeyword : keyword;
        request(api_total_opinion + `&datetag=${timeValue}&neg=${trendValue}&order=${sortValue}
                &similer=${filterValue}&carry=${mediaValue}&begin=${begin}&end=${end}&page=${page}&seltype=${newSeltype}&keyword=${newKeyword}`
        ).then((res) => {
            if (res.data.code ===1) {
                this.setState({
                  docList: res.data.docList,
                  pageInfo: res.data.pageInfo,
                  media: res.data.carryCount,
                });
              }else{
               this.setState({
                   docList:'[]',
                   pageInfo: {count:0},
                   media: [{count: 0, value: "全部", key: "docApp"}]
                 });
              }
        })
        })
  
    }
    //下拉加载
    dropDown(){
        this.setState({
            flag:true
        })
        const {timeValue,trendValue,sortValue,filterValue,mediaValue,begin,end,page,docList,checkedArray,isSearch,searchSeltype,searchKeyword} = this.state;
        const {seltype,keyword} = this.props;
        let newSeltype = isSearch? searchSeltype : seltype;
        let newKeyword = isSearch? searchKeyword : keyword;
        request(api_total_opinion + `&datetag=${timeValue}&neg=${trendValue}&order=${sortValue}
                &similer=${filterValue}&carry=${mediaValue}&begin=${begin}&end=${end}&page=${page}&seltype=${newSeltype}&keyword=${newKeyword}`
        ).then((res) => {
            if (res.data.code ===1) {
                this.setState({
                  docList: docList.concat(res.data.docList),
                  pageInfo: res.data.pageInfo,
                  media: res.data.carryCount,
                  flag:false,
                  checkedArray:checkedArray.concat(new Array(20).fill(false))
                });
              }else{
               this.setState({
                   docList:'[]',
                   pageInfo: {count:0},
                   media: [{count: 0, value: "全部", key: "docApp"}],
                   flag:false
                 });
              }
       })
    }
    //获取sid
    checkedTrue() {
    const arr = [];
    this.state.docList.forEach((item, index) => {
        arr.push(item.sid);
    });
    return arr;
    }
    //全选
    checkAll(e){
        if(e.target.checked){
            this.setState({
                checkedArray:this.checkedTrue(),
                checkedAll:e.target.checked
              })
         }else{
            this.setState({
                checkedArray:this.state.checkedArray.fill(false),
                checkedAll:e.target.checked
              })
         }
    }
    //单选
    checkItem(sids){
        this.setState({
          checkedArray:sids
        })
     }
     //搜索
     keyDown = (e) => {
        let code = e.keyCode;
        if(code === 13){
            this.setState({
               searchKeyword:e.target.value,
               timeValue:'all',  
               trendValue:'all',
               sortValue:'timedown',
               filterValue:1,
               mediaValue:'全部',
               begin:'0000-00-00 02:00:00',
               end:'0000-00-00 02:00:00'
            })
            const {searchSeltype} = this.state;
            request(api_total_opinion + `&datetag=all&neg=all&order=timedown&similer=1&carry=全部&page=1&seltype=${searchSeltype}&keyword=${e.target.value}`
            ).then((res) => {
                if (res.data.code ===1) {
                    this.setState({
                      docList: res.data.docList,
                      pageInfo: res.data.pageInfo,
                      media: res.data.carryCount,
                      flag:false,
                      page:1,
                      isSearch:true
                    });
                  }else{
                   this.setState({
                       docList:'[]',
                       pageInfo: {count:0},
                       media: [{count: 0, value: "全部", key: "docApp"}],
                       flag:false
                     });
                  }
           })
        }
     }
     //确定按钮
     confim = () => {
           console.log(checkedTrueSid(this.state.checkedArray))
     }
     render(){
            const {getFieldDecorator} = this.props.form;
            const {docList,pageInfo} = this.state;
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
            const Media = this.state.media.map((item, index) =>
                <div
                key={index}
                onClick={this.mediaClick.bind(this, item.value)}
                className={item.value === this.state.mediaValue ? 'item active' : 'item'}
                ><p className="item-inner">{item.key === 'docSearch' ? '其它' : item.value}</p>
                <p className="count">{item.count}</p>
                </div>
            );

         return(
             <div className="modal-AllOpinion all-opinion opinion-detail">
               <div className="modal-AllOpinion-top">
                    <span>选项列表</span>
                    <span>
                    <InputGroup compact>
                    <Select defaultValue="content" onChange={this.handleChange.bind(this)} 
                     getPopupContainer={() => document.querySelector('.modal-AllOpinion')}
                     className="select"
                     >
                    <Option value="content">搜全文</Option>
                    <Option value="title" >搜标题</Option>
                    </Select>
                    <Input onKeyDown={this.keyDown}/>
                    </InputGroup>
                    <Button type="primary" onClick={this.confim}>确定</Button>
                    <span className="closeBtn" onClick={this.isTopShow}>
                    <span style={{marginRight:'6px'}}>{this.state.isTopShow ? '显示' : '隐藏'}</span>
                    <IconFont type="icon-jiantou2"
                      style={this.state.isTopShow ?
                      {transform:'rotate(-90deg)',transition:'all 0.5s'}
                      :{transform:'rotate(0deg)',transition:'all 0.5s'}
                      }
                   />
                   </span>
                   </span>
               </div>
               <div className="sort-top" style={this.state.isTopShow ? {display: 'none'} : {display: 'block'}}>
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
                    <div className="count">根据您的条件，为您筛选出<span className="number">{pageInfo!== undefined? pageInfo.count:0}</span>条数据！</div>
                    </div>
                    <div className="bottom">
                    <div className="operation-top">
                    <Checkbox onChange={this.checkAll.bind(this)} checked={this.state.checkedAll}/>
                    <span>批量操作</span>
                    {/* <span style={{marginLeft:'6px'}}>加入报告</span> */}
                    </div>
                    {docList!=='[]'?
                    <ReportDetailList 
                    checkedArray={this.state.checkedArray}
                    docList={docList}
                    checkItem = {this.checkItem.bind(this)}
                    dropDown={this.dropDown.bind(this)}
                    flag={this.state.flag}
                    type='report'
                    />: <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/sortedopinion/addrule">添加</a>关键词</span>'/>
                    }
                    </div>
             </div>
         )
     }
}
const mapStateToProps = state => {
    return {
      docList: state.opinionSearchSucceededReducer.data.docList,
      carryCount: state.opinionSearchSucceededReducer.data.carryCount,
      pageInfo: state.opinionSearchSucceededReducer.data.pageInfo,
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      opinionSearchRequest: req => {
        dispatch(opinionSearchRequested(req));
      }
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)((Form.create()(ModalAllOpinion)));