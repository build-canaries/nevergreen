import React, {ReactElement} from 'react'
import styles from './summary.scss'

export interface SummaryValues {
  readonly label: string;
  readonly value: ReactElement | string | null | undefined;
}

interface SummaryProps {
  readonly values: ReadonlyArray<SummaryValues>;
}

export function Summary({values}: SummaryProps): ReactElement {
  return (
    <dl className={styles.summaryList}>
      {values.map(({label, value}) => {
        return (
          <div className={styles.summaryListRow} key={label}>
            <dt className={styles.key}>{label}</dt>
            <dd className={styles.value}>{value}</dd>
          </div>
        )
      })}
    </dl>
  )
}
