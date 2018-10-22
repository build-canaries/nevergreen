import {connect} from 'react-redux'
import {Tray} from './Tray'
import {trayHighlight, trayLoaded, trayName, trayUrl} from '../../Selectors'

function mapStateToProps(state, {trayId}) {
  return {
    loaded: trayLoaded(state, trayId),
    name: trayName(state, trayId),
    url: trayUrl(state, trayId),
    highlight: trayHighlight(state, trayId)
  }
}

export default connect(mapStateToProps)(Tray)
