import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Schema from './Schema'
import ImportContainer from './import/ImportContainer'
import ExportContainer from './export/ExportContainer'
import './backup.scss'

class Backup extends Component {
  render() {
    return (
      <section className='backup'>
        <h2 className='visually-hidden'>Backup</h2>
        <ImportContainer/>
        <ExportContainer/>
        <Schema schema={this.props.schema}/>
      </section>
    )
  }
}

Backup.propTypes = {
  schema: PropTypes.string
}

export default Backup
