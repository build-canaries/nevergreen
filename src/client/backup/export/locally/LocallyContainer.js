import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {exportError, exportSuccess} from '../../../actions/ExportActionCreators'
import Locally from './Locally'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({exportSuccess, exportError}, dispatch)
}

function mapStateToProps(store, ownProps) {
  return {configuration: ownProps.configuration}
}

export default connect(mapStateToProps, mapDispatchToProps)(Locally)
