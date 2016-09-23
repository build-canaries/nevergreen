import {connect} from 'react-redux'
import Shortcut from './Shortcut'

function mapDispatchToProps() {
  return {}
}

function mapStateToProps(store, ownProps) {
  return {
    hotkeys: ownProps.hotkeys,
    shortcutsShown: store.get('nevergreen').get('shortcutsShown')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shortcut)
