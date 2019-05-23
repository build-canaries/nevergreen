import React from 'react'
import {shallow} from 'enzyme'
import {noop} from 'lodash'
import {Tray} from '../../../../src/client/tracking/tray/Tray'
import AvailableProjectsContainer from '../../../../src/client/tracking/projects/AvailableProjectsContainer'
import {Tabs} from '../../../../src/client/common/Tabs'
import {Container} from '../../../../src/client/common/Container'

describe('<Tray/>', () => {

  const DEFAULT_PROPS = {
    trayId: '',
    index: 1,
    loaded: undefined,
    name: undefined,
    url: 'https://example.com/',
    highlight: undefined,
    checkRefresh: noop
  }

  it('should render available projects', () => {
    const props = {...DEFAULT_PROPS}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(AvailableProjectsContainer).exists()).toBeTruthy()
  })

  it('should use the name as the title if it exists', () => {
    const props = {...DEFAULT_PROPS, name: 'some-name'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual('some-name')
  })

  it('should use the URL as the sub title if a name exists', () => {
    const props = {...DEFAULT_PROPS, name: 'some-name', url: 'https://some.url/'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('subTitle')).toEqual('https://some.url/')
  })

  it('should use the URL as the title if no name exists', () => {
    const props = {...DEFAULT_PROPS, name: undefined, url: 'https://some.url/'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual('https://some.url/')
  })

  it('should redact any password in the URL', () => {
    const props = {...DEFAULT_PROPS, name: undefined, url: 'https://username:password@some.url/'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual('https://username:*****@some.url/')
  })

  it('should redact any query parameters as they are likely to be API tokens', () => {
    const props = {...DEFAULT_PROPS, name: undefined, url: 'https://some.url/?token=some-token'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual('https://some.url/?token=*****')
  })

  it('should not error when URL is blank', () => {
    const props = {...DEFAULT_PROPS, name: undefined, url: ''}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual('')
  })

  it('should not error when URL is invalid', () => {
    const props = {...DEFAULT_PROPS, name: undefined, url: 'invalid'}
    const wrapper = shallow(<Tray {...props} />)
    expect(wrapper.find(Container).prop('title')).toEqual('')
  })

  it('should check the settings when switching tabs', () => {
    const checkRefresh = jest.fn()
    const props = {...DEFAULT_PROPS, trayId: 'some-tray-id', checkRefresh}
    const wrapper = shallow(<Tray {...props} />)
    const onSwitch = wrapper.find(Tabs).prop('onSwitch')
    onSwitch && onSwitch()
    expect(checkRefresh).toBeCalledWith('some-tray-id')
  })
})
