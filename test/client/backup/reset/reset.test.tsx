import React from 'react'
import userEvent from '@testing-library/user-event'
import { waitForDomChange } from '@testing-library/dom'
import {Reset} from '../../../../src/client/backup/reset/Reset'
import {render} from '../../testHelpers'

describe('import <Reset/>', () => {
    it('should click reset configuration button', async () => {
        const { getByText, queryByText } = render(<Reset/>)
        expect(queryByText('Reset your Nevergreen configuration back to defaults. Please note, resetting your configuration can not be undone!')).toBeInTheDocument()
        userEvent.click(getByText('reset configuration'))
    })
})