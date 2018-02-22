import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import styles from './schema.scss'

class Schema extends Component {
  render() {
    return (
      <Container title='Schema' hidden className={styles.container}>
        <pre className={styles.schema}>{this.props.schema}</pre>
      </Container>
    )
  }
}

Schema.propTypes = {
  schema: PropTypes.string.isRequired
}

export default Schema
