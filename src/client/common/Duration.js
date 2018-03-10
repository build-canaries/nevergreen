import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import VisuallyHidden from './VisuallyHidden'
import {abbreviateDuration, formatDuration} from '../domain/Project'
import Timer from './Timer'
import {isBlank} from './Utils'

const ONE_MINUTE = 60

class Duration extends Component {
  constructor(props) {
    super(props)
    this.state = {duration: formatDuration(this.props.timestamp)}
  }

  updateDuration = () => {
    this.setState({duration: formatDuration(this.props.timestamp)})
  }

  formatFullDescription = () => {
    return [this.props.fullDescriptionPrefix, this.state.duration, this.props.fullDescriptionSuffix]
      .filter((text) => !isBlank(text))
      .join(' ')
  }

  render() {
    const labelShort = abbreviateDuration(this.state.duration)

    return (
      <Fragment>
        <Timer onTrigger={this.updateDuration} interval={ONE_MINUTE}/>
        {
          this.props.abbreviate && (
            <Fragment>
              <VisuallyHidden>{this.formatFullDescription()}</VisuallyHidden>
              <span data-locator='duration' aria-hidden>{labelShort}</span>
            </Fragment>
          )
        }
        {
          !this.props.abbreviate && (
            <span data-locator='duration'>{this.formatFullDescription()}</span>
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
