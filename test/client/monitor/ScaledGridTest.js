import '../UnitSpec'
import {describe, it, before} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {mount} from 'enzyme'
import ScaledGrid from '../../../src/client/monitor/ScaledGrid'

function setWindowSize(size) {
  // https://github.com/tmpvar/jsdom/issues/135#issuecomment-68191941
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetHeight: {
      get: () => size
    },
    offsetWidth: {
      get: () => size
    }
  })
}

describe('<ScaledGrid/>', function () {
  describe('desktop', function () {
    before(function () {
      setWindowSize(1440)
    })

    describe('single child', function () {
      let children

      before(function () {
        const wrapper = mount(<ScaledGrid children={<div>single child</div>}/>)

        children = wrapper.find('li')
      })

      it('should render only one child', function () {
        expect(children).to.have.length(1)
      })

      it('should have the correct width (width - margin)', function () {
        expect(children.first()).to.have.style('width', '1430px')
      })

      it('should have the correct height (height - minus)', function () {
        expect(children.first()).to.have.style('height', '1430px')
      })

      it('should set the font size', function () {
        expect(children.first()).to.have.style('font-size')
      })
    })

    describe('multiple children (1 row)', function () {
      let children

      before(function () {
        const wrapper = mount(<ScaledGrid children={[
          <div>first child</div>,
          <div>second child</div>,
          <div>third child</div>
        ]}/>)

        children = wrapper.find('li')
      })

      it('should render all children', function () {
        expect(children).to.have.length(3)
      })

      it('should have the correct width ((width - (columns * margin)) / columns)', function () {
        children.forEach((child) => {
          expect(child).to.have.style('width', '470px')
        })
      })

      it('should have the correct height (height)', function () {
        children.forEach((child) => {
          expect(child).to.have.style('height', '1430px')
        })
      })

      it('should set the font size', function () {
        children.forEach((child) => {
          expect(child).to.have.style('font-size')
        })
      })
    })

    describe('multiple children (multiple rows)', function () {
      let children

      before(function () {
        const wrapper = mount(<ScaledGrid children={[
          <div>first child</div>,
          <div>second child</div>,
          <div>third child</div>,
          <div>fourth child</div>,
          <div>fifth child</div>,
          <div>sixth child</div>
        ]}/>)

        children = wrapper.find('li')
      })

      it('should render all children', function () {
        expect(children).to.have.length(6)
      })

      it('should have the correct width ((width - (columns * margin)) / columns)', function () {
        children.forEach((child) => {
          expect(child).to.have.style('width', '470px')
        })
      })

      it('should have the correct height ((height - (rows * margin)) / rows)', function () {
        children.forEach((child) => {
          expect(child).to.have.style('height', '710px')
        })
      })

      it('should set the font size', function () {
        children.forEach((child) => {
          expect(child).to.have.style('font-size')
        })
      })
    })
  })

  describe('tablet', function () {
    before(function () {
      setWindowSize(768)
    })

    describe('single child', function () {
      let children

      before(function () {
        const wrapper = mount(<ScaledGrid children={<div>single child</div>}/>)

        children = wrapper.find('li')
      })

      it('should render only one child', function () {
        expect(children).to.have.length(1)
      })

      it('should have the correct width (width - margin)', function () {
        expect(children.first()).to.have.style('width', '758px')
      })

      it('should have the correct height (height - minus)', function () {
        expect(children.first()).to.have.style('height', '758px')
      })

      it('should set the font size', function () {
        expect(children.first()).to.have.style('font-size')
      })
    })

    describe('multiple children (1 row)', function () {
      let children

      before(function () {
        const wrapper = mount(<ScaledGrid children={[
          <div>first child</div>,
          <div>second child</div>
        ]}/>)

        children = wrapper.find('li')
      })

      it('should render all children', function () {
        expect(children).to.have.length(2)
      })

      it('should have the correct width ((width - (columns * margin)) / columns)', function () {
        children.forEach((child) => {
          expect(child).to.have.style('width', '374px')
        })
      })

      it('should have the correct height (height)', function () {
        children.forEach((child) => {
          expect(child).to.have.style('height', '758px')
        })
      })

      it('should set the font size', function () {
        children.forEach((child) => {
          expect(child).to.have.style('font-size')
        })
      })
    })

    describe('multiple children (multiple rows)', function () {
      let children

      before(function () {
        const wrapper = mount(<ScaledGrid children={[
          <div>first child</div>,
          <div>second child</div>,
          <div>third child</div>,
          <div>fourth child</div>
        ]}/>)

        children = wrapper.find('li')
      })

      it('should render all children', function () {
        expect(children).to.have.length(4)
      })

      it('should have the correct width ((width - (columns * margin)) / columns)', function () {
        children.forEach((child) => {
          expect(child).to.have.style('width', '374px')
        })
      })

      it('should have the correct height ((height - (rows * margin)) / rows)', function () {
        children.forEach((child) => {
          expect(child).to.have.style('height', '374px')
        })
      })

      it('should set the font size', function () {
        children.forEach((child) => {
          expect(child).to.have.style('font-size')
        })
      })
    })
  })

  describe('mobile', function () {
    before(function () {
      setWindowSize(320)
    })

    describe('single child', function () {
      let children

      before(function () {
        const wrapper = mount(<ScaledGrid children={<div>single child</div>}/>)

        children = wrapper.find('li')
      })

      it('should render only one child', function () {
        expect(children).to.have.length(1)
      })

      it('should have the correct width (width - margin)', function () {
        expect(children.first()).to.have.style('width', '310px')
      })

      it('should have the correct height (height - minus)', function () {
        expect(children.first()).to.have.style('height', '310px')
      })

      it('should set the font size', function () {
        expect(children.first()).to.have.style('font-size')
      })
    })

    describe('multiple children (multiple rows)', function () {
      let children

      before(function () {
        const wrapper = mount(<ScaledGrid children={[
          <div>first child</div>,
          <div>second child</div>
        ]}/>)

        children = wrapper.find('li')
      })

      it('should render all children', function () {
        expect(children).to.have.length(2)
      })

      it('should have the correct width ((width - (columns * margin)) / columns)', function () {
        children.forEach((child) => {
          expect(child).to.have.style('width', '310px')
        })
      })

      it('should have the correct height ((height - (rows * margin)) / rows)', function () {
        children.forEach((child) => {
          expect(child).to.have.style('height', '150px')
        })
      })

      it('should set the font size', function () {
        children.forEach((child) => {
          expect(child).to.have.style('font-size')
        })
      })
    })
  })
})
