import React, {Component, PropTypes} from 'react'
import Messages from '../common/messages/Messages'
import Clipboard from 'clipboard'
import Container from '../common/container/Container'
import './export.scss'

class Export extends Component {
  constructor(props) {
    super(props)
    this.state = {infos: [], errors: []}
  }

  componentDidMount() {
    const clipboard = new Clipboard('#copy-to-clipboard')
    clipboard.on('error', () => {
      this.setState({errors: ['Unfortunately your browser doesn\'t support automatically copying to clipboard, please manually copy']})
    })

    clipboard.on('success', (e) => {
      this.setState({infos: ['Successfully copied to clipboard']})
      e.clearSelection()
    })

    this.setState({clipboard})
  }

  componentWillUnmount() {
    this.state.clipboard.destroy()
  }

  render() {
    return (
      <Container title='export' className='export'>
        <pre>
          <textarea id='export-data' className='export-data' value={this.props.configuration} readOnly='true' spellCheck='false'
                    data-locator='export-data'/>
        </pre>
        <button className='copy' id='copy-to-clipboard' data-clipboard-target='#export-data'>copy to clipboard</button>
        <Messages type='error' messages={this.state.errors}/>
        <Messages type='info' messages={this.state.infos}/>
      </Container>
    )
  }
}

Export.propTypes = {
  configuration: PropTypes.string.isRequired
}

export default Export
