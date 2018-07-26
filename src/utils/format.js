/* eslint-disable */
// 格式化首页的各类舆情数据


// 昨日舆情和今日舆情
export function formatTodayOpinion(data) {
    const yesterdayOpinion = [];
    const todayOpinion = [];

    yesterdayOpinion.push({
        type: '昨日舆情',
        value: data['昨日舆情'][4]['总数']
    });
    yesterdayOpinion.push({
        type: '预警',
        value: data['昨日舆情'][3]['预警']
    });
    yesterdayOpinion.push({
        type: '正面',
        value: data['昨日舆情'][0]['正面']
    });
    yesterdayOpinion.push({
        type: '负面',
        value: data['昨日舆情'][2]['负面']
    });
    todayOpinion.push({
        type: '今日舆情',
        value: data['今日舆情'][4]['总数']
    });
    todayOpinion.push({
        type: '预警',
        value: data['今日舆情'][3]['预警']
    });
    todayOpinion.push({
        type: '正面',
        value: data['今日舆情'][0]['正面']
    });
    todayOpinion.push({
        type: '负面',
        value: data['今日舆情'][2]['负面']
    });

    return {yesterdayOpinion, todayOpinion}
}

// 热搜媒体排行
export function formatMediaChart(data) {
    let colors = ['#5bcf3c','#ffa000','#e64a19','#5a8bff'];
    data.xAxis[0].axisLine= {lineStyle:{
         color:'#787878'
    }}
    const mediaChartOption = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            //data:['常规', '关注', '重点','特推'],
            data:[{name:'正面',icon:'circle'},{name:'中性',icon:'circle'},{name:'负面',icon:'circle'},{name:'预警',icon:'circle'}],
            top: 30,
            textStyle:{
                color:'#787878'
            },
            x:'right'
        },
        grid: {
            left: '6%',
            right: 0,
            // top:20,
            bottom: 20
        },
        color:colors, 
        xAxis: data.xAxis[0],
        yAxis: [
            {
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'#787878'
                    }
                }
            }
        ],
        series: [
            {
                name: '正面',
                //name: '常规',
                type: 'line',
                smooth: true,
                data: data.series[0].data,
                areaStyle: {normal: {}}
            },
            {
                name: '中性',
                //name: '关注',
                type: 'line',
                smooth: true,
                data: data.series[1].data,
                areaStyle: {normal: {}}
            },
            {
                name: '负面',
                //name: '重点',
                type: 'line',
                smooth: true,
                data: data.series[2].data,
                areaStyle: {normal: {}}
            },
            {
                name: '预警',
                //name: '特推',
                type: 'line',
                smooth: true,
                data: data.series[3].data,
                areaStyle: { normal: {}}
            }
        ]
    };
    return {mediaChartOption}

}
export function formatPosNegCount(data) {
    const posNegCount = [];
    let sum = 0;
    data.forEach(item => {
        sum += item.value;
    });
    posNegCount.push({
        name: '舆情总量',
        value: sum,
        ratio: 100
    });
    posNegCount.push({
        name: '负面总量',
        value: data[2].value,
        ratio: (data[1].value / sum) * 100
    });
    posNegCount.push({
        name: '预警总量',
        value: data[3].value,
        ratio: (data[2].value / sum) * 100
    });
    return posNegCount;
}

// 最新负面舆情  // 最新预警舆情
export function formatOpinion(data) {
    const types = Object.values(data);
    const keys = [];
    const values = [];
    types.forEach(item => {
        keys.push(item.type);
        values.push(item.docList);
    });
    return {keys, values}
}

// 微博舆情
export function formatWeiboOpinion(data) {
    const keys = ['全部', '负面'];
    const values = Object.values(data);
    return {keys, values}
}

// 舆情统计
export function formatOpinionCount(data) {
    const opinionCountArr = [];
    opinionCountArr.push(['数据来源', '今天', '本周', '本月', '总计']);
    data.today.forEach((item, index) => {
        const arr = [];
        arr.push(Object.keys(item)[0]);
        arr.push(Object.values(item)[0]);
        arr.push(Object.values(data.week[index])[0]);
        arr.push(Object.values(data.month[index])[0]);
        arr.push(Object.values(data.all[index])[0]);

        opinionCountArr.push(arr);
    });
    return opinionCountArr;
}

/* ------------------------------------  */
// 舆情负面类型
export function opinionTrend(num) {
    let type = '正面';

    if (num === -1) {
        type = '正面';
    } else if (num === 0) {
        type = '中性';
    } else if (num === 1) {
        type = '负面';
    } else {
        type = '预警';
    }
    return type;
}

// 根据舆情数字类型返回颜色值
export function opinionColor(num) {
    let color = '#42b9f5';
    let background='#ffffff';
    if (num === -1) {
        color = '#007aff';
    } else if (num === 0) {
        color = '#008c21';
    } else if (num === 1) {
        color = '#ffffff';
        background='#e90000';
    } else {
        color = '#ffffff';
        background='#ffd200';
    }
    return {
        color: color,
        border: '1px solid ' + color,
        background:background
    }
}

// 根据舆情文字类型返回颜色值，解决后端返回的垃圾json各种混乱
export function opinionTypeToColor(str) {
    let color = '#42b9f5';
    let background='#ffffff';
    if (str === '正面 ') {
        color = '#007aff';
    } else if (str === '中性 ') {
        color = '#008c21';
    } else if (str === '负面') {
        color = '#ffffff';
        background='#ff0000';
    } else {
        color = '#ffffff';
        background='#ffd200';
    }
    return {
        color: color,
        border: '1px solid ' + color,
        background:background
    };
}
// 文章详情标红
export function setHighlightTags(content, tags) {
   const tagLength = tags.length;
    tags.pop();
    let result = "";
    if (tagLength > 0  ) {
        tags.forEach(item => {
            if(content) {
                result = content.replace(item, `<span style="color: red;">${item}</span>`);
            }
        })

    } else {
        result = content;
    }

    return result;
}

// 对象转换为url字符串
export function objectToURL(obj) {
    let url = "";
    for(const key in obj){
        url += `&${key}=${obj[key]}`;
    }
    return url.substring(1);
}

// url转对象
export function URLToObject(url) {
    let reg_url = /^[^\?]+\?([\w\W]+)$/,
        reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g,
        arr_url = reg_url.exec(url),
        ret = {};
    if (arr_url && arr_url[1]) {
        let str_para = arr_url[1], result;
        while ((result = reg_para.exec(str_para)) != null) {
            if(result[2]==='weibo'){
                ret[result[1]] ='微博';
            }else{
                ret[result[1]] =result[2];
            }
        }
    }
    return ret;
}

// 把舆情报告返回的数据转换一下
export function reportToTableData(data) {
    const list = [];
    if(data.reportList[0]['id']){
    data.reportList.forEach((item,index) => {
        const obj = {
            id: item.id,
            key: index,
            name: item.reportname,
            date: getLocalTime(item.reportdate),
            count: item.itemcount ,
            pageinfo: data.pageinfo
        };
        list.push(obj);
    });
   }
   return list;
}

// key对应url
export function urlTokey() {
    const hash = window.location.hash;
    let url = 'home';
    if (hash.match(/^(#\/)(\w+)/)) {
        url = hash.match(/^(#\/)(\w+)/);
    }
    let key = '0';
    switch (url)
    {
        case 'home':
            key = '1';
            break;
        case 'trendfeeling':
            key = '2';
            break;
        case 'bigscreen':
            key = '3';
            break;
        case 'allopinion/topic/topiclist':
            key = '4';
            break;
        case 'warningopinion':
            key = '5';
            break;
        case 'allopinion/topic/topiclist':
            key = '7';
            break;
        case 'sortedopinion':
            key = '6';
            break;
        case 'reportopinion':
            key = 'reportopinion';
            break;
        case 'materiaopinion':
            key = 'materiaopinion';
            break;
        case 'collectionopinion':
            key = 'collectionopinion';
            break;
        case 'myreport':
            key = 'myreport';
            break;
        case 'noticesetting':
            key = 'noticesetting';
            break;
        case 'warnsetting':
            key = 'warnsetting';
            break;
        case 'excludesetting':
            key = 'excludesetting';
            break;
        case 'publicopinion':
            key = 'publicopinion';
            break;
        case 'topicreportlist':
            key = 'topicreportlist';
            break;
        default:
            break;
    }
    return key;
}

//转换日期格式
export  function formatDateTime(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    let minute = date.getMinutes();
    let  second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};
//定时请求数据
export function responseTime(data){
    for(let i in data){
       if(data[i]['taskstate']==='1'){
          data[i]['taskstate']='3';
         }
    }
    return data
}
//解析专题规则数据格式
export function topicData(data,type){
  let rulearr=[];
  if(type===3){
        for(let i in data){
          rulearr.push({});
          rulearr[i]['rule']=data[i]['rule'];
          rulearr[i]['id']=data[i]['id'];
        }
  }else{
     for(let i in data){
         rulearr.push({});
         rulearr[i]['rule1']=data[i].rule1;
         rulearr[i]['rule2']=data[i].rule2;
         rulearr[i]['rule3']=data[i].rule3;
         rulearr[i]['rule4']=data[i].rule4;
         rulearr[i]['rulecode1']=data[i].rulecode1;
         rulearr[i]['rulecode2']=data[i].rulecode2;
         rulearr[i]['rulecode3']=data[i].rulecode3;
         rulearr[i]['rulecode4']=data[i].rulecode4;
         rulearr[i]['id']=data[i].id;
   }
  }
return rulearr
}
//时间戳转换为xx-xx-xx格式
export function  getLocalTime(data){
        var date = new Date(data);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    };

//推送信息转换
export function getMeailMessage(data){
         if(data.simpleEmail!==undefined){
               let content=`标题：${data.simpleEmail[0]['title']}<br/>地址：${data.simpleEmail[0]['url']}
               <br/>来源：${data.simpleEmail[0]['source'].trim()}<br/>发布时间：${getLocalTime(data.simpleEmail[0]['pubdate'])}
               `
                return content
            }
}

//yy-mm-dd hh:xx:xx 转换为毫秒

export function getSecondTime(time){
          return new Date(time).getTime();
}

export function clickTitleColor(str,sid){
         if(str === null){
              return false
         }else{
            let sidArr = str.split(',');
            sidArr.pop();
            sidArr.map(item => {
                   if(item === sid ){
                        return true;
                   }else{
                        return false;
                   }
            })
         }
}

//关键词重复校验

export function keywordDuplicateCheck(arr){
    var hash = {};
    for(var i in arr) {
        if(hash[arr[i]])
        {
            return true;
        }
        hash[arr[i]] = true;
     }
    return false;
}

//首页模块列表
export function homeModuleList (data){
         let listArr=[];
         for(let i in data){
              if(data[i]===1){
                 listArr.push(i)
              }
         }
        return listArr;
}
// 专题图表设置图例
export function topicLengend (data){
      let legend = [] ;
      data.forEach( item => {
        legend.push(item.name)
      })
      return legend;
}
// 报告模板类型排序
export function templateTypeSort (data){
     let arr = data.map( item => {
           return parseInt(item,10)
     })
     let sortArr = arr.sort().map( item => {
         return  item<10? `0${item}` : item.toString();
     })
     return sortArr;
}
//选中状态的sid
export function checkedTrueSid(data){
    const arr = [];
    data.forEach((item) => {
    if(item) arr.push(item)
    })
    return arr;
    }