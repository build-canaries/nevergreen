import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {uploadToGitHub} from '../../../actions/ExportActions'
import {gitHubSetDescription, gitHubSetGistId} from '../../../actions/GitHubActions'
import GitHub from './GitHub'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({uploadToGitHub, gitHubSetGistId, gitHubSetDescription}, dispatch)
}

function mapStateToProps(store, ownProps) {
  return {
    loaded: store.getIn(['backupExport', 'loaded']),
    gistId: store.getIn(['github', 'gistId']),
    description: store.getIn(['github', 'description']),
    configuration: ownProps.configuration
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
