import React from 'react'
import proxyquire from 'proxyquire'
import {shallow} from 'enzyme'
import {sandbox} from './Sandbox'
import _ from 'lodash'

proxyquire.noCallThru()

export function withMockedImports(fileFromSrcDir, imports) {
  return proxyquire(`../../src/${fileFromSrcDir}`, imports)
}

export function locator(name) {
  return `[data-locator="${name}"]`
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

export function forUndisplayablesStrings(fn) {
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
  const dispatch = sandbox.spy()
  return Promise.resolve(thunkion(dispatch)).then(() => {
    return dispatch
  }).catch(() => {
    return dispatch
  })
}
