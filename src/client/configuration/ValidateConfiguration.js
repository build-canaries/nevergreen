'use strict';
var equal = require('ajv/lib/compile/equal');
var validate = (function() {
  var pattern0 = new RegExp('.*');
  var pattern1 = new RegExp('additionalProperties');
  var refVal = [];
  return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
    'use strict'; /*# sourceURL=https://nevergreen.io/schema.json */
    var vErrors = null;
    var errors = 0;
    if ((data && typeof data === "object" && !Array.isArray(data))) {
      var errs__0 = errors;
      var valid1 = true;
      for (var key0 in data) {
        var isAdditional0 = !(false || key0 == 'settings' || key0 == 'trays' || key0 == 'projects' || key0 == 'success' || key0 == 'selected' || key0 == 'backup' || key0 == 'appliedMigrations');
        if (isAdditional0) {
          delete data[key0];
        }
      }
      var data1 = data.settings;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
          var errs__1 = errors;
          var valid2 = true;
          for (var key1 in data1) {
            var isAdditional1 = !(false || validate.schema.properties.settings.properties.hasOwnProperty(key1));
            if (isAdditional1) {
              delete data1[key1];
            }
          }
          if (data1.showTrayName !== undefined) {
            var errs_2 = errors;
            if (typeof data1.showTrayName !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.showTrayName',
                schemaPath: '#/properties/settings/properties/showTrayName/type',
                params: {
                  type: 'boolean'
                },
                message: 'should be boolean'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
          if (data1.showBuildTime !== undefined) {
            var errs_2 = errors;
            if (typeof data1.showBuildTime !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.showBuildTime',
                schemaPath: '#/properties/settings/properties/showBuildTime/type',
                params: {
                  type: 'boolean'
                },
                message: 'should be boolean'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
          if (data1.showBuildLabel !== undefined) {
            var errs_2 = errors;
            if (typeof data1.showBuildLabel !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.showBuildLabel',
                schemaPath: '#/properties/settings/properties/showBuildLabel/type',
                params: {
                  type: 'boolean'
                },
                message: 'should be boolean'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
          if (data1.showSystemNotifications !== undefined) {
            var errs_2 = errors;
            if (typeof data1.showSystemNotifications !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.showSystemNotifications',
                schemaPath: '#/properties/settings/properties/showSystemNotifications/type',
                params: {
                  type: 'boolean'
                },
                message: 'should be boolean'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
          if (data1.playBrokenBuildSoundFx !== undefined) {
            var errs_2 = errors;
            if (typeof data1.playBrokenBuildSoundFx !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.playBrokenBuildSoundFx',
                schemaPath: '#/properties/settings/properties/playBrokenBuildSoundFx/type',
                params: {
                  type: 'boolean'
                },
                message: 'should be boolean'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
          var data2 = data1.brokenBuildSoundFx;
          if (data2 !== undefined) {
            var errs_2 = errors;
            if (typeof data2 !== "string" && data2 !== null) {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.brokenBuildSoundFx',
                schemaPath: '#/properties/settings/properties/brokenBuildSoundFx/type',
                params: {
                  type: 'string,null'
                },
                message: 'should be string,null'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
          if (data1.refreshTime !== undefined) {
            var errs_2 = errors;
            if (typeof data1.refreshTime !== "number") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.refreshTime',
                schemaPath: '#/properties/settings/properties/refreshTime/type',
                params: {
                  type: 'number'
                },
                message: 'should be number'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
          var data2 = data1.maxProjectsToShow;
          if (data2 !== undefined) {
            var errs_2 = errors;
            if (typeof data2 !== "string") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.maxProjectsToShow',
                schemaPath: '#/properties/settings/properties/maxProjectsToShow/type',
                params: {
                  type: 'string'
                },
                message: 'should be string'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var schema2 = validate.schema.properties.settings.properties.maxProjectsToShow.enum;
            var valid2;
            valid2 = false;
            for (var i2 = 0; i2 < schema2.length; i2++)
              if (equal(data2, schema2[i2])) {
                valid2 = true;
                break;
              } if (!valid2) {
              var err = {
                keyword: 'enum',
                dataPath: (dataPath || '') + '.settings.maxProjectsToShow',
                schemaPath: '#/properties/settings/properties/maxProjectsToShow/enum',
                params: {
                  allowedValues: schema2
                },
                message: 'should be equal to one of the allowed values'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
          if (data1.clickToShowMenu !== undefined) {
            var errs_2 = errors;
            if (typeof data1.clickToShowMenu !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.clickToShowMenu',
                schemaPath: '#/properties/settings/properties/clickToShowMenu/type',
                params: {
                  type: 'boolean'
                },
                message: 'should be boolean'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
          var data2 = data1.showPrognosis;
          if (data2 !== undefined) {
            var errs_2 = errors;
            if (Array.isArray(data2)) {
              var errs__2 = errors;
              var valid2;
              for (var i2 = 0; i2 < data2.length; i2++) {
                var errs_3 = errors;
                if (typeof data2[i2] !== "string") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.settings.showPrognosis[' + i2 + ']',
                    schemaPath: '#/properties/settings/properties/showPrognosis/items/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
            } else {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.showPrognosis',
                schemaPath: '#/properties/settings/properties/showPrognosis/type',
                params: {
                  type: 'array'
                },
                message: 'should be array'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
          if (data1.sort !== undefined) {
            var errs_2 = errors;
            if (typeof data1.sort !== "string") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.settings.sort',
                schemaPath: '#/properties/settings/properties/sort/type',
                params: {
                  type: 'string'
                },
                message: 'should be string'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.settings',
            schemaPath: '#/properties/settings/type',
            params: {
              type: 'object'
            },
            message: 'should be object'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.trays;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
          var errs__1 = errors;
          var valid2 = true;
          for (var key1 in data1) {
            var isAdditional1 = !(false || pattern0.test(key1));
          }
          for (var key1 in data1) {
            if (pattern0.test(key1)) {
              var data2 = data1[key1];
              var errs_2 = errors;
              if ((data2 && typeof data2 === "object" && !Array.isArray(data2))) {
                var errs__2 = errors;
                var valid3 = true;
                for (var key2 in data2) {
                  var isAdditional2 = !(false || validate.schema.properties.trays.patternProperties['.*'].properties.hasOwnProperty(key2));
                  if (isAdditional2) {
                    delete data2[key2];
                  }
                }
                if (data2.trayId === undefined) {
                  valid3 = false;
                  var err = {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '.trays[\'' + key1 + '\']',
                    schemaPath: '#/properties/trays/patternProperties/.*/required',
                    params: {
                      missingProperty: 'trayId'
                    },
                    message: 'should have required property \'trayId\''
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                } else {
                  var errs_3 = errors;
                  if (typeof data2.trayId !== "string") {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].trayId',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/trayId/type',
                      params: {
                        type: 'string'
                      },
                      message: 'should be string'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                if (data2.url === undefined) {
                  valid3 = false;
                  var err = {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '.trays[\'' + key1 + '\']',
                    schemaPath: '#/properties/trays/patternProperties/.*/required',
                    params: {
                      missingProperty: 'url'
                    },
                    message: 'should have required property \'url\''
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                } else {
                  var errs_3 = errors;
                  if (typeof data2.url !== "string") {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].url',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/url/type',
                      params: {
                        type: 'string'
                      },
                      message: 'should be string'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                if (data2.name !== undefined) {
                  var errs_3 = errors;
                  if (typeof data2.name !== "string") {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].name',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/name/type',
                      params: {
                        type: 'string'
                      },
                      message: 'should be string'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                if (data2.serverType !== undefined) {
                  var errs_3 = errors;
                  if (typeof data2.serverType !== "string") {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].serverType',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/serverType/type',
                      params: {
                        type: 'string'
                      },
                      message: 'should be string'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                if (data2.authType !== undefined) {
                  var errs_3 = errors;
                  if (typeof data2.authType !== "string") {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].authType',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/authType/type',
                      params: {
                        type: 'string'
                      },
                      message: 'should be string'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                var data3 = data2.username;
                if (data3 !== undefined) {
                  var errs_3 = errors;
                  if (typeof data3 !== "string" && data3 !== null) {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].username',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/username/type',
                      params: {
                        type: 'string,null'
                      },
                      message: 'should be string,null'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                var data3 = data2.encryptedPassword;
                if (data3 !== undefined) {
                  var errs_3 = errors;
                  if (typeof data3 !== "string" && data3 !== null) {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].encryptedPassword',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/encryptedPassword/type',
                      params: {
                        type: 'string,null'
                      },
                      message: 'should be string,null'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                var data3 = data2.encryptedAccessToken;
                if (data3 !== undefined) {
                  var errs_3 = errors;
                  if (typeof data3 !== "string" && data3 !== null) {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].encryptedAccessToken',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/encryptedAccessToken/type',
                      params: {
                        type: 'string,null'
                      },
                      message: 'should be string,null'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                var data3 = data2.timestamp;
                if (data3 !== undefined) {
                  var errs_3 = errors;
                  if (typeof data3 !== "string" && data3 !== null) {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].timestamp',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/timestamp/type',
                      params: {
                        type: 'string,null'
                      },
                      message: 'should be string,null'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                if (data2.includeNew !== undefined) {
                  var errs_3 = errors;
                  if (typeof data2.includeNew !== "boolean") {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].includeNew',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/includeNew/type',
                      params: {
                        type: 'boolean'
                      },
                      message: 'should be boolean'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
              } else {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.trays[\'' + key1 + '\']',
                  schemaPath: '#/properties/trays/patternProperties/.*/type',
                  params: {
                    type: 'object'
                  },
                  message: 'should be object'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
              var valid2 = errors === errs_2;
            }
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.trays',
            schemaPath: '#/properties/trays/type',
            params: {
              type: 'object'
            },
            message: 'should be object'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.projects;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
          var errs__1 = errors;
          var valid2 = true;
          for (var key1 in data1) {
            var isAdditional1 = !(false || pattern0.test(key1));
          }
          for (var key1 in data1) {
            if (pattern0.test(key1)) {
              var data2 = data1[key1];
              var errs_2 = errors;
              if (Array.isArray(data2)) {
                var errs__2 = errors;
                var valid2;
                for (var i2 = 0; i2 < data2.length; i2++) {
                  var data3 = data2[i2];
                  var errs_3 = errors;
                  if ((data3 && typeof data3 === "object" && !Array.isArray(data3))) {
                    var errs__3 = errors;
                    var valid4 = true;
                    for (var key3 in data3) {
                      var isAdditional3 = !(false || key3 == 'projectId' || key3 == 'description' || key3 == 'removed' || key3 == 'isNew' || key3 == 'trayId');
                      if (isAdditional3) {
                        delete data3[key3];
                      }
                    }
                    if (data3.projectId === undefined) {
                      valid4 = false;
                      var err = {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][' + i2 + ']',
                        schemaPath: '#/properties/projects/patternProperties/.*/items/required',
                        params: {
                          missingProperty: 'projectId'
                        },
                        message: 'should have required property \'projectId\''
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    } else {
                      var errs_4 = errors;
                      if (typeof data3.projectId !== "string") {
                        var err = {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][' + i2 + '].projectId',
                          schemaPath: '#/properties/projects/patternProperties/.*/items/properties/projectId/type',
                          params: {
                            type: 'string'
                          },
                          message: 'should be string'
                        };
                        if (vErrors === null) vErrors = [err];
                        else vErrors.push(err);
                        errors++;
                      }
                      var valid4 = errors === errs_4;
                    }
                    if (data3.description === undefined) {
                      valid4 = false;
                      var err = {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][' + i2 + ']',
                        schemaPath: '#/properties/projects/patternProperties/.*/items/required',
                        params: {
                          missingProperty: 'description'
                        },
                        message: 'should have required property \'description\''
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    } else {
                      var errs_4 = errors;
                      if (typeof data3.description !== "string") {
                        var err = {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][' + i2 + '].description',
                          schemaPath: '#/properties/projects/patternProperties/.*/items/properties/description/type',
                          params: {
                            type: 'string'
                          },
                          message: 'should be string'
                        };
                        if (vErrors === null) vErrors = [err];
                        else vErrors.push(err);
                        errors++;
                      }
                      var valid4 = errors === errs_4;
                    }
                    if (data3.removed !== undefined) {
                      var errs_4 = errors;
                      if (typeof data3.removed !== "boolean") {
                        var err = {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][' + i2 + '].removed',
                          schemaPath: '#/properties/projects/patternProperties/.*/items/properties/removed/type',
                          params: {
                            type: 'boolean'
                          },
                          message: 'should be boolean'
                        };
                        if (vErrors === null) vErrors = [err];
                        else vErrors.push(err);
                        errors++;
                      }
                      var valid4 = errors === errs_4;
                    }
                    if (data3.isNew !== undefined) {
                      var errs_4 = errors;
                      if (typeof data3.isNew !== "boolean") {
                        var err = {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][' + i2 + '].isNew',
                          schemaPath: '#/properties/projects/patternProperties/.*/items/properties/isNew/type',
                          params: {
                            type: 'boolean'
                          },
                          message: 'should be boolean'
                        };
                        if (vErrors === null) vErrors = [err];
                        else vErrors.push(err);
                        errors++;
                      }
                      var valid4 = errors === errs_4;
                    }
                    if (data3.trayId === undefined) {
                      valid4 = false;
                      var err = {
                        keyword: 'required',
                        dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][' + i2 + ']',
                        schemaPath: '#/properties/projects/patternProperties/.*/items/required',
                        params: {
                          missingProperty: 'trayId'
                        },
                        message: 'should have required property \'trayId\''
                      };
                      if (vErrors === null) vErrors = [err];
                      else vErrors.push(err);
                      errors++;
                    } else {
                      var errs_4 = errors;
                      if (typeof data3.trayId !== "string") {
                        var err = {
                          keyword: 'type',
                          dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][' + i2 + '].trayId',
                          schemaPath: '#/properties/projects/patternProperties/.*/items/properties/trayId/type',
                          params: {
                            type: 'string'
                          },
                          message: 'should be string'
                        };
                        if (vErrors === null) vErrors = [err];
                        else vErrors.push(err);
                        errors++;
                      }
                      var valid4 = errors === errs_4;
                    }
                  } else {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][' + i2 + ']',
                      schemaPath: '#/properties/projects/patternProperties/.*/items/type',
                      params: {
                        type: 'object'
                      },
                      message: 'should be object'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
              } else {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.projects[\'' + key1 + '\']',
                  schemaPath: '#/properties/projects/patternProperties/.*/type',
                  params: {
                    type: 'array'
                  },
                  message: 'should be array'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
              var valid2 = errors === errs_2;
            }
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.projects',
            schemaPath: '#/properties/projects/type',
            params: {
              type: 'object'
            },
            message: 'should be object'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.success;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var errs_2 = errors;
            if (typeof data1[i1] !== "string") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.success[' + i1 + ']',
                schemaPath: '#/properties/success/items/type',
                params: {
                  type: 'string'
                },
                message: 'should be string'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.success',
            schemaPath: '#/properties/success/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
          var errs__1 = errors;
          var valid2 = true;
          for (var key1 in data1) {
            delete data1[key1];
          }
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.selected;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
          var errs__1 = errors;
          var valid2 = true;
          for (var key1 in data1) {
            var isAdditional1 = !(false || pattern0.test(key1) || pattern1.test(key1));
            if (isAdditional1) {
              delete data1[key1];
            }
          }
          for (var key1 in data1) {
            if (pattern0.test(key1)) {
              var data2 = data1[key1];
              var errs_2 = errors;
              if (Array.isArray(data2)) {
                var errs__2 = errors;
                var valid2;
                for (var i2 = 0; i2 < data2.length; i2++) {
                  var errs_3 = errors;
                  if (typeof data2[i2] !== "string") {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.selected[\'' + key1 + '\'][' + i2 + ']',
                      schemaPath: '#/properties/selected/patternProperties/.*/items/type',
                      params: {
                        type: 'string'
                      },
                      message: 'should be string'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
              } else {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.selected[\'' + key1 + '\']',
                  schemaPath: '#/properties/selected/patternProperties/.*/type',
                  params: {
                    type: 'array'
                  },
                  message: 'should be array'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
              var valid2 = errors === errs_2;
            }
          }
          for (var key1 in data1) {
            if (pattern1.test(key1)) {
              var valid2 = false;
              var err = {
                keyword: 'false schema',
                dataPath: (dataPath || '') + '.selected[\'' + key1 + '\']',
                schemaPath: '#/properties/selected/patternProperties/additionalProperties/false schema',
                params: {},
                message: 'boolean schema is false'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.selected',
            schemaPath: '#/properties/selected/type',
            params: {
              type: 'object'
            },
            message: 'should be object'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.backup;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
          var errs__1 = errors;
          var valid2 = true;
          for (var key1 in data1) {
            var isAdditional1 = !(false || pattern0.test(key1));
          }
          for (var key1 in data1) {
            if (pattern0.test(key1)) {
              var data2 = data1[key1];
              var errs_2 = errors;
              if ((data2 && typeof data2 === "object" && !Array.isArray(data2))) {
                var errs__2 = errors;
                var valid3 = true;
                for (var key2 in data2) {
                  var isAdditional2 = !(false || key2 == 'id' || key2 == 'description' || key2 == 'url');
                  if (isAdditional2) {
                    delete data2[key2];
                  }
                }
                var data3 = data2.id;
                if (data3 === undefined) {
                  valid3 = false;
                  var err = {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '.backup[\'' + key1 + '\']',
                    schemaPath: '#/properties/backup/patternProperties/.*/required',
                    params: {
                      missingProperty: 'id'
                    },
                    message: 'should have required property \'id\''
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                } else {
                  var errs_3 = errors;
                  if (typeof data3 !== "string" && data3 !== null) {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.backup[\'' + key1 + '\'].id',
                      schemaPath: '#/properties/backup/patternProperties/.*/properties/id/type',
                      params: {
                        type: 'string,null'
                      },
                      message: 'should be string,null'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                var data3 = data2.description;
                if (data3 !== undefined) {
                  var errs_3 = errors;
                  if (typeof data3 !== "string" && data3 !== null) {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.backup[\'' + key1 + '\'].description',
                      schemaPath: '#/properties/backup/patternProperties/.*/properties/description/type',
                      params: {
                        type: 'string,null'
                      },
                      message: 'should be string,null'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
                if (data2.url === undefined) {
                  valid3 = false;
                  var err = {
                    keyword: 'required',
                    dataPath: (dataPath || '') + '.backup[\'' + key1 + '\']',
                    schemaPath: '#/properties/backup/patternProperties/.*/required',
                    params: {
                      missingProperty: 'url'
                    },
                    message: 'should have required property \'url\''
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                } else {
                  var errs_3 = errors;
                  if (typeof data2.url !== "string") {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.backup[\'' + key1 + '\'].url',
                      schemaPath: '#/properties/backup/patternProperties/.*/properties/url/type',
                      params: {
                        type: 'string'
                      },
                      message: 'should be string'
                    };
                    if (vErrors === null) vErrors = [err];
                    else vErrors.push(err);
                    errors++;
                  }
                  var valid3 = errors === errs_3;
                }
              } else {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.backup[\'' + key1 + '\']',
                  schemaPath: '#/properties/backup/patternProperties/.*/type',
                  params: {
                    type: 'object'
                  },
                  message: 'should be object'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              }
              var valid2 = errors === errs_2;
            }
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.backup',
            schemaPath: '#/properties/backup/type',
            params: {
              type: 'object'
            },
            message: 'should be object'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.appliedMigrations;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            if ((data2 && typeof data2 === "object" && !Array.isArray(data2))) {
              var errs__2 = errors;
              var valid3 = true;
              for (var key2 in data2) {
                var isAdditional2 = !(false || key2 == 'id' || key2 == 'timestamp');
              }
              if (data2.id === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.appliedMigrations[' + i1 + ']',
                  schemaPath: '#/properties/appliedMigrations/items/required',
                  params: {
                    missingProperty: 'id'
                  },
                  message: 'should have required property \'id\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data2.id !== "string") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.appliedMigrations[' + i1 + '].id',
                    schemaPath: '#/properties/appliedMigrations/items/properties/id/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
              if (data2.timestamp === undefined) {
                valid3 = false;
                var err = {
                  keyword: 'required',
                  dataPath: (dataPath || '') + '.appliedMigrations[' + i1 + ']',
                  schemaPath: '#/properties/appliedMigrations/items/required',
                  params: {
                    missingProperty: 'timestamp'
                  },
                  message: 'should have required property \'timestamp\''
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                var errs_3 = errors;
                if (typeof data2.timestamp !== "string") {
                  var err = {
                    keyword: 'type',
                    dataPath: (dataPath || '') + '.appliedMigrations[' + i1 + '].timestamp',
                    schemaPath: '#/properties/appliedMigrations/items/properties/timestamp/type',
                    params: {
                      type: 'string'
                    },
                    message: 'should be string'
                  };
                  if (vErrors === null) vErrors = [err];
                  else vErrors.push(err);
                  errors++;
                }
                var valid3 = errors === errs_3;
              }
            } else {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.appliedMigrations[' + i1 + ']',
                schemaPath: '#/properties/appliedMigrations/items/type',
                params: {
                  type: 'object'
                },
                message: 'should be object'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.appliedMigrations',
            schemaPath: '#/properties/appliedMigrations/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
    } else {
      var err = {
        keyword: 'type',
        dataPath: (dataPath || '') + "",
        schemaPath: '#/type',
        params: {
          type: 'object'
        },
        message: 'should be object'
      };
      if (vErrors === null) vErrors = [err];
      else vErrors.push(err);
      errors++;
    }
    validate.errors = vErrors;
    return errors === 0;
  };
})();
validate.schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://nevergreen.io/schema.json",
  "title": "Nevergreen",
  "description": "Nevergreen settings",
  "type": "object",
  "properties": {
    "settings": {
      "type": "object",
      "properties": {
        "showTrayName": {
          "type": "boolean"
        },
        "showBuildTime": {
          "type": "boolean"
        },
        "showBuildLabel": {
          "type": "boolean"
        },
        "showSystemNotifications": {
          "type": "boolean"
        },
        "playBrokenBuildSoundFx": {
          "type": "boolean"
        },
        "brokenBuildSoundFx": {
          "type": ["string", "null"]
        },
        "refreshTime": {
          "type": "number"
        },
        "maxProjectsToShow": {
          "type": "string",
          "enum": ["small", "medium", "large", "all"]
        },
        "clickToShowMenu": {
          "type": "boolean"
        },
        "showPrognosis": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "sort": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "trays": {
      "type": "object",
      "patternProperties": {
        ".*": {
          "type": "object",
          "properties": {
            "trayId": {
              "type": "string"
            },
            "url": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "serverType": {
              "type": "string"
            },
            "authType": {
              "type": "string"
            },
            "username": {
              "type": ["string", "null"]
            },
            "encryptedPassword": {
              "type": ["string", "null"]
            },
            "encryptedAccessToken": {
              "type": ["string", "null"]
            },
            "timestamp": {
              "type": ["string", "null"]
            },
            "includeNew": {
              "type": "boolean"
            }
          },
          "required": ["trayId", "url"],
          "additionalProperties": false
        }
      }
    },
    "projects": {
      "type": "object",
      "patternProperties": {
        ".*": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "projectId": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "removed": {
                "type": "boolean"
              },
              "isNew": {
                "type": "boolean"
              },
              "trayId": {
                "type": "string"
              }
            },
            "required": ["projectId", "description", "trayId"],
            "additionalProperties": false
          }
        }
      }
    },
    "success": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "additionalProperties": false
    },
    "selected": {
      "type": "object",
      "patternProperties": {
        ".*": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "additionalProperties": false
      },
      "additionalProperties": false
    },
    "backup": {
      "type": "object",
      "patternProperties": {
        ".*": {
          "type": "object",
          "properties": {
            "id": {
              "type": ["string", "null"]
            },
            "description": {
              "type": ["string", "null"]
            },
            "url": {
              "type": "string"
            }
          },
          "required": ["id", "url"],
          "additionalProperties": false
        }
      }
    },
    "appliedMigrations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "timestamp": {
            "type": "string"
          }
        },
        "required": ["id", "timestamp"],
        "additionalItems": false
      }
    }
  },
  "additionalProperties": false
};
validate.errors = null;
module.exports = validate;