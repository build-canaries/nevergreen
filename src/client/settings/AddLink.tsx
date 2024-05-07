import type { ReactElement } from 'react'
import cn from 'classnames'
import { Plus } from '../common/icons/Plus'
import { useNavigationShortcut } from '../NavigationShortcutsHook'
import { LinkButton, LinkButtonProps } from '../common/LinkButton'
import styles from './add-link.scss'

export function AddLink({
  className,
  ...props
}: Omit<LinkButtonProps, 'to'>): ReactElement {
  useNavigationShortcut('a', 'add')
  return (
    <LinkButton
      className={cn(styles.addButton, className)}
      to="add"
      {...props}
      icon={<Plus />}
    />
  )
}
