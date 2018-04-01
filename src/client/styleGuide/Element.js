import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'

class Element extends Component {
  render() {
    return React.createElement(this.props.type, {},
      <Fragment>
        &lt;{this.props.type}&gt;{this.props.children}&lt;/{this.props.type}&gt;
      </Fragment>
    )
  }
}

Element.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Element
