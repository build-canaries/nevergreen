export function buildUrl(value: string, base?: string): URL | null {
  try {
    return new URL(value, base)
  } catch {
    return null
  }
}

export function removeScheme(value: string): string {
  const url = buildUrl(value)
  if (url) {
    return url.href.replace(url.protocol, '')
  }
  return value
}

export function isValidHttpUrl(value: string): boolean {
  const url = buildUrl(value)
  return url?.protocol === 'http:' || url?.protocol === 'https:'
}
