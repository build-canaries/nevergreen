import {locator} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import AddedImages from '../../../src/client/success/AddedImages'
import _ from 'lodash'

describe('<AddedImages/>', function () {
  const DEFAULT_PROPS = {
    urls: [],
    removeMessage: _.noop
  }

  it('should render nothing if urls is empty', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {urls: []})
    const wrapper = shallow(<AddedImages {...props} />)
    expect(wrapper.get(0)).to.be.null()
  })

  it('should render images', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {urls: ['https://some-url']})
    const wrapper = shallow(<AddedImages {...props} />)
    expect(wrapper.find(locator('success-image'))).to.have.prop('src', 'https://some-url')
  })
})
