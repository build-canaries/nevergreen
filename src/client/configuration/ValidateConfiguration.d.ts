declare function ValidateConfiguration(data: Record<string, unknown>): boolean;

// eslint-disable-next-line no-redeclare
declare namespace ValidateConfiguration {
  const errors: {
    dataPath: string;
    message: string;
  }[]
  const schema: Record<string, unknown>
}

export default ValidateConfiguration
