import React, {Component, PropTypes} from 'react'
import Import from './Import'
import Export from './Export'
import Schema from './Schema'
import './backup.scss'

class Backup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const importProps = {
      errors: this.props.errors,
      infos: this.props.infos,
      importData: this.props.importData
    }
    const exportProps = {
      configuration: this.props.configuration
    }

    return (
      <section className='backup'>
        <h2 className='visually-hidden'>Export</h2>
        <Export {...exportProps}/>
        <Import {...importProps}/>
        <Schema schema={this.props.schema}/>
      </section>
    )
  }
}

Backup.propTypes = {
  configuration: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  infos: PropTypes.arrayOf(PropTypes.string),
  importData: PropTypes.func.isRequired,
  schema: PropTypes.string
}

export default Backup
