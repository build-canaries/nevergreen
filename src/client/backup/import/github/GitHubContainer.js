import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {restoreFromGitHub} from '../../../actions/ImportActions'
import {gitHubSetGistId} from '../../../actions/GitHubActions'
import GitHub from './GitHub'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({restoreFromGitHub, gitHubSetGistId}, dispatch)
}

function mapStateToProps(store) {
  return {
    loaded: store.getIn(['backupImport', 'loaded']),
    gistId: store.getIn(['github', 'gistId'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
