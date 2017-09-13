import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './success-image.scss'

class SuccessImage extends Component {
  render() {
    return (
      <div id='success-image'>
        <img src={this.props.url} className={styles.image} alt=''/>
      </div>
    )
  }
}

SuccessImage.propTypes = {
  url: PropTypes.string.isRequired
}

export default SuccessImage
