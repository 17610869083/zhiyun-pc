import React from 'react';
import { history } from '../../utils/history';

import './OpinionBox.less';
import newestImg from '../../assets/home-img/warning.png';
import negativeImg from '../../assets/home-img/negative.png';
import peopleImg from '../../assets/home-img/people.png';
import weiboImg from '../../assets/home-img/weibo.png';


export default class OpinionBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showIndex: 0,
            disBlock: {display: 'block'},
            disNone: {display: 'none'},
            header: {
                newestOpinion: {
                    img: newestImg,
                    title: '最新预警舆情',
                    more:'更多'
                },
                newestNegativeOpinion: {
                    img: negativeImg,
                    title: '最新负面舆情',
                    more:''
                    
                },
                peopleOpinion: {
                    img: peopleImg,
                    title: '人物舆情',
                    more:''
                },
                weiboOpinion: {
                    img: weiboImg,
                    title: '微博舆情',
                    more:'更多'
                },
                topicOpinion: {
                    img: newestImg,
                    title: '专题舆情',
                    more:''
                }

            }
        }
    }

    changeShowIndex(index) {
        this.setState({
            showIndex: index
        });
    }

    clickItemTitle(sid) {
        console.log(sid);
        history.push(`/detail/${sid}`);
    }


    render() {
        const listTypes = this.props.newestKeys.map((item, index) =>
            <li className={this.state.showIndex === index ? "type-item-active": "type-item"} key={index} onClick={this.changeShowIndex.bind(this, index)}>{item}</li>
        );
        const listValues = this.props.newestValues.map((item, index) =>
            <ul key={index} style={this.state.showIndex === index ? this.state.disBlock : this.state.disNone}>
                {item.map((innerItem, innerIndex) =>
                    <li key={innerIndex} className="values-item" onClick={this.clickItemTitle.bind(this, innerItem.sid)}>
                        <span className="title">{innerItem.title}</span>
                        <span className="source">{innerItem.source}</span>
                        <span className="pubdate">{innerItem.pubdate}</span>
                    </li>)}
            </ul>
        );

        const header = this.state.header[this.props.header];
        return (
            <div className="opinion-box">
                <div className="box-top">
                    <img src={header.img} className="icon" alt="logo"/>
                    <span className="name">{header.title}</span>
                    <span className="more">{header.more}</span>
                </div>
                <div className="box-bottom">
                    <ul className="list-types">
                        {listTypes}
                    </ul>
                    <div className="list-values">
                        {listValues}
                    </div>
                </div>
            </div>
        )
    }
}