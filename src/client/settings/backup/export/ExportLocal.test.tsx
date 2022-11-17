import React from 'react'
import {render} from '../../../testUtils/testHelpers'
import {ExportLocal} from './ExportLocal'
import * as ClipboardHook from './ClipboardHook'
import * as FileSystem from '../FileSystem'
import {act, screen, waitFor} from '@testing-library/react'

it('should allowing copying to clipboard if supported', async () => {
  let clipboardElementSelector = ''
  let clipboardOnSuccess: () => void = jest.fn()
  let clipboardOnError: () => void = jest.fn()

  jest.spyOn(ClipboardHook, 'useClipboard').mockImplementation((id, onSuccess, onError) => {
    clipboardElementSelector = id
    clipboardOnSuccess = onSuccess
    clipboardOnError = onError
    return true
  })

  render(<ExportLocal/>)

  const currentConfiguration = screen.getByLabelText('Current configuration')
  const copyButton = screen.queryByText('Copy to clipboard')

  expect(copyButton).toBeInTheDocument()

  // these IDs must all be set for clipboard.js to work
  expect(copyButton).toHaveAttribute('id', clipboardElementSelector.replace('#', ''))
  expect(currentConfiguration).toHaveAttribute('id')
  expect(copyButton).toHaveAttribute('data-clipboard-target', `#${currentConfiguration.id}`)

  // clipboard.js registers its own onClick handler, so just manually trigger the callbacks given to the hook
  await act(() => clipboardOnSuccess())
  expect(screen.getByText('Copied current configuration to clipboard')).toBeInTheDocument()

  await act(() => clipboardOnError())
  expect(screen.getByText('Unable to copy, please manually copy')).toBeInTheDocument()
})

// not sure if this applies to any browsers we actually support, but just in case
it('should not have a copy to clipboard button if copying is not supported', () => {
  jest.spyOn(ClipboardHook, 'useClipboard').mockReturnValue(false)
  render(<ExportLocal/>)
  expect(screen.queryByText('Copy to clipboard')).not.toBeInTheDocument()
})

it('should be able to save a file locally', async () => {
  jest.spyOn(FileSystem, 'saveFile')
  const {user} = render(<ExportLocal/>)
  await user.click(screen.getByRole('button', {name: 'Save locally...'}))
  expect(FileSystem.saveFile).toHaveBeenCalled()
})

it('should be able to cancel back to settings', async () => {
  const {user} = render(<ExportLocal/>, {mountPath: 'import', currentLocation: 'import'})
  await user.click(screen.getByRole('button', {name: 'Cancel'}))
  await waitFor(() => {
    expect(window.location.pathname).toEqual('/backup')
  })
})
