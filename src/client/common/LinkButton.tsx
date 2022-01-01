import React, {ReactElement} from 'react'
import {Link, LinkProps} from 'react-router-dom'
import cn from 'classnames'
import styles from './link-button.scss'
import {Plus} from './icons/Plus'
import {useNavigationShortcut} from '../NavigationShortcutsHook'
import {CheckboxChecked} from './icons/CheckboxChecked'
import {routeFeedDetails, routeFeedProjects} from '../Routes'
import {VisuallyHidden} from './VisuallyHidden'
import {Cog} from './icons/Cog'
import {ArrowLeft} from './icons/ArrowLeft'

interface LinkButtonProps extends LinkProps {
  readonly to: string;
  readonly icon?: ReactElement;
}

// This component is split out of LinkButton otherwise the AddButton CSS gets all messed up
function NavigationButton({icon, className, children, ...props}: LinkButtonProps): ReactElement {
  return (
    <Link className={className}
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

export function ManageFeedProjectsButton({feedId, title}: { feedId: string, title?: string }): ReactElement {
  return (
    <LinkButton className={styles.feedButtons}
                icon={<CheckboxChecked/>}
                to={routeFeedProjects(feedId)}>
      Manage projects{title && <VisuallyHidden> for {title}</VisuallyHidden>}
    </LinkButton>
  )
}

export function UpdateFeedDetailsButton({feedId, title}: { feedId: string, title?: string }): ReactElement {
  return (
    <LinkButton className={styles.feedButtons}
                icon={<Cog/>}
                to={routeFeedDetails(feedId)}>
      Update details{title && <VisuallyHidden> for {title}</VisuallyHidden>}
    </LinkButton>
  )
}

export function BackButton({children, ...props}: LinkButtonProps): ReactElement {
  return (
    <LinkButton {...props} icon={<ArrowLeft/>}>
      {children}
    </LinkButton>
  )
}
