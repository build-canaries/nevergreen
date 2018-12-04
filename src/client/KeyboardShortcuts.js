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
        <p>The following keyboard shortcuts can be used to:</p>
        <table>
          <thead>
          <tr>
            <th>Shortcut Key</th>
            <th>Definition</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td colSpan={3}>General</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>?</kbd></td>
            <td>Keyboard shortcuts</td>
            <td>Shows keyboard shortcuts (this).</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>esc</kbd></td>
            <td>Close</td>
            <td>Closes contextual help (such as this).</td>
          </tr>
          <tr>
            <td colSpan={3}>Navigation</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>m</kbd> or <kbd className={styles.binding}>1</kbd></td>
            <td>Go to Monitor</td>
            <td>Navigate to the monitor page.</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>t</kbd> or <kbd className={styles.binding}>2</kbd></td>
            <td>Go to Tracking</td>
            <td>Navigate to the tracking page.</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>s</kbd> or <kbd className={styles.binding}>3</kbd></td>
            <td>Go to Success</td>
            <td>Navigate to the success page.</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>v</kbd> or <kbd className={styles.binding}>4</kbd></td>
            <td>Go to Settings</td>
            <td>Navigate to the settings page.</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>b</kbd> or <kbd className={styles.binding}>5</kbd></td>
            <td>Go to Backup</td>
            <td>Navigate to the backup page.</td>
          </tr>
          <tr>
            <td colSpan={3}>Tracking</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>+</kbd><kbd className={styles.binding}>0..n</kbd> or <kbd
              className={styles.binding}>&#61;</kbd><kbd className={styles.binding}>0..n</kbd></td>
            <td>Include all</td>
            <td>Includes all projects for the tray with the given index (the first tray is at index 0).</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>-</kbd><kbd className={styles.binding}>0..n</kbd></td>
            <td>Exclude all</td>
            <td>Excludes all projects for the tray with the given index (the first tray is at index 0).</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>r</kbd><kbd className={styles.binding}>0..n</kbd></td>
            <td>Refresh tray</td>
            <td>Refresh the tray with the given index (the first tray is at index 0).</td>
          </tr>
          <tr>
            <td><kbd className={styles.binding}>p</kbd><kbd className={styles.binding}>0..n</kbd></td>
            <td>Toggle project view</td>
            <td>Toggle project and settings views for the tray with the given index (the first tray is at index 0).
            </td>
          </tr>
          </tbody>
        </table>
      </Modal>
    )
  }
}

export default KeyboardShortcuts
