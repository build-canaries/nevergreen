import {connect} from 'react-redux'
import {toJS} from '../../common/ImmutableToJs'
import Import from './Import'

function mapStateToProps(store) {
  return {
    loaded: store.getIn(['backupImport', 'loaded']),
    errors: store.getIn(['backupImport', 'errors']),
    infos: store.getIn(['backupImport', 'infos'])
  }
}

export default connect(mapStateToProps)(toJS(Import))
