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

export function removeError<Fields extends string>(
  field: Fields,
  errors: Readonly<FormErrors<Fields>>,
): Readonly<FormErrors<Fields>> {
  return errors.filter((e) => e.field !== field)
}

export function removeErrorFromState<Fields extends string>(
  field: Fields,
): (errors: Readonly<FormErrors<Fields>>) => Readonly<FormErrors<Fields>> {
  return (errors: Readonly<FormErrors<Fields>>) =>
    removeError<Fields>(field, errors)
}
