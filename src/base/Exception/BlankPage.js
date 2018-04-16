import React from 'react';
import alone from './../../assets/icon-img/alone.png';
import './BlankPage.less';
//import default from '../../../node_modules/_antd@2.13.10@antd/lib/notification';
class Blank extends React.Component{
      render(){          
           const desc=this.props.desc;
           return(
             <div className="blank-page-wrapper">
            <div className="img-wrapper">
                <img
                    src={alone}
                    alt="blank img"
                    className="blank-img"
                />
                <p className="desc" dangerouslySetInnerHTML={{__html: desc}}></p>
            </div>           
        </div>               
           )
      }
}
export default Blank;