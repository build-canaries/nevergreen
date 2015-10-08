var React = require('react')
var Message = require('./messageComponent')
var Image = require('./imageComponent')
var SuccessStore = require('../../stores/SuccessStore')

module.exports = React.createClass({
  getInitialState: function () {
    return {message: SuccessStore.randomMessage()}
  },

  render: function () {
    if (this.state.message.isImage) {
      return <Image url={this.state.message.value}/>
    } else {
      return <Message message={this.state.message.value}/>
    }
  },

  componentWillMount: function () {
    this.setState({message: SuccessStore.randomMessage()})
  }
})
