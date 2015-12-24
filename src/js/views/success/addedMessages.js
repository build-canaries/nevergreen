const React = require('react')
const Message = require('./message')

module.exports = React.createClass({
  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    removeMessage: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <section className='sub-section'>
        <h3 className='section-title'>Messages</h3>
        <ul className='success-list success-text-list'>
          {
            this.props.messages.map(function (message) {
              return <Message key={message} message={message}
                              removeMessage={this.props.removeMessage.bind(null, message)}/>
            }.bind(this))
          }
        </ul>
      </section>
    )
  }
})
