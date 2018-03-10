import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import Shortcut from '../../common/Shortcut'
import styles from './refresh.scss'
import Duration from '../../common/Duration'

class Refresh extends Component {
  render() {
    return (
      <Fragment>
        <button className={styles.refresh} onClick={this.props.refreshTray}>
          refresh
          <Shortcut hotkeys={[`r ${this.props.index}`]}/>
        </button>
        <div className={styles.lastFetch} data-locator='refresh-time'>
          {
            this.props.timestamp && <Duration fullDescriptionPrefix='projects last refreshed'
                                              fullDescriptionSuffix='ago'
                                              timestamp={this.props.timestamp}/>
          }
          {
            !this.props.timestamp && 'projects last refreshed never'
          }
        </div>
      </Fragment>
    )
  }
}

Refresh.propTypes = {
  index: PropTypes.number.isRequired,
  timestamp: PropTypes.string,
  refreshTray: PropTypes.func.isRequired
}

export default Refresh
