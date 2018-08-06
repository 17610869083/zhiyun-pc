import React from 'react';
import alone from './../../assets/icon-img/alone.png';
import blank from './../../assets/icon-img/blank.png';
import './BlankPage.less';
class Blank extends React.Component{
      render(){          
           const desc=this.props.desc;
           const status = this.props.status;
           return(
             <div className="blank-page-wrapper">
            <div className="img-wrapper">
                <img
                    src={status?alone:blank}
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