import React from 'react';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import {history} from '../../utils/history';
import './NewestOpinionBox.less';

class NewestOpinionBox extends React.Component {
    constructor() {
        super();
        this.state = {
            bgColor: ['#007aff', '#007aff', '#007aff', '#d8d8d8', '#d8d8d8', '#d8d8d8', '#d8d8d8', '#d8d8d8', '#d8d8d8']
        }
    }

    clickItemTitle(sid) {
        window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
        // history.push({
        //     pathname:`/detail/${sid}`
        // });
    }

    goAllOpinion() {
        history.push({
            pathname: '/allopinion?datetag=today'
        });
    }

    render() {
        const {bgColor} = this.state;
        const {opinionList} = this.props;
        return (
            <div className="newest-opinion-box">
                <div className="container">
                    <div className="top">
                        <div className="title">
                            <IconFont type="icon-new" style={{fontSize: '18px'}}/>
                            <span className="txt">最新舆情</span>
                        </div>
                        <div className="more">
                            <span onClick={this.goAllOpinion.bind(this)}>更多 </span>
                            <IconFont type="icon-gengduo" style={{color: '#9b9b9b',fontSize: '14px'}}/>
                        </div>
                    </div>
                    <div className="bottom">
                        <ul className="list">
                        {opinionList.length > 0 ?
                            opinionList.map((item,index) =>
                                <li className="opinion-item" key={item.sid} onClick={this.clickItemTitle.bind(this,item.sid)}>
                                    <div className="index">
                                        <div className="number" style={{backgroundColor: bgColor[index]}}>{index+1}</div>
                                    </div>
                                    <div className="content">
                                        <div className="title">{item.title}</div>
                                        <div className="desc">
                                            <span className="time">{item.pubdate.substring(10)}</span>
                                            <span className="source">{item.source}</span>
                                        </div>
                                    </div>
                                </li>
                            ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/sortedopinion/addrule">添加</a>关键词</span>'/>
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewestOpinionBox;