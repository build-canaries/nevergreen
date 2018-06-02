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
        commitHash: {type: 'string', required: true}
      },
      additionalProperties: false
    },
    audioVisual: {
      type: 'object',
      properties: {
        showTrayName: {type: 'boolean'},
        showBuildTime: {type: 'boolean'},
        showBrokenBuildTime: {type: 'boolean'},
        showBuildLabel: {type: 'boolean'},
        playBrokenBuildSoundFx: {type: 'boolean'},
        brokenBuildSoundFx: {type: ['string', 'null']},
        refreshTime: {type: 'number'},
        maxProjectsToShow: {type: 'number'}
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
            serverType: {type: 'string'},
            username: {type: ['string', 'null']},
            password: {type: ['string', 'null']},
            timestamp: {type: ['string', 'null']}
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
                stage: {type: ['string', 'null']},
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
      type: 'array',
      items: {type: 'string'},
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
    },
    github: {
      type: 'object',
      properties: {
        gistId: {type: 'string'},
        description: {type: 'string'}
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
