import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importData} from '../../../actions/ImportActions'
import Locally from './Locally'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({importData}, dispatch)
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Locally)
