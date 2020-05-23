import React, {ReactElement} from 'react'
import {Container} from '../common/Container'
import styles from './schema.scss'
import {toJson} from '../common/Json'
import {schema} from '../configuration/Configuration'

export function Schema(): ReactElement {
  return (
    <Container title='Schema' initiallyHidden className={styles.container}>
      <pre className={styles.schema}>{toJson(schema)}</pre>
    </Container>
  )
}
