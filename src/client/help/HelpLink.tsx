import React from 'react'
import styles from './help-link.scss'

interface HelpLinkProps {
  readonly to: string;
  readonly setSearchQuery: (q: string) => void;
}

export function HelpLink({to, setSearchQuery}: HelpLinkProps) {
  return (
    <button className={styles.query}
            onClick={() => setSearchQuery(to)}>
      (see <em>{to}</em> for more details)
    </button>
  )
}
