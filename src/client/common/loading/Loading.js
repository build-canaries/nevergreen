import React, {Children, Component} from 'react'
import PropTypes from 'prop-types'
import styles from './loading.scss'

class Loading extends Component {
  render() {
    if (this.props.loaded) {
      const childrenCount = Children.count(this.props.children)

      if (childrenCount > 1) {
        return <span>{this.props.children}</span>
      } else if (childrenCount === 1) {
        return this.props.children
      } else {
        return null
      }
    } else {
      return <div className={styles.loading} data-locator='loading'>
        <span className={styles.pulse}/>
        <span className={styles.pulse}/>
        <span className={styles.pulse}/>
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
