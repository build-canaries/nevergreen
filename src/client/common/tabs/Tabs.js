import React, {Children, Component} from 'react'
import PropTypes from 'prop-types'
import './tabs.scss'

class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {active: 0}
  }

  render() {
    const switchTabs = (index) => this.setState({active: index})

    return (
      <div className='tabs'>
        <div className='tab-bar'>
          {this.props.titles.map((title, i) => {
            const isActive = i === this.state.active
            return (
              <button key={title} className='tab' onClick={() => switchTabs(i)} disabled={isActive} data-locator={`tab-${title}`}>
                {title}
              </button>
            )
          })}
        </div>
        <div className='tab-contents'>
          {Children.toArray(this.props.children)[this.state.active]}
        </div>
      </div>
    )
  }
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Tabs
