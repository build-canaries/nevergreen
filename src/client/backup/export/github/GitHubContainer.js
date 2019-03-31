import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {uploadToGitHub} from '../../../actions/GitHubThunkActionCreators'
import {gitHubSetDescription, gitHubSetGistId} from '../../../actions/GitHubActionCreators'
import {GitHub} from './GitHub'
import {getExportLoaded, getGistDescription, getGistId} from '../../../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    uploadToGitHub,
    gitHubSetGistId,
    gitHubSetDescription
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: getExportLoaded(state),
    gistId: getGistId(state),
    description: getGistDescription(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
