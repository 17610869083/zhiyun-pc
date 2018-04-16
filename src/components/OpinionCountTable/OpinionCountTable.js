import React from 'react';
import newestOpinionImg from '../../assets/home-img/count.png';
import './OpinionCountTable.less';

const OpinionCountTable = ((props) => {
    return (
        <div className="opinion-count-table">
            <div className="box-top">
                <img src={newestOpinionImg} className="icon" alt="logo"/>
                <span className="name">舆情统计</span>
            </div>
            <div className="box-bottom">
                <table className="count-table">
                    <tbody>
                    {props.data.map((item, index) =>
                        <tr key={index} className="item">
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                            <td>{item[4]}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
});

export default OpinionCountTable;