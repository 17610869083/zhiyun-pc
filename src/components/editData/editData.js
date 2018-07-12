import React, { Component } from "react";
import { DatePicker } from "antd";
import moment from 'moment';
import "./editData.less";
const dateFormat = 'YYYY年MM月DD日';

export default class editData extends Component {
  state = {
    value: this.props.value,
    editable: false,
    count: 1,
    dateString: ""
  };
  componentDidMount() {}
  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });
  }
  handleChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };
  onChangeDate = (value, dateString) => {
    console.log(dateString);
    this.setState({
      dateString: dateString
    })
    console.log(value, dateString)
  }
  onOk = (values) => {
    console.log(values);
    this.setState({ editable: false, value: this.state.dateString });
    if (this.props.onChange) {
      this.props.onChange(this.state.dateString);
    }
  }
  edit = num => {
    num++;
    setTimeout(() => {
      if (num === 2) {
        this.setState({ editable: true });
      }
    }, 500);
  };
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            {/* <Input
              value={value}
              autoFocus
              onChange={this.handleChange}
              onBlur={this.check}
              style={{ width: 150, outline: "none", border: 0 }}
            /> */}
            <DatePicker
              showTime
              format={dateFormat}
              onOk={this.onOk.bind(this)}
              // blur={this.check}
              defaultValue={moment(value, dateFormat)}
              onChange={this.onChangeDate.bind(this)}
            />
          </div>
        ) : (
          <div
            className="editable-cell-text-wrapper"
            title={value}
            onClick={this.edit.bind(this, this.state.count)}
          >
            {value || " "}
            {/* 2017-11-16 */}
          </div>
        )}
      </div>
    );
  }
}
