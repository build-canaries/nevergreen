import React from 'react'
import proxyquire from 'proxyquire'
import {shallow} from 'enzyme'
import {mocks} from './Mocking'
import _ from 'lodash'
import {isImmutable, Map} from 'immutable'

proxyquire.noCallThru()

export function withMockedImports(fileFromSrcDir, imports) {
  return proxyquire(`../../src/${fileFromSrcDir}`, imports)
}

export function locator(name) {
  return `[data-locator="${name}"]`
}

export function change(input, value) {
  input.simulate('change', {target: {value}})
}

export function changeAndBlur(input, value) {
  change(input, value)
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

export async function testThunk(thunkion, state = Map()) {
  if (!isImmutable(state)) {
    throw 'state must be an immutable object'
  }

  const dispatch = mocks.stub()
  dispatch.returnsArg(0)

  const getState = () => state

  await thunkion(dispatch, getState)

  return dispatch
}
