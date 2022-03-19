import React, {ReactElement} from 'react'
import cn from 'classnames'
import version from '../../../resources/version.txt'
import versionMeta from '../../../resources/version_meta.txt'
import versionName from '../../../resources/version_name.txt'
import {SubmitAnIssue} from './SubmitAnIssue'
import styles from './footer.scss'
import {Link} from 'react-router-dom'
import {ROUTE_ABOUT} from '../AppRoutes'

interface FooterProps {
  readonly hide: boolean;
}

export function Footer({hide}: FooterProps): ReactElement {
  const footerClassNames = cn(styles.siteFooter, {
    [styles.hide]: hide
  })
  const fullVersion = `${version}+${versionMeta}`
  const versionWithName = `v${fullVersion} ${versionName}`

  return (
    <>
      <footer className={footerClassNames} role='contentinfo'>
        <Link className={styles.about} to={ROUTE_ABOUT}>
          Nevergreen v{fullVersion} {versionName} by Build Canaries
        </Link>
        <SubmitAnIssue version={versionWithName} className={styles.submitAnIssue}/>
      </footer>
    </>
  )
}
