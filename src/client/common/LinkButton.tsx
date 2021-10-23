import React, {ReactElement} from 'react'
import {Link, LinkProps} from 'react-router-dom'
import cn from 'classnames'
import styles from './link-button.scss'
import {Plus} from './icons/Plus'
import {useNavigationShortcut} from '../NavigationShortcutsHook'

interface LinkButtonProps extends LinkProps {
  readonly to: string;
  readonly icon?: ReactElement;
}

function NavigationButton({icon, className, children, ...props}: LinkButtonProps): ReactElement {
  const classes = cn(className)
  return (
    <Link className={classes}
          {...props}
          role='button'>
      {icon}
      {children}
    </Link>
  )
}

export function LinkButton({className, ...props}: LinkButtonProps): ReactElement {
  return <NavigationButton className={cn(styles.linkButton, className)} {...props}/>
}

export function AddButton({className, to, ...props}: LinkButtonProps): ReactElement {
  useNavigationShortcut('a', to)
  return <NavigationButton className={cn(styles.addButton, className)} to={to} {...props} icon={<Plus/>}/>
}
