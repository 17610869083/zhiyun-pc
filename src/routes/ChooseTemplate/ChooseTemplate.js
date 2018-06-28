import React from 'react';
import {GRAY,BLUES} from '../../utils/colors';
import './ChooseTemplate.less';
import {api_get_template_report} from '../../services/api';
import request from '../../utils/request';
import {Input} from 'antd';
import img from '../../assets/img/1.png';
import {history} from '../../utils/history';
class ChooseTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reportTypeList:[],
            typeIndex:0,
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
        }
    }
    checkType (index,type) {
          this.setState({
            typeIndex:index
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
    checkTemplate (index) {
          this.setState({
            contentIndex:index
          })
          history.push('/reporttemplate')
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
                res.data.data.repotTypeList.forEach(item => {
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

    keydown = (e) => {
        if(e.keyCode === 13){

        } 
    }
    render(){
    const templateList = this.state.reportTypeList.map((item,index) => {
        return <li onClick={this.checkType.bind(this,index,item.type)} 
               style={this.state.typeIndex === index ?{color:BLUES}:{color:'#000'}}
               key={index}
               >{item.name}</li>
    });
    const contentList = this.state.contentList.map((item,index) => {
        return <li key = {index} className={this.state.contentIndex === index ?'cont active':'cont normal'}
               onClick= {this.checkTemplate.bind(this,index,item.reportType)}
               > 
                <img src={img} alt=""/>
                <p>{item.name}</p>
                </li> 
    })
         return (
             <div className="choose-template">
                <div className="choose-template-title" style={{background:GRAY}}>
                   <span>请选择报告模板</span>
                   <Input onChange = {this.change} value={this.state.searchValue} placeholder="搜索模板名称、模板类型"
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