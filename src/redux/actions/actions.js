import {
    CHANGE_THEME,
    NEWEST_OPINION,
    ON_SEARCH_CONTENT,
    GET_USER_INFO,
    USER_FETCH_SUCCEEDED,
    SET_LOCATION_PATHNAME,
    EXPORT_SKIP,
    REPORT_MESSAGE,
    TOPIC_REPORT_EXPORT,
    ADD_MESSAGE_REMOVE
} from './actionTypes';

// 改变主题颜色
export const changeTheme = (theme) => ({
    type: CHANGE_THEME,
    payload: theme
});


// 最新舆情
export const newestOpinion = (data) => ({
   type: NEWEST_OPINION,
   payload: data
});


// 头部的搜素功能
export const onSearchContent = (keyword) => ({
    type: ON_SEARCH_CONTENT,
    payload: keyword
});


// 获取个人信息
export const getUserInfo = (info) => ({
    type: GET_USER_INFO,
    payload: info
});
export const userFetchSuccess = (info) => ({
    type: USER_FETCH_SUCCEEDED,
    payload: info
});
//监听路由变化
export const getRouter=(router)=>({
    type: SET_LOCATION_PATHNAME,
    payload: router
});
//导出功能跳转
export const exportSkip=(key)=>({
     type:EXPORT_SKIP,
     payload:key
});
//简报信息
export const reportMessage=(data)=>({
     type:REPORT_MESSAGE,
     payload:data
});

//专题报告导出信息

export const topicReportExport=(data)=>({
    type:TOPIC_REPORT_EXPORT,
    payload:data
})
//单条录入修改

export const addMessageRemove=(data)=>({
     type:ADD_MESSAGE_REMOVE,
     payload:data
})


