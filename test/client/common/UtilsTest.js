import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {isBlank} from '../../../src/client/common/Utils'

describe('Utils', function () {

  it('should treat null as blank', function () {
    expect(isBlank(null)).to.be.true()
  })

  it('should treat undefined as blank', function () {
    expect(isBlank(undefined)).to.be.true()
  })

  it('should treat an empty string as blank', function () {
    expect(isBlank('')).to.be.true()
  })

  it('should treat a whitespace only string as blank', function () {
    expect(isBlank('   ')).to.be.true()
  })

  it('should not treat a string with non whitespace characters as blank', function () {
    expect(isBlank('test')).to.be.false()
  })

  it('should not treat a string with mixed characters as blank', function () {
    expect(isBlank(' t e s t ')).to.be.false()
  })

})
