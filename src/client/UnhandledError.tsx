import React, {Component, ReactNode} from 'react'
import {clear} from './configuration/LocalRepository'
import styles from './unhandled-error.scss'
import {ExternalLink} from './common/ExternalLink'
import {DangerButton} from './common/forms/Button'

interface UnhandledErrorProps {
  children: ReactNode;
}

interface UnhandledErrorState {
  hasError: boolean;
}

const DEVELOPER_TOOLS_LINK = 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools#Find_out_more_2'
const ISSUE_LINK = 'https://github.com/build-canaries/nevergreen/issues'

export class UnhandledError extends Component<UnhandledErrorProps, UnhandledErrorState> {

  public constructor(props: UnhandledErrorProps) {
    super(props)
    this.state = {hasError: false}
  }

  public componentDidCatch() {
    this.setState({hasError: true})
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.content}>
          <h1>Something went wrong.</h1>
          <p>
            Please try refreshing the page.
          </p>
          <p>
            Your <ExternalLink href={DEVELOPER_TOOLS_LINK}>browser developer tools</ExternalLink> may provide more
            information about the error. If so, you can <ExternalLink href={ISSUE_LINK}>report bugs to us on
            GitHub</ExternalLink>.
          </p>
          <p>
            If you continue to see this page after refreshing, you may need to delete your Nevergreen
            configuration. <strong>Please note, deleting your configuration can not be undone!</strong>
          </p>
          <DangerButton className={styles.deleteConfiguration}
                        onClick={clear}>
            delete configuration
          </DangerButton>
        </div>
      )
    }
    return this.props.children
  }
}
