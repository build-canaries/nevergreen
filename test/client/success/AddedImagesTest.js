import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import AddedImages from '../../../src/client/success/AddedImages'

describe('<AddedImages/>', function () {
  const DEFAULT_PROPS = {
    urls: [],
    removeMessage: () => {
    }
  }

  it('should render nothing if urls is empty', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {urls: []})
    const wrapper = shallow(<AddedImages {...props} />)
    expect(wrapper.get(0)).to.be.null
  })

  it('should render images', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {urls: ['https://some-url']})
    const wrapper = shallow(<AddedImages {...props} />)
    expect(wrapper.find('.success-list-image')).to.have.prop('src', 'https://some-url')
  })
})
