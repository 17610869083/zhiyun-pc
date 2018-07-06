import React from 'react';
import {Checkbox,Input,Button,Modal} from 'antd';
import './ModalReport.less';
import IconFont from '../IconFont';
import request from '../../utils/request';
import ReportDetailList from '../ReportDetailList/ReportDetailList';
import ModalMaterial from '../ModalMaterial/ModalMaterial';
import {checkedTrueSid} from '../../utils/format';
class ModalReport extends React.Component{
     constructor(){
         super();
         this.state = {
              docList:[],
              checkedArray:new Array(20).fill(false),
              page:1,
              flag:true,
              checkedAll:false,
              materialvisible:false
         }
         
     }
     componentDidMount(){
        let {requestUrl} = this.props; 
        request(requestUrl).then( res => {
            console.log(res.data)
              this.setState({
                docList:res.data.data,
                flag:false
              })
        })
    }
    dropDown(){
        this.setState({
            flag:true
        })
        request('http://119.90.61.155/om31/webpart/main/DocSearchDo?action=docList&page='+ this.state.page+1)
        .then( res => {
            this.setState({
            docList:this.state.docList.concat(res.data.docList),
            page:this.state.page+1,
            flag:false,
            checkedArray:this.state.checkedArray.concat(new Array(20).fill(false))
            })
        })
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
          console.log(checkedTrueSid(this.state.checkedArray))
      }
      //确定按钮
      confirm = () => {
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
            materialvisible:false
          })
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
                    <Input/>
                    </div>
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
                     <ModalMaterial />
                 </Modal>
             </div>
         )
     }
}


export default ModalReport;