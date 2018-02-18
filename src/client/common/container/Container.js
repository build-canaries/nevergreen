import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './container.scss'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: props.hidden || false
    }
  }

  toggleHidden = () => {
    this.setState({hidden: !this.state.hidden})
  }

  keyToggle = (evt) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      this.toggleHidden()
      evt.preventDefault()
    }
  }

  componentDidMount() {
    if (this.props.highlight) {
      this.containerNode.scrollIntoView(true)
    }
  }

  render() {
    const titleBarClasses = classNames(styles.titleBar, {
      [styles.highlight]: this.props.highlight,
      [styles.show]: this.state.hidden,
      [styles.hide]: !this.state.hidden
    })
    const label = `${this.state.hidden ? 'show' : 'hide'} section ${this.props.title}`

    return (
      <section className={styles.container} ref={(node) => this.containerNode = node}>
        <div className={titleBarClasses}
             title={label}
             onClick={this.toggleHidden}
             onKeyPress={this.keyToggle}
             tabIndex='0'
             aria-label={label}
             aria-expanded={!this.state.hidden}
             role='button'>
          <h3 className={styles.title}>{this.props.title}</h3>
          {this.props.subTitle && <h4 className={styles.subTitle}>{this.props.subTitle}</h4>}
        </div>
        {!this.state.hidden && <div className={this.props.className}>{this.props.children}</div>}
      </section>
    )
  }
}

Container.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  className: PropTypes.string,
  hidden: PropTypes.bool,
  highlight: PropTypes.bool
}

export default Container
