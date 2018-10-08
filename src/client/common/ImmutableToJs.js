import React from 'react'
import {isImmutable} from 'immutable'

const KEY = 0
const VALUE = 1

export const toJS = (WrappedComponent) => (wrappedComponentProps) => {
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    newProps[wrappedComponentProp[KEY]] = isImmutable(wrappedComponentProp[VALUE])
      ? wrappedComponentProp[VALUE].toJS()
      : wrappedComponentProp[VALUE]
    return newProps
  }, {})

  return <WrappedComponent {...propsJS} />
}
