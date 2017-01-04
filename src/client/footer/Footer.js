import React, {Component, PropTypes} from 'react'
import './footer.scss'

class Footer extends Component {
  render() {
    const footerStyle = {
      backgroundColor: this.props.versionColour
    }

    return (
      <footer role='contentinfo' className='site-footer' style={footerStyle}>
        <a href='https://github.com/build-canaries/nevergreen/releases' target='_blank' className='version'>
          <p>v{this.props.versionNumber}</p>
          <p>{this.props.versionName}</p>
        </a>
        <a href='https://github.com/build-canaries/nevergreen/commits/master' target='_blank' className='version'>
          <p className='commit-hash'>{`<${this.props.commitHash}>`}</p>
        </a>
      </footer>
    )
  }
}

Footer.propTypes = {
  versionNumber: PropTypes.string,
  versionName: PropTypes.string,
  commitHash: PropTypes.string,
  versionColour: PropTypes.string
}

export default Footer
