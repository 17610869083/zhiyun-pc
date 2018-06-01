import {GET_USER_INFO, USER_FETCH_SUCCEEDED} from '../actions/actionTypes';


const defaultUserInfo = {
    email: "test@qq.com",
    id: "194",
    logourl: "/common/SnapShot?logo=logo.png",
    nickname: "贵州网信办",
    password: "gzwxb",
    remark: "gzwxb",
    sysname: "",
    tel: "11111",
    username: "gzwxb ",
    alerMsg:''    
};

const getUserInfoReducer = (state = {info: "" }, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            return action.payload;
        default:
            return state;
    }
};

const userFetchSuccess = (state = defaultUserInfo, action) => {
    switch (action.type) {
        case USER_FETCH_SUCCEEDED:
            return action.payload;
        default:
            return state;
    }
};


export {getUserInfoReducer, userFetchSuccess};