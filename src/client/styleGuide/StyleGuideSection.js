import React from 'react'
import PropTypes from 'prop-types'
import styles from './style-guide.scss'

export function StyleGuideSection({title, children}) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  )
}

StyleGuideSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
