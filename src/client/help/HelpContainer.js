import {connect} from 'react-redux'
import Help from './Help'
import {keyboardShortcut} from '../actions/ShortcutActions'

function mapDispatchToProps(dispatch) {
  return {
    keyboardShortcut(show) {
      dispatch(keyboardShortcut(show))
    }
  }
}

function mapStateToProps(store) {
  return {showShortcuts: store.get('shortcut')}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Help)
