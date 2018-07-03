import React from 'react';
import {Checkbox,Input,Button,Tooltip,Spin,Modal} from 'antd';
import './ModalReport.less';
import '../OpinionDetail/OpinionDetail.less';
import IconFont from '../IconFont';
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
import {opinionTrend,opinionColor,setHighlightTags} from '../../utils/format';
class ModalReport extends React.Component{
     constructor(){
         super();
         this.state = {
             docList:[],
             modalList:['全部','导读','总体论述'],
             checkedArray:new Array(20).fill(false),
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
              },
              page:1,
              flag:true,
              checkedAll:false,
              visible:false
         }
         
     }
     componentDidMount(){
        request('http://119.90.61.155/om31/webpart/main/DocSearchDo?action=docList')
        .then( res => {
              this.setState({
                docList:res.data.docList
              })
        })
     }
     //跳转详情页
     clickItemTitle(){

     }
     //下拉加载
     dropDown(e){
         var bScrollH = e.target.scrollHeight; 
         let _this = this;
         if(e.target.scrollTop + 600 >= bScrollH){
           this.setState({
               flag:true
           })
            request('http://119.90.61.155/om31/webpart/main/DocSearchDo?action=docList')
            .then( res => {
                 _this.setState({
                    docList:_this.state.docList.concat(res.data.docList),
                    page:_this.state.page+1,
                    flag:false,
                    checkedArray:_this.state.checkedArray.concat(new Array(20).fill(false))
                  })
            })
        }
     }
     //全选
     checkAll(e){
         this.setState({
           checkedArray:this.state.checkedArray.fill(e.target.checked),
           checkedAll:e.target.checked
         })
     }
     //单选
     onChangeItem(index,e){
         const checkedArray = this.state.checkedArray;
         checkedArray[index] = e.target.checked;
         this.setState({
            checkedArray:checkedArray
         })
     }
     //获取sid
     checkedTrue() {
      const arr = [];
      this.state.docList.forEach((item, index) => {
        if (this.state.checkedArray[index] === true && item.sid) {
          arr.push(item.sid);
        }
      });
      return arr;
      }
      //删除
      delete(){
          console.log(this.checkedTrue())
      }
      //确定按钮
      confirm = () => {
          this.setState({
            visible:true
          })
      }
      //关闭弹窗
      cancel = () => {
          this.setState({
            visible:false
          })
      }
     render(){
         const list = this.state.docList.map( (item,index) => {
           return <li key={index} className="opinion-detail-item">
            <div className="cheackBox">
              <Checkbox checked={this.state.checkedArray[index]}
                        onChange={this.onChangeItem.bind(this, index)}
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
                  {
                    (() => {
                      if (this.state.isSearch && this.state.seltype === 'title') {
                        return <span dangerouslySetInnerHTML={{__html: (item.title && item.title.length > 35) ? setHighlightTags(item.title.slice(0, 35), Array(this.state.searchInputValue).concat([''])) + '...' : setHighlightTags(item.title, Array(this.state.searchInputValue).concat(['']))}}></span>
                      } else {
                        return (item.title && item.title.length > 35) ? item.title.slice(0, 35) + '...' : item.title
                      }
                    })()
                  } 
                </div>
              </div>
              <div className="item-middle">
                <div className="left">
                  <div>
                     <span className="summary" dangerouslySetInnerHTML={{__html: setHighlightTags(item.summary, item.nztags.split(' '))}}></span>
                  </div>
                </div>
              </div>
              <div className="item-bottom">
                <div className="item-left">
                  <div className="key">
                    <div className="pubdate">
                      <span className="date">{item.pubdate.split(' ')[0]} &nbsp;&nbsp;{item.pubdate.split(' ')[1]}</span>
                    </div>
                    <div
                      className="similar-info">相似信息：{item.similerInfo && (item.similerInfo.similerCount ? item.similerInfo.similerCount : 0)}条
                    </div>
                    <div className="resource">
                      <a href={item.url} target="_black">
                        <span className="source" title={item.source}>{item.source}</span>
                      </a>
                    </div>
                    <div className="title">关键词：</div>
                    <div className={this.state.isSearch ? '' : 'keywords' }>
                      {item.nztags}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
         })
         const modalList = this.state.modalList.map((item,index) => {
             return <li key={index} className="modalName">
                    <Checkbox><span>{item}</span></Checkbox>
                    </li>
         })
         return (
             <div className="modal-report opinion-detail">
                 <div className="modal-top">
                    <div>
                    <Checkbox onChange={this.checkAll.bind(this)} checked={this.state.checkedAll}/>
                    <span>全选</span>
                    <i onClick={this.delete.bind(this)}><IconFont type="icon-shanchu1-copy-copy" style={{marginLeft:'16px'}}/></i>
                    <span style={{marginLeft:'36px'}}> 素材库</span>
                    <Input/>
                    </div>
                    <Button type="primary" onClick={this.confirm}>确定</Button>
                 </div> 
                 <div className="modal-list bottom">
                    <ul className="opinion-detail-wrapper drop-down" onScroll={this.dropDown.bind(this)}>
                        {list}
                        <li style={this.state.flag ? {display:'flex',justifyContent:'center'}:{display:'none'}}>
                        <Spin tip="loading"/>
                        </li>
                    </ul>
                 </div>  
                 <Modal visible={this.state.visible} footer={null} title='请选择数据放入的模块'
                 onCancel={this.cancel}>
                        <ul style={{padding:'0 140px'}}>
                          {modalList}
                        </ul>
                        <p style={{display:'flex',justifyContent:'center'}}>
                        <Button type="primary" onClick={this.cancel}>确定</Button>
                        </p>
                 </Modal>
             </div>
         )
     }
}


export default ModalReport;