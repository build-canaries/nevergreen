import React from 'react'
import {BaseButton, ButtonTheme} from '../../../../src/client/common/forms/Button'
import {render} from '../../testHelpers'

it('should explicitly set the type as the default is "submit"', () => {
  const props = {theme: ButtonTheme.secondary}
  const {getByText} = render(<BaseButton {...props}>label</BaseButton>)
  expect(getByText('label')).toHaveAttribute('type', 'button')
})
