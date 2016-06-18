import React, {Component, PropTypes} from 'react'
import MenuItem from './MenuItem'
import './navigation.scss'
import './footer.scss'
import logo from './buildcanaries-logo.png' 

const items = [
  {id: 'monitor', iconClass: 'eye', title: 'Monitor', shortcuts: ['m', '1']},
  {id: 'tracking', iconClass: 'drawer2', title: 'Tracking', shortcuts: ['t', '2']},
  {id: 'success', iconClass: 'checkmark', title: 'Success', shortcuts: ['s', '3']},
  {id: 'audio-visual', iconClass: 'display', title: 'Audio/Visual', shortcuts: ['v', '4']},
  {id: 'backup', iconClass: 'floppy-disk', title: 'Backup', shortcuts: ['b', '5']},
  {id: 'help', iconClass: 'question', title: 'Help', shortcuts: ['h', '6']}
]

class Menu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const footerStyle = {
      backgroundColor: this.props.versionColour
    }

    return (
      <div>
        <nav role='navigation' className='navigation'>
          <h2 className='visually-hidden'>Navigation</h2>

          <a href='https://build-canaries.github.io/' target='_blank'>
            <img src={logo}
                 className='header-logo'
                 alt='Build Canaries logo'
                 title='Click to visit the Build Canaries homepage'/>
          </a>

          <ul className='navigation-list'>
            {
              items.map((item) => {
                return <MenuItem key={item.id} id={item.id}
                                 iconClass={'icon-' + item.iconClass}
                                 title={item.title}
                                 shortcuts={item.shortcuts}/>
              })
            }
          </ul>
        </nav>
        <footer role='contentinfo' className='content-info' style={footerStyle}>
          <a href='https://github.com/build-canaries/nevergreen/releases' target='_blank' className='version'>
            <p>v{this.props.versionNumber}</p>
            <p>{this.props.versionName}</p>
          </a>
          <a href='https://github.com/build-canaries/nevergreen/commits/master' target='_blank' className='version'>
            <p className='commit-hash'>{`<${this.props.commitHash}>`}</p>
          </a>
        </footer>
      </div>
    )
  }
}

Menu.propTypes = {
  versionNumber: PropTypes.string,
  versionName: PropTypes.string,
  commitHash: PropTypes.string,
  versionColour: PropTypes.string
}

export default Menu
