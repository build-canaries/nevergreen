import {connect} from 'react-redux'
import {toJS} from '../../common/ImmutableToJs'
import Import from './Import'
import {importErrors, importInfos, importLoaded} from '../../Selectors'

function mapStateToProps(state) {
  return {
    loaded: importLoaded(state),
    errors: importErrors(state),
    infos: importInfos(state)
  }
}

export default connect(mapStateToProps)(toJS(Import))
