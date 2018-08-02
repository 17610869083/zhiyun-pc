import React from 'react';
import {connect} from 'react-redux';
import IconFont from '../../components/IconFont';
import './HotWordBox.less';
import {Icon} from 'antd';
import {BLUES} from '../../utils/colors';
import 'TagCloud';
class HotWordBox extends React.Component{
    delHotWordBox(){
          this.props.delHotWordBox(1)
    }
 
    componentDidUpdate(nextProps){
        if(nextProps.data.length !== 0){
           window.tagcloud({
              selector: ".tagcloud",  // 元素选择器
              fontsize: 18,       // 基本字体大小
              radius: 110,         // 滚动半径
              mspeed: "slow",   // 滚动最大速度
              ispeed: "slow",   // 滚动初速度
              direction: 135,     // 初始滚动方向
              keep: false          // 鼠标移出组件后是否继续随鼠标滚动
            })
        }
    }
    render(){
        const {data,themeColor} = this.props;
         return(
            <div className="hotWord-box" style={{background:themeColor.bottomColor.backgroundColor}}>
                    <div className="container">
                    <div className="top" style={{borderBottom: `1px solid ${themeColor.borderColor.color}`}}>
                        <div className="title">
                            <IconFont type="icon-recigengxin" style={{fontSize: '21px',color:BLUES}}/>
                            <span className="txt" style={{color:themeColor.textColor.color}}>相关热词</span>
                        </div>
                        <div className="more">
                        <Icon type="close-circle" className="delModule"
                         style={this.props.status==='setting'?{visibility:'visible',fontSize: '18px',color:BLUES}:{'visibility':'hidden'}}
                         onClick={this.delHotWordBox.bind(this)}
                        ></Icon>
                        </div>
                    </div>
                    <div className="wordCloud">
                    <div className="tagcloud tagcloud-light">
                        {data.map((item,index) => <span className="textcloud" key={index}>{item.text}</span>)}
                    </div>
                    </div>
                    </div>
            </div>
          )
    }
}
const mapStateToProps = state => {
    return {
      themeColor: state.changeThemeReducer
    }
  };
export default  connect(mapStateToProps, null)(HotWordBox);
