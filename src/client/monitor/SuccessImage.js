import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './success-image.scss'

class SuccessImage extends Component {
  render() {
    return (
      <div id='success-image' className='success-image'>
        <img src={this.props.url} className='image' alt=''/>
      </div>
    )
  }
}

SuccessImage.propTypes = {
  url: PropTypes.string.isRequired
}

export default SuccessImage
