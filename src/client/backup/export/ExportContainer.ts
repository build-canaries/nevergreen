import {connect} from 'react-redux'
import {Export} from './Export'
import {filter} from '../../reducers/Configuration'
import {toJson} from '../../common/Json'
import {getExportErrors, getExportInfos} from '../../reducers/Selectors'
import {State} from '../../reducers/Reducer'

function mapDispatchToProps() {
  return {}
}

function mapStateToProps(state: State) {
  return {
    errors: getExportErrors(state),
    infos: getExportInfos(state),
    configuration: toJson(filter(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Export)
