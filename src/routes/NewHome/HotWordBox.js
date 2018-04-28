import React from 'react';
import IconFont from '../../components/IconFont';
import './HotWordBox.less';
import WordCloud from 'react-d3-cloud';
import {Icon} from 'antd';
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
                    <div className="top">
                        <div className="title">
                            <IconFont type="icon-new" style={{fontSize: '18px'}}/>
                            <span className="txt">相关热词</span>
                        </div>
                        <div className="more">
                        <Icon type="close-circle" className="delModule"
                         style={this.props.status==='setting'?{visibility:'visible',fontSize: '18px'}:{'visibility':'hidden'}}
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
                        height={300}
                        />
                    </div>
                    </div>
            </div>
          )
    }
}
export default HotWordBox;
