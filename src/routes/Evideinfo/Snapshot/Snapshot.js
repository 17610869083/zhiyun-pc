import React from 'react'
class Snapshot extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 48}}>
        <img src={`http://103.94.42.70:5000/static/all/${this.props.match.params.fileName}/shot.png`}/>
      </div>
    )
  }
}
export default Snapshot