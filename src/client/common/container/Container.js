import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './container.scss'

export class Container extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hidden: props.hidden || false
    }
    this.rootNode = React.createRef()
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
      this.rootNode.current.scrollIntoView(true)
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
      <section className={styles.container}
               ref={this.rootNode}>
        <div className={titleBarClasses}
             title={label}
             onClick={this.toggleHidden}
             onKeyPress={this.keyToggle}
             tabIndex='0'
             aria-label={label}
             aria-expanded={!this.state.hidden}
             role='button'
             data-locator='title-bar'>
          <h2 className={styles.title} data-locator='container-title'>{this.props.title}</h2>
          {
            this.props.subTitle && (
              <div className={styles.subTitle}
                   data-locator='container-sub-title'>
                {this.props.subTitle}
              </div>
            )
          }
        </div>
        {
          !this.state.hidden && (
            <div className={this.props.className}
                 data-locator='body'>
              {this.props.children}
            </div>
          )
        }
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
