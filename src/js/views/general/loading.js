import React from 'react'

module.exports = React.createClass({
  displayName: 'Loading',

  propTypes: {
    loading: React.PropTypes.bool.isRequired
  },

  render() {
    if (this.props.loading) {
      return <div className='config-spinner'>
        <img src='img/loading-bars.svg' alt='loading'/>
      </div>
    } else {
      return this.props.children
    }
  }
})
