import React from 'react'
import userEvent from '@testing-library/user-event'
import {Import} from '../../../../src/client/backup/local/Import'
import {buildState, render} from '../../testHelpers'
import {toJson} from '../../../../src/client/common/Json'

it('should import valid data after filtering and parsing', async () => {
  const {getByLabelText, getByText, queryByText} = render(<Import/>)
  await userEvent.type(getByLabelText('Configuration to import'), toJson(buildState()))
  userEvent.click(getByText('Import now'))

  expect(queryByText('Successfully imported configuration')).toBeInTheDocument()
  expect(getByLabelText('Configuration to import')).toHaveValue('')
})

it('should show an error if no data has been entered', () => {
  const {getByText, queryByText} = render(<Import/>)
  userEvent.click(getByText('Import now'))
  expect(queryByText('Please enter the configuration to import')).toBeInTheDocument()
})

it('should show an error if the data is syntactically invalid (bad json)', async () => {
  const invalidConfiguration = '{'
  const {getByLabelText, getByText, getByDisplayValue, queryByText} = render(<Import/>)
  await userEvent.type(getByLabelText('Configuration to import'), invalidConfiguration)
  userEvent.click(getByText('Import now'))

  expect(queryByText('Unexpected end of JSON input')).toBeInTheDocument()
  expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should show an error if the data is semantically invalid (missing required attributes)', async () => {
  const invalidConfiguration = '{"trays":{"some-id":{}}}'
  const {getByLabelText, getByText, getByDisplayValue, queryByText} = render(<Import/>)
  await userEvent.type(getByLabelText('Configuration to import'), invalidConfiguration)
  userEvent.click(getByText('Import now'))

  expect(queryByText('Invalid value undefined supplied to /trays/some-id/trayId expected string')).toBeInTheDocument()
  expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should clear errors when the data is changed', async () => {
  const {getByText, queryByText, getByLabelText} = render(<Import/>)
  userEvent.click(getByText('Import now'))
  expect(queryByText('Please enter the configuration to import')).toBeInTheDocument()
  await userEvent.type(getByLabelText('Configuration to import'), '{')
  expect(queryByText('Please enter the configuration to import')).not.toBeInTheDocument()
})

it('should allow JSON and plain text files to be opened', () => {
  const {getByLabelText} = render(<Import/>)
  expect(getByLabelText('Open backup...')).toHaveAttribute('accept', '.json,.txt,application/json,text/plain')
})
