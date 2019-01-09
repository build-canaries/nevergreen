import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {GitLab} from './GitLab'
import {restoreFromGitLab} from '../../../actions/GitLabThunkActionCreators'
import {gitLabSetUrl, gitLabSetSnippetId} from '../../../actions/GitLabActionCreators'
import {gitLabUrl, gitLabSnippetId, importLoaded} from '../../../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    restoreFromGitLab,
    gitLabSetUrl,
    gitLabSetSnippetId
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: importLoaded(state),
    url: gitLabUrl(state),
    snippetId: gitLabSnippetId(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitLab)
