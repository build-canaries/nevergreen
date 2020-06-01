// These need to match those in src/client/common/responsive.scss
const TABLET_BREAKPOINT = 768 // px
const DESKTOP_BREAKPOINT = 1440 // px

export function isMobile(width = window.innerWidth): boolean {
  return width < TABLET_BREAKPOINT
}

export function isTablet(width = window.innerWidth): boolean {
  return width >= TABLET_BREAKPOINT && width < DESKTOP_BREAKPOINT
}
