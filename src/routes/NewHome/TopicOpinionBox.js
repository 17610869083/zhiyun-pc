import React from 'react';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import { Tabs ,Icon} from 'antd';
import './TopicOpinionBox.less';
import {history} from '../../utils/history';
const TabPane = Tabs.TabPane;

class TopicOpinionBox extends React.PureComponent {
    clickItemTitle(sid) {
        window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
    }
    goTopicOpinion() {
        history.push({
            pathname: '/topic/topiclist'
        });
    }
    delTopicOpinionBox(){
         this.props.delTopicBox(1);
    }
    render() {
        const {topicOpinion} = this.props;
        const more = this.props.status!=='setting'?<span onClick={this.goTopicOpinion.bind(this)}>更多 
        <IconFont type="icon-gengduo" style={{color: '#9b9b9b',fontSize: '14px'}}/>
        </span>:<Icon type="close-circle" className="delModule" style={{color: 'rgba(0,0,0,0.65)',fontSize: '18px'}}
        onClick={this.delTopicOpinionBox.bind(this)}
        ></Icon>;
        return (
            <div className="topic-opinion-box">
                <div className="container">
                    <div className="top">
                        <div className="title">
                            <IconFont type="icon-zhuanti1" style={{color: '#ffbc34',fontSize: '18px'}}/>
                            <span className="txt">专题舆情</span>
                        </div>
                        <div className="more">
                              {more}
                        </div>
                    </div>
                    <div className="bottom">
                        <Tabs defaultActiveKey="0">
                            {
                                topicOpinion.map((item,index) =>
                                    <TabPane tab={item.topicname} key={index}>
                                        <ul className="list">
                                            {item.docList!==undefined ?
                                                item.docList.slice(0,6).map((i,index) =>
                                                    <li key={i.sid} className="list-item" onClick={this.clickItemTitle.bind(this,i.sid)}>
                                                        <div className="negative">
                                                            {
                                                                index < 3 ? <IconFont type="icon-star" style={{color: '#ffbc34',fontSize: '18px'}}/> :
                                                                    <IconFont type="icon-star" style={{color: '#d8d8d8',fontSize: '20px'}}/>
                                                            }

                                                        </div>
                                                        <div className="content">
                                                            <div className="title">{i.title}</div>
                                                            <div className="desc">
                                                                <span className="time">{i.pubdate.substring(10)}</span>
                                                                <span className="source">{i.source}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/topic/addtopic">添加</a>关键词</span>'/>
                                            }
                                        </ul>
                                    </TabPane>
                                )
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopicOpinionBox;