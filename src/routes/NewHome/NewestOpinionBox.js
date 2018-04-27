import React from 'react';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import {history} from '../../utils/history';
import './NewestOpinionBox.less';
import { Icon } from 'antd';
// import { setInterval ,clearInterval} from 'timers';
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
        // history.push({
        //     pathname:`/detail/${sid}`
        // });
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
        const {bgColor} = this.state;
        const {opinionList} = this.props;
        const more = this.props.status!=='setting'?<span onClick={this.goAllOpinion.bind(this)}>更多
        <IconFont type="icon-gengduo" style={{color: '#9b9b9b',fontSize: '14px'}}/>
        </span>:<Icon type="close-circle" className="delModule" style={{fontSize: '18px'}}
        onClick={this.delNewestOpinionBox.bind(this)}
        ></Icon>;
        return (
            <div className="newest-opinion-box">
                <div className="container">
                    <div className="top">
                        <div className="title">
                            <IconFont type="icon-new" style={{fontSize: '18px'}}/>
                            <span className="txt">最新舆情</span>
                        </div>
                        <div className="more">
                            {more}
                        </div>
                    </div>
                    <div className="bottom"
                        //  onMouseEnter={this.clearIntervalTime.bind(this)}
                        //  onMouseLeave={this.setIntervalTime.bind(this)}
                    >
                    <ul className="list"
                    >
                    {/* <Carousel vertical
                            autoplay={true}
                            dots={false}
                            className="list" >  */}
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
                       {/* </Carousel> */}
                       </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewestOpinionBox;
