const React = require('react')
const Container = require('../general/container')
const RemoveLink = require('./removeLink')

module.exports = React.createClass({
  displayName: 'AddedImages',

  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    removeMessage: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <Container title='Images'>
        <ul className='success-list success-images-list'>
          {
            this.props.messages.map((message, index) => {
              return (
                <li key={`i${index}`} className='success-item image'>
                  <image className='success-list-image' src={message} alt={message}/>
                  <RemoveLink hotkeys={[`y i ${index}`]} removeMessage={this.props.removeMessage.bind(null, message)}/>
                </li>
              )
            })
          }
        </ul>
      </Container>
    )
  }
})
