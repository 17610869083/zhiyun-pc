import React from 'react';
class Guard extends React.Component{
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
            <iframe src="http://situation.jzz.aoyasafe.com/web/index.html" title="网站防护" width="100%" style={{border:'none',height:`${this.state.innerHeight}px`}} security="restricted" sandbox="allow-scripts"></iframe>
            </div>
          )
      }
}
export default Guard;