var React = require('react')
var Message = require('./messageComponent')
var Image = require('./imageComponent')
var SuccessStore = require('../../stores/SuccessStore')

module.exports = React.createClass({
  getInitialState: function () {
    return {message: SuccessStore.randomMessage()}
  },

  render: function () {
    if (SuccessStore.isUrl(this.state.message)) {
      return <Image url={this.state.message}/>
    } else {
      return <Message message={this.state.message}/>
    }
  }
})
