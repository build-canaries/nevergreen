import React from 'react'
import userEvent from '@testing-library/user-event'
import {Locally} from '../../../../../src/client/backup/import/locally/Locally'
import {buildState, render} from '../../../testHelpers'
import {toJson} from '../../../../../src/client/common/Json'

describe('import <Locally/>', () => {

  test('should import valid data after filtering and parsing', async () => {
    const {getByLabelText, getByText} = render(<Locally/>)
    await userEvent.type(getByLabelText('configuration to import'), toJson(buildState()), {allAtOnce: true})
    userEvent.click(getByText('import'))

    expect(getByText('Successfully imported configuration')).toBeInTheDocument()
    expect(getByLabelText('configuration to import')).toHaveValue('')
  })

  test('should show an error if no data has been entered', async () => {
    const {getByText} = render(<Locally/>)
    userEvent.click(getByText('import'))
    expect(getByText('Please enter the configuration to import')).toBeInTheDocument()
  })

  test('should show an error if the data is syntactically invalid (bad json)', async () => {
    const invalidConfiguration = '{'
    const {getByLabelText, getByText, getByDisplayValue} = render(<Locally/>)
    await userEvent.type(getByLabelText('configuration to import'), invalidConfiguration, {allAtOnce: true})
    userEvent.click(getByText('import'))

    expect(getByText('Unexpected end of JSON input')).toBeInTheDocument()
    expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
  })

  test('should show an error if the data is semantically invalid (missing required attributes)', async () => {
    const invalidConfiguration = '{"trays":{"some-id":{}}}'
    const {getByLabelText, getByText, getByDisplayValue} = render(<Locally/>)
    await userEvent.type(getByLabelText('configuration to import'), invalidConfiguration, {allAtOnce: true})
    userEvent.click(getByText('import'))

    expect(getByText('.trays[\'some-id\'] should have required property \'trayId\'')).toBeInTheDocument()
    expect(getByDisplayValue(invalidConfiguration)).toBeInTheDocument()
  })
})
