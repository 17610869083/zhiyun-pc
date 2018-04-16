import React from 'react';
import { history } from '../../utils/history';
import './TopicOpinionBox.less';
import newestImg from '../../assets/home-img/topic.png';
import request from '../../utils/request';
import {Spin} from 'antd';
import {api_topic_opinion,api_topic_News} from '../../services/api';
export default class OpinionBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showIndex: 0,
            id: 1587,
            listValues: [],
            topicOpinionData:[]
        }
    }

    changeShowIndex(index, id) {
        this.setState({
            showIndex: index,
            id: id
        },()=>{
            request(api_topic_News+'&topicid=' + this.state.id, {})
            .then(res => {
                if(res.data.doclist){
                this.setState({
                    listValues: res.data.doclist
                })
            }
            })
        });
        }

    clickItemTitle(sid) {
        history.push(`/detail/${sid}`);
    }
componentDidMount() {

// 专题舆情
  request(api_topic_opinion)
          .then((res) => {
        if(res.data){
         this.setState({
           topicOpinionData: res.data.slice(0, 5),
           id:res.data[0].id
            });
         }
          });
        request(api_topic_News+'&topicid=' + this.state.id, {})
            .then(res => {
                this.setState({
                    listValues: res.data.doclist
                })
            });
    }
    render() {
        const listTypes = this.state.topicOpinionData.map((item, index) =>
            <li className={this.state.showIndex === index ? "type-item-active": "type-item"} key={index} onClick={this.changeShowIndex.bind(this, index, item.id)}>{item.topicname}</li>
        );

        const list = this.state.listValues.slice(0, 6);
        const listValues = list.map((item, index) =>
                    <li key={index} className="values-item">
                        <span className="title" onClick={this.clickItemTitle.bind(this, item.sid)}>{item.title}</span>
                        <span className="pubdate">{item.pubdate}</span>
                    </li>
        );

        return (
            <div className="topic-opinion-box">
                <div className="box-top">
                    <img src={newestImg} className="icon" alt="logo"/>
                    <span className="name">专题舆情</span>
                </div>
                <div className="box-bottom">
                    <ul className="list-types">
                        {listTypes}
                    </ul>
                    <div className="list-values">
                        <ul style={{display: 'block'}}>
                            {this.state.listValues ? listValues : Spin}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}