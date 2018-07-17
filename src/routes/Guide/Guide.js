import React from 'react';
class Guide extends React.Component{
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
            <iframe src="http://yd.is8.com.cn/" width="100%" style={{border:'none',height:`${this.state.innerHeight}px`}} security="restricted" sandbox="allow-scripts"></iframe>
            </div>
          )
      }
}
export default Guide;