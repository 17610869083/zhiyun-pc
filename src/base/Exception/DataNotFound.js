import React from 'react';
import alone from './../../assets/icon-img/alone.png';
import './DataNotFound.less';
export default function () {
    return (
        <div className="DataNotFound">
            <img src={alone} />
            <h2>暂无数据！</h2>
        </div>
    )
}