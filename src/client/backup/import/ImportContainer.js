import {connect} from 'react-redux'
import Import from './Import'
import Immutable from 'immutable'

function mapDispatchToProps() {
  return {}
}

function mapStateToProps(store) {
  return Immutable.Map({
    loaded: store.getIn(['backupImport', 'loaded']),
    errors: store.getIn(['backupImport', 'errors']),
    infos: store.getIn(['backupImport', 'infos'])
  }).toJS()
}

export default connect(mapStateToProps, mapDispatchToProps)(Import)
