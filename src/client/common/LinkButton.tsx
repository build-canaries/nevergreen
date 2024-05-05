import type { ReactElement, KeyboardEvent } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import cn from 'classnames'
import { Plus } from './icons/Plus'
import { useNavigationShortcut } from '../NavigationShortcutsHook'
import { CheckboxChecked } from './icons/CheckboxChecked'
import { VisuallyHidden } from './VisuallyHidden'
import { Cog } from './icons/Cog'
import styles from './link-button.scss'

interface LinkButtonProps extends LinkProps {
  readonly to: string
  readonly icon?: ReactElement
}

// This component is split out of LinkButton otherwise the AddButton CSS gets all messed up
function NavigationButton({
  icon,
  className,
  children,
  ...props
}: LinkButtonProps): ReactElement {
  return (
    <Link
      className={className}
      {...props}
      role="button"
      draggable="false"
      onKeyDown={(evt: KeyboardEvent<HTMLAnchorElement>) => {
        if (evt.key === ' ') {
          evt.preventDefault()
        }
      }}
      onKeyUp={(evt: KeyboardEvent<HTMLAnchorElement>) => {
        if (evt.key === ' ') {
          evt.preventDefault()
          evt.currentTarget.click()
        }
      }}
    >
      {icon}
      {children}
    </Link>
  )
}

export function LinkButton({
  className,
  ...props
}: LinkButtonProps): ReactElement {
  return (
    <NavigationButton className={cn(styles.linkButton, className)} {...props} />
  )
}

export function AddButton({
  className,
  ...props
}: Omit<LinkButtonProps, 'to'>): ReactElement {
  useNavigationShortcut('a', 'add')
  return (
    <NavigationButton
      className={cn(styles.addButton, className)}
      to="add"
      {...props}
      icon={<Plus />}
    />
  )
}

export function ManageFeedProjectsButton({
  feedId,
  title,
}: {
  feedId: string
  title?: string
}): ReactElement {
  return (
    <LinkButton
      className={styles.feedButtons}
      icon={<CheckboxChecked />}
      to={`/settings/tracking/${feedId}/projects`}
    >
      Manage projects{title && <VisuallyHidden> for {title}</VisuallyHidden>}
    </LinkButton>
  )
}

export function UpdateFeedDetailsButton({
  feedId,
  title,
}: {
  feedId: string
  title?: string
}): ReactElement {
  return (
    <LinkButton
      className={styles.feedButtons}
      icon={<Cog />}
      to={`/settings/tracking/${feedId}/details`}
    >
      Update details{title && <VisuallyHidden> for {title}</VisuallyHidden>}
    </LinkButton>
  )
}
