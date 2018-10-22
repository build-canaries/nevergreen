import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {ExternalLink} from '../common/ExternalLink'
import styles from './footer.scss'
import version from '../../../resources/version.txt'
import versionMeta from '../../../resources/version_meta.txt'
import versionName from '../../../resources/version_name.txt'

export function Footer({fullScreen}) {
  const footerClassNames = classNames(styles.siteFooter, {
    [styles.fullscreen]: fullScreen
  })
  const fullVersion = `${version}+${versionMeta}`

  return (
    <footer role='contentinfo' className={footerClassNames}>
      <ExternalLink href='https://github.com/build-canaries/nevergreen/releases'
                    className={styles.version}
                    title='Nevergreen releases on Github'>
        v<span data-locator='version'>{fullVersion}</span> {versionName}
      </ExternalLink>
      <div className={styles.about}>Nevergreen by Build Canaries</div>
    </footer>
  )
}

Footer.propTypes = {
  fullScreen: PropTypes.bool
}
