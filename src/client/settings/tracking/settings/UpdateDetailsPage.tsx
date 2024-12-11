import type { ReactElement } from 'react'
import { useState } from 'react'
import { Page } from '../../../common/Page'
import { InputButton } from '../../../common/forms/Button'
import { Input } from '../../../common/forms/Input'
import { DropDown } from '../../../common/forms/DropDown'
import { Dice } from '../../../common/icons/Dice'
import { feedUpdated } from '../TrackingActionCreators'
import { FeedLogo } from '../FeedLogo'
import { useFeedContext } from '../FeedPage'
import { useAppDispatch } from '../../../configuration/Hooks'
import { ServerTypes } from '../FeedsReducer'
import { generateRandomName } from '../../../common/Words'
import { Form } from '../../../common/forms/Form'
import { RoutePaths } from '../../../AppRoutes'
import styles from './update-details-page.scss'

const serverTypeOptions = [
  { value: ServerTypes.generic, display: 'Generic' },
  { value: ServerTypes.circle, display: 'CircleCI' },
  { value: ServerTypes.go, display: 'GoCD' },
]

export function UpdateDetailsPage(): ReactElement {
  const feed = useFeedContext()
  const dispatch = useAppDispatch()
  const [name, setName] = useState(feed.name)
  const [serverType, setServerType] = useState(feed.serverType)

  const onSuccess = () => {
    dispatch(feedUpdated({ trayId: feed.trayId, feed: { name, serverType } }))
    return { navigateTo: RoutePaths.tracking }
  }

  return (
    <Page title="Update details" icon={<FeedLogo feed={feed} />}>
      <Form onSuccess={onSuccess} onCancel={RoutePaths.tracking}>
        {() => {
          return (
            <>
              <Input
                classNameContainer={styles.feedSettingsName}
                value={name}
                onChange={({ target }) => {
                  setName(target.value)
                }}
                placeholder="e.g. project or team name"
                button={
                  <InputButton
                    icon={<Dice />}
                    onClick={() => {
                      setName(generateRandomName())
                    }}
                  >
                    randomise name
                  </InputButton>
                }
              >
                Name
              </Input>
              <DropDown
                className={styles.serverType}
                options={serverTypeOptions}
                value={serverType}
                onChange={({ target }) => {
                  setServerType(target.value as ServerTypes)
                }}
              >
                Server type
              </DropDown>
            </>
          )
        }}
      </Form>
    </Page>
  )
}

export const Component = UpdateDetailsPage
