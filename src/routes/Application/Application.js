import React from 'react';
class Application extends React.Component{
         constructor(){
             super();
             this.state = {
                innerHeight:700,
                src:'',
                list:{
                    '1':'http://103.94.42.70:5000/',
                    '2':'http://hualong.v6plus.com/login',
                    '3':'http://yd.is8.com.cn/',
                    '4':'http://situation.jzz.aoyasafe.com/web/index.html',
                    '5':'http://114.242.25.234:30005/gxwhongce2/sec/toAutoBulletin',
                    '6':'http://114.242.25.234:30005/gxwhongce2/sec/toBulletinWarning',
                    '7':'http://dj.meiguansoft.cn/admin/login.html',
                    '8':'http://221.221.152.240:8888',
                    '9':'http://pan.ryc360.com:108/kass/basic/login/page_login.jsp',
                    '10':'http://59.108.229.36:3000/'
                }
             }
         }
        componentWillMount(){
                this.setState({
                innerHeight:window.innerHeight,
                src:this.props.match.params.src
                })
        }
        componentDidUpdate(nextPorps){
            if(nextPorps !== this.props){
                this.setState({
                src:this.props.match.params.src
                })
            }
        }
         render(){
             let {list,src} = this.state;
             return (
                <div>
                <iframe src={list[src]} title="application" width="100%" style={{border:'none',height:`${this.state.innerHeight}px`}}></iframe>
                </div>
             )
         }
    }
    export default Application;