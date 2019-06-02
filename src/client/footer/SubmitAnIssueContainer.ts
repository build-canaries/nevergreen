import {connect} from 'react-redux'
import {getTrays} from '../reducers/TraysReducer'
import {SubmitAnIssue} from './SubmitAnIssue'
import {State} from '../reducers/Reducer'

function mapStateToProps(state: State) {
  return {
    trays: getTrays(state)
  }
}

export default connect(mapStateToProps)(SubmitAnIssue)
