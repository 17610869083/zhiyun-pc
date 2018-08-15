import {handleAction} from 'redux-actions';
import {
  OPINION_SEARCH_REQUESTED,
  OPINION_SEARCH_SUCCEEDED,
  SEARCH_KEYWORD_SYNC,
  SET_OPINION_TYPE_SUCCEEDED,
  SET_OPINION_TYPE_REQUESTED,
  GET_MATERIAL_OPINION_LIST_REQUESTED,
  GET_MATERIAL_OPINION_LIST_SUCCEEDED,
  GET_TOPIC_ANDRULE_REQUESTED,
  GET_TOPIC_ANDRULE_SUCCEEDED,
  GET_MATERIAL_OPINION_DETAIL_REQUESTED,
  GET_MATERIAL_OPINION_DETAIL_SUCCEEDED,
  GET_COLLECTION_OPINION_LIST_REQUESTED,
  GET_COLLECTION_OPINION_LIST_SUCCEEDED,
  GET_COLLECTION__OPINION_DETAIL_REQUESTED,
  GET_COLLECTION__OPINION_DETAIL_SUCCEEDED,
  GET_REPORT_LIST_SUCCEEDED,
  GET_REPORT_LIST_REQUESTED,
  GET_REPORT_DETAIL_REQUESTED,
  GET_REPORT_DETAIL_SUCCEEDED,
  GET_SORTED_CONTENT_REQUESTED,
  GET_SORTED_CONTENT_SUCCEEDED,
  GET_TOPIC_SHOWLIST_SUCCEEDED,
  GET_TOPIC_SHOWLIST_REQUESTED,
  GET_COLLECTION_ANDRULE_REQUESTED,
  GET_COLLECTION_ANDRULE_SUCCEEDED,
  CHANGE_CLF_ID,
  GET_SORTED_MENU_REQUESTED,
  GET_SORTED_MENU_SUCCEEDED,
  TOPIC_NAV_MESSAGE_SUCCEEDED,
  TOPIC_NAV_MESSAGE_REQUESTED,
  PAGINATION_PAGE,
  INFORMS_STATE,
  CLF_CAT_STATE,
  BRIEFING_SWITCH_DATA,
  GET_INTERENTEVID_LIST_REQUESTED,
  GET_INTERENTEVID_LIST_SUCCEEDED
} from '../actions/actionTypes';

const opinionSearchSucceededReducer = handleAction(OPINION_SEARCH_SUCCEEDED, (state, action) => ({
  data: action.payload,
}), {data: {docList: [], pageInfo: {count:0}, carryCount: [{count:0, value: "全部", key: "docApp"}]}});

export const topicListSucceededReducer = handleAction(GET_TOPIC_SHOWLIST_SUCCEEDED, (state, action) => ({
  data: action.payload,
}), {data: {docList: [], pageInfo: {}, carryCount: [{count: 0, value: "全部", key: "docApp"}]}});

export const topicListRequestedReducer = handleAction(GET_TOPIC_SHOWLIST_REQUESTED, (state, action) => ({
  request: action.payload,
}), "");

const opinionSearchRequestedReducer = handleAction(OPINION_SEARCH_REQUESTED, (state, action) => ({
  request: action.payload,
}), "");

const searchKeywordSyncReducer = handleAction(SEARCH_KEYWORD_SYNC, (state, action) => ({
  ks: action.payload
}),{ks:{keyword: "", seltype: "content"}});

const setOpinionTypeRequestedReducer = handleAction(SET_OPINION_TYPE_REQUESTED, (state, action) => ({
  type: action.payload
}), "1");

const setOpinionTypeSucceededReducer = handleAction(SET_OPINION_TYPE_SUCCEEDED, (state, action) => ({
  res: action.payload
}), {res: {code: 404, msg: "操作成功！"}});


const getMaterialOpinionListRequestedReducer = handleAction(GET_MATERIAL_OPINION_LIST_REQUESTED, (state, action) => ({
  req: action.payload
}), "1");
const getMaterialOpinionListSucceededReducer = handleAction(GET_MATERIAL_OPINION_LIST_SUCCEEDED, (state, action) => ({
  data: action.payload
}), {
    data: {reportCatList: [{id: '', catname: ''}]}
  }
);

const getTopicLocationRequestedReducer = handleAction(GET_TOPIC_ANDRULE_REQUESTED, (state, action) => ({
  req: action.payload
}), 1);

const getTopicLocationSucceededReducer = handleAction(GET_TOPIC_ANDRULE_SUCCEEDED, (state, action) => ({
  res: action.payload
}), {res: 1});

const getCollectionLocationRequestedReducer = handleAction(GET_COLLECTION_ANDRULE_REQUESTED, (state, action) => ({
  req: action.payload
}), 1);

const getCollectionLocationSucceededReducer = handleAction(GET_COLLECTION_ANDRULE_SUCCEEDED, (state, action) => ({
  res: action.payload
}), {res: 1});

// 获取素材库素材详细信息
const getMaterialOpinionDetailRequestedReducer = handleAction(GET_MATERIAL_OPINION_DETAIL_REQUESTED, (state, action) => ({
  req: action.payload
}), "1");
// const getMaterialOpinionDetailSucceededReducer = handleAction(GET_MATERIAL_OPINION_DETAIL_SUCCEEDED, (state, action) => ({
//   data: action.payload
// }), {data: {result:[{datelist: [], ctaname: ''}]}});
const getMaterialOpinionDetailSucceededReducer = handleAction(GET_MATERIAL_OPINION_DETAIL_SUCCEEDED, (state, action) => ({
  data: action.payload
}), {data: {docList: [], pageInfo: {rowcount: 3, page: 1}}});

// 获取收藏夹列表
const getCollectionOpinionListRequested = handleAction(GET_COLLECTION_OPINION_LIST_REQUESTED, (state, action) => ({
  req: action.payload
}), "1");
const getCollectionOpinionListSucceeded = handleAction(GET_COLLECTION_OPINION_LIST_SUCCEEDED, (state, action) => ({
  data: action.payload
}), {data: {favCatList: [{id: '', catname: ''}]}});

// 获取收藏夹材详细信息
const getCollectionOpinionDetailRequested = handleAction(GET_COLLECTION__OPINION_DETAIL_REQUESTED, (state, action) => ({
  req: action.payload
}), "1");
const getCollectionOpinionDetailSucceeded = handleAction(GET_COLLECTION__OPINION_DETAIL_SUCCEEDED, (state, action) => ({
  data: action.payload
}), {data: {docList: [], pageinfo: {}}});

// 获取详细列表
export const getReportListRequested = handleAction(GET_REPORT_LIST_REQUESTED, (state, action) => ({
  req: action.payload
}), "1");
export const getReportListSucceeded = handleAction(GET_REPORT_LIST_SUCCEEDED, (state, action) => ({
  data: action.payload
}), {data: []});

// 获取列表项详细信息
export const getReportDetailRequested = handleAction(GET_REPORT_DETAIL_REQUESTED, (state, action) => ({
  req: action.payload
}), "1");
export const getReportDetailSucceeded = handleAction(GET_REPORT_DETAIL_SUCCEEDED, (state, action) => ({
  data: action.payload
}), {data: {docList: [], pageinfo: {}}});

// 获取分类舆情内容
export const getSortedContentRequested = handleAction(GET_SORTED_CONTENT_REQUESTED, (state, action) => ({
  req: action.payload
}), "1");
export const getSortedContentSucceeded = handleAction(GET_SORTED_CONTENT_SUCCEEDED, (state, action) => ({
  data: action.payload
}), {data: {docList: [], pageinfo: {}}});

export const changeClfId = handleAction(CHANGE_CLF_ID, (state, action) => ({
  id: action.payload
}), {id: 42});

// 获取分类的列表项
export const getSortedMenuRequested = handleAction(GET_SORTED_MENU_REQUESTED, (state, action) => ({
  data: action.payload
}), 1);
export const getSortedMenuSucceeded = handleAction(GET_SORTED_MENU_SUCCEEDED, (state, action) => ({
  res: action.payload
}), {
  res: [
    {
      catid: 1,
      catname: '默认文件夹',
      cattype: 0,
      clflist: [
        {
          clfid: 1250,
          clfname: "",
          typeId: 222,
          addtype: 2
        }
      ]
    }]
});


//专题左侧导航信息

export const getTopicMessageRequested = handleAction(TOPIC_NAV_MESSAGE_REQUESTED, (state, action) => ({
  req: action.payload
}), "1");
export const getTopicMessageSucceeded = handleAction(TOPIC_NAV_MESSAGE_SUCCEEDED, (state, action) => ({
  data: action.payload
}), {data: 1});

//上下分页器页码

export const paginationPage = handleAction(PAGINATION_PAGE, (state, action) => ({
  data: action.payload
}), {data: 1});

export const informsstate = handleAction(INFORMS_STATE, (state, action) => ({
  data: action.payload
}), {data: false});

export const clfCatState = handleAction(CLF_CAT_STATE, (state, action) => ({
  data: action.payload
}), {data: {state:true,catid:1}}); 
//生成简报选择数据
export const briefingSwitchDataReducer = handleAction(BRIEFING_SWITCH_DATA, (state,action) => ({
  data:action.payload
}),{data:[]})

//取证 互联网取证列表
export const getevidListRequested = handleAction(GET_INTERENTEVID_LIST_REQUESTED, (state, action) => ({
  data: action.payload
}),'1')
export const getevidListSucceeded = handleAction(GET_INTERENTEVID_LIST_SUCCEEDED, (state, action) => ({
  data: action.payload
}),{data: {}})
export {
  opinionSearchRequestedReducer,
  searchKeywordSyncReducer,
  opinionSearchSucceededReducer,
  setOpinionTypeRequestedReducer,
  setOpinionTypeSucceededReducer,
  getMaterialOpinionListRequestedReducer,
  getMaterialOpinionListSucceededReducer,
  getTopicLocationRequestedReducer,
  getTopicLocationSucceededReducer,
  getMaterialOpinionDetailRequestedReducer,
  getMaterialOpinionDetailSucceededReducer,
  getCollectionOpinionListRequested,
  getCollectionOpinionListSucceeded,
  getCollectionOpinionDetailRequested,
  getCollectionOpinionDetailSucceeded,
  getCollectionLocationRequestedReducer,
  getCollectionLocationSucceededReducer,
}
