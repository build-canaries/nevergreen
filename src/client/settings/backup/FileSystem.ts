import * as logger from '../../common/Logger'
import format from 'date-fns/format'

interface LoadedFile {
  readonly content: string
  readonly filename: string
}

const supportedFileTypes = ['application/json', 'text/plain']

function unsupportedMessage(file: File) {
  const supported = supportedFileTypes.map((s) => `"${s}"`).join(' or ')
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
            filename: file.name,
          })
        }
        fileReader.readAsText(file)
      } catch (e) {
        logger.error('Unable to load file because of an error', e)
        reject(
          new Error('An error occurred while trying to open, please try again'),
        )
      }
    } else {
      reject(new Error(unsupportedMessage(file)))
    }
  })
}

export function saveFile(configuration: string): void {
  const timestamp = format(new Date(), 'yyyyMMddHHmmssSSS')
  const file = new Blob([configuration], { type: 'application/json' })
  const a = document.createElement('a')

  a.href = URL.createObjectURL(file)
  a.download = `nevergreen-configuration-backup-${timestamp}.json`
  a.click()

  URL.revokeObjectURL(a.href)
}
