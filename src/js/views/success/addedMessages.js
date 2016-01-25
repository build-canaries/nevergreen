const React = require('react')
const Container = require('../general/container')
const RemoveLink = require('./removeLink')
const Mousetrap = require('mousetrap')

module.exports = React.createClass({
  displayName: 'AddedMessages',

  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    removeMessage: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this._bindKeyEvents(this.props.messages)
  },

  componentWillUnmount() {
    this._unbindKeyEvents(this.props.messages)
  },

  componentWillReceiveProps(nextProps) {
    this._unbindKeyEvents(this.props.messages)
    this._bindKeyEvents(nextProps.messages)
  },

  render() {
    return (
      <Container title='Messages'>
        <ul className='success-list success-text-list'>
          {
            this.props.messages.map(message => {
              return (
                <li key={message} className='success-item'>
                  <span className='success-message'>{message}</span>
                  <RemoveLink removeMessage={this.props.removeMessage.bind(null, message)}/>
                </li>
              )
            })
          }
        </ul>
      </Container>
    )
  },

  _bindKeyEvents(messages) {
    messages.forEach((message, index) => {
      Mousetrap.bind(`d m ${index}`, this.props.removeMessage.bind(null, message))
    })
  },

  _unbindKeyEvents(messages) {
    messages.forEach((_, index) => {
      Mousetrap.unbind(`d m ${index}`)
    })
  }
})
