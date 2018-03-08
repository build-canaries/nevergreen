import {Component} from 'react'
import PropTypes from 'prop-types'
import ClipboardJS from 'clipboard'

function createClipboard(elementSelector, onSuccess, onError) {
  const clipboard = new ClipboardJS(elementSelector)

  clipboard.on('error', (evt) => onError(evt))

  clipboard.on('success', (evt) => {
    onSuccess(evt)
    evt.clearSelection()
  })

  return clipboard
}

class ClipboardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {clipboard: null}
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.clipboard) {
      this.state.clipboard.destroy()
    }
    this.setState({
      clipboard: createClipboard(nextProps.elementSelector, nextProps.onSuccess, nextProps.onError)
    })
  }

  componentDidMount() {
    this.setState({
      clipboard: createClipboard(this.props.elementSelector, this.props.onSuccess, this.props.onError)
    })
  }

  componentWillUnmount() {
    if (this.state.clipboard) {
      this.state.clipboard.destroy()
    }
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

export default ClipboardComponent
