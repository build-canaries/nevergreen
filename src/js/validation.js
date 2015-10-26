var validate = require('validate.js')

/*
 * Taken from https://stackoverflow.com/questions/15069587/is-there-a-way-to-join-the-elements-in-an-js-array-but-let-the-last-separator-b
 */
function formatArray(arr) {
  var outStr = ''
  if (arr.length === 1) {
    outStr = arr[0]
  } else if (arr.length === 2) {
    outStr = arr.join(' and ')
  } else if (arr.length > 2) {
    outStr = arr.slice(0, -1).join(', ') + ', and ' + arr.slice(-1)
  }
  return outStr
}

module.exports = {
  init: function () {
    validate.options = {format: "flat"}
    validate.validators.stringArray = this._stringArray
  },

  _stringArray: function (value) {
    if (!validate.isArray(value)) {
      return 'must be an array'
    }

    var invalidIndices = value.reduce(function (previousValue, currentValue, index) {
      if (!validate.isString(currentValue) || validate.isEmpty(currentValue)) {
        return previousValue.concat(index)
      }
      return previousValue
    }, [])

    if (invalidIndices.length > 0) {
      return invalidIndices.length === 1 ?
      'can only contain non blank strings, value at index ' + invalidIndices + ' is invalid' :
      'can only contain non blank strings, values at indices ' + formatArray(invalidIndices) + ' are invalid'
    }
  }
}