import React from 'react'
import {URL} from './URL'
import {render} from '../testHelpers'
import {screen} from '@testing-library/react'

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr#Example

/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

it('should add a word break opportunity before path separators', () => {
  const {container} = render(<URL url="https://nevergreen.io/a/b/c"/>)
  // https://<wbr>nevergreen<wbr>.io<wbr>/a<wbr>/b<wbr>/c
  expect(container.querySelectorAll('wbr')).toHaveLength(5)
})

it('should redact passwords', () => {
  render(<URL url="https://username:password@a"/>)
  expect(screen.queryByText(/password/)).not.toBeInTheDocument()
  expect(screen.getByText(/REDACTED/)).toBeInTheDocument()
})

it('should redact query params in case they are API tokens', () => {
  render(<URL url="https://nevergreen.io?token=abc123"/>)
  expect(screen.queryByText(/abc123/)).not.toBeInTheDocument()
  expect(screen.getByText(/REDACTED/)).toBeInTheDocument()
})

describe('word break opportunity before punctuation', () => {

  it('should include full stops', () => {
    const {container} = render(<URL url="https://nevergreen.io"/>)
    // https://<wbr>nevergreen<wbr>.io<wbr>/
    expect(container.querySelectorAll('wbr')).toHaveLength(3)
  })

  it('should include equals', () => {
    const {container} = render(<URL url="https://nevergreen.io/a=b"/>)
    // https://<wbr>nevergreen<wbr>.io<wbr>/a<wbr>=b
    expect(container.querySelectorAll('wbr')).toHaveLength(4)
  })

  it('should include ampersands', () => {
    const {container} = render(<URL url="https://nevergreen.io/a&b"/>)
    // https://<wbr>nevergreen<wbr>.io<wbr>/a<wbr>&b
    expect(container.querySelectorAll('wbr')).toHaveLength(4)
  })

  it('should include question marks', () => {
    const {container} = render(<URL url="https://nevergreen.io/a?b"/>)
    // https://<wbr>nevergreen<wbr>.io<wbr>/a<wbr>?b
    expect(container.querySelectorAll('wbr')).toHaveLength(4)
  })
})
