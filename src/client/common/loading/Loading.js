import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import styles from './loading.scss'

class Loading extends Component {
  render() {
    if (this.props.loaded) {
      return <Fragment>{this.props.children}</Fragment>
    } else {
      return (
        <div className={styles.loading}
             data-locator='loading'
             role='alertdialog'
             aria-busy='true'
             aria-live='assertive'>
          <span className={styles.loadingText}>loading</span>
          <span className={styles.pulse}/>
          <span className={styles.pulse}/>
          <span className={styles.pulse}/>
        </div>
      )
    }
  }
}

Loading.propTypes = {
  children: PropTypes.node,
  loaded: PropTypes.bool
}

export default Loading
