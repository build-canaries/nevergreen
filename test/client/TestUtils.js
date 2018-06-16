import React from 'react'
import proxyquire from 'proxyquire'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import {mocks} from './Mocking'
import _ from 'lodash'

proxyquire.noCallThru()

export function withMockedImports(fileFromSrcDir, imports) {
  return proxyquire(`../../src/${fileFromSrcDir}`, imports)
}

export function reactWithMockedImports(fileFromSrcDir, imports) {
  return withMockedImports(fileFromSrcDir, imports).default
}

export function locator(name) {
  return `[data-locator="${name}"]`
}

export function changeAndBlur(input, value) {
  input.simulate('change', {target: {value}})
  input.simulate('blur')
}

export function pressKeyOn(element, key) {
  element.simulate('keyPress', {key, preventDefault: _.noop})
}

// TODO: keep an eye on Enzyme issue https://github.com/airbnb/enzyme/issues/692
// to see if they add a more elegant way of getting child text for a React component
export function childText(wrapper, selector) {
  const children = wrapper.find(selector).prop('children')
  return shallow(<div>{children}</div>)
}

const UNDISPLAYABLE = {
  'null': null,
  undefined,
  'a blank string': ' ',
  'an empty string': ''
}

export function forUndisplayableStrings(fn) {
  _.forOwn(UNDISPLAYABLE, fn)
}

const NON_STRINGS = {
  'boolean true': true,
  'boolean false': false,
  'an array': [],
  'an object': {},
  'a number': 0
}

export function forNonStrings(fn) {
  _.forOwn(NON_STRINGS, fn)
}

export function testThunk(thunkion) {
  const dispatch = mocks.stub()
  dispatch.returnsArg(0)

  return Promise.resolve(thunkion(dispatch)).then((result) => {
    expect(dispatch).to.have.been.called()
    return result
  }).catch(() => {
    expect.fail(
      'Unhandled rejected Promise',
      'A catch() block',
      'Thunks should catch() rejected Promises and dispatch error actions')
  })
}
