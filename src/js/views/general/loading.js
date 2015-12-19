var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <div className='config-spinner'>
        <img src='img/loading-bars.svg' alt='loading'/>
      </div>
    )
  }
})
