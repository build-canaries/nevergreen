import {connect} from 'react-redux'
import {Tray} from './Tray'
import {trayHighlight, trayLoaded, trayName, trayUrl} from '../../reducers/Selectors'
import {bindActionCreators} from 'redux'
import {checkRefresh} from '../../actions/TrackingThunkActionCreators'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkRefresh
  }, dispatch)
}

function mapStateToProps(state, {trayId}) {
  return {
    loaded: trayLoaded(state, trayId),
    name: trayName(state, trayId),
    url: trayUrl(state, trayId),
    highlight: trayHighlight(state, trayId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tray)
