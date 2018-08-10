import React from 'react'
import IconFont from '../../components/IconFont'
// import request from '../../utils/request'
import {history} from '../../utils/history'
import "./AppCenter.less"
import android from '../../assets/img/android.png'
import ios from '../../assets/img/ios.png'
import fwh from '../../assets/img/fwh.jpg'
class AppCenter extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            appList: [
                {
                    title: '舆情应用',
                    items: [
                        {type: 'icon-jiance-dianji-copy', text: '舆情监测', color: '#4ba9eb', href: '/allopinion/allopiniondetail', hrefType: 'history'},
                        // {type: 'icon-hanyu2-copy', text: '韩语监测', color: '#f7b55d', href: '/multilingual/1', hrefType: 'history'},
                        // {type: 'icon-riyu1-copy', text: '日语监测', color: '#4ba9eb', href: '/multilingual/2', hrefType: 'history'},
                        // {type: 'icon-logoxinjiang1-copy', text: '维语监测', color: '#6296f1', href: '/multilingual/3', hrefType: 'history'},
                        // {type: 'icon-xicanga-copy', text: '藏语监测', color: '#4ba9eb', href: '/multilingual/4', hrefType: 'history'},
                        // {type: 'icon-yingyu', text: '英语监测', color: '#04c0b3'},
                        {type: 'icon-zhengjucailiao', text: '互联网取证', color: '#6296f1', href: '/evidence',src:'1', hrefType: 'http'},
                        {type: 'icon-shangbao', text: '上报管理', color: '#4ba9eb', href: '/upreport',src:'2', hrefType: 'http'},
                        {type: 'icon-minshengminqing', text: '民情管理', color: '#4ba9eb',href:'/allopinion/allopiniondetail',hrefType:'history'},
                        {type: 'icon-pinglun', text: '网评管理', color: '#4ba9eb', href: '/guide',src:'3', hrefType: 'http'}
                    ]
                },                   
                {
                    title: '安全应用',
                    items: [
                        // {type: 'icon-anquan', text: '安全态势感知', color: '#04c0b3'},
                        {type: 'icon-jiance', text: '网站监测预警', color: '#4ba9eb', href: 'https://114.242.25.234:38447/', hrefType: 'login'},
                        {type: 'icon--shujuzhiligongju', text: '网站安全治理', color: '#6296f1', href: 'https://119.88.190.68', hrefType: 'login'}, // ***
                        {type: 'icon-leidatance', text: '网站空间探测', color: '#04c0b3', href: 'https://119.88.190.71/', hrefType: 'login'},
                        {type: 'icon-fanghu', text: '网站安全防护', color: '#4ba9eb', href: '/competitiveIntelligence',src:'4', hrefType: 'http'},
                        // {type: 'icon-jiangmurubingdugongji-copy', text: '僵木蠕监测', color: '#4ba9eb', href: '/safetyprotection', src:'10',hrefType: 'http'},
                        {type: 'icon-zonghetongbao', text: '预警通报', color: '#f7b55d', href: '/alertnotifications', src:'5',hrefType: 'http'},
                        // {type: 'icon-huandunicon-', text: '威胁情报', color: '#4ba9eb'},
                        // {type: 'icon-zidong', text: '自动通报', color: '#4ba9eb'},
                        // {type: 'icon-wangluofangcuangai', text: '网站防篡改', color: '#6296f1'},
                        {type: 'icon-zidong', text: '流量监测引擎', color: '#4ba9eb', href: 'https://119.88.190.68/', hrefType: 'login'}, // 图标   
                        {type: 'icon-zidong', text: '流量监测大屏', color: '#4ba9eb', href: 'http://119.88.190.68:3000/', hrefType: 'login'}, // 图标
                        {type: 'icon-zidong', text: '通报处置', color: '#4ba9eb', href: '/disposal',src:'6', hrefType: 'http'} // 图标
                    ]
                },
                {
                    title: '行业应用',
                    items: [
                        {type: 'icon-md-part-outline', text: '智慧党建', color: '#4ba9eb', href: '/partybuilding',src:'7', hrefType: 'http'},
                        {type: 'icon-zixun', text: '行业资讯', color: '#4ba9eb', href: 'http://119.90.61.155/om3', hrefType: 'login'},
                        {type: 'icon-qingbao', text: '竞争情报', color: '#f7b55d', href: 'http://119.90.61.155/om3', hrefType: 'login'},
                        //{type: 'icon-yupanjingzhengweixie', text: '决策预判', color: '#4ba9eb',href: 'http://119.90.61.155/om3', hrefType: 'login'},
                        // {type: 'icon-zhaotoubiao1', text: '招投标', color: '#6296f1', href: '/bidding/information', hrefType: 'http'},
                        // {type: 'icon-qiyehuaxiang', text: '企业画像', color: '#4ba9eb', href: 'http://119.90.61.155/om3', hrefType: 'login'},
                        //{type: 'icon-huaxiang', text: '人物画像', color: '#6296f1', href: 'http://119.90.61.155/om3', hrefType: 'login'},
                        {type: 'icon-dianziweilanxitong', text: '微信围栏', color: '#4ba9eb', href: '/wechatfence',src:'8', hrefType: 'http'}
                    ]
                },
                {
                    title: '基础平台',
                    items: [
                        {type: 'icon-icon-siyouyuncunchu-', text: '私有云盘', color: '#04c0b3', href: '/clouddisk',src:'9', hrefType: 'http'},
                        {type: 'icon-yunpingtaianquan', text: '华知云平台', color: '#6296f1', href: 'http://119.90.158.98:8888/auth/login/', hrefType: 'login'}
                    ]
                }
            ]
        }
    }

    /* TODO 
    
        通报处置     http://114.242.25.234:30005/gxwhongce2/sec/toBulletinWarning
    
    */
    hrefTo(href, hrefType,src) {
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
        if(hrefType === 'login'){
            window.open(href)
        }else if (hrefType === 'http'){
            history.push(`application/${src}`)
        }
        else{
            history.push(href)
        }
        
    }
    render () {
        return <div className="apps">
                    <div className="app-center">
                        {this.state.appList.map((item, i) => {
                            return <dl key={i}>
                                        <dt className="title">{item.title}</dt>
                                        <div className="items">
                                            {item.items.map((iitem, ii) => {
                                                return <dd key={ii}>
                                                            <div className="content" onClick={this.hrefTo.bind(this, iitem.href, iitem.hrefType,iitem.src)}>
                                                                <div className="icon">
                                                                    <div className="icon-font" style={{backgroundColor: iitem.color}}>
                                                                        <IconFont type={iitem.type} style={{width: '100%', fontSize: '20px'}}></IconFont>
                                                                    </div>
                                                                </div>
                                                                <div className="apptext">
                                                                    {iitem.text}
                                                                </div>
                                                            </div>
                                                        </dd>
                                            })}
                                        </div>
                                    </dl>
                        })}
                    </div>
                    <footer>
                            <div className="top">
                                <div className="contact">
                                    <h3 className="title">知云网 | 北京软云神州科技有限公司</h3>
                                    <ul>
                                        <li>客服热线 ：400-618-1863</li>
                                        <li>官方网站 ：www.ryc360.com    www.is8.com.cn</li>
                                    
                                    </ul>
                                </div>
                                <div className="erweima">
                                    <ul>
                                        <li><img src={fwh} alt="服务号"/><span>微信服务号</span></li>
                                        <li><img src={ios} alt="IOS"/><span>IOS版APP</span></li>
                                        <li><img src={android} alt="安卓"/><span>安卓版APP</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bottom"><span>版权所有 © 2018 软云神州</span></div>
                        </footer>
                </div>
    }
}
export default AppCenter