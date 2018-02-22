import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import Schema from './Schema'
import ImportContainer from './import/ImportContainer'
import ExportContainer from './export/ExportContainer'
import Title from '../common/Title'

class Backup extends Component {
  render() {
    return (
      <Fragment>
        <Title>Backup</Title>
        <ImportContainer/>
        <ExportContainer/>
        <Schema schema={this.props.schema}/>
      </Fragment>
    )
  }
}

Backup.propTypes = {
  schema: PropTypes.string
}

export default Backup
