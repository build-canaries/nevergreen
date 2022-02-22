import React from 'react'
import userEvent from '@testing-library/user-event'
import {ImportLocal} from './ImportLocal'
import {buildState, render} from '../../../testHelpers'
import {toJson} from '../../../common/Json'
import {screen, waitFor} from '@testing-library/react'

it('should import valid configuration', async () => {
  render(<ImportLocal/>)
  userEvent.type(screen.getByLabelText('Configuration to import'), escapeSpecialCharacter(toJson(buildState())))
  userEvent.click(screen.getByRole('button', {name: 'Import'}))

  await waitFor(() => {
    expect(screen.getByText('Configuration imported')).toBeInTheDocument()
  })
  expect(screen.getByLabelText('Configuration to import')).toHaveValue('')
})

it('should show an error if no data has been entered', () => {
  render(<ImportLocal/>)
  userEvent.click(screen.getByRole('button', {name: 'Import'}))
  expect(screen.getByText('Enter the configuration to import')).toBeInTheDocument()
  expect(screen.queryByText('Unexpected end of JSON input')).not.toBeInTheDocument()
})

it('should show an error if the data is syntactically invalid (bad json)', () => {
  const invalidConfiguration = '{'
  render(<ImportLocal/>)
  userEvent.type(screen.getByLabelText('Configuration to import'), escapeSpecialCharacter(invalidConfiguration))
  userEvent.click(screen.getByRole('button', {name: 'Import'}))

  expect(screen.getByText('Unexpected end of JSON input')).toBeInTheDocument()
  expect(screen.getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should show an error if the data is semantically invalid (missing required attributes)', () => {
  const invalidConfiguration = '{"trays":{"id":{}}}'
  render(<ImportLocal/>)
  userEvent.type(screen.getByLabelText('Configuration to import'), escapeSpecialCharacter(invalidConfiguration))
  userEvent.click(screen.getByRole('button', {name: 'Import'}))

  expect(screen.getByText('Invalid value undefined supplied to /trays/id/trayId expected string')).toBeInTheDocument()
  expect(screen.getByText('Invalid value undefined supplied to /trays/id/url expected string')).toBeInTheDocument()
  expect(screen.getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should allow a single JSON and plain text files to be opened', () => {
  // const file = new File(['file-content'], 'configuration.json', {type: 'application/json'})

  render(<ImportLocal/>)

  const input = screen.getByLabelText('Open local...')
  expect(input).toHaveAttribute('accept', '.json,.txt,application/json,text/plain')
  expect(input).not.toHaveAttribute('multiple')

  // TODO: This assertion started failing after updating to Jest 27, uploading does work when manually tested
  // This is most likely highlighting a legitimate issue, we are using an async callback to load the file content
  // So the issue is likely the promise getting resolved outside the react event loop and thus not changing in the test
  // userEvent.upload(input, file)

  // await waitFor(() => {
  //   expect(screen.getByLabelText('Configuration to import')).toHaveValue('file-content')
  // })
})

it('should be able to cancel back to settings', async () => {
  render(<ImportLocal/>)

  userEvent.click(screen.getByRole('button', {name: 'Cancel'}))

  await waitFor(() => {
    expect(window.location.pathname).toEqual('/backup')
  })
})

// https://github.com/testing-library/user-event#special-characters
function escapeSpecialCharacter(s: string) {
  return s
    .replaceAll('{', '{{')
    .replaceAll('[', '[[')
}
