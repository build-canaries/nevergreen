import React from 'react'
import Message from './messageComponent'
import Image from './imageComponent'
import SuccessStore from '../../stores/SuccessStore'

module.exports = React.createClass({
  displayName: 'Success',

  getInitialState() {
    return {message: SuccessStore.randomMessage()}
  },

  render() {
    if (SuccessStore.isUrl(this.state.message)) {
      return <Image url={this.state.message}/>
    } else {
      return <Message message={this.state.message}/>
    }
  }
})
