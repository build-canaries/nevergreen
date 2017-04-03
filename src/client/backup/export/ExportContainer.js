import {connect} from 'react-redux'
import Export from './Export'
import {filter} from '../../common/repo/Data'
import {toJson} from '../../common/Json'
import Immutable from 'immutable'

function mapDispatchToProps() {
  return {}
}

function mapStateToProps(store) {
  return Immutable.Map({
    loaded: store.getIn(['backupExport', 'loaded']),
    errors: store.getIn(['backupExport', 'errors']),
    infos: store.getIn(['backupExport', 'infos']),
    configuration: toJson(filter(store.toJS()))
  }).toJS()
}

export default connect(mapStateToProps, mapDispatchToProps)(Export)
