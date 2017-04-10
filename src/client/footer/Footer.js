import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './footer.scss'

class Footer extends Component {
  render() {
    const footerStyle = {
      borderColor: this.props.versionColour
    }
    const footerClassNames = classNames('site-footer', {fullscreen: this.props.fullScreen})

    return (
      <footer role='contentinfo' className={footerClassNames} style={footerStyle}>
        <a href='https://github.com/build-canaries/nevergreen/releases' target='_blank' className='version' title='version'>
          <span className='version-number'>v{this.props.versionNumber}</span>
          <span className='version-name'>{this.props.versionName}</span>
        </a>
        <a href='https://github.com/build-canaries/nevergreen/commits/master' target='_blank' title='commit hash'
           className='commit-hash'>{`<${this.props.commitHash}>`}</a>
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
