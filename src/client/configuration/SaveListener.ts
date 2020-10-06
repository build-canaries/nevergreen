import {clear, save as repositorySave} from './LocalRepository'
import {debounce} from 'lodash'
import {State} from '../Reducer'

const ONE_SECOND = 1000

async function saveRaw(currentState: State) {
  await clear()
  await repositorySave(currentState)
}

export const save = debounce(saveRaw, 200, {maxWait: ONE_SECOND})
