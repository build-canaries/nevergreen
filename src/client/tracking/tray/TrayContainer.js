import {connect} from 'react-redux'
import {Tray} from './Tray'
import {getTrayHighlight, getTrayLoaded, getTrayName, getTrayUrl} from '../../reducers/Selectors'
import {bindActionCreators} from 'redux'
import {checkRefresh} from '../../actions/TrackingThunkActionCreators'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkRefresh
  }, dispatch)
}

function mapStateToProps(state, {trayId}) {
  return {
    loaded: getTrayLoaded(state, trayId),
    name: getTrayName(state, trayId),
    url: getTrayUrl(state, trayId),
    highlight: getTrayHighlight(state, trayId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tray)
