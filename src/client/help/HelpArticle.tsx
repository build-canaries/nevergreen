import React, {ReactNode, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import matchSorter from 'match-sorter'
import {isBlank} from '../common/Utils'
import cn from 'classnames'
import styles from './help-article.scss'

export interface HelpProps {
  readonly searchQuery: string;
  readonly helpLink: (to: string) => ReactNode;
}

interface KeywordProps {
  readonly keyword: string;
  readonly matches: ReadonlyArray<string>;
}

interface HelpArticleProps {
  readonly title: string;
  readonly keywords: ReadonlyArray<string>;
  readonly children: ReactNode;
  readonly searchQuery: string;
  readonly page?: string;
}

function Keyword({keyword, matches}: KeywordProps) {
  const classes = cn(styles.keyword, {
    [styles.keywordMatched]: matches.includes(keyword)
  })
  return (
    <li className={classes}>{keyword}</li>
  )
}

export function HelpArticle({title, keywords, children, searchQuery, page}: HelpArticleProps) {
  const location = useLocation()
  const [show, setShow] = useState(location.pathname === page)
  const [matches, setMatches] = useState<ReadonlyArray<string>>([])

  useEffect(() => {
    if (isBlank(searchQuery)) {
      setMatches([])
      setShow(location.pathname === page)
    } else {
      const keywordsMatched = matchSorter(keywords, searchQuery)
      setMatches(keywordsMatched)
      setShow(keywordsMatched.length > 0)
    }
  }, [keywords, searchQuery, location, page])

  if (show) {
    return (
      <li className={styles.help}>
        <h4>{title}</h4>
        <div className={styles.article}>{children}</div>
        <ul className={styles.keywords}>
          <aside>
            <span>keywords:</span>
            {keywords.map((keyword) => <Keyword key={keyword}
                                                keyword={keyword}
                                                matches={matches}/>)}
          </aside>
        </ul>
      </li>
    )
  } else {
    return null
  }
}
