import React, {Component, PropTypes} from 'react'
import Message from './SuccessMessage'
import Image from './SuccessImage'
import _ from 'lodash'

class Success extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.setState({message: this.props.message()})
  }

  render() {
    const isUrl = _.startsWith(this.state.message, 'http')

    if (isUrl) {
      return <Image url={this.state.message}/>
    } else {
      return <Message message={this.state.message}/>
    }
  }
}

Success.propTypes = {
  message: PropTypes.func.isRequired
}

export default Success
