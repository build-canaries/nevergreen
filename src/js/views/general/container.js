const React = require('react')

module.exports = React.createClass({
    displayName: 'Container',

    propTypes: {
      title: React.PropTypes.string.isRequired,
      subTitle: React.PropTypes.string
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
        <button className='section-show-hide-button' onClick={this._toggleHidden} title={this._showHideLabel()}>
          <span className={'icon-' + (this.state.hidden ? 'circle-up' : 'circle-down') }/>
          <span className='visually-hidden'>{this._showHideLabel()}</span>
        </button>
      )
    },

    render() {
      return (
        <section className='section'>
          <h3 className='section-title'>
            {this._renderShowHideToggle()}
            {this.props.title}
            <span className='section-sub-title'>{this.props.subTitle}</span>
          </h3>
          {this.state.hidden ? '' : this.props.children}
        </section>
      )
    }
})