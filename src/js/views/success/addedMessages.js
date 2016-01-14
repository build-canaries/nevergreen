const React = require('react')
const RemoveLink = require('./removeLink')

module.exports = React.createClass({
  displayName: 'AddedMessages',

  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    removeMessage: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <section className='sub-section'>
        <h3 className='section-title'>Messages</h3>
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
      </section>
    )
  }
})
