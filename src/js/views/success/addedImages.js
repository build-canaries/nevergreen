const React = require('react')
const RemoveLink = require('./removeLink')

module.exports = React.createClass({
  displayName: 'AddedImages',

  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    removeMessage: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <section className='sub-section'>
        <h3 className='section-title'>Images</h3>
        <ul className='success-list success-images-list'>
          {
            this.props.messages.map(message => {
              return (
                <li key={message} className='success-item image'>
                  <image className='success-list-image' src={message} alt={message}/>
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
