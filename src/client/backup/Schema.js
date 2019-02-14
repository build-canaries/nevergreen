import React from 'react'
import PropTypes from 'prop-types'
import {Container} from '../common/Container'
import styles from './schema.scss'

export function Schema({schema}) {
  return (
    <Container title='Schema' initiallyHidden className={styles.container}>
      <pre className={styles.schema}>{schema}</pre>
    </Container>
  )
}

Schema.propTypes = {
  schema: PropTypes.string.isRequired
}
