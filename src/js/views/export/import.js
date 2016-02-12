const React = require('react')
const LinkedStateMixin = require('react-addons-linked-state-mixin')
const ValidationMessages = require('../general/validationMessages')
const InfoMessages = require('../general/InfoMessages')
const ConfigurationActions = require('../../actions/ConfigurationActions')
const Container = require('../general/container')
const Loading = require('../general/loading')
const PrimaryInput = require('../general/PrimaryInput')

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  displayName: 'Import',

  propTypes: {
    loading: React.PropTypes.bool,
    errors: React.PropTypes.arrayOf(React.PropTypes.string),
    infos: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getInitialState() {
    return {data: ''}
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length === 0) {
      this.setState({data: ''})
    }
  },

  render() {
    const content = (
      <div>
        <PrimaryInput>
          <textarea className='import-export-text'
                    placeholder='paste exported configuration here and press import'
                    valueLink={this.linkState('data')}
                    spellCheck='false'/>
        </PrimaryInput>
        <button className='button-primary' onClick={this._import }> import</button>
        <ValidationMessages messages={this.props.errors}/>
        <InfoMessages messages={this.props.infos}/>
      </div>
    )

    return (
      <Container title='Import'>
        <div className="section-body">
          {this.props.loading ? <Loading/> : content}
        </div>
      </Container>
    )
  },

  _import() {
    ConfigurationActions.importData(this.state.data)
  }
})
