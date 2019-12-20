import React from 'react'
import {Help} from '../../../src/client/help/Help'
import {render, setupReactModal} from '../testHelpers'
import userEvent from '@testing-library/user-event'
import {fireEvent} from '@testing-library/react'

beforeEach(setupReactModal)

it('should show help articles based on location or search query', async () => {
  // I added the initiallyShow prop as I couldn't figure out how to get the model to show by firing key events :'(
  const {queryByText, getByLabelText} = render(<Help initiallyShow={true}/>, {}, '/tracking')

  expect(queryByText('Adding a CI server')).toBeInTheDocument()

  await userEvent.type(getByLabelText('search'), 'not-a-valid-keyword')
  expect(queryByText('Adding a CI server')).not.toBeInTheDocument()

  await userEvent.type(getByLabelText('search'), 'adding')
  expect(queryByText('Adding a CI server')).toBeInTheDocument()

  fireEvent.change(getByLabelText('search'), {target: {value: ''}})
  expect(queryByText('Adding a CI server')).toBeInTheDocument()
})
