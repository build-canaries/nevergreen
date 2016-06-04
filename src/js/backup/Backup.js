import React, {Component, PropTypes} from 'react'
import Import from './Import'
import Export from './Export'

class Backup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const importProps = {
      errors: this.props.importErrors,
      infos: this.props.importInfos,
      loading: this.props.importing,
      importData: this.props.importData
    }
    const exportProps = {
      configuration: JSON.stringify(this.props.configuration, null, 2),
      loading: this.props.exporting
    }

    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Export</h2>
        <Import {...importProps}/>
        <Export {...exportProps}/>
      </section>
    )
  }
}

Backup.propTypes = {
  exporting: PropTypes.bool.isRequired,
  configuration: PropTypes.object.isRequired,
  importing: PropTypes.bool.isRequired,
  importErrors: PropTypes.arrayOf(React.PropTypes.string),
  importInfos: PropTypes.arrayOf(React.PropTypes.string),
  importData: PropTypes.func.isRequired
}

export default Backup
