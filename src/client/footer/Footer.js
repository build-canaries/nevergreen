import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ExternalLink from '../common/ExternalLink'
import styles from './footer.scss'
import version from '../../../resources/version.txt'
import versionMeta from '../../../resources/version_meta.txt'
import versionName from '../../../resources/version_name.txt'

class Footer extends Component {
  render() {
    const footerClassNames = classNames(styles.siteFooter, {[styles.fullscreen]: this.props.fullScreen})
    const fullVersion = `${version}+${versionMeta}`

    return (
      <footer role='contentinfo' className={footerClassNames}>
        <ExternalLink href='https://github.com/build-canaries/nevergreen/releases' className={styles.version}
                      title='Nevergreen releases on Github'>
          v<span data-locator='version'>{fullVersion}</span> {versionName}
        </ExternalLink>
        <span className={styles.copyright}>Copyright © 2017 Build Canaries</span>
      </footer>
    )
  }
}

Footer.propTypes = {
  fullScreen: PropTypes.bool
}

export default Footer
