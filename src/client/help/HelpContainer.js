import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Help} from './Help'
import {keyboardShortcut} from '../actions/ShortcutActionCreators'
import {shortcut} from '../Selectors'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({keyboardShortcut}, dispatch)
}

function mapStateToProps(state) {
  return {
    showShortcuts: shortcut(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)
