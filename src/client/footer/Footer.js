import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {ExternalLink} from '../common/ExternalLink'
import version from '../../../resources/version.txt'
import versionMeta from '../../../resources/version_meta.txt'
import versionName from '../../../resources/version_name.txt'
import SubmitAnIssueContainer from './SubmitAnIssueContainer'
import {About} from './About'
import styles from './footer.scss'

export class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAbout: false
    }
  }

  closeAbout = () => {
    this.setState({showAbout: false})
  }

  showAbout = () => {
    this.setState({showAbout: true})
  }

  render() {
    const {fullScreen} = this.props
    const {showAbout} = this.state
    const footerClassNames = cn(styles.siteFooter, {
      [styles.fullscreen]: fullScreen
    })
    const fullVersion = `${version}+${versionMeta}`
    const versionWithName = `v${fullVersion} ${versionName}`

    return (
      <Fragment>
        <About version={versionWithName}
               show={showAbout}
               close={this.closeAbout}/>
        <footer className={footerClassNames}>
          <ExternalLink href='https://github.com/build-canaries/nevergreen/releases'
                        className={styles.version}
                        title='Nevergreen releases on GitHub'>
            v<span data-locator='version'>{fullVersion}</span> {versionName}
          </ExternalLink>
          <SubmitAnIssueContainer version={versionWithName} className={styles.submitAnIssue}/>
          <button className={styles.about}
                  onClick={this.showAbout}>
            Nevergreen by Build Canaries
          </button>
        </footer>
      </Fragment>
    )
  }
}

Footer.propTypes = {
  fullScreen: PropTypes.bool
}
