import React from 'react';
import {connect} from 'react-redux';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import {history} from '../../utils/history';
import {Icon} from 'antd';
import './OpinionCountBox.less';
import {BLACK,BLUES} from '../../utils/colors';
import {api_count_charts,api_count_opinion} from '../../services/api';
import request from '../../utils/request';
import {formatOpinionCount} from '../../utils/format';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
class OpinionCountBox extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            mediaList:{
                'APP':'app',
                '博客':'blog',
                '平媒':'medium',
                '微信':'wechat',
                '微博':'weibo',
                '新闻':'news',
                '论坛':'forum'
            },
            data:[],
            charts:{}
    }
 }
    goAllOpinion() {
        history.push({
            pathname: '/allopinion?datetag=all'
        });
    }
    delOpinionCountBox(){
        this.props.delCountBox(1);
    }
    goMedia(media,day){
        console.log(media)
        console.log(day)
        if(media === '数据来源'){
            console.log(1)
        }else{
            console.log(2)
        }
    //   history.push({
    //     pathname: `/allopinion?media=${this.state.mediaList[media]}&datetag=${day}`
    // });
    }
    componentDidMount(){
        request(api_count_opinion)
        .then((res) => {
          this.setState({
            data: formatOpinionCount(res.data).opinionCountArr
          });
          request(api_count_charts +`&data=${JSON.stringify(res.data.all)}`)
          .then(res => {
              console.log(res.data.pic)
              this.setState({
                 charts:res.data.pic
              })
          })
        })
    }
    //改变饼图
    changeChart(type){
      console.log(type)
    }
    render() {
        const {themeColor} = this.props;
        const more = this.props.status!=='setting'?<span style={{color:BLACK}} onClick={this.goAllOpinion.bind(this)}>更多 
        <IconFont type="icon-jiantou" style={{color: '#9b9b9b',fontSize: '16px',marginLeft:'6px'}}/>
        </span>:<Icon type="close-circle" className="delModule" style={{fontSize: '18px',color:BLUES}}
        onClick={this.delOpinionCountBox.bind(this)}
        ></Icon>;
        const mediaOption= {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)",
            },
            legend:{
                data:["APP","博客","平媒","微信","微博","新闻","论坛"],
                itemGap:20,
                orient:"vertical",
                x:'right',
                padding:[60,70,0,0],
            },
            series: [
                {
                    type:'pie',
                },
                {
                    name:'载体',
                    type:'pie',
                    radius: ['42%', '55%'],
                    center:['40%','60%'],
                    color: ['#8378ea', '#37a2da', '#e7bcf3', '#fb7293','#ffa07f','#ffdc5c','#9fe6b8'],
                    label: {
                        normal: {
                            formatter: '{b}\n{d}%'
                        },
                    },
                    data: this.state.charts.series!==undefined?this.state.charts.series[0].data:[],
                }
            ]
        };    
        return (
            <div className="opinion-count-box" style={{background:themeColor.bottomColor.backgroundColor}}>
                <div className="container">
                    <div className="top" style={{borderBottom: `1px solid ${themeColor.borderColor.color}`}}>
                        <div className="title">
                            <IconFont type="icon-tongji" style={{fontSize: '28px',color:BLUES,verticalAlign:'-8px'}}/>
                            <span className="txt" style={{color:BLACK}}>舆情统计</span>
                            {/* <span className="txt" style={{color:BLACK}}>信息统计</span> */}
                        </div>
                        <div className="more">
                              {more}
                        </div>
                    </div>
                    <div className="bottom">
                        <table className="count-table">
                            <tbody>
                            {this.state.data.length > 1 ?
                                this.state.data.map((item, index) =>
                                <tr key={index} className="item">
                                    <td style={{borderRight: `1px solid  ${themeColor.borderColor.color}`,borderBottom: `1px solid  ${themeColor.borderColor.color}`}} >{item[0]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer',borderRight: `1px solid  ${themeColor.borderColor.color}`,borderBottom: `1px solid  ${themeColor.borderColor.color}`}} onClick = {this.goMedia.bind(this,item[0],'today')}>{item[1]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer',borderRight: `1px solid  ${themeColor.borderColor.color}`,borderBottom: `1px solid  ${themeColor.borderColor.color}`}} onClick = {this.goMedia.bind(this,item[0],'7day')}>{item[2]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer',borderRight: `1px solid  ${themeColor.borderColor.color}`,borderBottom: `1px solid  ${themeColor.borderColor.color}`}} onClick = {this.goMedia.bind(this,item[0],'30day')}>{item[3]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer',borderRight: `1px solid  ${themeColor.borderColor.color}`,borderBottom: `1px solid  ${themeColor.borderColor.color}`}} onClick = {this.goMedia.bind(this,item[0],'all')}>{item[4]}</td>
                                </tr>) : <tr><td><BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/sortedopinion/addrule">添加</a>关键词</span>'/></td></tr>
                            }
                            </tbody>
                        </table>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={mediaOption}
                            lazyUpdate={true}
                            style={{height: '310px', width: '40%', marginBottom: '-20px'}}
                            />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      themeColor: state.changeThemeReducer
    }
  };
export default  connect(mapStateToProps, null)(OpinionCountBox);