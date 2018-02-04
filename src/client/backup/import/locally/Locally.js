import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import styles from './locally.scss'

const PLACEHOLDER = 'paste exported configuration here and press import'

class Locally extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
  }

  updateData = (evt) => {
    this.setState({data: evt.target.value})
  }

  doImport = () => {
    this.props.importData(this.state.data)
  }

  render() {

    return (
      <Fragment>
        <label>
          <span className={styles.label}>configuration to import</span>
          <textarea className={styles.data}
                    placeholder={PLACEHOLDER}
                    value={this.state.data}
                    onChange={this.updateData}
                    spellCheck='false'
                    data-locator='import-data'/>
        </label>
        <button className={styles.import} onClick={this.doImport} data-locator='import'>import</button>
      </Fragment>
    )
  }
}

Locally.propTypes = {
  loaded: PropTypes.bool,
  importData: PropTypes.func.isRequired
}

export default Locally
