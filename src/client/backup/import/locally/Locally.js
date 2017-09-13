import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './locally.scss'

class Locally extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
  }

  render() {
    const updateData = (event) => this.setState({data: event.target.value})
    const doImport = () => this.props.importData(this.state.data)

    return (
      <div>
        <label>
          <span className={styles.label}>configuration to import</span>
          <textarea className={styles.data} placeholder='paste exported configuration here and press import' value={this.state.data}
                    onChange={updateData} spellCheck='false' data-locator='import-data'/>
        </label>
        <button className={styles.import} onClick={doImport} data-locator='import'>import</button>
      </div>
    )
  }
}

Locally.propTypes = {
  loaded: PropTypes.bool,
  importData: PropTypes.func.isRequired
}

export default Locally
