import {connect} from 'react-redux'
import {Externally} from './Externally'
import {BackupLocation, backupSetId, backupSetUrl} from '../../../actions/BackupActionCreators'
import {State} from '../../../reducers/Reducer'
import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import {getBackupId, getBackupUrl} from '../../../reducers/BackupReducer'
import {Configuration} from '../../../reducers/Configuration'
import {setConfiguration} from '../../../actions/NevergreenActionCreators'

interface ExternallyContainerProps {
  location: BackupLocation;
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, {}, AnyAction>, {location}: ExternallyContainerProps) {
  return {
    backupSetId: (id: string) => dispatch(backupSetId(location, id)),
    backupSetUrl: (url: string) => dispatch(backupSetUrl(location, url)),
    setConfiguration: (configuration: Configuration) => dispatch(setConfiguration(configuration))
  }
}

function mapStateToProps(state: State, {location}: ExternallyContainerProps) {
  return {
    id: getBackupId(location, state),
    url: getBackupUrl(location, state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Externally)
