const React = require('react')
const _ = require('lodash')

module.exports = React.createClass({
  displayName: 'Notification',

  propTypes: {
    message: React.PropTypes.string
  },

  render() {
    const classes = 'notification' + (_.size(this.props.message) > 0 ? '' : ' hidden')

    return <div className={classes}>
      <div>
        <span className='icon-notification'/>
        <span className='text-with-icon'>Notification</span>
      </div>
      {this.props.message}
    </div>
  }
})
