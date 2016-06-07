import React, {Component, PropTypes} from 'react'

class SuccessImage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='success-image'>
        <img src={this.props.url} className='monitor-success-image' alt=''/>
      </div>
    )
  }
}

SuccessImage.propTypes = {
  url: PropTypes.string.isRequired
}

export default SuccessImage
