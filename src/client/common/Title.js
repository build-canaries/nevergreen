import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {VisuallyHidden} from '../common/VisuallyHidden'

export class Title extends Component {

  constructor(props) {
    super(props)
    this.titleNode = React.createRef()
  }

  componentDidMount() {
    document.title = this.props.children
    if (this.titleNode.current) {
      this.titleNode.current.focus()
    }
  }

  componentWillUnmount() {
    document.title = 'Nevergreen'
  }

  render() {
    const {children} = this.props

    return (
      <VisuallyHidden>
        <h1 ref={this.titleNode}
            tabIndex='-1'
            data-locator='title'>
          {children}
        </h1>
      </VisuallyHidden>
    )
  }
}

Title.propTypes = {
  children: PropTypes.string.isRequired
}
