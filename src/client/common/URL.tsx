import type { ReactElement } from 'react'
import { Fragment } from 'react'
import { buildUrl } from '../domain/Url'
import { isNotBlank } from './Utils'
import styles from './url.scss'

interface URLProps {
  readonly url: string
  readonly base?: string
}

function isPathSeparator(c: string) {
  return c === '/'
}

function isPunctuation(c: string) {
  return (
    c === '.' || c === '?' || c === '=' || c === '&' || c === '@' || c === ':'
  )
}

function redactPassword(url: URL) {
  if (url.password) {
    url.password = 'REDACTED'
  }
}

function redactQueryParams(url: URL) {
  url.searchParams.forEach((v, k) => {
    if (isNotBlank(v)) {
      url.searchParams.set(k, 'REDACTED')
    }
  })
}

export function URL({ url, base }: URLProps): ReactElement {
  const u = buildUrl(url, base)
  if (u === null) {
    return <span />
  }
  redactPassword(u)
  redactQueryParams(u)
  const chars = [...u.href.replace(`${u.protocol}//`, '')]
  return (
    <span className={styles.url}>
      {u.protocol}
      {'//'}
      <wbr />
      {chars.map((c, i) => {
        if (isPathSeparator(c) || isPunctuation(c)) {
          return (
            <Fragment key={i}>
              <wbr />
              {c}
            </Fragment>
          )
        }
        return c
      })}
    </span>
  )
}
