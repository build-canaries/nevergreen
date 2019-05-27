import _ from 'lodash'
import {debug, warn} from '../Logger'

export const MIN_FONT_SIZE = 10
const PADDING_CHARS = 2 // 1em = 2 characters

function paddingPixels(fontSize: number) {
  return PADDING_CHARS * fontSize
}

function longestStringInArray(words: string[]) {
  return words.reduce((largestFound, candidate) => Math.max(candidate.length, largestFound), 0)
}

function findLongestWord(sentences: string[]) {
  const individualWords = _.flatten(sentences.map((sentence) => sentence.split(' ')))
  return longestStringInArray(individualWords)
}

function linesRequired(sentence: string, widthPixels: number, charWidthScale: number, fontSize: number) {
  const actualWidth = widthPixels - paddingPixels(fontSize)
  let lineNumber = 1
  let currentLinePosition = 0

  const spaceLength = fontSize * charWidthScale
  const wordLength = (word: string) => word.length * fontSize * charWidthScale

  sentence.split(' ').forEach((word) => {
    const newLineLength = currentLinePosition + wordLength(word)
    if (newLineLength > actualWidth) {
      lineNumber++
      currentLinePosition = wordLength(word)
    }
    currentLinePosition += wordLength(word) + spaceLength
  })

  return lineNumber
}

function maximumPossibleFontSize(sentences: string[], widthPixels: number, charWidthScale: number) {
  const longestWordCharacters = findLongestWord(sentences)
  const longestWordPixels = charWidthScale * longestWordCharacters
  const fontSize = Math.floor(widthPixels / (longestWordPixels + paddingPixels(1)))

  debug(`maximum possible fontSize [${fontSize}px] for width [${widthPixels}px] and sentences [${sentences}]`)

  return fontSize
}

export function ideal(sentences: string[], heightPixels: number, widthPixels: number, charHeightScale: number, charWidthScale: number) {
  if (heightPixels <= 0 || widthPixels <= 0) {
    return MIN_FONT_SIZE
  }

  let fontSize = maximumPossibleFontSize(sentences, widthPixels, charWidthScale)

  while (fontSize > MIN_FONT_SIZE) {
    const numberOfLines = sentences.map((sentence: string) => linesRequired(sentence, widthPixels, charWidthScale, fontSize))
    const largestNumberOfLines = Math.max(...numberOfLines)
    const heightRequired = largestNumberOfLines * (charHeightScale * fontSize)
    const actualHeight = heightPixels - paddingPixels(fontSize)
    if (heightRequired > actualHeight) {
      fontSize--
    } else {
      debug(`calculated fontSize [${fontSize}px] for width [${widthPixels}px] height [${heightPixels}px] heightScale [${charHeightScale}px] widthScale [${charWidthScale}px]`)
      return fontSize
    }
  }

  warn(`unable to calculate ideal fontSize for width [${widthPixels}px] height [${heightPixels}px] heightScale [${charHeightScale}px] widthScale [${charWidthScale}px]`)
  return MIN_FONT_SIZE
}
