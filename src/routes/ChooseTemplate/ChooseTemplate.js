import React from 'react';
import {GRAY,BLUES} from '../../utils/colors';
import './ChooseTemplate.less';
class ChooseTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reportType:['全部','专报','日报'],
            typeIndex:0,
            contentList:['全部','专报','日报']
        }
    }
    checkType (index) {
          this.setState({
            typeIndex:index
          })
    }
    checkTemplate () {
    }
    render(){
    const templateList = this.state.reportType.map((item,index) => {
        return <li onClick={this.checkType.bind(this,index)} 
               style={ this.state.typeIndex === index ?{color:BLUES}:{color:'#000'}}
               key={index}
               >{item}</li>
    });
    const contentList = this.state.contentList.map((item,index) => {
        return <li key={index} onDoubleClick = {this.checkTemplate.bind(this)}>{item}</li>
    })
         return (
             <div className="choose-template">
                <div className="choose-template-title" style={{background:GRAY}}>
                   <span>请选择报告模板</span>
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