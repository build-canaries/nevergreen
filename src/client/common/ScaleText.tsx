import React, {ReactElement, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {flatten, memoize} from 'lodash'
import * as logger from './Logger'
import {PerformanceMark} from './Logger'
import {FontMetricsContext, Measurable} from '../FontMetrics'
import {useElementResized} from './ResizableHook'
import styles from './scaled-text.scss'
import {toJson} from './Json'

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
  // We are calculating the pixels the longest word takes at a font size of 1, so this needs to be 1 and not charWidthScale
  const fontSize = Math.floor(widthPixels / (longestWordPixels + totalPaddingPixels(1, paddingEm)))

  logger.debug('calculated maximum possible ideal font size', {
    fontSize,
    sentences,
    widthPixels,
    charWidthScale,
    paddingEm,
    longestWordCharacters,
    longestWordPixels
  })

  return fontSize
}

// exported for testing
export function ideal(
  sentences: ReadonlyArray<string>,
  elementHeightPx: number,
  elementWidthPx: number,
  charHeightScale: number,
  charWidthScale: number,
  paddingEm: number
): number {
  if (elementHeightPx <= 0 || elementWidthPx <= 0 || charHeightScale <= 0 || charWidthScale <= 0) {
    logger.debug('unable to calculate ideal font size because something is 0', {
      fontSize: MIN_FONT_SIZE,
      elementWidthPx,
      elementHeightPx,
      charHeightScale,
      charWidthScale,
      sentences,
      paddingEm
    })
    return MIN_FONT_SIZE
  }

  logger.mark(PerformanceMark.calculatingIdealFontSize)

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
      fontSize -= 1
      logger.debug('calculated ideal font size', {
        fontSize,
        elementWidthPx,
        elementHeightPx,
        charHeightScale,
        charWidthScale,
        sentences,
        paddingEm,
        numberOfLines,
        largestNumberOfLines,
        heightRequired,
        actualHeight
      })
      break
    }
  }

  logger.measure('Calculate ideal font size', PerformanceMark.calculatingIdealFontSize)
  return fontSize
}

function resolver(...args: unknown[]) {
  return JSON.stringify(args)
}

const idealMemorised = memoize(ideal, resolver)

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
      // Only trigger a change if we register more than a whole pixel of resize
      const heightChanged = Math.abs(currentSize.height - previousSize.elementHeight) > 1
      const widthChanged = Math.abs(currentSize.width - previousSize.elementWidth) > 1
      if (heightChanged || widthChanged) {
        return {
          elementWidth: Math.floor(currentSize.width),
          elementHeight: Math.floor(currentSize.height)
        }
      } else {
        return previousSize
      }
    })
  }, [])

  useElementResized(elementRef, onResize)

  const idealFontStyle = useMemo(() => {
    const fontSize = idealMemorised(
      sentences,
      elementHeight,
      elementWidth,
      fontHeight,
      fontWidth,
      0.5)

    return {fontSize: `${fontSize}px`, padding: '0.5em'}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toJson(sentences), elementHeight, elementWidth, fontHeight, fontWidth])

  useEffect(() => {
    return () => {
      // clear cache when unmounted, this is probably OK because if this has unmounted its likely the sentences have
      // changed resulting in a cache miss for the next render
      if (idealMemorised.cache.clear) {
        logger.debug('clearing the ideal font size cache')
        idealMemorised.cache.clear()
      }
    }
  }, [])

  return (
    <div className={styles.body}
         ref={elementRef}>
      <div style={idealFontStyle}>
        {children}
      </div>
    </div>
  )
}
