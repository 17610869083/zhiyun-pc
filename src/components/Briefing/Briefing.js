import React from 'react'
import {Icon, message} from 'antd'
import IconFont from '../IconFont';
import './Briefing.less'
import request from '../../utils/request'
import {
    api_briefing_list,
    api_briefing_add
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
        // console.log(res.data.data)
            if(res.data.code == 1) {
                this.setState({
                    report: res.data.data
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
        this.props.onCancel()
    }
    ondragenter(e) {
        // e.stopImmediatePropagation();
    //     function domToString (node) { 
    //         // debugger
    //         let tmpNode = document.createElement('div')
    //         tmpNode.appendChild(node) 
    //         let str = tmpNode.innerHTML
    //         // tmpNode = cnode = null; // 解除引用，以便于垃圾回收  
    //         return str;
    //    }
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        Array.from(e.currentTarget.parentNode.children).forEach(item => {
            item.className = ''
        });
        e.currentTarget.className = 'active'
    }
    ondragleave(e) {
        if(e.relatedTarget.tagName !== 'IMG' && e.relatedTarget.tagName !== 'LI'  && e.relatedTarget.tagName !== 'SPAN'  && e.relatedTarget.tagName !== 'UL'  && e.relatedTarget.tagName !== 'LI'){
            Array.from(e.currentTarget.parentNode.children).forEach(item => {
                item.className = ''
            });
        }
    }
    ondrop(e) {
        if(e.dataTransfer.getData( 'a' ) === 'drop') {
            let reportId = e.currentTarget.getAttribute('data-id'), sids = e.dataTransfer.getData( 'briefingsid' )
            // console.log( e.dataTransfer.getData( 'a' ), e.target.getAttribute('data-id'))
            if(sids.indexOf(',') === -1) {
                sids = JSON.stringify(Array(sids))
            }else {
                sids = JSON.stringify(sids.split(','))
            }
            e.currentTarget.className = ''
            request(api_briefing_add + `&reportId=${reportId}&sids=${sids}`).then((res) => {
                
                switch (res.data.code) {
                    case '0':
                        message.error(res.data.msg)
                        break;
                    case '1':
                        message.error(res.data.msg)
                        break;
                    case '2':
                        message.success(res.data.msg)
                        break;
                    case '3':
                        message.warning(res.data.msg)
                        break;
                    default:
                        message.success(res.data.msg)
                        break;
                }
            })
        }else {
            message.error('拖动无效')
        }
        
    }
    ondragend(e) {
        e.preventDefault();
    }
    ondragover(e) {
        e.preventDefault();
    }
    statusicon(status) {
        switch (status) {
            case '0':
                return <IconFont type="icon-weiwancheng"></IconFont>
            case '1':
                return <IconFont type="icon-zanshi"></IconFont>
            case '2':
                return <IconFont type="icon-duihao"></IconFont>
        }
    }
    render() {
        const reportList = () => {
            return this.state.report.length === 0 ? <h4>没有数据</h4> : this.state.report.map((item, index) =>
                    <li key={index} data-id={item.id} onDragEnter={this.ondragenter.bind(this)} onDragOver={this.ondragover.bind(this)} onDragLeave={this.ondragleave.bind(this)} onDrop={this.ondrop.bind(this)} onDragEnd={this.ondragend.bind(this)}>
                        <img src={ './../' + item.imagepath} alt="" draggable="false" />
                        <div className="des">
                            <div className="text">
                                <span className="name">{item.reportName}</span>
                                <span className="date">{item.updateTime}</span>
                            </div>
                            <span className="status">{this.statusicon(item.status)}</span>
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
