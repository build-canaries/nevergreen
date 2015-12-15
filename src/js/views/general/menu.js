var React = require('react')
var Router = require('react-router')

var Link = Router.Link

var MenuItem = React.createClass({
  render: function () {
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
  getDefaultProps: function () {
    return {
      items: [
        {id: 'monitor', iconClass: 'eye', title: 'Monitor'},
        {id: 'tracking', iconClass: 'drawer2', title: 'Tracking'},
        {id: 'success', iconClass: 'checkmark', title: 'Success'},
        {id: 'display', iconClass: 'display', title: 'Display'},
        {id: 'export', iconClass: 'floppy-disk', title: 'Export'},
        {id: 'help', iconClass: 'question', title: 'Help'}
      ]
    }
  },

  render: function () {
    return (
      <div>
        <nav role='navigation' className='navigation'>
          <h2 className='visually-hidden'>Navigation</h2>

          <a href='https://build-canaries.github.io/' target='_blank'>
            <img src='img/buildcanaries-logo.png' className='header-logo' alt='Build Canaries logo' title='Click to visit the Build Canaries homepage'/>
          </a>

          <ul className='navigation-list'>
            {
              this.props.items.map(function (item) {
                return <MenuItem key={item.id} id={item.id} iconClass={'icon-' + item.iconClass} title={item.title}/>
              }.bind(this))
            }
          </ul>
        </nav>
        <footer role='contentinfo' className='content-info'>
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
