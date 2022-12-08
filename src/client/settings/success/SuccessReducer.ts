import type { RootState } from '../../configuration/ReduxStore'
import remove from 'lodash/remove'
import uniq from 'lodash/uniq'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { configurationImported } from '../backup/BackupActionCreators'

export type SuccessState = ReadonlyArray<string>

const initialState: SuccessState = ['=(^.^)=']

const spaces = / /g
const nonBreakingSpace = String.fromCharCode(160)

function isSentenceLike(message: string): boolean {
  const numberOfLetters = (message.match(/[A-Za-z]/g) || []).length
  return numberOfLetters / message.length > 0.3
}

function transformMessage(message: string): string {
  return isSentenceLike(message)
    ? message
    : message.replace(spaces, nonBreakingSpace)
}

export const successRoot = 'success'

const slice = createSlice({
  name: successRoot,
  initialState,
  reducers: {
    addMessage: (draft, action: PayloadAction<string>) => {
      return uniq(draft.concat(transformMessage(action.payload)))
    },
    removeMessage: (draft, action: PayloadAction<string>) => {
      const transformed = transformMessage(action.payload)
      remove(draft, (message) => message === transformed)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configurationImported, (draft, action) => {
      return action.payload.success ?? draft
    })
  },
})

export const { reducer } = slice
export const { addMessage, removeMessage } = slice.actions

export function getSuccessMessages(state: RootState): ReadonlyArray<string> {
  return state.success
}
