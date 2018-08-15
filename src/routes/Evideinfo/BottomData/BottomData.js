import React from 'react'
import request from '../../../utils/request';
import {api_interent_info_http} from '../../../services/api'
import './BottomData.less'
class componentName extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    request(api_interent_info_http + `&fileName=${this.props.match.params.fileName}&offset=${1}&limit=${10}`).then(res => {
      this.setState({
        data: res.data.data
      })
    })
    let maxscroll = 0
    let count = 0
    let flag = true
    window.addEventListener('scroll', (e) => {
      maxscroll < document.documentElement.scrollTop ? maxscroll = document.documentElement.scrollTop : ''
      if(document.querySelector('.bottom-data>ul') && document.documentElement.scrollTop > document.querySelector('.bottom-data>ul').clientHeight/3 * 2 && document.documentElement.scrollTop >= maxscroll && flag) {
        count ++ 
        flag = false
        request(api_interent_info_http + `&fileName=${this.props.match.params.fileName}&offset=${count}&limit=${10}`).then(res => {
          if (res.data.code === 1) {
            let data = this.state.data.concat(res.data.data)
            this.setState({
              data
            }, () => {flag = true})
          }
        })
      }
    })
  }
  render() {
    return (
      <div className='bottom-data'>
        <ul>
          {
            this.state.data.map((item, index) => {
              return <li key={index}>
                        
                        {Object.keys(item).map((iitem, iindex) => {
                          return <span className='key' key={iindex}>{iitem}：</span>
                        })}
                        <ul>
                            {Object.keys(item[Object.keys(item)[0]]).map((iitem, iindex) => {
                              // console.log(iitem)
                              return <li key={iindex}><span className='key'>{iitem}：</span>{ 
                                      !(item[Object.keys(item)[0]][iitem] instanceof Array) ? 
                                      <span>{item[Object.keys(item)[0]][iitem]}</span> : 
                                      item[Object.keys(item)[0]][iitem].map((child, childindex) => {
                                        return <ul key={childindex}>
                                          {
                                            Object.keys(child).map((last, lastindex) => {
                                              return <li key={lastindex}><span className='key'>{last}：</span><span>{child[last]}</span></li>
                                            })
                                          }
                                        </ul>
                                      })}

                                     </li>
                            })}
                            {/* <ul>
                              <li><span>name：</span><span>Accept</span></li>
                            </ul> */}
                          
                        </ul>
                      </li>
            })
          }
          {/* <li>
            <span>Request(#1)：</span>
            <ul>
              <li>
                <span>headers</span>
                <ul>
                  <li><span>name：</span><span>Accept</span></li>
                </ul>
              </li>
            </ul>
          </li> */}
        </ul>
      </div>
    )
  }
}
export default componentName
