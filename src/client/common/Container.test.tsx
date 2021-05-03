import React from 'react'
import {Container} from './Container'
import {render} from '../testHelpers'
import userEvent from '@testing-library/user-event'
import {screen} from '@testing-library/react'

const DEFAULT_PROPS = {
  title: ''
}

it('should include the given titles', () => {
  const props = {...DEFAULT_PROPS, title: 'some-title', subTitle: 'some-sub-title'}
  render(
    <Container {...props} >
      <div/>
    </Container>
  )
  expect(screen.getByRole('heading')).toHaveTextContent('some-title')
  expect(screen.getByTestId('container-sub-title')).toHaveTextContent('some-sub-title')
})

it('should not include a sub title if one is not given', () => {
  const props = {...DEFAULT_PROPS, subTitle: undefined}
  render(
    <Container {...props} >
      <div/>
    </Container>
  )
  expect(screen.queryByTestId('container-sub-title')).not.toBeInTheDocument()
})

it('should initially show the body based on the prop and toggle on title bar click', () => {
  const props = {...DEFAULT_PROPS, initiallyHidden: false}
  render(
    <Container {...props} >
      <div/>
    </Container>
  )
  expect(screen.getByTestId('body')).not.toHaveClass('hidden')
  userEvent.click(screen.getByRole('button'))
  expect(screen.getByTestId('body')).toHaveClass('hidden')
})

it('should allow toggling body visibility with the keyboard when the title bar has focus', () => {
  const props = {...DEFAULT_PROPS, title: 'some-title', initiallyHidden: true}

  render(
    <Container {...props} >
      <div/>
    </Container>
  )

  const titleBar = screen.getByRole('button')

  expect(titleBar).toHaveAttribute('tabIndex', '0')
  expect(screen.getByTestId('body')).toHaveClass('hidden')

  userEvent.tab()
  expect(titleBar).toHaveFocus()
  expect(titleBar).toHaveAttribute('aria-label', 'Show section some-title')

  userEvent.type(titleBar, '{enter}', {skipClick: true})
  expect(screen.getByTestId('body')).not.toHaveClass('hidden')
  expect(titleBar).toHaveAttribute('aria-label', 'Hide section some-title')

  userEvent.type(titleBar, '{enter}', {skipClick: true})
  expect(screen.getByTestId('body')).toHaveClass('hidden')
  expect(titleBar).toHaveAttribute('aria-label', 'Show section some-title')
})
