import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

export function Element({type, children}) {
  return React.createElement(type, {},
    <Fragment>
      &lt;{type}&gt;{children}&lt;/{type}&gt;
    </Fragment>
  )
}

Element.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
