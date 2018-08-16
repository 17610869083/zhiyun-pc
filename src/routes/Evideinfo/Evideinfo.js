import React from 'react'
import {Route} from 'react-router-dom';
import {Menu} from 'antd'
import {history} from '../../utils/history'
import './Evideinfo.less'
import Snapshot from './Snapshot/Snapshot'
import Certificate from './Certificate/Certificate'
import BottomData from './BottomData/BottomData'
import Routeinfo from './Routeinfo/Routeinfo'
class EvideInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'routeinfo'
    }
  }
  urlToObj(url) {
    let obj = {}
    let str = url.split('?')[1].split('=')
    obj[str[0]] = str[1]
    return obj
  }
  handleClick(value) {
    const fileName = this.urlToObj(this.props.location.search).fileName
    switch (value.key) {
      case 'routeinfo':
        window.open('http://103.94.42.70:5000/download/' + fileName +'/route.json')
        break;
      case 'snapshot':
        window.open('http://103.94.42.70:5000/download/' + fileName +'/shot.png')
        break;
      case 'bottomdata':
        window.open('http://103.94.42.70:5000/download/' + fileName +'/http.json')
        // request('http://103.94.42.70:5000/download/' + fileName +'/http.json').then(res => {
        //   console.log(res)
        // })
        break;
      case 'certificate':
        window.open('http://103.94.42.70:5000/static/all/downloadFile/'+ fileName +'.tar.gz.dase.png')
    }
  }
  onClick(key) {
    this.setState({
      current: key 
    })
    const fileName = this.urlToObj(this.props.location.search).fileName
    history.push({
      pathname: `/allopinion/evidinfo/${key}/${fileName}`,
      search: `fileName=${fileName}`
    })
  }
  render() {
    const SubMenu = Menu.SubMenu;
    return (
      <div className="evide-info">
        <Menu
          onClick={this.handleClick.bind(this)}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          className="menu"
        >
          <SubMenu title={<span>路由信息</span>} onTitleClick ={this.onClick.bind(this, 'routeinfo')}>
            <Menu.Item key="routeinfo">下载</Menu.Item>
          </SubMenu>
          <SubMenu title={<span>网页快照</span>} onTitleClick ={this.onClick.bind(this, 'snapshot')}>
            <Menu.Item key="snapshot">下载</Menu.Item>
          </SubMenu>
          <SubMenu title={<span>底层数据</span>} onTitleClick ={this.onClick.bind(this, 'bottomdata')}>
              <Menu.Item key="bottomdata">下载</Menu.Item>
          </SubMenu>
          <SubMenu title={<span>存证证书</span>} onTitleClick ={this.onClick.bind(this, 'certificate')}>
            <Menu.Item key="certificate">下载</Menu.Item>
          </SubMenu>
        </Menu>
        <Route path='/allopinion/evidinfo/snapshot/:fileName' component={Snapshot}/>
        <Route path='/allopinion/evidinfo/certificate/:fileName' component={Certificate}/>
        <Route path='/allopinion/evidinfo/bottomdata/:fileName' component={BottomData}/>
        <Route path='/allopinion/evidinfo/routeinfo/:fileName' component={Routeinfo}/>
      </div>
    )
  }
}
export default EvideInfo