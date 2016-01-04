const React = require('react')

module.exports = React.createClass({
  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  render() {
    let infoMessages = ''

    if (this.props.messages) {
      infoMessages = this.props.messages.map((msg, index) => {
        return (
          <div key={index} className='info-message'>
            <span className='icon-checkmark'></span>
            <span className='text-with-icon'>{msg}</span>
          </div>
        )
      })
    }

    return <div className='info-messages'>{infoMessages}</div>
  }
})
