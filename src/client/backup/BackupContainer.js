import Immutable from 'immutable'
import {connect} from 'react-redux'
import {importData} from '../actions/BackupActions'
import Backup from './Backup'
import {SCHEMA, filter} from '../common/repo/Data'
import {toJson} from '../common/Json'

function mapDispatchToProps(dispatch) {
  return {
    importData(jsonData) {
      return dispatch(importData(jsonData))
    }
  }
}

function mapStateToProps(store) {
  return Immutable.Map({
    configuration: toJson(filter(store.toJS())),
    schema: toJson(SCHEMA)
  }).merge(store.get('backup'))
    .toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Backup)
