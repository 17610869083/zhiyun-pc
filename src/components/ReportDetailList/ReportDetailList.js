import React from 'react';
import './ReportDetailList.less';
import '../OpinionDetail/OpinionDetail.less';
import {Checkbox,Tooltip,Spin} from 'antd';
import {opinionTrend,opinionColor,setHighlightTags} from '../../utils/format';
import request from '../../utils/request';
import weixin from '../../assets/icon-img/weixin.png';
import news from '../../assets/icon-img/news.png';
import weibo from '../../assets/icon-img/weibo.png';
import talk from '../../assets/icon-img/talk.png';
import video from '../../assets/icon-img/video.png';
import all from '../../assets/icon-img/other.png';
import media from '../../assets/icon-img/new.png';
import boke from '../../assets/icon-img/boke.png';
import app from '../../assets/icon-img/app.png';
import twitter from '../../assets/icon-img/twitter.png';
class ReportDetailList extends React.Component{
    constructor(){
        super();
        this.state = {
            carryAll: {
              '新闻': news,
              '微博': weibo,
              '论坛': talk,
              '视频': video,
              '综合': all,
              '微信': weixin,
              '平媒': media,
              '博客': boke,
              'APP': app,
              'pjljkm': twitter
            }
        }
    }

    //下拉加载
    loading(e){
    var bScrollH = e.target.scrollHeight; 
    if(e.target.scrollTop + 600 >= bScrollH){
      console.log(123)
        this.props.dropDown();
      }
    }

    //单选
    onChangeItem(index,sid,e){
        const checkedArray = this.props.checkedArray;
        let num = this.props.checkedArray.length === 20? 0:this.props.checkedArray.length;
        if(e.target.checked){
          checkedArray[num+index] = sid;
        }else{
          checkedArray[checkedArray.indexOf(sid)] = false;
        }
        this.props.checkItem(checkedArray);
    }
    //跳转详情页
    clickItemTitle(){

    }
    render(){
        const {type} = this.props; 
        const list = this.props.docList.map( (item,index) => {
            return <li key={index} className="opinion-detail-item">
             <div className="cheackBox">
               <Checkbox checked={this.props.checkedArray.indexOf(item.sid)!==-1}
                         onChange={this.onChangeItem.bind(this,index,item.sid)}
                         className="opinionCheack"
               />
             </div>
             <div className="iconBox">
               <div className="negative">
                 <div className="inner-type" style={opinionColor(item.negative)}>
                   {opinionTrend(item.negative)}
                 </div>
               </div>
               <div className="imgBox">
                 <Tooltip title={item.carry === '综合' ? '其它' : item.carry} placement="bottomRight">
                   <img src={this.state.carryAll[item.carry]} alt="" className="carryImg"/>
                 </Tooltip>
               </div>
             </div>
             <div className="content">
               <div className="item-top">
                 <div className="title"
                      title={item.title}
                      onClick={this.clickItemTitle.bind(this, item.sid)}
                 >
                 {item.title && item.title.length > 35 ? item.title.slice(0, 35) + '...' : item.title} 
                 </div>
               </div>
               <div className="item-middle">
                 <div className="left">
                   <div>
                      {/* { type === 'report' ?<span className="summary" dangerouslySetInnerHTML={{__html: setHighlightTags(item.summary, item.keywords.split(' '))}}></span> 
                      :<span className="summary" >{item.docsummary}</span>} */}
                   </div>
                 </div>
               </div>
               <div className="item-bottom">
                 <div className="item-left">
                   <div className="key">
                     <div className="pubdate">
                       {/* <span className="date">{item.pubdate.split(' ')[0]} &nbsp;&nbsp;{item.pubdate.split(' ')[1]}</span> */}
                     </div>
                     {type==='report'? <div className="similar-info">相似信息：{item.similerInfo && (item.similerInfo.similerCount ? item.similerInfo.similerCount : 0)}条
                     </div>:null}
                     <div className="resource">
                       <a href={item.url} target="_black">
                         <span className="source" title={item.source}>{item.source}</span>
                       </a>
                     </div>
                     <div className="title">关键词：</div>
                     <div className='keywords'>
                       {type==='report'?item.nztags:item.dockeywords}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </li>
          })
        return(
            <ul className="opinion-detail-wrapper drop-down" onScroll={this.loading.bind(this)}>
            {list}
            <li style={this.props.flag ? {display:'flex',justifyContent:'center'}:{display:'none'}}>
            <Spin tip="loading"/>
            </li>
            </ul>
        )
    }
}

export default ReportDetailList;