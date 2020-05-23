import React, {ReactElement} from 'react'
import icons from '../common/fonts/icon-font.scss'
import {StyleGuideSection} from './StyleGuideSection'
import styles from './style-guide.scss'

export function Icons(): ReactElement {
  return (
    <StyleGuideSection title='Icons (in a Responsive Grid)'>
      <div className={styles.icons}>
        <span className={icons['icon-bin']}>bin</span>
        <span className={icons['icon-checkbox-checked']}>checkbox checked</span>
        <span className={icons['icon-checkbox-unchecked']}>checkbox unchecked</span>
        <span className={icons['icon-checkmark']}>checkmark</span>
        <span className={icons['icon-circle']}>circle</span>
        <span className={icons['icon-circle-down']}>circle down</span>
        <span className={icons['icon-circle-up']}>circle up</span>
        <span className={icons['icon-cloud-download']}>cloud download</span>
        <span className={icons['icon-cloud-upload']}>cloud upload</span>
        <span className={icons['icon-cog']}>cog</span>
        <span className={icons['icon-cross']}>cross</span>
        <span className={icons['icon-dice']}>dice</span>
        <span className={icons['icon-display']}>display</span>
        <span className={icons['icon-eye']}>eye</span>
        <span className={icons['icon-eye-blocked']}>eye blocked</span>
        <span className={icons['icon-floppy-disk']}>floppy disk</span>
        <span className={icons['icon-github4']}>github 4</span>
        <span className={icons['icon-hipster']}>hipster</span>
        <span className={icons['icon-list']}>list</span>
        <span className={icons['icon-lock']}>lock</span>
        <span className={icons['icon-loop2']}>loop 2</span>
        <span className={icons['icon-menu3']}>menu 3</span>
        <span className={icons['icon-menu4']}>menu 4</span>
        <span className={icons['icon-notification']}>notification</span>
        <span className={icons['icon-paste']}>paste</span>
        <span className={icons['icon-play3']}>play 3</span>
        <span className={icons['icon-plus']}>plus</span>
        <span className={icons['icon-question']}>question</span>
        <span className={icons['icon-stop2']}>stop 2</span>
        <span className={icons['icon-stopwatch']}>stopwatch</span>
        <span className={icons['icon-twitter3']}>twitter 3</span>
        <span className={icons['icon-unlocked']}>unlocked</span>
      </div>
    </StyleGuideSection>
  )
}
