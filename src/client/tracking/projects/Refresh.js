import React, {Component, PropTypes} from 'react'
import Shortcut from '../../common/Shortcut'
import moment from 'moment'
import Timer from '../../common/Timer'
import './refresh.scss'

const ONE_MINUTE = 60

function lastFetched(timestamp) {
  return timestamp ? moment(timestamp).fromNow(true) : '??'
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

    const refreshButton = this.props.loaded ?
      <button className='refresh' onClick={this.props.refreshTray}>
        refresh
        <Shortcut hotkeys={[`r ${this.props.index}`]}/>
      </button> : null

    const refreshLabel = this.props.loaded ? `projects last refreshed ${this.state.lastFetched} ago` : ''

    return (
      <div className='tray-sub-bar'>
        <Timer onTrigger={updateFetchedTime} interval={ONE_MINUTE}/>
        {refreshButton}
        <span className='tray-refresh-last-fetch'>{refreshLabel}</span>
      </div>
    )
  }
}

SubMenu.propTypes = {
  loaded: PropTypes.bool,
  index: PropTypes.number.isRequired,
  timestamp: PropTypes.string,
  refreshTray: PropTypes.func.isRequired
}

export default SubMenu
