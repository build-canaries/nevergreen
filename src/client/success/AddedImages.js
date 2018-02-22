import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import RemoveLink from './RemoveLink'
import styles from './added-images.scss'
import _ from 'lodash'

class AddedImages extends Component {
  render() {
    if (_.isEmpty(this.props.urls)) {
      return null
    }

    return (
      <Container title='Images' className={styles.container}>
        <ol className={styles.successImages}>
          {
            this.props.urls.map((url, index) => {
              const remove = () => this.props.removeMessage(url)

              return (
                <li key={`i${index}`} className={styles.imageItem}>
                  <div className={styles.imageWrapper}>
                    <img className={styles.image} src={url} alt={url} title={url} data-locator='success-image'/>
                  </div>
                  <RemoveLink hotkeys={[`y i ${index}`]} removeMessage={remove} message={url}
                              className={styles.remove}/>
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
