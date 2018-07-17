import React from 'react';
import './CustomHome.less';
import IcontFont from '../../components/IconFont';
//import request from '../../utils/request';
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
    }
    drop = () => {
       
    }
    dragenter = () => {
     
    }
    dragleave = () => {
   
    }
    mousedown(e){
       let cloneNode = e.target.cloneNode(true);
        cloneNode.style.position = 'absolute';
        cloneNode.style.left = '500px';
        cloneNode.style.top = '500px';
        cloneNode.style.opacity = 0.5;
        document.body.appendChild(cloneNode);
    }
    mousemove(){
        // cloneNode.style.left = eve.clientX-50+'px';
        // cloneNode.style.top = eve.clientY-50+'px';
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
            <div className="custom-home">
            <div onDrop={this.drop}   onDragEnter={this.dragenter} onDragLeave = {this.dragleave} className="drop-container">
                 
            </div>
            <div className="slider-module"
            style={this.state.flag?{top:this.state.browserHeight + 'px',height:'50px'}:{top:this.state.browserHeight-418 + 'px',height:'500px'}}>
            <p className="slider-switch" onClick = {this.showList}></p>
            <ul className="slider-module-list" >
                <li  onMouseDown={this.mousedown.bind(this)}
                onMouseMove={this.mousemove.bind(this)}
                >1</li>
                <li draggable="true">2</li>
                <li draggable="true">3</li>
                <li draggable="true">4</li>
                <li draggable="true">5</li>
                <li draggable="true">6</li>
                <li draggable="true">7</li>
                <li draggable="true">8</li>
            </ul>
            </div>
            </div>
        )
    }
}
export default CustomHome