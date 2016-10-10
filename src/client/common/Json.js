export function toJson(o) {
  return JSON.stringify(o, null, 2)
}

export function fromJson(s) {
  try {
    return JSON.parse(s)
  } catch (e) {
    throw e.message
  }
}
