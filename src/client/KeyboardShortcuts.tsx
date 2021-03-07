import React, {ReactElement, useState} from 'react'
import {Modal} from './common/Modal'
import styles from './keyboard-shortcuts.scss'
import {SHOW_HELP_SHORTCUT} from './help/Help'
import {useShortcut} from './common/Keyboard'

export function KeyboardShortcuts(): ReactElement {
  const [show, setShow] = useState(false)

  useShortcut('?', () => setShow(true))

  return (
    <Modal show={show}
           close={() => setShow(false)}
           title='Keyboard shortcuts'>

      <h2 className={styles.header}>Basics</h2>
      <ul className={styles.shortcuts}>
        <li className={styles.shortcut}>
          <div>Shows keyboard shortcuts (this)</div>
          <kbd className={styles.binding}>?</kbd>
        </li>
        <li className={styles.shortcut}>
          <div>Shows help</div>
          <kbd className={styles.binding}>{SHOW_HELP_SHORTCUT}</kbd>
        </li>
        <li className={styles.shortcut}>
          <div>Dismiss dialogs (such as this) or blurs the focused element (except text inputs)</div>
          <kbd className={styles.binding}>esc</kbd>
        </li>
      </ul>

      <h2 className={styles.header}>Navigation</h2>
      <ul className={styles.shortcuts}>
        <li className={styles.shortcut}>
          <div>Move focus to the next element</div>
          <kbd className={styles.binding}>tab</kbd>
        </li>
        <li className={styles.shortcut}>
          <div>Move focus to the previous element</div>
          <span className={styles.multipleShortcuts}>
            <kbd className={styles.binding}>shift</kbd><kbd className={styles.binding}>tab</kbd>
          </span>
        </li>
        <li className={styles.shortcut}>
          <div>Take action or &quot;click&quot; the selected element</div>
          <kbd className={styles.binding}>enter</kbd>
        </li>
        <li className={styles.shortcut}>
          <div>Go to the Monitor page</div>
          <span className={styles.multipleShortcuts}>
            <kbd className={styles.binding}>m</kbd> or <kbd className={styles.binding}>1</kbd>
          </span>
        </li>
        <li className={styles.shortcut}>
          <div>Go to the Tracking page</div>
          <span className={styles.multipleShortcuts}>
            <kbd className={styles.binding}>t</kbd> or <kbd className={styles.binding}>2</kbd>
          </span>
        </li>
        <li className={styles.shortcut}>
          <div>Go to the Settings page</div>
          <span className={styles.multipleShortcuts}>
            <kbd className={styles.binding}>s</kbd> or <kbd className={styles.binding}>,</kbd> or <kbd
            className={styles.binding}>3</kbd>
          </span>
        </li>
      </ul>

      <h2 className={styles.header}>Tracking</h2>
      <ul className={styles.shortcuts}>
        <li className={styles.shortcut}>
          <div>Includes all projects for the tray with the given index (the first tray is at index 0)</div>
          <span className={styles.multipleShortcuts}>
            <kbd className={styles.binding}>+</kbd><kbd className={styles.binding}>0..n</kbd> or <kbd
            className={styles.binding}>&#61;</kbd><kbd className={styles.binding}>0..n</kbd>
          </span>
        </li>
        <li className={styles.shortcut}>
          <div>Excludes all projects for the tray with the given index (the first tray is at index 0)</div>
          <span className={styles.multipleShortcuts}>
            <kbd className={styles.binding}>-</kbd><kbd className={styles.binding}>0..n</kbd>
          </span>
        </li>
        <li className={styles.shortcut}>
          <div>Refresh the tray with the given index (the first tray is at index 0)</div>
          <span className={styles.multipleShortcuts}>
            <kbd className={styles.binding}>r</kbd><kbd className={styles.binding}>0..n</kbd>
          </span>
        </li>
      </ul>
    </Modal>
  )
}
