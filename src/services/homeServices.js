import request from './request';

const host = 'http://web.is8.com.cn/om/webpart/';

// 最新预警舆情
const newest = host + 'main/DocSearchDo?action=mainAlert';

// 个人信息
const userinfo = host + 'self/myInfo?action=getUserInfo';

// 昨日和今日舆情
// const yesterdayAndToday = host + '/main/DocSearchDo?action=mainCountDay';



const newestApi = () => {
    return request(newest);
};

const userinfoApi = () => {
    return request(userinfo);
};

export {newestApi, userinfoApi};