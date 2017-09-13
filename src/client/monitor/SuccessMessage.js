import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ScaledGrid from '../common/scale/ScaledGrid'
import styles from './success-message.scss'

class SuccessMessage extends Component {
  render() {
    return (
      <ScaledGrid>
        <div className={styles.successMessage}>
          <div className={styles.message}>{this.props.message}</div>
        </div>
      </ScaledGrid>
    )
  }
}

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default SuccessMessage
