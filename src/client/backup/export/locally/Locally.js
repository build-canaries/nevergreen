import React, {Component, PropTypes} from 'react'
import Clipboard from './Clipboard'
import './locally.scss'

class Locally extends Component {
  render() {
    const copySuccess = () => this.props.exportSuccess(['Successfully copied to clipboard'])
    const copyError = () => this.props.exportError(['Unfortunately your browser doesn\'t support automatically copying to clipboard, please manually copy'])

    return (
      <div className='export-locally'>
        <label className='export-data'>
          <span>current configuration</span>
          <textarea id='export-data' value={this.props.configuration} readOnly spellCheck='false' data-locator='export-data'/>
        </label>
        <Clipboard elementSelector='#copy-to-clipboard' onSuccess={copySuccess} onError={copyError}/>
        <button className='copy' id='copy-to-clipboard' data-clipboard-target='#export-data'>copy to clipboard</button>
      </div>
    )
  }
}

Locally.propTypes = {
  loaded: PropTypes.bool,
  configuration: PropTypes.string.isRequired,
  exportSuccess: PropTypes.func.isRequired,
  exportError: PropTypes.func.isRequired
}

export default Locally
