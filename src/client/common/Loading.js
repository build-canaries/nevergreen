import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import styles from './loading.scss'
import {VisuallyHidden} from './VisuallyHidden'

export function Loading({loaded, children}) {
  if (loaded) {
    return <Fragment>{children}</Fragment>
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

Loading.propTypes = {
  children: PropTypes.node,
  loaded: PropTypes.bool
}
