import type { ReactElement } from 'react'
import version from '../../../resources/version.txt'
import versionMeta from '../../../resources/version_meta.txt'
import versionName from '../../../resources/version_name.txt'
import { SubmitAnIssue } from './SubmitAnIssue'
import { Link } from 'react-router'
import { RoutePaths } from '../AppRoutes'
import styles from './footer.scss'

export function Footer(): ReactElement {
  const fullVersion = `${version}+${versionMeta}`
  const versionWithName = `v${fullVersion} ${versionName}`

  return (
    <footer className={styles.siteFooter}>
      <Link
        className={styles.about}
        to={RoutePaths.about}
        aria-label="About Nevergreen"
      >
        Nevergreen v{fullVersion} {versionName} by Build Canaries
      </Link>
      <SubmitAnIssue
        version={versionWithName}
        className={styles.submitAnIssue}
      />
    </footer>
  )
}
