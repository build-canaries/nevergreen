import React, {ReactElement} from 'react'
import {Link, LinkProps} from 'react-router-dom'
import cn from 'classnames'
import styles from './link-button.scss'

export function LinkButton({className, ...props}: LinkProps): ReactElement {
  return <Link className={cn(styles.linkButton, className)} {...props} role='button'/>
}
