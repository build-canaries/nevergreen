import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './footer.scss'

class Footer extends Component {
  render() {
    const footerStyle = {
      borderColor: this.props.versionColour
    }
    const footerClassNames = classNames(styles.siteFooter, {[styles.fullscreen]: this.props.fullScreen})

    return (
      <footer role='contentinfo' className={footerClassNames} style={footerStyle}>
        <a href='https://github.com/build-canaries/nevergreen/releases' target='_blank' rel='noopener noreferrer' className={styles.version}
           title='version'>
          <span className={styles.versionNumber}>v{this.props.versionNumber}</span>
          <span className={styles.versionName}>{this.props.versionName}</span>
        </a>
        <a href='https://github.com/build-canaries/nevergreen/commits/master' target='_blank' rel='noopener noreferrer' title='commit hash'
           className={styles.commitHash}>{`<${this.props.commitHash}>`}</a>
      </footer>
    )
  }
}

Footer.propTypes = {
  versionNumber: PropTypes.string,
  versionName: PropTypes.string,
  commitHash: PropTypes.string,
  versionColour: PropTypes.string,
  fullScreen: PropTypes.bool
}

export default Footer
