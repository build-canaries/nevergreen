import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {restoreFromGitHub} from '../../../actions/GitHubThunkActionCreators'
import {gitHubSetGistId, gitHubSetUrl} from '../../../actions/GitHubActionCreators'
import {GitHub} from './GitHub'
import {getGistId, getGitHubUrl, getImportLoaded} from '../../../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    restoreFromGitHub,
    gitHubSetGistId,
    gitHubSetUrl
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: getImportLoaded(state),
    gistId: getGistId(state),
    url: getGitHubUrl(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
