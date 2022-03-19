import {clear, save as repositorySave} from './LocalRepository'
import debounce from 'lodash/debounce'
import {State} from '../Reducer'

async function saveRaw(currentState: State) {
  await clear()
  await repositorySave(currentState)
}

export const save = debounce(saveRaw, 200, {maxWait: 1000})
