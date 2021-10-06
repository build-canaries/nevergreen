import React, {ReactElement} from 'react'
import {StyleGuideSection} from './StyleGuideSection'
import styles from './style-guide.scss'
import {Bin} from '../common/icons/Bin'
import {CheckboxChecked} from '../common/icons/CheckboxChecked'
import {CheckboxUnchecked} from '../common/icons/CheckboxUnchecked'
import {Checkmark} from '../common/icons/Checkmark'
import {CloudDownload} from '../common/icons/CloudDownload'
import {CloudUpload} from '../common/icons/CloudUpload'
import {Cog} from '../common/icons/Cog'
import {Cross} from '../common/icons/Cross'
import {Dice} from '../common/icons/Dice'
import {Display} from '../common/icons/Display'
import {Eye} from '../common/icons/Eye'
import {EyeBlocked} from '../common/icons/EyeBlocked'
import {FloppyDisk} from '../common/icons/FloppyDisk'
import {Lock} from '../common/icons/Lock'
import {Loop} from '../common/icons/Loop'
import {Bell} from '../common/icons/Bell'
import {Clock} from '../common/icons/Clock'
import {Paste} from '../common/icons/Paste'
import {Play} from '../common/icons/Play'
import {Plus} from '../common/icons/Plus'
import {Question} from '../common/icons/Question'
import {Stop} from '../common/icons/Stop'
import {Twitter} from '../common/icons/Twitter'
import {Unlocked} from '../common/icons/Unlocked'
import {FolderOpen} from '../common/icons/FolderOpen'
import {Warning} from '../common/icons/Warning'

export function Icons(): ReactElement {
  return (
    <StyleGuideSection title='Icons (in a Responsive Grid)'>
      <div className={styles.icons}>
        <span><Bell/>bell</span>
        <span><Bin/>bin</span>
        <span><CheckboxChecked/>checkbox checked</span>
        <span><CheckboxUnchecked/>checkbox unchecked</span>
        <span><Checkmark/>checkmark</span>
        <span><Clock/>clock</span>
        <span><CloudDownload/>cloud download</span>
        <span><CloudUpload/>cloud upload</span>
        <span><Cog/>cog</span>
        <span><Cross/>cross</span>
        <span><Dice/>dice</span>
        <span><Display/>display</span>
        <span><Eye/>eye</span>
        <span><EyeBlocked/>eye blocked</span>
        <span><FloppyDisk/>floppy disk</span>
        <span><FolderOpen/>folder open</span>
        <span><Lock/>lock</span>
        <span><Loop/>loop</span>
        <span><Paste/>paste</span>
        <span><Play/>play</span>
        <span><Plus/>plus</span>
        <span><Question/>question</span>
        <span><Stop/>stop</span>
        <span><Twitter/>twitter</span>
        <span><Unlocked/>unlocked</span>
        <span><Warning/>warning</span>
      </div>
    </StyleGuideSection>
  )
}
