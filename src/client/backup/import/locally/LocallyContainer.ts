import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {Locally} from './Locally'
import {setConfiguration} from '../../../actions/NevergreenActionCreators'

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({setConfiguration}, dispatch)
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Locally)
