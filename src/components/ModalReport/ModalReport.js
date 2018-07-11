import React from 'react';
import {Checkbox,Input,Button,Modal,message} from 'antd';
import './ModalReport.less';
import IconFont from '../IconFont';
import request from '../../utils/request';
import ReportDetailList from '../ReportDetailList/ReportDetailList';
import ModalMaterial from '../ModalMaterial/ModalMaterial';
import ModalAllOpinion from '../ModalAllOpinion/ModalAllOpinion';
import {checkedTrueSid} from '../../utils/format';
import {api_refresh_brief,api_edit_excerpt,api_get_excerpt} from '../../services/api';
const InputGroup = Input.Group;
class ModalReport extends React.Component{
     constructor(){
         super();
         this.state = {
              docList:[],
              checkedArray:new Array(20).fill(false),
              page:1,
              flag:true,
              checkedAll:false,
              materialvisible:false,
              allOpinionvisible:false,
              isDropDown:true,
              keyword:''
         }
         
     }
     componentDidMount(){
         if(this.props.docList){
            this.setState({
                docList:this.props.docList,
                flag:false,
                isDropDown:false
            })
         }else{
            let {requestUrl} = this.props; 
            request(requestUrl).then( res => {
                this.setState({
                    docList:res.data.data,
                    flag:false
                })
            })
         }
    }
    dropDown(){
        if(this.state.isDropDown){
        this.setState({
            flag:true
        })
        let {requestUrl} = this.props; 
        request(requestUrl +'&page='+ this.state.page+1)
        .then( res => {
            this.setState({
            docList:this.state.docList.concat(res.data.docList),
            page:this.state.page+1,
            flag:false,
            checkedArray:this.state.checkedArray.concat(new Array(20).fill(false))
            })
        })
       }
     }
     //全选
     checkAll(e){
         if(e.target.checked){
            this.setState({
                checkedArray:this.checkedTrue(),
                checkedAll:e.target.checked
              })
         }else{
            this.setState({
                checkedArray:this.state.checkedArray.fill(false),
                checkedAll:e.target.checked
              })
         }

     }
     //单选
     checkItem(sids){
        this.setState({
          checkedArray:sids
        })
     }
     //获取sid
     checkedTrue() {
      const arr = [];
      this.state.docList.forEach((item, index) => {
          arr.push(item.sid);
      });
      return arr;
      }

      //删除
      delete(){
          request(api_edit_excerpt,{
            method:'POST',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }, 
            body:`reportId=${this.props.reportId}&moduleId=${this.props.modalId}&code=0&sids=${JSON.stringify(checkedTrueSid(this.state.checkedArray))}`
          }).then(res => {
            if(res.data.code === 1){
                this.setState({
                    docList:res.data.data
                })
            }
          })
      }
      //确定按钮
      confirm = () => {
         if(this.props.checkReport){
         request(api_refresh_brief + `&reportId=${this.props.reportId}`)
         .then(res => {
             if(res.data.code === 1){
                this.props.checkReport(res.data.data,false); 
             }
         })
        }else{
            if(this.checkedTrue().length>50){
                message.error('当前数据已达到最大数50条')
            }else{
                request(api_get_excerpt +`&reportId=${this.props.reportId}&moduleId=${this.props.modalId}`)
                .then(res => {
                    this.props.checkDaily(res.data.informationExcerpt);
                })
            }
        }
        this.setState({
            materialvisible:false
        })
      }
      //显示素材库弹窗
      showMaterialModal = () => {
         this.setState({
          materialvisible:true
         })
      }
      //关闭弹窗
      cancel = () => {
          this.setState({
            materialvisible:false,
            allOpinionvisible:false
          })
      }
      //素材库弹窗回调数据
      checkMaterial = (data) => {
           this.setState({
             docList:data,
             isDropDown:false,
             materialvisible:false,
             allOpinionvisible:false
           })
      }

      handleChange(){

      }
      //监测弹窗
      keyDown = (e) => {
          this.setState({
            keyword:e.target.value
          })
         if(e.keyCode === 13){
            if(this.checkedTrue().length>=50){
                message.error('当前数据已达到最大数50条');
                return;
            }else{
                this.setState({
                    allOpinionvisible:true
                })
            }
         }
      }
     render(){
         return (
             <div className="modal-report opinion-detail">
                 <div className="modal-top">
                    <div>
                    <Checkbox onChange={this.checkAll.bind(this)} checked={this.state.checkedAll}/>
                    <span>全选</span>
                    <i onClick={this.delete.bind(this)}><IconFont type="icon-shanchu1-copy-copy" style={{marginLeft:'16px'}}/></i>
                    <span style={{marginLeft:'36px'}} onClick={this.showMaterialModal}> 素材库</span>
                    </div>
                    <InputGroup compact>
                    <p className="all-search">全站搜索</p>
                    <Input onKeyDown={this.keyDown}/>
                    </InputGroup>
                    <Button type="primary" onClick={this.confirm}>确定</Button>
                 </div> 
                 <div className="modal-list bottom">
                      <ReportDetailList
                       checkedArray={this.state.checkedArray}
                       docList={this.state.docList}
                       dropDown={this.dropDown.bind(this)}
                       flag={this.state.flag}
                       checkItem = {this.checkItem.bind(this)}
                       type='report'
                      />
                 </div>  
                 <Modal width="70%" visible={this.state.materialvisible} footer={null} onCancel={this.cancel}>
                     <ModalMaterial 
                     reportId={this.props.reportId}
                     checkMaterial ={this.checkMaterial}
                     />
                 </Modal>
                 <Modal width="70%" visible={this.state.allOpinionvisible} footer={null} onCancel={this.cancel}>
                     <ModalAllOpinion 
                     reportId={this.props.reportId}
                     startDate={this.props.startDate}
                     endDate={this.props.endDate}
                     seltype='title'
                     keyword={this.state.keyword}
                     checkMaterial ={this.checkMaterial}
                     modalId={this.props.modalId}
                     />
                 </Modal>
             </div>
         )
     }
}


export default ModalReport;