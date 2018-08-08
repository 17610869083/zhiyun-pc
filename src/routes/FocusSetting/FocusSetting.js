import React from 'react';
import './FocusSetting.less';
import {api_list_key_website_tag,api_save_key_website_tag,api_key_website_sort} from '../../services/api';
import request from '../../utils/request';
import { Container, Draggable } from 'react-smooth-dnd';
import {Input,message} from 'antd';
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
            tagName:''
        }
    }
    componentWillMount(){
        request(api_list_key_website_tag)
        .then(res => {
            if(res.data){
                this.setState({
                    tagList:res.data 
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
         this.setState({
            tagList:applyDrag(this.state.tagList,e)
         })
         console.log(applyDrag(this.state.tagList,e))
         let arr 
        //  request(api_key_website_sort,{
        //     method: 'POST',
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     body: `sort=${JSON.stringify(this.state.allList)}`
        //  })
    }
    render(){
        const {tagList,flag,tagName} =this.state;
        const tagNav = tagList.map((item,index) => {
            return <Draggable key={index} className="tag-name">{item.tagName}</Draggable>
        })
        return(
            <div className="focus-setting">
               <p className="title">重点关注媒体</p>
               <div className="focus-content">
                  <div className="focus-tag">
                    <p className="media-setting"><span>重点关注媒体设置</span><span onClick={this.addTag}>新建标签</span></p>
                    <Container onDrop={this.drop}>
                    {tagNav}
                    </Container>
                    <div className="tag-name" style={flag?{display:'block'}:{display:'none'}}>
                       <Input placeholder="请输入名称" value={tagName} onChange={this.change}/>
                       <span onClick={this.submitTagname}>提交</span>
                    </div>
                  </div>
               </div>
            </div>
        )
    }
}
export default FocusSetting;