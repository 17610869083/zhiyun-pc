import React from 'react';
import './MyReport.less';
import {Input,DatePicker,Button,message} from 'antd';
import {api_get_all_report} from '../../services/api';
import request from '../../utils/request';
import IconFont from '../../components/IconFont';
import img from '../../assets/img/1.png';
import {getLocalTime} from '../../utils/format';
class MyReport extends React.Component{
     constructor(props){
         super(props);
         this.state = {
            typeList:[],
            contentList:[],
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
            index:0,
            contentIndex:'1',
            editReprotName:'1',
         }
     }
     componentWillMount(){
        request(api_get_all_report)
        .then( res => {
            if(res.data.code === 1){
            let typeList = [] ;    
            res.data.data.repotTypeList.forEach(item => {
                typeList.push({type:item,name:this.state.typeKeyList[item]}) 
            });
            this.setState({
                contentList: res.data.data.pageBean.content,
                typeList:typeList 
            })  
        }
        })
    }
    changeType(index,type){ 
       this.setState({
           index:index
       })
    }
    changeReport(index,id){
        this.setState({
           contentIndex:index 
        })
    }
    editReportName(reportid,reportname,e){
        this.setState({
            editReprotName:reportid,
            inputValue:reportname
        })
    }
    blur(reportid,e){
        if(this.state.inputValue === ''){
            message.success('报告名称不可为空')
            return;
        }
        this.setState({
            editReprotName:''
        })
    }
    changeReportName(e){
        let {value} = e.target;
        this.setState({
            inputValue:value
        })
    }
     render(){
         const typeList = this.state.typeList.map( (item,index) => {
             return <li key = {index} 
             style={this.state.index === index ?{color:'#6893ff'}:{color:'#000'}}
             onClick = {this.changeType.bind(this,index,item.type)}
             >{item.name}</li>
         })
         const contentList = this.state.contentList.map( (item,index) => {
             return <li key = {index} 
             className={this.state.contentIndex === index ?'cont active':'cont normal'}
             > 
             <img src={img} alt="" onClick = {this.changeReport.bind(this,index,item.id)}/>
             {
             this.state.editReprotName === item.id ? <input autoFocus='autofocus' value={this.state.inputValue} onChange={this.changeReportName.bind(this)} onBlur = {this.blur.bind(this,item.id)}/>:
             <p title="双击可修改名称" onDoubleClick={this.editReportName.bind(this,item.id,item.reportName)} style={{userSelect:'none'}} >{item.reportName}</p>
            }
             <p style={{marginBottom:'6px'}}>{getLocalTime(item.updateTime)} 
             {item.status === '2' ?<IconFont className="status" type="icon-queren"/>:<IconFont className="status" type="icon-weiwancheng"/>}
             </p>
             </li> 
         }) 
         return (
             <div className="my-report">
             <div className="my-report-top">
             <div className="my-add-report">
                 <span>+&nbsp;&nbsp;新建报告</span>
                 <span>导入报告</span>
             </div>
             <div className="my-search-report">
                 <Input placeholder="请输入报告名称或报告类型" className="input-search"/>
                 <span className="time">生成时间</span>
                 <DatePicker/>
                 <span className="time">一</span>
                 <DatePicker/>
                 <Button style={{marginLeft:'18px'}}>搜索</Button>
             </div>
             </div>
             <div className="my-report-type">
              <ul className="my-report-type-list">
                  <li>报告类型:</li>
                  {typeList}
              </ul>
             </div>
             <div className="my-report-content">
             <p>
             <IconFont type="icon-fuzhi1"/>
             <IconFont type="icon-msnui-download"/>
             <IconFont type="icon-shanchu1-copy-copy"/>
             <IconFont type="icon-Dashboard-card-SQLchakan"/> 
             </p>
             <div className="content">
              <ul>
                  {contentList}
              </ul>
             </div>
             </div>
             </div>
         )
     }
}
export default MyReport;