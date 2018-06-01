import React from 'react';
import Swiper from 'swiper';
import './ReportTemplate.less';
import './swiper.css';
import {GRAY} from '../../utils/colors'
import {Input,Button} from 'antd';
import Drag from '../Drag/Drag';
class ReportTemplate extends React.Component{
      constructor(){
          super()
          this.state={
              templateType:['年报','日报'],
              templateIndex:0
          }
        }  
        componentDidMount(){
             new Swiper('.swiper-container', {
                slidesPerView: 7.5,
                spaceBetween: 30,
                grabCursor:true,
                scrollbar: {
                    el: '.swiper-scrollbar'
                    //hide: true,
                  }
              })
        }
        checkTemplate(index){
             this.setState({
                templateIndex:index
             })
        }
      render(){
          const templateType = this.state.templateType.map( (item,index) => {
                return <li className={this.state.templateIndex === index ? 'template-type template-type-active':'template-type'} 
                       key={index} onClick={this.checkTemplate.bind(this,index)}>{item}</li>
          } )
          return (
              <div className="report-template">
                  <div className="report-template-title" style={{background:GRAY}}>
                  <p>请选择报告模板</p>
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
                    <div className="swiper-slide">Slide 1</div>
                    <div className="swiper-slide">Slide 2</div>
                    <div className="swiper-slide">Slide 3</div>
                    <div className="swiper-slide">Slide 4</div>
                    <div className="swiper-slide">Slide 5</div>
                    <div className="swiper-slide">Slide 6</div>
                    <div className="swiper-slide">Slide 7</div>
                    <div className="swiper-slide">Slide 8</div>
                    <div className="swiper-slide">Slide 9</div>
                    <div className="swiper-slide">Slide 10</div>
                    </div>
                    <div className="swiper-scrollbar"></div>
                  </div> 
                  </div>
                  <div className="report-preview">
                      <div className="report-title" style={{background:GRAY}}>
                        <span>报告预览</span>
                        <Button type="primary">确定模板</Button>
                      </div>
                  </div>
                  <Drag/>
              </div>
            )
      }
}
export default ReportTemplate;