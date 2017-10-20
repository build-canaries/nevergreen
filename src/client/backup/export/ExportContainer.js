import {connect} from 'react-redux'
import Export from './Export'
import {filter} from '../../common/repo/Data'
import {toJson} from '../../common/Json'
import {toJS} from '../../common/ImmutableToJs'

function mapDispatchToProps() {
  return {}
}

function mapStateToProps(store) {
  return {
    loaded: store.getIn(['backupExport', 'loaded']),
    errors: store.getIn(['backupExport', 'errors']),
    infos: store.getIn(['backupExport', 'infos']),
    configuration: toJson(filter(store.toJS()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Export))
