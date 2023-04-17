import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
} from 'react'
import cn from 'classnames'
import styles from './group.scss'

interface GroupProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement
  > {
  readonly title: string
}

export function Group({
  title,
  children,
  className,
  ...props
}: GroupProps): ReactElement {
  return (
    <fieldset className={cn(styles.container, className)} {...props}>
      <legend>{title}</legend>
      <div className={styles.children}>{children}</div>
    </fieldset>
  )
}
