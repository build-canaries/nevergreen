import React, {Component, PropTypes} from 'react'

class Loading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.loading) {
      return <div className='config-spinner'>
        <img src='img/loading-bars.svg' alt='loading'/>
      </div>
    } else {
      return this.props.children
    }
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default Loading
