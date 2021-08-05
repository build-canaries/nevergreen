import React, {ReactElement} from 'react'
import {isBlank} from '../../common/Utils'
import {DEFAULT_GITHUB_URL, DEFAULT_GITLAB_URL, isCustomServer, isGitHub, isGitLab} from './RemoteLocationOptions'
import {RemoteLocation as RemoteLocationType, RemoteLocation} from './RemoteLocationsReducer'
import {Duration} from '../../common/Duration'
import {URL} from '../../common/URL'
import {SummaryValues} from '../../common/Summary'

export function where(location: RemoteLocationType): string {
  const customUrl = !(location?.url === DEFAULT_GITHUB_URL || location?.url === DEFAULT_GITLAB_URL)
  if (isCustomServer(location)) {
    return 'Custom server'
  }
  if (isGitHub(location) && customUrl) {
    return 'GitHub Enterprise gist'
  }
  if (isGitHub(location) && !customUrl) {
    return 'GitHub gist'
  }
  if (isGitLab(location)) {
    return 'GitLab snippet'
  }
  return ''
}

function timestamp(time: string): ReactElement | string {
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

export function backupSummary(location: RemoteLocation): SummaryValues[] {
  return [
    {label: 'Where', value: where(location)},
    {label: 'URL', value: <URL url={location.url}/>},
    {label: 'ID', value: locationId(location)},
    {label: 'Description', value: description(location)},
    {label: 'Last export', value: timestamp(location.exportTimestamp)},
    {label: 'Last import', value: timestamp(location.importTimestamp)}
  ].filter((value) => value.value !== null)
}
