import React from 'react';
class Evidence extends React.Component {
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
              <iframe src="http://103.94.42.70:5000/" width="100%" style={{border:'none',height:`${this.state.innerHeight}px`}}></iframe>
            </div>
        )
    }
}
export default Evidence;