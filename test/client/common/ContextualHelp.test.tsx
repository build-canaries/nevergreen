import React from 'react'
import {ContextualHelp} from '../../../src/client/common/ContextualHelp'
import {render} from '../testHelpers'
import ReactModal from 'react-modal'
import userEvent from '@testing-library/user-event'

const Help = () => <div data-locator='help-content'/>

beforeAll(() => {
  ReactModal.setAppElement('body')
})

it('should show the help when the button is clicked', () => {
  const {getByTestId, queryByTestId} = render(<ContextualHelp title='some-title' help={<Help/>}/>)
  expect(queryByTestId('help-content')).not.toBeInTheDocument()
  userEvent.click(getByTestId('help-button'))
  expect(queryByTestId('help-content')).toBeInTheDocument()
})
