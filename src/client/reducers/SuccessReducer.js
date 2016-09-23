import Immutable from 'immutable'
import {TEXT_ADDED, IMAGE_ADDED, TEXT_REMOVED, IMAGE_REMOVED} from '../actions/SuccessActions'
import {INITIALISED} from '../actions/NevergreenActions'

const DefaultState = Immutable.Map({
  images: Immutable.OrderedSet(),
  texts: Immutable.OrderedSet(['=(^.^)='])
})

export function reduce(state = DefaultState, action) {
  switch (action.type) {
    case INITIALISED:
      return state.merge(action.data.get('success'))
        .update('images', (images) => images.toOrderedSet())
        .update('texts', (messages) => messages.toOrderedSet())

    case TEXT_ADDED:
      return state.update('texts', (messages) => messages.add(action.message))

    case IMAGE_ADDED:
      return state.update('images', (images) => images.add(action.url))

    case TEXT_REMOVED:
      return state.update('texts', (messages) => messages.delete(action.message))

    case IMAGE_REMOVED:
      return state.update('images', (images) => images.delete(action.url))

    default:
      return state
  }
}
