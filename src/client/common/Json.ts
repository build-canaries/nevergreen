export function toJson(o: unknown): string {
  return JSON.stringify(o, null, 2)
}

export function fromJson(s: string): Record<string, unknown> {
  return JSON.parse(s) as Record<string, unknown>
}
