import React, {Component, PropTypes} from 'react'
import PrimaryInput from '../common/PrimaryInput'
import './add-tray.scss'

class AddTray extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const addTray = () => {
      this.props.addTray(this.refs.url.value, this.refs.username.value, this.refs.password.value)
      this.refs.url.value = ''
      this.refs.username.value = ''
      this.refs.password.value = ''
    }
    const keyAddTray = (evt) => {
      if (evt.key === 'Enter') {
        addTray()
      }
    }

    return (
      <div className='add-tray'>
        <span className='url-input'>
          <label htmlFor='cctray-url'>url</label>
          <PrimaryInput>
            <input id='cctray-url'
                   ref='url'
                   className='tracking-tray-url'
                   type='text'
                   placeholder='e.g. http(s)://host:port/cc.xml'
                   onKeyPress={keyAddTray}/>
          </PrimaryInput>
        </span>
        <button id='cctray-fetch' className='button-primary' onClick={addTray}>add</button>
        <div>
            <span className='text-input'>
              <label htmlFor='username'>username</label>
              <input id='username'
                     ref='username'
                     type='text'
                     onKeyPress={keyAddTray}/>
            </span>
            <span className='text-input'>
              <label htmlFor='password' className='text-label'>password</label>
              <input id='password'
                     ref='password'
                     className='text-input'
                     type='password'
                     onKeyPress={keyAddTray}/>
            </span>
        </div>
      </div>
    )
  }
}

AddTray.propTypes = {
  addTray: PropTypes.func.isRequired
}

export default AddTray
