import React, {ReactElement} from 'react'
import {ExternalLink} from '../common/ExternalLink'
import {CI_OPTIONS, Feed} from '../domain/Feed'
import {isBlank} from '../common/Utils'
import {useSelector} from 'react-redux'
import {getFeeds} from '../settings/tracking/FeedsReducer'

interface SubmitAnIssueProps {
  readonly version: string;
  readonly className?: string;
}

function display(serverType: string) {
  const ciOption = CI_OPTIONS.find((option) => option.value === serverType)
  return ciOption && ciOption.display
}

function knownServerTypes(feeds: ReadonlyArray<Feed>) {
  const servers = feeds
    .map((feed) => feed.serverType)
    .filter((serverType) => serverType !== '')
    .map((serverType) => display(serverType))
    .join(', ')

  return isBlank(servers)
    ? '<!-- e.g. Jenkins or GoCD etc -->'
    : servers
}

function bugReport(version: string, feeds: ReadonlyArray<Feed>) {
  return encodeURIComponent(`## Bug report

**How are you running?**
<!-- e.g. downloaded jar or compiled from source or docker or nevergreen.io -->

**Nevergreen version?**
${version}

**What are you running on?**
${navigator.userAgent}

**Which CI server(s) are you monitoring?**
${knownServerTypes(feeds)}

**Expected behaviour?**
<!-- Tell us what you expected to happen -->

**Actual behaviour?**
<!-- Tell us what actually happened -->

**Steps to reproduce?**
1.
2.
3.
`)
}

const ISSUE_URL = 'https://github.com/build-canaries/nevergreen/issues/new'

export function SubmitAnIssue({version, className}: SubmitAnIssueProps): ReactElement {
  const feeds = useSelector(getFeeds)

  return (
    <ExternalLink href={`${ISSUE_URL}?labels=bug&body=${bugReport(version, feeds)}`}
                  className={className}
                  title='Submit an issue on GitHub'>
      Submit an issue
    </ExternalLink>
  )
}
