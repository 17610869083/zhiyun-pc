// host
const host = 'http://119.90.61.155/om31/webpart/';   
//const host = 'http://web.is8.com.cn/om/webpart/';
//const host = './';
//-------------------登录
//export const api_login = 'http://web.is8.com.cn/om/common/login/loginDo?action=login2';
export const api_login = 'http://119.90.61.155/om31/common/login/loginDo?action=login2';
//export const api_login = '../common/login/loginDo?action=login2';

//export const api_logout = 'http://web.is8.com.cn/om/common/login/loginDo?action=loginOut';
export const api_logout = 'http://119.90.61.155/om31/common/login/loginDo?action=loginOut';
//export const api_logout ='../common/login/loginDo?action=loginOut';
/**
 * 首页模块
 */
//修改用户信息
const api_revise_userinfo=host+'self/myInfo?action=saveUserinfo';

const api_get_userinfo = host + 'self/myInfo?action=getUserInfo';
// 最新预警舆情
const api_newest_warning_opinion = host + 'main/DocSearchDo?action=mainAlert';
//首页模块信息
const api_homepage_message= host+'main/DocSearchDo?action=widget';
//新首页模块保存
const api_save_widget = host+'main/DocSearchDo?action=saveWidget';
//首页左侧导航栏
const api_get_channel = host +'homePage/oMainDo?action=getChannel';

//新首页舆情走势
const api_new_total = host + 'echart/echartDo?action=yqzc';
//新首页相关热词
const api_hot_word = host+'echart/echartDo?action=getHotJson';
// 昨日和今日舆情
const api_today_opinion = host + 'main/DocSearchDo?action=mainCountDay';
// 热搜媒体排行，对应折线图
const api_media_opinion = host + 'echart/echartDo?action=yqzc_month_Chart';
// 热搜媒体排行旁边的舆情统计
const api_media_count = host + 'echart/echartDo?action=zfmtjChart';
//新首页载体分布饼图
const api_carrier_pie = host + '/echart/echartDo?action=ztfb';
// 最新舆情
const api_newest_opinion = host + 'homePage/docSearchListDo?action=getDocListEchart';
// 最新负面舆情
const api_newest_negative_opinion = host + 'main/DocSearchDo?action=mainNegation';
// 微博舆情
const api_weibo_opinion = host + 'main/DocSearchDo?action=mainWeibo';

// 人物舆情
const api_people_opinion = host + 'main/DocSearchDo?action=mainLeader';

// 舆情统计
const api_count_opinion = host + 'main/DocSearchDo?action=mainCount';

// 专题舆情
const api_topic_opinion = host + 'oTopic/TopicEchartDo?action=getTopicMenu';

// 新专题舆情
const api_main_topic_opinion = host + 'oTopic/TopicEchartDo?action=mainTopic';

// 舆情总览
const api_total_opinion = host + 'main/DocSearchDo?action=docList';

// 设置舆情类型
const api_edit_doc_neg = host + 'docDetail/docDetailDo?action=editDocNeg';

// 删除舆情
const api_del_doc = host + 'docDetail/docDetailDo?action=docDel';

// 获取详细舆情
const api_get_doc_detail = host + 'docDetail/docDetailDo?action=getDetail';

// 获取相似舆情
const api_get_doc_similar = host + 'docDetail/docDetailDo?action=getSimiler';

// 主题添加

const api_topic_add=host+'oTopic/TopicDo?action=addTopic';

//专题列表接口
const api_topic_showlist=host+'oTopic/TopicDo?action=docList';
// 分类及专题左侧导航
const api_top_nav=host+'oTopic/TopicDo?action=getTopicMemu';

//专题分类列表
const api_topic_typeList=host+'oTopic/TopicDo?action=topicCatList';

//专题删除
const api_topic_del=host+'oTopic/TopicDo?action=delTopic';

//专题分类添加

const api_topic_typeAdd=host+'oTopic/TopicDo?action=addTopicCat';

//专题分类删除
const api_topic_typeDel=host+'oTopic/TopicDo?action=delCat';

//专题统计表
const api_topic_table=host+'oTopic/TopicDo?action=topicCarryCount';

//专题时间轴

const api_topic_timeline=host+'oTopic/oTopicDo?action=topicLineTime';

//专题整体分析
const api_topic_global=host+'oTopic/TopicEchartDo?action=tqxxfxChart';

//专题报告图表负面舆情日增趋势
const api_negtive_global=host+'oTopic/TopicEchartDo?action=tfmyqqsChart';

//专题倾向分析
const api_topic_trendOption=host+'oTopic/TopicEchartDo?action=tqxxfxbChart';

//专题媒体类型

const api_topic_mediaType=host+'oTopic/TopicEchartDo?action=tmtlxChart';

//专题媒体网站分布
const api_topic_mediaSite=host+'oTopic/TopicEchartDo?action=twzphChart';

//专题媒体类型倾向性分析
const api_topic_mediaTypeTrend=host+'oTopic/TopicEchartDo?action=tmtqxxChart';

//负面载体分布

const api_topic_negativeCarry=host+'oTopic/TopicEchartDo?action=tfmmtlxChart';

//负面媒体分布
const api_topic_negativeMedia=host+'oTopic/TopicEchartDo?action=tfmmtChart';

//专题文章趋势分析
const api_topic_essay=host+'oTopic/TopicEchartDo?action=twzqsChart';

//获取专题对应信息
const api_topic_message=host+'oTopic/TopicDo?action=getTopicAndRule';

// 获取素材库列表
const api_material_opinion_list = host + 'oWork/reportDo?action=reportCatList';
// 获取素材库素材详细信息
const api_material_opinion_detail = host + 'oWork/reportDo?action=getResourceInCatAll';
//专题修改
const api_topic_revise=host+'oTopic/TopicDo?action=editTopic';
//分类修改
const api_classify_revise=host+'oTopic/TopicDo?action=editTopicCat';

//单个规则删除
const api_topic_ruleid=host+'oTopic/TopicDo?action=delRule';

const api_clf_ruleid=host+'oClf/clfDo?action=delRule';
// 添加素材库
const api_add_material_opinion = host + 'oWork/reportDo?action=addReportCat';
// 删除素材库
const api_delete_material_opinion = host + 'oWork/reportDo?action=delCat';
// 修改素材库名称
export const api_edit_material_opinion = host + 'oWork/reportDo?action=editReportCat';
// 加入素材库
export const api_push_material = host + 'oWork/reportDo?action=putResource';
// 删除素材库中的文章内容
export const api_del_doc_from_cat = host + 'oWork/reportDo?action=delDocFromCat';
// 文件置顶
export const api_add_doc_from_top = host + 'oWork/reportDo?action=catMoveToTop';
// 素材库舆情录入
export const api_add_doc_from_mat = host + 'oWork/reportDo?action=oDataAdd';
// 素材库收藏
export const api_res_fav_cat= host + 'oWork/reportDo?action=resAddFavCat';
export {
    api_newest_warning_opinion,
    api_today_opinion,
    api_media_opinion,
    api_newest_opinion,
    api_media_count,
    api_newest_negative_opinion,
    api_weibo_opinion,
    api_main_topic_opinion,
    api_people_opinion,
    api_count_opinion,
    api_topic_opinion,
    api_topic_add,
    api_total_opinion,
    api_top_nav,
    api_edit_doc_neg,
    api_del_doc,
    api_get_doc_detail,
    api_get_doc_similar,
    api_topic_typeList,
    api_topic_typeAdd,
    api_topic_del,
    api_topic_typeDel,
    api_topic_table,
    api_topic_timeline,
    api_topic_global,
    api_topic_trendOption,
    api_topic_mediaType,
    api_topic_mediaSite,
    api_topic_mediaTypeTrend,
    api_topic_negativeCarry,
    api_topic_negativeMedia,
    api_topic_message,
    api_material_opinion_list,
    api_topic_revise,
    api_classify_revise,
    api_topic_ruleid,
    api_material_opinion_detail,
    api_add_material_opinion,
    api_delete_material_opinion,
    api_topic_showlist,
    api_negtive_global,
    api_topic_essay,
    api_revise_userinfo,
    api_get_userinfo,
    api_clf_ruleid,
    api_new_total,
    api_carrier_pie,
    api_hot_word,
    api_homepage_message,
    api_save_widget,
    api_get_channel
}

// 获取收藏夹列表
export const api_collection_opinion_list = host + 'oWork/reportDo?action=favCatList';
// 获取收藏夹素材详细信息
export const api_collection_opinion_detail = host + 'oWork/reportDo?action=catDocList';
// 添加收藏夹
export const api_add_collection_opinion = host + 'oWork/reportDo?action=addFavCat';
// 删除收藏夹
export const api_delete_collection_opinion = host + 'oWork/reportDo?action=delCat';
// 修改收藏夹名称
export const api_edit_collection_opinion = host + 'oWork/reportDo?action=editFavCat';
// 获取收藏分类下的收藏内容
export const api_edit_collection_cat_list = host + 'oWork/reportDo?action=catDocList';
// 加入收藏夹
export const api_push_collection = host + 'oWork/reportDo?action=putResource';
// 删除素材库中的文章内容
export const api_del_doc_from_collection = host + 'oWork/reportDo?action=delDocFromCat';


// 报告列表
export const api_report_list = host + 'oWork/reportDo?action=reportList';
// 添加报告
export const api_add_report = host + 'oWork/reportDo?action=addReport';
// 删除报告
export const api_delete_report = host + 'oWork/reportDo?action=delReport';
// 修改报告
export const api_edit_report = host + 'oWork/reportDo?action=editReport';
// 加入报告
export const api_put_into_report = host + 'oWork/reportDo?action=putDocToReport';
// 报告详细信息
export const api_get_report_detail = host + 'oWork/reportDo?action=getReport';
// 删除报告内的某项内容
export const api_delete_report_item = host + 'oWork/reportDo?action=delDocItem';
//汇总舆情页面导出功能
export const api_allopinion_exportskip=host+'exp/ExportData?action=exportDataList';
// 分类左侧导航栏
export const api_sorted_menu = host + 'oClf/clfDo?action=getGradeMemu';
//汇总舆情页面展示
export const api_allopinion_showlist=host+'exp/ExportData?action=showTaskList';
//下载报告
export const download_report=host+'exp/DownloadDoc';
//删除报告
export const del_report=host+'exp/ExportData?action=deleteTask';
//再次生成报告
export const regenerate_report=host+'exp/ExportData?action=reToBeDocument';
//修改标题
export const api_removetitle_report=host+'exp/ExportData?action=renameTask';

//--------------------分类舆情
// 分类列表
export const api_sorted_cat_list = host + 'oClf/clfDo?action=gradeCatList';
// 分类文件夹添加
export const api_sorted_cat_add = host + 'oClf/clfDo?action=addGradeCat';
// 分类文件夹修改
export const api_sorted_cat_edit = host + 'oClf/clfDo?action=editGradeCat';
// 分类文件夹添加
export const api_sorted_cat_delete = host + 'oClf/clfDo?action=delCat';
// 左侧导航
export const api_sorted_menu_list = host + 'oClf/clfDo?action=getGradeMemu';
// 获取分类及规则
export const api_sorted_rule_list = host + 'oClf/clfDo?action=getGradeAndRule';
// 分类及规则修改
export const api_sorted_rule_edit = host + 'oClf/clfDo?action=editGrade';
// 分类添加
export const api_sorted_rule_add = host + 'oClf/clfDo?action=addGrade';
// 单个规则删除
export const api_sorted_rule_delete = host + 'oClf/clfDo?action=delRule';
// 删除分类
export const api_sorted_grade_delete = host + 'oClf/clfDo?action=delGrade';
// 分类下的内容接口
export const api_sorted_doclist = host + 'oClf/clfDo?action=docList';
//专题下面的导出为word
export const api_topic_export_word=host+'exp/ExportData?action=exportDataList';
//通知设置用户信息
export const user_message=host+'mail/EmailDo?action=showEmailConfig';
//新增邮箱通知
export const save_mail_Config=host+'mail/EmailDo?action=saveEmailConfig';
//删除邮箱地址
export const del_email_Config=host+'mail/EmailDo?action=removeEmailAddress';
//系统设置里面的预警设置
export const system_warning_setting=host+'setting/NorWExtendDo?action=showNegativeOrWarningExtend';
//系统设置里面的保存预警设置
export const save_negative_orWarning_extend=host+'setting/NorWExtendDo?action=saveNegativeOrWarningExtend';
//系统设置里面的预警设置的关键词修改
export const edit_negative_orWarning_extend=host+'setting/NorWExtendDo?action=editNegativeOrWarningExtend';
//系统设置里面的排除停用
export const exclude_discontinuation=host+'setting/DisuseExtendDo?action=showDisuseExtend';
//系统设置里面的排除停用的关键词修改
export const  edit_disuse_extend=host+'setting/DisuseExtendDo?action=editDisuseExtend';
//舆情报告
export const public_sentiment_report=host+'exp/ExportData?action=getDocByDocument';
//预览报告
export const preview_report=host+'exp/PreviewAction';

//报告搜索
export const report_search=host+'exp/ExportData?action=search';

//舆情录入
export const public_opinion_entry=host+'appMan/appManDo?action=oDataAddSave';
//单条舆情查询
export const docdetail_remove=host+'docDetail/docDetailDo?action=docEdit' ;
//单条舆情修改
export const api_docedit_save=host+'docDetail/docDetailDo?action=docEditSave';

//排除停用添加规则
export const api_save_disuse_extend =host+'setting/DisuseExtendDo?action=saveDisuseExtend' ;
//内容页邮件获取
export const api_email_push=host+'docDetail/docDetailDo?action=docPush';
//内容页邮件推送
export const api_docsend_push =host+'docDetail/docDetailDo?action=docSendPush'
//报告历史列表
export const api_show_taskList=host+'exp/ExportData?action=showTaskList';
//系统设置消息通知 预警设置
export const api_deleteNegativeOr_WarningExtend=host+'setting/NorWExtendDo?action=deleteNegativeOrWarningExtend';
//系统设置消息通知 负面设置
export const api_delete_DisuseExtend=host+'setting/DisuseExtendDo?action=deleteDisuseExtend';
//专题舆情
export const api_topic_News=host+'oTopic/TopicEchartDo?action=topicNews';
//报告批量删除
export const api_batch_del_report=host+'exp/ExportData?action=batchDelete';
//专题报告向后台发送图片
export const api_saveimg_serives=host+'echart/echartDo?action=saveImg';
//专题舆情信息列表
export const api_topic_message_list=host+'oTopic/TopicDo?action=docList';
//舆情报告条数信息
export const api_check_report=host+'exp/ExportData?action=checkReport';
//系统设置 通知设置  打开状态
export const api_update_eamil_push_state=host+'mail/EmailDo?action=updateEamilPushState' ;
//舆情报告批量删除
export const api_del_report=host+'oWork/reportDo?action=delReport' ;
//导出细分接口
export const api_export_small=host+'exp/ExportData?action=getListBySource';
//报告列表页
export const api_get_all_report = host + 'Report?action=getAllReport';
//报告模板
export const api_get_template_report = host + 'Report?action=getAllForm';
//预览模板
export const api_get_template_report_preview = host + 'Report?action=previewTemplate';
//修改报告名称
export const api_update_report_name = host + 'Report?action=updateReportName';
//搜索报告
export const api_search_report = host + 'Report?action=searchReport';
//删除报告
export const api_new_delete_report = host + 'Report?action=deleteReport'; 
//查询模板
export const api_search_template = host +'Report?action=getFormByReportType';
//删除报告
export const api_new_preview_report = host + 'Report?action=previewTemplate'; 
//预览模板的hmtl
export const api_get_preview_html = host + 'Report?action=previewHtml';
//报告下载
export const api_download_report = host +'report/exportReport?action=downloadReport';         

// 修改报告标题
export const api_update_report = host + 'Report?action=updateTitle';
// 简报分析数据预览
export const api_add_brief_report = host + 'Report?action=briefReport';
//获取简报素材修改页面数据
export const api_get_brief_item = host + 'Report?action=getBriefItem';
//修改简报素材
export const api_update_brief_item = host + 'Report?action=updateBriefItem'; 
//简报编辑素材后刷新列表
export const api_refresh_brief = host +'Report?action=refreshBrief';
// 日期选择
export const api_get_data_daily_preview = host +'Report?action=dailyPreview';
//日报50条编辑
export const api_edit_excerpt = host +'Report?action=editExcerpt';
//日报刷新数据
export const api_get_excerpt = host +'Report?action=getExcerpt';
// 专题请求
export const api_get_special_preview = host +'Report?action=specialReport';
// 生成报告
export const api_get_generate_report = host +'report/exportReport?action=generateReport';
//简报再编辑
export const api_rebuild_report = host +'Report?action=reBuildReport'; 
//首页舆情统计图表 
export const api_count_charts= host +'main/DocSearchDo?action=mainCountPic';
