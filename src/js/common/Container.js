import React, {Component, PropTypes} from 'react'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: false
    }
  }

  render() {
    const toggleHidden = () => this.setState({hidden: !this.state.hidden})
    const showHideLabel = this.state.hidden ? 'Show pane' : 'Hide pane'
    const showHideIcon = this.state.hidden ? 'icon-circle-down' : 'icon-circle-up'

    return (
      <section className='sub-section'>
        <h3 className='section-title'>
          <button className='tray-hidden-button' onClick={toggleHidden} title={showHideLabel}>
            <span className={showHideIcon}/>
            <span className='visually-hidden'>{showHideLabel}</span>
          </button>
          {this.props.title}
          <span className='section-sub-title'>{this.props.subTitle}</span>
        </h3>
        {this.state.hidden ? null : this.props.children}
      </section>
    )
  }
}

Container.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
}

export default Container
