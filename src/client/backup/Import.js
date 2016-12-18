import React, {Component, PropTypes} from 'react'
import Messages from '../common/messages/Messages'
import Container from '../common/container/Container'
import PrimaryInput from '../common/PrimaryInput'
import './import.scss'
import _ from 'lodash'

class Import extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
  }

  componentWillReceiveProps(nextProps) {
    if (_.size(nextProps.infos) > 0 && _.size(nextProps.errors) === 0) {
      this.setState({data: ''})
    }
  }

  render() {
    const updateData = (event) => this.setState({data: event.target.value})
    const doImport = () => this.props.importData(this.state.data)

    return (
      <Container title='Import' className='import'>
        <div>
          <PrimaryInput>
            <textarea className='import-data' placeholder='paste exported configuration here and press import'
                      value={this.state.data} onChange={updateData} spellCheck='false' data-locator='import-data'/>
          </PrimaryInput>
          <button className='import-action' onClick={doImport} data-locator='import'>import</button>
          <Messages type='notification' messages={this.props.errors}/>
          <Messages type='checkmark' messages={this.props.infos}/>
        </div>
      </Container>
    )
  }
}

Import.propTypes = {
  errors: PropTypes.arrayOf(React.PropTypes.string),
  infos: PropTypes.arrayOf(React.PropTypes.string),
  importData: PropTypes.func.isRequired
}

export default Import
