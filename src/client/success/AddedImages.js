import React, {Component, PropTypes} from 'react'
import Container from '../common/container/Container'
import RemoveLink from './RemoveLink'
import './added-images.scss'
import _ from 'lodash'

class AddedImages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (_.isEmpty(this.props.urls)) {
      return null
    }

    return (
      <Container title='Images' className='added-images'>
        <ul className='success-images-list'>
          {
            this.props.urls.map((url, index) => {
              const remove = () => this.props.removeMessage(url)

              return (
                <li key={`i${index}`} className='success-item image'>
                  <img className='success-list-image' src={url} alt={url} title={url}/>
                  <RemoveLink hotkeys={[`y i ${index}`]} removeMessage={remove}/>
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
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default AddedImages
