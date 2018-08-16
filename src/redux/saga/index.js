import { call, put,  fork, all,   takeLatest } from 'redux-saga/effects';
import {userFetchSuccess} from '../actions/actions';
import {reportToTableData} from '../../utils/format';
import {
    opinionSearchSucceeded,
    setOpinionTypeSucceeded,
    getMaterialOpinionListSucceeded,
    getTopicLocationSucceeded,
    getMaterialOpinionDetailSucceeded,
    getCollectionOpinionListSucceeded,
    getCollectionOpinionDetailSucceeded,
    getReportListSucceeded,
    getReportDetailSucceeded,
    getSortedContentSucceeded,
    getTopicSucceeded,
    getCollectionLocationSucceeded,
    getSortedMenuSucceeded,
    topicNavMessageSucceeded,
    evidListSucceeded
} from '../actions/createActions';

import {userinfoApi} from '../../services/homeServices';
import {apiTotalOpinion,
    apiSetOpinionType,
    apiGetMaterialOpinionList,
    apiGetTopicLocation,
    apiGetMaterialOpinionDetail,
    apiGetCollectionOpinionList,
    apiGetCollectionOpinionDetail,
    apiGetReportList,
    apiGetReportDetail,
    apiGetSortedDoclist,
    apiTopicList,
    apiGetCollectionLocation,
    apiGetSortedMenu,
    apiTopicNavMesage,
    apiInterentEvidList
} from '../../services/opinionServices';

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 获取用户信息
function* fetchUser() {
    try {
        const userinfo = yield call(userinfoApi);
        yield put(userFetchSuccess(userinfo));
    } catch (e) {
        console.log(e);
        // yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}
function* mySaga() {
    yield takeLatest("GET_USER_INFO", fetchUser);
}
// 获取所有舆情
function* fetchTotalOpinion(action) {
    try {
        const opinion = yield call(apiTotalOpinion, action.payload);
        yield put(opinionSearchSucceeded(opinion));
    } catch (e) {
        console.log(e);
    }
}
function* totalOpinionSaga() {
    yield takeLatest("OPINION_SEARCH_REQUESTED", fetchTotalOpinion);
}



//获取专题舆情
function* fetchTopicList(action) {
    try {
        const opinion = yield call(apiTopicList, action.payload);
        yield put(getTopicSucceeded(opinion));
    } catch (e) {
        console.log(e);
    }
}
function* topicListSaga() {
    yield takeLatest("GET_TOPIC_SHOWLIST_REQUESTED", fetchTopicList);
}

// 设置舆情类型
function* setOpinionType(action) {
    try {
        const result = yield call(apiSetOpinionType, action.payload);
        yield put(setOpinionTypeSucceeded(result));
    } catch (e) {
        console.log(e);
    }
}
function* setOpinionTypeSaga() {
    yield takeLatest("SET_OPINION_TYPE_REQUESTED", setOpinionType);
}

function* getTopicLocation(action) {
    try {
        const result = yield call(apiGetTopicLocation, action.payload);
        yield put(getTopicLocationSucceeded(result));
    } catch (e) {
        console.log(e);
    }
}
function* getTopicLocationSaga() {
    yield takeLatest("GET_TOPIC_ANDRULE_REQUESTED", getTopicLocation);
}

function* getCollectionLocation0(action) {
    try {
        const result = yield call(apiGetCollectionLocation, action.payload);
        yield put(getCollectionLocationSucceeded(result));
    } catch (e) {
        console.log(e);
    }
}
function* getCollectioncLocationSaga() {
    yield takeLatest("GET_COLLECTION_ANDRULE_REQUESTED", getCollectionLocation0);

}

// 获取素材库列表
function* getMaterialOpinionList() {
    try {
		const result = yield call(apiGetMaterialOpinionList);
        yield put(getMaterialOpinionListSucceeded(result));
    } catch(e) {
        console.log(e);
    }
}
function* getMaterialOpinionListSaga() {
    yield takeLatest("GET_MATERIAL_OPINION_LIST_REQUESTED", getMaterialOpinionList);
}

// 获取素材库素材详细信息
function* getMaterialOpinionDetail(action) {
    try {
        const result = yield call(apiGetMaterialOpinionDetail, action.payload);
        yield put(getMaterialOpinionDetailSucceeded(result));
    } catch(e) {
        console.log(e);
    }
}
function* getMaterialOpinionDetailSaga() {
    yield takeLatest("GET_MATERIAL_OPINION_DETAIL_REQUESTED", getMaterialOpinionDetail);
}

// 获取收藏夹列表
function* getCollectionOpinionList() {
    try {
        const result = yield call(apiGetCollectionOpinionList);
        yield put(getCollectionOpinionListSucceeded(result));
    } catch(e) {
        console.log(e);
    }
}
function* getCollectionOpinionListSaga() {
    yield takeLatest("GET_COLLECTION_OPINION_LIST_REQUESTED", getCollectionOpinionList);
}

// 获取收藏夹素材详细信息
function* getCollectionOpinionDetail(action) {
        
    try {
        const result = yield call(apiGetCollectionOpinionDetail, action.payload);
        yield put(getCollectionOpinionDetailSucceeded(result));
    } catch(e) {
        console.log(e);
    }
}
function* getCollectionOpinionDetailSaga() {
    yield takeLatest("GET_COLLECTION_OPINION_DETAIL_REQUESTED", getCollectionOpinionDetail);
}

// 获取报告列表
function* getReportList(action) {
    try {
        const result = yield call(apiGetReportList,action.payload);
        const reportData = reportToTableData(result);
        yield put(getReportListSucceeded(reportData));
    } catch (e) {
        console.log(e);
    }
}
function* getReportListSaga() {
    yield takeLatest("GET_REPORT_LIST_REQUESTED", getReportList);
}

// 获取报告列表详细信息
function* getReportDetail(action) {
    try {
        const result = yield call(apiGetReportDetail, action.payload);
        yield put(getReportDetailSucceeded(result));
    } catch (e) {
        console.log(e);
    }
}
function* getReportDetailSaga() {
    yield takeLatest("GET_REPORT_DETAIL_REQUESTED", getReportDetail);
}

// 获取分类下的内容
function* getSortedContent(action) {
    try {
        const result = yield call(apiGetSortedDoclist, action.payload);
        result.docList = result.docList.length === 0 ? '[]' :result.docList;
        yield put(getSortedContentSucceeded(result));
    } catch (e) {
        console.log(e);
    }
}
function* getSortedContentSaga() {
    yield takeLatest("GET_SORTED_CONTENT_REQUESTED",getSortedContent);
}

// 获取分类下的目录
function* getSortedMenu(action) {
    try {
        const result = yield call(apiGetSortedMenu, action.payload);
        yield put(getSortedMenuSucceeded(result));
    } catch(e) {
        console.log(e);
    }
}
function* getSortedMenuSaga() {
    yield takeLatest("GET_SORTED_MENU_REQUESTED",getSortedMenu);
}
//获取专题左侧导航信息
function* getTopicMessage(action) {
    try {
        const result = yield call(apiTopicNavMesage, action.payload);
        yield put(topicNavMessageSucceeded(result));
    } catch (e) {
        console.log(e);
    }
}

function* getTopicMessageSaga() {
    yield takeLatest("TOPIC_NAV_MESSAGE_REQUESTED", getTopicMessage);
}

// 取证 互联网取证列表
function* getInterentEvidList(action) {
    try {
        const result = yield call(apiInterentEvidList, action.payload);
        yield put(evidListSucceeded(result));
    } catch (e) {
        console.log(e)
    }
}
function* getInterentEvidListSaga() {
    yield takeLatest("GET_INTERENTEVID_LIST_REQUESTED", getInterentEvidList);
}
export default function* root() {
    yield all([
        fork(mySaga),
        fork(totalOpinionSaga),
        fork(setOpinionTypeSaga),
        fork(getMaterialOpinionListSaga),
        fork(getTopicLocationSaga),
        fork(getMaterialOpinionDetailSaga),
        fork(getCollectionOpinionListSaga),
        fork(getCollectionOpinionDetailSaga),
        fork(getReportListSaga),
        fork(getReportDetailSaga),
        fork(getSortedContentSaga),
        fork(topicListSaga),
        fork(getCollectioncLocationSaga),
        fork(getSortedMenuSaga),
        fork(getTopicMessageSaga),
        fork(getInterentEvidListSaga)
    ])
}