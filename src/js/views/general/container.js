const React = require('react')

module.exports = React.createClass({
    displayName: 'Container',

    propTypes: {
      name: React.PropTypes.string.isRequired
    },

    getInitialState() {
      return {
        hidden: false
      }
    },

    _toggleHidden() {
      this.setState({
        hidden: !this.state.hidden
      })
    },

    _showHideLabel() {
        return this.state.hidden ? 'Show pane' : 'Hide pane'
    },

    _renderShowHideToggle() {
      return (
        <button className='tray-hidden-button' onClick={this._toggleHidden} title={this._showHideLabel()}>
          <span className={'icon-' + (this.state.hidden ? 'circle-down' : 'circle-up') }/>
          <span className='visually-hidden'>{this._showHideLabel()}</span>
        </button>
      )
    },

    render() {
      return (
        <section className='sub-section'>
          <h3 className='section-title'>
            {this._renderShowHideToggle()}
            {this.props.title}
          </h3>
          {this.state.hidden ? '' : this.props.children}
        </section>
      )
    }
})