import React, {Component} from 'react'
import _ from 'lodash'
import {InputButton} from './Button'
import {iEye, iEyeBlocked} from '../fonts/Icons'
import {Input} from './Input'

export class Password extends Component {

  constructor(props) {
    super(props)
    this.state = {
      passwordHidden: true
    }
  }

  togglePasswordVisibility = () => {
    this.setState(({passwordHidden}) => {
      return {passwordHidden: !passwordHidden}
    })
  }

  render() {
    const {passwordHidden} = this.state

    const id = _.uniqueId()
    const type = passwordHidden ? 'password' : 'text'

    const showPassword = (
      <InputButton aria-controls={id}
                   icon={iEye}
                   onClick={this.togglePasswordVisibility}>
        show password
      </InputButton>
    )

    const hidePassword = (
      <InputButton aria-controls={id}
                   icon={iEyeBlocked}
                   onClick={this.togglePasswordVisibility}>
        hide password
      </InputButton>
    )

    return (
      <Input id={id}
             type={type}
             button={passwordHidden ? showPassword : hidePassword}
             autoComplete='new-password'
             {...this.props}/>
    )
  }
}
