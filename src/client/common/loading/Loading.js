import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import styles from './loading.scss'
import VisuallyHidden from '../VisuallyHidden'

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
          <VisuallyHidden>loading</VisuallyHidden>
          <span className={styles.pulse} aria-hidden='true'/>
          <span className={styles.pulse} aria-hidden='true'/>
          <span className={styles.pulse} aria-hidden='true'/>
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
