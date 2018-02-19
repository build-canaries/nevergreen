import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AddedMessages from './AddedMessages'
import AddedImages from './AddedImages'
import AddMessage from './AddMessage'
import styles from './success.scss'
import VisuallyHidden from '../common/VisuallyHidden'

class Success extends Component {
  render() {
    const messages = this.props.messages.filter((m) => !m.startsWith('http'))
    const images = this.props.messages.filter((m) => m.startsWith('http'))

    return (
      <section className={styles.success}>
        <VisuallyHidden>
          <h2>Success</h2>
        </VisuallyHidden>
        <AddMessage addMessage={this.props.addMessage}/>
        <AddedMessages messages={messages} removeMessage={this.props.removeMessage}/>
        <AddedImages urls={images} removeMessage={this.props.removeMessage}/>
      </section>
    )
  }
}

Success.propTypes = {
  messages: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default Success
