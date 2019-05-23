import {connect} from 'react-redux'
import {getImportErrors, getImportInfos, getImportLoaded} from '../../reducers/Selectors'
import {Import} from './Import'
import {State} from '../../reducers/Reducer'

function mapStateToProps(state: State) {
  return {
    loaded: getImportLoaded(state),
    errors: getImportErrors(state),
    infos: getImportInfos(state)
  }
}

export default connect(mapStateToProps)(Import)
