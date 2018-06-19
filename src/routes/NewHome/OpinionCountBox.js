import React from 'react';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import {history} from '../../utils/history';
import {Icon} from 'antd';
import './OpinionCountBox.less';
import {GRAY,BLACK,BLUES} from '../../utils/colors';

class OpinionCountBox extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            mediaList:{
                'APP':'app',
                '博客':'blog',
                '平媒':'medium',
                '微信':'wechat',
                '微博':'weibo',
                '新闻':'news',
                '论坛':'forum'
            }
        }
    }
    goAllOpinion() {
        history.push({
            pathname: '/allopinion?datetag=all'
        });
    }
    delOpinionCountBox(){
        this.props.delCountBox(1);
    }
    goMedia(media,day){
      history.push({
        pathname: `/allopinion?media=${this.state.mediaList[media]}&datetag=${day}`
    });
    }
    render() {
        const {data} = this.props;
        const more = this.props.status!=='setting'?<span style={{color:BLACK}} onClick={this.goAllOpinion.bind(this)}>更多 
        <IconFont type="icon-jiantou" style={{color: '#9b9b9b',fontSize: '16px',marginLeft:'6px'}}/>
        </span>:<Icon type="close-circle" className="delModule" style={{fontSize: '18px',color:BLUES}}
        onClick={this.delOpinionCountBox.bind(this)}
        ></Icon>;
        return (
            <div className="opinion-count-box">
                <div className="container">
                    <div className="top" style={{background:GRAY}}>
                        <div className="title">
                            <IconFont type="icon-tongji" style={{fontSize: '28px',color:BLUES,verticalAlign:'-8px'}}/>
                            <span className="txt" style={{color:BLACK}}>舆情统计</span>
                            {/* <span className="txt" style={{color:BLACK}}>信息统计</span> */}
                        </div>
                        <div className="more">
                              {more}
                        </div>
                    </div>
                    <div className="bottom">
                        <table className="count-table">
                            <tbody>
                            {data.length > 1 ?
                                data.map((item, index) =>
                                <tr key={index} className="item">
                                    <td>{item[0]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer'}} onClick = {this.goMedia.bind(this,item[0],'today')}>{item[1]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer'}} onClick = {this.goMedia.bind(this,item[0],'7day')}>{item[2]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer'}} onClick = {this.goMedia.bind(this,item[0],'30day')}>{item[3]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer'}} onClick = {this.goMedia.bind(this,item[0],'all')}>{item[4]}</td>
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