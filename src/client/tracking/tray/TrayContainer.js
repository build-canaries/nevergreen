import Immutable from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Tray from './Tray'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

function mapStateToProps(store, ownProps) {
  const tray = store.getIn(['trays', ownProps.trayId])
  return Immutable.Map().merge(tray, ownProps).toJS()
}

export default connect(mapStateToProps, mapDispatchToProps)(Tray)
