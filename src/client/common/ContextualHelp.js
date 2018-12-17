import React, {cloneElement, Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Modal} from './Modal'
import cn from 'classnames'
import styles from './contextual-help.scss'
import {SecondaryButton} from './forms/Button'
import {iQuestion} from './fonts/Icons'

export class ContextualHelp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  toggleHelp = () => {
    this.setState(({show}) => {
      return {show: !show}
    })
  }

  closeHelp = () => {
    this.setState({show: false})
  }

  render() {
    const {help, title, className} = this.props
    const {show} = this.state
    const fullTitle = `Help - ${title}`
    const clonedHelp = cloneElement(help, {close: this.closeHelp})

    const helpContainer = (
      <Modal title={fullTitle}
             show={show}
             close={this.closeHelp}>
        {clonedHelp}
      </Modal>
    )

    return (
      <Fragment>
        <SecondaryButton icon={iQuestion}
                         iconOnly
                         className={cn(styles.helpButton, className)}
                         onClick={this.toggleHelp}
                         aria-expanded={show}
                         data-locator='help-button'>
          show help
        </SecondaryButton>
        {helpContainer}
      </Fragment>
    )
  }
}

ContextualHelp.propTypes = {
  title: PropTypes.string.isRequired,
  help: PropTypes.element.isRequired,
  className: PropTypes.string
}

export function WithHelp({help, title, className, children}) {
  return (
    <div className={styles.inline}>
      {children}
      <ContextualHelp title={title} help={help} className={className}/>
    </div>
  )
}

WithHelp.propTypes = {
  title: PropTypes.string.isRequired,
  help: PropTypes.element.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
