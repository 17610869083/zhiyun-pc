import React from 'react';
import {GRAY,BLUES} from '../../utils/colors';
import './ChooseTemplate.less';
import {api_get_template_report,api_search_template} from '../../services/api';
import request from '../../utils/request';
import {Input} from 'antd';
import {history} from '../../utils/history';
import {templateTypeSort} from '../../utils/format';
class ChooseTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reportTypeList:[],
            type:'00',
            contentList:[],
            searchValue:'',
            typeKeyList:{
                '00':'全部报告',
                '01':'简报',
                '02':'专报',
                '03':'日报',
                '04':'周报',
                '05':'半月报',
                '06':'月报',
                '07':'季报',
                '08':'年报'
            },
            visible:false
        }
    }
    checkType (type) {
          this.setState({
            type:type
          })
          request(api_get_template_report + '&reportType=' + type)
          .then( res => {
              if(res.data){
                this.setState({
                    contentList: res.data.data.pageBean.content
                })
              }
          })
    }
    checkTemplate (id,type) {
          this.setState({
            contentId:id
          })
          history.push({
              pathname:'/reporttemplate',
              search:`?type=${type}&id=${id}`
          })
    }
    componentWillMount(){
        let typeList = [] ; 
        if(this.props.location.search !== ''){
            typeList.push({type:'01',name:'简报'});
            request(api_get_template_report + '&reportType=01')
            .then( res => {
                if(res.data){
                  this.setState({
                      contentList: res.data.data.pageBean.content,
                      reportTypeList:typeList
                  })
                }
            })
        }else{
        request(api_get_template_report)
        .then( res => {
            if(res.data.code === 1){    
                templateTypeSort(res.data.data.reportTypeList).forEach(item => {
                    typeList.push({type:item,name:this.state.typeKeyList[item]}) 
                });
                this.setState({
                    contentList: res.data.data.pageBean.content,
                    reportTypeList:typeList
                })  
          }
        })
        }
    }

    change = (e) => {
       let {value} = e.target ;
       this.setState({
           searchValue:value
       }) 
    }
    //搜索模板
    keydown = (e) => {
        if(e.keyCode === 13){
            request(api_search_template +`&reportType=${this.state.type}&formName=${e.target.value}`)
            .then( res => {
                  if(res.data.code === 1){
                    this.setState({
                        contentList: res.data.data.content
                    })
                  }
            })
        } 
    }

    //弹出框
    showModal = () => {
        this.setState({
            visible:true
        })
    }
    hideModal = () => {
        this.setState({
            visible:false
        })
    }
    render(){
    const templateList = this.state.reportTypeList.map((item,index) => {
        return <li onClick={this.checkType.bind(this,item.type)} 
               style={this.state.type === item.type ?{color:BLUES}:{color:'#000'}}
               key={index}
               >{item.name}</li>
    });
    const contentList = this.state.contentList.map((item,index) => {
        return <li key = {index} className="cont normal" onClick= {this.checkTemplate.bind(this,item.id,item.reportType)}> 
                <img src={'http://119.90.61.155/om31/'+item.imagepath} alt=""/>
                <p>{item.name}</p>
                </li> 
    })
         return (
             <div className="choose-template">
                <div className="choose-template-title" style={{background:GRAY}}>
                   <span>请选择报告模板</span>
                   <Input onChange = {this.change} value={this.state.searchValue} placeholder="搜索模板名称"
                   onKeyDown = {this.keydown}
                   />
                </div>
                <div className="template-list">
                  <span>模板类型:</span>
                  <ul>
                      {templateList}
                  </ul>               
                </div>
                <div className="template-content">
                 <ul>
                      {contentList}
                 </ul>                
                </div>
             </div>
         )
    }
}

export default ChooseTemplate;