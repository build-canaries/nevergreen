import Immutable from 'immutable'
import {connect} from 'react-redux'
import {selectProject} from '../../actions/TrayActions'
import Tray from './Tray'

function mapDispatchToProps(dispatch) {
  return {
    selectProject(trayId, projectUrl, selected) {
      dispatch(selectProject(trayId, projectUrl, selected))
    }
  }
}

function mapStateToProps(store, ownProps) {
  return Immutable.Map()
    .merge({
      projects: store.get('projects').get(ownProps.trayId).toList(),
      selected: store.get('selected').get(ownProps.trayId)
    }, ownProps)
    .toJS()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tray)
