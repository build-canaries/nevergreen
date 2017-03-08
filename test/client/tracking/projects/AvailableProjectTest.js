import '../../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import AvailableProject from '../../../../src/client/tracking/projects/AvailableProject'

describe('<AvailableProject/>', function () {
  const DEFAULT_PROPS = {
    name: '',
    stage: null,
    isNew: null,
    removed: null,
    selected: null,
    selectProject: () => {
    }
  }

  it('should render new tag if the project is new', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {isNew: true})
    const wrapper = shallow(<AvailableProject {...props} />)
    expect(wrapper.find('.new-project')).to.be.present()
    expect(wrapper.find('.removed-project')).to.not.be.present()
  })

  it('should render removed tag if the project was removed', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {removed: true})
    const wrapper = shallow(<AvailableProject {...props} />)
    expect(wrapper.find('.new-project')).to.not.be.present()
    expect(wrapper.find('.removed-project')).to.be.present()
  })

  it('should render the stage', function () {
    const props = Object.assign({}, DEFAULT_PROPS, {name: 'name', stage: 'stage'})
    const wrapper = shallow(<AvailableProject {...props} />)
    expect(wrapper.find('span')).to.have.text('name stage')
  })
})
