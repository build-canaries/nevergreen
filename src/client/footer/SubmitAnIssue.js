import React from 'react'
import PropTypes from 'prop-types'
import {ExternalLink} from '../common/ExternalLink'
import {CI_OPTIONS} from '../domain/Tray'
import {isBlank} from '../common/Utils'

function display(serverType) {
  const ciOption = CI_OPTIONS.find((option) => option.value === serverType)
  return ciOption && ciOption.display
}

function knownServerTypes(trays) {
  const servers = trays
    .map((tray) => tray.serverType)
    .filter((serverType) => serverType !== '')
    .map((serverType) => display(serverType))
    .join(', ')

  return isBlank(servers)
    ? '<!-- e.g. Jenkins or GoCD etc -->'
    : servers
}

function bugReport(version, trays) {
  return encodeURIComponent(`## Bug report

**How are you running?**
<!-- e.g. downloaded jar or compiled from source or docker or nevergreen.io -->

**Nevergreen version?**
${version}

**What are you running on?**
${navigator.userAgent}

**Which CI server(s) are you monitoring?**
${knownServerTypes(trays)}

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

export function SubmitAnIssue({version, className, trays}) {
  return (
    <ExternalLink href={`${ISSUE_URL}?body=${bugReport(version, trays)}`}
                  className={className}
                  title='Submit an issue on GitHub'>
      Submit an issue
    </ExternalLink>
  )
}

SubmitAnIssue.propTypes = {
  version: PropTypes.string,
  className: PropTypes.string,
  trays: PropTypes.arrayOf(PropTypes.shape({
    serverType: PropTypes.string
  })).isRequired
}
