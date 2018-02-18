import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './external-link.scss'

class ExternalLink extends Component {
  render() {
    const aProps = _.omit(this.props, ['children', 'target', 'rel'])

    return (
      <a {...aProps} target='_blank' rel='noopener noreferrer'>
        <div className={styles.newWindow}>opens in new window</div>
        {this.props.children}
      </a>
    )
  }
}

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired
}

export default ExternalLink
