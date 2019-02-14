import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from './locally.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iFloppyDisk} from '../../../common/fonts/Icons'

const PLACEHOLDER = 'paste exported configuration here and press import'

export function Locally({importData}) {
  const [data, setData] = useState('')

  return (
    <>
      <label>
        <span className={styles.label}>configuration to import</span>
        <textarea className={styles.data}
                  placeholder={PLACEHOLDER}
                  value={data}
                  onChange={({target}) => setData(target.value)}
                  spellCheck='false'
                  data-locator='import-data'/>
      </label>
      <PrimaryButton className={styles.import}
                     onClick={() => importData(data)}
                     data-locator='import'
                     icon={iFloppyDisk}>
        import
      </PrimaryButton>
    </>
  )
}

Locally.propTypes = {
  importData: PropTypes.func.isRequired
}
