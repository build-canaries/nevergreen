import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {restoreFromGitHub} from '../../../actions/GitHubThunkActionCreators'
import {gitHubSetGistId} from '../../../actions/GitHubActionCreators'
import {GitHub} from './GitHub'
import {getGistId, getImportLoaded} from '../../../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    restoreFromGitHub,
    gitHubSetGistId
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: getImportLoaded(state),
    gistId: getGistId(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
