import React, {ReactElement, useState} from 'react'
import {Page} from '../../../common/Page'
import {authTypeDisplay, CI_OPTIONS, generateRandomName} from '../../../domain/Feed'
import {useDispatch} from 'react-redux'
import {InputButton} from '../../../common/forms/Button'
import {Input} from '../../../common/forms/Input'
import styles from './update-details-page.scss'
import {DropDown} from '../../../common/forms/DropDown'
import {Checkbox} from '../../../common/forms/Checkbox'
import {Dice} from '../../../common/icons/Dice'
import {Summary} from '../../../common/Summary'
import {BackButton, LinkButton, ManageFeedProjectsButton} from '../../../common/LinkButton'
import {feedUpdated} from '../TrackingActionCreators'
import {FeedLogo} from '../FeedLogo'
import {Cog} from '../../../common/icons/Cog'
import {useFeedContext} from '../FeedPage'

export function UpdateDetailsPage(): ReactElement {
  const feed = useFeedContext()
  const dispatch = useDispatch()
  const [name, setName] = useState(feed.name)

  const connectionDetails = [
    {label: 'URL', value: feed.url},
    {label: 'Authentication', value: authTypeDisplay(feed.authType)}
  ]

  const randomNameButton = (
    <InputButton icon={<Dice/>}
                 onClick={() => setName(generateRandomName())}
                 onBlur={() => dispatch(feedUpdated(feed.trayId, {name}))}>
      randomise name
    </InputButton>
  )

  return (
    <Page title='Update details' icon={<FeedLogo feed={feed}/>}>
      <section className={styles.auth}>
        <Summary values={connectionDetails}/>
        <LinkButton className={styles.link}
                    to='connection'
                    icon={<Cog/>}>
          Update connection
        </LinkButton>
        <ManageFeedProjectsButton feedId={feed.trayId} title={feed.name}/>
      </section>
      <Input className={styles.feedSettingsName}
             value={name}
             onChange={({target}) => setName(target.value)}
             onBlur={() => dispatch(feedUpdated(feed.trayId, {name}))}
             placeholder='e.g. project or team name'
             button={randomNameButton}>
        Name
      </Input>
      <DropDown className={styles.serverType}
                options={CI_OPTIONS}
                value={feed.serverType}
                onChange={({target}) => dispatch(feedUpdated(feed.trayId, {serverType: target.value}))}>
        Server type
      </DropDown>
      <Checkbox checked={feed.includeNew}
                onToggle={(includeNew) => dispatch(feedUpdated(feed.trayId, {includeNew}))}
                className={styles.includeNew}>
        Automatically include new projects
      </Checkbox>
      <BackButton className={styles.link}>
        Back to tracking
      </BackButton>
    </Page>
  )
}
