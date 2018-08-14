import React from 'react';
import './TopicReportEcharts.less';
import {Row, Col,Button,Modal} from 'antd';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import {connect} from 'react-redux';
import {reportMessage} from '../../../redux/actions/createActions';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/pictorialBar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';
import request from '../../../utils/request';
import {api_topic_table,api_topic_timeline,api_topic_global,api_topic_trendOption,api_topic_mediaType,
    api_topic_mediaSite,api_topic_mediaTypeTrend,api_topic_negativeMedia,
    api_topic_export_word,api_saveimg_serives,api_negtive_global,api_topic_essay,
} from '../../../services/api';
import Store from '../../../redux/store/index';
import {history} from '../../../utils/history';
import {objectToURL,topicLengend} from '../../../utils/format';
class TopicReportEcharts extends React.Component {
    constructor() {
        super();
        this.state={
                totalData:{},
                todayData:{},
                timelineArr:[],
                num:0,
                num2:120,
                topicGlobal:{},
                trendOptionData:[],
                mediaTypeData:[],
                mediaSiteData:{},
                mediaTypeTrendData:{},
                negativeMediaData:{},
                topicId:1,
                negativeGlobal:[],
                topicEssay:{},
                downloadVisible:false
            }
        }
        componentDidMount(){
            if( Store.getState().getRouterReducer.topicid){
             let topicID= Store.getState().getRouterReducer;
              request(api_topic_table,{
                     method:'POST',
                     headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                     },
                     body:`topicid=${topicID.topicid}`
              }).then(res=>{           
                    if(res.data){
                        this.setState({
                            todayData:res.data[0],
                            totalData:res.data[1],
                            topicId:topicID.topicid
                        })
                    }
                    
              });
              request(api_topic_timeline,{
                method:'POST',
                headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`topicid=${topicID.topicid}`
                }).then(res=>{
                     this.setState({
                        timelineArr:res.data.line
                     })
                });
    
                request(api_topic_global,{
                    method:'POST',
                    headers: {
                       "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:`topicid=${topicID.topicid}`
                    }).then(res=>{
                         if(res.data){
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
                        body:`topicid=${topicID.topicid}`
                        }).then(res=>{
                            if(res.data){
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
                            body:`topicid=${topicID.topicid}`
                            }).then(res=>{
                                if(res.data){
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
                                body:`topicid=${topicID.topicid}`
                                }).then(res=>{
                                    if(res.data){
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
                                    body:`topicid=${topicID.topicid}`
                                    }).then(res=>{
                                        if(res.data){
                                            this.setState({
                                                mediaTypeTrendData:res.data
                                            })
                                        }
                                    }); 
                                    
                        request(api_topic_negativeMedia,{
                                        method:'POST',
                                        headers: {
                                               "Content-Type": "application/x-www-form-urlencoded"
                                        },
                                        body:`topicid=${topicID.topicid}`
                                        }).then(res=>{
                                            if(res.data){
                                                this.setState({
                                                    negativeMediaData:res.data
                                                })
                                            }
                                 });   
                                 request(api_negtive_global,{
                                    method:'POST',
                                    headers: {
                                           "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    body:`topicId=${topicID.topicid}`
                                }).then(res=>{
                                    if(res.data){
                                        this.setState({
                                            negativeGlobal:res.data
                                        })
                                     }
                                     
                                })
                                request(api_topic_essay +'&topicId='+topicID.topicid).then(res=>{
                                    if(res.data){
                                      this.setState({
                                            topicEssay:res.data
                                      })

                                  }
                           })
                                 

            }
            if(this.echarts_react){      
                let echarts_instance = this.echarts_react.getEchartsInstance();
                let base64 =encodeURIComponent(echarts_instance.getDataURL('png'));
                 request(api_saveimg_serives,{
                    method:'POST',
                    headers: {
                           "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:`a=${base64}&f=tqxxfxbChart&topicid=${this.state.topicId}`    
                 }).then(res=>{
                    if(this.echartsMediaOption){
                        let echarts_instance = this.echartsMediaOption.getEchartsInstance();
                        let base64 =encodeURIComponent(echarts_instance.getDataURL('png'));
                         request(api_saveimg_serives,{
                            method:'POST',
                            headers: {
                                   "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body:`a=${base64}&f=tmtlxChart&topicid=${this.state.topicId}`    
                         }).then(res=>{
                            if(this.echartsMediaSiteOption){
                                let echarts_instance = this.echartsMediaSiteOption.getEchartsInstance();
                                let base64 =encodeURIComponent(echarts_instance.getDataURL('png'));
                                 request(api_saveimg_serives,{
                                    method:'POST',
                                    headers: {
                                           "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    body:`a=${base64}&f=twzphChart&topicid=${this.state.topicId}`    
                                 }).then(res=>{
                                    if(this.echartsMediaTypeTrendOption){
                                        let echarts_instance = this.echartsMediaTypeTrendOption.getEchartsInstance();
                                        let base64 =encodeURIComponent(echarts_instance.getDataURL('png'));
                                         request(api_saveimg_serives,{
                                            method:'POST',
                                            headers: {
                                                   "Content-Type": "application/x-www-form-urlencoded"
                                            },
                                            body:`a=${base64}&f=tmtqxxChart&topicid=${this.state.topicId}`    
                                         }).then(res=>{
                                            if(this.echartsTopicTotalGlobal){
                                                let echarts_instance = this.echartsTopicTotalGlobal.getEchartsInstance();
                                                let base64 =encodeURIComponent(echarts_instance.getDataURL('png'));
                                                 request(api_saveimg_serives,{
                                                    method:'POST',
                                                    headers: {
                                                           "Content-Type": "application/x-www-form-urlencoded"
                                                    },
                                                    body:`a=${base64}&f=tqxxfxChart&topicid=${this.state.topicId}`    
                                                 }).then(res=>{
                                                        if(this.echartsNegativeGlobal){
                                                            let echarts_instance = this.echartsNegativeGlobal.getEchartsInstance();
                                                            let base64 =encodeURIComponent(echarts_instance.getDataURL('png'));
                                                             request(api_saveimg_serives,{
                                                                method:'POST',
                                                                headers: {
                                                                       "Content-Type": "application/x-www-form-urlencoded"
                                                                },
                                                                body:`a=${base64}&f=tfmyqqsChart&topicid=${this.state.topicId}`    
                                                             }).then(res=>{
                                                                if(this.echartsTopicEssay){
                                                                    let echarts_instance = this.echartsTopicEssay.getEchartsInstance();
                                                                    let base64 =encodeURIComponent(echarts_instance.getDataURL('png'));
                                                                     request(api_saveimg_serives,{
                                                                        method:'POST',
                                                                        headers: {
                                                                               "Content-Type": "application/x-www-form-urlencoded"
                                                                        },
                                                                        body:`a=${base64}&f=twzqsChart&topicid=${this.state.topicId}`   
                                                                     })
                                                                 }
                                                            })
                                                        }  
                                                 })
                                             }
                                         })
                                     }
                                 })
                             }
                         })
                        }                     
                    })      
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
        goExportWord(){
            this.setState({
                downloadVisible:true
            })
        }
        downloadHandleOk(){
            this.setState({
                downloadVisible:false
            })
            let report= Store.getState().topicReportReducer;
            request(api_topic_export_word,{
                method: 'POST',
                headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                }, 
                body:objectToURL(report)
            }).then(res=>{
                  this.props.reportMessage({id:1,type:'2'});
                  history.push({
                      pathname:'/allopinion/historyopinion',
                      search:'type=2'
                  });
            })
        }
        downloadHandleCancel(){
            this.setState({
                downloadVisible:false
            })
        }
        goBack= () =>{
              history.go(-1);
        }
        //统计分析
        topicTotalGlobal(){
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
                data:this.state.topicGlobal.series?topicLengend(this.state.topicGlobal.series):[]
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
        return totalOption;
    }
        // 专题倾向性分析
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
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    data: this.state.trendOptionData.length!==0?topicLengend(this.state.trendOptionData):[]
                },
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

        // 专题媒体类型分析
        mediaOption(){    
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
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    data: this.state.mediaTypeData.length!==0?topicLengend(this.state.mediaTypeData):[],
                },
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
            return mediaOption;

            
        }
        // 专题媒体网站分布
        mediaSiteOption(){
            const mediaSiteOption = {
                color: ['#C23531'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend:{
                  data:this.state.mediaSiteData.series ? topicLengend(this.state.mediaSiteData.series):[]
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
            return mediaSiteOption

            
        }

        // 专题媒体类型倾向性分布
        mediaTypeTrendOption(){
            const mediaTypeTrendOption = {
                legend:{
                    show:true,
                    orient: 'horizontal',
                    left: 'center',
                    data:this.state.mediaTypeTrendData.series?topicLengend(this.state.mediaTypeTrendData.series):[]
                },
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
            return mediaTypeTrendOption;
        }


       // 负面媒体分布
        negativeMediaOption(){
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
                return negativeMediaOption;

               
        }
        //负面舆情日增趋势
        negativeGlobal(){
            const negativetotalOption = {
                tooltip: {
                    trigger: 'category',
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
                    data:this.state.negativeGlobal.series?topicLengend(this.state.negativeGlobal.series):[]
                },
                xAxis: [
                    {
                        type: 'category',
                        data:this.state.negativeGlobal.xAxis?this.state.negativeGlobal.xAxis[0].data:[],
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
                series: this.state.negativeGlobal.series?this.state.negativeGlobal.series:[]
            };
            return negativetotalOption;
        }
        //专题文章趋势分析
        topicEssayOption(){
            const topicEssayOption = {
                tooltip: {
                    trigger: 'category',
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
                    data:this.state.topicEssay.series?topicLengend(this.state.topicEssay.series):[]                    
                },
                xAxis: [
                    {
                        type: 'category',
                        data:this.state.topicEssay.xAxis?this.state.topicEssay.xAxis[0].data:[],
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
                series: this.state.topicEssay.series?this.state.topicEssay.series:[]
            };
            return topicEssayOption;
        }
        render() {
            return (
                <div className="topReportEcharts">
                    <div className="reportEcharts">
                    <div>请等待专题图表自动在后台生成完毕，再进行另存为word操作</div>     
                      <div className="floatButton">
                      <Button type="primary" onClick={this.goExportWord.bind(this)}>另存为word</Button>
                      <Button type="primary" onClick={this.goBack}>返回</Button>
                      </div>
                    </div>
                    <Row>
                        <Col span={24}>
                        <div  className="echartsBox"> 
                        <div className="chartTitle">专题倾向性分析</div> 
                            <ReactEchartsCore
                                echarts={echarts}
                                option={this.topicTotalGlobal()}
                                lazyUpdate={true}
                                ref={(e) => { this.echartsTopicTotalGlobal = e; }}
                            />
                        </div> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <div  className="echartsBox"> 
                        {/* <div className="chartTitle">负面舆情日增趋势</div>  */}
                        <div className="chartTitle">重点舆情日增趋势</div> 
                            <ReactEchartsCore
                                echarts={echarts}
                                option={this.negativeGlobal()}
                                lazyUpdate={true}
                                ref={(e) => { this.echartsNegativeGlobal = e; }}
                            />
                        </div> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <div  className="echartsBox">
                        <div className="chartTitle">专题文章趋势分析</div> 
                            <ReactEchartsCore
                                echarts={echarts}
                                option={this.topicEssayOption()}
                                lazyUpdate={true}
                                ref={(e) => { this.echartsTopicEssay = e; }}
                            />
                            </div> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>   
                            <div  className="echartsBox">                 
                            <div className="chartTitle">专题媒体类型分布</div>
                            <ReactEchartsCore
                                echarts={echarts}
                                option={this.mediaOption()}
                                lazyUpdate={true}
                                ref={(e) => { this.echartsMediaOption = e; }}
                            />
                            </div>
                        </Col>
                    </Row>   
                    <Row> 
                        <Col span={24}>
                        <div  className="echartsBox">
                        <div className="chartTitle">专题媒体网站分布</div>
                            <ReactEchartsCore
                                echarts={echarts}
                                option={this.mediaSiteOption()}
                                lazyUpdate={true}
                                ref={(e) => { this.echartsMediaSiteOption = e; }}
                            />
                            </div>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={24}>
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
                        </Row>
                        <Row>
                        <Col span={24}>
                        <div  className="echartsBox">
                        <div className="chartTitle">专题媒体类型倾向性分析</div> 
                            <ReactEchartsCore
                                echarts={echarts}
                                option={this.mediaTypeTrendOption()}
                                lazyUpdate={true}
                                ref={(e) => { this.echartsMediaTypeTrendOption = e; }}
                            />
                            </div> 
                        </Col>
                    </Row>
                <Modal
                  title="下载"
                  visible={this.state.downloadVisible}
                  onOk={this.downloadHandleOk.bind(this)}
                  onCancel={this.downloadHandleCancel.bind(this)}
                  cancelText='留在此页'
                > 
                <p>是否去下载</p>
                </Modal>
               
                </div>
            )
        }
    }
    const mapDispatchToProps = dispatch => {
        return {
            reportMessage:data=>{
                dispatch(reportMessage(data));
            }
        }
    };
export default connect(null, mapDispatchToProps)(TopicReportEcharts);