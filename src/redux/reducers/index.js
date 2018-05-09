import {combineReducers} from 'redux';
import changeThemeReducer from './changeThemeReducer';
import getRouterReducer from './getRouterReducer';
import exportSkip from './exportSkip';
import reportMessage from './reportMessageReducer';
import topicReportReducer from './topicReportReducer';
import onSearchContentReducer from './onSearchContentReducer';
import addMessageReducer from './addMessageReducer';
import paginationPageReducer from './paginationPageReducer';
import homeModuleReducer from './homeModuleReducer';
import searchStateReducer from './searchStateReducer';
import {getUserInfoReducer, userFetchSuccess} from './userInfo';
import {opinionSearchRequestedReducer,
    opinionSearchSucceededReducer,
    searchKeywordSyncReducer,
    setOpinionTypeRequestedReducer,
    setOpinionTypeSucceededReducer,
    getMaterialOpinionListRequestedReducer,
    getMaterialOpinionListSucceededReducer,
    getTopicLocationRequestedReducer,
    getTopicLocationSucceededReducer,
    getMaterialOpinionDetailRequestedReducer,
    getMaterialOpinionDetailSucceededReducer,
    getCollectionOpinionDetailRequested,
    getCollectionOpinionDetailSucceeded,
    getCollectionOpinionListSucceeded,
    getCollectionOpinionListRequested,
    getReportListRequested,
    getReportListSucceeded,
    getReportDetailRequested,
    getReportDetailSucceeded,
    getSortedContentRequested,
    getSortedContentSucceeded,
    topicListSucceededReducer,
    topicListRequestedReducer,
    getCollectionLocationRequestedReducer,
    getCollectionLocationSucceededReducer,
    changeClfId,
    getSortedMenuRequested,
    getSortedMenuSucceeded,
    getTopicMessageRequested,
    getTopicMessageSucceeded,
    informsstate
} from './opinionReducer';

const reducer = combineReducers({
    changeThemeReducer,
    onSearchContentReducer,
    getUserInfoReducer,
    userFetchSuccess,
    opinionSearchRequestedReducer,
    opinionSearchSucceededReducer,
    searchKeywordSyncReducer,
    setOpinionTypeRequestedReducer,
    setOpinionTypeSucceededReducer,
    getRouterReducer,
    getMaterialOpinionListRequestedReducer,
    getMaterialOpinionListSucceededReducer,
    getTopicLocationRequestedReducer,
    getTopicLocationSucceededReducer,
    getMaterialOpinionDetailRequestedReducer,
    getMaterialOpinionDetailSucceededReducer,
    getCollectionOpinionDetailRequested,
    getCollectionOpinionDetailSucceeded,
    getCollectionOpinionListSucceeded,
    getCollectionOpinionListRequested,
    getReportListRequested,
    getReportListSucceeded,
    getReportDetailRequested,
    getReportDetailSucceeded,
    exportSkip,
    reportMessage,
    getSortedContentRequested,
    getSortedContentSucceeded,
    topicListSucceededReducer,
    topicListRequestedReducer,
    changeClfId,
    topicReportReducer,
    addMessageReducer,
    getCollectionLocationRequestedReducer,
    getCollectionLocationSucceededReducer,
    getSortedMenuRequested,
    getSortedMenuSucceeded,
    getTopicMessageRequested,
    getTopicMessageSucceeded,
    paginationPageReducer,
    homeModuleReducer,
    searchStateReducer,
    informsstate
});

export default reducer;