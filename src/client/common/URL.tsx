import React, {Fragment} from 'react'
import styles from './url.scss'

interface URLProps {
  url: string;
}

function notPartOfScheme(i: number, arr: string[]) {
  return arr[i - 1] !== '/' && arr[i - 1] !== ':'
}

function isPathSeparator(c: string, i: number, arr: string[]) {
  return c === '/' && notPartOfScheme(i, arr)
}

function isPunctuation(c: string) {
  return c === '.' || c === '?' || c === '=' || c === '&'
}

export function URL({url}: URLProps) {
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
