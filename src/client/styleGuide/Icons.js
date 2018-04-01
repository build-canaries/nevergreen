import React, {Component} from 'react'
import icons from '../common/fonts/icon-font.scss'
import StyleGuideSection from './StyleGuideSection'

class Icons extends Component {
  render() {
    return (
      <StyleGuideSection title='Icons'>
        <div className={icons['icon-bin']}>bin</div>
        <div className={icons['icon-checkbox-checked']}>checkbox checked</div>
        <div className={icons['icon-checkbox-unchecked']}>checkbox unchecked</div>
        <div className={icons['icon-checkmark']}>checkmark</div>
        <div className={icons['icon-circle']}>circle</div>
        <div className={icons['icon-circle-down']}>circle down</div>
        <div className={icons['icon-circle-up']}>circle up</div>
        <div className={icons['icon-cloud-download']}>cloud download</div>
        <div className={icons['icon-cloud-upload']}>cloud upload</div>
        <div className={icons['icon-cog']}>cog</div>
        <div className={icons['icon-cross']}>cross</div>
        <div className={icons['icon-dice']}>dice</div>
        <div className={icons['icon-display']}>display</div>
        <div className={icons['icon-eye']}>eye</div>
        <div className={icons['icon-eye-blocked']}>eye blocked</div>
        <div className={icons['icon-floppy-disk']}>floppy disk</div>
        <div className={icons['icon-github4']}>github 4</div>
        <div className={icons['icon-hipster']}>hipster</div>
        <div className={icons['icon-list']}>list</div>
        <div className={icons['icon-list2']}>list 2</div>
        <div className={icons['icon-lock']}>lock</div>
        <div className={icons['icon-loop2']}>loop 2</div>
        <div className={icons['icon-menu3']}>menu 3</div>
        <div className={icons['icon-menu4']}>menu 4</div>
        <div className={icons['icon-notification']}>notification</div>
        <div className={icons['icon-paste']}>paste</div>
        <div className={icons['icon-play3']}>play 3</div>
        <div className={icons['icon-plus']}>plus</div>
        <div className={icons['icon-question']}>question</div>
        <div className={icons['icon-stop2']}>stop 2</div>
        <div className={icons['icon-twitter3']}>twitter 3</div>
        <div className={icons['icon-unlocked']}>unlocked</div>
      </StyleGuideSection>
    )
  }
}

export default Icons
