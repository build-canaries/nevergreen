import type { ReactElement, SVGProps } from 'react'
import healthyIconSvg from './healthy.svg'
import unknownIconSvg from './unknown.svg'
import healthyBuildingIconSvg from './healthy-building.svg'
import sickBuildingIconSvg from './sick-building.svg'
import sickIconSvg from './sick.svg'
import errorIconSvg from './error.svg'
import healthyIconPng from './healthy-192x192.png'
import unknownIconPng from './unknown-192x192.png'
import healthyBuildingIconPng from './healthy-building-192x192.png'
import sickBuildingIconPng from './sick-building-192x192.png'
import sickIconPng from './sick-192x192.png'
import errorIconPng from './error-192x192.png'
import { Prognosis } from '../../../domain/Project'
import { IconError } from './IconError'
import { IconSick } from './IconSick'
import { IconSickBuilding } from './IconSickBuilding'
import { IconHealthyBuilding } from './IconHealthyBuilding'
import { IconUnknown } from './IconUnknown'
import { IconHealthy } from './IconHealthy'

/*
 * These are used to change the browser favicon
 */
export const prognosisIconsSvg = {
  [Prognosis.healthy]: healthyIconSvg,
  [Prognosis.unknown]: unknownIconSvg,
  [Prognosis.healthyBuilding]: healthyBuildingIconSvg,
  [Prognosis.sickBuilding]: sickBuildingIconSvg,
  [Prognosis.sick]: sickIconSvg,
  [Prognosis.error]: errorIconSvg,
}

/*
 * These are used for notification icons, as svg isn't supported as far as I can find
 */
export const prognosisIconsPng = {
  [Prognosis.healthy]: healthyIconPng,
  [Prognosis.unknown]: unknownIconPng,
  [Prognosis.healthyBuilding]: healthyBuildingIconPng,
  [Prognosis.sickBuilding]: sickBuildingIconPng,
  [Prognosis.sick]: sickIconPng,
  [Prognosis.error]: errorIconPng,
}

interface PrognosisIconProps extends SVGProps<SVGSVGElement> {
  readonly prognosis: Prognosis
}

export function IconPrognosis({
  prognosis,
  ...props
}: PrognosisIconProps): ReactElement {
  switch (prognosis) {
    case Prognosis.error:
      return <IconError {...props} />
    case Prognosis.sick:
      return <IconSick {...props} />
    case Prognosis.sickBuilding:
      return <IconSickBuilding {...props} />
    case Prognosis.healthyBuilding:
      return <IconHealthyBuilding {...props} />
    case Prognosis.unknown:
      return <IconUnknown {...props} />
    case Prognosis.healthy:
      return <IconHealthy {...props} />
  }
}
