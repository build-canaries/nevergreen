import React from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import ValidationMessages from '../general/validationMessages'
import InfoMessages from '../general/InfoMessages'
import ConfigurationActions from '../../actions/ConfigurationActions'
import Container from '../general/container'
import Loading from '../general/loading'
import PrimaryInput from '../general/PrimaryInput'

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
          <textarea className='export-text'
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
        <Loading loading={this.props.loading}>{content}</Loading>
      </Container>
    )
  },

  _import() {
    ConfigurationActions.importData(this.state.data)
  }
})
