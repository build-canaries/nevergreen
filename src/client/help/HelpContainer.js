import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Help from './Help'
import {keyboardShortcut} from '../actions/ShortcutActions'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({keyboardShortcut}, dispatch)
}

function mapStateToProps(store) {
  return {showShortcuts: store.get('shortcut')}
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)
