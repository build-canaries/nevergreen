import type { ReactElement } from 'react'
import { ExternalLink } from '../common/ExternalLink'

interface SubmitAnIssueProps {
  readonly version: string
  readonly className?: string
}

function bugReport(version: string) {
  return encodeURIComponent(`## Bug report

**How are you running?**
<!-- e.g. downloaded jar or compiled from source or docker or nevergreen.io -->

**Nevergreen version?**
${version}

**What are you running on?**
${navigator.userAgent}

**Which CI server(s) are you monitoring?**
<!-- e.g. Jenkins or GoCD etc -->

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

export function SubmitAnIssue({
  version,
  className,
}: SubmitAnIssueProps): ReactElement {
  return (
    <ExternalLink
      href={`${ISSUE_URL}?labels=bug&body=${bugReport(version)}`}
      className={className}
      title="Submit an issue on GitHub"
    >
      Submit an issue
    </ExternalLink>
  )
}
