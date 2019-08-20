import {connect} from 'react-redux'
import {Backup} from './Backup'
import {schema} from '../configuration/Configuration'
import {toJson} from '../common/Json'

function mapStateToProps() {
  return {
    schema: toJson(schema)
  }
}

export default connect(mapStateToProps)(Backup)
