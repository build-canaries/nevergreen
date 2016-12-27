import React, {Component, PropTypes} from 'react'
import Messages from '../common/messages/Messages'
import Container from '../common/container/Container'
import './import.scss'
import _ from 'lodash'

class Import extends Component {
  constructor(props) {
    super(props)
    this.state = {data: ''}
  }

  componentDidMount() {
    this.primaryInput.focus()
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
      <Container title='import' className='import'>
        <textarea className='import-data' placeholder='paste exported configuration here and press import' value={this.state.data}
                  onChange={updateData} spellCheck='false' data-locator='import-data' ref={(node) => this.primaryInput = node}/>
        <button className='import-button' onClick={doImport} data-locator='import'>import</button>
        <Messages type='error' messages={this.props.errors}/>
        <Messages type='info' messages={this.props.infos}/>
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
