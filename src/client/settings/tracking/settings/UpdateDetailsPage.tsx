import React, {ReactElement, useState} from 'react'
import {Page} from '../../../common/Page'
import {authTypeDisplay, CI_OPTIONS, generateRandomName} from '../../../domain/Feed'
import {InputButton} from '../../../common/forms/Button'
import {Input} from '../../../common/forms/Input'
import styles from './update-details-page.scss'
import {DropDown} from '../../../common/forms/DropDown'
import {Dice} from '../../../common/icons/Dice'
import {Summary} from '../../../common/Summary'
import {LinkButton, ManageFeedProjectsButton} from '../../../common/LinkButton'
import {feedUpdated} from '../TrackingActionCreators'
import {FeedLogo} from '../FeedLogo'
import {Cog} from '../../../common/icons/Cog'
import {useFeedContext} from '../FeedPage'
import {URL} from '../../../common/URL'
import {useAppDispatch} from '../../../configuration/Hooks'

export function UpdateDetailsPage(): ReactElement {
  const feed = useFeedContext()
  const dispatch = useAppDispatch()
  const [name, setName] = useState(feed.name)

  const connectionDetails = [
    {label: 'URL', value: <URL url={feed.url}/>},
    {label: 'Authentication', value: authTypeDisplay(feed.authType)}
  ]

  const randomNameButton = (
    <InputButton icon={<Dice/>}
                 onClick={() => setName(generateRandomName())}
                 onBlur={() => dispatch(feedUpdated({trayId: feed.trayId, feed: {name}}))}>
      randomise name
    </InputButton>
  )

  return (
    <Page title="Update details" icon={<FeedLogo feed={feed}/>}>
      <section className={styles.section}>
        <Summary values={connectionDetails}/>
        <LinkButton className={styles.link}
                    to="connection"
                    icon={<Cog/>}>
          Update connection
        </LinkButton>
      </section>
      <section className={styles.section}>
        <Input className={styles.feedSettingsName}
               value={name}
               onChange={({target}) => setName(target.value)}
               onBlur={() => dispatch(feedUpdated({trayId: feed.trayId, feed: {name}}))}
               placeholder="e.g. project or team name"
               button={randomNameButton}>
          Name
        </Input>
        <DropDown className={styles.serverType}
                  options={CI_OPTIONS}
                  value={feed.serverType}
                  onChange={({target}) => dispatch(feedUpdated({
                    trayId: feed.trayId,
                    feed: {serverType: target.value}
                  }))}>
          Server type
        </DropDown>
      </section>
      <section className={styles.section}>
        <ManageFeedProjectsButton feedId={feed.trayId} title={feed.name}/>
      </section>
    </Page>
  )
}
