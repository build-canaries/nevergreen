// These need to match those in src/client/common/responsive.scss
const tabletBreakpoint = 768 // px
const desktopBreakpoint = 1440 // px

export function isMobile(width = window.innerWidth): boolean {
  return width < tabletBreakpoint
}

export function isTablet(width = window.innerWidth): boolean {
  return width >= tabletBreakpoint && width < desktopBreakpoint
}
