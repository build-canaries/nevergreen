import React from 'react'
import {Container} from './Container'
import {render} from '../testHelpers'
import userEvent from '@testing-library/user-event'
import {fireEvent} from '@testing-library/react'

const DEFAULT_PROPS = {
  title: ''
}

it('should include the given titles', () => {
  const props = {...DEFAULT_PROPS, title: 'some-title', subTitle: 'some-sub-title'}
  const {getByTestId} = render(
    <Container {...props} >
      <div/>
    </Container>
  )
  expect(getByTestId('container-title')).toHaveTextContent('some-title')
  expect(getByTestId('container-sub-title')).toHaveTextContent('some-sub-title')
})

it('should not include a sub title if one is not given', () => {
  const props = {...DEFAULT_PROPS, subTitle: undefined}
  const {queryByTestId} = render(
    <Container {...props} >
      <div/>
    </Container>
  )
  expect(queryByTestId('container-sub-title')).not.toBeInTheDocument()
})

it('should initially show the body based on the prop and toggle on title bar click', () => {
  const props = {...DEFAULT_PROPS, initiallyHidden: false}
  const {getByTestId} = render(
    <Container {...props} >
      <div/>
    </Container>
  )
  expect(getByTestId('body')).not.toHaveClass('hidden')
  userEvent.click(getByTestId('title-bar'))
  expect(getByTestId('body')).toHaveClass('hidden')
})

it('should allow toggling body visibility with the keyboard when the title bar has focus', () => {
  const props = {...DEFAULT_PROPS, title: 'some-title', initiallyHidden: true}

  const {getByTestId} = render(
    <Container {...props} >
      <div/>
    </Container>
  )

  expect(getByTestId('title-bar')).toHaveAttribute('tabIndex', '0')
  expect(getByTestId('body')).toHaveClass('hidden')

  userEvent.tab()
  expect(getByTestId('title-bar')).toBe(document.activeElement)
  expect(getByTestId('title-bar')).toHaveAttribute('role', 'button')
  expect(getByTestId('title-bar')).toHaveAttribute('aria-label', 'Show section some-title')

  fireEvent.keyPress(document.activeElement as Element, {key: 'Enter', charCode: 13})
  expect(getByTestId('body')).not.toHaveClass('hidden')
  expect(getByTestId('title-bar')).toHaveAttribute('aria-label', 'Hide section some-title')

  fireEvent.keyPress(document.activeElement as Element, {key: ' ', charCode: 32})
  expect(getByTestId('body')).toHaveClass('hidden')
  expect(getByTestId('title-bar')).toHaveAttribute('aria-label', 'Show section some-title')
})
