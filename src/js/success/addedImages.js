import React, {Component, PropTypes} from 'react'
import Container from '../common/Container'
import RemoveLink from './RemoveLink'

class AddedImages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container title='Images'>
        <ul className='success-list success-images-list'>
          {
            this.props.messages.map((message, index) => {
              return (
                <li key={`i${index}`} className='success-item image'>
                  <img className='success-list-image' src={message} alt={message}/>
                  <RemoveLink hotkeys={[`y i ${index}`]} removeMessage={this.props.removeMessage.bind(null, message)}/>
                </li>
              )
            })
          }
        </ul>
      </Container>
    )
  }
}

AddedImages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default AddedImages
