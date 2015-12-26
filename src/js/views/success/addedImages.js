const React = require('react')
const Image = require('./image')

module.exports = React.createClass({
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
              return <Image key={message} url={message} removeMessage={this.props.removeMessage.bind(null, message)}/>
            })
          }
        </ul>
      </section>
    )
  }
})
