import React from 'react';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import { Tabs ,Icon} from 'antd';
import './TopicOpinionBox.less';
import {history} from '../../utils/history';
import {connect} from 'react-redux';
import {setlocationPathname} from '../../redux/actions/createActions';
import request from '../../utils/request';
import {api_main_topic_opinion} from '../../services/api';
import {GRAY,BLACK,BLUES} from '../../utils/colors';
const TabPane = Tabs.TabPane;

class TopicOpinionBox extends React.PureComponent {
    constructor(){
        super();
        this.state={
            topicid:0,
            topicOpinion:[]
        }
    }
    clickItemTitle(sid) {
        window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
    }
    goTopicOpinion() {
        this.props.setlocationPathname(this.state.topicid)
        history.push({
            pathname: '/topic/topiclist'
        });
    }
    delTopicOpinionBox(){
         this.props.delTopicBox(1);
    }
    componentWillMount(){
        request(api_main_topic_opinion)
        .then(res => {
              this.setState({
                topicid:res.data.topic_0.topicid ,
                topicOpinion:Object.values(res.data)            
              })
        })
    }
    tabClick(key){
         this.setState({
            topicid:parseInt(key,10)
         })
    }
    render() {  
         const {topicOpinion} = this.state;
        const more = this.props.status!=='setting'?<span style={{color:BLACK}} onClick={this.goTopicOpinion.bind(this)}>更多
        <IconFont type="icon-jiantou" style={{color: '#9b9b9b',fontSize: '16px',marginLeft:'6px'}}/>
        </span>:<Icon type="close-circle" className="delModule" style={{fontSize: '18px',color:BLUES}}
        onClick={this.delTopicOpinionBox.bind(this)}
        ></Icon>;
        return (
            <div className="topic-opinion-box">
                <div className="container">
                    <div className="top" style={{background:GRAY}}>
                        <div className="title">
                            <IconFont type="icon-tesezhuanti" style={{color: BLUES,fontSize: '18px'}}/>
                            <span className="txt" style={{color:BLACK}}>专题舆情</span>
                        </div>
                        <div className="more">
                              {more}
                        </div>
                    </div>
                    <div className="bottom">
                        <Tabs defaultActiveKey="0" onChange={this.tabClick.bind(this)}>
                            {
                                topicOpinion.length!==0?topicOpinion.map((item,index) =>
                                    <TabPane tab={item.topicname} key={item.topicid}>
                                        <ul className="list">
                                            {item.docList!==undefined ?
                                                item.docList.slice(0,6).map((i,index) =>
                                                    <li key={i.sid} className="list-item" onClick={this.clickItemTitle.bind(this,i.sid)}>
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
                                ):''
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setlocationPathname: req => {
            dispatch(setlocationPathname(req));
        }
    }
}
export default connect(null,mapDispatchToProps)(TopicOpinionBox);
