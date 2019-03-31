import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {GitLab} from './GitLab'
import {restoreFromGitLab} from '../../../actions/GitLabThunkActionCreators'
import {gitLabSetUrl, gitLabSetSnippetId} from '../../../actions/GitLabActionCreators'
import {getGitLabUrl, getGitLabSnippetId, getImportLoaded} from '../../../reducers/Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    restoreFromGitLab,
    gitLabSetUrl,
    gitLabSetSnippetId
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    loaded: getImportLoaded(state),
    url: getGitLabUrl(state),
    snippetId: getGitLabSnippetId(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitLab)
