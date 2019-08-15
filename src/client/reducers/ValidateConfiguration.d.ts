declare function ValidateConfiguration(data: object): boolean;

// eslint-disable-next-line no-redeclare
declare namespace ValidateConfiguration {
  const errors: {
    dataPath: string;
    message: string;
  }[]
  const schema: object
}

export default ValidateConfiguration
