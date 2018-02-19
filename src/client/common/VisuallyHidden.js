import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './visually-hidden.scss'

class VisuallyHidden extends Component {
  render() {
    return <span className={styles.content}>{this.props.children}</span>
  }
}

VisuallyHidden.propTypes = {
  children: PropTypes.node.isRequired
}

export default VisuallyHidden
