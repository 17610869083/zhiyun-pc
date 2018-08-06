import React from 'react';
import './CustomHome.less';
import IcontFont from '../../components/IconFont';
import { Container, Draggable } from 'react-smooth-dnd';
import {Icon,message} from 'antd';
import request from '../../utils/request';
import {history} from '../../utils/history';
import {api_save_widget} from '../../services/api';
import hotword from '../../assets/home-img/hotword.png';
import MediaDistribution from '../../assets/home-img/MediaDistribution.png';
import NegativeOpinion from '../../assets/home-img/NegativeOpinion.png';
import NewestOpinionBox from '../../assets/home-img/NewestOpinionBox.png';
import NewestWarningOpinionBox from '../../assets/home-img/NewestWarningOpinionBox.png';
import OpinionCountBox from '../../assets/home-img/OpinionCountBox.png';
import OpinionTrendBox from '../../assets/home-img/OpinionTrendBox.png';
import TodayOpinionBox from '../../assets/home-img/TodayOpinionBox.png';
import TopicOpinionBox from '../../assets/home-img/TopicOpinionBox.png';
import WeiboOpinionBox from '../../assets/home-img/WeiboOpinionBox.png';
import audio from '../../assets/img/5a4c765ddd95a.mp3';
const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
  
    const result = [...arr];
    let itemToAdd = payload;
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
    return result;
  };
  
class CustomHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
         browserHeight:800,
         flag:true,
         isDragend:false,
         moduleList:[
             {name:'NewestWarningOpinionBox',defaultSize:50,size:50,type:'s',img:NewestWarningOpinionBox},
             {name:'NegativeOpinionBox',defaultSize:50,size:50,type:'s',img:NegativeOpinion},
             {name:'NewestOpinionBox',defaultSize:50,size:50,type:'s',img:NewestOpinionBox},
             {name:'TopicOpinionBox',defaultSize:50,size:50,type:'s',img:TopicOpinionBox},
             {name:'WeiboOpinionBox',defaultSize:50,size:50,type:'s',img:WeiboOpinionBox},
             {name:'TodayOpinionBox',defaultSize:40,size:40,type:'s',img:TodayOpinionBox},
             {name:'MediaDistribution',defaultSize:40,size:40,type:'s',img:MediaDistribution},
             {name:'HotWordBox',defaultSize:40,size:40,type:'s',img:hotword},
             {name:'OpinionTrendBox',defaultSize:60,size:60,type:'b',img:OpinionTrendBox},
             {name:'OpinionCountBox',defaultSize:100,size:60,type:'b',img:OpinionCountBox},
         ],
         moduleCont0:[],
         moduleCont1:[],
         moduleCont2:[],
         moduleCont3:[],
         moduleCont4:[],
         isDrag:true,
         firstSize:0,
         result:0,
         allList:[],
         groupName:'2'
        }
    }
    componentDidMount(){
        this.setState({
            browserHeight:window.innerHeight-136
        })
    }
    showList = () => {
        this.setState({
            flag:!this.state.flag
        })       
    }
    dragover(e) {
      e.preventDefault();
    }
    drop = (e) => { 
        this.refs.audio.play();
            let {isDrag} = this.state;
           
            this.setState({
                isDrag:true
            },()=>{
                if(!isDrag){
                    return ;
                }
                this.setState({
                    moduleList: applyDrag(this.state.moduleList, e),
                    allList:this.state.allList.concat(e.payload),
                    isDragend:true,
                    
                })
            })

    }

    drop1 = (type,e) => {
        let sNum = 0;let bNum=0;let num = 0;
        let moduleCont0 =  applyDrag(this.state.moduleCont0, e);
        moduleCont0.forEach(item => {
              if(item.type === 's'){
                 sNum+=1;
                 num+=1;
              }else{
                 bNum+=1;
                 num+=2;
              }       
        })
        if (num>4 && bNum>=2){
            message.error('该行已达到最多模块数量')
            this.setState({
                isDrag:false
            })
            return ;
        }else if(num>3){
            message.error('该行已达到最多模块数量')
            this.setState({
                isDrag:false
            })
            return ;
        }
        if(sNum>=3){
            moduleCont0.forEach(item => {
               item.defaultSize = 33;   
          })
        }else if(moduleCont0.length === 2){
                moduleCont0[0]['defaultSize'] =  moduleCont0[0]['size'] ;
                moduleCont0[1]['defaultSize'] = 100 - moduleCont0[0]['defaultSize'] ;
        }
        this.setState({
            moduleCont0: moduleCont0
        })
    }

    drop2 = (e) => {
        let sNum = 0;let bNum = 0;let num = 0;
        let moduleCont1 =  applyDrag(this.state.moduleCont1, e);
        moduleCont1.forEach(item => {
              if(item.type === 's'){
                 sNum+=1;
                 num+=1;
              }else{ 
                 num+=2;
              }       
        })
        if (num>4 && bNum>=2){
            message.error('该行已达到最多模块数量')
            this.setState({
                isDrag:false
            })
            return ;
        }else if(num>3){
            message.error('该行已达到最多模块数量')
            this.setState({
                isDrag:false
            })
            return ;
        }
        if(sNum>=3){
            moduleCont1.forEach(item => {
               item.defaultSize = 33;   
          })
        }else if(moduleCont1.length === 2){

            moduleCont1[0]['defaultSize'] =  moduleCont1[0]['size'] ;
            moduleCont1[1]['defaultSize'] = 100 - moduleCont1[0]['defaultSize'] ;
        }
        this.setState({
            moduleCont1: moduleCont1
       })
    }
    drop3 = (e) => {
        let sNum = 0;let bNum = 0;let num = 0;
        let moduleCont2 =  applyDrag(this.state.moduleCont2, e);
        moduleCont2.forEach(item => {
              if(item.type === 's'){
                 sNum+=1;
                 num+=1;
              }else{
                 num+=2;
              }       
        })
        if (num>4 && bNum>=2){
            message.error('该行已达到最多模块数量')
            this.setState({
                isDrag:false
            })
            return ;
        }else if(num>3){
            message.error('该行已达到最多模块数量')
            this.setState({
                isDrag:false
            })
            return ;
        }
        if(sNum>=3){
            moduleCont2.forEach(item => {
               item.defaultSize = 33;   
          })
        }else if(moduleCont2.length === 2){
            moduleCont2[0]['defaultSize'] =  moduleCont2[0]['size'] ;
            moduleCont2[1]['defaultSize'] = 100 - moduleCont2[0]['defaultSize'] ;
        }
        this.setState({
            moduleCont2: moduleCont2
       })
    }
    drop4 = (e) => {
        let sNum = 0;let bNum = 0;let num = 0;
        let moduleCont3 =  applyDrag(this.state.moduleCont3, e);
        moduleCont3.forEach(item => {
              if(item.type === 's'){
                 sNum+=1;
                 num+=1;
              }else{
                 num+=2;
              }       
        })
        if (num>4 && bNum>=2){
            message.error('该行已达到最多模块数量')
            this.setState({
                isDrag:false
            })
            return ;
        }else if(num>3){
            message.error('该行已达到最多模块数量')
            this.setState({
                isDrag:false
            })
            return ;
        }
        if(sNum>=3){
            moduleCont3.forEach(item => {
               item.defaultSize = 33;   
          })
        }else if(moduleCont3.length === 2){
            moduleCont3[0]['defaultSize'] =  moduleCont3[0]['size'] ;
            moduleCont3[1]['defaultSize'] = 100 - moduleCont3[0]['defaultSize'] ;
        }
        this.setState({
            moduleCont3: moduleCont3
       })
    }
    drop5 = (e) => {
        let sNum = 0;let bNum = 0;let num = 0;
        let moduleCont4 =  applyDrag(this.state.moduleCont4, e);
        moduleCont4.forEach(item => {
              if(item.type === 's'){
                 sNum+=1;
                 num+=1;
              }else{
                 num+=2;
              }       
        })
        if (num>4 && bNum>=2){
            message.error('该行已达到最多模块数量')
            this.setState({
                isDrag:false
            })
            return ;
        }else if(num>3){
            message.error('该行已达到最多模块数量')
            this.setState({
                isDrag:false
            })
            return ;
        }
        if(sNum>=3){
            moduleCont4.forEach(item => {
               item.defaultSize = 33;   
          })
        }else if(moduleCont4.length === 2){
            moduleCont4[0]['defaultSize'] =  moduleCont4[0]['size'] ;
            moduleCont4[1]['defaultSize'] = 100 - moduleCont4[0]['defaultSize'] ;
        }
        this.setState({
            moduleCont4: moduleCont4
       })
    }
    //删除模块
    closeModule(index,type){
        let moduleCont = this.state[type];
        let {allList} = this.state;
        this.setState({
            moduleList:this.state.moduleList.concat(moduleCont[index])
        })
        allList.forEach((item,indexs) => {
            if(item.name === moduleCont[index]['name']){
                allList.splice(indexs,1)
            }
        })
       moduleCont.splice(index,1);
       if(moduleCont.length === 2){
          moduleCont.forEach(item => {
              item.defaultSize = 50;
          })
       }else{
        moduleCont[0]['defaultSize'] = moduleCont[0]['size'];
       }
        this.setState({
            [type]:moduleCont,
            firstSize:moduleCont[0]['defaultSize']?moduleCont[0]['defaultSize']:0,
            allList:allList
        })
    }
    DragEnter = (e) => {
         console.log(e)

    }
    confim = () => {
        request(api_save_widget, {
            method: 'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `widget=${JSON.stringify(this.state.allList)}`
          }).then(res => {
              if(res.data.code === '1'){
                 history.push('/home')
              }
          })
    }
    render(){
        
        let {browserHeight,flag,isDragend,moduleList,moduleCont0,moduleCont1,moduleCont2,moduleCont3,moduleCont4} = this.state;
        let num = (browserHeight+110)/3;
        let confimStyle = flag && isDragend ?{display:'block'}:{display:'none'}
        let moduleListItems = moduleList.map ((item,index) => {
            return  <Draggable key={index}>
                    <div>
                    <img src={item.img} alt=''/>
                    </div>
                    </Draggable>
        });
        let moduleContItems0 = moduleCont0.map ((item,index) => {
            return <Draggable key={index} style={{width:`${item.defaultSize-2}%`,margin:'1%'}}> 
                   <div className="moduleCont">
                   <img src={item.img} alt='' style={{width:'100%',height:'365px'}}/>
                   <Icon type="close-circle" onClick={this.closeModule.bind(this,index,'moduleCont0')}/>
                   </div>
                   </Draggable>
        })
        let moduleContItems1 = moduleCont1.map ((item,index) => {
            return <Draggable key={index} style={{width:`${item.defaultSize-2}%`,margin:'1%'}}> 
                   <div className="moduleCont">
                   <img src={item.img} alt='' style={{width:'100%',height:'365px'}}/>
                   <Icon type="close-circle" onClick={this.closeModule.bind(this,index,'moduleCont1')}/>
                   </div>
                   </Draggable>
        })
        let moduleContItems2 = moduleCont2.map ((item,index) => {
            return <Draggable key={index} style={{width:`${item.defaultSize-2}%`,margin:'1%'}}> 
                   <div className="moduleCont">
                   <img src={item.img} alt='' style={{width:'100%',height:'365px'}}/>
                   <Icon type="close-circle" onClick={this.closeModule.bind(this,index,'moduleCont2')}/>
                   </div>
                   </Draggable>
        })
        let moduleContItems3 = moduleCont3.map ((item,index) => {
            return <Draggable key={index} style={{width:`${item.defaultSize-2}%`,margin:'1%'}}> 
                   <div className="moduleCont">
                   <img src={item.img} alt='' style={{width:'100%',height:'365px'}}/>
                   <Icon type="close-circle" onClick={this.closeModule.bind(this,index,'moduleCont3')}/>
                   </div>
                   </Draggable>
        })
        let moduleContItems4 = moduleCont4.map ((item,index) => {
            return <Draggable key={index} style={{width:`${item.defaultSize-2}%`,margin:'1%'}}> 
                   <div className="moduleCont">
                   <img src={item.img} alt='' style={{width:'100%',height:'365px'}}/>
                   <Icon type="close-circle" onClick={this.closeModule.bind(this,index,'moduleCont4')}/>
                   </div>
                   </Draggable>
        })
        return (
            <div className="custom-home" >
      <audio style={{display:'none'}} ref="audio"> 
        <source src={audio} type="audio/mpeg" />
        您的浏览器不支持 audio 元素。
      </audio>                
                <div className="custom-title">首页布局设置</div>
                <div style={{height:`${browserHeight}px`,overflowY: 'auto',padding:'20px'}}
                >   
                <Container groupName="1" orientation='horizontal'
                        data-id='1'
                        onDrop={ this.drop1.bind(this,'moduleCont0') }
                        getChildPayload={i => this.state.moduleCont0[i]}
                        style={{minHeight:'350px',whiteSpace: 'pre-wrap'}}
                       >
                       {moduleContItems0}
                       </Container>
                       <Container groupName="1" orientation='horizontal'
                        onDrop={this.drop2}
                        getChildPayload={i => this.state.moduleCont1[i]}
                        style={{minHeight:'350px',whiteSpace: 'pre-wrap'}}
                       >
                       {moduleContItems1}
                       </Container>
                       <Container groupName="1" orientation='horizontal'
                        onDrop={this.drop3}
                        getChildPayload={i => this.state.moduleCont2[i]}
                        style={{minHeight:'350px',whiteSpace: 'pre-wrap'}}
                       >
                       {moduleContItems2}
                       </Container>
                       <Container groupName="1" orientation='horizontal'
                        onDrop={this.drop4}
                        getChildPayload={i => this.state.moduleCont3[i]}
                        style={{minHeight:'350px',whiteSpace: 'pre-wrap'}}
                       >
                       {moduleContItems3}
                       </Container>
                       <Container groupName="1" orientation='horizontal'
                        onDrop={this.drop5}
                        getChildPayload={i => this.state.moduleCont4[i]}
                        style={{minHeight:'350px',whiteSpace: 'pre-wrap',marginBottom:'300px'}}
                       >
                       {moduleContItems4}
                       </Container>
                   
                </div>  
                <div className="slider-module"
                style={ flag&& isDragend ?{bottom:'0px',height:'72px'}:flag?{bottom:'0px',height:'32px'}:{bottom:'0px',height:num+'px'}}>
                <p  className="custom-confim" style={confimStyle} onClick={this.confim}>确定</p>   
                <div className="slider-switch" onClick = {this.showList}>
                    <IcontFont type="icon-caidanshousuoicon" ></IcontFont>
                </div>
                   <Container groupName='1' orientation='horizontal'
                   onDrop={ this.drop }
                   getChildPayload={i => this.state.moduleList[i]}
                   >
                   {moduleListItems}
                   </Container>
                </div>
            </div>
        )
    }
}
export default CustomHome