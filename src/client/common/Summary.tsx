import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react'
import cn from 'classnames'
import styles from './summary.scss'

export interface SummaryValues {
  readonly label: string
  readonly value: ReactElement | string | null
}

export interface SummaryProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLDListElement>,
    HTMLDListElement
  > {
  readonly values: ReadonlyArray<SummaryValues>
}

export function Summary({
  values,
  className,
  ...props
}: SummaryProps): ReactElement {
  return (
    <dl className={cn(styles.summaryList, className)} {...props}>
      {values
        .filter(({ value }) => value !== null)
        .map(({ label, value }) => {
          return (
            <div className={styles.summaryListRow} key={label}>
              <dt className={styles.key}>{label}</dt>
              <dd className={styles.value} aria-label={label}>
                {value}
              </dd>
            </div>
          )
        })}
    </dl>
  )
}
