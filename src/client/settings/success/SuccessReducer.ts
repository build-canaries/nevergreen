import type { RootState } from '../../configuration/ReduxStore'
import remove from 'lodash/remove'
import uniq from 'lodash/uniq'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { configurationImported } from '../backup/BackupActionCreators'
import * as t from 'io-ts'

export const successRoot = 'success'

export const SuccessState = t.type({
  messages: t.readonlyArray(t.string, successRoot),
  backgroundColour: t.readonly(t.string),
  textColour: t.readonly(t.string),
})
export type SuccessState = t.TypeOf<typeof SuccessState>

export const SuccessConfiguration = t.exact(
  t.partial(SuccessState.props),
  successRoot
)

const initialState: SuccessState = {
  messages: ['=(^.^)='],
  backgroundColour: '#000000',
  textColour: '#fffed7',
}

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

const slice = createSlice({
  name: successRoot,
  initialState,
  reducers: {
    addMessage: (draft, action: PayloadAction<string>) => {
      draft.messages = uniq(
        draft.messages.concat(transformMessage(action.payload))
      )
    },
    removeMessage: (draft, action: PayloadAction<string>) => {
      const transformed = transformMessage(action.payload)
      remove(draft.messages, (message) => message === transformed)
    },
    setSuccessBackgroundColour: (draft, action: PayloadAction<string>) => {
      draft.backgroundColour = action.payload
    },
    setSuccessTextColour: (draft, action: PayloadAction<string>) => {
      draft.textColour = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configurationImported, (draft, action) => {
      return { ...draft, ...action.payload.configuration.success }
    })
  },
})

export const { reducer } = slice
export const {
  addMessage,
  removeMessage,
  setSuccessBackgroundColour,
  setSuccessTextColour,
} = slice.actions

const getSuccess = (state: RootState) => state.success
export const getSuccessMessages = createSelector(
  getSuccess,
  (success) => success.messages
)
export const getSuccessBackgroundColour = createSelector(
  getSuccess,
  (success) => success.backgroundColour
)
export const getSuccessTextColour = createSelector(
  getSuccess,
  (success) => success.textColour
)
