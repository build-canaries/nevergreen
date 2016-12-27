import React, {Component, PropTypes} from 'react'
import Container from '../common/container/Container'
import './schema.scss'

class Schema extends Component {
  render() {
    return (
      <Container title='schema' className='schema' hidden={true}>
        <pre>{this.props.schema}</pre>
      </Container>
    )
  }
}

Schema.propTypes = {
  schema: PropTypes.string.isRequired
}

export default Schema
