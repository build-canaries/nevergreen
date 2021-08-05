import React, {ReactElement} from 'react'
import {Link, LinkProps} from 'react-router-dom'
import cn from 'classnames'
import styles from './link-button.scss'
import iconStyles from './fonts/icon-font.scss'
import {iPlus} from './fonts/Icons'

interface LinkButtonProps extends LinkProps {
  readonly icon?: string;
}

function NavigationButton({icon, className, children, ...props}: LinkButtonProps): ReactElement {
  const classes = cn(className, {
    [iconStyles[`icon-${icon || ''}`]]: icon,
    [styles.withIcon]: icon
  })
  return (
    <Link className={classes}
          {...props}
          role='button'>
      {children}
    </Link>
  )
}

export function LinkButton({className, ...props}: LinkButtonProps): ReactElement {
  return <NavigationButton className={cn(styles.linkButton, className)} {...props}/>
}

export function AddButton({className, ...props}: LinkButtonProps): ReactElement {
  return <NavigationButton className={cn(styles.addButton, className)} {...props} icon={iPlus}/>
}
