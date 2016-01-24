const React = require('react')
const Container = require('../general/container')
const RemoveLink = require('./removeLink')

module.exports = React.createClass({
  displayName: 'AddedMessages',

  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    removeMessage: React.PropTypes.func.isRequired
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
  }
})
