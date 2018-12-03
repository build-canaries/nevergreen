import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
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
    if (this.props.highlight && this.rootNode.current) {
      this.rootNode.current.scrollIntoView(true)
    }
  }

  render() {
    const {highlight, className, title, subTitle, children} = this.props
    const {hidden} = this.state

    const titleBarClasses = cn(styles.titleBar, {
      [styles.highlight]: highlight,
      [styles.show]: hidden,
      [styles.hide]: !hidden
    })
    const bodyClasses = cn(styles.body, className, {
      [styles.hidden]: hidden
    })
    const label = `${hidden ? 'show' : 'hide'} section ${title}`

    return (
      <section className={styles.container}
               ref={this.rootNode}>
        <div className={titleBarClasses}
             title={label}
             onClick={this.toggleHidden}
             onKeyPress={this.keyToggle}
             tabIndex='0'
             aria-label={label}
             aria-expanded={!hidden}
             role='button'
             data-locator='title-bar'>
          <h2 className={styles.title} data-locator='container-title'>{title}</h2>
          {
            subTitle && (
              <div className={styles.subTitle}
                   data-locator='container-sub-title'>
                {subTitle}
              </div>
            )
          }
        </div>
        <div className={bodyClasses} data-locator='body'>
          {children}
        </div>
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
