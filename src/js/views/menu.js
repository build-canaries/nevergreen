var $ = require('jquery')
var React = require('react/addons')

var MenuItem = React.createClass({
    render: function () {
        var classes = React.addons.classSet({
            'dashboard-navigation-list-item': true,
            'active': this.props.active
        })
        return (
            <li>
                <a onClick={this.props.onClick} id={this.props.id} className={classes} href='#'>
                    <span className={'dashboard-navigation-list-item-icon ' + this.props.iconClass}></span>
                    <span className='dashboard-navigation-list-item-title'>{this.props.title}</span>
                </a>
            </li>
        )
    }
})

var Menu = React.createClass({
    getInitialState: function () {
        return {active: 'monitor'}
    },

    render: function () {
        return (
            <nav role='navigation' className='dashboard-navigation'>
                <h2 className='visuallyhidden'>Dashboard navigation</h2>

                <img src='img/buildcanaries-logo.png' className='dashboard-header-logo' alt='Build Canaries logo' />

                <ul className='dashboard-navigation-list'>
                    {
                        this.props.items.map(function (item) {
                            return <MenuItem key={item.id} onClick={this.handleClick.bind(this, item.id)} active={this.isActive(item.id)} id={item.id} iconClass={'icon-' + item.iconClass} title={item.title} />
                        }.bind(this))
                    }
                </ul>
            </nav>
        )
    },

    handleClick: function (item, event) {
        this.setState({active: item})

        event.preventDefault()
    },

    isActive: function (item) {
        return this.state.active === item
    }
})

module.exports = {
    render: function () {
        var items = [
            {id: 'monitor', iconClass: 'eye', title: 'Monitor'},
            {id: 'tracking', iconClass: 'drawer', title: 'Tracking'},
            {id: 'timing', iconClass: 'clock', title: 'Timing'},
            {id: 'success', iconClass: 'checkmark', title: 'Success'}
        ]
        React.render(<Menu items={items} />, $('#menu')[0])
    }
}
