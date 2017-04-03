import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {exportSuccess, exportError} from '../../../actions/ExportActions'
import Locally from './Locally'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({exportSuccess, exportError}, dispatch)
}

function mapStateToProps(store, ownProps) {
  return {configuration: ownProps.configuration}
}

export default connect(mapStateToProps, mapDispatchToProps)(Locally)
