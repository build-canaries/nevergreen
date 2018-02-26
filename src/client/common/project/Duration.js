import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import styles from './duration.scss'
import VisuallyHidden from '../VisuallyHidden'
import {abbreviateDuration, formatDuration} from '../../domain/Project'

class Duration extends Component {
  render() {
    const labelFull = formatDuration(this.props.timestamp)
    const labelShort = abbreviateDuration(labelFull)

    return (
      <Fragment>
        <VisuallyHidden>{this.props.fullDescriptionPrefix} {labelFull}.</VisuallyHidden>
        <div className={styles.duration} data-locator='duration' aria-hidden> {labelShort}</div>
      </Fragment>
    )
  }
}

Duration.propTypes = {
  timestamp: PropTypes.string,
  fullDescriptionPrefix: PropTypes.string.isRequired
}

export default Duration
