import React, {Component, PropTypes} from 'react'
import AddedMessages from './AddedMessages'
import AddedImages from './AddedImages'
import AddMessage from './AddMessage'
import './success.scss'

class Success extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className='dashboard-main-section'>
        <h2 className='visually-hidden'>Success</h2>
        <AddMessage addMessage={this.props.addMessage} errors={this.props.errors}/>

        { this.props.messages.length > 0 ?
          <AddedMessages messages={this.props.messages} removeMessage={this.props.removeMessage}/> : null }
        { this.props.images.length > 0 ?
          <AddedImages messages={this.props.images} removeMessage={this.props.removeMessage}/> : null }
      </section>
    )
  }
}

Success.propTypes = {
  messages: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  errors: PropTypes.array,
  addMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default Success
