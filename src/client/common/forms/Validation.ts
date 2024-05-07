export type FormErrors<Fields extends string> = Array<{
  readonly field: Fields
  readonly message: string
}>

export function firstError<Fields extends string>(
  field: Fields,
  errors: Readonly<FormErrors<Fields>>,
): string {
  return errors.find((e) => e.field === field)?.message ?? ''
}

export function allErrors<Fields extends string>(
  field: Fields,
  errors: Readonly<FormErrors<Fields>>,
): ReadonlyArray<string> {
  return errors.filter((e) => e.field === field).map((e) => e.message)
}
