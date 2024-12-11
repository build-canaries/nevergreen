import { type ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { Checkbox } from '../../common/forms/Checkbox'
import { Page } from '../../common/Page'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import { Prognosis, prognosisDisplay } from '../../domain/Project'
import { IconPrognosis } from '../../common/icons/prognosis/IconPrognosis'
import {
  getAllowAudioNotifications,
  getAllowSystemNotifications,
  getAudioNotificationVolume,
} from '../PersonalSettingsReducer'
import { deleteAudio, playAudio, stopAudio } from '../../common/AudioPlayer'
import { errorMessage, isBlank, isNotBlank } from '../../common/Utils'
import { InputButton } from '../../common/forms/Button'
import { Play } from '../../common/icons/Play'
import { Stop } from '../../common/icons/Stop'
import { RoutePaths } from '../../AppRoutes'
import { WarningMessages } from '../../common/Messages'
import { Form } from '../../common/forms/Form'
import { Input } from '../../common/forms/Input'
import { useAPCA } from '../colours/ContrastHook'
import { ChangeColoursSection } from '../colours/ChangeColoursSection'
import { getPrognosisSettings, setPrognosis } from './PrognosisSettingsReducer'

interface PrognosisSettingsPageProps {
  readonly prognosis: Prognosis
}

export const SYSTEM_NOT_ALLOWED_WARNING =
  'System notification have not been allowed yet, they will need to be allowed before they will show.'
export const AUDIO_NOT_ALLOWED_WARNING =
  'Audio notification have not been allowed yet, they will need to be allowed before they will play.'
export const LOW_CONTRAST_WARNING =
  'The chosen colours have a low contrast. You should consider picking different colours to improve readability.'

function getWarnings(
  systemNotification: boolean,
  allowSystemNotifications: boolean,
  sfx: string,
  allowAudioNotifications: boolean,
  isLowContrast: boolean,
): ReadonlyArray<string> {
  const warnings: Array<string> = []
  if (isLowContrast) {
    warnings.push(LOW_CONTRAST_WARNING)
  }
  if (!allowSystemNotifications && systemNotification) {
    warnings.push(SYSTEM_NOT_ALLOWED_WARNING)
  }
  if (!allowAudioNotifications && isNotBlank(sfx)) {
    warnings.push(AUDIO_NOT_ALLOWED_WARNING)
  }
  return warnings
}

export function PrognosisEditPage({
  prognosis,
}: PrognosisSettingsPageProps): ReactElement {
  const dispatch = useAppDispatch()
  const allowSystemNotifications =
    useAppSelector(getAllowSystemNotifications) ?? false
  const allowAudioNotifications =
    useAppSelector(getAllowAudioNotifications) ?? false
  const audioNotificationVolume = useAppSelector(getAudioNotificationVolume)
  const settings = useAppSelector(getPrognosisSettings(prognosis))

  const [displayOnMonitor, setDisplayOnMonitor] = useState(settings.show)
  const [system, setSystem] = useState(settings.systemNotification)
  const [sfx, setSfx] = useState(settings.sfx)
  const [text, setText] = useState(settings.textColour)
  const [background, setBackground] = useState(settings.backgroundColour)

  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState('')

  const { lightnessContrast, isLowContrast } = useAPCA(text, background)

  const updateSoundFx = ({ target }: ChangeEvent<HTMLInputElement>) => {
    deleteAudio(sfx)
    setSfx(target.value)
    setAudioError('')
  }

  const play = async () => {
    setAudioError('')
    setPlaying(true)

    try {
      await playAudio(sfx, audioNotificationVolume, () => {
        setPlaying(false)
      })
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
    <InputButton
      icon={<Play />}
      onClick={() => void play()}
      disabled={isBlank(sfx)}
    >
      Play
    </InputButton>
  )
  const stopButton = (
    <InputButton
      icon={<Stop />}
      onClick={() => {
        stopAudio(sfx)
      }}
      disabled={isBlank(sfx)}
    >
      Stop
    </InputButton>
  )

  const warnings = getWarnings(
    system,
    allowSystemNotifications,
    sfx,
    allowAudioNotifications,
    isLowContrast,
  )

  const processForm = () => {
    dispatch(
      setPrognosis({
        prognosis,
        systemNotification: system,
        sfx,
        show: displayOnMonitor,
        textColour: text,
        backgroundColour: background,
      }),
    )
    return { navigateTo: RoutePaths.prognosis }
  }

  return (
    <Page
      title={`${prognosisDisplay(prognosis, true)} settings`}
      icon={<IconPrognosis prognosis={prognosis} />}
    >
      <Form onSuccess={processForm} onCancel={RoutePaths.prognosis}>
        {(submitting) => {
          return (
            <>
              <Checkbox
                checked={displayOnMonitor}
                onToggle={(show) => {
                  setDisplayOnMonitor(show)
                }}
              >
                Show on Monitor page
              </Checkbox>
              {displayOnMonitor && (
                <>
                  <Checkbox
                    checked={system}
                    onToggle={(newValue) => {
                      setSystem(newValue)
                    }}
                    disabled={submitting}
                  >
                    Show system notification
                  </Checkbox>
                  <Input
                    placeholder="audio file URL"
                    onChange={updateSoundFx}
                    value={sfx}
                    disabled={playing || submitting}
                    error={audioError}
                    button={playing ? stopButton : playButton}
                  >
                    Play audio notification
                  </Input>
                  <ChangeColoursSection
                    text={text}
                    setText={setText}
                    background={background}
                    setBackground={setBackground}
                    lightnessContrast={lightnessContrast}
                  />
                  <WarningMessages messages={warnings} />
                </>
              )}
            </>
          )
        }}
      </Form>
    </Page>
  )
}

export const Component = PrognosisEditPage
