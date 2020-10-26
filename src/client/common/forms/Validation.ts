export type FormErrors<Fields> = Array<{
  readonly field: Fields;
  readonly message: string;
}>

export function firstError(field: string, errors: Readonly<FormErrors<unknown>>): string {
  return errors.find((e) => e.field === field)?.message ?? ''
}
