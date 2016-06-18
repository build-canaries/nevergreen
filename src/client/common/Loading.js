import React, {Component, PropTypes} from 'react'
import './loading.scss'

class Loading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.loading) {
      return <div className='loading'>
        <span className='icon-circle pulse'/>
        <span className='icon-circle pulse'/>
        <span className='icon-circle pulse'/>
      </div>
    } else {
      return this.props.children
    }
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default Loading
