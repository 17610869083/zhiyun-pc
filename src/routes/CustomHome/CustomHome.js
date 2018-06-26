import React from 'react';
import './CustomHome.less';
import IcontFont from '../../components/IconFont';
import request from '../../utils/request';
class CustomHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
         browserHeight:800,
         flag:true,
         moduleList:[
             {name:'预警舆情',defaultSize:50,img:''},
             {name:'负面舆情',defaultSize:50,img:''},
             {name:'最新舆情',defaultSize:50,img:''},
             {name:'专题舆情',defaultSize:50,img:''},
             {name:'微博舆情',defaultSize:50,img:''},
             {name:'今日统计',defaultSize:40,img:''},
             {name:'媒体分布',defaultSize:40,img:''},
             {name:'相关热词',defaultSize:30,img:''},
             {name:'舆情走势',defaultSize:60,img:''},
             {name:'舆情统计',defaultSize:100,img:''},
         ],
         moduleCont:[]
        }
    }
    componentDidMount(){
        this.setState({
            browserHeight:window.innerHeight-110
        })
    }
    showList = () => {
        console.log('test')
        this.setState({
            flag:!this.state.flag
        })       
    }
    dragover(e) {
      e.preventDefault();
    //   console.log(e.currentTarget)
    }
    drop(e){
        console.log(123)
        e.preventDefault();
        console.log(123)
    }
    dragenter(){
        console.log(11)
    }
    dragstart(defaultSize){
       console.log(defaultSize)
    }
    dragend(defaultSize,name){
        this.setState({
            moduleCont:this.state.moduleCont.concat({name:name,defaultSize:defaultSize-2})
        })
    }
    render(){
        let num = (this.state.browserHeight+110)/3 +'px';
        let moduleList = this.state.moduleList.map ((item,index) => {
            return  <li key = {index} onDragStart = {this.dragstart.bind(this,item.defaultSize)}
                     draggable="true" onDragOver = {this.dragover.bind(this)}
                    onDragEnd= {this.dragend.bind(this,item.defaultSize,item.name)}
                    >
                    {item.name}
                    </li>
        });
        let moduleCont = this.state.moduleCont.map ((item,index) => {
            return  <li key = {index} className="moduleCont" style={{width:item.defaultSize+'%'}}>{item.name}</li>
        })
        return (
            <div className="custom-home" >
                <div className="custom-title">首页布局设置</div>   
                <div style={{height:this.state.browserHeight+'px',overflowY: 'auto'}}
                onDrop = {this.drop.bind(this)}
                onDragEnter = {this.dragenter.bind(this)}>   
                    <ul>
                        {moduleCont}
                    </ul>    
                </div>     
                <div className="slider-module"
                style={this.state.flag?{bottom:'0px',height:'50px'}:{bottom:'0px',height:num}}>
                <div className="slider-switch" onClick = {this.showList}>
                    <IcontFont type="icon-caidanshousuoicon" ></IcontFont>
                </div>
                <ul className="slider-module-list" >
                   {moduleList}
                </ul>
                </div>
            </div>
        )
    }
}
export default CustomHome