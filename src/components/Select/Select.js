import React from 'react'
import './Select.less'
import {Input} from 'antd'
class Select extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        inputvalue: ''
      }
  }
  onMouseOver(e) {
    e.target.className = 'active'
  }
  onMouseOut(e) {
    e.target.className = ''
  }
  onBlur(type, value) {
    document.querySelector('.showSelect').style.maxHeight = 0
    type === 'click' ?  this.props.onOk(value) : this.props.onOk(this.state.inputvalue)
  }
  onFocus() {
    document.querySelector('.showSelect').style.maxHeight = '132px'
    this.setState({
      inputvalue: ''
    })
  }
  onChange(e) {
    this.setState({
      inputvalue: e.target.value
    })
  }
  onClick(e) {
    this.setState({
      inputvalue: e.target.innerText
    }, () => {
      this.onBlur('click', this.state.inputvalue)
    })
    
    
  }
  render() {
    return (
      <div className='Select'>
        <Input type="text" onBlur={this.onBlur.bind(this)} onFocus={this.onFocus.bind(this)} onChange={this.onChange.bind(this)} value={this.state.inputvalue}/>
        <ul className="showSelect">
            {this.props.list.map((item, index) => {
              return <li onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} onClick={this.onClick.bind(this)} key={index}>{item.caseType}</li>
            })}
        </ul>
      </div>
    )
  }
}

export default Select
