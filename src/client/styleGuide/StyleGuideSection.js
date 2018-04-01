import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './style-guide.scss'

class StyleGuideSection extends Component {
  render() {
    return (
      <section className={styles.section}>
        <h3>{this.props.title}</h3>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </section>
    )
  }
}

StyleGuideSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default StyleGuideSection
