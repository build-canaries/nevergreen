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
      this.node.scrollIntoView(true)
    }
  }

  render() {
    const titleBarClasses = classNames(styles.titleBar, {
      [styles.highlight]: this.props.highlight,
      [styles.show]: this.state.hidden,
      [styles.hide]: !this.state.hidden
    })
    const tooltip = this.state.hidden ? 'show pane' : 'hide pane'
    const body = this.state.hidden ? null : <div className={this.props.className}>{this.props.children}</div>

    return (
      <section className={styles.container} ref={(node) => this.node = node}>
        <div className={titleBarClasses} title={tooltip} onClick={this.toggleHidden} onKeyPress={this.keyToggle}
             tabIndex='0'>
          <h3 className={styles.title}>{this.props.title}</h3>
          <h4 className={styles.subTitle}>{this.props.subTitle}</h4>
        </div>
        {body}
      </section>
    )
  }
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  className: PropTypes.string,
  hidden: PropTypes.bool,
  highlight: PropTypes.bool
}

export default Container
