import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {GitLab} from './GitLab'
import {uploadToGitLab} from '../../../actions/GitLabThunkActionCreators'
import {gitLabSetTitle, gitLabSetUrl, gitLabSetSnippetId} from '../../../actions/GitLabActionCreators'
import {gitLabUrl, gitLabSnippetId, gitLabTitle, importLoaded} from '../../../reducers/Selectors'

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        uploadToGitLab,
        gitLabSetTitle,
        gitLabSetUrl,
        gitLabSetSnippetId
    }, dispatch)
}


function mapStateToProps(state) {
    return {
      loaded: importLoaded(state),
      url: gitLabUrl(state),
      snippetId: gitLabSnippetId(state),
      title: gitLabTitle(state)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(GitLab)
