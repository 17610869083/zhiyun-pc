import React from 'react';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import './NewestWarningOpinionBox.less';
import { Tabs,Icon } from 'antd';
import {history} from '../../utils/history';
import {GRAY,BLACK,BLUES} from '../../utils/colors';
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
    delNewestWarningOpinionBox(){
          this.props.delNewestWarningBox(1);
    }
    render() {
        const {todayOpinion,yesterdayOpinion,beforeYesterdayOpinion} = this.props;
        const more = this.props.status!=='setting'?<span style={{color:BLACK}} onClick={this.goAllOpinion.bind(this)}>更多
        <IconFont type="icon-jiantou" style={{color: '#9b9b9b',fontSize: '16px',marginLeft:'6px'}}/>
        </span>:<Icon type="close-circle" className="delModule" style={{fontSize: '18px',color:BLUES}}
        onClick={this.delNewestWarningOpinionBox.bind(this)}
        ></Icon>;
        return (
            <div className="newest-warning-opinion-box">
                <div className="container">
                    <div className="top" style={{background:GRAY}}>
                        <div className="title">
                            <IconFont type="icon-shandian" style={{color: BLUES,fontSize: '21px',verticalAlign:'-5px'}}/>
                            {/* <span className="txt" style={{color:BLACK}}>预警舆情</span> */}
                            <span className="txt" style={{color:BLACK}}>特推信息</span>
                        </div>
                        <div className="more">
                               {more}
                        </div>
                    </div>
                    <div className="bottom">
                        <Tabs defaultActiveKey="1" onChange={this.datetagType.bind(this)}>
                            <TabPane tab="24小时" key="1">
                                <ul className="list">
                                    {todayOpinion.length > 0 ?
                                        todayOpinion.map((item,index) =>
                                        <li key={index} className="list-item" onClick={this.clickItemTitle.bind(this,item.sid)}>
                                            <div className="content">
                                                <div className="title">{item.title}</div>
                                                <div className="desc">
                                                    <span className="time">{item.pubdate.substring(10)}</span>
                                                    <span className="source">{item.source}</span>
                                                </div>
                                            </div>
                                        </li>
                                        ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/warnsetting">添加</a>关键词</span>'/>
                                    }
                                </ul>
                            </TabPane>
                            <TabPane tab="昨天" key="2">
                                <ul className="list">
                                    {yesterdayOpinion.length > 0 ?
                                        yesterdayOpinion.map((item,index) =>
                                        <li key={index} className="list-item" onClick={this.clickItemTitle.bind(this,item.sid)}>
                                            <div className="content">
                                                <div className="title">{item.title}</div>
                                                <div className="desc">
                                                    <span className="time">{item.pubdate.substring(10)}</span>
                                                    <span className="source">{item.source}</span>
                                                </div>
                                            </div>
                                        </li>
                                        ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/warnsetting">添加</a>关键词</span>'/>
                                    }
                                </ul>
                            </TabPane>
                            <TabPane tab="前天" key="3">
                                <ul className="list">
                                    {beforeYesterdayOpinion.length ?
                                        beforeYesterdayOpinion.map((item,index) =>
                                        <li key={index} className="list-item" onClick={this.clickItemTitle.bind(this,item.sid)}>
                                            <div className="content">
                                                <div className="title">{item.title}</div>
                                                <div className="desc">
                                                    <span className="time">{item.pubdate.substring(10)}</span>
                                                    <span className="source">{item.source}</span>
                                                </div>
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

export default NagetiveOpinion;
