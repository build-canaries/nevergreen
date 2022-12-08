import React, { ReactElement } from 'react'
import styles from './keyboard-shortcuts.scss'
import { SHOW_HELP_SHORTCUT, SHOW_KEYBOARD_SHORTCUTS_SHORTCUT } from './Help'
import screenfull from 'screenfull'
import { HelpArticle, HelpProps } from './HelpArticle'

export const KEYBOARD_SHORTCUT_KEYWORD = 'keyboard shortcuts'

function Shortcut({
  label,
  children,
}: {
  label: string
  children: ReactElement
}): ReactElement {
  return (
    <li className={styles.shortcut}>
      <div>{label}</div>
      {children}
    </li>
  )
}

function Binding({ children }: { children: string }): ReactElement {
  return <kbd className={styles.binding}>{children}</kbd>
}

export function KeyboardShortcuts({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={[KEYBOARD_SHORTCUT_KEYWORD]}
      searchQuery={searchQuery}
      title="Keyboard shortcuts"
    >
      <h3 className={styles.header}>General</h3>
      <ul className={styles.shortcuts}>
        <Shortcut label="Shows keyboard shortcuts (this)">
          <Binding>{SHOW_KEYBOARD_SHORTCUTS_SHORTCUT}</Binding>
        </Shortcut>
        <Shortcut label="Shows help">
          <Binding>{SHOW_HELP_SHORTCUT}</Binding>
        </Shortcut>
        <Shortcut label="Dismiss dialogs (such as this) or blurs the focused element (except text inputs)">
          <Binding>esc</Binding>
        </Shortcut>
      </ul>

      <h3 className={styles.header}>Navigation</h3>
      <ul className={styles.shortcuts}>
        <Shortcut label="Move focus to the next element">
          <Binding>tab</Binding>
        </Shortcut>
        <Shortcut label="Move focus to the previous element">
          <span className={styles.multipleShortcuts}>
            <Binding>shift</Binding>
            <Binding>tab</Binding>
          </span>
        </Shortcut>
        <Shortcut label='Take action or "click" the selected element'>
          <Binding>enter</Binding>
        </Shortcut>
        <Shortcut label="Go to the Monitor page">
          <span className={styles.multipleShortcuts}>
            <Binding>m</Binding> or <Binding>1</Binding>
          </span>
        </Shortcut>
        <Shortcut label="Go to the Settings page">
          <span className={styles.multipleShortcuts}>
            <Binding>s</Binding> or <Binding>,</Binding> or <Binding>2</Binding>
          </span>
        </Shortcut>
        <Shortcut label="Go directly to the Tracking page">
          <Binding>t</Binding>
        </Shortcut>
        <Shortcut label="Go directly to the Success messages page">
          <Binding>v</Binding>
        </Shortcut>
        <Shortcut label="Go directly to the Display settings page">
          <Binding>d</Binding>
        </Shortcut>
        <Shortcut label="Go directly to the Notifications settings page">
          <Binding>n</Binding>
        </Shortcut>
        <Shortcut label="Go directly to the Backup settings page">
          <Binding>b</Binding>
        </Shortcut>
      </ul>

      {screenfull.isEnabled && (
        <>
          <h3 className={styles.header}>Monitor page</h3>
          <ul className={styles.shortcuts}>
            <Shortcut label="Toggle fullscreen">
              <Binding>f</Binding>
            </Shortcut>
            <Shortcut label="Exit fullscreen">
              <Binding>esc</Binding>
            </Shortcut>
          </ul>
        </>
      )}

      <h3 className={styles.header}>Tracking page</h3>
      <ul className={styles.shortcuts}>
        <Shortcut label="Add a new feed">
          <Binding>a</Binding>
        </Shortcut>
      </ul>

      <h3 className={styles.header}>Success messages page</h3>
      <ul className={styles.shortcuts}>
        <Shortcut label="Add a new success message">
          <Binding>a</Binding>
        </Shortcut>
      </ul>

      <h3 className={styles.header}>Notifications settings page</h3>
      <ul className={styles.shortcuts}>
        <Shortcut label="Add a new notification">
          <Binding>a</Binding>
        </Shortcut>
      </ul>

      <h3 className={styles.header}>Backup settings page</h3>
      <ul className={styles.shortcuts}>
        <Shortcut label="Add a new remote backup">
          <Binding>a</Binding>
        </Shortcut>
      </ul>
    </HelpArticle>
  )
}
