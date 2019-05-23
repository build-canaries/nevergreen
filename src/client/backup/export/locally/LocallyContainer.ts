import {connect} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'
import {exportError, exportSuccess} from '../../../actions/ExportActionCreators'
import {Locally} from './Locally'
import {State} from '../../../reducers/Reducer'

interface LocallyContainerProps {
  configuration: string;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({exportSuccess, exportError}, dispatch)
}

function mapStateToProps(state: State, {configuration}: LocallyContainerProps) {
  return {configuration}
}

export default connect(mapStateToProps, mapDispatchToProps)(Locally)
