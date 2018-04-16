const host = 'http://117.78.52.164:8003/om/webpart/';

/**
 * 专题舆情
 */

// 获取专题分类列表
const topic_cat_list = host + 'oTopic/TopicDo?action=topicCatList';

// 专题分类添加
const add_topic_cat = host + 'oTopic/TopicDo?action=addTopicCat';

// 专题分类修改
const edit_topic_cat = host + 'oTopic/TopicDo?action=editTopicCat';

// 专题添加
const add_topic = host + 'oTopic/TopicDo?action=addTopic';

// 获取专题分类
const get_topic_menu = host + 'oTopic/TopicDo?action=getTopicMenu';

// 获取专题对应信息
const get_topic_rule = host + 'oTopic/TopicDo?action=getTopicAndRule';

// 单个规则删除
const del_rule = host + 'oTopic/TopicDo?action=delRule';

// 删除专题
const del_topic = host + 'oTopic/TopicDo?action=delTopic';

// 删除分类
const del_cat = host + 'oTopic/TopicDo?action=delCat';
