import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {importData} from '../../../actions/ImportThunkActionCreators'
import {Locally} from './Locally'
import {importLoaded} from '../../../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({importData}, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: importLoaded(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Locally)
