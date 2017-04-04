import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {restoreFromGitHub} from '../../../actions/ImportActions'
import {gitHubSetUrl} from '../../../actions/GitHubActions'
import GitHub from './GitHub'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({restoreFromGitHub, gitHubSetUrl}, dispatch)
}

function mapStateToProps(store) {
  return {
    loaded: store.getIn(['backupImport', 'loaded']),
    url: store.getIn(['github', 'url'])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
