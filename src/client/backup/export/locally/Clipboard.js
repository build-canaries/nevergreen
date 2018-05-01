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
  static getDerivedStateFromProps(nextProps) {
    return {
      clipboard: createClipboard(nextProps.elementSelector, nextProps.onSuccess, nextProps.onError)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      clipboard: null
    }
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.clipboard) {
      prevState.clipboard.destroy()
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
