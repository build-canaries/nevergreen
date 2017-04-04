import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {uploadToGitHub} from '../../../actions/ExportActions'
import {gitHubSetUrl, gitHubSetDescription} from '../../../actions/GitHubActions'
import GitHub from './GitHub'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({uploadToGitHub, gitHubSetUrl, gitHubSetDescription}, dispatch)
}

function mapStateToProps(store, ownProps) {
  return {
    loaded: store.getIn(['backupExport', 'loaded']),
    url: store.getIn(['github', 'url']),
    description: store.getIn(['github', 'description']),
    configuration: ownProps.configuration
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHub)
