import React, {Component, PropTypes} from 'react'
import './container.scss'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: props.hidden || false
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
    const showHideLabel = this.state.hidden ? 'Show pane' : 'Hide pane'
    const showHideIcon = this.state.hidden ? 'icon-circle-down' : 'icon-circle-up'

    return (
      <section className={`container ${this.props.className}`} title={showHideLabel}>
        <h3 className='section-title' onClick={toggleHidden} onKeyPress={keyToggle} tabIndex='0'>
          <span className={` show-hide ${showHideIcon}`}/>
          {this.props.title}
          <span className='section-sub-title'>{this.props.subTitle}</span>
        </h3>
        {this.state.hidden ? null : this.props.children}
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
  hidden: PropTypes.bool
}

export default Container
