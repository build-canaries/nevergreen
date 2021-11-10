import React, {ReactElement, useState} from 'react'
import {Page} from '../../common/Page'
import {authTypeDisplay, CI_OPTIONS, generateRandomName, Tray} from '../../domain/Tray'
import {useDispatch} from 'react-redux'
import {ROUTE_SETTINGS_TRACKING, routeFeedConnection} from '../../Routes'
import {InputButton} from '../../common/forms/Button'
import {Input} from '../../common/forms/Input'
import styles from './update-details-page.scss'
import {DropDown} from '../../common/forms/DropDown'
import {Checkbox} from '../../common/forms/Checkbox'
import {Dice} from '../../common/icons/Dice'
import {Summary} from '../../common/Summary'
import {LinkButton} from '../../common/LinkButton'
import {trayUpdated} from '../TrackingActionCreators'
import {Link} from 'react-router-dom'
import {FeedLogo} from '../FeedLogo'
import {Cog} from '../../common/icons/Cog'

interface UpdateDetailsPageProps {
  readonly feed: Tray;
}

export function UpdateDetailsPage({feed}: UpdateDetailsPageProps): ReactElement {
  const dispatch = useDispatch()
  const [name, setName] = useState(feed.name)

  const connectionDetails = [
    {label: 'URL', value: feed.url},
    {label: 'Authentication', value: authTypeDisplay(feed.authType)}
  ]

  const randomNameButton = (
    <InputButton icon={<Dice/>}
                 onClick={() => setName(generateRandomName())}
                 onBlur={() => dispatch(trayUpdated(feed.trayId, {name}))}>
      randomise name
    </InputButton>
  )

  return (
    <Page title='Update details' icon={<FeedLogo feed={feed}/>}>
      <section className={styles.auth}>
        <Summary values={connectionDetails}/>
        <LinkButton className={styles.changeAuth}
                    to={routeFeedConnection(feed.trayId)}
                    icon={<Cog/>}>
          Update connection
        </LinkButton>
      </section>
      <Input className={styles.traySettingsName}
             value={name}
             onChange={({target}) => setName(target.value)}
             onBlur={() => dispatch(trayUpdated(feed.trayId, {name}))}
             placeholder='e.g. project or team name'
             button={randomNameButton}>
        Name
      </Input>
      <DropDown className={styles.serverType}
                options={CI_OPTIONS}
                value={feed.serverType}
                onChange={({target}) => dispatch(trayUpdated(feed.trayId, {serverType: target.value}))}>
        Server type
      </DropDown>
      <Checkbox checked={feed.includeNew}
                onToggle={(includeNew) => dispatch(trayUpdated(feed.trayId, {includeNew}))}
                className={styles.includeNew}>
        Automatically include new projects
      </Checkbox>
      <Link to={ROUTE_SETTINGS_TRACKING} className={styles.link}>Back to tracking</Link>
    </Page>
  )
}
