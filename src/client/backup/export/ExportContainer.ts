import {connect} from 'react-redux'
import {Export} from './Export'
import {filter} from '../../configuration/Configuration'
import {toJson} from '../../common/Json'
import {State} from '../../Reducer'

function mapDispatchToProps() {
  return {}
}

function mapStateToProps(state: State) {
  return {
    configuration: toJson(filter(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Export)
