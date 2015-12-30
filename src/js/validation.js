const validate = require('validate.js')

/*
 * Taken from https://stackoverflow.com/questions/15069587/is-there-a-way-to-join-the-elements-in-an-js-array-but-let-the-last-separator-b
 */
function formatArray(arr) {
  let outStr = ''
  if (arr.length === 1) {
    outStr = arr[0]
  } else if (arr.length === 2) {
    outStr = arr.join(' and ')
  } else if (arr.length > 2) {
    outStr = `${arr.slice(0, -1).join(', ')}, and ${arr.slice(-1)}`
  }
  return outStr
}

module.exports = {
  init() {
    validate.options = {format: "flat"}
    validate.prettify = str => {
      return `"${str}"`
    }
    validate.validators.array = this._array
    validate.validators.object = this._object
  },

  _object(value) {
    if (!validate.isObject(value) || validate.isArray(value)) {
      return 'must be an object'
    }
  },

  _array(value, options) {
    if (!validate.isArray(value)) {
      return 'must be an array'
    }

    if (options && options.elementValidation) {
      const invalidIndices = value.reduce((previousValue, currentValue, index) => {
        if (!options.elementValidation(currentValue, index)) {
          return previousValue.concat(index)
        }
        return previousValue
      }, [])

      if (invalidIndices.length > 0) {
        return invalidIndices.length === 1 ?
          `has an invalid value at index ${invalidIndices}` :
          `has invalid values at indices ${formatArray(invalidIndices)}`
      }
    }
  },

  nonEmptyStrings(value) {
    return validate.isString(value) && !validate.isEmpty(value)
  }
}
