import {connect} from 'react-redux'
import {Export} from './Export'
import {filter} from '../../common/repo/Data'
import {toJson} from '../../common/Json'
import {toJS} from '../../common/ImmutableToJs'
import {exportErrors, exportInfos} from '../../Selectors'

function mapDispatchToProps() {
  return {}
}

function mapStateToProps(state) {
  return {
    errors: exportErrors(state),
    infos: exportInfos(state),
    configuration: toJson(filter(state.toJS()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Export))
