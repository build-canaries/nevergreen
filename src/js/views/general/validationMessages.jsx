var React = require('react')

module.exports = React.createClass({
  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  render: function () {
    var validationMessages = ''

    if (this.props.messages) {
      validationMessages = this.props.messages.map(function (msg, index) {
        return (
          <div key={index} className='import-error'>
            <span className='icon-notification'></span>
            <span className='text-with-icon'>{msg}</span>
          </div>
        )
      })
    }

    return <div className='import-error-box'>{validationMessages}</div>
  }
})
