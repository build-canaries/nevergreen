import React, {ReactElement, ReactNode, useCallback, useContext, useMemo, useRef, useState} from 'react'
import {flatten} from 'lodash'
import {debug} from './Logger'
import {FontMetricsContext, Measurable} from '../FontMetrics'
import {useElementResized} from './ResizableHook'
import styles from './scaled-text.scss'

export const MIN_FONT_SIZE = 10 // px

function totalPaddingPixels(fontSize: number, padding: number) {
  return (padding * 2) * fontSize
}

function longestStringInArray(words: ReadonlyArray<string>) {
  return words.reduce((largestFound, candidate) => Math.max(candidate.length, largestFound), 0)
}

function findLongestWord(sentences: ReadonlyArray<string>) {
  const individualWords = flatten(sentences.map((sentence) => sentence.split(' ')))
  return longestStringInArray(individualWords)
}

function linesRequired(sentence: string, widthPixels: number, charWidthScale: number, fontSize: number, paddingEm: number) {
  const actualWidth = widthPixels - totalPaddingPixels(fontSize, paddingEm)
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

function maximumPossibleFontSize(sentences: ReadonlyArray<string>, widthPixels: number, charWidthScale: number, paddingEm: number) {
  const longestWordCharacters = findLongestWord(sentences)
  const longestWordPixels = charWidthScale * longestWordCharacters
  const fontSize = Math.floor(widthPixels / (longestWordPixels + totalPaddingPixels(charWidthScale, paddingEm)))

  debug(`maximum possible fontSize [${fontSize}px] for width [${widthPixels}px] as longest word is [${longestWordCharacters}]`)

  return fontSize
}

export function ideal(
  sentences: ReadonlyArray<string>,
  elementHeightPx: number,
  elementWidthPx: number,
  charHeightScale: number,
  charWidthScale: number,
  paddingEm: number
): number {
  if (elementHeightPx <= 0 || elementWidthPx <= 0 || charHeightScale <= 0 || charWidthScale <= 0) {
    debug(`unable to calculate ideal fontSize for width [${elementWidthPx}px] height [${elementHeightPx}px] heightScale [${charHeightScale}px] widthScale [${charWidthScale}px]`)
    return MIN_FONT_SIZE
  }

  let fontSize = maximumPossibleFontSize(sentences, elementWidthPx, charWidthScale, paddingEm)

  while (fontSize > MIN_FONT_SIZE) {
    const numberOfLines = sentences.map((sentence: string) => linesRequired(sentence, elementWidthPx, charWidthScale, fontSize, paddingEm))
    const largestNumberOfLines = Math.max(...numberOfLines)
    const heightRequired = largestNumberOfLines * (charHeightScale * fontSize)
    const actualHeight = elementHeightPx - totalPaddingPixels(fontSize, paddingEm)
    if (heightRequired > actualHeight) {
      fontSize--
    } else {
      // -1px as this is the simplest way to avoid strange rounding behaviour resulting in some messages getting wrapped
      const roundingAdjustedFont = fontSize - 1
      debug(`calculated fontSize [${roundingAdjustedFont}px] for width [${elementWidthPx}px] height [${elementHeightPx}px] charHeightScale [${charHeightScale}px] charWidthScale [${charWidthScale}px]`, sentences)
      return roundingAdjustedFont
    }
  }

  debug(`unable to calculate ideal fontSize for width [${elementWidthPx}px] height [${elementHeightPx}px] charHeightScale [${charHeightScale}px] charWidthScale [${charWidthScale}px]`)
  return MIN_FONT_SIZE
}

interface ScaleTextProps {
  readonly sentences: ReadonlyArray<string>;
  readonly children: ReactNode;
}

export function ScaleText({sentences, children}: ScaleTextProps): ReactElement {
  const elementRef = useRef<HTMLDivElement>(null)
  const {height: fontHeight, width: fontWidth} = useContext(FontMetricsContext)
  const [{elementHeight, elementWidth}, setElementSize] = useState({elementWidth: 0, elementHeight: 0})

  const onResize = useCallback((currentSize: Measurable) => {
    setElementSize((previousSize) => {
      const heightChanged = Math.abs(currentSize.height - previousSize.elementHeight) > 1
      const widthChanged = Math.abs(currentSize.width - previousSize.elementWidth) > 1
      return heightChanged || widthChanged
        ? {elementWidth: currentSize.width, elementHeight: currentSize.height}
        : previousSize
    })
  }, [])

  useElementResized(elementRef, onResize)

  const idealFontStyle = useMemo(() => {
    const fontSize = ideal(
      sentences,
      elementHeight,
      elementWidth,
      fontHeight,
      fontWidth,
      0.5)

    return {fontSize: `${fontSize}px`, padding: '0.5em'}
  }, [sentences, elementHeight, elementWidth, fontHeight, fontWidth])

  return (
    <div className={styles.body}
         ref={elementRef}>
      <div style={idealFontStyle}>
        {children}
      </div>
    </div>
  )
}
