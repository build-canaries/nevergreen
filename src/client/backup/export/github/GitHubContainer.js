import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {uploadToGitHub} from '../../../actions/GitHubThunkActionCreators'
import {gitHubSetDescription, gitHubSetGistId} from '../../../actions/GitHubActionCreators'
import GitHub from './GitHub'
import {exportLoaded, gistDescription, gistId} from '../../../Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({uploadToGitHub, gitHubSetGistId, gitHubSetDescription}, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: exportLoaded(state),
    gistId: gistId(state),
    description: gistDescription(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
