import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './container.scss'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: props.hidden || false
    }
  }

  componentDidMount() {
    if (this.props.highlight) {
      this.node.scrollIntoView(true)
    }
  }

  render() {
    const toggleHidden = () => this.setState({hidden: !this.state.hidden})
    const keyToggle = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleHidden()
        e.preventDefault()
      }
    }
    const sectionClasses = classNames('container', this.props.className)
    const titleBarClasses = classNames('title-bar', {
      highlight: this.props.highlight,
      show: this.state.hidden,
      hide: !this.state.hidden
    })
    const tooltip = this.state.hidden ? 'show pane' : 'hide pane'
    const body = this.state.hidden ? null : <div className='container-body'>{this.props.children}</div>

    return (
      <section className={sectionClasses} ref={(node) => this.node = node}>
        <div className={titleBarClasses} title={tooltip} onClick={toggleHidden} onKeyPress={keyToggle} tabIndex='0'>
          <h3 className='section-title'>{this.props.title}</h3>
          <h4 className='section-sub-title'>{this.props.subTitle}</h4>
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
