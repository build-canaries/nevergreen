import {connect} from 'react-redux'
import {Tray} from './Tray'
import {getTrayHighlight, getTrayLoaded, getTrayName, getTrayUrl} from '../../reducers/Selectors'
import {bindActionCreators, Dispatch} from 'redux'
import {checkRefresh} from '../../actions/TrackingThunkActionCreators'
import {State} from '../../reducers/Reducer'

interface TrayContainerProps {
  trayId: string;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({checkRefresh}, dispatch)
}

function mapStateToProps(state: State, {trayId}: TrayContainerProps) {
  return {
    loaded: getTrayLoaded(state, trayId),
    name: getTrayName(state, trayId),
    url: getTrayUrl(state, trayId),
    highlight: getTrayHighlight(state, trayId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tray)
