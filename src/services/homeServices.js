import request from './request';
import {api_login,api_get_userinfo} from './api';
//const host = 'http://119.90.61.155/om3/webpart/';

// 最新预警舆情
//const newest = host + 'main/DocSearchDo?action=mainAlert';

// 个人信息
//const userinfo = host + 'self/myInfo?action=getUserInfo';

// 昨日和今日舆情
// const yesterdayAndToday = host + '/main/DocSearchDo?action=mainCountDay';



const newestApi = () => {
    return request(api_login);
};

const userinfoApi = () => {
    return request(api_get_userinfo);
};

export {newestApi, userinfoApi};