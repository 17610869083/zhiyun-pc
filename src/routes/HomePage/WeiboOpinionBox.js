import React from 'react';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import './WeiboOpinionBox.less';
import { Tabs } from 'antd';
import {history} from '../../utils/history';
const TabPane = Tabs.TabPane;

class WeiboOpinionBox extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            datetagType:'all'
        }
     }
    clickItemTitle(sid) {
        window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
    }
    goAllOpinion() {
        history.push({
            pathname: '/allopinion?carry=weibo&neg='+this.state.datetagType
        });
    }
    datetagType(key){
        let datetag = {
            '1': 'all',
            '2':'1'
         }
         this.setState({
            datetagType:datetag[key]
         })
    }
    render() {
        const {weiboAll,weiboNegative} = this.props;
        return (
            <div className="weibo-opinion-box">
                <div className="container">
                    <div className="top">
                        <div className="title">
                            <IconFont type="icon-weibo1" style={{fontSize: '18px'}}/>
                            <span className="txt">微博舆情</span>
                        </div>
                        <div className="more">
                            <span onClick={this.goAllOpinion.bind(this)}>更多 </span>
                            <IconFont type="icon-gengduo" style={{color: '#9b9b9b',fontSize: '14px'}}/>
                        </div>
                    </div>
                    <div className="bottom">
                        <Tabs defaultActiveKey="1" onChange={this.datetagType.bind(this)}>
                            <TabPane tab="全部" key="1">
                                <ul className="list">
                                    {weiboAll ?
                                        weiboAll.map(item =>
                                            <li key={item.sid} className="list-item" onClick={this.clickItemTitle.bind(this,item.sid)}>
                                                <div className="negative">
                                                    {
                                                        item.negative === 1 ? <IconFont type="icon-sina" style={{color: '#f40000',fontSize: '20px'}}/> :
                                                            <IconFont type="icon-weibo1" style={{color: '#007aff',fontSize: '20px'}}/>
                                                    }
                                                </div>
                                                <div className="content">
                                                    <div className="title">{item.title}</div>
                                                    <div className="desc">
                                                        <span className="time">{item.pubdate.substring(10)}</span>
                                                        <span className="source">{item.source}</span>
                                                    </div>
                                                </div>
                                                <div className="new">
                                                    <IconFont type="icon-xin" style={{color: '#f40000',fontSize: '20px'}}/>
                                                </div>
                                            </li>
                                        ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/warnsetting">添加</a>关键词</span>'/>
                                    }
                                </ul>
                            </TabPane>
                            <TabPane tab="负面" key="2">
                                <ul className="list">
                                    {weiboNegative ?
                                        weiboNegative.map(item =>
                                            <li key={item.sid} className="list-item" onClick={this.clickItemTitle.bind(this,item.sid)}>
                                                <div className="negative">
                                                    {
                                                        item.negative === 1 ? <IconFont type="icon-weibo1" style={{color: '#f40000',fontSize: '20px'}}/> :
                                                            <IconFont type="icon-sina" style={{color: '#007aff',fontSize: '20px'}}/>
                                                    }
                                                </div>
                                                <div className="content">
                                                    <div className="title">{item.title}</div>
                                                    <div className="desc">
                                                        <span className="time">{item.pubdate.substring(10)}</span>
                                                        <span className="source">{item.source}</span>
                                                    </div>
                                                </div>
                                                <div className="new">
                                                    <IconFont type="icon-xin" style={{color: '#f40000',fontSize: '20px'}}/>
                                                </div>
                                            </li>
                                        ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/warnsetting">添加</a>关键词</span>'/>
                                    }
                                </ul>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeiboOpinionBox;