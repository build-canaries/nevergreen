import React from 'react'
import {Container} from '../common/Container'
import styles from './schema.scss'

interface SchemaProps {
  schema: string;
}

export function Schema({schema}: SchemaProps) {
  return (
    <Container title='Schema' initiallyHidden className={styles.container}>
      <pre className={styles.schema}>{schema}</pre>
    </Container>
  )
}
