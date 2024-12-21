import type { ReactElement, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useMatch } from 'react-router'
import { matchSorter } from 'match-sorter'
import { isBlank } from '../common/Utils'
import isNil from 'lodash/isNil'
import cn from 'classnames'
import styles from './help-article.scss'
import { RoutePaths } from '../AppRoutes'

export interface HelpProps {
  readonly searchQuery: string
  readonly helpLink: (to: string) => ReactNode
}

interface KeywordProps {
  readonly keyword: string
  readonly matches: ReadonlyArray<string>
}

interface HelpArticleProps {
  readonly title: string
  readonly keywords: string[]
  readonly children: ReactNode
  readonly searchQuery: string
  readonly page?: RoutePaths
}

function Keyword({ keyword, matches }: KeywordProps) {
  const classes = cn(styles.keyword, {
    [styles.keywordMatched]: matches.includes(keyword),
  })
  return <li className={classes}>{keyword}</li>
}

export function HelpArticle({
  title,
  keywords,
  children,
  searchQuery,
  page,
}: HelpArticleProps): ReactElement | null {
  const match = useMatch(page ?? '')
  const routeMatches = !isNil(match)
  const [show, setShow] = useState(routeMatches)
  const [matches, setMatches] = useState<ReadonlyArray<string>>([])

  useEffect(() => {
    if (isBlank(searchQuery)) {
      setMatches([])
      setShow(routeMatches)
    } else {
      const keywordsMatched = matchSorter(keywords, searchQuery)
      setMatches(keywordsMatched)
      setShow(keywordsMatched.length > 0)
    }
  }, [keywords, searchQuery, page, routeMatches])

  if (show) {
    return (
      <li className={styles.help}>
        <h2>{title}</h2>
        <div className={styles.article}>{children}</div>
        <span>keywords:</span>
        <ul className={styles.keywords}>
          {keywords.map((keyword) => (
            <Keyword key={keyword} keyword={keyword} matches={matches} />
          ))}
        </ul>
      </li>
    )
  } else {
    return null
  }
}
