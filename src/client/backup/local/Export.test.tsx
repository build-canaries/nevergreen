import React from 'react'
import {render} from '../../testHelpers'
import {Export} from './Export'
import * as ClipboardHook from './ClipboardHook'

it('should allowing copying to clipboard if supported', () => {
  let clipboardElementSelector = ''

  jest.spyOn(ClipboardHook, 'useClipboard').mockImplementation((id) => {
    clipboardElementSelector = id
    return true
  })

  const {queryByText, getByLabelText} = render(<Export/>)

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
  const {queryByText} = render(<Export/>)
  expect(queryByText('Copy to clipboard')).not.toBeInTheDocument()
})
