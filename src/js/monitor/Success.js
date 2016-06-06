import React, {Component, PropTypes} from 'react'
import Message from './SuccessMessage'
import Image from './SuccessImage'
import _ from 'lodash'

class Success extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isUrl = _.startsWith(this.props.message, 'http')

    if (isUrl) {
      return <Image url={this.props.message}/>
    } else {
      return <Message message={this.props.message}/>
    }
  }
}

Success.propTypes = {
  message: PropTypes.string.isRequired
}

export default Success
