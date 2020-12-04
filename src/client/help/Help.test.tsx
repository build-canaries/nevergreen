import React from 'react'
import {Help} from './Help'
import {render, setupReactModal} from '../testHelpers'
import userEvent from '@testing-library/user-event'

beforeEach(setupReactModal)

it('should show help articles based on location or search query', () => {
  // I added the initiallyShow prop as I couldn't figure out how to get the model to show by firing key events :'(
  const {queryByText, getByLabelText} = render(<Help initiallyShow/>, {}, '/tracking')

  expect(queryByText('Adding a CCTray XML feed')).toBeInTheDocument()

  userEvent.type(getByLabelText('search'), 'not-a-valid-keyword')
  expect(queryByText('Adding a CCTray XML feed')).not.toBeInTheDocument()

  userEvent.clear(getByLabelText('search'))

  userEvent.type(getByLabelText('search'), 'adding')
  expect(queryByText('Adding a CCTray XML feed')).toBeInTheDocument()

  userEvent.clear(getByLabelText('search'))
  expect(queryByText('Adding a CCTray XML feed')).toBeInTheDocument()
})
