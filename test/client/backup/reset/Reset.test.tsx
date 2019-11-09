import React from 'react'
import userEvent from '@testing-library/user-event'
import {wait} from '@testing-library/react'
import * as LocalConfiguration from '../../../../src/client/configuration/LocalRepository'
import {Reset} from '../../../../src/client/backup/reset/Reset'
import {render} from '../../testHelpers'

beforeEach(() => {
  jest.spyOn(LocalConfiguration, 'clear').mockResolvedValue()
  window.location.reload = jest.fn()
})

it('should reset configuration and reload', async () => {
  const {getByText} = render(<Reset/>)
  userEvent.click(getByText('reset configuration'))
  await wait(() => {
    expect(LocalConfiguration.clear).toHaveBeenCalled()
    expect(window.location.reload).toHaveBeenCalled()
  })
})
