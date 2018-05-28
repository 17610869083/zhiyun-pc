import React from 'react';
import IconFont from '../../components/IconFont';
import './HotWordBox.less';
import WordCloud from 'react-d3-cloud';
import {Icon} from 'antd';
import {GRAY,BLACK,BLUES} from '../../utils/colors';
class HotWordBox extends React.Component{
    delHotWordBox(){
          this.props.delHotWordBox(1)
    }
    render(){
        const fontSizeMapper = word => Math.log2(word.value) * 2;
        const rotate = word => word.value % 120;
        const {data} = this.props;
         return(
            <div className="hotWord-box">
                    <div className="container">
                    <div className="top" style={{background:GRAY}}>
                        <div className="title">
                            <IconFont type="icon-recigengxin" style={{fontSize: '21px',color:BLUES}}/>
                            <span className="txt" style={{color:BLACK}}>相关热词</span>
                        </div>
                        <div className="more">
                        <Icon type="close-circle" className="delModule"
                         style={this.props.status==='setting'?{visibility:'visible',fontSize: '18px',color:BLUES}:{'visibility':'hidden'}}
                         onClick={this.delHotWordBox.bind(this)}
                        ></Icon>
                        </div>
                    </div>
                    <div className="wordCloud">
                        <WordCloud
                        data={data}
                        fontSizeMapper={fontSizeMapper}
                        rotate={rotate}
                        width={400}
                        height={400}
                        />
                    </div>
                    </div>
            </div>
          )
    }
}
export default HotWordBox;
