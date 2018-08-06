import {createAction} from 'redux-actions';
import {
  OPINION_SEARCH_REQUESTED,
  OPINION_SEARCH_SUCCEEDED,
  SEARCH_KEYWORD_SYNC,
  SET_OPINION_TYPE_REQUESTED,
  SET_OPINION_TYPE_SUCCEEDED,
  SET_LOCATION_PATHNAME,
  GET_MATERIAL_OPINION_LIST_REQUESTED,
  GET_MATERIAL_OPINION_LIST_SUCCEEDED,
  GET_TOPIC_ANDRULE_REQUESTED,
  GET_TOPIC_ANDRULE_SUCCEEDED,
  GET_MATERIAL_OPINION_DETAIL_REQUESTED,
  GET_MATERIAL_OPINION_DETAIL_SUCCEEDED,
  ADD_MATERIAL_OPINION_REQUESTED,
  ADD_MATERIAL_OPINION__SUCCEEDED,
  GET_COLLECTION_OPINION_LIST_REQUESTED,
  GET_COLLECTION_OPINION_LIST_SUCCEEDED,
  GET_COLLECTION__OPINION_DETAIL_REQUESTED,
  GET_COLLECTION__OPINION_DETAIL_SUCCEEDED,
  GET_REPORT_LIST_REQUESTED,
  GET_REPORT_LIST_SUCCEEDED,
  GET_REPORT_DETAIL_REQUESTED,
  GET_REPORT_DETAIL_SUCCEEDED,
  EXPORT_SKIP,
  REPORT_MESSAGE,
  GET_SORTED_CONTENT_REQUESTED,
  GET_SORTED_CONTENT_SUCCEEDED,
  GET_TOPIC_SHOWLIST_REQUESTED,
  GET_TOPIC_SHOWLIST_SUCCEEDED,
  CHANGE_CLF_ID,
  TOPIC_REPORT_EXPORT,
  ADD_MESSAGE_REMOVE,
  GET_COLLECTION_ANDRULE_REQUESTED,
  GET_COLLECTION_ANDRULE_SUCCEEDED,
  GET_SORTED_MENU_REQUESTED,
  GET_SORTED_MENU_SUCCEEDED,
  TOPIC_NAV_MESSAGE_REQUESTED,
  TOPIC_NAV_MESSAGE_SUCCEEDED,
  PAGINATION_PAGE,
  HOME_MODULE,
  SEARCH_STATE,
  INFORMS_STATE,
  CLF_CAT_STATE,
  BRIEFING_SWITCH_DATA,
  MUL_LANGUAGES_TOGGLE,
  EMPTY_MATERIAL_OPINION_DETAIL
} from './actionTypes';


export const opinionSearchRequested = createAction(OPINION_SEARCH_REQUESTED);
export const opinionSearchSucceeded = createAction(OPINION_SEARCH_SUCCEEDED);

export const searchKeywordSync = createAction(SEARCH_KEYWORD_SYNC);

export const setOpinionTypeRequested = createAction(SET_OPINION_TYPE_REQUESTED);
export const setOpinionTypeSucceeded = createAction(SET_OPINION_TYPE_SUCCEEDED);
export const setlocationPathname = createAction(SET_LOCATION_PATHNAME);

//导出功能跳转
export const exportSkip = createAction(EXPORT_SKIP);
//简报信息
export const reportMessage = createAction(REPORT_MESSAGE);
// 获取素材库列表
export const getMaterialOpinionListRequested = createAction(GET_MATERIAL_OPINION_LIST_REQUESTED);
export const getMaterialOpinionListSucceeded = createAction(GET_MATERIAL_OPINION_LIST_SUCCEEDED);

export const getTopicLocationRequested = createAction(GET_TOPIC_ANDRULE_REQUESTED);
export const getTopicLocationSucceeded = createAction(GET_TOPIC_ANDRULE_SUCCEEDED);

export const getCollectionLocationRequested = createAction(GET_COLLECTION_ANDRULE_REQUESTED);
export const getCollectionLocationSucceeded = createAction(GET_COLLECTION_ANDRULE_SUCCEEDED);

// 获取素材库素材详细信息
export const getMaterialOpinionDetailRequested = createAction(GET_MATERIAL_OPINION_DETAIL_REQUESTED);
export const getMaterialOpinionDetailSucceeded = createAction(GET_MATERIAL_OPINION_DETAIL_SUCCEEDED);
// 清空列表
export const emptyList = createAction(EMPTY_MATERIAL_OPINION_DETAIL)

// 新增素材库
export const addMaterialOpinionRequested = createAction(ADD_MATERIAL_OPINION_REQUESTED);
export const addMaterialOpinionSucceeded = createAction(ADD_MATERIAL_OPINION__SUCCEEDED);

// 获取收藏夹列表
export const getCollectionOpinionListRequested = createAction(GET_COLLECTION_OPINION_LIST_REQUESTED);
export const getCollectionOpinionListSucceeded = createAction(GET_COLLECTION_OPINION_LIST_SUCCEEDED);
// 获取收藏夹详细信息
export const getCollectionOpinionDetailRequested = createAction(GET_COLLECTION__OPINION_DETAIL_REQUESTED);
export const getCollectionOpinionDetailSucceeded = createAction(GET_COLLECTION__OPINION_DETAIL_SUCCEEDED);

// 获取报告列表
export const getReportListRequested = createAction(GET_REPORT_LIST_REQUESTED);
export const getReportListSucceeded = createAction(GET_REPORT_LIST_SUCCEEDED);

// 获取报告详细信息
export const getReportDetailRequested = createAction(GET_REPORT_DETAIL_REQUESTED);
export const getReportDetailSucceeded = createAction(GET_REPORT_DETAIL_SUCCEEDED);

// 获取分类舆情内容
export const getSortedContentRequested = createAction(GET_SORTED_CONTENT_REQUESTED);
export const getSortedContentSucceeded = createAction(GET_SORTED_CONTENT_SUCCEEDED);
//专题信息
export const getTopicRequested = createAction(GET_TOPIC_SHOWLIST_REQUESTED);
export const getTopicSucceeded = createAction(GET_TOPIC_SHOWLIST_SUCCEEDED);

// 分类id切换
export const changeClfId = createAction(CHANGE_CLF_ID);

//专题报告导出信息

export const topicReportExport = createAction(TOPIC_REPORT_EXPORT);
//单条录入修改  
export const addMessageRemove = createAction(ADD_MESSAGE_REMOVE);

// 获取分类的列表项
export const getSortedMenuRequested = createAction(GET_SORTED_MENU_REQUESTED);
export const getSortedMenuSucceeded = createAction(GET_SORTED_MENU_SUCCEEDED);
//专题左侧导航信息
export const topicNavMessageRequested = createAction(TOPIC_NAV_MESSAGE_REQUESTED);
export const topicNavMessageSucceeded = createAction(TOPIC_NAV_MESSAGE_SUCCEEDED);
//上下分页器页码
export const paginationPage = createAction(PAGINATION_PAGE);
//首页模块
export const homeModule = createAction(HOME_MODULE);
//筛选栏状态
export const searchState = createAction(SEARCH_STATE);
//提示信息显示状态
export const informsState = createAction(INFORMS_STATE);

//分类文件夹状态
export const clfCatState = createAction(CLF_CAT_STATE);

//生成简报选择数据
export const briefingSwitch = createAction(BRIEFING_SWITCH_DATA);

// 多语种语言切换
export const mulLanToggle = createAction(MUL_LANGUAGES_TOGGLE)
