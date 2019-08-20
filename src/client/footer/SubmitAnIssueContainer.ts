import {connect} from 'react-redux'
import {getTrays} from '../tracking/TraysReducer'
import {SubmitAnIssue} from './SubmitAnIssue'
import {State} from '../Reducer'

function mapStateToProps(state: State) {
  return {
    trays: getTrays(state)
  }
}

export default connect(mapStateToProps)(SubmitAnIssue)
