import React from 'react';
import './FocusSetting.less';
import {api_list_key_website_tag} from '../../services/api';
import request from '../../utils/request';
class FocusSetting extends React.Component{
    constructor(){
        super();
        this.state = {
            tagList :[]
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
    render(){
        const {tagList} =this.state;
        const tagNav = tagList.map((item,index) => {
            return <li key={index} className="tag-name">{item.tagName}</li>
        })
        return(
            <div className="focus-setting">
               <p className="title">重点关注媒体</p>
               <div className="focus-content">
                  <ul className="focus-tag">
                    <li className="media-setting"><span>重点关注媒体设置</span><span>新建标签</span></li>
                    {tagNav}
                  </ul>
               </div>
            </div>
        )
    }
}
export default FocusSetting;