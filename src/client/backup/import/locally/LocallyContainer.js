import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importData} from '../../../actions/ImportActionCreators'
import Locally from './Locally'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({importData}, dispatch)
}

function mapStateToProps(store) {
  return {loaded: store.getIn(['backupImport', 'loaded'])}
}

export default connect(mapStateToProps, mapDispatchToProps)(Locally)
