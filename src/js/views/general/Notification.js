import React, {Component, PropTypes} from 'react'
import _ from 'lodash'

class Notification extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const classes = 'notification' + (_.size(this.props.message) > 0 ? '' : ' hidden')

    return <div className={classes}>
      <div>
        <span className='icon-notification'/>
        <span className='text-with-icon'>Notification</span>
        <span className='icon-cross notification-dismiss' onClick={this.props.dismiss}/>
      </div>
      {this.props.message}
    </div>
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  dismiss: PropTypes.func.isRequired
}

export default Notification
