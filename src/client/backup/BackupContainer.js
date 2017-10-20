import {connect} from 'react-redux'
import Backup from './Backup'
import {SCHEMA} from '../common/repo/Data'
import {toJson} from '../common/Json'

function mapStateToProps() {
  return {schema: toJson(SCHEMA)}
}

export default connect(mapStateToProps)(Backup)
