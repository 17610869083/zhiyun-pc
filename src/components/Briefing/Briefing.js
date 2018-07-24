import React from 'react'
import {Icon} from 'antd'
import './Briefing.less'
import request from '../../utils/request'
import {
    api_briefing_list
} from '../../services/api'
export class Briefing extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            report: []
        }
    }
    componentWillMount () {
        request(api_briefing_list).then((res) => {
            // console.log(res.data.data.pageBean.content)
            if(res.data.code === 1) {
                this.setState({
                    report: res.data.data.pageBean.content
                })
            }
        })
    }
    componentWillReceiveProps(nexprops) {
        if(this.props.visible !== nexprops.visible) {
            if(!nexprops.visible) {
                let timer = setInterval(() => {
                    document.querySelector('.briefing').style.maxHeight = document.querySelector('.briefing').offsetHeight-20 + 'px'
                    if(document.querySelector('.briefing').offsetHeight <= 20) {
                        document.querySelector('.briefing').style.maxHeight = 0
                        clearInterval(timer)
                    }
                }, 10)
            }else {
                let height = 0
                let timer = setInterval(() => {
                    if(height === 100) {
                        clearInterval(timer)
                        return;
                    }
                    height ++
                    document.querySelector('.briefing').style.maxHeight = height + '%'
                }, 10)
            }
        }
    }
    hide() {
        
        
    }
    ondragenter(e) {
        // e.stopImmediatePropagation();
        function domToString (node) {  
            let tmpNode = document.createElement('div')
            tmpNode.appendChild(node) 
            let str = tmpNode.innerHTML
            tmpNode = node = null; // 解除引用，以便于垃圾回收  
            return str;  
       }
       
        console.log(domToString(e.target))
        console.log('进入')
    }
    ondragleave() {
        console.log('离开')
    }
    ondrop() {
        console.log('在目标上松手')
    }
    ondragend(e) {
        e.preventDefault();
    }
    ondragover(e) {
        e.preventDefault();
    }
    render() {
        const reportList = () => {
            // console.log(this.state)
            // debugger
            return this.state.report.map((item, index) =>
                    <li key={index} data-id={item.id} onDragEnter={this.ondragenter.bind(this)} onDragOver={this.ondragover.bind(this)} onDragLeave={this.ondragleave.bind(this)} onDrop={this.ondrop.bind(this)} onDragEnd={this.ondragend.bind(this)}>
                        <img src={'http://119.90.61.155/om33/' + item.imagepath} alt=""/>
                        <div className="des">
                            <div className="text">
                                <span className="name">{item.reportName}</span>
                                <span className="date">{item.updateTime}</span>
                            </div>
                            <span className="status">1</span>
                        </div>
                    </li>
            )
        }
        return (
                
        <div className="briefing" ref>
            <div className="title">
                <h3>我的报告</h3>
                <i><Icon  type="up" onClick={this.hide.bind(this)}></Icon></i>
            </div>
            <div className="content">
                <ul>
                    
                    {reportList()}
                    {/* <li>
                        <img src="" alt=""/>
                        <div className="des">
                            <div className="text">
                                <span className="name">名字名字名字</span>
                                <span className="date">时间时间</span>
                            </div>
                            <span className="status">1</span>
                        </div>
                    </li> */}

                </ul>
            </div>
        </div>
        )
    }
}

export default Briefing
