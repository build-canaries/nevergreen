import type { ReactElement } from 'react'
import { StyleGuideSection } from './StyleGuideSection'
import { Bin } from '../common/icons/Bin'
import { CheckboxChecked } from '../common/icons/CheckboxChecked'
import { CheckboxUnchecked } from '../common/icons/CheckboxUnchecked'
import { Checkmark } from '../common/icons/Checkmark'
import { CloudDownload } from '../common/icons/CloudDownload'
import { CloudUpload } from '../common/icons/CloudUpload'
import { Cog } from '../common/icons/Cog'
import { Cogs } from '../common/icons/Cogs'
import { Cross } from '../common/icons/Cross'
import { Dice } from '../common/icons/Dice'
import { Display } from '../common/icons/Display'
import { Eye } from '../common/icons/Eye'
import { EyeBlocked } from '../common/icons/EyeBlocked'
import { FloppyDisk } from '../common/icons/FloppyDisk'
import { Lock } from '../common/icons/Lock'
import { Loop } from '../common/icons/Loop'
import { Bell } from '../common/icons/Bell'
import { Clock } from '../common/icons/Clock'
import { Paste } from '../common/icons/Paste'
import { Play } from '../common/icons/Play'
import { Plus } from '../common/icons/Plus'
import { Question } from '../common/icons/Question'
import { Stop } from '../common/icons/Stop'
import { Twitter } from '../common/icons/Twitter'
import { Unlocked } from '../common/icons/Unlocked'
import { FolderOpen } from '../common/icons/FolderOpen'
import { Warning } from '../common/icons/Warning'
import { List } from '../common/icons/List'
import { Xml } from '../common/icons/Xml'
import { Image } from '../common/icons/Image'
import { Info } from '../common/icons/Info'
import { ArrowUp } from '../common/icons/ArrowUp'
import { Note } from '../common/icons/Note'
import { PaintFormat } from '../common/icons/PaintFormat'
import { IconHealthyBuilding } from '../common/icons/prognosis/IconHealthyBuilding'
import { IconHealthy } from '../common/icons/prognosis/IconHealthy'
import { IconSick } from '../common/icons/prognosis/IconSick'
import styles from './style-guide.scss'
import { IconSickBuilding } from '../common/icons/prognosis/IconSickBuilding'
import { IconError } from '../common/icons/prognosis/IconError'

export function Icons(): ReactElement {
  return (
    <StyleGuideSection title="Icons (in a Responsive Grid)">
      <div className={styles.icons}>
        <span>
          <IconError />
          error
        </span>
        <span>
          <IconSick />
          sick
        </span>
        <span>
          <IconSickBuilding />
          sick building
        </span>
        <span>
          <IconHealthyBuilding />
          healthy building
        </span>
        <span>
          <IconHealthy />
          healthy
        </span>
        <span>
          <ArrowUp />
          arrow up
        </span>
        <span>
          <Bell />
          bell
        </span>
        <span>
          <Bin />
          bin
        </span>
        <span>
          <CheckboxChecked />
          checkbox checked
        </span>
        <span>
          <CheckboxUnchecked />
          checkbox unchecked
        </span>
        <span>
          <Checkmark />
          checkmark
        </span>
        <span>
          <Clock />
          clock
        </span>
        <span>
          <CloudDownload />
          cloud download
        </span>
        <span>
          <CloudUpload />
          cloud upload
        </span>
        <span>
          <Cog />
          cog
        </span>
        <span>
          <Cogs />
          cogs
        </span>
        <span>
          <Cross />
          cross
        </span>
        <span>
          <Dice />
          dice
        </span>
        <span>
          <Display />
          display
        </span>
        <span>
          <Eye />
          eye
        </span>
        <span>
          <EyeBlocked />
          eye blocked
        </span>
        <span>
          <FloppyDisk />
          floppy disk
        </span>
        <span>
          <FolderOpen />
          folder open
        </span>
        <span>
          <Image />
          image
        </span>
        <span>
          <Info />
          info
        </span>
        <span>
          <List />
          list
        </span>
        <span>
          <Lock />
          lock
        </span>
        <span>
          <Loop />
          loop
        </span>
        <span>
          <Note />
          note
        </span>
        <span>
          <PaintFormat />
          paint format
        </span>
        <span>
          <Paste />
          paste
        </span>
        <span>
          <Play />
          play
        </span>
        <span>
          <Plus />
          plus
        </span>
        <span>
          <Question />
          question
        </span>
        <span>
          <Stop />
          stop
        </span>
        <span>
          <Twitter />
          twitter
        </span>
        <span>
          <Unlocked />
          unlocked
        </span>
        <span>
          <Warning />
          warning
        </span>
        <span>
          <Xml />
          xml
        </span>
      </div>
    </StyleGuideSection>
  )
}
