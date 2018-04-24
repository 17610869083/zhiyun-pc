import React from 'react';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import './NewestWarningOpinionBox.less';
import { Tabs } from 'antd';
import {history} from '../../utils/history';
const TabPane = Tabs.TabPane;

class NagetiveOpinion extends React.Component {
    constructor() {
        super();
        this.state = {
            datetagType:'today'
        }
     }
    clickItemTitle(sid) {
        window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
    }

    goAllOpinion() {
        history.push({
            pathname: '/allopinion?datetag='+this.state.datetagType +'&neg=2'
        });
    }
    datetagType(key){
        let datetag = {
            '1': 'today',
            '2':'yestoday',
            '3':'7day'
         }
         this.setState({
             datetagType:datetag[key]
         })
    }
    render() {
        const {todayOpinion,yesterdayOpinion,beforeYesterdayOpinion} = this.props;
        return (
            <div className="newest-warning-opinion-box">
                <div className="container">
                    <div className="top">
                        <div className="title">
                            <IconFont type="icon-shandian" style={{color: '#ffab00',fontSize: '18px'}}/>
                            <span className="txt">预警舆情</span>
                        </div>
                        <div className="more">
                            <span onClick={this.goAllOpinion.bind(this)}>更多 </span>
                            <IconFont type="icon-gengduo" style={{color: '#9b9b9b',fontSize: '14px'}}/>
                        </div>
                    </div>
                    <div className="bottom">
                        <Tabs defaultActiveKey="1" onChange={this.datetagType.bind(this)}>
                            <TabPane tab="24小时" key="1">
                                <ul className="list">
                                    {todayOpinion.length > 0 ?
                                        todayOpinion.map((item,index) =>
                                            <li key={item.sid} className="list-item" onClick={this.clickItemTitle.bind(this,item.sid)}>
                                                <div className="negative">
                                                    {index < 3 ? <IconFont type="icon-shandian" style={{color: '#ffab00',fontSize: '20px'}}/> :
                                                        <IconFont type="icon-shandian" style={{color: '#d8d8d8',fontSize: '20px'}}/>
                                                    }
                                                </div>
                                                <div className="title">{item.title}</div>
                                                <div className="source">{item.source}</div>
                                                <div className="time">{item.pubdate.substring(10)}</div>
                                            </li>
                                        ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/warnsetting">添加</a>关键词</span>'/>
                                    }
                                </ul>
                            </TabPane>
                            <TabPane tab="昨天" key="2">
                                <ul className="list">
                                    {yesterdayOpinion.length > 0 ?
                                        yesterdayOpinion.map((item,index) =>
                                            <li key={item.sid} className="list-item" onClick={this.clickItemTitle.bind(this,item.sid)}>
                                                <div className="negative">
                                                    {index < 3 ? <IconFont type="icon-shandian" style={{color: '#ffab00',fontSize: '20px'}}/> :
                                                        <IconFont type="icon-shandian" style={{color: '#d8d8d8',fontSize: '20px'}}/>
                                                    }
                                                </div>
                                                <div className="title">{item.title}</div>
                                                <div className="source">{item.source}</div>
                                                <div className="time">{item.pubdate.substring(10)}</div>
                                            </li>
                                        ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/warnsetting">添加</a>关键词</span>'/>
                                    }
                                </ul>
                            </TabPane>
                            <TabPane tab="前天" key="3">
                                <ul className="list">
                                    {beforeYesterdayOpinion.length ?
                                        beforeYesterdayOpinion.map((item,index) =>
                                            <li key={item.sid} className="list-item" onClick={this.clickItemTitle.bind(this,item.sid)}>
                                                <div className="negative">
                                                    {index < 3 ? <IconFont type="icon-shandian" style={{color: '#ffab00',fontSize: '20px'}}/> :
                                                        <IconFont type="icon-shandian" style={{color: '#d8d8d8',fontSize: '20px'}}/>
                                                    }
                                                </div>
                                                <div className="title">{item.title}</div>
                                                <div className="source">{item.source}</div>
                                                <div className="time">{item.pubdate.substring(10)}</div>
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

export default NagetiveOpinion;
