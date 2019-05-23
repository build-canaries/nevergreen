export function toJson(o: object) {
  return JSON.stringify(o, null, 2)
}

export function fromJson(s: string) {
  return JSON.parse(s)
}
