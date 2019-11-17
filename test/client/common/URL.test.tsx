import React from 'react'
import {URL} from '../../../src/client/common/URL'
import {render} from '../testHelpers'

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr#Example

it.each(
  ['/', '.', '=', '&', '?']
)('should not add a word break opportunity at the start regardless of character (%s)', (c) => {
  const {container} = render(<URL url={`${c}a`}/>)
  expect(container.querySelectorAll('wbr')).toHaveLength(0)
})

it('should not a word break opportunity in the scheme separator', () => {
  const {container} = render(<URL url='http://'/>)
  expect(container.querySelectorAll('wbr')).toHaveLength(0)
})

it('should add a word break opportunity before path separators', () => {
  const {container} = render(<URL url='/a/b/c'/>)
  expect(container.querySelectorAll('wbr')).toHaveLength(2)
})

describe('word break opportunity before punctuation', () => {

  it('should include full stops', () => {
    const {container} = render(<URL url='/example.com'/>)
    expect(container.querySelectorAll('wbr')).toHaveLength(1)
  })

  it('should include equals', () => {
    const {container} = render(<URL url='a=b'/>)
    expect(container.querySelectorAll('wbr')).toHaveLength(1)
  })

  it('should include ampersands', () => {
    const {container} = render(<URL url='a&b'/>)
    expect(container.querySelectorAll('wbr')).toHaveLength(1)
  })

  it('should include question marks', () => {
    const {container} = render(<URL url='a?b'/>)
    expect(container.querySelectorAll('wbr')).toHaveLength(1)
  })
})
