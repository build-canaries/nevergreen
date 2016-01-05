const React = require('react')
const Router = require('react-router')

const Link = Router.Link

const MenuItem = React.createClass({
  render() {
    return (
      <li>
        <Link id={this.props.id} to={'/' + this.props.id} className='navigation-list-item' activeClassName='active'>
          <span className={'navigation-list-item-icon ' + this.props.iconClass}></span>
          <span className='navigation-list-item-title'>{this.props.title}</span>
        </Link>
      </li>
    )
  }
})

module.exports = React.createClass({
  propTypes: {
    versionNumber: React.PropTypes.string,
    versionName: React.PropTypes.string,
    commitHash: React.PropTypes.string,
    versionColour: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      items: [
        {id: 'monitor', iconClass: 'eye', title: 'Monitor'},
        {id: 'tracking', iconClass: 'drawer2', title: 'Tracking'},
        {id: 'success', iconClass: 'checkmark', title: 'Success'},
        {id: 'display', iconClass: 'display', title: 'Display'},
        {id: 'export', iconClass: 'floppy-disk', title: 'Export'},
        {id: 'help', iconClass: 'question', title: 'Help'}
      ],
      versionNumber: 'loading...',
      versionName: 'loading...',
      commitHash: '#####',
      versionColour: '#7E7E7E'
    }
  },

  render() {
    const footerStyle = {
      backgroundColor: this.props.versionColour
    }

    return (
      <div>
        <nav role='navigation' className='navigation'>
          <h2 className='visually-hidden'>Navigation</h2>

          <a href='https://build-canaries.github.io/' target='_blank'>
            <img src='img/buildcanaries-logo.png'
                 className='header-logo'
                 alt='Build Canaries logo'
                 title='Click to visit the Build Canaries homepage'/>
          </a>

          <ul className='navigation-list'>
            {
              this.props.items.map(item => {
                return <MenuItem key={item.id} id={item.id} iconClass={'icon-' + item.iconClass} title={item.title}/>
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
            <p className='commit-hash'>{'<' + this.props.commitHash + '>'}</p>
          </a>
        </footer>
      </div>
    )
  }
})
