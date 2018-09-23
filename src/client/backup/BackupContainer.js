import {connect} from 'react-redux'
import Backup from './Backup'
import {schema} from '../common/repo/Data'
import {toJson} from '../common/Json'

function mapStateToProps() {
  return {
    schema: toJson(schema)
  }
}

export default connect(mapStateToProps)(Backup)
