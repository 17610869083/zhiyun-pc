import React from 'react';
import {connect} from 'react-redux';
import IconFont from '../../components/IconFont';
import BlankPage from '../../base/Exception/BlankPage';
import {history} from '../../utils/history';
import {Icon} from 'antd';
import './OpinionCountBox.less';
import {BLUES} from '../../utils/colors';
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
            }
    }
 }
    goAllOpinion() {
        history.push({
            pathname: '/allopinion/allopiniondetail?datetag=all'
        });
    }
    delOpinionCountBox(){
        this.props.delCountBox(1);
    }
    goMedia(media,day,type){
        if(media === '数据来源'){
         this.props.changeChart(type)
        }else{
           history.push({
            pathname: `/allopinion/allopiniondetail?media=${this.state.mediaList[media]}&datetag=${day}`
           });
        }
    }
    render() {
        const {themeColor,opinionCount,data,legend,series} = this.props;
        const more = this.props.status!=='setting'?<span onClick={this.goAllOpinion.bind(this)}> 
        <IconFont type="icon-gengduo" style={{color: '#9b9b9b',fontSize: '16px',marginLeft:'6px'}}/>
        </span>:<Icon type="close-circle" className="delModule" style={{fontSize: '18px',color:BLUES}}
        onClick={this.delOpinionCountBox.bind(this)}
        ></Icon>;
        const mediaOption= {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)",
            },
            legend:{
                data:legend,
                itemGap:20,
                orient:"vertical",
                x:'right',
                padding:[60,70,0,0],
                textStyle:{
                    color:themeColor.textColor.color
                }
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
                    data: series ? series:[{name: "APP", value: 0}, {name: "博客", value: 0}, {name: "平媒", value: 0}, {name: "微信", value: 0},{name: "微博", value: 0},{name: "新闻", value: 0},{name: "论坛", value: 0}]
                }
            ]
        };   
        return (
            <div className="opinion-count-box" style={{background:themeColor.bottomColor.backgroundColor}}>
                <div className="container">
                    <div className="top" style={{borderBottom: `1px solid ${themeColor.borderColor.color}`}}>
                        <div className="title">
                            <IconFont type="icon-tongji" style={{fontSize: '20px',color:BLUES,verticalAlign:'-8px'}}/>
                            <span className="txt" style={{color:themeColor.textColor.color}}>舆情统计</span>
                            {/* <span className="txt" style={{color:BLACK}}>信息统计</span> */}
                        </div>
                        <div className="more">
                              {more}
                        </div>
                    </div>
                    <div className="bottom">
                        <table className="count-table" style={{color:themeColor.textColor.color}}>
                            <tbody>
                            {data.length > 1 ?
                                data.map((item, index) =>
                                <tr key={index} className="item">
                                    <td style={{borderRight: `1px solid  ${themeColor.borderColor.color}`,borderBottom: `1px solid  ${themeColor.borderColor.color}`}} >{item[0]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer',borderRight: `1px solid  ${themeColor.borderColor.color}`,borderBottom: `1px solid  ${themeColor.borderColor.color}`}} onClick = {this.goMedia.bind(this,item[0],'today','today')}>{item[1]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer',borderRight: `1px solid  ${themeColor.borderColor.color}`,borderBottom: `1px solid  ${themeColor.borderColor.color}`}} onClick = {this.goMedia.bind(this,item[0],'7day','week')}>{item[2]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer',borderRight: `1px solid  ${themeColor.borderColor.color}`,borderBottom: `1px solid  ${themeColor.borderColor.color}`}} onClick = {this.goMedia.bind(this,item[0],'30day','month')}>{item[3]}</td>
                                    <td title="点击可查看具体数据" style={{cursor:'pointer',borderRight: `1px solid  ${themeColor.borderColor.color}`,borderBottom: `1px solid  ${themeColor.borderColor.color}`}} onClick = {this.goMedia.bind(this,item[0],'all','all')}>{item[4]}</td>
                                </tr>) : <tr><td><BlankPage desc='<span>空空如也，赶紧去<a href="index.html#/allopinion/sortedopinion/addrule">添加</a>关键词</span>'/></td></tr>
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