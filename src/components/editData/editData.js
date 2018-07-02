import React, { Component } from "react";
import { DatePicker } from "antd";
import moment from 'moment';
import "./editData.less";
const dateFormat = 'YYYY/MM/DD';

export default class editData extends Component {
  state = {
    value: this.props.value,
    editable: false,
    count: 1
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
            <DatePicker defaultValue={moment('2017-11-16', dateFormat)} showTime format={dateFormat} blur={this.check}/>
          </div>
        ) : (
          <div
            className="editable-cell-text-wrapper"
            title={value}
            onClick={this.edit.bind(this, this.state.count)}
          >
            {/* {value || " "} */}
            2017-11-16
          </div>
        )}
      </div>
    );
  }
}
