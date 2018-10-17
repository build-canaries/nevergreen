export function toJson(o) {
  return JSON.stringify(o, null, 2)
}

export function fromJson(s) {
  return JSON.parse(s)
}
