import React, {Component, PropTypes} from 'react'
import ValidationMessages from '../views/general/validationMessages'
import InfoMessages from '../views/general/InfoMessages'
import Clipboard from 'clipboard'
import Container from '../views/general/container'
import Loading from '../views/general/loading'

class Export extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infos: [],
      errors: []
    }
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
      <Container title='Export'>
        <Loading loading={this.props.loading}>
          <div>
            <pre>
              <textarea id='export-data'
                        className='export-text'
                        placeholder='loading...'
                        value={this.props.configuration}
                        readOnly='true'
                        spellCheck='false'/>
            </pre>
            <button id='copy-to-clipboard'
                    className='button-primary'
                    data-clipboard-target='#export-data'>
              copy to clipboard
            </button>
            <ValidationMessages messages={this.state.errors}/>
            <InfoMessages messages={this.state.infos}/>
          </div>
        </Loading>
      </Container>
    )
  }
}

Export.propTypes = {
  loading: PropTypes.bool,
  configuration: PropTypes.string
}

export default Export
