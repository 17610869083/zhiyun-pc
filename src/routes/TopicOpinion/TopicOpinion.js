import React from 'react';
import {Icon, Menu,Modal,Input,Dropdown,message} from 'antd';
import { Route, Switch} from 'react-router-dom';
import {history} from '../../utils/history';
import TopicList from './TopicList/TopicList';
import TopicAdd from './TopicAdd/TopicAdd';
import TopicReport from './TopicReport/TopicReport';
import TopicCount from './TopicCount/TopicCount';
import TopicSetting from './TopicSetting/TopicSetting';
import TopicReportEcharts from './TopicReport/TopicReportEcharts';
import {api_topic_del,api_topic_typeAdd,api_topic_typeDel,api_classify_revise} from '../../services/api';
import request from '../../utils/request';
import './TopicOpinion.less';
import Iconfont from '../../components/IconFont';
import {setlocationPathname,getTopicLocationRequested,topicNavMessageRequested,searchState} from '../../redux/actions/createActions';
import {connect} from 'react-redux';
import { setTimeout } from 'timers';
import Del from '../../assets/img/del.svg'; 
class TopicOpinion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'topiclist',
            topicLists:[],
            visible:false,
            visibleOne:false,
            visibleTwo:false,
            visibleThree:false,
            inputValue:'',
            catid:0,
            topicId:0,
            childRen:0,
            status:false,
            materialCurrent:0,
            addTopic:0,
            addClass:1,
            isTopShow:true
        };

    }
    handleClick(e) {
        if(e.key==='addsort'){
            this.setState({
                current: 'topiclist',
                isAddTopicShow: false,
                visible:true,
                addClass:0,
                addTopic:1
            });
            return
        }
        history.push({
            pathname:`/topic/${e.key}`,
            search:`?topicid=${this.state.topicId}`
        });
        this.setState({
            current: e.key,
        });
    }
    componentWillUnmount(){
        this.props.searchState({data:true});
        clearTimeout( this.topichomeTimer);
    }
    componentWillMount(){
         this.props.topicNavMessageRequested(new Date());
         this.topichomeTimer = setTimeout( ()=>{
          let topicMessage=this.props.topicNavMessageSucceededState;
          if(topicMessage!==1){
            let firstTopicid='';
            topicMessage.forEach((item)=>{
                      if(item['topicList'][0]!==undefined){
                           return firstTopicid=topicMessage[0]['topicList'][0]['topicid'];
                      }
            })
            this.setState({
                topicLists:topicMessage,
                topicId:firstTopicid,
                materialCurrent:firstTopicid
              })
            this.props.setlocationPathname(firstTopicid);
          }
          },100)
    }
    // 添加专题
    handleAddTopic() {
        this.setState({
            current: 'addtopic',
            addTopic:1,
            addClass:0
        });
        history.push(`/topic/addtopic`);
    }
    // 关别添加分类选项
    handleCancelAddTopic() {

    }
    delTopic(e){
        e.stopPropagation();
         let topicID=e.target.dataset.topicid;
    	  this.setState({
    	  	visibleTwo:true,
    	  	topicId:topicID,
    	  	childRen:e.target.parentNode.parentNode.children.length
    	  });
    }
    queryTopic(topicid,e){
        this.setState({
            materialCurrent: topicid,
            current: 'topiclist',
            topicId:topicid
        })
          this.props.setlocationPathname(topicid);
          history.push({
            pathname:`/topic/topiclist`,
            search:`?topicId=${topicid}`
            });

    }
    onChange(e){
          const {value} = e.target;
          if(value.length>=28){
            message.error('分类名称请不要超过28个字符');
            return;
          } 
    	  this.setState({inputValue:e.target.value})
    }
    handleOk(e){
    	 request(api_topic_typeAdd,{
    	 	  method:'POST',
    	 	  headers:{
    	 	  	  "Content-Type": "application/x-www-form-urlencoded"
    	 	  },
    	 	  body:`catname=${this.state.inputValue}`
    	 }).then(res=>{
    	 	  if(res.data.code===1){
    	 	  	   history.push({
                    pathname:`/topic/topiclist`,
                    search:`?catid=${this.state.inputValue}`
              });
               }
               this.props.topicNavMessageRequested(new Date())
    	 })
    	 this.setState({
    	 	  visible:false,
    	 	  inputValue:''
    	 })
    }
    handleCancel(){
    	  this.setState({
    	 	  visible:false
    	 })
    }
    delOkOne(){
        this.setState({visibleOne:false});
    	if(this.state.childRen!==0){
                Modal.info({
                   title: '系统提示',
                   content: (
                   <div>
                   <p>请先删除该分类下的所有专题</p>
                   </div>
                    ),
                    onOk() {},
                   });
    	}else{
    		 request(api_topic_typeDel,{
    		 method:'POST',
    		 headers:{
    	 	  	  "Content-Type": "application/x-www-form-urlencoded"
    	 	  },
    	 	  body:`catid=${this.state.catid}`
    	}).then(res=>{
    		  if(res.data.code===1){
    	 	  	   history.push({
    	 	  	   	  pathname:`/topic/topiclist`,
    	 	  	   	  search:`?catid=${this.state.catid}`
    	 	  	   });
               }
               this.props.topicNavMessageRequested(new Date())
    	})
    	}

    }
    delCancelOne(){
    	this.setState({visibleOne:false})
    }
    delOkTwo(){
    	 this.setState({
    	 	visibleTwo:false,
    	    childRen:this.state.childRen-1
    	 });
    	  request(api_topic_del,{
    	  	 method:'POST',
    	  	 headers:{
    	  	 	 "Content-Type": "application/x-www-form-urlencoded"
    	  	 },
    	  	 body:`topicid=${this.state.topicId}`
    	  }).then(res=>{
    	  	   if(res.data.code===1){
    	  	   	    history.push({
    	  	   	    	pathname:`/topic/topiclist`,
    	  	   	    	search:`?delTopicId=${this.state.topicId}`
    	  	   	    	});
                 }
                 this.props.topicNavMessageRequested(new Date())
    	  });
    }
    delCancelTwo(){
    	this.setState({visibleTwo:false})

    }
    delOkThree(){
        this.setState({
            visibleThree:false,
            inputValue:''
        })
        request(api_classify_revise,{
            method:'POST',
            headers:{
                 "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`catname=${this.state.inputValue}&id=${this.state.catid}`
        }).then(res=>{
              if(res.data.code===1){
                history.push({
                    pathname:`/topic/topiclist`,
                    search:`?catId=${this.state.catid}`
                    });
                 this.props.topicNavMessageRequested(new Date())
              }
        })
    }
    delCancelThree(){
        this.setState({visibleThree:false})
    }
    onDelitem({key}){
           if(key==='1'){
           	   this.setState({visibleOne:true})
           }else{
            this.setState({visibleThree:true})
           }
    }
    onCatid(catid){
         this.setState({
             catid:catid,
             childRen:this.refs['topicList' + catid].children.length
          })
    }
    filterTreeNode(e){
         console.log(e)
    }
    //分类下拉菜单
    dropDown(catid){
           const ref = this.refs['topicList' + catid];
           if (ref.style.display === 'block') {
             ref.style.display = 'none';
           } else {
             ref.style.display = 'block';
           }
    }
    stopPropagation(e){
          e.stopPropagation();
    }
    triggerTopShow() {
        this.setState({
            isTopShow: !this.state.isTopShow
        })
        this.props.searchState({data:!this.state.isTopShow})
    }
    render() {
    	const delItems = (
            <Menu onClick={this.onDelitem.bind(this)}>
                <Menu.Item key="2">重命名</Menu.Item>
                <Menu.Item key="1">删除</Menu.Item>
            </Menu>
       );
        let {topicNavMessageSucceededState} =this.props;
        const LeftTopicLists=topicNavMessageSucceededState!==1&&topicNavMessageSucceededState.map((item,index)=>
          <div className="a-class" key={index}>
          <div className="class-name" >
          <div className="leftBox" onClick={this.dropDown.bind(this,item.catid)} data-index='1' title={item.catname}>
            <i>< Iconfont type="icon-caidanyingyong2" style={{fill:'#00c8e7'}}/></i><span className='mar'>{item.catname}</span>

          </div>
          <Dropdown overlay={delItems} trigger={['click']}>
            <i onClick={this.onCatid.bind(this,item.catid)}><Iconfont type="icon-icon02" className="icon-setting"/></i>
          </Dropdown>
          </div>
           <ul className="topics" ref={'topicList'+item.catid}>
              {item.topicList && item.topicList.map((iitem,iindex) =>
                 <li  key={iitem.topicid}
                 className={this.state.materialCurrent === iitem.topicid ? 'backGroundBlue' : 'a-topic'}
                  >
                  <span className="topicTitle" onClick={this.queryTopic.bind(this,iitem.topicid)}
                   title={iitem.topicname}
                  >
                        {iitem.topicname}
                  </span>
                  <img src={Del} alt="删除" className="icon-delete"  data-topicid={iitem.topicid} onClick={this.delTopic.bind(this)}/>
                </li>
             )}
             </ul>
         </div>

        );
        return (
            <div className="topic-opinion">
             {TopicList}
                <div className="topic-opinion-wrapper">
                <div className="topic-info">
                    <div className="topic-top">
                    <div>
                    <Menu
                        onClick={this.handleClick.bind(this)}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        style={{lineHeight:'40px',backgroundColor: '#2d324f',paddingTop:'14px',color:'#fff',border:'none'}}
                    >
                        <Menu.Item key="topiclist" style={{fontSize:'16px'}}>
                            信息列表
                        </Menu.Item>
                        <Menu.Item key="count" style={{fontSize:'16px'}}>
                            统计分析
                        </Menu.Item>
                        <Menu.Item key="report" style={{fontSize:'16px'}}>
                            专题报告
                        </Menu.Item>
                        <Menu.Item key="setting" style={{fontSize:'16px'}}>
                            修改专题设置
                        </Menu.Item>
                        <Menu.Item key="addtopic" style={{fontSize:'16px'}}>
                            添加专题
                        </Menu.Item>
                        <Menu.Item key="addsort" style={{fontSize:'16px'}} onClick={this.handleCancelAddTopic.bind(this)}>
                            添加分类
                        </Menu.Item>
                    </Menu>
                    </div>
                    <div className="close"  onClick={this.triggerTopShow.bind(this)}>
                    <span>{this.state.isTopShow ? '显示' : '隐藏'}</span>
                    <Icon type={this.state.isTopShow ? 'down' : 'right'} />
                    </div>
                    </div>
                    <div className="topic-wrapper">
                        <Switch>
                            <Route path="/topic/topiclist" component={TopicList} />
                            <Route path="/topic/addtopic" component={TopicAdd} />
                            <Route path="/topic/report" component={TopicReport}/>
                            <Route path="/topic/echarts" component={TopicReportEcharts}/>
                            <Route path="/topic/count" component={TopicCount} />
                            <Route path="/topic/setting" component={TopicSetting} />
                        </Switch>
                    </div>
                </div>
                <div className="left-boxes">
                    <div className="first-box">
                        <div className="add-topic-class">
                          专题
                        </div>
                        <div className="classes">
                        {LeftTopicLists}
                        </div>
                    </div>
                </div>
                </div>
                <Modal
                    title="添加分类"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    >
                    <p className="textCenter">输入分类名</p>
                    <Input className="gapInput" onChange={this.onChange.bind(this)}
                    value={this.state.inputValue}
                    maxLength={'28'}
                    />
                    </Modal>
                    <Modal
                    title="删除分类"
                    visible={this.state.visibleOne}
                    onOk={this.delOkOne.bind(this)}
                    onCancel={this.delCancelOne.bind(this)}
                    >
                    <p className="textCenter">确认删除此分类吗?</p>
                    </Modal>
                    <Modal
                    title="删除专题"
                    visible={this.state.visibleTwo}
                    onOk={this.delOkTwo.bind(this)}
                    onCancel={this.delCancelTwo.bind(this)}
                    >
                    <p className="textCenter">确认删除此专题吗?</p>
                    </Modal>
                    <Modal
                    title="重命名分类"
                    visible={this.state.visibleThree}
                    onOk={this.delOkThree.bind(this)}
                    onCancel={this.delCancelThree.bind(this)}
                    >
                    <p className="textCenter">输入新的分类名</p>
                    <Input className="gapInput" onChange={this.onChange.bind(this)}  
                     value={this.state.inputValue}  maxLength={'28'}/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        topicNavMessageSucceededState:state.getTopicMessageSucceeded.data ,
        search:state.searchStateReducer.data
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setlocationPathname: req => {
            dispatch(setlocationPathname(req));
        },
        getTopicLocationRequested: req => {
            dispatch(getTopicLocationRequested(req));
        },
        topicNavMessageRequested:req=>{
            dispatch(topicNavMessageRequested(req));
        },
        searchState: req =>{
            dispatch(searchState(req))
        }
    }
};

export default  connect(mapStateToProps,mapDispatchToProps)(TopicOpinion);
