import React, {Component, PropTypes} from 'react'

class Image extends Component {
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

Image.propTypes = {
  url: PropTypes.string.isRequired
}

export default Image
