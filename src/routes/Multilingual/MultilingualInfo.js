import React from 'react';
import {Menu,Modal,Input,Dropdown,message, Button} from 'antd';
import { Route, Switch} from 'react-router-dom';
import {history} from '../../utils/history';
import TopicList from '../TopicOpinion/TopicList/TopicList';
import Multilingual from './Multilingual/Multilingual'
import MultilingualSetting from './MultilingualSetting/MultilingualSetting'
import {
        api_sorted_cat_add,
        api_sorted_menu_list,
        api_sorted_grade_delete,
        api_sorted_cat_delete,
        api_sorted_cat_edit
} from '../../services/api';
import request from '../../utils/request';
import './MultilingualInfo.less';
import Iconfont from '../../components/IconFont';
import {setlocationPathname, topicNavMessageRequested,searchState, getSortedContentRequested, mulLanToggle,getSortedContentSucceeded, emptyList} from '../../redux/actions/createActions';
import {connect} from 'react-redux';
import { setTimeout } from 'timers';
import {GRAY} from '../../utils/colors';
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
            language: ['cn', 'kr', 'jp', 'uygur', 'zang', 'en'],
            CHlan: ['中文', '한국어', '日本語', 'ئۇيغۇر يېزىقى', 'བོད་ཡིག། ', 'English'],
            infoList: ['信息列表', '정보 목록', '情報リスト', 'ئۇچۇر جەدۋىلى ', 'ཆ་འཕྲིན་རེའུ་མིག་', 'Information list'],
            schemeSetting: ['方案设置', '방안 설치', '案設定', 'لايىھەسىنى بەلگىلەش ', 'བྱ་རྒྱུའི་འཆར་གཞིའི་ནང་ཆ་', 'Solution set'],
            theme: ['主题', '테마', 'テーマ', 'تېما ', 'ཁ་བྱང་གཙོ་བོ་', 'theme'],
            addTheme: ['添加主题', '주제 추가', 'トピックを追加', 'تېما قوشۇش ', 'སྦྱོར་རྟ་བྱེད་པ་། བརྗོད་བྱ་གཙོ་བོ་', 'Add topic'],
            InputThem: ['请输入主题名称', '제목을 입력하십시오.', '件名を入力してください', 'تېمىنى كىرگۈزۈڭ نامى ', 'བརྗོད་བྱ་གཙོ་བོའི་མིང་འབྲི་རོགས་།', 'Please enter a subject name'],
            confirm: ['确认', '확인', '確認', 'بېكىتىش ', 'ཁས་ལེན་གསལ་ཐག་ཆོད་པ་', 'confirm'],
            cancel: ['取消', '취소', 'キャンセル', 'ئەمەلدىن قالدۇرماق ', 'མི་དགོས་པར་བཟོ་བ་', 'cancel'],
            rename: ['重命名', '이름 바꾸기', '名前を変更する', 'قايتا ناملاش ', 'མིང་བསྐྱར་འངོགས་', 'Rename'],
            del: ['删除', '삭제', '削除', 'ئۆچۈرۈش ', '“ སུབ་པ་” ཞེས་པ་', 'delete'],
            add: ['添加','락 토 페 린 을 첨가','添加','قوشماق ','ཁ་སྣོན་','add'],
            calssNamelen: ['专题名称请不要超过28个字符', '특집 명칭 하지 마 세요. 이상 28 개 문자', '名前は28文字を超えないでください。', 'مەخسۇس نامى قىلماڭ ھەرپ - بەلگە ', 'ཆེད་དོན་མིང་ཡིག་རྟགས་མ་བྱེད་རོགས་།', 'The project name should not exceed 28 characters'],
            modal: {
                delclass: {
                    title: ['删除分类', '분류를 삭제하다', '分類を削除する', 'ئۆچۈرۈش تۈرلىرى', 'བསུབ་རིགས་དབྱེ་', 'Delete the classification'],
                    tip: ['确认删除此主题吗?', '확인 을 삭제 주제?', 'このテーマの削除を確認しますか?', 'ئۆچۈرەمسىز ئاساسىي تېمىسىنى ئېيتىپ بەرسىڭىز بولامدۇ ؟', 'གཏན་འཁེལ་འདི་ནི་གསུབ་ནས་བརྗོད་བྱ་གཙོ་བོ་དམ་།', 'Are you sure to delete this topic?']
                },
                delspecial: {
                    title: ['删除专题', '주제를 삭제하다', 'テーマを削除する', 'ئۆچۈرۈش مەخسۇس', 'ཆེད་དོན་སྐོར་བསུབས་ཡོད་པ་བཅས་', 'Delete the project'],
                    tip: ['确定删除此专题吗', '이 주제를 삭제하겠습니까?', 'このパネルを削除しますか?', 'ئۆچۈرەمسىز بۇ مەخسۇس ماس كېلىدۇ ؟', 'གཏན་འཁེལ་འདི་ནི་གསུབ་ནས་ཆེད་དོན་ཡོད་དམ་།', 'Are you sure to delete this topic']
                },
                rnameclass: {
                    title: ['重命名分类', '이름을 새로 명명하다.', '命名分類', 'قايتا نام بېرىش تۈرگە ئايرىش', 'མིང་བསྐྱར་འདོགས་རིགས་དབྱེ་', 'renaming'],
                    tip: ['输入新的分类名', '새로 운 분류 명을 입력하다.', '新しい分類名を入力する。', 'كىرگۈزۈش يېڭى تۈرگە ئايرىش نامى', 'རིགས་དགར་མིང་གསར་པ་ནང་འཇུག་', 'Enter a new category name']
                }
            },
            delsuccess: ['删除成功', '성공을 지우다', '削除成功', 'ئۆچۈرۈلدى. ئۆچۈرۈلدى', 'སྐོར་བསུབས་ཡོད་པ་བཅས་གྲུབ་འབྲས་ཐོབ་པའི་ངང་', 'successfully deleted'],
            subjectName: ['请输入主题名称', '제목을 입력하십시오.', '件名を入力', 'してください', 'تېمىنى كىرگۈزۈڭ نامى', 'བརྗོད་བྱ་གཙོ་བོའི་མིང་འབྲི་རོགས་།', 'Please enter a subject name'],
            systemPrompt: ['系统提示', '시스템 제시', 'システムヒント', 'سىستېما كۆرسەتمىسى', 'མ་ལག་གིས་སྟོན་པ་ནི་', 'The system prompt'],
            delalltopic: ['请先删除该分类下的所有专题', '우선이 분류 된 모든 문제를 삭제 해 주십시오.', 'この分類下の全ての全てを削除しなさい。', 'ئالدى بىلەن بۇ تۈرنىڭ ئىچىدە بارلىق تېما', 'རིགས་དབྱེ་བའི་སྔོན་ལ་གསུབ་རོགས་ལ་དབང་བའི་ཆེད་དོན་', 'Please delete all topics under this category first']
        };

    }
    initCard(lang, callback){
        const url  = lang ? api_sorted_menu_list + '&lang=' + this.state.language[lang] :  api_sorted_menu_list + '&lang=' + this.state.language[this.props.match.params.languages]
        request(url).then((res) => {
            this.setState({
                topicNavMessage: res.data
            }, ()=> {callback && callback()})
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
            pathname:`/allopinion/multilingual/${this.props.match.params.languages}/${e.key}`,
            search:`?topicid=${this.state.topicId}`
        });
        this.setState({
            current: e.key
        });
    }
    componentWillReceiveProps(nextprops){
        this.props.location.search !== nextprops.location.search ? this.props.emptyList() : ''
        let current = nextprops.location.pathname.split('/')[4]
        this.setState({
            current
        })
        if (nextprops.location.pathname.split('/')[4] === 'multilingual' &&  nextprops.location.pathname !== this.props.location.pathname) {
            // getSortedContentSucceeded({docList: [], pageInfo: {count:0}, carryCount: [{count:0, value: "全部", key: "docApp"}]})
            let get = () =>{
                let topicMessage = this.state.topicNavMessage;
                let firstTopicid={topicid:-1,topicname:'test'};
                for(var i = 0; i<topicMessage.length; i++) {
                    let item = topicMessage[i]
                    if(item['clflist'][0]!==undefined){
                        firstTopicid.topicid = item['clflist'][0]['clfid'];
                        firstTopicid.topicname = item['clflist'][0]['clfname'];
                        break
                   }
                }
                const param = {
                    clfid: firstTopicid.topicid,
                    lang: this.state.language[nextprops.match.params.languages]
                }
                this.props.getSortedContentRequested(param);
                this.props.setlocationPathname({topicid:param.clfid});
                this.setState({
                    materialCurrent: firstTopicid.topicid
                })
            }
            this.initCard(nextprops.match.params.languages, get)
        }
    }
    componentWillMount() {
        let current = this.props.location.pathname.split('/')[4]
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
        // this.initCard()
         this.topichomeTimer = setTimeout( ()=>{
          let topicMessage=this.state.topicNavMessage;
          if(topicMessage!==1){
            let firstTopicid={topicid:-1,topicname:'test'};
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
            this.props.setlocationPathname({topicid:param.clfid});
            this.setState({
                topicLists:topicMessage,
                topicId:firstTopicid.topicid,
                materialCurrent:firstTopicid.topicid,
                browserHeight:window.innerHeight-140
              })
          }
          },600)
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
            pathname:`/allopinion/multilingual/${this.props.match.params.languages}/multilingual`,
            search:`?topicId=${topicid}&date=${Date.now()}`
        });
    }
    onChange(e){
          const {value} = e.target;
          if(value.length>=28){
            message.error(this.state.calssNamelen[this.props.languages]);
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
                    pathname:`/allopinion/multilingual/${this.props.match.params.languages}/setting`,
                    search: `?type=add&catid=${catid}`,
                })
                this.setState({
                    current: 'setting',
                })

                // this.props.setlocationPathname({catid:catid});
                // this.props.setlocationPathname({topicid:this.props.getRouter.topicid});
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
            message.error(this.state.subjectName[this.props.languages])
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
                   title: this.state.systemPrompt[this.props.languages],
                   content: (
                   <div>
                   <p>{this.state.delalltopic[this.props.languages]}</p>
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
                    message.success(this.state.delsuccess[this.props.languages])
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
                    message.success(this.state.delsuccess[this.props.languages])
                }
                this.initCard()
         });
   }
   // 取消删除分类
   delCancelTwo(){
       this.setState({visibleTwo:false})
   }
   onlang() {
       this.props.languages === 0 ? this.props.mulLanToggle(this.props.match.params.languages) : this.props.mulLanToggle(0)
   }
    render() {
        const delItems = item => {
            return <Menu onClick={this.onDelitem.bind(this,item.catid)}>
            <Menu.Item key="2">{this.state.rename[this.props.languages]}</Menu.Item>
            <Menu.Item key="1">{this.state.del[this.props.languages]}</Menu.Item>
            <Menu.Item key="3">{this.state.add[this.props.languages]}</Menu.Item>
        </Menu>
        }
        const LeftTopicLists=this.state.topicNavMessage!==1&& this.state.topicNavMessage && this.state.topicNavMessage.map((item,index)=>
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
        const modalFooter = (handleCancel, handleOk, _this) => {
            return (<div><Button size="large" onClick={handleCancel.bind(_this)}>{this.state.cancel[this.props.languages]}</Button><Button type="primary" size="large" onClick={handleOk.bind(_this)}>{this.state.confirm[this.props.languages]}</Button></div>)
        }
        return (
            <div className="topic-opinion">
                {TopicList}
                <div className="topic-opinion-wrapper">
                <div className="topic-info">
                    <div className="topic-top" style={{background:GRAY}}>
                    <div>
                    <Menu
                        onClick={this.handleClick.bind(this)}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        style={{lineHeight:'26px',backgroundColor: GRAY,paddingTop:'14px',border:'none'}}
                    >
                        <Menu.Item key="multilingual" style={{fontSize:'16px'}}>
                            {this.state.infoList[this.props.languages]}
                        </Menu.Item>
                        {/* <Menu.Item key="analysis" style={{fontSize:'16px'}}>
                            招投分析
                        </Menu.Item> */}
                        <Menu.Item key="setting" style={{fontSize:'16px'}}>
                            {this.state.schemeSetting[this.props.languages]}
                        </Menu.Item>
                    </Menu>
                    </div>
                    <div className="close">
                        <Button style={{textAlign: 'center'}} onClick={this.onlang.bind(this)}>{this.props.languages-0 === 0 ? this.state.CHlan[this.props.match.params.languages] : '中文' }</Button>
                    </div>
                    {/* <div className="close"  onClick={this.triggerTopShow.bind(this)} style={this.state.current==='multilingual'?{display:'block',color:BLACK}:{display:'none'}}>
                      <span>{this.state.isTopShow ? '显示' : '隐藏'}</span>
                      <Icon type={this.state.isTopShow ? 'down' : 'right'} />
                    </div> */}
                    </div>
                    <div className="topic-wrapper">
                        <Switch>
                            <Route path="/allopinion/multilingual/:languages/multilingual" component={Multilingual} />
                            {/* <Route path="/bidding/analysis" component={Analysis} /> */}
                            <Route path="/allopinion/multilingual/:languages/setting" component={MultilingualSetting}/>
                        </Switch>
                    </div>
                </div>
                <div className="left-boxes">
                    <div className="first-box">
                        <div className="add-topic-class" style={{background:GRAY}}>
                          {this.state.theme[this.props.languages]}
                          <i onClick={this.addFolder.bind(this)}><Iconfont type='icon-tianjiawenjianjia' style={{fontSize: '18px'}}  className="add-folder"></Iconfont></i>
                        </div>
                        <div className="classes" style={{maxHeight:this.state.browserHeight+'px'}}>
                        {LeftTopicLists}
                        </div>
                    </div>
                </div>
                </div>
                <Modal
                    title={this.state.addTheme[this.props.languages]}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={modalFooter(this.handleCancel, this.handleOk, this)}
                    >
                    <p className="textCenter">{this.state.InputThem[this.props.languages]}</p>
                    <Input className="gapInput" onChange={this.onChange.bind(this)}
                    value={this.state.inputValue}
                    maxLength={'28'}
                    />
                    </Modal>
                    <Modal
                    title={this.state.modal.delclass.title[this.props.languages]}
                    visible={this.state.visibleOne}
                    onOk={this.delOkOne.bind(this)}
                    onCancel={this.delCancelOne.bind(this)}
                    footer={modalFooter(this.delCancelOne, this.delOkOne, this)}
                    >
                    <p className="textCenter">{this.state.modal.delclass.tip[this.props.languages]}?</p>
                    </Modal>
                    <Modal
                    title={this.state.modal.delspecial.title[this.props.languages]}
                    visible={this.state.visibleTwo}
                    onOk={this.delOkTwo.bind(this)}
                    onCancel={this.delCancelTwo.bind(this)}
                    footer={modalFooter(this.delCancelTwo, this.delOkTwo, this)}
                    >
                    <p className="textCenter">{this.state.modal.delspecial.tip[this.props.languages]}?</p>
                    {/* <Button onClick={this.delCancelTwo.bind(this)}>取消123</Button>
                    <Button onClick={this.delOkTwo.bind(this)}>确定123</Button> */}
                    </Modal>
                    <Modal
                    title={this.state.modal.rnameclass.title[this.props.languages]}
                    visible={this.state.visibleThree}
                    onOk={this.delOkThree.bind(this)}
                    onCancel={this.delCancelThree.bind(this)}
                    footer={modalFooter(this.delCancelThree, this.delOkThree, this)}
                    >
                    <p className="textCenter">{this.state.modal.rnameclass.tip[this.props.languages]}</p>
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
        languages: state.mulLanToggleReducer,
        getRouter: state.getRouterReducer
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
        topicNavMessageRequested:req=>{
            dispatch(topicNavMessageRequested(req));
        },
        searchState: req =>{
            dispatch(searchState(req))
        },
        mulLanToggle: lang => {
            dispatch(mulLanToggle(lang))
        },
        getSortedContentSucceeded: req => {
            dispatch(getSortedContentSucceeded(req))
        },
        emptyList: () => {
            dispatch(emptyList())
        }
    }
};

export default  connect(mapStateToProps,mapDispatchToProps)(BiddingOpinion);
