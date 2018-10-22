import {Component} from 'react'
import PropTypes from 'prop-types'
import ClipboardJS from 'clipboard'
import memoize from 'memoize-one'
import _ from 'lodash'

function createClipboard(elementSelector, onSuccess, onError) {
  const clipboard = new ClipboardJS(elementSelector)

  clipboard.on('error', (evt) => onError(evt))

  clipboard.on('success', (evt) => {
    onSuccess(evt)
    evt.clearSelection()
  })

  return clipboard
}

export class ClipboardComponent extends Component {
  clipboard = memoize(
    ({elementSelector, onSuccess, onError}) => createClipboard(elementSelector, onSuccess, onError)
  )

  componentDidMount() {
    this.clipboard(this.props)
  }

  componentWillUnmount() {
    _.invoke(this.clipboard(this.props), 'destroy')
  }

  componentDidUpdate(prevProps) {
    _.invoke(this.clipboard(prevProps), 'destroy')
    this.clipboard(this.props)
  }

  render() {
    return null
  }
}

ClipboardComponent.propTypes = {
  elementSelector: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}
