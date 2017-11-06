import React, {Component} from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import styles from './external-link.scss'

class ExternalLink extends Component {
  render() {
    const aProps = omit(this.props, ['children', 'target', 'rel'])

    return (
      <a {...aProps} target='_blank' rel='noopener noreferrer'>
        <span className={styles.newWindow}>Opens in new window</span>
        {this.props.children}
      </a>
    )
  }
}

ExternalLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string
  ])
}

export default ExternalLink
