const React = require('react')

module.exports = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div id='success-image'>
        <img src={this.props.url} className="monitor-success-image" alt=""/>
      </div>
    )
  },

  shouldComponentUpdate() {
    return false
  }
})
