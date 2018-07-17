import React from 'react'
import IconFont from '../../components/IconFont'
import request from '../../utils/request'
import {history} from '../../utils/history'
import "./AppCenter.less"
class AppCenter extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            appList: [
                {
                    title: '舆情应用',
                    items: [
                        {type: 'icon-jiance-dianji', text: '舆情监测', color: '#4ba9eb', href: '/allopinion', hrefType: 'history'},
                        {type: 'icon-hanyu1', text: '韩语监测', color: '#f7b55d', href: '/multilingual/1', hrefType: 'history'},
                        {type: 'icon-riyu1', text: '日语监测', color: '#4ba9eb', href: '/multilingual/2', hrefType: 'history'},
                        {type: 'icon-logoxinjiang', text: '维语监测', color: '#6296f1', href: '/multilingual/3', hrefType: 'history'},
                        {type: 'icon-xicanga', text: '藏语监测', color: '#4ba9eb', href: '/multilingual/4', hrefType: 'history'},
                        {type: 'icon-yingyu', text: '英语监测', color: '#04c0b3'},
                        {type: 'icon-zhengjucailiao', text: '互联网取证', color: '#6296f1', href: '/evidence', hrefType: 'http'},
                        {type: 'icon-shangbao', text: '上报管理', color: '#4ba9eb', href: '/upreport', hrefType: 'http'},
                        {type: 'icon-minshengminqing', text: '民情管理', color: '#4ba9eb'},
                        {type: 'icon-pinglun', text: '网评管理', color: '#4ba9eb', href: '/guide', hrefType: 'http'}
                    ]
                },
                {
                    title: '安全应用',
                    items: [
                        // {type: 'icon-anquan', text: '安全态势感知', color: '#04c0b3'},
                        {type: 'icon-jiance', text: '网站监测预警', color: '#4ba9eb', href: 'https://114.242.25.234:38447/', hrefType: 'http'},
                        {type: 'icon--shujuzhiligongju', text: '网站安全治理', color: '#6296f1', href: 'https://119.88.190.68', hrefType: 'http'},
                        {type: 'icon-leidatance', text: '网站空间探测', color: '#04c0b3', href: 'https://119.88.190.71/', hrefType: 'http'},
                        {type: 'icon-fanghu', text: '网站安全防护', color: '#4ba9eb', href: 'http://situation.jzz.aoyasafe.com/web/index.html', hrefType: 'http'},
                        {type: 'icon-jiangmurubingdugongji', text: '僵木蠕监测', color: '#4ba9eb'},
                        {type: 'icon-zonghetongbao', text: '预警通报', color: '#f7b55d', href: 'http://114.242.25.234:30005/gxwhongce2/sec/toAutoBulletin', hrefType: 'http'},
                        // {type: 'icon-huandunicon-', text: '威胁情报', color: '#4ba9eb'},
                        // {type: 'icon-zidong', text: '自动通报', color: '#4ba9eb'},
                        // {type: 'icon-wangluofangcuangai', text: '网站防篡改', color: '#6296f1'},
                        {type: 'icon-zidong', text: '流量监测引擎', color: '#4ba9eb', href: 'https://119.88.190.68/', hrefType: 'http'}, // 图标   
                        {type: 'icon-zidong', text: '流量监测大屏', color: '#4ba9eb', href: 'http://119.88.190.68:3000/', hrefType: 'http'}, // 图标
                        {type: 'icon-zidong', text: '通报处置', color: '#4ba9eb', href: 'http://114.242.25.234:30005/gxwhongce2/sec/toBulletinWarning', hrefType: 'http'} // 图标
                    ]
                },
                {
                    title: '行业应用',
                    items: [
                        {type: 'icon-md-part-outline', text: '智慧党建', color: '#4ba9eb', href: 'http://dj.meiguansoft.cn/admin/login.html', hrefType: 'http'},
                        {type: 'icon-zixun', text: '行业资讯', color: '#4ba9eb', href: 'http://web.is8.com.cn/om/webpart/index.html#/home', hrefType: 'login'},
                        {type: 'icon-qingbao', text: '竞争情报', color: '#f7b55d', href: 'http://web.is8.com.cn/om/webpart/index.html#/topic/topiclist', hrefType: 'login'},
                        {type: 'icon-yupanjingzhengweixie', text: '决策预判', color: '#4ba9eb'},
                        {type: 'icon-zhaotoubiao1', text: '招投标', color: '#6296f1', href: '/bidding/information', hrefType: 'history'},
                        {type: 'icon-qiyehuaxiang', text: '企业画像', color: '#4ba9eb'},
                        {type: 'icon-huaxiang', text: '人物画像', color: '#6296f1'},
                        {type: 'icon-dianziweilanxitong', text: '微信围栏', color: '#4ba9eb', href: 'http://221.221.146.123:8888', hrefType: 'http'}
                    ]
                },
                {
                    title: '基础平台',
                    items: [
                        {type: 'icon-icon-siyouyuncunchu-', text: '私有云盘', color: '#04c0b3', href: 'http://pan.ryc360.com:108/kass/basic/login/page_login.jsp', hrefType: 'http'},
                        {type: 'icon-yunpingtaianquan', text: '华知云平台', color: '#6296f1', href: 'http://119.90.158.98:8888/auth/login/?next=/', hrefType: 'http'}
                    ]
                }
            ]
        }
    }

    /* TODO 
    
        通报处置     http://114.242.25.234:30005/gxwhongce2/sec/toBulletinWarning
    
    */
    hrefTo(href, hrefType) {
        // history.push('http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html')
        // console.log(window.location) //origin pathname
        // if(hrefType === 'login') {
        //     request('http://web.is8.com.cn/om/common/login/loginDo?action=login2&username=ryccs&password=ryccs').then((res) => {
        //         window.open(href)
        //     })
        // }else if (hrefType === 'history') {
        //     // history.push(href)
        //     window.open(window.location.origin + window.location.pathname + '#' + href)
        // }else if(hrefType === 'http') {
        //     // window.location.href = href
        //     window.open(href)
        // }
        history.push(href)
    }
    render () {
        return <div className="app-center">
                {this.state.appList.map((item, i) => {
                    return <dl key={i}>
                                <dt className="title">{item.title}</dt>
                                <div className="items">
                                    {item.items.map((iitem, ii) => {
                                        return <dd key={ii}>
                                                    <div className="content" onClick={this.hrefTo.bind(this, iitem.href, iitem.hrefType)}>
                                                        <div className="icon">
                                                            <div className="icon-font" style={{backgroundColor: iitem.color}}>
                                                                <IconFont type={iitem.type} style={{width: '100%', fontSize: '20px'}}></IconFont>
                                                            </div>
                                                        </div>
                                                        <div className="text">
                                                            {iitem.text}
                                                        </div>
                                                    </div>
                                                </dd>
                                    })}
                                </div>
                            </dl>
                })}
                    {/* <dl>
                        <dt className="title">舆情应用</dt>
                        <div className="items">
                            <dd>
                                <div className="content">
                                    <div className="icon">
                                        <IconFont type="icon-icon-shengchengbaogao"></IconFont>
                                    </div>
                                    <div className="text">
                                        舆情监测
                                    </div>
                                </div>
                            </dd>
                        </div>
                    </dl> */}
                </div>
    }
}
export default AppCenter