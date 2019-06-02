import {connect} from 'react-redux'
import {Externally} from './Externally'
import {restore} from '../../../actions/BackupThunkActionCreators'
import {BackupLocation, backupSetId, backupSetUrl} from '../../../actions/BackupActionCreators'
import {State} from '../../../reducers/Reducer'
import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import {getImportLoaded} from '../../../reducers/ImportReducer'
import {getBackupId, getBackupUrl} from '../../../reducers/BackupReducer'

interface ExternallyContainerProps {
  location: BackupLocation;
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, {}, AnyAction>, {location}: ExternallyContainerProps) {
  return {
    restore: (accessToken: string) => dispatch(restore(location, accessToken)),
    backupSetId: (id: string) => dispatch(backupSetId(location, id)),
    backupSetUrl: (url: string) => dispatch(backupSetUrl(location, url))
  }
}

function mapStateToProps(state: State, {location}: ExternallyContainerProps) {
  return {
    loaded: getImportLoaded(state),
    id: getBackupId(location, state),
    url: getBackupUrl(location, state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Externally)
