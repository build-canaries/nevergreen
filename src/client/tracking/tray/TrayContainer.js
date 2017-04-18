import Immutable from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {clearTrayHighlight} from '../../actions/TrackingActions'
import Tray from './Tray'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({clearTrayHighlight}, dispatch)
}

function mapStateToProps(store, ownProps) {
  const tray = store.getIn(['trays', ownProps.trayId])
  return Immutable.Map().merge(tray, ownProps).toJS()
}

export default connect(mapStateToProps, mapDispatchToProps)(Tray)
