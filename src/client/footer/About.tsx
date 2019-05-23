import React from 'react'
import {Modal} from '../common/Modal'
import {ExternalLink} from '../common/ExternalLink'
import SubmitAnIssueContainer from './SubmitAnIssueContainer'
import styles from './about.scss'

interface AboutProps {
  show: boolean;
  close: () => void;
  version: string;
}

export function About({show, close, version}: AboutProps) {
  return (
    <Modal show={show}
           close={close}
           title='About'>
      <p>
        Nevergreen {version} by Build Canaries.
      </p>
      <p className={styles.twitter}>
        <ExternalLink href='https://twitter.com/BuildCanaries'>Follow Build Canaries on Twitter for news and
          updates</ExternalLink>.
      </p>
      <p className={styles.github}>
        <ExternalLink href='https://github.com/build-canaries/nevergreen'>The full Nevergreen source is available on
          GitHub</ExternalLink>.
      </p>
      <p>
        Found a problem? <SubmitAnIssueContainer version={version}/> on GitHub to help us!
      </p>
      <h3 className={styles.title}>Licences</h3>
      <p>
        Nevergreen is open source under the <ExternalLink href='https://spdx.org/licenses/EPL-1.0'>Eclipse Public
        Licence 1.0 (EPL-1.0)</ExternalLink> and uses open source software.
      </p>
      <p>
        Icons generated using the <ExternalLink href='https://icomoon.io/'>IcoMoon App</ExternalLink> and are
        licenced under <ExternalLink href='https://www.gnu.org/licenses/gpl.html'>GNU General Public Licence
        (GPL)</ExternalLink> / <ExternalLink href='https://creativecommons.org/licenses/by/4.0/'>Creative Commons
        Attribution 4.0 International (CC BY 4.0)</ExternalLink>
      </p>
      <p>
        <ExternalLink href='http://www.orangefreesounds.com/pacman-death-sound/'>&quot;Pacman Death Sound&quot; by
          Alexander</ExternalLink> is licenced under <ExternalLink
        href='https://creativecommons.org/licenses/by-nc/4.0/'>Creative Commons Attribution-NonCommercial 4.0
        International (CC BY-NC 4.0)</ExternalLink>
      </p>
    </Modal>
  )
}
