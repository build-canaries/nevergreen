import React from 'react'
import proxyquire from 'proxyquire'
import {shallow} from 'enzyme'
import _ from 'lodash'

proxyquire.noCallThru()

export function withMockedImports(fileFromSrcDir, imports) {
  return proxyquire(`../../src/${fileFromSrcDir}`, imports)
}

export function locator(name) {
  return `[data-locator="${name}"]`
}

// TODO: Keep an eye on Enzyme issue https://github.com/airbnb/enzyme/issues/692
// to see if they add a more elegant way of getting child text for a React component
export function childText(wrapper, selector) {
  const children = wrapper.find(selector).prop('children')
  return shallow(<div>{children}</div>)
}

const UNDISPLAYABLE = {
  'null': null,
  undefined,
  'a blank string': ' ',
  'an empty string': '',
  'an array': [],
  'an object': {},
  'boolean true': true,
  'boolean false': false,
  'a number': 0
}

export function forUndisplayables(fn) {
  _.forOwn(UNDISPLAYABLE, fn)
}
