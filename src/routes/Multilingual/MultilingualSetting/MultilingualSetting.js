import React from 'react';
import {Tabs, Form, Input, Button ,Select,message,Tooltip,Icon} from 'antd';
import SettingSeniorTopic from '../../../components/SettingSeniorTopic/SettingSeniorTopic';
import BiddingSeniorCreate from '../../../components/newSeniorCreate/newSeniorCreate'
import BiddingCreate from '../../../components/newCreate/newCreate'
import request from '../../../utils/request';
import Store from '../../../redux/store/index';
import {
        api_get_BiddingetgradeCatList,
        api_get_BiddingaddGrade,
        api_get_BiddinggetGradeAndRule,
        api_get_BiddinggetEditRule,
        api_get_BiddinggetDelRule,
        api_sorted_cat_list,
        api_sorted_rule_list,
        api_sorted_rule_edit,
        api_sorted_rule_delete,
        api_sorted_rule_add
} from '../../../services/api';
import { createHashHistory } from 'history';
import {connect} from 'react-redux';
import {topicNavMessageRequested, setlocationPathname} from '../../../redux/actions/createActions';
import './MultilingualSetting.less'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const history = createHashHistory();
class BiddingSetting extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            visible1:false,
            num1:[],
            num2:[{"rule1":"","rulecode1":"","id":"","rule2":"",
            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
            "rulecode4":""}],
            num3:[{"rule": "", "rule1":"","rulecode1":"","id":"","rule2":"",
            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
            "rulecode4":""}],
            data:[],
            SeniorTopicRule:[],
            createTopicRule:[],
            preciseTopicRule:[],
            checked:0,
            disBlock: {visibility: 'visible'},
            disNone: {visibility: 'hidden'},
            topicCatList:[],
            topicAlldata:Store.getState().getTopicLocationSucceededReducer.res,
            addType:1,
            select:0,
            delRule:[],
            DelwayRule:[],
            ruleId:[],
            topicNameValue:'',
            addOrSetting:'',
            roleArr: [],
            language: ['', 'kr', 'jp', 'uygur', 'zang', 'en'],
            fastSetting: ['快速设置', '빠른 설정', 'クイックセットアップ', 'تېز سۈرئەتتە بەلگىلەش ', 'མགྱོགས་མྱུར་ངང་སྒྲིག་འགོད་', 'Quick Setup'],
            seniorSetting: ['高级设置', '고급 설정', '詳細設定', 'تەپسىلىي تەڭشەكلەر ', 'མཐོ་རིམ་སྒྲིག་འགོད་', 'advanced settings'],
            thematicName: ['方案名称', '프로그램 이름', 'プログラム名', 'لايىھە نامى ', 'ཇུས་གཞིའི་མིང་', 'Program name'],
            type: ['类型', '유형', 'タイプ', 'ھۆججەت تىپى ', 'རིགས་དབྱེ་', 'type'],
            fastKeyWord: ['匹配关键词组合', '키워드 조합 일치', '一致するキーワードの組み合わせ', 'ئاچقۇچلۇق سۆز ماس كېلىدىغان بىرىكمە ', 'ངང་གནད་ཚིག་དག་སྒྲིག་སྡེབ་སྒྲིག་', 'Matching keyword combination'],
            fastKeyWordTip: ['关键词组合由主题词、关联词1、关联词2和排除词共4组词组成。', '키워드 조합은 주제 단어, 관련 단어 1, 관련 단어 2 및 제외 단어의 총 4 세트로 구성됩니다.', 'キーワードの組み合わせは、件名、関連語1、関連語2、除外語の合計4組のキーワードで構成されます。', 'ئاچقۇچلۇق سۆز گۇرپىدا باش تېما قىلىپ ، مۇناسىۋەتلىك سۆز 1 ، 2 ۋە سۆز جەمئىي تۆت سۆز بىرىكمىسى تەركىبىدىكى باغلىغۇچى . ', 'གནད་ཚིག་ཚན་སྡེབ་དེ་རེ་རེའི་1 ལ་བཀོད་པའི་ཕྲད་དང་2 ལ་བཀོད་པའི་ཕྲད་དང་ཚིག་གྲུབ་བྱེད་ཀྱི་ཚིག་4 ལས་གྲུབ་པ་ཞིག་རེད་།', 'The keyword combination consists of a total of four sets of keywords: subject words, related words 1, related words 2 and excluded words.'],
            seniorWord: ['匹配关键词', '정합 키워드.', 'キーワードに合う', 'ئاچقۇچلۇق سۆز ماس كېلىدىغان ', 'ཟླ་སྒྲིག་གནད་ཚིག་', 'Set keywords'],
            seniorWordTip: {
                row1: ['关键词组合：关键词之间用“+”、“-”或者“*”连接，符号均为英文状态。', '키워드 조합 : 키워드는 "+", "-"또는 "*"로 연결되며 기호는 영어로 표시됩니다.', '"キーワードの組み合わせ：キーワードは" + "、" - "、" * "で結ばれ、記号は英語で表示されます。', 'ئاچقۇچلۇق سۆز بىرىكمىسى : ھالقىلىق سۆز ئوتتۇرىسىدىكى « + » ، « - » ياكى « * » ئارقىلىق تۇتاشتۇرۇلۇپ ، بەلگىسى «?放米 ئىنگلىزچە ھالىتى .', 'གནད་ཚིག་ལ་སྒྲིག་སྟངས་གནད་ཚིག་བར་གྱི་“ + ” དང་” སྟེ་“ ཡང་ན་” “ འབྲེལ་མཐུད་རྟགས་ཚང་མ་དབྱིན་ཡིག་གི་གནས་སུ་གྱར་ཡོད་།', 'Keyword combination: Keywords are connected by "+", "-" or "*", and the symbols are in English.'],
                row2: ['①“+”代表或(或者)','①"+"는 또는 (또는)', '①"+"は、または（または）', '① « + » ۋەكىللىرى ياكى ( ياكى )', '① “ + ” ཀྱི་འཐུས་མིའམ་ཡང་ན་（ ཡང་ན་）', '①"+" stands for or (or)'],
                row3: ['②“-”代表排除', '②"-"는 제외를 의미합니다.', '②" - "は除外を表す', '② « - » ۋەكىللىرىنى سىرتتا', '②” སྟེ་“ འཐུས་མི་ཕྱིར་འབུད་', '②"-" stands for exclusion'],
                row4: ['③“*”代表与(并且)', '"*"은 (와)', '③"*"は（と）', '③ « * » ۋەكىللىرى بىلەن ( )', '③”*“ འཐུས་མི་དང་( དེས་མ་ཟད་། ）', '③"*" stands for (and)'],
                row5: ['④“( )”在多个词之间是或(或者)的关系时用括号包起来', '④“( )”여러 단어 (또는) 사이에 관계가있을 때 괄호로 묶습니다.', '④“( )”複数の単語（または）の間に関係がある場合はかっこで囲みます。', '④ « ( ) » دىن ئارتۇق سۆز ئوتتۇرىسىدىكى ياكى ( ياكى ) بولغان مۇناسىۋىتىنى بىر تەرەپ قىلغاندا ، تىرناق ئوراپ بەرسىڭىز ', '④ཚིག་བར་ནི་། ཡང་ན་“ ( ) ” མང་པོ་ཞིག་( ཡང་ན་) གྱི་འབྲེལ་བའི་སྐོར་བཤད་དུས་གུག་རྟགས་བཀོལ་ནས་ཐུམ་', '④"( )" is wrapped in parentheses when there is a relationship between multiple words or (or)'],
                row6: ['例子：', '예 :', '例子:', 'مىسال :', 'དཔེ་:', 'example:'],
                row7: ['关键词组合：北京*(暴雨+暴雪)*(预警+受灾+伤亡)-暴雪公司系统会匹配舆情信息中出现北京与(暴雨或者暴雪)与(预警或者受灾或者伤亡)排除暴雪公司相关的数据', '키워드 조합 : 북경 * (폭풍 + 눈보라) * (경고 + 재해 + 사상자) - 블리자드 시스템은 북경에서 블리자드를 제외하고 관련된 데이터와 (폭풍 또는 눈보라) 경고 (경고 또는 재해 또는 사상자)', '키워드 조합 : 북경 * (폭풍 + 눈보라) * (경고 + 재해 + 사상자) - 블리자드 시스템은 북경에서 블리자드를 제외하고 관련된 데이터와 (폭풍 또는 눈보라) 경고 (경고 또는 재해 또는 사상자)', 'ئاچقۇچلۇق سۆز بىرىكمىسى : بېيجىڭ * قارا يامغۇر + قار ) * ( ئاگاھلاندۇرۇش + + ئاپەتكە ئۇچرىغان تالاپەت ) - باۋشۆ شىركىتىنىڭ سىستېما ماس كېلىدىغان جامائەت پىكرى ئەھۋالىغا دائىر ئۇچۇرلارنى جەريانىدا كۆرۈلگەن بېيجىڭ بىلەن ( يامغۇر ياكى قار ) بىلەن ( ئاگاھلاندۇرۇش ياكى ئاپەتكە ئۇچرىشى ياكى تالاپەت ) باۋشۆ شىركىتىنىڭ مۇناسىۋەتلىك سانلىق مەلۇمات', 'གནད་ཚིག་ལ་སྒྲིག་སྟངས་པེ་ཅིན་། （ དྲག་ཆར་དང་གངས་ཆེན་） * （ ཉེན་བརྡ་གཏོང་བའི་གནོད་འཚེ་ཕོག་པའི་+ + ཤི་རྨས་） - གངས་བབས་ནས་ཀུང་སི་མ་ལག་སྙོམ་སྒྲིག་གི་གླེང་ཕྱོགས་གནས་འཕྲིན་འཚོ་ནང་པེ་ཅིན་དུ་（ དྲག་ཆར་ཐོན་པའམ་ཡང་ན་གངས་ཆེན་） དང་（ ཉེན་ཟོན་སྔོན་བརྡའི་པའམ་ཡང་ན་གནོད་འཚེ་ཕོག་པའམ་ཤི་རྨས་། ) ཉེན་འགོག་འགན་ལེན་ཀུང་སིའི་འབྲེལ་ཡོད་ཀྱི་གཞི་གྲངས་” དུ་གངས་དྲག་ཆེན་བཏང་', 'Keyword combination: Beijing* (storm + blizzard)* (warning + disaster + casualties) - Blizzard system will match the data related to the exclusion of Blizzard from Beijing and (storm or blizzard) and (warning or disaster or casualties)']
            },
            addrule: ['添加规则+', '규칙 추가+', 'ルールを追加する+', '+ قوشۇش قائىدىسى', 'སྦྱོར་རྟ་བྱེད་པ་། སྒྲིག་སྲོལ་+', 'Add rules+'],
            save: ['保存', '保存', '保存', '保存', '保存', '保存'],
            cancel: ['取消', '취소', 'キャンセル', 'ئەمەلدىن قالدۇرماق ', 'མི་དགོས་པར་བཟོ་བ་', 'cancel'],
            calssNamelen: ['专题名称请不要超过28个字符', '특집 명칭 하지 마 세요. 이상 28 개 문자', '名前は28文字を超えないでください。', 'مەخسۇس نامى قىلماڭ ھەرپ - بەلگە ', 'ཆེད་དོན་མིང་ཡིག་རྟགས་མ་བྱེད་རོགས་།', 'The project name should not exceed 28 characters'],
            delsuccess: ['删除成功', '성공을 지우다', '削除成功', 'ئۆچۈرۈلدى. ئۆچۈرۈلدى', 'སྐོར་བསུབས་ཡོད་པ་བཅས་གྲུབ་འབྲས་ཐོབ་པའི་ངང་', 'successfully deleted'],
            completeRules: ['请把规则填写完整', '규칙을 완전하게 써 주십시오.', 'ルールを完全に記入してください。', 'ماڭا قائىدە مۇكەممەل', 'སྒྲིག་སྲོལ་ཆ་ཚང་བ་ཞིག་འབྲི་རོགས་།', 'Please complete the rules'],
            prevRule: ['请添加上一条规则', '규칙을 하나 더 해 주세요.', 'ルールを添付してください。', 'قوشۇپ بىر قائىدىسى', 'སྒྲིག་ལམ་གང་ལའང་རོགས་སྟེང་དུ་བསྣན་', 'Please add the previous rule'],
            topicEmpty: ['专题名称不能为空', '특정 한 제목의 명칭은 비어 있을 수 없다.', '件名は空ではない。', 'مەخسۇس نامى قۇرۇق بولسا بولمايدۇ ', 'ཆེད་དོན་མིང་སྟོང་', 'The topic name cannot be empty'],
            keyword: {
                addsuccess: ['关键词添加成功', '키워드 첨가 성공 했 다', 'キーワードが成功する。', 'ئاچقۇچلۇق سۆز قوشۇش مۇۋەپپەقىيەت ', 'གནད་ཚིག་སྦྱོར་རྟ་བྱེད་པ་ལེགས་འགྲུབ་བྱུང་', 'Keywords added successfully'],
                editsuccess: ['关键词修改成功', '키워드 개정 에 성공 했 다', 'キーワードが修正に成功した。', 'ئاچقۇچلۇق سۆز مۇۋەپپەقىيەتلىك ئۆزگەرتىلدى .', 'གནད་ཚིག་བཟོ་བཅོས་ལེགས་འགྲུབ་བྱུང་', 'Successful keyword modification'],
                editerror: ['关键词修改失败', '키워드 수정 에 실패 했 다', 'キーワードが改正に失敗した。', 'ئاچقۇچلۇق سۆز تۈزىتىش كىرگۈزۈش مەغلۇپ بولدى', 'གནད་ཚིག་བཟོ་བཅོས་ཕམ་', 'Keyword modification failed']
            },
            keywordCombination: ['关键词组合', '키워드 조합', 'キーワード組合', 'ئاچقۇچلۇق سۆز بىرىكمىسى', 'བརྡ་ཆད་གཙོ་བོ་སྡེབ་སྒྲིག་', 'Keyword combination']
        }
    }
    componentWillReceiveProps(nextprops){
            if (this.search2Obj(nextprops.location.search).type === 'add' && this.props.location.search !== nextprops.location.search) {
                request(api_sorted_cat_list + `&lang=${this.state.language[this.props.match.params.languages]}`).then((res) => {
                    this.setState({
                        topicCatList: res.data.gradeCatList,
                        topicNameValue: '',
                        select: this.search2Obj(nextprops.location.search).catid,
                        addType: 1,
                        num3: [{"rule1":"","rulecode1":"","id":"","rule2":"",
                        "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
                        "rulecode4":""}]
                    })
                })
            }
            this.setState({
                addOrSetting: this.search2Obj(nextprops.location.search).type || 'setting'
            })
    }
    componentWillMount(){
        if (this.search2Obj(this.props.location.search).type === 'add') {
            // this.setState({

            // })
           
            this.setState({
                select: this.search2Obj(this.props.location.search).catid
            })
            
            request(api_sorted_cat_list + `&lang=${this.state.language[this.props.match.params.languages]}`).then((res) => {
                this.setState({
                    topicCatList: res.data.gradeCatList
                })
            })
        } else {
            let topicid = this.search2Obj(this.props.location.search).topicid
            
            request(api_sorted_cat_list + `&lang=${this.state.language[this.props.match.params.languages]}`).then((res) => {

                request(api_sorted_rule_list +'&clfid=' +topicid).then(res2=>{
                    if(res2.data && res2.data.code!==0){
                    let addtypeStr='num'+(res2.data.addtype);
                        this.setState({
                            topicAlldata:res2.data,
                            [addtypeStr]:res2.data.rulearr.length === 0?[{"rule": "", "rule1":"","rulecode1":"","id":"","rule2":"",
                            "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
                            "rulecode4":""}]:res2.data.rulearr,
                            addType: res2.data.addtype ,
                            select:res2.data.catid,
                            topicNameValue:res2.data.clfname
                        })
                    }
                })
                this.setState({
                    topicCatList: res.data.gradeCatList
                })
            })
        }
        
        //  let topicid=this.props.location.search.split('=')[1];
        //  request(api_topic_message +'&topicid=' +topicid).then(res=>{
        //      if(res.data && res.data.code!==0){
        //         let addtypeStr='num'+(res.data.addtype);
        //           this.setState({
        //              topicAlldata:res.data,
        //              [addtypeStr]:res.data.rulearr.length === 0?[{"rule1":"","rulecode1":"","id":"","rule2":"",
        //              "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
        //              "rulecode4":""}]:res.data.rulearr,
        //              addType: res.data.addtype ,
        //              select:res.data.catid,
        //              topicNameValue:res.data.topicname
        //           })
        //       }
        //         request(api_top_nav).then(res=>{
        //             if(res.data){
        //                 this.setState({
        //                     topicCatList:res.data,
        //                 })
        //             }
        //          })
        //   })

    }
    search2Obj(str) {
        let obj = {}, sumarr = []
        str.slice(1, str.length).split('&').forEach(item => {
            sumarr = item.split('=')
            obj[sumarr[0]] = sumarr[1]
        })
        return obj
    }
     //快速添加规则
    //  addRule(e){
    //        this.setState({num1:this.state.num1.concat([{"rule1":"","rulecode1":"","id":"","rule2":"",
    //        "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
    //        "rulecode4":""}])})
    //  }
     //精准添加规则
     PreciseRule(e){
        this.setState({num2:this.state.num2.concat([{"rule1":"","rulecode1":"","id":"","rule2":"",
        "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
        "rulecode4":""}])})
     }
     //高级添加规则
     seniorRule(e){
         
        if(this.state.num3.length < 0 || this.state.num3[this.state.num3.length-1].rule.trim() === '' || this.state.num3[this.state.num3.length-1].rule.trim() === undefined ) {
            message.error(this.state.prevRule[this.props.languages])
            return false
        }
        this.setState({num3:this.state.num3.concat([{"rule": "", "rule1":"","rulecode1":"","id":"","rule2":"",
        "rulecode2":"","rule3":"","rulecode3":"","rule4":"",
        "rulecode4":"","rule":''}])})
     }
    // 改变设置方式
    handleOnChange(key) {
        if(this.search2Obj(this.props.location.search).type === 'add') {
            this.setState({
                addType: this.state.addType-0 === 3? 1 : 3 
            })
        }
        if(key===this.state.addType){
            let ruleIdArr=[];
            let oldruleId=this.state.topicAlldata.rulearr;
            for(let i in oldruleId){
                ruleIdArr.push(oldruleId[i]['id'])
            }
            this.setState({
                ruleId:ruleIdArr,
                addType:parseInt(key,10)
            })
        }else{
            // this.setState({
            //     addType:parseInt(key,10)
            // })
            return;

        }
        // if(this.state.topicNameValue.trim().length <= 0 && this.state.createTopicRule.length <= 0 ) {
        //     this.setState({
        //         addType:parseInt(key,10)
        //     })
        // }
    }
    onAddtype(){
    	 this.setState({addtype:1})
    }
    onAddtypeOne(){
    	 this.setState({addtype:2})
    }
    onAddtypeTwo(){
    	 this.setState({addtype:3})
    }
    onModelCancel() {
        this.setState({
            visible: false
        })
    }
    onInputConent(e){ 
          let rule=[];
          if(e.length>0){
            for(let i in e){
                rule.push({});
                rule[i]['rule']=e[i].rule;
                rule[i]['id']=e[i].id;

            }
         } 
         this.setState({
            SeniorTopicRule:rule
         })
    }
    onCreateTopic(e){
        let rule=[];
        if(e.length>0){
            for(let i in e){
                rule.push({});
                rule[i]['rule1']=e[i].rule1;
                rule[i]['rule2']=e[i].rule2;
                rule[i]['rule3']=e[i].rule3;
                rule[i]['rule4']=e[i].rule4;
                rule[i]['id']=e[i].id; 
            }
       } 
       this.setState({
          createTopicRule:rule
       })
    }
    onPreciseTopic(e){
        let rule=[];
        if(e.length>0){
          for(let i in e){
            rule.push({});
            rule[i]['rule1']=e[i].rule1;
            rule[i]['rule2']=e[i].rule2;
            rule[i]['rule3']=e[i].rule3;
            rule[i]['rule4']=e[i].rule4;
            rule[i]['rulecode1']=e[i].rulecode1;
            rule[i]['rulecode2']=e[i].rulecode2;
            rule[i]['rulecode3']=e[i].rulecode3;
            rule[i]['rulecode4']=e[i].rulecode4;
            rule[i]['id']=e[i].id; 
          }
       } 
       this.setState({
           preciseTopicRule:rule
       })
    }
    handleSubmit(e) {
          e.preventDefault();
        //    let rules;
        //    if(this.state.addType===3){
        //        rules=JSON.stringify(this.state.SeniorTopicRule.length===0?
        //         topicData(this.state.topicAlldata.rulearr,this.state.addType):this.state.SeniorTopicRule);
           
        //     }else if(this.state.addType===1){
        //        rules=JSON.stringify(this.state.createTopicRule.length===0?
        //         topicData(this.state.topicAlldata.rulearr,this.state.addType):this.state.createTopicRule);
            
        //    }else if(this.state.addType===2){
        //        rules=JSON.stringify(this.state.preciseTopicRule.length===0?
        //         topicData(this.state.topicAlldata.rulearr,this.state.addType):this.state.preciseTopicRule);     
        //    }
        //    let rulelist = JSON.parse(rules)[0];
        //    if( rulelist.rule1 ==='' && rulelist.rule2 ==='' && rulelist.rule3 === '' && rulelist.rule4 === ''){
        //     message.success('规则不能为空');
        //      return;
        //    }
        // let topicId=Store.getState().getRouterReducer.topicid;
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         request(api_get_BiddingaddGrade,{
        //             method: 'POST',
        //             headers: {
        //                 "Content-Type": "application/x-www-form-urlencoded"
        //             },
        //             // body:`action=editTopic&topicid=${topicId}&addtype=${this.state.addtype}&bind=${this.state.checked}&tname=${this.state.topicNameValue}&catid=${this.state.select}&rule=${encodeURIComponent(rules)}`
        //             body:`action=addGrade&addtype=${this.state.addtype}&clfname=${this.state.topicNameValue}&catid=${this.search2Obj(this.props.location.search).catid}&rule=${encodeURIComponent(rules)}`
        //         }).then((res) => {
        //             if(res.data.code===1){
        //                 message.success('关键词添加成功');
        //                 history.push({
        //                     pathname: '/bidding/information'
        //                 })
        //             }
        //         })
        //     }               
        // });
        if (this.state.topicNameValue.trim() === '') {
            message.error(this.state.topicEmpty[this.props.languages])
            return false
        }
        let rules = this.state.roleArr.length === 0 ? JSON.stringify(this.state.num1) : JSON.stringify(this.state.roleArr)
        let ruleArr = JSON.parse(rules)
        if(this.state.addType === 1) {
            if(this.search2Obj(this.props.location.search).type === 'add') {
                if(ruleArr.length === 0 || ruleArr[ruleArr.length-1]['rule1'].trim() === '') {
                    message.error(this.state.completeRules[this.props.languages])
                    return false
                }
            } else {
                
                if(ruleArr.length > 0) {
                    if(ruleArr[ruleArr.length-1].rule1.trim() === '') {
                        message.error(this.state.completeRules[this.props.languages])
                        return false
                    }
                } else{
                    if(!this.isLegitimate(this.state.num1)) {
                        message.error(this.state.completeRules[this.props.languages])
                        return false
                    }
                }
    
            }
        }
        


        if(this.state.addType === 3 && this.state.num3[this.state.num3.length-1]['rule'].trim() === '' ) {
            message.error(this.state.completeRules[this.props.languages])
            return false
        }
        
        if( this.search2Obj(this.props.location.search).type === 'add' ) {
            request(api_sorted_rule_add, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`action=addGrade&addtype=${this.state.addtype}&lang=${this.state.language[this.props.match.params.languages]}&clfname=${this.state.topicNameValue}&catid=${this.state.select}&rule=${this.state.addType-0 === 3 ? encodeURIComponent(JSON.stringify(this.state.num3)) :encodeURIComponent(rules)}`
            }).then((res) => {
                if(res.data.code===1){
                    message.success(this.state.keyword.addsuccess[this.props.languages]);
                    history.push({
                        pathname: 'multilingual/'+ this.props.match.params.languages +'/multilingual'
                    })
                }else {
                    message.error(res.data.msg)
                }
            })
        } else {
            request(api_sorted_rule_edit, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`action=editGrade&addtype=${this.state.addtype}&lang=${this.state.language[this.props.match.params.languages]}&catid=${this.state.select}&clfid=${this.props.location.search.split('=')[1]}&clfname=${this.state.topicNameValue}&rule=${this.state.addType-0 === 3 ? encodeURIComponent(JSON.stringify(this.state.num3)) :encodeURIComponent(rules)}`
            }).then((res) => {

                if(res.data.code===1){
                    message.success(this.state.keyword.editsuccess[this.props.languages]);
                    this.props.setlocationPathname({topicid:this.props.getRouter.topicid});
                    
                    history.push({
                        pathname: `/multilingual/${this.props.match.params.languages}/multilingual`,
                    })
                } else {
                    message.error(this.state.keyword.editerror[this.props.languages])
                }
            })
        }
    }
    onChange(checked){
    	   this.setState({checked:checked===true?1:0})
    	   
    }
    showModal() {
        this.setState({
            visible: true
        })
    }
    showModal1(){
    	this.setState({
            visible1: true
        })
    }
  handleOk1 = (e) => {
    this.setState({num2:this.state.num2.splice(0,1),
                    visible1: false
    });
  }
  handleCancel1 = (e) => {
    this.setState({
        visible1: false
    });
  }
  onSelect(value){
       this.setState({
            select:value
       })
  }
     //删除单条规则
  onDelrule(data){
    this.setState({
        delRule:data
    })
  }
  //删除整行规则
  onDelwayRule(data){
        this.setState({
          DelwayRule:data
        })
  }
 
  goTopiclist(){
        history.push('/bidding/information')
  }

  TopicNameChange(e){
        const {value} = e.target;
        if(value.length>=28){
              message.error(this.state.calssNamelen[this.props.languages]);
              return;
        }
        this.setState({
           topicNameValue:value
        })
  }
  clearAll() {
      this.setState({
        num1:[
                {   
                    "rule1":"",
                    "rulecode1":"",
                    "id":"",
                    "rule2":"",
                    "rulecode2":"",
                    "rule3":"",
                    "rulecode3":"",
                    "rule4":"",
                    "rulecode4":""
                }
            ]
      })
  }

  addRole(role) {
    const [...newArr] = role
    this.setState({
        roleArr: newArr
    })
  }
  editRole(role) {
    const [...newArr] = role
    this.setState({
        roleArr: newArr
    })
  }
  delOne(role) {
    const [...newArr] = role
    this.setState({
        roleArr: newArr
    })
  }
  delRow(delrole, role) {
    const [...newArr] = role
    this.setState({
        roleArr: newArr
    })
    if ( this.search2Obj(this.props.location.search).type === 'add' ) {
    }else {
    request(api_sorted_rule_delete, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `&ruleid=${delrole[0].id}&lang=${this.state.language[this.props.match.params.languages]}`
    }).then((res) => {
        if(res.code === 1) {
            message.success(this.state.delsuccess[this.props.languages]);
        }
    })
    }

  }
  onroleChange(value, index) {
      this.state.num3[index].rule = value
  }
  ondelrole(index) {
    if(this.search2Obj(this.props.location.search).type !== 'add') {
        request(api_get_BiddinggetDelRule, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `&ruleid=${this.state.num3[index].id}`
        }).then((res) => {
            if(res.code === 1) {
                message.success(this.state.delsuccess[this.props.languages]);
            }
        })
    }

    this.state.num3.splice(index, 1)
    this.setState({})
  }
  isLegitimate(arr) {
      let falg = true
      if(arr.length === 0) {
        return false
      }else {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if(element.rule.trim() === '') {
                  falg =  false
                  break
            }
        }
     }
        return falg
  }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
      const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span:16,
          offset: 8,
        },
      },
    };
    let topicCatid=this.search2Obj(this.props.location.search).catid? this.search2Obj(this.props.location.search).catid:42;
        const topicCatList=this.state.topicCatList.length!==0?
        this.state.topicCatList.map((item,index)=>
        <Option value={(item.id).toString()} disabled={item.id === 115} key={index}>{item.catname}</Option> 
         ):<Option value={'75'} disabled>默认文件夹</Option> ;
         const titleTip= <div>
         <p>{this.state.seniorWordTip.row1[this.props.languages]}</p>
         <p>{this.state.seniorWordTip.row2[this.props.languages]}</p>
         <p>{this.state.seniorWordTip.row3[this.props.languages]}</p>
         <p>{this.state.seniorWordTip.row4[this.props.languages]}</p>
         <p>{this.state.seniorWordTip.row5[this.props.languages]}</p>
         <p>{this.state.seniorWordTip.row6[this.props.languages]}</p>
         <p>{this.state.seniorWordTip.row7[this.props.languages]}</p>
         </div>;

            const tipMessage=<span> <Tooltip placement="bottom" title={this.state.fastKeyWordTip[this.props.languages]}>
            <Icon type="question-circle" className="iconMessage"></Icon>
            </Tooltip>
            {this.state.fastKeyWord[this.props.languages]}</span>;
        return (
            <div className="bidding-setting">
                <Tabs tabBarStyle={{color:'#C1C1C1'}} onChange={this.handleOnChange.bind(this)} type="card" activeKey={this.state.addType!==undefined?this.state.addType.toString():'1'}>
                    <TabPane tab={this.state.fastSetting[this.props.languages]} key="1">                  
                        <div className="fast-setting">
                        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem
                                    label={this.state.thematicName[this.props.languages]}
                                    {...formItemLayout}
                                >
                            <Input placeholder={this.state.thematicName[this.props.languages]} style={{width: '300px'}}
                             maxLength={'28'}
                             onChange={this.TopicNameChange.bind(this)}
                             value={this.state.topicNameValue}
                            />          
                                </FormItem>                                
                                <FormItem
                                    label={this.state.type[this.props.languages]}
                                    {...formItemLayout}
                                >
                                <Select style={{width: '154px'}} onSelect={this.onSelect.bind(this)} 
                                value={this.state.select!==0?this.state.select.toString():topicCatid.toString()}>
                                    {topicCatList}
                                </Select>

                                </FormItem>

                                {/* <FormItem
                                     label="行业"
                                     {...formItemLayout}
                                >
                                    <Select style={{width: '154px'}} onSelect={this.onSelect.bind(this)} 
                                        value={this.state.select!==0?this.state.select.toString():topicCatid.toString()}>
                                        <Option value="lucy">lucy</Option>
                                        <Option value="lucy">lucy</Option>
                                        <Option value="lucy">lucy</Option>
                                        <Option value="lucy">lucy</Option>
                                        <Option value="lucy">lucy</Option>
                                    </Select>
                                </FormItem>

                                <FormItem
                                     label="地区"
                                     {...formItemLayout}
                                >
                                    <Select style={{width: '154px'}} onSelect={this.onSelect.bind(this)}>
                                        <Option value="lucy2">lucy</Option>
                                        <Option value="lucy3">1</Option>
                                        <Option value="lucy4">2</Option>
                                        <Option value="lucy7">l3ucy</Option>
                                        <Option value="lucy">l3ucy</Option>
                                    </Select>
                                </FormItem> */}

                                <FormItem
                                    {...formItemLayout}
                                    label={tipMessage}
                                >
                                {/* <SettingCreateTopic num1={this.state.num1} name="email" 
                                    onDelrule={this.onDelrule.bind(this)}
                                    onDelwayRule={this.onDelwayRule.bind(this)}
                                    ruleId={this.state.ruleId}
                                    onCreateTopic={this.onCreateTopic.bind(this)}
                                    type="topic"
                                    addOrSetting={this.state.addOrSetting}
                                /> */}
                                <BiddingCreate 
                                    num1={JSON.stringify(this.state.num1)}
                                    type="mul"
                                    onAddRole={this.addRole.bind(this)}
                                    onEditRole={this.editRole.bind(this)}
                                    onDelOne={this.delOne.bind(this)}
                                    onDelRow={this.delRow.bind(this)}
                                >
                                </BiddingCreate>
                                </FormItem> 
                                <FormItem className="addRule"
                                    {...tailFormItemLayout} 
                                >
              {/* <Button  type="primary" size="small" onClick={this.addRule.bind(this)} > */}
                                      {/* + 添加规则 */}
                                 {/* </Button> */}
                                </FormItem>
                                <FormItem
                                    {...tailFormItemLayout}
                                >
                      <Button type="primary" htmlType="submit" className="gap" onClick={
                      	  this.onAddtype.bind(this)
                      } >
                                        {this.state.save[this.props.languages]}
                                    </Button>
                                    <Button  type="primary" onClick={this.goTopiclist.bind(this)}>
                                        {this.state.cancel[this.props.languages]}
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </TabPane>
                    <TabPane tab={this.state.seniorSetting[this.props.languages]} key="3">
                     <div className="fast-setting">
                     <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem
                                    label={this.state.thematicName[this.props.languages]}
                                    {...formItemLayout} 
                                >
                                        <Input placeholder={this.state.thematicName[this.props.languages]} style={{width: '300px'}}
                                        maxLength={'28'}
                                        onChange={this.TopicNameChange.bind(this)}
                                        value={this.state.topicNameValue}
                                        />
                                </FormItem>
                                
                                <FormItem
                                    label={this.state.type[this.props.languages]}
                                    {...formItemLayout}
                                >
                                <Select style={{width: '154px'}} onSelect={this.onSelect.bind(this)} 
                                value={this.state.select!==0?this.state.select.toString():topicCatid.toString()}>
                                         {topicCatList}
                                        </Select>
                                
                                </FormItem>
                                <div className="text" >{this.state.seniorWord[this.props.languages]}
                                <Tooltip placement="bottom" title={titleTip}>
                                <Icon type="question-circle" 
                                className="iconMessage"
                                style={{marginLeft:'10px'}}
                                ></Icon>
                                </Tooltip>
                                </div>
                                <FormItem
                                    {...formItemLayout}
                                    label={this.state.keywordCombination[this.props.languages]}
                                >
                                {/* <SettingSeniorTopic num3={this.state.num3}  
                                    onDelrule={this.onDelrule.bind(this)}
                                    onDelwayRule={this.onDelwayRule.bind(this)}
                                    ruleId={this.state.ruleId}
                                    onInputConent={this.onInputConent.bind(this)}
                                    type="topic"
                                /> */}
                                <BiddingSeniorCreate num3={this.state.num3}
                                    onroleChange={this.onroleChange.bind(this)}
                                    ondelrole={this.ondelrole.bind(this)}
                                    type='mul'
                                />
                                </FormItem>
                                
                                
                                <FormItem className="addRule"
                                    {...tailFormItemLayout} 
                                >
                                <Button  type="primary" size="small"  onClick={this.seniorRule.bind(this)} >
                                      {this.state.addrule[this.props.languages]}
                                 </Button>
                                
                                </FormItem>
                                
                                <FormItem
                                    {...tailFormItemLayout}
                                >
             <Button type="primary" htmlType="submit" className="gap" onClick={this.onAddtypeTwo.bind(this)} >
                                        {this.state.save[this.props.languages]}
                                    </Button>
                                    
                                    <Button  type="primary" onClick={this.goTopiclist.bind(this)}>
                                        {this.state.cancel[this.props.languages]}
                                    </Button>
                                </FormItem>
                                
                            </Form>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        getRouter: state.getRouterReducer,
        languages: state.mulLanToggleReducer
    }
};
const mapDispatchToProps = dispatch => {
    return {
        topicNavMessageRequested:req=>{
            dispatch(topicNavMessageRequested(req));
        },
        setlocationPathname: req=>{
            dispatch(setlocationPathname(req))
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(BiddingSetting));