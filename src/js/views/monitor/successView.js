import React, {Component} from 'react'
import Message from './messageComponent'
import Image from './imageComponent'
import SuccessStore from '../../stores/SuccessStore'

class Success extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: SuccessStore.randomMessage()
    }
  }

  render() {
    if (SuccessStore.isUrl(this.state.message)) {
      return <Image url={this.state.message}/>
    } else {
      return <Message message={this.state.message}/>
    }
  }
}

export default Success
