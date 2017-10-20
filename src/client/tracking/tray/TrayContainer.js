import {connect} from 'react-redux'
import Tray from './Tray'

function mapStateToProps(store, ownProps) {
  const tray = store.getIn(['trays', ownProps.trayId])
  return {
    trayId: ownProps.trayId,
    index: ownProps.index,
    loaded: tray.get('loaded'),
    name: tray.get('name'),
    url: tray.get('url'),
    highlight: tray.get('highlight')
  }
}

export default connect(mapStateToProps)(Tray)
