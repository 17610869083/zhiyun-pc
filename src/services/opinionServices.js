import request from './request';
import {objectToURL} from '../utils/format';
import {api_total_opinion,
    api_edit_doc_neg,
    api_material_opinion_list,
    api_topic_message,
    api_material_opinion_detail,
    api_collection_opinion_list,
    api_collection_opinion_detail,
    api_report_list,
    api_get_report_detail,
    api_sorted_doclist,
    api_topic_showlist,
    api_sorted_rule_list,
    api_sorted_menu_list,
    api_top_nav,
    api_interent_evidList
} from './api';


const apiTotalOpinion = (obj) => {
    return request(api_total_opinion,{
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: objectToURL(obj)
    });
};   
const apiTopicList = (obj) => {
    return request(api_topic_showlist,{
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: objectToURL(obj)
    });
};
const apiSetOpinionType = (param) => {
  return request(api_edit_doc_neg,{
      method: 'POST',
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: param
  })
};



const apiGetTopicLocation = (param) => {
    return request(api_topic_message,{
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'topicid=' + param
    })
  };

  const apiGetCollectionLocation = (param) => {
    return request(api_sorted_rule_list,{
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'clfid=' + param
    })
  };

  const apiGetMaterialOpinionList = () => {
    return request(api_material_opinion_list)
  };

// 获取素材库素材详细信息
const apiGetMaterialOpinionDetail = (param) => {
    return request(api_material_opinion_detail,{
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        // body: param
        body: param
    })
};

// 获取收藏夹详细列表
const apiGetCollectionOpinionList = () => {
    return request(api_collection_opinion_list)
};
// 获取收藏夹详细信息
const apiGetCollectionOpinionDetail = (param) => {
    return request(api_collection_opinion_detail,{
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'catid=' + param
    })
};

// 获取报告列表
const apiGetReportList = (page) => {
    return request(api_report_list + `&pagesize=${page.pagesize}&page=${page.page}`)
};
// 获取报告详细信息
const apiGetReportDetail = (param) => {
    return request(api_get_report_detail,{
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'reportid=' + param
    })
};

// 分类下的内容
const apiGetSortedDoclist = (obj) => {
    return request(api_sorted_doclist,{
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: objectToURL(obj)
    });
    //return request(api_sorted_doclist +'&'+ objectToURL(obj))
};

// 分类列表
const apiGetSortedMenu = () => {
    return request(api_sorted_menu_list);
}


//专题左侧导航信息

const apiTopicNavMesage=()=>{
    return request(api_top_nav)
}

//取证 互联网取证列表
const apiInterentEvidList=(param)=>{
    return request(api_interent_evidList + '&' + objectToURL(param))
}

export {apiTotalOpinion,
    apiSetOpinionType,
    apiGetTopicLocation,
    apiGetMaterialOpinionList,
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
};
