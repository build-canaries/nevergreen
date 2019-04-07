import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {uploadToGitHub} from '../../../actions/GitHubThunkActionCreators'
import {gitHubSetDescription, gitHubSetGistId, gitHubSetUrl} from '../../../actions/GitHubActionCreators'
import {GitHub} from './GitHub'
import {getExportLoaded, getGistDescription, getGistId, getGitHubUrl} from '../../../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    uploadToGitHub,
    gitHubSetGistId,
    gitHubSetDescription,
    gitHubSetUrl
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: getExportLoaded(state),
    gistId: getGistId(state),
    description: getGistDescription(state),
    url: getGitHubUrl(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
