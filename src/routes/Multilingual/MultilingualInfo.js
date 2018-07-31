import React from 'react';
import {Icon, Menu,Modal,Input,Dropdown,message, Button} from 'antd';
import { Route, Switch} from 'react-router-dom';
import {history} from '../../utils/history';
import TopicList from '../TopicOpinion/TopicList/TopicList';
// import Information from './BiddingInformation/BiddingInformation';
// import Setting from './BiddingSetting/BiddingSetting'
import Multilingual from './Multilingual/Multilingual'
import MultilingualSetting from './MultilingualSetting/MultilingualSetting'
import {
        api_get_BiddingFolderList,
        api_get_BiddingddGradeC,
        api_get_BiddingeditGradeCat,
        api_get_BiddingdelCat,
        api_get_BiddingdelGrade,
        api_sorted_cat_add,
        api_sorted_menu_list,
        api_sorted_grade_delete,
        api_sorted_cat_delete,
        api_sorted_cat_edit
} from '../../services/api';
import request from '../../utils/request';
import './MultilingualInfo.less';
import Iconfont from '../../components/IconFont';
import {setlocationPathname,getTopicLocationRequested,topicNavMessageRequested,searchState, getSortedContentRequested} from '../../redux/actions/createActions';
import {mulLanToggle} from '../../redux/actions/actions'
import {connect} from 'react-redux';
import { setTimeout } from 'timers';
import {GRAY,BLACK} from '../../utils/colors';
import Del from '../../assets/img/grayDel.svg'; 
class BiddingOpinion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'multilingual',
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
            isTopShow:true,
            browserHeight:300,
            topicNavMessage: [],
            language: ['', 'kr', 'jp', 'uygur', 'zang', 'en'],
            CHlan: ['中文', '한국어', '日本語', 'ئۇيغۇر يېزىقى', 'བོད་ཡིག། ', 'English'],
        };

    }
    initCard(){
        request(api_sorted_menu_list + '&lang=' + this.state.language[this.props.match.params.languages]).then((res) => {
            this.setState({
                topicNavMessage: res.data
            })
        })
    }
    handleClick(e) {
        if(e.key==='addsort'){
            this.setState({
                current: e.key,
                isAddTopicShow: false,
                visible:true,
                addClass:0,
                addTopic:1
            });
            return
        }
        // if(e.key === 'setting') {
        //     history.push({
        //         pathname:`/bidding/${e.key}`,
        //         search:`?topicid=${this.state.topicId}`
        //     });
        //     // return
        // }
        history.push({
            pathname:`/multilingual/${this.props.match.params.languages}/${e.key}`,
            search:`?topicid=${this.state.topicId}`
        });
        this.setState({
            current: e.key
        });
    }
    componentWillReceiveProps(nextprops){
        // let current =  
        let current = nextprops.location.pathname.split('/')[3]
        this.setState({
            current
        })
        if (nextprops.location.pathname === '/bidding/information') {
            this.initCard()
        }
    }
    componentWillMount() {
        let current = this.props.location.pathname.split('/')[3]
        this.setState({
            current
        })
        this.initCard()
        
    }
    componentWillUnmount(){
        this.props.searchState({data:true});
        clearTimeout( this.topichomeTimer);
    }
    componentDidMount(){
        //  this.props.topicNavMessageRequested(new Date());
        this.initCard()
         this.topichomeTimer = setTimeout( ()=>{
          let topicMessage=this.state.topicNavMessage;
          if(topicMessage!==1){
            let firstTopicid={topicid:1,topicname:'test'};
            // topicMessage.forEach((item)=>{
            //           if(item['clflist'][0]!==undefined){
            //                firstTopicid.topicid = item['clflist'][0]['clfid'];
            //                firstTopicid.topicname = item['clflist'][0]['clfname'];
            //                return firstTopicid;
            //           }
            // })
            // debugger
            for(var i = 0; i<topicMessage.length; i++) {
                let item = topicMessage[i]
                if(item['clflist'][0]!==undefined){
                    firstTopicid.topicid = item['clflist'][0]['clfid'];
                    firstTopicid.topicname = item['clflist'][0]['clfname'];
                    break
               }
            }
            // console.log(firstTopicid)
            const param = {
                clfid: firstTopicid.topicid,
                lang: this.state.language[this.props.match.params.languages]
            }
            this.props.getSortedContentRequested(param);
            this.setState({
                topicLists:topicMessage,
                topicId:firstTopicid.topicid,
                materialCurrent:firstTopicid.topicid,
                browserHeight:window.innerHeight-140
              })
          }
          },600)
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
    delTopic(e){
        e.stopPropagation();
         let topicID=e.target.dataset.clfid;
    	  this.setState({
    	  	visibleTwo:true,
    	  	topicId:topicID,
    	  	childRen:e.target.parentNode.parentNode.children.length
    	  });
    }
    queryTopic(topicid,topicname,e){
        this.setState({
            materialCurrent: topicid,
            current: 'multilingual',
            topicId:topicid
        })
        this.props.setlocationPathname({topicid:topicid,topicname:topicname});
          history.push({
            pathname:`/multilingual/${this.props.match.params.languages}/multilingual`,
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
    
    
    
    
    
    onDelitem(catid, {key}){
           if(key==='1'){
           	   this.setState({visibleOne:true})
           }else if (key === '2'){
               this.setState({visibleThree:true})
           }else {
                history.push({
                    pathname:`/multilingual/${this.props.match.params.languages}/setting`,
                    search: `?type=add&cafid=${catid}&topicid=${catid}`,
                })
                this.setState({
                    current: 'setting',
                })
                this.props.setlocationPathname({catid:catid});
           }
    }
    onCatid(catid){
         this.setState({
             catid:catid,
             childRen:this.refs['topicList' + catid].children.length
          })
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

    /**
     * 
     * 
     * 
     * 
     *   newCode
     * 
     * 
     * 
     */
    // 文件夹添加
    addFolder(){
        this.setState({
            visible: true
        })
    }
    // 确认文件夹添加
    handleOk(e){
        if(this.state.inputValue.trim() === '' ) {
            message.error('请输入主题名!')
            return
        }
        request(api_sorted_cat_add,{
              method:'POST',
              headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
              },
              body:`catname=${this.state.inputValue}&lang=${this.state.language[this.props.match.params.languages]}`
        })
        .then((res) => {
            if(res.data.code !== 1) {
                message.error(res.data.msg)
                return false;
            }
            this.initCard()
        })
        this.setState({
              visible:false,
              inputValue:''
        })
   }
    // 取消文件夹添加
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    // 确认重命名文件夹
    delOkThree(){
        this.setState({
            visibleThree:false,
            inputValue:''
        })
        request(api_sorted_cat_edit,{
            method:'POST',
            headers:{
                 "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`catname=${this.state.inputValue}&id=${this.state.catid}&lang=${this.state.language[this.props.match.params.languages]}`
        }).then( () =>{
            this.initCard()
        })
        this.setState({
            visibleThree:false,
            inputValue:''
        })
    }
    // 取消重命名文件夹
    delCancelThree(){
        this.setState({visibleThree:false})
    }
    // 确认删除文件夹
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
            request(api_sorted_cat_delete,{
                method:'POST',
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`catid=${this.state.catid}&lang=${this.state.language[this.props.match.params.languages]}`
            }).then((res)=>{
                if(res.data.code === 1) {
                    message.success('删除成功')
                }
                this.initCard()
    	    })
    	}

    }
    // 取消删除文件夹
    delCancelOne(){
    	this.setState({visibleOne:false})
    }
    // 确认删除专题
    delOkTwo(){
        this.setState({
            visibleTwo:false,
            childRen:this.state.childRen-1
        });
         request(api_sorted_grade_delete,{
              method:'POST',
              headers:{
                   "Content-Type": "application/x-www-form-urlencoded"
              },
              body:`clfid=${this.state.topicId}&lang=${this.state.language[this.props.match.params.languages]}`
         }).then(res=>{
                if(res.data && res.data.code===1){
                    // history.push({
                    //     pathname:`/bidding/information/`
                    // });
                    message.success('删除成功')
                }
                this.initCard()
         });
   }
   // 取消删除分类
   delCancelTwo(){
       this.setState({visibleTwo:false})
   }
   onlang() {
       this.props.mulLanToggle(this.props.match.params.languages)
   }
    render() {
        const delItems = item => {
            return <Menu onClick={this.onDelitem.bind(this,item.catid)}>
            <Menu.Item key="2">重命名</Menu.Item>
            <Menu.Item key="1">删除</Menu.Item>
            <Menu.Item key="3">添加</Menu.Item>
        </Menu>
        }
        const LeftTopicLists=this.state.topicNavMessage!==1&&this.state.topicNavMessage.map((item,index)=>
          <div className="a-class" key={index}>
          <div className="class-name" >
          <div className="leftBox" onClick={this.dropDown.bind(this,item.catid)} data-index='1' title={item.catname}>
            <i>< Iconfont type="icon-wenjianjia2" style={{fontSize:'18px'}}/></i><span className='mar'>{item.catname}</span>
          </div>
          <Dropdown overlay={delItems(item)} trigger={['click']}>
            <i onClick={this.onCatid.bind(this,item.catid)}><Iconfont type="icon-icon02" className="icon-setting"/></i>
          </Dropdown>
          </div>
           <ul className="topics" ref={'topicList'+item.catid}>
              {item.clflist && item.clflist.map((iitem,iindex) =>
                 <li  key={iitem.clfid}
                 className={this.state.materialCurrent === iitem.clfid ? 'backGroundBlue' : 'a-topic'}
                  >
                  <span className="topicTitle" onClick={this.queryTopic.bind(this,iitem.clfid,iitem.clfname)}
                   title={iitem.clfname}
                  >
                        {iitem.clfname}
                  </span>
                  <img src={Del} alt="删除" className="icon-delete"  data-clfid={iitem.clfid} onClick={this.delTopic.bind(this)}/>
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
                    <div className="topic-top" style={{background:GRAY}}>
                    <div>
                    {console.log(this.state.current)}
                    <Menu
                        onClick={this.handleClick.bind(this)}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        style={{lineHeight:'26px',backgroundColor: GRAY,paddingTop:'14px',border:'none'}}
                    >
                        <Menu.Item key="multilingual" style={{fontSize:'16px'}}>
                            信息列表
                        </Menu.Item>
                        {/* <Menu.Item key="analysis" style={{fontSize:'16px'}}>
                            招投分析
                        </Menu.Item> */}
                        <Menu.Item key="setting" style={{fontSize:'16px'}}>
                            方案设置
                        </Menu.Item>
                    </Menu>
                    </div>
                    <div className="close">
                        <Button style={{textAlign: 'center'}} onClick={this.onlang.bind(this)}>{this.state.CHlan[this.props.languages]}</Button>
                    </div>
                    {/* <div className="close"  onClick={this.triggerTopShow.bind(this)} style={this.state.current==='multilingual'?{display:'block',color:BLACK}:{display:'none'}}>
                      <span>{this.state.isTopShow ? '显示' : '隐藏'}</span>
                      <Icon type={this.state.isTopShow ? 'down' : 'right'} />
                    </div> */}
                    </div>
                    <div className="topic-wrapper">
                        <Switch>
                            <Route path="/multilingual/:languages/multilingual" component={Multilingual} />
                            {/* <Route path="/bidding/analysis" component={Analysis} /> */}
                            <Route path="/multilingual/:languages/setting" component={MultilingualSetting}/>
                        </Switch>
                    </div>
                </div>
                <div className="left-boxes">
                    <div className="first-box">
                        <div className="add-topic-class" style={{background:GRAY}}>
                          主题
                          <i onClick={this.addFolder.bind(this)}><Iconfont type='icon-tianjiawenjianjia' style={{fontSize: '18px'}}  className="add-folder"></Iconfont></i>
                        </div>
                        <div className="classes" style={{maxHeight:this.state.browserHeight+'px'}}>
                        {LeftTopicLists}
                        </div>
                    </div>
                </div>
                </div>
                <Modal
                    title="添加主题"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    >
                    <p className="textCenter">输入主题名</p>
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
                    <p className="textCenter">确认删除此主题吗?</p>
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
        search: state.searchStateReducer.data,
        languages: state.mulLanToggleReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSortedContentRequested: req => {
            dispatch(getSortedContentRequested(req));
        },
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
        },
        mulLanToggle: lang => {
            dispatch(mulLanToggle(lang))
        }
    }
};

export default  connect(mapStateToProps,mapDispatchToProps)(BiddingOpinion);
