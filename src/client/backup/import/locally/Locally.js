import React, {Component, PropTypes} from 'react'
import './locally.scss'

class Locally extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
  }

  render() {
    const updateData = (event) => this.setState({data: event.target.value})
    const doImport = () => this.props.importData(this.state.data)

    return (
      <div className='import-locally'>
        <label className='import-data'>
          <span>configuration to import</span>
          <textarea placeholder='paste exported configuration here and press import' value={this.state.data} onChange={updateData}
                    spellCheck='false' data-locator='import-data'/>
        </label>
        <button className='import-button' onClick={doImport} data-locator='import'>import</button>
      </div>
    )
  }
}

Locally.propTypes = {
  loaded: PropTypes.bool,
  importData: PropTypes.func.isRequired
}

export default Locally
