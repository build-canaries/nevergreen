import React from 'react'
import {shallow} from 'enzyme'
import {URL} from '../../../src/client/common/URL'

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr#Example
describe('URL.tsx', () => {

  ['/', '.', '=', '&', '?'].forEach((c) => {
    test(`should not add a word break opportunity at the start regardless of character (${c})`, () => {
        const wrapper = shallow(<URL url={`${c}a`}/>)
        expect(wrapper.find('wbr').length).toBe(0)
      }
    )
  })

  test('should not a word break opportunity in the scheme separator', () => {
    const wrapper = shallow(<URL url='http://'/>)
    expect(wrapper.find('wbr').length).toBe(0)
  })

  test('should add a word break opportunity before path separators', () => {
    const wrapper = shallow(<URL url='/a/b/c'/>)
    expect(wrapper.find('wbr').length).toBe(2)
  })

  describe('word break opportunity before punctuation', () => {

    test('should include full stops', () => {
      const wrapper = shallow(<URL url='/example.com'/>)
      expect(wrapper.find('wbr').length).toBe(1)
    })

    test('should include equals', () => {
      const wrapper = shallow(<URL url='a=b'/>)
      expect(wrapper.find('wbr').length).toBe(1)
    })

    test('should include ampersands', () => {
      const wrapper = shallow(<URL url='a&b'/>)
      expect(wrapper.find('wbr').length).toBe(1)
    })

    test('should include question marks', () => {
      const wrapper = shallow(<URL url='a?b'/>)
      expect(wrapper.find('wbr').length).toBe(1)
    })
  })
})
