import type { ReactElement } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import cn from 'classnames'
import styles from './link-button.scss'

export interface LinkButtonProps extends LinkProps {
  readonly icon?: ReactElement
}

export function LinkButton({
  className,
  icon,
  children,
  ...props
}: LinkButtonProps): ReactElement {
  return (
    <Link className={cn(styles.linkButton, className)} {...props}>
      {icon}
      {children}
    </Link>
  )
}
