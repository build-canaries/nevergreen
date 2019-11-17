import React from 'react'
import {ScaledGrid} from '../../../../src/client/common/scale/ScaledGrid'
import {render} from '../../testHelpers'

function setWindowSize(size: number) {
  // TODO: keep an eye on https://github.com/tmpvar/jsdom/issues/135 to see if this gets fixed
  // Fix from https://github.com/tmpvar/jsdom/issues/135#issuecomment-68191941
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetHeight: {
      get: () => size
    },
    offsetWidth: {
      get: () => size
    }
  })
}

describe('desktop', () => {

  beforeEach(() => {
    setWindowSize(1440)
  })

  describe('single child', () => {
    let children: NodeList

    beforeEach(() => {
      const {container} = render(
        <ScaledGrid>
          <div>single child</div>
        </ScaledGrid>)

      children = container.querySelectorAll('li')
    })

    it('should render only one child', () => {
      expect(children).toHaveLength(1)
    })

    it('should have the correct width (width - margin)', () => {
      expect(children[0]).toHaveStyle('width: 1430px')
    })

    it('should have the correct height (height - minus)', () => {
      expect(children[0]).toHaveStyle('height: 1430px')
    })

    it('should set the font size', () => {
      expect(children[0]).toHaveStyle('fontSize:')
    })
  })

  describe('multiple children (1 row)', () => {
    let children: NodeList

    beforeEach(() => {
      const {container} = render(
        <ScaledGrid>
          <div>first child</div>
          <div>second child</div>
          <div>third child</div>
        </ScaledGrid>)

      children = container.querySelectorAll('li')
    })

    it('should render all children', () => {
      expect(children).toHaveLength(3)
    })

    it('should have the correct width ((width - (columns * margin)) / columns)', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('width: 470px')
      })
    })

    it('should have the correct height (height)', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('height: 1430px')
      })
    })

    it('should set the font size', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('fontSize:')
      })
    })
  })

  describe('multiple children (multiple rows)', () => {
    let children: NodeList

    beforeEach(() => {
      const {container} = render(
        <ScaledGrid>
          <div>first child</div>
          <div>second child</div>
          <div>third child</div>
          <div>fourth child</div>
          <div>fifth child</div>
          <div>sixth child</div>
        </ScaledGrid>)

      children = container.querySelectorAll('li')
    })

    it('should render all children', () => {
      expect(children).toHaveLength(6)
    })

    it('should have the correct width ((width - (columns * margin)) / columns)', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('width: 470px')
      })
    })

    it('should have the correct height ((height - (rows * margin)) / rows)', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('height: 710px')
      })
    })

    it('should set the font size', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('fontSize:')
      })
    })
  })
})

describe('tablet', () => {
  beforeEach(() => {
    setWindowSize(768)
  })

  describe('single child', () => {
    let children: NodeList

    beforeEach(() => {
      const {container} = render(
        <ScaledGrid>
          <div>single child</div>
        </ScaledGrid>)

      children = container.querySelectorAll('li')
    })

    it('should render only one child', () => {
      expect(children).toHaveLength(1)
    })

    it('should have the correct width (width - margin)', () => {
      expect(children[0]).toHaveStyle('width: 758px')
    })

    it('should have the correct height (height - margin)', () => {
      expect(children[0]).toHaveStyle('height: 758px')
    })

    it('should set the font size', () => {
      expect(children[0]).toHaveStyle('fontSize:')
    })
  })

  describe('multiple children (1 row)', () => {
    let children: NodeList

    beforeEach(() => {
      const {container} = render(
        <ScaledGrid>
          <div>first child</div>
          <div>second child</div>
        </ScaledGrid>)

      children = container.querySelectorAll('li')
    })

    it('should render all children', () => {
      expect(children).toHaveLength(2)
    })

    it('should have the correct width ((width - (columns * margin)) / columns)', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('width: 374px')
      })
    })

    it('should have the correct height (height)', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('height: 758px')
      })
    })

    it('should set the font size', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('fontSize:')
      })
    })
  })

  describe('multiple children (multiple rows)', () => {
    let children: NodeList

    beforeEach(() => {
      const {container} = render(
        <ScaledGrid>
          <div>first child</div>
          <div>second child</div>
          <div>third child</div>
          <div>fourth child</div>
        </ScaledGrid>)

      children = container.querySelectorAll('li')
    })

    it('should render all children', () => {
      expect(children).toHaveLength(4)
    })

    it('should have the correct width ((width - (columns * margin)) / columns)', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('width: 374px')
      })
    })

    it('should have the correct height ((height - (rows * margin)) / rows)', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('height: 374px')
      })
    })

    it('should set the font size', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('fontSize:')
      })
    })
  })
})

describe('mobile', () => {
  beforeEach(() => {
    setWindowSize(320)
  })

  describe('single child', () => {
    let children: NodeList

    beforeEach(() => {
      const {container} = render(
        <ScaledGrid>
          <div>single child</div>
        </ScaledGrid>)

      children = container.querySelectorAll('li')
    })

    it('should render only one child', () => {
      expect(children).toHaveLength(1)
    })

    it('should have the correct width (width - margin)', () => {
      expect(children[0]).toHaveStyle('width: 310px')
    })

    it('should have the correct height (height - minus)', () => {
      expect(children[0]).toHaveStyle('height: 310px')
    })

    it('should set the font size', () => {
      expect(children[0]).toHaveStyle('fontSize:')
    })
  })

  describe('multiple children (multiple rows)', () => {
    let children: NodeList

    beforeEach(() => {
      const {container} = render(
        <ScaledGrid>
          <div>first child</div>
          <div>second child</div>
        </ScaledGrid>)

      children = container.querySelectorAll('li')
    })

    it('should render all children', () => {
      expect(children).toHaveLength(2)
    })

    it('should have the correct width ((width - (columns * margin)) / columns)', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('width: 310px')
      })
    })

    it('should have the correct height ((height - (rows * margin)) / rows)', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('height: 150px')
      })
    })

    it('should set the font size', () => {
      children.forEach((child) => {
        expect(child).toHaveStyle('fontSize:')
      })
    })
  })
})
