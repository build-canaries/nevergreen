import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {trays} from '../reducers/Selectors'
import {SubmitAnIssue} from './SubmitAnIssue'
import {toJS} from '../common/ImmutableToJs'

function mapStateToProps(state) {
  return {
    trays: trays(state)
  }
}

export default withRouter(connect(mapStateToProps)(toJS(SubmitAnIssue)))
