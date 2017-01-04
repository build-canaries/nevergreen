import React, {Component, PropTypes} from 'react'
import Container from '../common/container/Container'
import RemoveLink from './RemoveLink'
import './added-images.scss'
import _ from 'lodash'

class AddedImages extends Component {
  render() {
    if (_.isEmpty(this.props.urls)) {
      return null
    }

    return (
      <Container title='images' className='added-images'>
        <ol className='success-images-list'>
          {
            this.props.urls.map((url, index) => {
              const remove = () => this.props.removeMessage(url)

              return (
                <li key={`i${index}`} className='success-item image'>
                  <div className='image-wrapper'>
                    <img className='success-list-image' src={url} alt={url} title={url} data-locator='success-image'/>
                  </div>
                  <RemoveLink hotkeys={[`y i ${index}`]} removeMessage={remove} message={url}/>
                </li>
              )
            })
          }
        </ol>
      </Container>
    )
  }
}

AddedImages.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default AddedImages
