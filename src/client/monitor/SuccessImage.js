import React from 'react'
import PropTypes from 'prop-types'
import styles from './success-image.scss'

export function SuccessImage({url}) {
  return (
    <div id='success-image'>
      <img src={url} className={styles.image} alt='success'/>
    </div>
  )
}

SuccessImage.propTypes = {
  url: PropTypes.string.isRequired
}
