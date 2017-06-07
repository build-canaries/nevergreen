import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Shortcut from '../../common/Shortcut'
import moment from 'moment'
import Timer from '../../common/Timer'
import './refresh.scss'

const ONE_MINUTE = 60

function lastFetched(timestamp) {
  return timestamp ? `${moment(timestamp).fromNow(true)} ago` : 'never'
}

class SubMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {lastFetched: lastFetched(props.timestamp)}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({lastFetched: lastFetched(nextProps.timestamp)})
  }

  render() {
    const updateFetchedTime = () => this.setState({lastFetched: lastFetched(this.props.timestamp)})

    return (
      <div className='tray-sub-bar'>
        <Timer onTrigger={updateFetchedTime} interval={ONE_MINUTE}/>
        <button className='refresh' onClick={this.props.refreshTray}>
          refresh
          <Shortcut hotkeys={[`r ${this.props.index}`]}/>
        </button>
        <span className='tray-refresh-last-fetch'>{`projects last refreshed ${this.state.lastFetched}`}</span>
      </div>
    )
  }
}

SubMenu.propTypes = {
  index: PropTypes.number.isRequired,
  timestamp: PropTypes.string,
  refreshTray: PropTypes.func.isRequired
}

export default SubMenu
