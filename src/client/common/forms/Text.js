import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import './text.scss'

class Text extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.isPrimary) {
      this.primaryInput.focus()
    }
  }

  render() {
    const inputProps = _.omit(this.props, ['label', 'onEnter', 'isPrimary'])
    const onEnter = (evt) => {
      if (evt.key === 'Enter' && this.props.onEnter) {
        this.props.onEnter()
      }
    }

    return (
      <label className='text-input'>
        <span>{this.props.label}</span>
        <input type='text' onKeyPress={onEnter} ref={(node) => this.primaryInput = node} {...inputProps}/>
      </label>
    )
  }
}

Text.propTypes = {
  label: PropTypes.string.isRequired,
  onEnter: PropTypes.func,
  isPrimary: PropTypes.bool
}

export default Text
