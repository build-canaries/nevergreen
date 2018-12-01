import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Modal} from './Modal'
import {IconButton} from './IconButton'
import cn from 'classnames'
import styles from './contextual-help.scss'

export class ContextualHelp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  toggleHelp = () => {
    this.setState({show: !this.state.show})
  }

  closeHelp = () => {
    this.setState({show: false})
  }

  render() {
    const {help, title, className} = this.props
    const {show} = this.state
    const fullTitle = `${title} help`

    const helpContainer = (
      <Modal title={fullTitle}
             show={show}
             close={this.closeHelp}>
        {help}
      </Modal>
    )

    return (
      <Fragment>
        <IconButton icon='question'
                    label={`${title} help`}
                    className={cn(styles.helpButton, className)}
                    onClick={this.toggleHelp}
                    aria-expanded={show}/>
        {helpContainer}
      </Fragment>
    )
  }
}

ContextualHelp.propTypes = {
  title: PropTypes.string.isRequired,
  help: PropTypes.node.isRequired,
  className: PropTypes.string
}

export function InlineHelp({children}) {
  return (
    <div className={styles.inline}>{children}</div>
  )
}

InlineHelp.propTypes = {
  children: PropTypes.node.isRequired
}
