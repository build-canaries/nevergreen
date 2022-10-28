import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react'
import {errorMessage, isBlank} from '../../common/Utils'
import {Input} from '../../common/forms/Input'
import {Checkbox} from '../../common/forms/Checkbox'
import {InputButton} from '../../common/forms/Button'
import {useDispatch, useSelector} from 'react-redux'
import {Stop} from '../../common/icons/Stop'
import {Play} from '../../common/icons/Play'
import {Page} from '../../common/Page'
import {Form} from '../../common/forms/Form'
import {DropDown} from '../../common/forms/DropDown'
import {Prognosis} from '../../domain/Project'
import {addNotification} from './NotificationsActionCreators'
import {ROUTE_NOTIFICATIONS} from '../../AppRoutes'
import {deleteAudio, playAudio, stopAudio} from '../../common/AudioPlayer'
import {WarningMessages} from '../../common/Messages'
import {getAllowAudioNotifications, getAllowSystemNotifications} from './NotificationsReducer'
import {NotificationIcon} from './icons/NotificationIcon'

const PROGNOSIS_OPTIONS = [
  {value: Prognosis.error, display: 'Error'},
  {value: Prognosis.sick, display: 'Sick'},
  {value: Prognosis.sickBuilding, display: 'Sick building'},
  {value: Prognosis.healthyBuilding, display: 'Healthy building'},
  {value: Prognosis.unknown, display: 'Unknown'},
  {value: Prognosis.healthy, display: 'Healthy'},
]

function getWarnings(allowSystemNotifications: boolean, allowAudioNotifications: boolean): ReadonlyArray<string> {
  if (!allowSystemNotifications && !allowAudioNotifications) {
    return [
      'System and audio notifications have not been allowed yet.',
      'They will need to be allowed before they will show or play.'
    ]
  }
  if (!allowSystemNotifications) {
    return [
      'System notification have not been allowed yet.',
      'They will need to be allowed before they will show.'
    ]
  }
  if (!allowAudioNotifications) {
    return [
      'Audio notification have not been allowed yet.',
      'They will need to be allowed before they will play.'
    ]
  }
  return []
}

export function AddNotification(): ReactElement {
  const dispatch = useDispatch()
  const allowSystemNotifications = useSelector(getAllowSystemNotifications)
  const allowAudioNotifications = useSelector(getAllowAudioNotifications)

  const [prognosis, setPrognosis] = useState(Prognosis.sick)
  const [systemNotification, setSystemNotification] = useState(false)
  const [sfx, setSfx] = useState('')

  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState('')

  const updateSoundFx = ({target}: ChangeEvent<HTMLInputElement>) => {
    deleteAudio(sfx)
    setSfx(target.value)
    setAudioError('')
  }

  const play = async () => {
    setAudioError('')
    setPlaying(true)

    try {
      await playAudio(sfx, () => setPlaying(false))
    } catch (e) {
      setPlaying(false)
      setAudioError(errorMessage(e))
    }
  }

  useEffect(() => {
    return () => {
      stopAudio(sfx)
    }
  }, [sfx])

  const playButton = (
    <InputButton icon={<Play/>}
                 onClick={() => void play()}
                 disabled={isBlank(sfx)}>
      Play
    </InputButton>
  )
  const stopButton = (
    <InputButton icon={<Stop/>}
                 onClick={() => stopAudio(sfx)}
                 disabled={isBlank(sfx)}>
      Stop
    </InputButton>
  )

  const warnings = getWarnings(allowSystemNotifications, allowAudioNotifications)

  const processForm = () => {
    dispatch(addNotification(prognosis, systemNotification, sfx))
    return {navigateTo: ROUTE_NOTIFICATIONS}
  }

  return (
    <Page title="Add notification" icon={<NotificationIcon prognosis={prognosis}/>}>
      <WarningMessages messages={warnings}/>

      <Form onSuccess={processForm}
            onCancel={ROUTE_NOTIFICATIONS}
            submitButtonText="Add notification">
        {(submitting) => {
          return (
            <>
              <DropDown options={PROGNOSIS_OPTIONS}
                        value={prognosis}
                        disabled={submitting}
                        onChange={({target}) => setPrognosis(target.value as Prognosis)}>
                When transitioning to
              </DropDown>

              <Checkbox checked={systemNotification}
                        onToggle={(newValue) => setSystemNotification(newValue)}
                        disabled={submitting}>
                Show system notification
              </Checkbox>


              <Input placeholder="audio file URL"
                     onChange={updateSoundFx}
                     value={sfx}
                     disabled={playing || submitting}
                     error={audioError}
                     button={playing ? stopButton : playButton}>
                Play audio
              </Input>
            </>
          )
        }}
      </Form>
    </Page>
  )
}
