import React, {Component, PropTypes} from 'react'
import Import from './Import'
import Export from './Export'
import './backup.scss'

class Backup extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.refresh()
  }

  render() {
    const importProps = {
      errors: this.props.importErrors,
      infos: this.props.importInfos,
      loading: this.props.importing,
      importData: this.props.importData
    }
    const exportProps = {
      configuration: this.props.configuration,
      loading: this.props.exporting
    }

    return (
      <section className='backup'>
        <h2 className='visually-hidden'>Export</h2>
        <Import {...importProps}/>
        <Export {...exportProps}/>
      </section>
    )
  }
}

Backup.propTypes = {
  exporting: PropTypes.bool.isRequired,
  configuration: PropTypes.string.isRequired,
  importing: PropTypes.bool.isRequired,
  importErrors: PropTypes.arrayOf(React.PropTypes.string),
  importInfos: PropTypes.arrayOf(React.PropTypes.string),
  refresh: PropTypes.func.isRequired,
  importData: PropTypes.func.isRequired
}

export default Backup
