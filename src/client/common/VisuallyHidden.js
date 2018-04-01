import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './visually-hidden.scss'

export const VISUALLY_HIDDEN_ATTRIBUTE = 'data-visually-hidden'

class VisuallyHidden extends Component {
  render() {
    const hiddenAttribute = {[VISUALLY_HIDDEN_ATTRIBUTE]: true}
    return <div className={styles.content} {...hiddenAttribute}>{this.props.children}</div>
  }
}

VisuallyHidden.propTypes = {
  children: PropTypes.node.isRequired
}

export default VisuallyHidden
