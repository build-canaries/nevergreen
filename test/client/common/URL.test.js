import {expect} from 'chai'
import {describe, it} from 'mocha'
import React from 'react'
import {shallow} from 'enzyme'
import {URL} from '../../../src/client/common/URL'

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr#Example
describe('URL', function () {

  ['/', '.', '=', '&', '?'].forEach((c) => {
    it(`should not add a word break opportunity at the start regardless of character (${c})`, function () {
      const wrapper = shallow(<URL url={`${c}a`}/>)
      expect(wrapper.find('wbr').length).to.be.equal(0)
    })
  })

  it('should not a word break opportunity in the scheme separator', function () {
    const wrapper = shallow(<URL url='http://'/>)
    expect(wrapper.find('wbr').length).to.be.equal(0)
  })

  it('should add a word break opportunity before path separators', function () {
    const wrapper = shallow(<URL url='/a/b/c'/>)
    expect(wrapper.find('wbr').length).to.be.equal(2)
  })

  describe('word break opportunity before punctuation', function () {

    it('should include full stops', function () {
      const wrapper = shallow(<URL url='/example.com'/>)
      expect(wrapper.find('wbr').length).to.be.equal(1)
    })

    it('should include equals', function () {
      const wrapper = shallow(<URL url='a=b'/>)
      expect(wrapper.find('wbr').length).to.be.equal(1)
    })

    it('should include ampersands', function () {
      const wrapper = shallow(<URL url='a&b'/>)
      expect(wrapper.find('wbr').length).to.be.equal(1)
    })

    it('should include question marks', function () {
      const wrapper = shallow(<URL url='a?b'/>)
      expect(wrapper.find('wbr').length).to.be.equal(1)
    })
  })
})
