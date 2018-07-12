import React from 'react';
import {connect} from 'react-redux';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import './WeiboOpinionBox.less';
import { Tabs ,Icon} from 'antd';
import {history} from '../../utils/history';
import {GRAY,BLACK,BLUES} from '../../utils/colors';
const TabPane = Tabs.TabPane;

class WeiboOpinionBox extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            datetagType:'all'
        }
     }
    clickItemTitle(sid) {
        window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
    }
    goAllOpinion() {
        history.push({
            pathname: '/allopinion?carry=weibo&neg='+this.state.datetagType
        });
    }
    datetagType(key){
        let datetag = {
            '1': 'all',
            '2':'1'
         }
         this.setState({
            datetagType:datetag[key]
         })
    }
    delWeiboOpinionBox(){
        this.props.delWeiboBox(1);
    }
    render() {
        const {weiboAll,weiboNegative,themeColor} = this.props;
        const more = this.props.status!=='setting'?<span style={{color:BLACK}}  onClick={this.goAllOpinion.bind(this)}>更多
        <IconFont type="icon-jiantou" style={{color: '#9b9b9b',fontSize: '16px',marginLeft:'6px'}}/>
        </span>:<Icon type="close-circle" className="delModule" style={{fontSize: '18px',color:BLUES}}
        onClick={this.delWeiboOpinionBox.bind(this)}
        ></Icon>;
        return (
            <div className="weibo-opinion-box" style={{background:themeColor.bottomColor.backgroundColor}}>
                <div className="container">
                    <div className="top" style={{borderBottom: `1px solid ${themeColor.borderColor.color}`}}>
                        <div className="title">
                            <IconFont type="icon-weibo1" style={{fontSize: '20px'}}/>
                            <span className="txt" style={{color:BLACK}}>微博舆情</span>
                            {/* <span className="txt" style={{color:BLACK}}>微博信息</span> */}
                        </div>
                        <div className="more">
                               {more}
                        </div>
                    </div>
                    <div className="bottom">
                        <Tabs defaultActiveKey="1" onChange={this.datetagType.bind(this)}
                         size='large'
                        >
                            <TabPane tab="全部" key="1">
                                <ul className="list">
                                    {weiboAll !=='[]'&&weiboAll.length!==0 ?
                                        weiboAll.map((item,index) =>
                                            <li key={index} className="list-item" onClick={this.clickItemTitle.bind(this,item.sid)}
                                            style={{borderBottom: `1px solid ${themeColor.borderColor.color}`}}
                                            >
                                                <div className="content">
                                                    <div className="title">{item.title}</div>
                                                    <div className="desc">
                                                        <span className="time">{item.pubdate.substring(10)}</span>
                                                        <span className="source">{item.source}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/warnsetting">添加</a>关键词</span>'/>
                                    }
                                </ul>
                            </TabPane>
                            <TabPane tab="负面" key="2">
                            {/* <TabPane tab="重点" key="2"> */}
                                <ul className="list">
                                    {weiboNegative !=='[]'&& weiboNegative.length!==0 ?
                                        weiboNegative.map((item,index) =>
                                            <li key={index} className="list-item" onClick={this.clickItemTitle.bind(this,item.sid)}>
                                                <div className="content">
                                                    <div className="title">{item.title}</div>
                                                    <div className="desc">
                                                        <span className="time">{item.pubdate.substring(10)}</span>
                                                        <span className="source">{item.source}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/warnsetting">添加</a>关键词</span>'/>
                                    }
                                </ul>
                            </TabPane>
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
export default  connect(mapStateToProps, null)(WeiboOpinionBox);