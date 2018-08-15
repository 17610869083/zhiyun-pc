import React from 'react'
import { Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'

import {Menu, Select, DatePicker, Input } from 'antd'
import {
  evidListRequested
} from '../../redux/actions/createActions'
import request from '../../utils/request';
import {history} from '../../utils/history'
import {api_evidadmin_typeList} from '../../services/api'
import Interent from './Interent/Interent'
import './EvidenceManagement.less'
const Option = Select.Option;
const { RangePicker } = DatePicker
class EvidenceManagement extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          current: 'interent',
          date: [],
          selectcurrent: '1',
          optionArr: [],
          casetypecurrent: '',
          paramstate: 0,
          iptValue: ''
      }
  }
  componentDidMount() {
    request(api_evidadmin_typeList).then(res => {
      this.setState({
        optionArr: res.data.data
      })
    })
  }
  handleClick(value) {
    this.setState({
      current: value.key
    })
    // history.push('/allopinion/evidencemanagement/' + value.key)
    let param = {
      page: 1,
      pagesize: 10,
      state: 0
    }
    value.key === 'publicsentiment' ? param.state = 1 : ''
    this.setState({
      paramstate: param.state
    })
    this.props.evidListRequest(param)
    history.push('/allopinion/evidencemanagement/interent/' + (value.key === 'interent' ? 0 : 1))
  }
  onDateChange(date, dateString) {
    if(date.length <= 0) {
      this.setState({
        date: date
      })
      return
    }
    this.setState({
      date: dateString
    })
    console.log(date, dateString)
    // const startTime = parseInt(date[0].format('x'))
    // const endtTime = parseInt(date[1].format('x'))
    let param = {
      typeId: this.state.casetypecurrent,
      title: this.state.iptValue,
      packageName: this.state.iptValue,
      startTime: dateString[0],
      endtTime: dateString[1],
      state: this.state.paramstate
    }
    switch(this.state.selectcurrent) {
      case '1' :
        delete param.title
        delete param.typeId
        if(param.packageName === '') return
        break;
      case '2' :
        delete param.title
        delete param.packageName
        if(param.typeId === '') return
        break;
      case '3' :
        delete param.typeId
        delete param.packageName
        if(param.title === '') return
        break
    }
    this.props.evidListRequest(param)
  }
  onSelectChange(value) {
    this.setState({
      selectcurrent: value
    })
    switch (value) {
      case '1':
        let param = this.state.date.length > 0 ? {packageName: this.state.iptValue,state: this.state.paramstate, startTime: this.state.date[0], endtTime: this.state.date[1]}:
                                                  {packageName: this.state.iptValue,state: this.state.paramstate}
        param.packageName === '' ? '' : this.props.evidListRequest(param)
        break;
      case '2':
        let param2 = this.state.date.length > 0 ? {typeId: this.state.casetypecurrent, state: this.state.paramstate, startTime: this.state.date[0], endtTime: this.state.date[1]}:
        {typeId: this.state.casetypecurrent,state: this.state.paramstate}
        param2.typeId === '' ? '' : this.props.evidListRequest(param2)
        break;
      case '3':
        let param3 = this.state.date.length > 0 ? {title: this.state.iptValue, state: this.state.paramstate, startTime: this.state.date[0], endtTime: this.state.date[1]}:
        {title: this.state.iptValue, state: this.state.paramstate}
        param3.title === '' ? '' : this.props.evidListRequest(param3)
        break;
    }
  }
  caseTypeChange(value) {
    this.setState({
      casetypecurrent: value
    })
    let param = {
      typeId: value,
      startTime: this.state.date[0],
      endtTime: this.state.date[1],
      state: this.state.paramstate
    }
    if(this.state.date.length <= 0) {
      delete param.startTime
      delete param.endtTime
    }
    this.props.evidListRequest(param)
  }
  inputChange(e){
    this.setState({
      iptValue: e.target.value
    })
  }
  oniptBlur() {
    let param = {
      title:  this.state.iptValue,
      packageName: this.state.iptValue,
      startTime: this.state.date[0],
      endtTime: this.state.date[1],
      state: this.state.paramstate
    }
    if(this.state.date.length <= 0) {
      delete param.startTime
      delete param.endtTime
    }
    if(this.state.selectcurrent === '1') delete param.title
    if(this.state.selectcurrent === '3') delete param.packageName
    this.props.evidListRequest(param)
  }
  render() {
    const dateFormat = 'YYYY/MM/DD';
    const option =  this.state.optionArr.map((item, index) => {
          return <Option key={item.typeId}>{item.caseType}</Option>
        })
    return (
      <div className="evidence-management">
        <div className="title">
          <Menu
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              style={{lineHeight:'26px',backgroundColor: '#E4EbF7',paddingTop:'14px',border:'none'}}
          >
              <Menu.Item key="interent" style={{fontSize:'16px'}}>
                  互联网取证
              </Menu.Item>
              <Menu.Item key="publicsentiment" style={{fontSize:'16px'}}>
                  舆情取证
              </Menu.Item>
          </Menu>
          <div className="fifter">
            <Select style={{width: 100, borderRight: 'none'}} value={this.state.selectcurrent} onChange={this.onSelectChange.bind(this)}>
              <Option key="1">证据包名称</Option>
              <Option key="2">案件类型</Option>
              <Option key="3">标题</Option>
            </Select>
            {
              this.state.selectcurrent === '2' ?  
              <Select style={{width: 200}} onChange={this.caseTypeChange.bind(this)}>{option}</Select>:
              <Input style={{width: 200}} onChange={this.inputChange.bind(this)} value={this.state.iptValue} onBlur={this.oniptBlur.bind(this)}></Input>
            }
            
            <RangePicker onChange={this.onDateChange.bind(this)}></RangePicker>
          </div>
        </div>
        <div className="content">
          <Switch>
            <Route path="/allopinion/evidencemanagement/interent/:current" component={Interent}></Route>
          </Switch>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    evidListRequest: req => {
      dispatch(evidListRequested(req));
    }
  }
}
export default connect(null, mapDispatchToProps)(EvidenceManagement)
// WEBPACK FOOTER //
// src/routes/EvidenceManagement/EvidenceManagement.js