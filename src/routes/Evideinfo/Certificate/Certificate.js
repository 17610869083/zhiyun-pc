import React from 'react'
class Snapshot extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 48}}>
        <img src={`http://103.94.42.70:5000/static/all/downloadFile/${this.props.match.params.fileName}.tar.gz.dase.png`} style={{width: '100%'}} />
      </div>
    )
  }
}
export default Snapshot