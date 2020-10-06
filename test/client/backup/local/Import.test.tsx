import React from 'react'
import userEvent from '@testing-library/user-event'
import {Import} from '../../../../src/client/backup/local/Import'
import {buildState, render} from '../../testHelpers'
import {toJson} from '../../../../src/client/common/Json'

it('should import valid data after filtering and parsing', async () => {
  const {getByLabelText, getByText} = render(<Import/>)
  await userEvent.type(getByLabelText('Configuration to import'), toJson(buildState()))
  userEvent.click(getByText('Import'))

  expect(getByText('Successfully imported configuration')).toBeInTheDocument()
  expect(getByLabelText('Configuration to import')).toHaveValue('')
})

test('should show an error if no data has been entered', () => {
  const {getByText} = render(<Import/>)
  userEvent.click(getByText('Import'))
  expect(getByText('Please enter the configuration to import')).toBeInTheDocument()
})

it('should show an error if the data is syntactically invalid (bad json)', async () => {
  const invalidConfiguration = '{'
  const {getByLabelText, getByText, getByDisplayValue} = render(<Import/>)
  await userEvent.type(getByLabelText('Configuration to import'), invalidConfiguration)
  userEvent.click(getByText('Import'))

  expect(getByText('Unexpected end of JSON input')).toBeInTheDocument()
  expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})

it('should show an error if the data is semantically invalid (missing required attributes)', async () => {
  const invalidConfiguration = '{"trays":{"some-id":{}}}'
  const {getByLabelText, getByText, getByDisplayValue} = render(<Import/>)
  await userEvent.type(getByLabelText('Configuration to import'), invalidConfiguration)
  userEvent.click(getByText('Import'))

  expect(getByText('.trays[\'some-id\'] should have required property \'trayId\'')).toBeInTheDocument()
  expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
})
