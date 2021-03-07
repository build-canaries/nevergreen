import React from 'react'
import userEvent from '@testing-library/user-event'
import {Import} from './Import'
import {buildState, render} from '../../../testHelpers'
import {toJson} from '../../../common/Json'

it('should import valid data after filtering and parsing', () => {
  const {getByLabelText, getByRole, queryByText} = render(<Import/>)
  userEvent.type(getByLabelText('Configuration to import'), toJson(buildState()))
  userEvent.click(getByRole('button', {name: 'Import'}))

  expect(queryByText('Successfully imported configuration')).toBeInTheDocument()
  expect(getByLabelText('Configuration to import')).toHaveValue('')
})

it('should show an error if no data has been entered', () => {
  const {getByRole, queryByText} = render(<Import/>)
  userEvent.click(getByRole('button', {name: 'Import'}))
  expect(queryByText('Please enter the configuration to import')).toBeInTheDocument()
})

it('should show an error if the data is syntactically invalid (bad json)', () => {
  const invalidConfiguration = '{'
  const {getByLabelText, getByRole, getByDisplayValue, queryByText} = render(<Import/>)
  userEvent.type(getByLabelText('Configuration to import'), invalidConfiguration)
  userEvent.click(getByRole('button', {name: 'Import'}))

  expect(queryByText('Unexpected end of JSON input')).toBeInTheDocument()
  expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should show an error if the data is semantically invalid (missing required attributes)', () => {
  const invalidConfiguration = '{"trays":{"some-id":{}}}'
  const {getByLabelText, getByRole, getByDisplayValue, queryByText} = render(<Import/>)
  userEvent.type(getByLabelText('Configuration to import'), invalidConfiguration)
  userEvent.click(getByRole('button', {name: 'Import'}))

  expect(queryByText('Invalid value undefined supplied to /trays/some-id/trayId expected string')).toBeInTheDocument()
  expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should clear errors when the data is changed', () => {
  const {queryByText, getByLabelText, getByRole} = render(<Import/>)
  userEvent.click(getByRole('button', {name: 'Import'}))
  expect(queryByText('Please enter the configuration to import')).toBeInTheDocument()
  userEvent.type(getByLabelText('Configuration to import'), '{')
  expect(queryByText('Please enter the configuration to import')).not.toBeInTheDocument()
})

it('should allow JSON and plain text files to be opened', () => {
  const {getByLabelText} = render(<Import/>)
  expect(getByLabelText('Open local...')).toHaveAttribute('accept', '.json,.txt,application/json,text/plain')
})
