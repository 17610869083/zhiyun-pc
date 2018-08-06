import React from 'react';
class UpReport extends React.Component{
   constructor(){
       super();
       this.state = {
        innerHeight:700
       }
   }
   componentWillMount(){
    this.setState({
        innerHeight:window.innerHeight
    })
}
   render(){
       return (
           <div>
              <iframe src="http://hualong.v6plus.com/login" title="上报平台" width="100%" style={{border:'none',height:`${this.state.innerHeight}px`}}></iframe>
           </div>
       )
   }
}
export default UpReport;