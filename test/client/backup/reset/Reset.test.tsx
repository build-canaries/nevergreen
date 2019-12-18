import React from 'react'
import userEvent from '@testing-library/user-event'
import {wait} from '@testing-library/react'
import * as LocalConfiguration from '../../../../src/client/configuration/LocalRepository'
import {Reset} from '../../../../src/client/backup/reset/Reset'
import {render} from '../../testHelpers'

beforeEach(() => {
  jest.spyOn(LocalConfiguration, 'clear').mockResolvedValue()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  window.location.reload = jest.fn()
})

it('should reset configuration and reload', async () => {
  const {getByText} = render(<Reset/>)
  userEvent.click(getByText('reset configuration'))
  await wait(() => {
    expect(LocalConfiguration.clear).toHaveBeenCalled()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(window.location.reload).toHaveBeenCalled()
  })
})
