import React from 'react';
import './CustomHome.less';
class CustomHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
         browserHeight:800,
         flag:true
        }
    }
    componentDidMount(){
        this.setState({
            browserHeight:window.innerHeight-110
        })
    }
    showList = () => {
        this.setState({
            flag:!this.state.flag
        })       
    }
    dragOver = (e) => {
      e.preventDefault();
      console.log(e.currentTarget)
    }
    render(){
        return (
            <div className="custom-home">
            <div>
                
            </div>
            <div className="slider-module"
            style={this.state.flag?{top:this.state.browserHeight + 'px',height:'50px'}:{top:this.state.browserHeight-418 + 'px',height:'500px'}}>
            <p className="slider-switch" onClick = {this.showList}></p>
            <ul className="slider-module-list" >
                <li draggable="true" onDragOver = {this.dragOver}>1</li>
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