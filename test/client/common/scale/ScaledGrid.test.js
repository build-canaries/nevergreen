import React from 'react'
import {mount} from 'enzyme'
import {ScaledGrid} from '../../../../src/client/common/scale/ScaledGrid'

function setWindowSize(size) {
  // TODO: keep an eye on https://github.com/tmpvar/jsdom/issues/135 to see if this gets fixed
  // Fix from https://github.com/tmpvar/jsdom/issues/135#issuecomment-68191941
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetHeight: {
      get: () => size
    },
    offsetWidth: {
      get: () => size
    }
  })
}

describe('<ScaledGrid/>', () => {

  describe('desktop', () => {

    beforeEach(() => {
      setWindowSize(1440)
    })

    describe('single child', () => {
      let children

      beforeEach(() => {
        const wrapper = mount(
          <ScaledGrid>
            <div>single child</div>
          </ScaledGrid>)

        children = wrapper.find('li')
      })

      it('should render only one child', () => {
        expect(children).toHaveLength(1)
      })

      it('should have the correct width (width - margin)', () => {
        expect(children.first().prop('style')).toHaveProperty('width', '1430px')
      })

      it('should have the correct height (height - minus)', () => {
        expect(children.first().prop('style')).toHaveProperty('height', '1430px')
      })

      it('should set the font size', () => {
        expect(children.first().prop('style')).toHaveProperty('fontSize')
      })
    })

    describe('multiple children (1 row)', () => {
      let children

      beforeEach(() => {
        const wrapper = mount(
          <ScaledGrid>
            <div>first child</div>
            <div>second child</div>
            <div>third child</div>
          </ScaledGrid>)

        children = wrapper.find('li')
      })

      it('should render all children', () => {
        expect(children).toHaveLength(3)
      })

      it('should have the correct width ((width - (columns * margin)) / columns)', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('width', '470px')
        })
      })

      it('should have the correct height (height)', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('height', '1430px')
        })
      })

      it('should set the font size', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('fontSize')
        })
      })
    })

    describe('multiple children (multiple rows)', () => {
      let children

      beforeEach(() => {
        const wrapper = mount(
          <ScaledGrid>
            <div>first child</div>
            <div>second child</div>
            <div>third child</div>
            <div>fourth child</div>
            <div>fifth child</div>
            <div>sixth child</div>
          </ScaledGrid>)

        children = wrapper.find('li')
      })

      it('should render all children', () => {
        expect(children).toHaveLength(6)
      })

      it('should have the correct width ((width - (columns * margin)) / columns)', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('width', '470px')
        })
      })

      it('should have the correct height ((height - (rows * margin)) / rows)', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('height', '710px')
        })
      })

      it('should set the font size', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('fontSize')
        })
      })
    })
  })

  describe('tablet', () => {
    beforeEach(() => {
      setWindowSize(768)
    })

    describe('single child', () => {
      let children

      beforeEach(() => {
        const wrapper = mount(
          <ScaledGrid>
            <div>single child</div>
          </ScaledGrid>)

        children = wrapper.find('li')
      })

      it('should render only one child', () => {
        expect(children).toHaveLength(1)
      })

      it('should have the correct width (width - margin)', () => {
        expect(children.first().prop('style')).toHaveProperty('width', '758px')
      })

      it('should have the correct height (height - margin)', () => {
        expect(children.first().prop('style')).toHaveProperty('height', '758px')
      })

      it('should set the font size', () => {
        expect(children.first().prop('style')).toHaveProperty('fontSize')
      })
    })

    describe('multiple children (1 row)', () => {
      let children

      beforeEach(() => {
        const wrapper = mount(
          <ScaledGrid>
            <div>first child</div>
            <div>second child</div>
          </ScaledGrid>)

        children = wrapper.find('li')
      })

      it('should render all children', () => {
        expect(children).toHaveLength(2)
      })

      it('should have the correct width ((width - (columns * margin)) / columns)', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('width', '374px')
        })
      })

      it('should have the correct height (height)', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('height', '758px')
        })
      })

      it('should set the font size', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('fontSize')
        })
      })
    })

    describe('multiple children (multiple rows)', () => {
      let children

      beforeEach(() => {
        const wrapper = mount(
          <ScaledGrid>
            <div>first child</div>
            <div>second child</div>
            <div>third child</div>
            <div>fourth child</div>
          </ScaledGrid>)

        children = wrapper.find('li')
      })

      it('should render all children', () => {
        expect(children).toHaveLength(4)
      })

      it('should have the correct width ((width - (columns * margin)) / columns)', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('width', '374px')
        })
      })

      it('should have the correct height ((height - (rows * margin)) / rows)', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('height', '374px')
        })
      })

      it('should set the font size', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('fontSize')
        })
      })
    })
  })

  describe('mobile', () => {
    beforeEach(() => {
      setWindowSize(320)
    })

    describe('single child', () => {
      let children

      beforeEach(() => {
        const wrapper = mount(
          <ScaledGrid>
            <div>single child</div>
          </ScaledGrid>)

        children = wrapper.find('li')
      })

      it('should render only one child', () => {
        expect(children).toHaveLength(1)
      })

      it('should have the correct width (width - margin)', () => {
        expect(children.first().prop('style')).toHaveProperty('width', '310px')
      })

      it('should have the correct height (height - minus)', () => {
        expect(children.first().prop('style')).toHaveProperty('height', '310px')
      })

      it('should set the font size', () => {
        expect(children.first().prop('style')).toHaveProperty('fontSize')
      })
    })

    describe('multiple children (multiple rows)', () => {
      let children

      beforeEach(() => {
        const wrapper = mount(
          <ScaledGrid>
            <div>first child</div>
            <div>second child</div>
          </ScaledGrid>)

        children = wrapper.find('li')
      })

      it('should render all children', () => {
        expect(children).toHaveLength(2)
      })

      it('should have the correct width ((width - (columns * margin)) / columns)', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('width', '310px')
        })
      })

      it('should have the correct height ((height - (rows * margin)) / rows)', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('height', '150px')
        })
      })

      it('should set the font size', () => {
        children.forEach((child) => {
          expect(child.prop('style')).toHaveProperty('fontSize')
        })
      })
    })
  })
})
