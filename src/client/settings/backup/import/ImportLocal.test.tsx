import React from 'react'
import userEvent from '@testing-library/user-event'
import {ImportLocal} from './ImportLocal'
import {buildState, render} from '../../../testHelpers'
import {toJson} from '../../../common/Json'
import {ROUTE_ANCHOR_BACKUP, ROUTE_SETTINGS} from '../../../Routes'
import {screen, waitFor} from '@testing-library/react'

it('should import valid configuration and redirect to the settings page', async () => {
  const {history} = render(<ImportLocal/>)
  userEvent.type(screen.getByLabelText('Configuration to import'), escapeSpecialCharacter(toJson(buildState())))
  userEvent.click(screen.getByRole('button', {name: 'Import'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
    expect(history.location.hash).toEqual(ROUTE_ANCHOR_BACKUP)
  })
})

it('should show an error if no data has been entered', () => {
  render(<ImportLocal/>)
  userEvent.click(screen.getByRole('button', {name: 'Import'}))
  expect(screen.queryByText('Enter the configuration to import')).toBeInTheDocument()
})

it('should show an error if the data is syntactically invalid (bad json)', () => {
  const invalidConfiguration = '{'
  render(<ImportLocal/>)
  userEvent.type(screen.getByLabelText('Configuration to import'), escapeSpecialCharacter(invalidConfiguration))
  userEvent.click(screen.getByRole('button', {name: 'Import'}))

  expect(screen.queryByText('Unexpected end of JSON input')).toBeInTheDocument()
  expect(screen.getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should show an error if the data is semantically invalid (missing required attributes)', () => {
  const invalidConfiguration = '{"trays":{"id":{}}}'
  render(<ImportLocal/>)
  userEvent.type(screen.getByLabelText('Configuration to import'), escapeSpecialCharacter(invalidConfiguration))
  userEvent.click(screen.getByRole('button', {name: 'Import'}))

  expect(screen.queryByText('Invalid value undefined supplied to /trays/id/trayId expected string')).toBeInTheDocument()
  expect(screen.queryByText('Invalid value undefined supplied to /trays/id/url expected string')).toBeInTheDocument()
  expect(screen.getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should allow a single JSON and plain text files to be opened', async () => {
  const file = new File(['file-content'], 'configuration.json', {type: 'application/json'})

  render(<ImportLocal/>)

  const input = screen.getByLabelText('Open local...') as HTMLInputElement
  userEvent.upload(input, file)

  await waitFor(() => {
    expect(input).toHaveAttribute('accept', '.json,.txt,application/json,text/plain')
    expect(input).not.toHaveAttribute('multiple')
    expect(screen.getByLabelText('Configuration to import')).toHaveValue('file-content')
  })
})

it('should be able to cancel back to settings', async () => {
  const {history} = render(<ImportLocal/>)

  userEvent.click(screen.getByRole('link', {name: 'Cancel'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
    expect(history.location.hash).toEqual(ROUTE_ANCHOR_BACKUP)
  })
})

// https://github.com/testing-library/user-event#special-characters
function escapeSpecialCharacter(s: string) {
  return s
    .replaceAll('{', '{{')
    .replaceAll('[', '[[')
}
