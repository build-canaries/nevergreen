import { configurationImported } from './BackupActionCreators'
import { setSystemTime } from '../../testUtils/testHelpers'

describe(configurationImported.toString(), () => {
  it('should add the timestamp', () => {
    setSystemTime('2023-05-26T19:13:00')
    const action = configurationImported({})
    expect(action.payload.timestamp).toMatch(/2023-05-26T19:13:00/)
  })
})
