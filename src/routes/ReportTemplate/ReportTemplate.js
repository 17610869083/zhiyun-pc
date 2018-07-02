import React from 'react';
import Swiper from './swiper';
import './ReportTemplate.less';
import './swiper.css';
import {GRAY} from '../../utils/colors'
import {Input,Button} from 'antd';
import {api_get_template_report,api_search_template} from '../../services/api';
import request from '../../utils/request';
import img from '../../assets/img/1.png';
import {history} from '../../utils/history';
import {templateTypeSort} from '../../utils/format';
class ReportTemplate extends React.Component{
      constructor(){
          super()
          this.state={
              templateTypeList:[],
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
            contentList:[],
            templateId:0,
						reportType:'00',
						templateType: ""
          }
        }  
        componentWillMount(){ 
            if(this.props.location.search ){
            let typeList = [];
            let search = this.props.location.search.split('&');
            let templateType = search[0].split('=')[1];
            let templateId = parseInt(search[1].split('=')[1],10);
            request(api_get_template_report + `&reportType=${templateType}`)
            .then( res => {
                if(res.data.code === 1){     
                    templateTypeSort(res.data.data.reportTypeList).forEach(item => {
                        typeList.push({type:item,name:this.state.typeKeyList[item]}) 
                    });
                    this.setState({
                        contentList: res.data.data.pageBean.content,
                        templateTypeList:typeList,
                        templateType:templateType,
                        templateId:templateId
                    })  
              }
            })
          }
        }
        componentDidUpdate(){
             if(this.state.templateTypeList.length !== 0){
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
        checkTemplateType(type){
             this.setState({
                templateType:type
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
        checkTemplate(id, type){
            this.setState({
                templateId:id,
                reportType:type
             })
        }
        onBriefing = () => {
					console.log(this.state.templateType)
					history.push(`/briefing?type=${this.state.templateType}&id=${this.state.templateId}`)          
        }
        //搜索模板
        keydown = (e) => {
            if(e.keyCode === 13) {
                request(api_search_template +`&reportType=${this.state.templateType}&formName=${e.target.value}`)
                .then( res => {
                      if(res.data.code === 1){
                        this.setState({
                            contentList: res.data.data.content
                        })
                      }
                })
            }
        }
       render(){
          const templateType = this.state.templateTypeList.map( (item,index) => {
                return <li className={this.state.templateType === item.type ? 'template-type template-type-active':'template-type'} 
                       key={index} onClick={this.checkTemplateType.bind(this,item.type)}>{item.name}</li>
          } )

          const slideList = this.state.contentList.map( (item,index) => {
                return <div className={this.state.templateId === item.id? 'swiper-slide cont active':'swiper-slide cont normal'} 
                       key = {index} onClick = {this.checkTemplate.bind(this,item.id,item.reportType)}>
                       <img src={img} alt=""/>
                       <p>{item.name}</p>
                       </div>
          })
          return (
              <div className="report-template">
                  <div className="report-template-title" style={{background:GRAY}}>
                  <p style={{fontSize:'18px'}}>请选择报告模板</p>
                  <p>
                  <Input placeholder="请输入模板名称" onKeyDown={this.keydown}/>
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
                      <div className="report-content">   
                      <iframe width="80%" height="90%" title="模板预览" frameBorder="0" 
                      src="http://119.90.61.155/om31/document/work/贵州省舆情简报_137_.html" />    
                      </div>
                  </div>
              </div>
            )
      }
}
export default ReportTemplate;