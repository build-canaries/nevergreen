import * as logger from '../../../common/Logger'

interface LoadedFile {
  readonly content: string;
  readonly filename: string;
}

const supportedFileTypes = ['application/json', 'text/plain']

function unsupportedMessage(file: File) {
  const supported = supportedFileTypes
    .map((s) => `"${s}"`)
    .join(' or ')
  return `Only ${supported} files are supported ("${file.name}" has type "${file.type}")`
}

export async function loadFile(file: File): Promise<LoadedFile> {
  return new Promise((resolve, reject) => {
    if (supportedFileTypes.some((supported) => supported === file.type)) {
      try {
        const fileReader = new FileReader()
        fileReader.onloadend = (result) => {
          resolve({
            content: result.target?.result as string,
            filename: file.name
          })
        }
        fileReader.readAsText(file)
      } catch (e) {
        logger.error('Unable to load file because of an error', e)
        reject(new Error('An error occurred while trying to open, please try again'))
      }
    } else {
      reject(new Error(unsupportedMessage(file)))
    }
  })
}
