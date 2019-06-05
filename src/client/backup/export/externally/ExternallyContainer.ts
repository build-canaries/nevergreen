import {connect} from 'react-redux'
import {Externally} from './Externally'
import {BackupLocation, backupSetDescription, backupSetId, backupSetUrl} from '../../../actions/BackupActionCreators'
import {State} from '../../../reducers/Reducer'
import {ThunkDispatch} from 'redux-thunk'
import {AnyAction, bindActionCreators} from 'redux'
import {getBackupDescription, getBackupId, getBackupUrl} from '../../../reducers/BackupReducer'

interface ExternallyContainerProps {
  location: BackupLocation;
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, {}, AnyAction>) {
  return bindActionCreators({
    backupSetId,
    backupSetDescription,
    backupSetUrl
  }, dispatch)
}

function mapStateToProps(state: State, {location}: ExternallyContainerProps) {
  return {
    id: getBackupId(location, state),
    description: getBackupDescription(location, state),
    url: getBackupUrl(location, state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Externally)
