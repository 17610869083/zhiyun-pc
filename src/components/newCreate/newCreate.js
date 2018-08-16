import React from 'react';
import {Input, Modal, Form, message, Row, Col, Icon,Tooltip, Button} from 'antd';
import './newCreate.less';
import {connect} from 'react-redux';
const FormItem = Form.Item;
class BiddingCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lang: 0,
            visible: false,
            visible1: false,
            prevhash: '',
            num1: [],
            disBlock: {visibility: 'visible',color:'#ff0000'},
            disNone: {visibility: 'hidden',color:'#ff0000'},
            editRoleId: 0,
            editInput: [],
            modalinput: {},
            delIndex: 0,
            langType: 0,
            themWord: ['主题词', '제목 제목', '件名見出し', 'قىسقارتما تېما ', 'གཙོ་ཚིག་', 'Subject heading'],
            associativeWords1: ['关联词1', '관련 단어 1', '関連ワード1', 'مۇناسىۋەتلىك سۆز 1 ', '（ ཕྲད་། 1', 'Related word 1'],
            associativeWords2: ['关联词2', '관련 단어 2', '関連ワード2', 'مۇناسىۋەتلىك سۆز 2 ', '（ ཕྲད་། 2', 'Related word 2'],
            exclusionWords: ['排除词', '제외 단어', '除外ワード', 'چىقىرىۋېتىش سۆز ', 'ཚིག་སེལ་', 'Exclusion word'],
            settingWord: ['设置关键词', '설치 키워드', 'キーワードを設ける', 'ئاچقۇچلۇق سۆز تەسىس قىلىش', 'གནད་ཚིག་ཁོངས་སུ་།', 'Set keywords'],
            themWordTip: ['核心词汇，例如事件的名称、地域、人名、产品名称、公司企业名称等。(不能为空)', '이벤트 이름, 지역 이름, 사람 이름, 제품 이름, 회사 이름 등과 같은 핵심 어휘 (비워 둘 수 없다)', 'イベントの名称、地域、人名、製品名、会社名などのコアボキャブラリ （空にすることはできません）', 'يادرولۇق سۆز ، مەسىلەن ، ۋەقە نامى ، جاي، ئىسىم، مەھسۇلات ئىسمى، شىركەت كارخانىنىڭ نامى قاتارلىقلار . ( بولمايدۇ ) . ', 'ལྟེ་བའི་ཐ་སྙད་། དཔེར་ན་དོན་རྐྱེན་གྱི་མིང་དང་། ས་ཁུལ་, མིའི་མིང་, ཐོན་རྫས་ཀྱི་མིང་དང་། ཀུང་སིས་ཁེ་ལས་ཀྱི་མིང་སོགས་། （ སྟོང་མི་ཆོག་། ）', 'Core vocabulary, such as the name of the event, region, person name, product name, company name, etc. (Can not be empty)'],
            associativeWords1Tip: ['描述“主题词”的词汇。(可以为空)', '주제를 설명하는 어휘. (비어있을 수 있음)', '「主語」を説明する語彙。 （空でもよい）', 'تەسۋىرلەش » باش تېما قىلىپ » سۆزلىرى . ( قۇرۇق بولىدۇ ) ', '“ བརྗོད་དོན་གཙོ་བོ་” པའི་སྐད་ཆ་ཞིག་རེད་། （ སྟོང་）', 'A vocabulary describing the "subject". (can be empty)'],
            associativeWords2Tip: ['描述“主题词”与“关联词1”的词汇。(可以为空)', '제목과 "관련 단어 1"을 설명하는 어휘. (비어있을 수 있음)', '「主語」と「関連語1」を記述する語彙。 （空でもよい）', 'تەسۋىرلەش » باش تېما قىلىپ » بىلەن « 1 » گە مۇناسىۋەتلىك سۆزلۈك . ( قۇرۇق بولىدۇ ) ', '“ བརྗོད་དོན་གཙོ་བོ་” དང་“ 1 ” གི་ཐ་སྙད་ལ་བཀོད་པའི་ཕྲད་། （ སྟོང་）', 'A vocabulary describing the "topic" and "associated word 1". (can be empty)'],
            exclusionWordsTip: ['排除歧义词或不相关的词汇、容易产生误解的词汇。(可以为空)', '모호한 단어 또는 관련성이없는 단어, 오해 할 수있는 단어는 제외하십시오. (비어있을 수 있음)', 'あいまいな言葉や無関係な言葉、誤解を起こしやすい言葉を除外します。 （空でもよい）', 'تۈگىتىپ ھەر خىل چۈشەندۈرۈش سۆز ياكى مۇناسىۋەتلىك سۆزلەرنى ئەمەس ، ئاسانلا خاتا چۈشەنچە پەيدا قىلىدىغان سۆز . ( قۇرۇق بولىدۇ )', 'སེལ་བྱུང་དུ་མ་བཅུག་པའི་རིགས་། འབྲེལ་ཡོད་ཀྱི་ཐ་སྙད་དང་ཐ་སྙད་མི་དང་། གོ་ནོར་ཐེབས་སླ་པའི་སྐད་ཆ་ཞིག་རེད་། （ སྟོང་）', 'Exclude ambiguous words or irrelevant words, words that are prone to misunderstanding. (can be empty)'],
            Tip: {
                row1: ['①主题词：北京 河北', '①키워드 : 베이징 하북성', '①キーワード：北京河北省', '①تېما : بېيجىڭ خېبىي', '①དོན་རྩ་། པེ་ཅིང་། ཧོ་པེ་།', '①Key words: Beijing Hebei'],
                row2: ['②关联词1：暴雨 冰雹 暴雪', '②관련 단어 1 : 폭우, 우박, 블리자드', '②関連ワード1：豪雨、雹、ブリザード', '② مۇناسىۋەتلىك سۆز 1 : قارا يامغۇر ۋە مۆلدۈر ياغدى قار ياغدى ', '②1 ལ་བཀོད་པའི་ཕྲད་། དྲག་ཆར་། སེར་བ་དྲག་ཆར་འབབ་', '②Related words 1: Heavy rain, hail, Blizzard'],
                row3: ['③关联词2：预警 受灾 伤亡', '③관련 단어 2 : 조기 경보, 재해, 사상자', '③関連単語2：早期警戒、災害、死傷者', '③ باغلىغۇچى 2 : ئالدىن سىگنال بېرىش ، ئاپەتكە ئۇچرىغان يارىلىنىش ', '③（ ཕྲད་། གཉིས་པ་། ཉེན་བརྡ་གཏོང་བའི་གནོད་འཚེ་ཕོག་པའི་རྨས་', 'related words 2: early warning, disaster, casualties'],
                row4: ['④排除词：暴雪公司 (歧义词)', '④개의 제외 단어 : Blizzard Company (모호한 단어)', '④除外ワード：Blizzard Company（あいまいな言葉）', '④ سۆزنى چىقىرىۋېتىش : باۋشۆ شىركىتىنىڭ ( كۆپ مەنىلىك سۆز )', '④ སེལ་ཚིག་སྟེ་། གངས་ཆེན་ཀུང་སིས་（ ཐ་སྙད་ལ་གོ་བ་ལེན་ཚུལ་མི་འདྲ་བ་', '④exclusion words: Blizzard Company (ambiguous words)'],
                row5: ['系统会匹配舆情信息中出现主题词[北京或者河北]，并且包含关联词1[暴雨或者冰雹或者暴雪],包含关联词2[预警或者受灾或者伤亡]的数据,其中不包含排除词[暴雪公司]。', '이 시스템은 여론 정보에서 [Beijing 또는 Hebei]라는 키워드를 검색하고 [Blizzard Company]라는 제외 단어가없는 관련 단어 2 [경고 또는 재해 또는 사상자]의 데이터를 포함하여 관련 단어 1 [폭풍우 또는 우박 또는 눈보라가 섞인 단어]를 포함합니다.', 'システムはキーワード「北京または河北」と世論情報を照合し、除外語[Blizzard Company]を含まない関連単語2 [警告または災害または死傷者]のデータを含む関連単語1 [暴風雨または雹または吹雪]を含む。', 'سىستېما ماس كېلىدىغان جامائەت پىكرى ئەھۋالىغا دائىر ئۇچۇرلارنى جەريانىدا كۆرۈلگەن تېما [ بېيجىڭ ياكى خېبېي ، ھەمدە مۇناسىۋەتلىك سۆز ئۆز ئىچىگە ئالغان قارا يامغۇر ياكى مۆلدۈر ياكى قار ] 1 [ ، 2 ] [ ئالدىن سىگنال بېرىش ياكى ئاپەتكە ئۇچرىشى ياكى تالاپەت مۇناسىۋەتلىك سۆز ئۆز ئىچىگە ئالغان سانلىق مەلۇمات ، بۇنىڭ ئىچىدە سۆز [ باۋشۆ شىركىتىنىڭ ［ چىقىرىۋېتىش ئۆز ئىچىگە ئالمايدۇ .', 'མ་ལག་དེས་སྙོམ་སྒྲིག་གི་གླེང་ཕྱོགས་གནས་འཕྲིན་འཚོ་ཁྲོད་དུ་ཐོན་པའི་གཙོ་ཚིག་［ པེ་ཅིན་ནམ་ཧོ་པེ་］ དང་། མ་ཟད་ནང་1 ［ དྲག་ཆར་པའམ་ཡང་ན་སེར་བ་འབབ་པའམ་གངས་དྲག་ཆེན་བཏང་］ ལ་བཀོད་པའི་ཕྲད་དང་2 ［ སྔོན་བརྡའི་ནང་ལ་བཀོད་པའི་ཕྲད་པའམ་ཡང་ན་གནོད་འཚེ་ཕོག་པའམ་ཤི་རྨས་］ ཀྱི་གཞི་གྲངས་དང་དེའི་ནང་ཚུད་མེད་། ཀུང་སི་］ ཚིག་［ གངས་འཚུབ་སེལ་།', 'The system will match the keyword [Beijing or Hebei] in the public opinion information, and contain the associated word 1 [storm or hail or blizzard], including the data of the related word 2 [warning or disaster or casualties], which does not contain the exclusion word [Blizzard Company].']
            },
            addrule: ['添加规则+', '규칙 추가+', 'ルールを追加する+', '+ قوشۇش قائىدىسى', 'སྦྱོར་རྟ་བྱེད་པ་། སྒྲིག་སྲོལ་+', 'Add rules+'],
            confirm: ['确认', '확인', '確認', 'بېكىتىش ', 'ཁས་ལེན་གསལ་ཐག་ཆོད་པ་', 'confirm'],
            cancel: ['取消', '취소', 'キャンセル', 'ئەمەلدىن قالدۇرماق ', 'མི་དགོས་པར་བཟོ་བ་', 'cancel'],
            prevRule: ['请添加上一条规则', '규칙을 하나 더 해 주세요.', 'ルールを添付してください。', 'قوشۇپ بىر قائىدىسى', 'སྒྲིག་ལམ་གང་ལའང་རོགས་སྟེང་དུ་བསྣན་', 'Please add the previous rule'],
            subjectEmpty: ['主题词不能为空！', '제목 단어는 비워 둘 수 없습니다!', '件名は空にできません！', 'تېما قۇرۇق بولسا بولمايدۇ .', 'མཇུག་ཏུ་སྟོང་མི་ཆོག་', 'Subject words cannot be empty!'],
            specialCharacters: ['请不要带有特殊字符', '특별 한 단어를 가지고 있지 마세요.', '特殊文字を持たないで下さい。', 'قىلماڭ تۈسىنى ئالغان ئالاھىدە ھەرپ - بەلگە ', 'མ་བྱེད་རོགས་དང་འདྲེས་། དམིགས་བསལ་ཡིག་རྟགས་', 'Please do not carry special characters'],
            confirm: ['确认', '확인', '確認', 'بېكىتىش ', 'ཁས་ལེན་གསལ་ཐག་ཆོད་པ་', 'confirm'],
            cancel: ['取消', '취소', 'キャンセル', 'ئەمەلدىن قالدۇرماق ', 'མི་དགོས་པར་བཟོ་བ་', 'cancel'],
            keywordGroup: ['确定要删除这个关键词组吗?', '이 키워드 그룹을 삭제 하시겠습니까?', 'このキーワードグループを削除してもよろしいですか？', 'ئۆچۈرەمسىز بۇ ئاچقۇچلۇق سۆز بىرىكمىسى بارمۇ ؟ ', 'གནད་ཚིག་དེ་བསུབ་རོགས་། གཏན་འཁེལ་ཚོགས་ཆུང་ཡོད་དམ་།', 'Are you sure you want to delete this keyword group?']
        }
    }

    componentWillReceiveProps(nextprops) {
        // console.log(nextprops, this.props)
        // if(this.state.prevhash !== window.location.hash) {
        //     console.log(nextprops.num1)
        //     this.setState({
        //         num1: JSON.parse(nextprops.num1)
        //     }, () =>{console.log(this.state.num1)})
            
        // }
        // console.log(this.state.num1)
        // debugger
        if(nextprops.type === 'mul'){
            // console.log(this.props.languages)
            this.setState({
                lang: nextprops.languages
            })
        }
        let jsoNextprops = JSON.stringify(nextprops.num1)
        let jsonProps = JSON.stringify(this.props.num1)
        // if(!jsonProps !== jsoNextprops && window.location.hash.split('&')[0] !== '#/bidding/setting?type=add' && this.state.num1.length <= 0) {
        if(!jsonProps !== jsoNextprops && this.urlParme2Obj().type !== 'add' && this.state.num1.length <= 0) {
            this.setState({
                num1: JSON.parse(nextprops.num1)
            })
        }
        if(this.state.prevhash !== window.location.hash && this.urlParme2Obj().type === 'add') {
            this.setState({
                num1: [{rule1: '', rule2: '', rule3: '', rule4: ''}]
            })
        }
        this.setState({
            prevhash: window.location.hash
        })
    }
    showModal(index) {
        this.state.modalinput.rule1 = this.state.num1[index].rule1
        this.state.modalinput.rule2 = this.state.num1[index].rule2
        this.state.modalinput.rule3 = this.state.num1[index].rule3
        this.state.modalinput.rule4 = this.state.num1[index].rule4
        this.setState({
            editRoleId: index,
            visible: true
        })
    }
    onModelCancel() {
        // console.log(this.state.modalinput)
        // Object.keys(this.state.num1[this.state.editRoleId]).forEach((k) => {
        //     // console.log()
        //     this.state.num1[this.state.editRoleId][k] = this.props.num1[this.state.editRoleId][k]
        // })
        this.setState({
            visible: false,
            modalinput: []
        })
    }
    onModelOk() {
        // console.log(this.state.num1)
        // console.log(this.state.modalinput)
        // console.log(this.state.editRoleId)
        if (this.state.modalinput['rule1'].trim() === '') {
            message.error(this.state.subjectEmpty[this.state.lang])
            return false
        }
        this.state.num1[this.state.editRoleId]['rule1'] = this.state.modalinput['rule1']
        this.state.num1[this.state.editRoleId]['rule2'] = this.state.modalinput['rule2']
        this.state.num1[this.state.editRoleId]['rule3'] = this.state.modalinput['rule3']
        this.state.num1[this.state.editRoleId]['rule4'] = this.state.modalinput['rule4']
        this.setState({
            visible: false
        })
        this.props.onEditRole(this.state.num1)

    }
    addRole() {
        if (this.state.num1[this.state.num1.length - 1]['rule1'].trim() === '') {
            message.error(this.state.prevRule[this.state.lang])
            return false
        }
        let newRole = [{
            "rule1":"",
            "rulecode1":"",
            "id":"",
            "rule2":"",
            "rulecode2":"",
            "rule3":"",
            "rulecode3":"",
            "rule4":"",
            "rulecode4":""
        }]
        this.setState({
            num1: this.state.num1.concat(newRole)
        }, () => {this.props.onAddRole(this.state.num1)})
    }
    delOneRole(e) {
        this.setState({
            visible1:true,
            delIndex: e.target.getAttribute('data-index')
        })
    }
    handleOk1() {
        let index = this.state.delIndex;
        let delrole = this.state.num1.splice(index,1)
        this.setState({
            num1: this.state.num1,
            editRoleId: 0,
            visible1: false
        },() => {this.props.onDelRow(delrole, this.state.num1)})
    }
    handleCancel1() {
        this.setState({
            visible1: false,
            delIndex: 0
        })
    }
    clear(rulenum, index) {
        this.state.num1[index][rulenum] = ''
        this.setState({}, () => {this.props.onDelOne(this.state.num1)})
    }
    onChangeInput(rulenum, e) {
        let value = e.target.value
        let newValue
        let reg = /~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\./g
        if(reg.test(value)){
            newValue  = value.replace(reg,'')
            message.warning(this.state.specialCharacters[this.state.lang]);
        } else {
            newValue  = value
        }
        this.state.modalinput[rulenum] = newValue
        this.setState({})
        // let newnum =
        // this.state.editInput.indexOf(rulenum) === -1 ? this.state.editInput.push(rulenum) : this.state.editInput
        //  this.state.num1[this.state.editRoleId][rulenum] = e.target.value
        // console.log(newnum)
        // this.setState({
        //     num1:this.state.num1
        // })
        // console.log(e.target.value)
    }
    urlParme2Obj() {
        let parame = window.location.href.split('?')[1]
        if (parame !== undefined) {
            // console.log(parame)
            let obj = {}
            parame.split('&').forEach(item => {
                let kv = item.split('=') 
                obj[kv[0]] = kv[1]
            })
            return obj
        }else {
            return {}
        }
    }
    render() {
        // let inputIndex=this.state.inputIndex<0?0:this.state.inputIndex;
        const suffix = (rulenum, index) => {
            return <span className="del" onClick={this.clear.bind(this, rulenum, index)}><Icon type="close"/></span>;
        }
        const objectValueTip=<span>{this.state.themWord[this.state.lang]}&nbsp;<Tooltip placement="bottom" title={this.state.themWordTip[this.state.lang]}>
            <Icon type="question-circle" className="iconMessageTip"></Icon>
            </Tooltip>
            </span>;

        const subject1ValueTip=<span>{this.state.associativeWords1[this.state.lang]}<Tooltip placement="bottom" title={this.state.associativeWords1Tip[this.state.lang]}>
        <Icon type="question-circle" className="iconMessageTip"></Icon>
        </Tooltip>
        </span>;

        const subject2ValueTip=<span>{this.state.associativeWords2[this.state.lang]}<Tooltip placement="bottom" title={this.state.associativeWords2Tip[this.state.lang]}>
        <Icon type="question-circle" className="iconMessageTip"></Icon>
        </Tooltip>
        </span>;

        const filterValueTip=<span>{this.state.exclusionWords[this.state.lang]}&nbsp;<Tooltip placement="bottom" title={this.state.exclusionWordsTip[this.state.lang]}>
        <Icon type="question-circle" className="iconMessageTip"></Icon>
        </Tooltip>
        </span>;

        const title =<div>
             <p>{this.state.Tip.row1[this.state.lang]}</p>
             <p>{this.state.Tip.row2[this.state.lang]}</p>
             <p>{this.state.Tip.row3[this.state.lang]}</p>
             <p>{this.state.Tip.row4[this.state.lang]}</p>
             <p>{this.state.Tip.row5[this.state.lang]}</p>
        </div>
        const modalFooter = (handleCancel, handleOk, _this) => {
            return (<div><Button size="large" onClick={handleCancel.bind(_this)}>{this.state.cancel[this.state.lang]}</Button><Button type="primary" size="large" onClick={handleOk.bind(_this)}>{this.state.confirm[this.state.lang]}</Button></div>)
        }
        const modal= <div>
        <Modal
            visible={this.state.visible}
            title={this.state.settingWord[this.state.lang]}
            okText={this.state.confirm[this.state.lang]}
            onCancel={this.onModelCancel.bind(this)}
            onOk={this.onModelOk.bind(this)}
            footer={modalFooter(this.onModelCancel, this.onModelOk, this)}
        > 
        <Form layout="vertical">
            <FormItem label={objectValueTip}>
            {/* {console.log(this.state.editRoleId, this.state.num1)} */}
                <Input type="textarea"
                       onChange={this.onChangeInput.bind(this, 'rule1')}
                       maxLength={'50'}
                       value={this.state.modalinput.rule1}
                       />
            </FormItem>
            <FormItem label={subject1ValueTip}>
                <Input type="textarea"
                       onChange={this.onChangeInput.bind(this, 'rule2')}
                       maxLength={'500'}
                       value={this.state.modalinput.rule2}
                />
            </FormItem>
            <FormItem label={subject2ValueTip}>
                <Input type="textarea"
                       onChange={this.onChangeInput.bind(this, 'rule3')} 
                       maxLength={'500'}
                       value={this.state.modalinput.rule3}
                />
            </FormItem>
            <FormItem label={filterValueTip}>
                <Input type="textarea"
                       onChange={this.onChangeInput.bind(this, 'rule4')}
                       maxLength={'50'}
                       value={this.state.modalinput.rule4}
                />
            </FormItem>
        </Form>
        <Tooltip placement="bottom" title={title}>
        <Icon type="question-circle" style={{color:'#000000'}}></Icon>
        </Tooltip>
    </Modal></div> ;
        const list=this.state.num1.map((item,index)=>
        <div key={index} className="mate-key"><div>
                    <Row>
                        <Col span={4}>
                            <Input
                                placeholder={this.state.themWord[this.state.lang]}
                                readOnly
                                onClick={this.showModal.bind(this,index)}
                                // suffix={suffix}
                                value={item.rule1}
                            />  
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <span className="bigFont">*</span>
                        </Col>
                        <Col span={4}>
                            <Input placeholder={this.state.associativeWords1[this.state.lang]}
                                   readOnly
                                   onClick={this.showModal.bind(this,index)}
                                   suffix={suffix('rule2', index)}
                                   value={item.rule2}
                               
                            />
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <span className="bigFont">*</span>
                        </Col>
                        <Col span={4}>
                            <Input placeholder={this.state.associativeWords2[this.state.lang]}
                                   readOnly
                                   onClick={this.showModal.bind(this,index)}
                                   suffix={suffix('rule3', index)}
                                   value={item.rule3}
                                   />
                        </Col>
                        <Col span={1} style={{textAlign: 'center'}}>
                            <Icon type="minus"/>
                        </Col>
                        <Col span={4}>
                            <Input placeholder={this.state.exclusionWords[this.state.lang]}
                                   readOnly
                                   onClick={this.showModal.bind(this,index)}
                                   suffix={suffix('rule4', index)}
                                   value={item.rule4}
                            />
                        </Col>

        <Icon  type="minus-circle" className="delBtn" onClick={this.delOneRole.bind(this)}
         style={this.state.num1.length>1?this.state.disBlock:this.state.disNone}
        //  data-delid={item.id}
         data-index={index}
         />
        <Modal
          title={this.state.settingWord[this.state.lang]}
          visible={this.state.visible1}
          onOk={this.handleOk1.bind(this)}
          onCancel={this.handleCancel1.bind(this)}
          footer={null}
        >
          <p className="textCenter">{this.state.keywordGroup[this.state.lang]}</p>
          <Button onClick={this.handleCancel1.bind(this)}>{this.state.cancel[this.state.lang]}</Button>
          <Button onClick={this.handleOk1.bind(this)}>{this.state.confirm[this.state.lang]}</Button>
        </Modal></Row>
                </div></div>);
        return (
            <div className="rightBox">

            {list}
            {modal}
            <Button type="primary" size="small" onClick={this.addRole.bind(this)}>{this.state.addrule[this.state.lang]}</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        languages: state.mulLanToggleReducer
    }
};
export default connect(mapStateToProps, null)(BiddingCreate);
