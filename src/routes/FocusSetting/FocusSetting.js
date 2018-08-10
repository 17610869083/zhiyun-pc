import React from 'react';
import './FocusSetting.less';
import {api_list_key_website_tag,api_save_key_website_tag,
        api_key_website_sort,api_remove_key_website_tag,
        api_list_key_website_name,api_remove_key_website_name,
        api_save_key_website_name,api_update_key_website_tag,
        api_update_key_website_name
} from '../../services/api';
import request from '../../utils/request';
import { Container, Draggable } from 'react-smooth-dnd';
import {Input,message,Icon} from 'antd';
import BlankPage from '../../base/Exception/BlankPage';
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
class FocusSetting extends React.Component{
    constructor(){
        super();
        this.state = {
            tagList :[],
            flag:false,
            tagName:'',
            id:'1',
            websiteList:[],
            websiteName:'',
            isAdd:false,
            isBlankPage:true,
            isEdit:false,
            editTagname:'',
            websiteId:''
        }
    }
    componentWillMount(){
        request(api_list_key_website_tag)
        .then(res => {
            if(res.data){
                let firstId = res.data[0]['id'];
                this.setState({
                    tagList:res.data,
                    id:firstId
                })
                request(api_list_key_website_name +`&tagId=${firstId}`)
                .then(res => {
                    if(res.data.length === 0){
                        this.setState({
                            isBlankPage:false 
                        })
                        return;
                    }
                    this.setState({
                        websiteList:res.data
                    })
                })
            }
        })
    }
    //添加标签
    addTag = () => {
        if(this.state.tagList.length>=5){
            message.error('标签最多添加5个');
            return;
        }
        this.setState({
            flag:true
        })
    }
    //标签名称
    change = (e) => {
        let {value} = e.target;
        this.setState({
            tagName:value
        })
    }
    //提交按钮
    submitTagname = () => {
        const {tagName} = this.state;
        if(/~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\./.test(tagName)){
            message.error('名称中请不要带有特殊字符');
            return;
        }
        request(api_save_key_website_tag +`&tagName=${tagName}`)
        .then(res => {
            if(res.data.code === 1){
                message.success(res.data.msg);
                this.setState({
                    flag:false,
                    tagName:''
                })
                request(api_list_key_website_tag)
                .then(res => {
                    if(res.data){
                        this.setState({
                            tagList:res.data
                        })
                    }
                })
            }else{
                message.error(res.data.msg);
            }
        })
    }
    drop = (e) => {
         let arrList = applyDrag(this.state.tagList,e).map(item => {
              return item.id
         });
         request(api_key_website_sort,{
            method: 'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `sort=${arrList.join(',')}`
         })
         this.setState({
            tagList:applyDrag(this.state.tagList,e)
         })

    }
    //点击标签获取内容
    checkName (id) {
        this.setState({
            id:id
        })
        request(api_list_key_website_name +`&tagId=${id}`)
        .then(res => {
            if(res.data.length === 0){
                this.setState({
                    isBlankPage:false
                })
            }else{
                this.setState({
                    isBlankPage:true
                })
            }
            this.setState({
                websiteList:res.data
            })
        })
    }
    //删除标签
    delTag(id){
        request(api_remove_key_website_tag + `&tagId=${id}`)
        .then(res => {
            if(res.data.code === 1){
                message.success(res.data.msg);
                request(api_list_key_website_tag)
                .then(res => {
                    if(res.data){
                        this.setState({
                            tagList:res.data 
                        })
                    }
                })
            }
        })
    }
    //删除网站
    delWebsite(websiteId){
        let {id} = this.state;
        request(api_remove_key_website_name +`&websiteId=${websiteId}`)
        .then(res => {
             if(res.data.code === 1){
                 message.success(res.data.msg);
                 request(api_list_key_website_name +`&tagId=${id}`)
                 .then(res => {
                     this.setState({
                         websiteList:res.data
                     })
                 })
             }
        })
    }
    //添加网站
    addWebsite = () => {
        let {websiteName,id} = this.state;
        if(websiteName.length>18){
            message.error('字数请不要大于18个字符');
            return;
        }
        request(api_save_key_website_name +`&tagId=${id}&websiteName=${websiteName}`)
        .then(res => {
            if(res.data.code === 1){
                message.success(res.data.msg);
                request(api_list_key_website_name +`&tagId=${id}`)
                .then(res => {
                    this.setState({
                        websiteList:res.data,
                        websiteName:'',
                        isAdd:false
                    })
                })
            }else{
                message.error(res.data.msg);
            }
        })
    }
    changeWebsite = (e) =>{
          let {value} = e.target;
          this.setState({
            websiteName:value
          })
    }
    showListKey = () => {
        this.setState({
            isAdd:true,
            isBlankPage:true
        })
    }
    //修改标签名字
    editTagName(id){
        this.setState({
            isEdit:true
        })
       
    }
    blurTagname = (e) => {
        let {editTagname,id} = this.state;
        request(api_update_key_website_tag +`&tagId=${id}&tagName=${editTagname}`)
        .then(res => {
            if(res.data.code === 1){
                message.success(res.data.msg);
                request(api_list_key_website_tag)
                .then(res => {
                    if(res.data){
                        this.setState({
                            tagList:res.data,
                            isEdit:false,
                            editTagname:''
                        })
                    }
                })
            }else{
                message.error(res.data.msg)
            }
        })
    }
    changeEditTagname = (e) => {
        let {value} = e.target;
        this.setState({
            editTagname:value
        })
    }
    editSource = (websiteId) => {
         this.setState({
            websiteId:websiteId
         })
    }
    changeEditWebsitename = (e) => {
        let {value} = e.target;
        this.setState({
            editWebsitename:value
        })
    }
    blurWebsitename = () => {
        let {websiteId,editWebsitename,id} = this.state;
        request(api_update_key_website_name + `&websiteId=${websiteId}&websiteName=${editWebsitename}`)
        .then(res => {
            if(res.data.code ===1){
                message.success(res.data.msg);
                request(api_list_key_website_name +`&tagId=${id}`)
                .then(res => {
                    if(res.data.length === 0){
                        this.setState({
                            isBlankPage:false
                        })
                    }else{
                        this.setState({
                            isBlankPage:true
                        })
                    }
                    this.setState({
                        websiteList:res.data,
                        websiteId:'',
                        editWebsitename:''
                    })
                })
            }else{
                message.error(res.data.msg);
            }
        })
    }
    render(){
        const {tagList,flag,tagName,id,websiteList,websiteName,isAdd,isBlankPage,isEdit,editTagname,websiteId,editWebsitename} =this.state;
        const tagNav = tagList.map((item,index) => {
            return <Draggable key={index} className={id === item.id ?'tag-name active':'tag-name'}
             onClick={this.checkName.bind(this,item.id)}>
             {isEdit && id === item.id ?<Input autoFocus value={editTagname} onChange={this.changeEditTagname} onBlur={this.blurTagname}/>:
             <span onDoubleClick={this.editTagName.bind(this,item.id)}>{item.tagName}</span>
             }
             <Icon type="close" style={id === item.id ?{visibility:'visible'}:{visibility:'hidden'}}
             onClick={this.delTag.bind(this,item.id)}/>
             </Draggable>
        });
        const blankPage = <div>
                           <BlankPage/>
                           <p style={{textAlign:'center',marginTop:'-56px'}}>还没有网站，请<span onClick={this.showListKey} style={{color:'#63aedd',cursor:'pointer'}}>添加</span>呦！</p>
                          </div>;
        const listKey =isBlankPage? websiteList.map((item,index) => {
            return <div key={index} className="website-name">
                    <p style={{width:'70%'}}>{websiteId === item.websiteId ?<Input autoFocus value={editWebsitename} 
                    style={{width:'230px'}} onChange={this.changeEditWebsitename} onBlur = {this.blurWebsitename}
                    />: <span onDoubleClick={this.editSource.bind(this,item.websiteId)}>{item.source}</span>}<span style={{marginLeft:'10px'}}>({item.total})</span></p>
                    <Icon type="close" onClick={this.delWebsite.bind(this,item.websiteId)} style={{cursor:'pointer'}}/>
                   </div>
        }):blankPage;
        return(
            <div className="focus-setting">
               <p className="title">重点关注媒体</p>
               <div className="focus-content">
                  <div className="focus-tag">
                    <p className="media-setting"><span>重点关注媒体设置</span><span onClick={this.addTag}>新建标签</span></p>
                    <Container onDrop={this.drop}>
                    {tagNav}
                    </Container>
                    <div className="tag-name" style={flag?{display:'flex'}:{display:'none'}}>
                       <Input placeholder="请输入名称" value={tagName} onChange={this.change}/>
                       <span onClick={this.submitTagname}>提交</span>
                    </div>
                  </div>
                  <div className="right">
                      <p className="media-setting"><span>网站列表</span><span onClick={this.showListKey}>添加网站</span></p>
                      <p className="media-setting" style={isAdd?{display:'flex'}:{display:'none'}}><Input value={websiteName} onChange={this.changeWebsite}/><span onClick={this.addWebsite}>提交</span></p>
                      {listKey}
                  </div>
               </div>
            </div>
        )
    }
}
export default FocusSetting;