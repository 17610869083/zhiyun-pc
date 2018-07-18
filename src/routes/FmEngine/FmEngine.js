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
                <iframe src="https://119.88.190.68/" width="100%" style={{border:'none',height:`${this.state.innerHeight}px`}}></iframe>
                </div>
             )
         }
    }
    export default Situational;