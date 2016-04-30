import React from 'react'
import ValidationMessages from '../general/validationMessages'
import InfoMessages from '../general/InfoMessages'
import Clipboard from 'clipboard'
import Container from '../general/container'
import Loading from '../general/loading'

module.exports = React.createClass({
  displayName: 'Export',

  propTypes: {
    loading: React.PropTypes.bool,
    configuration: React.PropTypes.string
  },

  getInitialState() {
    return {
      infos: [],
      errors: []
    }
  },

  componentDidMount() {
    const clipboard = new Clipboard('#copy-to-clipboard')
    clipboard.on('error', () => {
      this.setState({errors: ['Unfortunately your browser doesn\'t support automatically copying to clipboard, please manually copy']})
    })

    clipboard.on('success', e => {
      this.setState({infos: ['Successfully copied to clipboard']})
      e.clearSelection()
    })

    this.setState({clipboard: clipboard})
  },

  componentWillUnmount() {
    this.state.clipboard.destroy()
  },

  render() {
    const content = (
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
    )

    return (
      <Container title='Export'>
        <Loading loading={this.props.loading}>{content}</Loading>
      </Container>
    )
  }
})
