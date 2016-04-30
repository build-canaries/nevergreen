import React from 'react'

module.exports = React.createClass({
  displayName: 'Image',

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div id='success-image'>
        <img src={this.props.url} className='monitor-success-image' alt=''/>
      </div>
    )
  }
})
