import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import {WithHelp} from '../common/ContextualHelp'
import {TrackingHelp} from './TrackingHelp'
import styles from './add-tray.scss'
import {PrimaryButton} from '../common/forms/Button'
import {iPlus} from '../common/fonts/Icons'
import {Password} from '../common/forms/Password'

export function AddTray({addTray}) {
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const addTrayAndClearInput = () => {
    addTray(url, username, password)
    setUrl('')
    setUsername('')
    setPassword('')
  }

  return (
    <div className={styles.addTray}>
      <div className={styles.inputs}>
        <Input className={styles.url}
               placeholder='CCTray XML feed'
               value={url}
               onChange={({target}) => setUrl(target.value)}
               onEnter={addTrayAndClearInput}
               data-locator='add-tray-url'
               autoComplete='url'>
          <span className={styles.label}>URL</span>
        </Input>
        <Input className={styles.username}
               value={username}
               onChange={({target}) => setUsername(target.value)}
               onEnter={addTrayAndClearInput}
               data-locator='add-tray-username'
               autoComplete='username'>
          <span className={styles.label}>username</span>
        </Input>
        <Password className={styles.password}
                  value={password}
                  onChange={({target}) => setPassword(target.value)}
                  onEnter={addTrayAndClearInput}
                  data-locator='add-tray-password'>
          <span className={styles.label}>password</span>
        </Password>
      </div>
      <WithHelp title='Tracking'
                help={<TrackingHelp addTray={addTray}/>}
                className={styles.help}>
        <PrimaryButton className={styles.add}
                       onClick={addTrayAndClearInput}
                       data-locator='add-tray'
                       icon={iPlus}>
          <span aria-label='add tray'>add</span>
        </PrimaryButton>
      </WithHelp>
    </div>
  )
}

AddTray.propTypes = {
  addTray: PropTypes.func.isRequired
}
