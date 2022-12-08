import React, { ReactElement } from 'react'
import { ExternalLink } from '../common/ExternalLink'
import { SubmitAnIssue } from './SubmitAnIssue'
import styles from './about-page.scss'
import { Twitter } from '../common/icons/Twitter'
import { GitHubLogo } from '../common/icons/GitHubLogo'
import { Page } from '../common/Page'
import version from '../../../resources/version.txt'
import versionMeta from '../../../resources/version_meta.txt'
import versionName from '../../../resources/version_name.txt'

export function AboutPage(): ReactElement {
  const fullVersion = `${version}+${versionMeta}`
  const versionWithName = `v${fullVersion} ${versionName}`

  return (
    <Page title="About">
      <p>Nevergreen {versionWithName} by Build Canaries.</p>
      <p>
        <Twitter />
        <ExternalLink href="https://twitter.com/BuildCanaries">
          Follow Build Canaries on Twitter for news and updates
        </ExternalLink>
        .
      </p>
      <p>
        <GitHubLogo />
        <ExternalLink href="https://github.com/build-canaries/nevergreen">
          The full Nevergreen source is available on GitHub
        </ExternalLink>
        .
      </p>
      <p>
        Found a problem? <SubmitAnIssue version={versionWithName} /> on GitHub
        to help us!
      </p>
      <h2 className={styles.title}>Licences</h2>
      <p>
        Nevergreen is open source under the{' '}
        <ExternalLink href="https://spdx.org/licenses/EPL-1.0">
          Eclipse Public Licence 1.0 (EPL-1.0)
        </ExternalLink>{' '}
        and uses open source software.
      </p>
      <p>
        Icons generated using the{' '}
        <ExternalLink href="https://icomoon.io/">IcoMoon App</ExternalLink> and
        are licenced under{' '}
        <ExternalLink href="https://www.gnu.org/licenses/gpl.html">
          GNU General Public Licence (GPL)
        </ExternalLink>{' '}
        /{' '}
        <ExternalLink href="https://creativecommons.org/licenses/by/4.0/">
          Creative Commons Attribution 4.0 International (CC BY 4.0)
        </ExternalLink>
      </p>
      <p>
        <ExternalLink href="http://www.orangefreesounds.com/pacman-death-sound/">
          &quot;Pacman Death Sound&quot; by Alexander
        </ExternalLink>{' '}
        is licenced under{' '}
        <ExternalLink href="https://creativecommons.org/licenses/by-nc/4.0/">
          Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC
          4.0)
        </ExternalLink>
      </p>
    </Page>
  )
}
