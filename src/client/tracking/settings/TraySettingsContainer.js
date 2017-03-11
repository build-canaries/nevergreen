import Immutable from 'immutable'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setTrayName, setTrayUsername, removeTray, encryptPassword} from '../../actions/TrackingActions'
import TraySettings from './TraySettings'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeTray,
    setTrayName,
    setTrayUsername,
    encryptPassword
  }, dispatch)
}

function mapStateToProps(_, ownProps) {
  return Immutable.Map().merge(ownProps).toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TraySettings)
