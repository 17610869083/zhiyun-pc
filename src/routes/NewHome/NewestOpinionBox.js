import React from 'react';
import {connect} from 'react-redux';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import {history} from '../../utils/history';
import './NewestOpinionBox.less';
import { Icon } from 'antd';
import {GRAY,BLACK,BLUES} from '../../utils/colors';
class NewestOpinionBox extends React.Component {
    constructor() {
        super();
        this.state = {
            bgColor: ['#007aff', '#007aff', '#007aff', '#d8d8d8', '#d8d8d8', '#d8d8d8', '#d8d8d8', '#d8d8d8', '#d8d8d8'],
            opinionList:[1,2,3],
            mouseover:0
        }
    }

    clickItemTitle(sid) {
        window.open(window.location.origin + window.location.pathname + '#/detail/' + sid);
    }

    goAllOpinion() {
        history.push({
            pathname: '/allopinion?datetag=today'
        });
    }
     delNewestOpinionBox(){
           this.props.delNewestBox(1);
     }
    render() {
        const {opinionList,themeColor} = this.props;
        const more = this.props.status!=='setting'?<span style={{color:BLACK}} onClick={this.goAllOpinion.bind(this)}>更多
        <IconFont type="icon-jiantou" style={{fontSize: '16px',color: '#9b9b9b',marginLeft:'6px'}}/>
        </span>:<Icon type="close-circle" className="delModule" style={{fontSize: '18px',color:BLUES}}
        onClick={this.delNewestOpinionBox.bind(this)}
        ></Icon>;
        return (
            <div className="newest-opinion-box" style={{background:themeColor.bottomColor.backgroundColor}}>
                <div className="container">
                    <div className="top" style={{borderBottom: `1px solid ${themeColor.borderColor.color}`}}>
                        <div className="title">
                            <IconFont type="icon-zuixin" style={{fontSize: '18px'}}/>
                            <span className="txt" style={{color:BLACK}}>最新舆情</span>
                            {/* <span className="txt" style={{color:BLACK}}>最新信息</span> */}
                        </div>
                        <div className="more">
                            {more}
                        </div>
                    </div>
                    <div className="bottom"
                    >
                    <ul className="list"
                    >
                        {opinionList.length > 0 ?
                            opinionList.map((item,index) =>
                                <li key={item.sid}>
                                <div className="opinion-item"  onClick={this.clickItemTitle.bind(this,item.sid)}
                                >
                                  <div className="content"> 
                                      <div className="title">{item.title}</div>
                                      <div className="desc">
                                          <span className="time">{item.pubdate.substring(10)}</span>
                                          <span className="source">{item.source}</span>
                                      </div>
                                  </div>
                                </div>
                                </li>
                            ) : <BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/sortedopinion/addrule">添加</a>关键词</span>'/>
                        }
                       </ul>
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
export default  connect(mapStateToProps, null)(NewestOpinionBox);
