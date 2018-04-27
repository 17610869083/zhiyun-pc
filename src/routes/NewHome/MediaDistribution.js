import React from 'react';
import './MediaDistribution.less';
import IconFont from '../../components/IconFont';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import {Icon} from 'antd';

class MediaDistribution extends React.Component{
    delmediaDistributionBox(){
        this.props.delMediaDistributionBox(1);
    }
    render(){
        const {data} = this.props;
        const mediaOption= {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            grid:{
                left:'20%',
                top : '2%',
                bottom: 10
                },
            series: [
                {
                    name:'总量',
                    type:'pie',
                    radius: ['40%', '55%'],
                    label: {
                        normal: {
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 16,
                                    align: 'center'
                                },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 16
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data:data.series!==undefined?data.series[0].data:[]
                }
            ]
        };
        return (
            <div className="mediaDistribution-box">
            <div className="container">
            <div className="top">
                <div className="title">
                    <IconFont type="icon-new" style={{fontSize: '18px'}}/>
                    <span className="txt">媒体分布</span>
                </div>
                <div className="more">
                        <Icon type="close-circle" className="delModule"
                         style={this.props.status==='setting'?{visibility:'visible',fontSize: '18px'}:{'visibility':'hidden'}}
                         onClick={this.delmediaDistributionBox.bind(this)}
                        ></Icon>
                </div>
            </div>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={mediaOption}
                            lazyUpdate={true}
                        />
            </div>
            </div>
        )
    }
}
export default MediaDistribution;
