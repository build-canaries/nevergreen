import type { ReactNode } from 'react'
import { Component } from 'react'
import { UnhandledErrorMessage } from './UnhandledErrorMessage'

interface UnhandledErrorProps {
  readonly children: ReactNode
}

interface UnhandledErrorState {
  readonly hasError: boolean
}

export class UnhandledError extends Component<
  UnhandledErrorProps,
  UnhandledErrorState
> {
  public constructor(props: UnhandledErrorProps) {
    super(props)
    this.state = { hasError: false }
  }

  public componentDidCatch(): void {
    this.setState({ hasError: true })
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return <UnhandledErrorMessage />
    }
    return this.props.children
  }
}
