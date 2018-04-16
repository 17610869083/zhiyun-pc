import React from 'react';
import './TodayOpinion.less';

import todayImg from '../../assets/home-img/today.png';

export default function TodayOpinion(props) {
    return <div className="today-opinion">
        <div className="box-top">
            <div className="box-top">
                <img src={todayImg} className="icon" alt="logo"/>
                <span className="name">今日舆情</span>
            </div>
        </div>
        <div className="box-bottom">
            <ul className="yesterday">
                {props.yesterdayOpinion.map((item, index) =>
                    <li key={index}>
                        <span className="type">{item.type}</span>
                        <span className="count">{item.value}</span>
                    </li>
                )}
            </ul>
            <ul className="today">
                {props.todayOpinion.map((item, index) =>
                    <li key={index}>
                        <span className="type">{item.type}</span>
                        <span className="count">{item.value}</span>
                    </li>
                )}
            </ul>
        </div>
    </div>
}