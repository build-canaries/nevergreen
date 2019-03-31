import {connect} from 'react-redux'
import {toJS} from '../../common/ImmutableToJs'
import {Import} from './Import'
import {getImportErrors, getImportInfos, getImportLoaded} from '../../reducers/Selectors'

function mapStateToProps(state) {
  return {
    loaded: getImportLoaded(state),
    errors: getImportErrors(state),
    infos: getImportInfos(state)
  }
}

export default connect(mapStateToProps)(toJS(Import))
