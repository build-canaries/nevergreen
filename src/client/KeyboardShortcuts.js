import React, {Component} from 'react'
import Mousetrap from 'mousetrap'
import {Modal} from './common/Modal'
import styles from './keyboard-shortcuts.scss'

export class KeyboardShortcuts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  close = () => {
    this.setState({show: false})
  }

  show = () => {
    this.setState({show: true})
  }

  componentDidMount() {
    Mousetrap.bind('?', this.show)
  }

  componentWillUnmount() {
    Mousetrap.unbind('?')
  }

  render() {
    const {show} = this.state

    return (
      <Modal show={show}
             close={this.close}
             title='Keyboard shortcuts'>

        <h3 className={styles.header}>Basics</h3>
        <ul className={styles.shortcuts}>
          <li className={styles.shortcut}>
            <div>Shows keyboard shortcuts (this)</div>
            <kbd className={styles.binding}>?</kbd>
          </li>
          <li className={styles.shortcut}>
            <div>Dismiss dialogs (such as this)</div>
            <kbd className={styles.binding}>esc</kbd>
          </li>
        </ul>

        <h3 className={styles.header}>Navigation</h3>
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
            <div>Go to the Success page</div>
            <span className={styles.multipleShortcuts}>
              <kbd className={styles.binding}>s</kbd> or <kbd className={styles.binding}>3</kbd>
            </span>
          </li>
          <li className={styles.shortcut}>
            <div>Go to the Settings page</div>
            <span className={styles.multipleShortcuts}>
              <kbd className={styles.binding}>v</kbd> or <kbd className={styles.binding}>4</kbd>
            </span>
          </li>
          <li className={styles.shortcut}>
            <div>Go to the Backup page</div>
            <span className={styles.multipleShortcuts}>
              <kbd className={styles.binding}>b</kbd> or <kbd className={styles.binding}>5</kbd>
            </span>
          </li>
        </ul>

        <h3 className={styles.header}>Tracking</h3>
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
}

export default KeyboardShortcuts
