import semver from 'semver'
import Package from '../../../../../package'

function currentVersion(data) {
  return data.nevergreen && data.nevergreen.versionNumber ? data.nevergreen.versionNumber : '0.0.0'
}

function addVersion() {
  return {
    nevergreen: {
      versionNumber: Package.version,
      versionName: Package.versionName,
      versionMeta: Package.versionMeta,
      commitHash: Package.commitHash,
    }
  }
}

function migrateDisplay(data) {
  let migrated = {}
  if (data.display) {
    migrated.audioVisual = {}
    if (data.display.showTrayName) {
      migrated.audioVisual.showTrayNameEnabled = data.display.showTrayName
    }
    if (data.display.showBrokenBuildTimers) {
      migrated.audioVisual.brokenBuildTimersEnabled = data.display.showBrokenBuildTimers
    }
    if (data.display.showBrokenBuildSounds) {
      migrated.audioVisual.brokenBuildSoundsEnabled = data.display.showBrokenBuildSounds
    }
    if (data.display.brokenBuildSoundFx) {
      migrated.audioVisual.brokenBuildSoundFx = data.display.brokenBuildSoundFx
    }
  }
  return migrated
}

function migrateSuccess(data) {
  let migrated = {}
  if (data.success && data.success.messages) {
    migrated.success = {}
    migrated.success.images = data.success.messages.filter((m) => m.startsWith('http'))
    migrated.success.texts = data.success.messages.filter((m) => !m.startsWith('http'))
  }
  return migrated
}

function migrateTrays(data) {
  let migrated = {}
  if (data.tray && data.tray.trays) {
    migrated.trays = data.tray.trays
  }
  return migrated
}

function migrateProjects(data) {
  let migrated = {}
  if (data.tray && data.tray.trays) {
    migrated.projects = Object.keys(data.tray.trays).reduce((reduction, trayId) => {
      reduction[trayId] = {}
      return reduction
    }, {})
  }
  return migrated
}

function migrateSelected(data) {
  let migrated = {}
  if (data.tray && data.tray.trays) {
    migrated.selected = Object.keys(data.tray.trays).reduce((reduction, trayId) => {
      reduction[trayId] = []
      return reduction
    }, {})
  }
  return migrated
}

export function migrate(data) {
  if (data && semver.lt(currentVersion(data), '0.11.0')) {
    return Object.assign({},
      addVersion(),
      migrateDisplay(data),
      migrateSuccess(data),
      migrateTrays(data),
      migrateProjects(data),
      migrateSelected(data))
  }

  return data
}

/*
 NEW

 "projects": {
 "2408514d-ee41-42e1-bc09-da7faad77caf": {
 "https://builds.apache.org/job/Knox-master-patch-scan/": {
 "removed": false,
 "name": "knox master patch scan",
 "projectId": "https://builds.apache.org/job/Knox-master-patch-scan/",
 "isNew": true,
 "stage": null
 }
 }
 }
 */

/*
 OLD

 "fetchedProjects": {
 "69d235ed-c2db-4f55-9ba5-5dbf1a651be1": [
 {
 "projectId": "a25veCBtYXN0ZXIgcGF0Y2ggc2Nhbi8v",
 "name": "knox master patch scan",
 "isNew": false,
 "wasRemoved": false
 }
 ]
 }
 */
