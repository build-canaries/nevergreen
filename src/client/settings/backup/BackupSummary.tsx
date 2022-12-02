import React, {ReactElement} from 'react'
import {isBlank} from '../../common/Utils'
import {isCustomServer, isGitHub, isGitHubEnterprise, isGitLab} from './RemoteLocationOptions'
import {RemoteLocation as RemoteLocationType, RemoteLocation} from './RemoteLocationsReducer'
import {Duration} from '../../common/Duration'
import {URL} from '../../common/URL'
import {Summary, SummaryProps} from '../../common/Summary'

export function where(location: RemoteLocationType): string {
  if (isCustomServer(location)) {
    return 'Custom server'
  }
  if (isGitHubEnterprise(location)) {
    return 'GitHub Enterprise gist'
  }
  if (isGitHub(location)) {
    return 'GitHub gist'
  }
  if (isGitLab(location)) {
    return 'GitLab snippet'
  }
  return ''
}

function timestamp(time?: string): ReactElement | string {
  return isBlank(time) ? 'Never' : <Duration suffix='ago' timestamp={time}/>
}

function locationId(location: RemoteLocationType): ReactElement | string | null {
  if (isGitHub(location) || isGitLab(location)) {
    return location.externalId ? <code>{location.externalId}</code> : 'Not set'
  } else {
    return null
  }
}

function description(location: RemoteLocationType): ReactElement | string | null {
  if (isGitHub(location) || isGitLab(location)) {
    return location.description ? location.description : 'Not set'
  } else {
    return null
  }
}

function url(location: RemoteLocationType): ReactElement | null {
  if (isCustomServer(location)) {
    return <URL url={location.url}/>
  }
  return null
}

interface BackupSummaryProps extends Omit<SummaryProps, 'values'> {
  readonly location: RemoteLocation;
}

export function FullBackupSummary({location}: BackupSummaryProps): ReactElement {
  return <Summary values={[
    {label: 'Where', value: where(location)},
    {label: 'URL', value: <URL url={location.url}/>},
    {label: 'ID', value: locationId(location)},
    {label: 'Description', value: description(location)},
    {label: 'Last export', value: timestamp(location.exportTimestamp)},
    {label: 'Last import', value: timestamp(location.importTimestamp)}
  ]}/>
}

export function BackupSummary({location}: BackupSummaryProps): ReactElement {
  return <Summary values={[
    {label: 'Where', value: where(location)},
    {label: 'URL', value: url(location)},
    {label: 'Description', value: description(location)}
  ]}/>
}
