import React from 'react';
    class Situational extends React.Component{
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
                <iframe src="http://119.90.158.98:8888/auth/login/" width="100%" style={{border:'none',height:`${this.state.innerHeight}px`}} security="restricted" sandbox="allow-scripts"></iframe>
                </div>
             )
         }
    }
    export default Situational;