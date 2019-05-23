import {connect} from 'react-redux'
import {Externally} from './Externally'
import {getBackupDescription, getBackupId, getBackupUrl, getExportLoaded} from '../../../reducers/Selectors'
import {upload} from '../../../actions/BackupThunkActionCreators'
import {BackupLocation, backupSetDescription, backupSetId, backupSetUrl} from '../../../actions/BackupActionCreators'
import {State} from '../../../reducers/Reducer'
import {ThunkDispatch} from 'redux-thunk'
import {AnyAction} from 'redux'

interface ExternallyContainerProps {
  location: BackupLocation;
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, {}, AnyAction>, {location}: ExternallyContainerProps) {
  return {
    upload: (accessToken: string) => dispatch(upload(location, accessToken)),
    backupSetId: (id: string) => dispatch(backupSetId(location, id)),
    backupSetDescription: (description: string) => dispatch(backupSetDescription(location, description)),
    backupSetUrl: (url: string) => dispatch(backupSetUrl(location, url))
  }
}

function mapStateToProps(state: State, {location}: ExternallyContainerProps) {
  return {
    loaded: getExportLoaded(state),
    id: getBackupId(location, state),
    description: getBackupDescription(location, state),
    url: getBackupUrl(location, state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Externally)
