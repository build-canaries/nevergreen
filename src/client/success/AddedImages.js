import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Container} from '../common/container/Container'
import {RemoveLink} from './RemoveLink'
import styles from './added-images.scss'

export function AddedImages({urls, removeMessage}) {
  if (_.isEmpty(urls)) {
    return null
  }

  return (
    <Container title='Images' className={styles.container}>
      <ol className={styles.successImages}>
        {
          urls.map((url, index) => {
            const remove = () => removeMessage(url)

            return (
              <li key={url} className={styles.imageItem}>
                <div className={styles.imageWrapper}>
                  <img className={styles.image}
                       src={url}
                       alt={url}
                       title={url}
                       data-locator='success-image'/>
                </div>
                <RemoveLink hotkeys={[`y i ${index}`]}
                            removeMessage={remove}
                            message={url}
                            className={styles.remove}/>
              </li>
            )
          })
        }
      </ol>
    </Container>
  )
}

AddedImages.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}
