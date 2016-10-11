import semver from 'semver'
import Package from '../../../../../package'

function currentVersion(data) {
  return data.nevergreen && data.nevergreen.versionNumber ? data.nevergreen.versionNumber : '0.0.0'
}

export function migrate(data) {
  if (data && semver.lt(currentVersion(data), '0.11.0')) {
    data.nevergreen = {
      versionNumber: Package.version,
      versionName: Package.versionName,
      versionMeta: Package.versionMeta,
      commitHash: Package.commitHash,
    }

    if (data.display) {
      data.audioVisual = {
        showTrayNameEnabled: data.display.showTrayName,
        brokenBuildTimersEnabled: data.display.showBrokenBuildTimers,
        brokenBuildSoundsEnabled: data.display.showBrokenBuildSounds,
        brokenBuildSoundFx: data.display.brokenBuildSoundFx
      }
      delete data.display
    }

    if (data.success && data.success.messages) {
      data.success.images = data.success.messages.filter((m) => m.startsWith('http'))
      data.success.texts = data.success.messages.filter((m) => !m.startsWith('http'))
      delete data.success.messages
    }

    if (data.tray && data.tray.trays) {
      data.trays = data.tray.trays
      delete data.tray.trays
    }
  }

  return data
}
