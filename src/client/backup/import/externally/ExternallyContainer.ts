import {connect} from 'react-redux'
import {Externally} from './Externally'
import {BackupLocation, backupSetId, backupSetUrl} from '../../BackupActionCreators'
import {State} from '../../../Reducer'
import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import {getBackupId, getBackupUrl} from '../../BackupReducer'
import {Configuration} from '../../../configuration/Configuration'
import {setConfiguration} from '../../../NevergreenActionCreators'

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
