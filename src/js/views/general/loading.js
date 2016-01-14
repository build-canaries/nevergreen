const React = require('react')

module.exports = React.createClass({
  displayName: 'Loading',

  render() {
    return (
      <div className='config-spinner'>
        <img src='img/loading-bars.svg' alt='loading'/>
      </div>
    )
  }
})
