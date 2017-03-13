import React, {Component, PropTypes} from 'react'
import Input from '../../common/forms/Input'
import './change-password.scss'

class UpdatePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {newPassword: ''}
  }

  render() {
    const passwordChanged = (evt) => this.setState({newPassword: evt.target.value})
    const setPassword = () => {
      this.props.setPassword(this.state.newPassword)
      this.props.back()
    }
    const remove = () => this.setState({newPassword: ''}, () => setPassword())

    return (
      <section className='change-password'>
        <Input className='tray-settings-password' value={this.state.newPassword} onChange={passwordChanged} onEnter={setPassword}
               data-locator='password' autoFocus>
          <span>new password</span>
        </Input>
        <button className='cancel' onClick={this.props.back}>cancel</button>
        <button className='remove' onClick={remove}>remove</button>
        <button className='update' onClick={setPassword}>update</button>
      </section>
    )
  }
}

UpdatePassword.propTypes = {
  back: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default UpdatePassword
