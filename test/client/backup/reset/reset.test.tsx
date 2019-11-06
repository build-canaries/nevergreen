import React from 'react'
import userEvent from '@testing-library/user-event'
import * as LocalConfiguration from '../../../../src/client/configuration/LocalRepository'
import {Reset} from '../../../../src/client/backup/reset/Reset'
import {render} from '../../testHelpers'

describe('import <Reset/>', () => {
    beforeEach(() => {
        jest.spyOn(LocalConfiguration, 'clear').mockResolvedValue()
        Object.defineProperty(window.location, 'reload', {
            configurable: true,
          })
          window.location.reload = jest.fn()
      })
    it('should click reset configuration button', async () => { 
        const { getByText, queryByText } = render(<Reset/>)
        expect(queryByText('Reset your Nevergreen configuration back to defaults. Please note, resetting your configuration can not be undone!')).toBeInTheDocument()
        userEvent.click(getByText('reset configuration'))
        expect(LocalConfiguration.clear).toHaveBeenCalled()
        expect(window.location.reload).toHaveBeenCalled()
    })
})