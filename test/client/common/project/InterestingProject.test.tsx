import {render} from '../../testHelpers'
import React from 'react'
import {InterestingProject} from '../../../../src/client/common/project/InterestingProject'
import {Prognosis} from '../../../../src/client/domain/Project'
import {setSystemTime} from '../../clock'

/*
 * The whitespace in this component is important, because it gets its text scaled on the monitor view. We need to use
 * real whitespace characters, as opposed to css padding/margin, so the correct font size can be calculated.
 */

describe('all show settings on', () => {

  beforeEach(() => {
    setSystemTime('2019-11-18T12:00:00Z')
  })

  it('should display tray name, stage, build label and broken build time for sick projects', () => {
    const props = {
      prognosis: Prognosis.sick,
      name: 'some-project-name',
      stage: 'some-stage',
      showTrayName: true,
      trayName: 'some-tray-name',
      showBrokenBuildTimers: true,
      lastBuildTime: '2019-11-18T11:00:00Z',
      showBuildLabel: true,
      lastBuildLabel: '1234'
    }

    const {getByTestId} = render(<InterestingProject {...props} />)

    // "prognosis sick", "time broken about 1 hour" and "build label" are visually hidden and "1h" is aria-hidden
    expect(getByTestId('interesting-project'))
      .toHaveTextContent('some-tray-name some-project-name some-stage prognosis sick time broken about 1 hour 1h build label #1234')
  })

  /*
   * This is because CI servers only update the lastBuildLabel when a build has finished building. So the build label
   * is always one build out of date for projects that are currently building, and thus we can only show the build
   * label for sick projects. It's also possible to change the build label in some CI servers (e.g. GoCD) so we
   * can't assume it's a number and increment by one for display purposes on non broken builds.
   */
  it('should display tray name, stage and building timer for building projects', () => {
    const props = {
      prognosis: Prognosis.sickBuilding,
      name: 'some-project-name',
      stage: 'some-stage',
      showTrayName: true,
      trayName: 'some-tray-name',
      showBrokenBuildTimers: true,
      thisBuildTime: '2019-11-18T10:00:00Z',
      showBuildTimers: true,
      showBuildLabel: true,
      lastBuildLabel: '1234'
    }

    const {getByTestId} = render(<InterestingProject {...props} />)

    // "prognosis sick-building" and "time building about 2 hour" are visually hidden and "2h" is aria-hidden
    expect(getByTestId('interesting-project'))
      .toHaveTextContent('some-tray-name some-project-name some-stage prognosis sick-building time building about 2 hours 2h')
  })

  it('should display tray name and stage for unknown projects', () => {
    const props = {
      prognosis: Prognosis.unknown,
      name: 'some-project-name',
      stage: 'some-stage',
      showTrayName: true,
      trayName: 'some-tray-name',
      showBrokenBuildTimers: true,
      thisBuildTime: '2019-11-18T10:00:00Z',
      showBuildTimers: true,
      showBuildLabel: true,
      lastBuildLabel: '1234'
    }

    const {getByTestId} = render(<InterestingProject {...props} />)

    // "prognosis unknown" is visually hidden
    expect(getByTestId('interesting-project'))
      .toHaveTextContent('some-tray-name some-project-name some-stage prognosis unknown')
  })

  it('should display tray name and stage for healthy projects', () => {
    const props = {
      prognosis: Prognosis.healthy,
      name: 'some-project-name',
      stage: 'some-stage',
      showTrayName: true,
      trayName: 'some-tray-name',
      showBrokenBuildTimers: true,
      thisBuildTime: '2019-11-18T10:00:00Z',
      showBuildTimers: true,
      showBuildLabel: true,
      lastBuildLabel: '1234'
    }

    const {getByTestId} = render(<InterestingProject {...props} />)

    // "prognosis healthy" is visually hidden
    expect(getByTestId('interesting-project'))
      .toHaveTextContent('some-tray-name some-project-name some-stage prognosis healthy')
  })
})

describe('all show settings off', () => {

  it('should display stage', () => {
    const props = {
      prognosis: Prognosis.sick,
      name: 'some-project-name',
      stage: 'some-stage',
      showTrayName: false,
      showBrokenBuildTimers: false,
      showBuildLabel: false
    }

    const {getByTestId} = render(<InterestingProject {...props} />)

    // "prognosis sick" is visually hidden
    expect(getByTestId('interesting-project'))
      .toHaveTextContent('some-project-name some-stage prognosis sick')
  })
})
