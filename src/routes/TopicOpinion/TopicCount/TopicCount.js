import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Table} from 'antd';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import './TopicCount.less';
import {topicLengend} from '../../../utils/format'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/pictorialBar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import request from '../../../utils/request';
import {api_topic_table,api_topic_timeline,api_topic_global,api_topic_trendOption,api_topic_mediaType,
        api_topic_mediaSite,api_topic_mediaTypeTrend,api_topic_negativeCarry,api_topic_negativeMedia} from '../../../services/api';
class TopicCount extends React.Component {
    constructor() {
        super();
        this.state = {
            media: [
                {
                    type: 'all',
                    name: '全部',
                    num: 66666
                },    
                {
                    type: 'news',
                    name: '新闻',
                    num: 66666
                },
                {
                    type: 'forum',
                    name: '论坛',
                    num: 66666
                },
                {
                    type: 'blog',
                    name: '博客',
                    num: 66666
                },
                {
                    type: 'weibo',
                    name: '微博',
                    num: 66666
                },
                {
                    type: 'weixin',
                    name: '微信',
                    num: 66666
                },
                {
                    type: 'pinmei',
                    name: '平媒',
                    num: 66666
                },
                {
                    type: 'app',
                    name: 'APP',
                    num: 66666
                },
                {
                    type: 'outside',    
                    name: '境外',
                    num: 66666
                },
                {
                    type: 'comprehensive',
                    name: '综合',
                    num: 66666
                },
                {
                    type: 'video',
                    name: '视频',
                    num: 66666
                }
            ],
            totalData:{},
            todayData:{},
            timelineArr:[],
            num:0,
            num2:120,
            topicGlobal:{},
            trendOptionData:[],
            mediaTypeData:[],
            mediaSiteData:[],
            mediaTypeTrendData:[],
            negativeCarryData:[],
            negativeMediaData:[]
        }
    }
    componentDidMount(){
        let topic = this.props.getRouterReducer;
        if(topic.topicid){
          request(api_topic_table,{
                 method:'POST',
                 headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                 },
                 body:`topicid=${topic.topicid}`
          }).then(res=>{         
                if(res.data&&res.data.code!==0){
                    this.setState({
                        todayData:res.data['CarryCount'][0],
                        totalData:res.data['CarryCount'][1]
                    })
                } 
          });
          request(api_topic_timeline,{
            method:'POST',
            headers: {
               "Content-Type": "application/x-www-form-urlencoded"
            },
            body:`topicid=${topic.topicid}`
            }).then(res=>{
                 if(res.data.code!==0){
                 this.setState({
                    timelineArr:res.data.line
                 })
                }
            });

            request(api_topic_global,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`topicid=${topic.topicid}`
                }).then(res=>{
                     if(res.data.code!==0){
                         this.setState({
                               topicGlobal:res.data
                         })
                     }
                });
                
                request(api_topic_trendOption,{
                    method:'POST',
                    headers: {
                       "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:`topicid=${topic.topicid}`
                    }).then(res=>{
                        if(res.data.code!==0){
                            this.setState({
                                trendOptionData:res.data.series[0].data
                            })
                        }
                    });
                    
                    request(api_topic_mediaType,{
                        method:'POST',
                        headers: {
                           "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body:`topicid=${topic.topicid}`
                        }).then(res=>{
                            if(res.data.code!==0){
                                this.setState({
                                    mediaTypeData:res.data.series[0].data
                                })
                            }
                        });
                    
                    request(api_topic_mediaSite,{
                            method:'POST',
                            headers: {
                               "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body:`topicid=${topic.topicid}`
                            }).then(res=>{
                                if(res.data.code!==0){
                                    this.setState({
                                        mediaSiteData:res.data
                                    })
                                }
                            });
                            
                    request(api_topic_mediaTypeTrend,{
                                method:'POST',
                                headers: {
                                   "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body:`topicid=${topic.topicid}`
                                }).then(res=>{
                                    if(res.data && res.data.code!==0){
                                        this.setState({
                                            mediaTypeTrendData:res.data
                                        })
                                    }
                                }); 
                                
                    request(api_topic_negativeCarry,{
                                    method:'POST',
                                    headers: {
                                       "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    body:`topicid=${topic.topicid}`
                                    }).then(res=>{
                                        if( res.data && res.data.code!==0){
                                            this.setState({
                                                negativeCarryData:res.data
                                            })
                                        }
                                    }); 
                    request(api_topic_negativeMedia,{
                                    method:'POST',
                                    headers: {
                                           "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    body:`topicid=${topic.topicid}`
                                    }).then(res=>{
                             
                                        if(res.data.code!==0){
                                            this.setState({
                                                negativeMediaData:res.data
                                            })
                                        }
                                    });           
        }
     
    }
    leftMove(e){
      this.setState({
          num:this.state.num+100,
          num2:this.state.num2+700
       },()=>{
        this.refs.LineBody.style.cssText='margin-left:'+this.state.num2+'px';
        if(this.state.num2>-2680){
            this.refs.RightBtn.style.visibility="visible";
        }
        if(this.state.num2>=120){
            this.refs.LeftBtn.style.visibility="hidden"; 
        }
       })


    }
    rightMove(e){
        this.setState({
            num:this.state.num-100,
            num2:this.state.num2-700
        },()=>{
            this.refs.LineBody.style.cssText='margin-left:'+this.state.num2+'px';
            if(this.state.num2<120){
                this.refs.LeftBtn.style.visibility="visible"; 
            }
            if(this.state.num2<-1980){
                 this.refs.RightBtn.style.visibility="hidden";
            }
        })
    }
    getOption(){    
         const trendOption = {
            title : {
                text: '',
                subtext: '',
                x:''
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                right:30,
                feature: {
                restore:{
                    show:true,
                    title:'还原'
                },
                magicType: {
                show: true,
                type: [
                "pie"
                ]
                },
                dataView: {
                show: true,
                title: "数据视图",
                readOnly: true,
                lang: [
                "数据视图",
                "关闭"
                ],
                optionToContent: function(opt) {
                var series = opt.series;
                var table = '<div style="height:1px;"></div><table style="width:100%;border:1px solid #c5c5c5;text-align:center;font-size:11px;"><tbody><tr>'
                for (var i = 0, l = series[0].data.length; i < l; i++) {
                    table += '<tr>'
                            + '<td>' + series[0].data[i].name + '</td>'
                            + '<td>' + series[0].data[i].value + '</td>'
                            + '</tr>';
                }
                table += '</tbody></table>';
                return table;
            }
                },
                saveAsImage: {
                show: true,
                title: "保存为图片",
                type: "png",
                lang: [
                "点击保存"
                ]
                }
                },
                    show: true
                    },
            // legend: {
            //     orient: 'horizontal',
            //     left: 'center',
            //     data: this.state.trendOptionData.length!==0?topicLengend(this.state.trendOptionData):[],
            // },

            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:this.state.trendOptionData.length!==0?this.state.trendOptionData:[],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return  trendOption
    }
    render() {
        // 整体分析
        const totalOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                right:30,
                feature: {
                    dataView: {
                        show: true, readOnly: false               
                    },
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:[]
            },
            xAxis: [
                {
                    type: 'category',
                    data:this.state.topicGlobal.xAxis?this.state.topicGlobal.xAxis[0].data:[],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: this.state.topicGlobal.series?this.state.topicGlobal.series:[]
        };
        // 专题倾向性分析

        // 专题媒体类型分析
        const mediaOption = {
            title : {
                text: '',
                subtext: '',
                x:''
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            //color:['#ff73a9','#ff73a9','#ffb96a','#499bff','#5bcf3c','#2fdce0','#52c6ff'],
            toolbox: {
                right:30,
                feature: {
                re :{
                    show:true,
                    title:'还原'
                },
                magicType: {
                show: true,
                type: [
                "pie"
                ]
                },
                dataView: {
                show: true,
                title: "数据视图",
                readOnly: true,
                lang: [
                "数据视图",
                "关闭"
                ],
                optionToContent: function(opt) {
                var series = opt.series;
                var table = '<div style="height:1px;"></div><table style="width:100%;border:1px solid #c5c5c5;text-align:center;font-size:11px;"><tbody><tr>'
                for (var i = 0, l = series[0].data.length; i < l; i++) {
                    table += '<tr>'
                            + '<td>' + series[0].data[i].name + '</td>'
                            + '<td>' + series[0].data[i].value + '</td>'
                            + '</tr>';
                }
                table += '</tbody></table>';
                return table;
            }
                },
                saveAsImage: {
                show: true,
                title: "保存为图片",
                type: "png",
                lang: [
                "点击保存"
                ]
                }
                },
                    show: true
                    },
            // legend: {
            //     orient: 'horizontal',
            //     left: 'center',
            //     data: this.state.mediaTypeData.length!==0?topicLengend(this.state.mediaTypeData):[],
            // },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:this.state.mediaTypeData.length!==0?this.state.mediaTypeData:[],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // 专题媒体网站分布
        const mediaSiteOption = {
            color: ['#C23531'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            toolbox: {
                right:30,
                feature: {
                restore:{
                    show:true,
                    title:'还原'
                },
                magicType: {
                show: true,
                type: [
                "pie"
                ]
                },
                dataView: {
                show: true,
                title: "数据视图",
                readOnly: true,
                lang: [
                "数据视图",
                "关闭"
                ],
                optionToContent: function(opt) {
                var series = opt.series;
                var table = '<div style="height:1px;"></div><table style="width:100%;border:1px solid #c5c5c5;text-align:center;font-size:11px;"><tbody><tr>'
                for (var i = 0, l = series[0].data.length; i < l; i++) {
                    table += '<tr>'
                            + '<td>' + series[0].data[i].name + '</td>'
                            + '<td>' + series[0].data[i].value + '</td>'
                            + '</tr>';
                }
                table += '</tbody></table>';
                return table;
            }
                },
                saveAsImage: {
                show: true,
                title: "保存为图片",
                type: "png",
                lang: [
                "点击保存"
                ]
                }
                },
                    show: true
                    },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : this.state.mediaSiteData.xAxis?this.state.mediaSiteData.xAxis[0].data:[],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine:{"lineStyle":{"color":"#333333"}}
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : this.state.mediaSiteData.xAxis?this.state.mediaSiteData.series:[],
        };
        // 专题媒体类型倾向性分布
        const mediaTypeTrendOption = {
            title: {
                text: '',
                subtext: '',
                sublink: ''
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    var tar = params[1];
                    return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                }
            },
            // legend: {
            //     orient: 'horizontal',
            //     left: 'center',
            //     data: this.state.mediaTypeTrendData.length!==0?topicLengend(this.state.mediaTypeTrendData.series):[],
            // },   
            toolbox: {
                right:30,
                feature: {
                restore:{
                    show:true,
                    title:'还原'
                },
                magicType: {
                show: true,
                type: [
                "pie"
                ]
                },
                dataView: {
                show: true,
                title: "数据视图",
                readOnly: true,
                lang: [
                "数据视图",
                "关闭"
                ],
                optionToContent: function(opt) {
                var series = opt.series;
                var table = '<div style="height:1px;"></div><table style="width:100%;border:1px solid #c5c5c5;text-align:center;font-size:11px;"><tbody><tr>'
                for (var i = 0;i<series.length;i++) {
                    table +='<td>' + series[i].name + '</td>'                           
                }
                table+='</tr>';
                    for(var k=0;k<series[0].data.length;k++){
                        table +='<tr>';
                        for(var j=0;j<series.length;j++){
                        table+='<td>'+series[j]['data'][k]+'</td>';
                        }
                        table +='</tr>';
                    }
                table += '</tbody></table>';
                return table;
            }
                },
                saveAsImage: {
                show: true,
                title: "保存为图片",
                type: "png",
                lang: [
                "点击保存"
                ]
                }
                },
                    show: true
                    },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type : 'category',
                splitLine: {show:false},
                data :this.state.mediaTypeTrendData.xAxis?this.state.mediaTypeTrendData.xAxis[0].data:[]
            },
            yAxis: {
                type : 'value'
            },
            series:this.state.mediaTypeTrendData.xAxis?this.state.mediaTypeTrendData.series:[]
        };
        // 负面载体分布
        const negativeCarryOption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            // legend: {
            //     orient: 'horizontal',
            //     left: 'center',
            //     data: this.state.negativeCarryData.length!==0?topicLengend(this.state.negativeCarryData.series[0]['data']):[],
            // },
            //color:['#ff73a9','#ff73a9','#ffb96a','#499bff','#5bcf3c','#2fdce0','#52c6ff'],
            toolbox: {
                right:30,
                feature: {
                restore:{
                    show:true,
                    title:'还原'
                },
                magicType: {
                show: true,
                type: [
                "pie"
                ]
                },
                dataView: {
                show: true,
                title: "数据视图",
                readOnly: true,
                lang: [
                "数据视图",
                "关闭"
                ],
                optionToContent: function(opt) {
                var series = opt.series;
                var table = '<div style="height:1px;"></div><table style="width:100%;border:1px solid #c5c5c5;text-align:center;font-size:11px;"><tbody><tr>'
                for (var i = 0, l = series[0].data.length; i < l; i++) {
                    table += '<tr>'
                            + '<td>' + series[0].data[i].name + '</td>'
                            + '<td>' + series[0].data[i].value + '</td>'
                            + '</tr>';
                }
                table += '</tbody></table>';
                return table;
            }
                },
                saveAsImage: {
                show: true,
                title: "保存为图片",
                type: "png",
                lang: [
                "点击保存"
                ]
                }
                },
                    show: true
                    },
            series:this.state.negativeCarryData.series?this.state.negativeCarryData.series:[]
        };
        // 负面媒体分布
        const  negativeMediaOption = {
            title : {
                text: '',
                subtext: '',
                x:''
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            toolbox: {
                right:30,
                feature: {
                restore:{
                    show:true,
                    title:'还原'
                },
                magicType: {
                show: true,
                type: [
                "pie"
                ]
                },
                dataView: {
                show: true,
                title: "数据视图",
                readOnly: true,
                lang: [
                "数据视图",
                "关闭"
                ],
                optionToContent: function(opt) {
                var series = opt.series;
                var table = '<div style="height:1px;"></div><table style="width:100%;border:1px solid #c5c5c5;text-align:center;font-size:11px;"><tbody><tr>'
                for (var i = 0, l = series[0].data.length; i < l; i++) {
                    table += '<tr>'
                            + '<td>' + series[0].data[i].name + '</td>'
                            + '<td>' + series[0].data[i].value + '</td>'
                            + '</tr>';
                }
                table += '</tbody></table>';
                return table;
            }
                },
                saveAsImage: {
                show: true,
                title: "保存为图片",
                type: "png",
                lang: [
                "点击保存"
                ]
                }
                },
                    show: true
                    },
            series :this.state.negativeMediaData.series?this.state.negativeMediaData.series:[]
            };
        const columns = [{
            title: '全部',
            dataIndex: 'all',
            key: 'all',
            className:'White',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }, {
            title: '新闻',
            dataIndex: 'news',
            key: 'news',
            className:'White',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }, {
            title: '论坛',
            dataIndex: 'forum',
            key: 'forum',
            className:'White',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }, {
            title: '博客',
            dataIndex: 'blog',
            key: 'blog',
            className:'White',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }, {
            title: '微博',
            dataIndex: 'weibo',
            key: 'weibo',
            className:'White',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }, {
            title: '微信',
            className:'White',
            dataIndex: 'weixin',
            key: 'weixin',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }, {
            title: '平媒',
            dataIndex: 'pinmei',
            className:'White',
            key: 'pinmei',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }, {
            title: 'APP',
            dataIndex: 'app',
            className:'White',
            key: 'app',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }, {
            title: '境外',
            dataIndex: 'outside',
            className:'White',
            key: 'outside',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }, {
            title: '综合',
            dataIndex: 'comprehensive',
            key: 'comprehensive',
            className:'White',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }, {
            title: '视频',
            dataIndex: 'video',
            className:'White',
            key: 'video',
            render: text => <span style={{color:'#108ee9'}}>{text}</span>
        }
    ];     
        const dataSource = [{
            key: '1',
            all: '今日新增',
            forum:this.state.todayData.docForum_value!==undefined?this.state.todayData.docForum_value:0,
            news:this.state.todayData.docNews_value!==undefined?this.state.todayData.docNews_value:0,
            weibo:this.state.todayData.docWeibo_value!==undefined?this.state.todayData.docWeibo_value:0,
            weixin:this.state.todayData.docWeixin_value!==undefined?this.state.todayData.docWeixin_value:0,
            pinmei:this.state.todayData.docPingmei_value!==undefined?this.state.todayData.docPingmei_value:0,
            app:this.state.todayData.docApp_value!==undefined?this.state.todayData.docApp_value:0,
            blog:this.state.todayData.docBlog_value!==undefined?this.state.todayData.docBlog_value:0,
            outside:this.state.todayData.docAbroad_value!==undefined?this.state.todayData.docAbroad_value:0,
            comprehensive:this.state.todayData.docSearch_value!==undefined?this.state.todayData.docSearch_value:0,
            video:this.state.todayData.docVideo_value!==undefined?this.state.todayData.docVideo_value:0
        },{
            key: '2',
            all: '总量',
            forum:this.state.totalData.docForum_value!==undefined?this.state.totalData.docForum_value:0,
            news:this.state.totalData.docNews_value!==undefined?this.state.totalData.docNews_value:0,
            weibo:this.state.totalData.docWeibo_value!==undefined?this.state.totalData.docWeibo_value:0,
            weixin:this.state.totalData.docWeixin_value!==undefined?this.state.totalData.docWeixin_value:0,
            pinmei:this.state.totalData.docPingmei_value!==undefined?this.state.totalData.docPingmei_value:0,
            app:this.state.totalData.docApp_value!==undefined?this.state.totalData.docApp_value:0,
            blog:this.state.totalData.docBlog_value!==undefined?this.state.totalData.docBlog_value:0,
            outside:this.state.totalData.docAbroad_value!==undefined?this.state.totalData.docAbroad_value:0,
            comprehensive:this.state.totalData.docSearch_value!==undefined?this.state.totalData.docSearch_value:0,
            video:this.state.totalData.docVideo_value!==undefined?this.state.totalData.docVideo_value:0
        }
    ];

        const timeLineHead=this.state.timelineArr&&this.state.timelineArr.map((item,index)=>
                 <li key={index}>{item.carry}</li>
       )
       const timeLineBody=this.state.timelineArr&&this.state.timelineArr.map((item,index)=>
       <li key={index}>
           <div>
           <p>{item.pubdate}</p>
           {item.title}
           <a href="javasrcipt:;">来源：{item.source}</a>
           </div>
       </li>
       )
        return (
            <div className="topic-count-part">
                <Row>
                    <Col span={24}>
                        <div className="overview">
                            <div className="titleBlue">
                                基本情况
                            </div>
                            <Table columns={columns} 
                                   dataSource={dataSource}
                                   pagination={false}  className="showTable"/>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px',marginBottom:'6px'}}>
                    <Col span={24} className="backWhite">
                        <div className="titleBlue">源头分析
                        </div>
                        <div className="lineBox">
                        <div className="leftBtn" onClick={this.leftMove.bind(this)} ref="LeftBtn"></div>
                        <div className="rightBtn" onClick={this.rightMove.bind(this)} ref="RightBtn"></div>
                        <ul className="lineHead" ref="LineHead">
                        {timeLineHead}
                        </ul>
                        <ul className="lineBody" ref="LineBody">
                        {timeLineBody}
                        </ul>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="backWhite">
                        <div className="titleBlue">整体分析</div>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={totalOption}
                            lazyUpdate={true}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="echartsBox">
                        <div className="chartTitle" >专题倾向性分析</div>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={this.getOption()}
                            lazyUpdate={true}

                            ref={(e) => { this.echarts_react = e; }}
                        />
                        </div>
                    </Col>
                    
                    <Col span={12}>   
                        <div  className="echartsBox">                 
	                    <div className="chartTitle">专题媒体类型分布</div>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={mediaOption}
                            lazyUpdate={true}
                        />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div  className="echartsBox">
                    <div className="chartTitle">专题媒体网站分布</div>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={mediaSiteOption}
                            lazyUpdate={true}
                        />
                        </div>
                    </Col>
                    
                    <Col span={12}>
                    <div  className="echartsBox">
                    <div className="chartTitle">专题媒体类型倾向性分析</div> 
                        <ReactEchartsCore
                            echarts={echarts}
                            option={mediaTypeTrendOption}
                            lazyUpdate={true}
                        />
                        </div> 
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div  className="echartsBox"> 
                    {/* <div className="chartTitle">负面载体分布</div>  */}
                    <div className="chartTitle">重点载体分布</div> 
                        <ReactEchartsCore
                            echarts={echarts}
                            option={negativeCarryOption}
                            lazyUpdate={true}
                        />
                        </div> 
                    </Col>
                    
                    <Col span={12}>
                    <div  className="echartsBox"> 
                    {/* <div className="chartTitle">负面媒体分布</div>  */}
                    <div className="chartTitle">重点媒体分布</div> 
                        <ReactEchartsCore
                            echarts={echarts}
                            option={negativeMediaOption}
                            lazyUpdate={true}
                        />
                    </div> 
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      getRouterReducer: state.getRouterReducer,
    }
  };
export default connect(mapStateToProps, null)(TopicCount);