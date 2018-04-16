import React from 'react';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import {history} from '../../utils/history';
import './OpinionCountBox.less';

class OpinionCountBox extends React.PureComponent {

    goAllOpinion() {
        history.push({
            pathname: '/allopinion?datetag=all'
        });
    }

    render() {
        const {data} = this.props;

        return (
            <div className="opinion-count-box">
                <div className="container">
                    <div className="top">
                        <div className="title">
                            <IconFont type="icon-tongji" style={{fontSize: '18px'}}/>
                            <span className="txt">舆情统计</span>
                        </div>
                        <div className="more">
                            <span onClick={this.goAllOpinion.bind(this)}>更多 </span>
                            <IconFont type="icon-gengduo" style={{color: '#9b9b9b',fontSize: '14px'}}/>
                        </div>
                    </div>
                    <div className="bottom">
                        <table className="count-table">
                            <tbody>
                            {data.length > 1 ?
                                data.map((item, index) =>
                                <tr key={index} className="item">
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                    <td>{item[4]}</td>
                                </tr>) : <tr><td><BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/sortedopinion/addrule">添加</a>关键词</span>'/></td></tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default OpinionCountBox;