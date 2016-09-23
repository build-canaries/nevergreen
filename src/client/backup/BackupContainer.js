import Immutable from 'immutable'
import {connect} from 'react-redux'
import {loadConfiguration, importData} from '../actions/BackupActions'
import Backup from './Backup'
import {asJson} from '../common/repo/Data'

function mapDispatchToProps(dispatch) {
  return {
    loadConfiguration() {
      return dispatch(loadConfiguration())
    },
    importData(jsonData) {
      dispatch(importData(jsonData))
    }
  }
}

function mapStateToProps(store) {
  return Immutable.Map({configuration: asJson(store.toJS())}).merge(store.get('backup')).toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Backup)
