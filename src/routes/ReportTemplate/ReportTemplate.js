import React from 'react';
import Swiper from './swiper';
import './ReportTemplate.less';
import './swiper.css';
import {GRAY} from '../../utils/colors'
import {Input,Button} from 'antd';
import {api_get_template_report} from '../../services/api';
import request from '../../utils/request';
import img from '../../assets/img/1.png';
import {history} from '../../utils/history';

class ReportTemplate extends React.Component{
      constructor(){
          super()
          this.state={
              templateType:[],
              templateIndex:0,
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
            contentList:[]
          }
        }  
        componentWillMount(){ 
            if(this.props.location.search ){
            let typeList = [];
            let search = this.props.location.search.split('&');
            request(api_get_template_report + `&reportType=${search[0].split('=')[1]}`)
            .then( res => {
                if(res.data.code === 1){     
                    res.data.data.repotTypeList.forEach(item => {
                        typeList.push({type:item,name:this.state.typeKeyList[item]}) 
                    });
                    this.setState({
                        contentList: res.data.data.pageBean.content,
                        templateType:typeList
                    })  
              }
            })
          }
        }
        componentDidUpdate(){
             if(this.state.templateType.length !== 0){
                new Swiper('.swiper-container', {
                    slidesPerView: 6.5,
                    spaceBetween: 30,
                    grabCursor:true,
                    scrollbar: {
                        el: '.swiper-scrollbar'
                    }
                })
            }
        }
        checkTemplate(index){
             this.setState({
                templateIndex:index
             })
        }
        onBriefing = () => {
					history.push('/briefing')          
        }
       render(){
          const templateType = this.state.templateType.map( (item,index) => {
                return <li className={this.state.templateIndex === index ? 'template-type template-type-active':'template-type'} 
                       key={index} onClick={this.checkTemplate.bind(this,index)}>{item.name}</li>
          } )

          const slideList = this.state.contentList.map( (item,index) => {
                return <div className="swiper-slide cont" key = {index}>
                       <img src={img} alt=""/>
                       <p>{item.name}</p>
                       </div>
          })
          return (
              <div className="report-template">
                  <div className="report-template-title" style={{background:GRAY}}>
                  <p style={{fontSize:'18px'}}>请选择报告模板</p>
                  <p>
                  <Input placeholder="请输入模板名称或模板类型"/>
                  </p>
                  </div>
                  <div className="report-template-type">
                      <span>模板类型：</span>
                      <ul>
                          {templateType}
                      </ul>
                  </div>
                  <div className="template-swiper">
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      {slideList}
                    </div>
                    <div className="swiper-scrollbar"></div>
                  </div> 
                  </div>
                  <div className="report-preview">
                      <div className="report-title" style={{background:GRAY}}>
                        <span>报告预览</span>
                        <Button type="primary" onClick={this.onBriefing.bind(this)}>确定模板</Button>
                      </div>
                  </div>
              </div>
            )
      }
}
export default ReportTemplate;