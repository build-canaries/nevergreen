const React = require('react')
const ValidationMessages = require('../general/validationMessages')
const InfoMessages = require('../general/InfoMessages')
const Clipboard = require('clipboard')
const Container = require('../general/container')
const Loading = require('../general/loading')

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
                    className='import-export-text'
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
        <div className="section-body">
          {this.props.loading ? <Loading/> : content}
        </div>
      </Container>
    )
  }
})
