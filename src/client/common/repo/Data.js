import validator from 'is-my-json-valid'

export const SCHEMA = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  required: true,
  type: 'object',
  properties: {
    nevergreen: {
      required: true,
      type: 'object',
      properties: {
        versionNumber: {type: 'string', required: true},
        versionName: {type: 'string', required: true},
        versionMeta: {type: 'string', required: true},
        commitHash: {type: 'string', required: true},
      },
      additionalProperties: false
    },
    audioVisual: {
      type: 'object',
      properties: {
        showTrayNameEnabled: {type: 'boolean'},
        brokenBuildTimersEnabled: {type: 'boolean'},
        brokenBuildSoundsEnabled: {type: 'boolean'},
        brokenBuildSoundFx: {type: 'string'}
      },
      additionalProperties: false
    },
    trays: {
      type: 'object',
      patternProperties: {
        '.*': { // trayId
          type: 'object',
          properties: {
            trayId: {required: true, type: 'string'},
            url: {required: true, type: 'string'},
            name: {type: 'string'},
            username: {type: 'string'},
            password: {type: 'string'},
            timestamp: {type: 'string'}
          },
          additionalProperties: false
        }
      }
    },
    projects: {
      type: 'object',
      patternProperties: {
        '.*': { // trayId
          type: 'object',
          patternProperties: {
            '.*': { // projectId
              type: 'object',
              properties: {
                projectId: {required: true, type: 'string'},
                name: {required: true, type: 'string'},
                removed: {type: 'boolean'},
                isNew: {type: 'boolean'}
              },
              additionalProperties: false
            }
          }
        }
      }
    },
    success: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {type: 'string'}
        },
        texts: {
          type: 'array',
          items: {type: 'string'}
        }
      },
      additionalProperties: false
    },
    selected: {
      type: 'object',
      patternProperties: {
        '.*': { // trayId
          type: 'array',
          items: {type: 'string'}
        },
        additionalProperties: false
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
}

export function validate(data) {
  const validate = validator(SCHEMA, {greedy: true, verbose: true})
  validate(data)
  const errors = validate.errors
  return errors ? errors.map((error) => `'${error.field}' ${error.message}, expected '${error.type}' got '${error.value}'`) : []
}

export function filter(data) {
  const filter = validator.filter(SCHEMA)
  return filter(data)
}
