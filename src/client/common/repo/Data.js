import validator from 'is-my-json-valid'

export const schema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  required: true,
  type: 'object',
  properties: {
    nevergreen: {
      required: true,
      type: 'object',
      properties: {
        versionNumber: {type: 'string'},
        versionName: {type: 'string'},
        versionMeta: {type: 'string'},
        commitHash: {type: 'string'},
      },
      additionalProperties: false
    },
    audioVisual: {
      type: 'object',
      properties: {
        showTrayName: {type: 'boolean'},
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
            password: {type: 'string'}
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
  const validate = validator(schema, {greedy: true})
  validate(data)
  const errors = validate.errors
  return errors ? errors.map((error) => `${error.field} ${error.message}`) : []
}

export function filter(data) {
  const filter = validator.filter(schema)
  return filter(data)
}

export function asJson(data) {
  return JSON.stringify(filter(data), null, 2)
}
