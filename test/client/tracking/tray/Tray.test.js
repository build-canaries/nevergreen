import React from 'react'
import {shallow} from 'enzyme'
import _ from 'lodash'
import {Tray} from '../../../../src/client/tracking/tray/Tray'
import AvailableProjectsContainer from '../../../../src/client/tracking/projects/AvailableProjectsContainer'
import {Tabs} from '../../../../src/client/common/Tabs'
import {Container} from '../../../../src/client/common/Container'

describe('<Tray/>', function () {

  const DEFAULT_PROPS = {
    trayId: '',
    index: 1,
    loaded: null,
    name: null,
    url: 'https://example.com/',
    highlight: null,
    checkRefresh: _.noop
  }

  it('should render available projects', function () {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(AvailableProjectsContainer).exists()).toBeTruthy()
  })

  it('should use the name as the title if it exists', function () {
    const props = {...DEFAULT_PROPS, name: 'some-name'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual( 'some-name')
  })

  it('should use the URL as the sub title if a name exists', function () {
    const props = {...DEFAULT_PROPS, name: 'some-name', url: 'https://some.url/'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('subTitle')).toEqual( 'https://some.url/')
  })

  it('should use the URL as the title if no name exists', function () {
    const props = {...DEFAULT_PROPS, name: null, url: 'https://some.url/'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual( 'https://some.url/')
  })

  it('should redact any password in the URL', function () {
    const props = {...DEFAULT_PROPS, name: null, url: 'https://username:password@some.url/'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual( 'https://username:*****@some.url/')
  })

  it('should redact any query parameters as they are likely to be API tokens', function () {
    const props = {...DEFAULT_PROPS, name: null, url: 'https://some.url/?token=some-token'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual( 'https://some.url/?token=*****')
  })

  it('should not error when URL is blank', function () {
    const props = {...DEFAULT_PROPS, name: null, url: ''}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual( '')
  })

  it('should not error when URL is invalid', function () {
    const props = {...DEFAULT_PROPS, name: null, url: 'invalid'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual( '')
  })

  it('should check the settings when switching tabs', function () {
    const checkRefresh = jest.fn()
    const props = {...DEFAULT_PROPS, trayId: 'some-tray-id', checkRefresh}
    const wrapper = shallow(<Tray {...props} />)
    wrapper.find(Tabs).prop('onSwitch')()
    expect(checkRefresh).toBeCalledWith('some-tray-id')
  })
})
