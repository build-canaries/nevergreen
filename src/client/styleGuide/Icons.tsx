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
import { IconSickBuilding } from '../common/icons/prognosis/IconSickBuilding'
import { IconError } from '../common/icons/prognosis/IconError'
import { IconUnknown } from '../common/icons/prognosis/IconUnknown'
import styles from './icons.scss'
import { ArrowLeft } from '../common/icons/ArrowLeft'
import { AidKit } from '../common/icons/AidKit'
import { Mute } from '../common/icons/Mute'
import { JsonLogo } from '../common/icons/JsonLogo'
import { GoCd } from '../common/icons/GoCd'
import { GitLabLogo } from '../common/icons/GitLabLogo'
import { GitHubLogo } from '../common/icons/GitHubLogo'
import { CircleCi } from '../common/icons/CircleCi'
import { MenuClose } from '../common/icons/MenuClose'
import { MenuOpen } from '../common/icons/MenuOpen'

export function Icons(): ReactElement {
  return (
    <StyleGuideSection title="Icons (in a Responsive Grid)">
      <div className={styles.icons}>
        <span>
          <IconError />
          error prognosis
        </span>
        <span>
          <IconSick />
          sick prognosis
        </span>
        <span>
          <IconSickBuilding />
          sick building prognosis
        </span>
        <span>
          <IconHealthyBuilding />
          healthy building prognosis
        </span>
        <span>
          <IconHealthy />
          healthy prognosis
        </span>
        <span>
          <IconUnknown />
          unknown prognosis
        </span>
        <span>
          <AidKit />
          aid kit
        </span>
        <span>
          <ArrowLeft />
          arrow left
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
          <CircleCi />
          circle ci
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
          <GitHubLogo />
          github logo
        </span>
        <span>
          <GitLabLogo />
          gitlab logo
        </span>
        <span>
          <GoCd />
          gocd
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
          <JsonLogo />
          json logo
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
          <MenuClose />
          menu close
        </span>
        <span>
          <MenuOpen />
          menu open
        </span>
        <span>
          <Mute />
          mute
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
