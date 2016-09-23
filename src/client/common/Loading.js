import React, {Component, PropTypes} from 'react'
import './loading.scss'

class Loading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.loaded) {
      return this.props.children
    } else {
      return <div className='loading'>
        <span className='icon-circle pulse'/>
        <span className='icon-circle pulse'/>
        <span className='icon-circle pulse'/>
      </div>
    }
  }
}

Loading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  loaded: PropTypes.bool
}

export default Loading
