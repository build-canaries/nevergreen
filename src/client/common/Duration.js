import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import VisuallyHidden from './VisuallyHidden'
import {abbreviateDuration, formatAsDuration} from './DateTime'
import Timer from './Timer'
import {isBlank} from './Utils'

const ONE_MINUTE = 60

class Duration extends Component {
  static getDerivedStateFromProps(nextProps) {
    return {
      duration: formatAsDuration(nextProps.timestamp)
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const fullDescription = [this.props.fullDescriptionPrefix, this.state.duration, this.props.fullDescriptionSuffix]
      .filter((text) => !isBlank(text))
      .join(' ')

    return (
      <Fragment>
        <Timer onTrigger={() => this.forceUpdate()} interval={ONE_MINUTE}/>
        {
          this.props.abbreviate && (
            <Fragment>
              <VisuallyHidden>{fullDescription}.</VisuallyHidden>
              <span data-locator='duration' aria-hidden>
                {abbreviateDuration(this.state.duration)}
              </span>
            </Fragment>
          )
        }
        {
          !this.props.abbreviate && (
            <span data-locator='duration'>{fullDescription}</span>
          )
        }
      </Fragment>
    )
  }
}

Duration.propTypes = {
  abbreviate: PropTypes.bool,
  timestamp: PropTypes.string,
  fullDescriptionPrefix: PropTypes.string,
  fullDescriptionSuffix: PropTypes.string
}

export default Duration
