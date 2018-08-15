import React from 'react'
import './Select.less'
import {Input} from 'antd'
class Select extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        inputvalue: this.props.defaultValut || ''
      }
  }
  onMouseOver(e) {
    e.target.className = 'active'
  }
  onMouseOut(e) {
    e.target.className = ''
  }
  onBlur(type, value, e) {
    // console.log(e.target.nextSibling)
    // document.querySelector('.showSelect').style.maxHeight = 0
    // console.log(arguments)
    if(type === 'click') {
      this.props.onOk(value)
      document.querySelector('.input-' + e).style.maxHeight = 0
      document.querySelector('.input-' + e).style.boxShadow = 'none'
    } else{
      this.props.onOk(this.state.inputvalue)
      document.querySelector('.input-' + type).style.maxHeight = 0
      document.querySelector('.input-' + type).style.boxShadow = 'none'
    }
    // this.setState({
    //     inputvalue: this.props.defaultValut
    // })
  }
  onFocus(key) {
    // document.querySelector('.showSelect').style.maxHeight = '132px'
    document.querySelector('.input-' + key).style.maxHeight = '132px'
    document.querySelector('.input-' + key).style.boxShadow = '0px 1px 2px 2px #eeeeee'
  }
  onChange(e) {
    this.setState({
      inputvalue: e.target.value
    })
  }
  onClick(key, e) {
    this.setState({
      inputvalue: e.target.innerText
    }, () => {
      // console.log(e.target)
      this.onBlur('click', this.state.inputvalue, key)
    })
    
  }
  render() {
    return (
      <div className={this.props.className ? 'Select ' + this.props.className : 'Select'} style={this.props.style || {}}>
        <Input type="text" onBlur={this.onBlur.bind(this, this.props.fkey)} onFocus={this.onFocus.bind(this, this.props.fkey)} onChange={this.onChange.bind(this)} value={this.state.inputvalue}/>
        <ul className={"showSelect input-" + this.props.fkey} >
            {this.props.list.map((item, index) => {
              return <li onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} onClick={this.onClick.bind(this, this.props.fkey)} key={index}>{item.caseType}</li>
            })}
        </ul>
      </div>
    )
  }
}

export default Select
