import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Shortcut from '../../common/Shortcut'
import moment from 'moment'
import Timer from '../../common/Timer'
import styles from './refresh.scss'

const ONE_MINUTE = 60

function lastFetched(timestamp) {
  return timestamp ? `${moment(timestamp).fromNow(true)} ago` : 'never'
}

class Refresh extends Component {
  constructor(props) {
    super(props)
    this.state = {lastFetched: lastFetched(props.timestamp)}
  }

  updateFetchedTime = () => {
    this.setState({lastFetched: lastFetched(this.props.timestamp)})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({lastFetched: lastFetched(nextProps.timestamp)})
  }

  render() {
    return (
      <div>
        <Timer onTrigger={this.updateFetchedTime} interval={ONE_MINUTE}/>
        <button className={styles.refresh} onClick={this.props.refreshTray}>
          refresh
          <Shortcut hotkeys={[`r ${this.props.index}`]}/>
        </button>
        <span className={styles.lastFetch}
              data-locator='refresh-time'>{`projects last refreshed ${this.state.lastFetched}`}</span>
      </div>
    )
  }
}

Refresh.propTypes = {
  index: PropTypes.number.isRequired,
  timestamp: PropTypes.string,
  refreshTray: PropTypes.func.isRequired
}

export default Refresh
