import React from 'react'
import userEvent from '@testing-library/user-event'
import {ImportLocal} from './ImportLocal'
import {buildState, render} from '../../../testHelpers'
import {toJson} from '../../../common/Json'
import {ROUTE_ANCHOR_BACKUP, ROUTE_SETTINGS} from '../../../Routes'
import {waitFor} from '@testing-library/react'

it('should import valid configuration and redirect to the settings page', async () => {
  const {getByLabelText, getByRole, history} = render(<ImportLocal/>)
  userEvent.type(getByLabelText('Configuration to import'), escapeSpecialCharacter(toJson(buildState())))
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
  userEvent.type(getByLabelText('Configuration to import'), escapeSpecialCharacter(invalidConfiguration))
  userEvent.click(getByRole('button', {name: 'Import'}))

  expect(queryByText('Unexpected end of JSON input')).toBeInTheDocument()
  expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should show an error if the data is semantically invalid (missing required attributes)', () => {
  const invalidConfiguration = '{"trays":{"id":{}}}'
  const {getByLabelText, getByRole, getByDisplayValue, queryByText} = render(<ImportLocal/>)
  userEvent.type(getByLabelText('Configuration to import'), escapeSpecialCharacter(invalidConfiguration))
  userEvent.click(getByRole('button', {name: 'Import'}))

  expect(queryByText('Invalid value undefined supplied to /trays/id/trayId expected string')).toBeInTheDocument()
  expect(queryByText('Invalid value undefined supplied to /trays/id/url expected string')).toBeInTheDocument()
  expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should allow a single JSON and plain text files to be opened', async () => {
  const file = new File(['file-content'], 'configuration.json', {type: 'application/json'})

  const {getByLabelText} = render(<ImportLocal/>)

  const input = getByLabelText('Open local...') as HTMLInputElement
  userEvent.upload(input, file)

  await waitFor(() => {
    expect(input).toHaveAttribute('accept', '.json,.txt,application/json,text/plain')
    expect(input).not.toHaveAttribute('multiple')
    expect(getByLabelText('Configuration to import')).toHaveValue('file-content')
  })
})

// https://github.com/testing-library/user-event#special-characters
function escapeSpecialCharacter(s: string) {
  return s
    .replaceAll('{', '{{')
    .replaceAll('[', '[[')
}
