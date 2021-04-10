import React from 'react'
import userEvent from '@testing-library/user-event'
import {ImportLocal} from './ImportLocal'
import {buildState, render} from '../../../testHelpers'
import {toJson} from '../../../common/Json'
import {ROUTE_ANCHOR_BACKUP, ROUTE_SETTINGS} from '../../../Routes'
import {waitFor} from '@testing-library/react'

it('should import valid configuration and redirect to the settings page', async () => {
  const {getByLabelText, getByRole, history} = render(<ImportLocal/>)
  userEvent.type(getByLabelText('Configuration to import'), toJson(buildState()))
  userEvent.click(getByRole('button', {name: 'Import'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
    expect(history.location.hash).toEqual(ROUTE_ANCHOR_BACKUP)
  })
})

it('should show an error if no data has been entered', () => {
  const {getByRole, queryByText} = render(<ImportLocal/>)
  userEvent.click(getByRole('button', {name: 'Import'}))
  expect(queryByText('Enter the configuration to import')).toBeInTheDocument()
})

it('should show an error if the data is syntactically invalid (bad json)', () => {
  const invalidConfiguration = '{'
  const {getByLabelText, getByRole, getByDisplayValue, queryByText} = render(<ImportLocal/>)
  userEvent.type(getByLabelText('Configuration to import'), invalidConfiguration)
  userEvent.click(getByRole('button', {name: 'Import'}))

  expect(queryByText('Unexpected end of JSON input')).toBeInTheDocument()
  expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should show an error if the data is semantically invalid (missing required attributes)', () => {
  const invalidConfiguration = '{"trays":{"id":{}}}'
  const {getByLabelText, getByRole, getByDisplayValue, queryByText} = render(<ImportLocal/>)
  userEvent.type(getByLabelText('Configuration to import'), invalidConfiguration)
  userEvent.click(getByRole('button', {name: 'Import'}))

  expect(queryByText('Invalid value undefined supplied to /trays/id/trayId expected string')).toBeInTheDocument()
  expect(queryByText('Invalid value undefined supplied to /trays/id/url expected string')).toBeInTheDocument()
  expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should allow JSON and plain text files to be opened', () => {
  const {getByLabelText} = render(<ImportLocal/>)
  expect(getByLabelText('Open local...')).toHaveAttribute('accept', '.json,.txt,application/json,text/plain')
})
