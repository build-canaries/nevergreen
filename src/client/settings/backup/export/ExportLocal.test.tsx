import React from 'react'
import {render} from '../../../testHelpers'
import {ExportLocal} from './ExportLocal'
import * as ClipboardHook from './ClipboardHook'
import * as FileSystem from '../FileSystem'
import userEvent from '@testing-library/user-event'

it('should allowing copying to clipboard if supported', () => {
  let clipboardElementSelector = ''

  jest.spyOn(ClipboardHook, 'useClipboard').mockImplementation((id) => {
    clipboardElementSelector = id
    return true
  })

  const {queryByText, getByLabelText} = render(<ExportLocal/>)

  const currentConfiguration = getByLabelText('Current configuration')
  const copyButton = queryByText('Copy to clipboard')

  expect(copyButton).toBeInTheDocument()

  // these IDs must all be set for clipboard.js to work
  expect(copyButton).toHaveAttribute('id', clipboardElementSelector.replace('#', ''))
  expect(currentConfiguration).toHaveAttribute('id')
  expect(copyButton).toHaveAttribute('data-clipboard-target', `#${currentConfiguration.id}`)
})

// not sure if this applies to any browsers we actually support, but just in case
it('should not have a copy to clipboard button if copying is not supported', () => {
  jest.spyOn(ClipboardHook, 'useClipboard').mockReturnValue(false)
  const {queryByText} = render(<ExportLocal/>)
  expect(queryByText('Copy to clipboard')).not.toBeInTheDocument()
})

it('should be able to save a file locally', () => {
  jest.spyOn(FileSystem, 'saveFile')

  const {getByRole} = render(<ExportLocal/>)
  userEvent.click(getByRole('button', {name: 'Save locally...'}))

  expect(FileSystem.saveFile).toHaveBeenCalled()
})
