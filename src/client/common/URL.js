import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import styles from './url.scss'

function isPathSeparator(c, i, arr) {
  return c === '/' && notPartOfScheme(i, arr)
}

function notPartOfScheme(i, arr) {
  return arr[i - 1] !== '/' && arr[i - 1] !== ':'
}

function isPunctuation(c) {
  return c === '.' || c === '?' || c === '=' || c === '&'
}

export function URL({url}) {
  const chars = [...url]
  return (
    <span className={styles.url}>
      {
        chars.map((c, i, arr) => {
          if (i > 0 && (isPathSeparator(c, i, arr) || isPunctuation(c))) {
            return (
              <Fragment key={i}>
                <wbr/>
                {c}
              </Fragment>
            )
          }
          return c
        })
      }
    </span>
  )
}

URL.propTypes = {
  url: PropTypes.string.isRequired
}
