import React from 'react';
import './MediaDistribution.less';
import IconFont from '../../components/IconFont';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import {Icon} from 'antd';
import {GRAY,BLACK,BLUES} from '../../utils/colors';
class MediaDistribution extends React.Component{
    delmediaDistributionBox(){
        this.props.delMediaDistributionBox(1);
    }
    render(){
        const {data} = this.props;
				const mediaOption= {
					tooltip: {
						trigger: 'item',
						formatter: "{b}: {c} ({d}%)",
					},
					series: [
						{
							type:'pie',
						},
						{
							name:'访问来源',
							type:'pie',
							radius: ['42%', '55%'],
							color: ['#8378ea', '#37a2da', '#e7bcf3', '#fb7293','#ffa07f','#ffdc5c','#9fe6b8'],
							label: {
								normal: {
									formatter: '{b}\n{d}%'
								},
							},
							data: data.series!==undefined?data.series[0].data:[],
						}
					]
        };     
        return (
            <div className="mediaDistribution-box">
            <div className="container">
            <div className="top" style={{background:GRAY}}>
                <div className="title">
                    <IconFont type="icon-fenbutu" style={{fontSize: '22px',color:BLUES}}/>
                    <span className="txt" style={{color:BLACK}}>媒体分布</span>
                </div>
                <div className="more">
                        <Icon type="close-circle" className="delModule"
                         style={this.props.status==='setting'?{visibility:'visible',fontSize: '18px',color:BLUES}:{'visibility':'hidden'}}
                         onClick={this.delmediaDistributionBox.bind(this)}
                        ></Icon>
                </div>
            </div>
                        <ReactEchartsCore
                            echarts={echarts}
                            option={mediaOption}
                            lazyUpdate={true}
                            style={{height:'400px'}}
                        />
            </div>
            </div>
        )
    }
}
export default MediaDistribution;
