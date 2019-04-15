import {connect} from 'react-redux'
import {Externally} from './Externally'
import {getBackupId, getBackupUrl, getImportLoaded} from '../../../reducers/Selectors'
import {restore} from '../../../actions/BackupThunkActionCreators'
import {backupSetId, backupSetUrl} from '../../../actions/BackupActionCreators'

function mapDispatchToProps(dispatch, props) {
  const {location} = props
  return {
    restore: (accessToken) => dispatch(restore(location, accessToken)),
    backupSetId: (id) => dispatch(backupSetId(location, id)),
    backupSetUrl: (url) => dispatch(backupSetUrl(location, url))
  }
}

function mapStateToProps(state, props) {
  const {location} = props
  return {
    loaded: getImportLoaded(state),
    id: getBackupId(location, state),
    url: getBackupUrl(location, state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Externally)
