import React, {Component, PropTypes} from 'react'
import Button from '../../common/forms/Button'
import moment from 'moment'
import Timer from '../../common/Timer'

const ONE_MINUTE = 60 * 1000

function lastFetched(timestamp) {
  return timestamp ? moment(timestamp).fromNow(true) : '??'
}

class SubMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastFetched: lastFetched(props.timestamp)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({lastFetched: lastFetched(nextProps.timestamp)})
  }

  render() {
    const updateFetchedTime = () => this.setState({lastFetched: lastFetched(this.props.timestamp)})

    const refreshButton = this.props.loaded ?
      <Button label='Refresh tray' icon='loop2' onClick={this.props.refreshTray}
              hotkeys={[`r ${this.props.index}`]}/> : null

    const refreshLabel = this.props.loaded ? `last refreshed ${this.state.lastFetched} ago` : ''

    return (
      <div className='tray-sub-bar'>
        <Timer onTrigger={updateFetchedTime} interval={ONE_MINUTE}/>
        <Button label='Show settings' icon='cog' onClick={this.props.toggleSettingsView} data-locator='show-settings'
                hotkeys={[`p ${this.props.index}`]}/>
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
  refreshTray: PropTypes.func.isRequired,
  toggleSettingsView: PropTypes.func.isRequired
}

export default SubMenu
