import React from 'react';
import {history} from '../../utils/history';
import newestOpinionImg from '../../assets/home-img/new.png';
import './NewestOpinionBox.less';


class NewestOpinionBox extends React.Component {

    clickItemTitle(sid) {
        console.log(sid);
        history.push(`/detail/${sid}`);
    }

    render() {
        return (
            <div className="newest-opinion-box">
                <div className="box-top">
                    <img src={newestOpinionImg} className="icon" alt="logo"/>
                    <span className="name">最新舆情</span>
                </div>
                <div className="box-bottom">
                    <ul className="list-values">
                        {this.props.newestOpinionData.map((innerItem, innerIndex) =>
                            <li key={innerIndex} className="values-item" onClick={this.clickItemTitle.bind(this, innerItem.sid)}>
                                <span className="title">{innerItem.title}</span>
                                <span className="source">{innerItem.source}</span>
                                <span className="pubdate">{innerItem.pubdate}</span>
                            </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}


export default NewestOpinionBox;