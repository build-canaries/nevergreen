import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './external-link.scss'

class ExternalLink extends Component {
  render() {
    const aProps = _.omit(this.props, ['children', 'target', 'rel'])

    return (
      <a {...aProps} target='_blank' rel='noopener noreferrer'>
        <span className={styles.newWindow}>opens in new window</span>
        {this.props.children}
      </a>
    )
  }
}

ExternalLink.propTypes = {
  children: PropTypes.any.isRequired
}

export default ExternalLink
