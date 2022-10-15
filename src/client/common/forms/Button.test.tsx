import React from 'react'
import {BaseButton, ButtonTheme} from './Button'
import {render} from '../../testUtils/testHelpers'
import {screen} from '@testing-library/react'

it('should explicitly set the type as the default is "submit"', () => {
  const props = {theme: ButtonTheme.secondary}
  render(<BaseButton {...props}>label</BaseButton>)
  expect(screen.getByText('label')).toHaveAttribute('type', 'button')
})
