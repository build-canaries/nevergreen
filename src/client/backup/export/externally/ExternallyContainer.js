import {connect} from 'react-redux'
import {Externally} from './Externally'
import {getBackupDescription, getBackupId, getBackupUrl, getExportLoaded} from '../../../reducers/Selectors'
import {upload} from '../../../actions/BackupThunkActionCreators'
import {backupSetDescription, backupSetId, backupSetUrl} from '../../../actions/BackupActionCreators'

function mapDispatchToProps(dispatch, props) {
  const {location} = props
  return {
    upload: (accessToken) => dispatch(upload(location, accessToken)),
    backupSetId: (id) => dispatch(backupSetId(location, id)),
    backupSetDescription: (description) => dispatch(backupSetDescription(location, description)),
    backupSetUrl: (url) => dispatch(backupSetUrl(location, url))
  }
}

function mapStateToProps(state, props) {
  const {location} = props
  return {
    loaded: getExportLoaded(state),
    id: getBackupId(location, state),
    description: getBackupDescription(location, state),
    url: getBackupUrl(location, state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Externally)
