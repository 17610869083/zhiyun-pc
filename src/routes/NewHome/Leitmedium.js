import React from 'react';
import {connect} from 'react-redux';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import './NegativeOpinion.less';
import { Tabs,Icon } from 'antd';
import {history} from '../../utils/history';
import {BLUES} from '../../utils/colors';
const TabPane = Tabs.TabPane;
class Leitmedium extends React.Component {
    constructor() {
        super();
        this.state = {
            sources:0
        }
    }
    clickItemTitle(sid) {
        window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
    }
    goAllOpinion() {
        history.push({
            pathname: '/allopinion/allopiniondetail?sources='+this.state.sources
        });
    }
    tabChange(key){
         this.setState({
            sources:key
         })  
    }

    render() {
        const {data,themeColor} = this.props;
        const more = this.props.status!=='setting'?<span onClick={this.goAllOpinion.bind(this)}>
         <IconFont type="icon-gengduo" style={{color: '#9b9b9b',fontSize: '16px',marginLeft:'6px'}}/>
        </span>:<Icon type="close-circle" className="delModule" style={{fontSize: '18px',color:BLUES}}></Icon>;
        const haverClass = themeColor.topColor.backgroundColor === '#5a8bff' ? 'white':'black';
        const blankFlag = themeColor.topColor.backgroundColor === '#5a8bff' ? true:false;
        return (
            <div className="negative-opinion-box" style={{background:themeColor.bottomColor.backgroundColor}}>
                <div className="container">
                    <div className="top" style={{borderBottom: `1px solid ${themeColor.borderColor.color}`}}>
                        <div className="title">
                            <IconFont type="icon-fumianxinxi" style={{fontSize: '20px',color:BLUES}}/>
                            <span className="txt" style={{color:themeColor.textColor.color}}>负面舆情</span>
                            {/* <span className="txt" style={{color:BLACK}}>重点信息</span> */}
                        </div>
                        <div className="more">
                             {more}
                        </div>
                    </div>
                    <div className="bottom">
                        <Tabs defaultActiveKey="1" onChange={this.tabChange.bind(this)} tabBarStyle={{color:themeColor.textColor.color,borderBottom:`1px solid ${themeColor.borderColor.color}`}}> 
                            { data.map((item,index) => {
                               return <TabPane tab={Object.keys(item)[1]} key={index}>
                                <ul className="list">
                                    {item[Object.keys(item)[1]].length!==0?
                                        item[Object.keys(item)[1]].map((i,index) =>
                                            <li key={i.sid} className={`list-item ${haverClass}`} onClick={this.clickItemTitle.bind(this,i.sid)}
                                            >
                                                <div className="content">
                                                    <div className="title" style={{color:themeColor.textColor.color}}>{i.title}</div>
                                                    <div className="desc">
                                                        <span className="time">{i.pubdate.substring(10)}</span>
                                                        <span className="source">{i.source}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/allopinion/focus">添加</a>关键词</span>'/>
                                    }
                                </ul>
                            </TabPane>
                            })
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      themeColor: state.changeThemeReducer
    }
  };
export default  connect(mapStateToProps, null)(Leitmedium);