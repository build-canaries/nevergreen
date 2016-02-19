const React = require('react')

module.exports = React.createClass({
  displayName: 'ValidationMessages',

  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  render() {
    return (
      <div className='validation-messages'>
      {
        this.props.messages.map((msg, index) => {
          return (
            <div key={index} className='validation-message'>
              <span className='icon-notification'/>
              <span className='text-with-icon'>{msg}</span>
            </div>
          )
        })
      }
      </div>
    )
  }
})
