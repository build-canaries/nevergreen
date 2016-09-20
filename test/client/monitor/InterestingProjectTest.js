import '../UnitSpec'
import {describe, it, beforeEach} from 'mocha'
import {expect} from 'chai'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import InterestingProject from '../../../src/client/monitor/InterestingProject'

describe('InterestingProject component', () => {
  let renderer, project

  beforeEach(() => {
    project = {
      trayName: 'foo',
      name: 'name',
      prognosis: 'some-prognosis',
      lastBuildTime: '10h'
    }
    renderer = TestUtils.createRenderer()
  })

  it('renders both tray name and project name if showTrayName is true', () => {
    renderer.render(
      <InterestingProject {...project} showBrokenBuildTimers={true} showTrayName={true}/>
    )

    let output = renderer.getRenderOutput()
    expect(output).to.deep.equal(
      <li className='interesting-project some-prognosis'>
        <div className='monitor-outer-container'>
          <div className='monitor-inner-container'>
            <span className='monitor-project-name'>foo >> name</span>
            {null}
          </div>
        </div>
      </li>
    )
  })

  it('renders only project name if showTrayName is false', () => {
    renderer.render(
      <InterestingProject {...project} showBrokenBuildTimers={true} showTrayName={false}/>
    )

    let output = renderer.getRenderOutput()
    expect(output).to.deep.equal(
      <li className='interesting-project some-prognosis'>
        <div className='monitor-outer-container'>
          <div className='monitor-inner-container'>
            <span className='monitor-project-name'>name</span>
            {null}
          </div>
        </div>
      </li>
    )
  })
})
