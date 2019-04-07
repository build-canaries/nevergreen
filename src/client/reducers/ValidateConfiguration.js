'use strict';
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
        var isAdditional0 = !(false || key0 == 'audioVisual' || key0 == 'trays' || key0 == 'projects' || key0 == 'success' || key0 == 'selected' || key0 == 'github' || key0 == 'gitlab');
        if (isAdditional0) {
          delete data[key0];
        }
      }
      var data1 = data.audioVisual;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
          var errs__1 = errors;
          var valid2 = true;
          for (var key1 in data1) {
            var isAdditional1 = !(false || validate.schema.properties.audioVisual.properties.hasOwnProperty(key1));
            if (isAdditional1) {
              delete data1[key1];
            }
          }
          if (data1.showTrayName !== undefined) {
            var errs_2 = errors;
            if (typeof data1.showTrayName !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.audioVisual.showTrayName',
                schemaPath: '#/properties/audioVisual/properties/showTrayName/type',
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
                dataPath: (dataPath || '') + '.audioVisual.showBuildTime',
                schemaPath: '#/properties/audioVisual/properties/showBuildTime/type',
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
          if (data1.showBrokenBuildTime !== undefined) {
            var errs_2 = errors;
            if (typeof data1.showBrokenBuildTime !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.audioVisual.showBrokenBuildTime',
                schemaPath: '#/properties/audioVisual/properties/showBrokenBuildTime/type',
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
                dataPath: (dataPath || '') + '.audioVisual.showBuildLabel',
                schemaPath: '#/properties/audioVisual/properties/showBuildLabel/type',
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
                dataPath: (dataPath || '') + '.audioVisual.showSystemNotifications',
                schemaPath: '#/properties/audioVisual/properties/showSystemNotifications/type',
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
                dataPath: (dataPath || '') + '.audioVisual.playBrokenBuildSoundFx',
                schemaPath: '#/properties/audioVisual/properties/playBrokenBuildSoundFx/type',
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
                dataPath: (dataPath || '') + '.audioVisual.brokenBuildSoundFx',
                schemaPath: '#/properties/audioVisual/properties/brokenBuildSoundFx/type',
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
                dataPath: (dataPath || '') + '.audioVisual.refreshTime',
                schemaPath: '#/properties/audioVisual/properties/refreshTime/type',
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
          if (data1.maxProjectsToShow !== undefined) {
            var errs_2 = errors;
            if (typeof data1.maxProjectsToShow !== "number") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.audioVisual.maxProjectsToShow',
                schemaPath: '#/properties/audioVisual/properties/maxProjectsToShow/type',
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
          if (data1.clickToShowMenu !== undefined) {
            var errs_2 = errors;
            if (typeof data1.clickToShowMenu !== "boolean") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.audioVisual.clickToShowMenu',
                schemaPath: '#/properties/audioVisual/properties/clickToShowMenu/type',
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
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.audioVisual',
            schemaPath: '#/properties/audioVisual/type',
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
                  var isAdditional2 = !(false || key2 == 'trayId' || key2 == 'url' || key2 == 'name' || key2 == 'serverType' || key2 == 'username' || key2 == 'password' || key2 == 'timestamp' || key2 == 'includeNew');
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
                var data3 = data2.password;
                if (data3 !== undefined) {
                  var errs_3 = errors;
                  if (typeof data3 !== "string" && data3 !== null) {
                    var err = {
                      keyword: 'type',
                      dataPath: (dataPath || '') + '.trays[\'' + key1 + '\'].password',
                      schemaPath: '#/properties/trays/patternProperties/.*/properties/password/type',
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
              if ((data2 && typeof data2 === "object" && !Array.isArray(data2))) {
                var errs__2 = errors;
                var valid3 = true;
                for (var key2 in data2) {
                  var isAdditional2 = !(false || pattern0.test(key2));
                }
                for (var key2 in data2) {
                  if (pattern0.test(key2)) {
                    var data3 = data2[key2];
                    var errs_3 = errors;
                    if ((data3 && typeof data3 === "object" && !Array.isArray(data3))) {
                      var errs__3 = errors;
                      var valid4 = true;
                      for (var key3 in data3) {
                        var isAdditional3 = !(false || key3 == 'projectId' || key3 == 'name' || key3 == 'stage' || key3 == 'removed' || key3 == 'isNew');
                        if (isAdditional3) {
                          delete data3[key3];
                        }
                      }
                      if (data3.projectId === undefined) {
                        valid4 = false;
                        var err = {
                          keyword: 'required',
                          dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][\'' + key2 + '\']',
                          schemaPath: '#/properties/projects/patternProperties/.*/patternProperties/.*/required',
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
                            dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][\'' + key2 + '\'].projectId',
                            schemaPath: '#/properties/projects/patternProperties/.*/patternProperties/.*/properties/projectId/type',
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
                      if (data3.name === undefined) {
                        valid4 = false;
                        var err = {
                          keyword: 'required',
                          dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][\'' + key2 + '\']',
                          schemaPath: '#/properties/projects/patternProperties/.*/patternProperties/.*/required',
                          params: {
                            missingProperty: 'name'
                          },
                          message: 'should have required property \'name\''
                        };
                        if (vErrors === null) vErrors = [err];
                        else vErrors.push(err);
                        errors++;
                      } else {
                        var errs_4 = errors;
                        if (typeof data3.name !== "string") {
                          var err = {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][\'' + key2 + '\'].name',
                            schemaPath: '#/properties/projects/patternProperties/.*/patternProperties/.*/properties/name/type',
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
                      var data4 = data3.stage;
                      if (data4 !== undefined) {
                        var errs_4 = errors;
                        if (typeof data4 !== "string" && data4 !== null) {
                          var err = {
                            keyword: 'type',
                            dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][\'' + key2 + '\'].stage',
                            schemaPath: '#/properties/projects/patternProperties/.*/patternProperties/.*/properties/stage/type',
                            params: {
                              type: 'string,null'
                            },
                            message: 'should be string,null'
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
                            dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][\'' + key2 + '\'].removed',
                            schemaPath: '#/properties/projects/patternProperties/.*/patternProperties/.*/properties/removed/type',
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
                            dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][\'' + key2 + '\'].isNew',
                            schemaPath: '#/properties/projects/patternProperties/.*/patternProperties/.*/properties/isNew/type',
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
                    } else {
                      var err = {
                        keyword: 'type',
                        dataPath: (dataPath || '') + '.projects[\'' + key1 + '\'][\'' + key2 + '\']',
                        schemaPath: '#/properties/projects/patternProperties/.*/patternProperties/.*/type',
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
                }
              } else {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.projects[\'' + key1 + '\']',
                  schemaPath: '#/properties/projects/patternProperties/.*/type',
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
      var data1 = data.github;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
          var errs__1 = errors;
          var valid2 = true;
          for (var key1 in data1) {
            var isAdditional1 = !(false || key1 == 'gistId' || key1 == 'description' || key1 == 'url');
            if (isAdditional1) {
              delete data1[key1];
            }
          }
          if (data1.gistId !== undefined) {
            var errs_2 = errors;
            if (typeof data1.gistId !== "string") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.github.gistId',
                schemaPath: '#/properties/github/properties/gistId/type',
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
          if (data1.description !== undefined) {
            var errs_2 = errors;
            if (typeof data1.description !== "string") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.github.description',
                schemaPath: '#/properties/github/properties/description/type',
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
          if (data1.url !== undefined) {
            var errs_2 = errors;
            if (typeof data1.url !== "string") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.github.url',
                schemaPath: '#/properties/github/properties/url/type',
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
            dataPath: (dataPath || '') + '.github',
            schemaPath: '#/properties/github/type',
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
      var data1 = data.gitlab;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if ((data1 && typeof data1 === "object" && !Array.isArray(data1))) {
          var errs__1 = errors;
          var valid2 = true;
          for (var key1 in data1) {
            var isAdditional1 = !(false || key1 == 'url' || key1 == 'snippetId');
            if (isAdditional1) {
              delete data1[key1];
            }
          }
          if (data1.url !== undefined) {
            var errs_2 = errors;
            if (typeof data1.url !== "string") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.gitlab.url',
                schemaPath: '#/properties/gitlab/properties/url/type',
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
          if (data1.snippetId !== undefined) {
            var errs_2 = errors;
            if (typeof data1.snippetId !== "string") {
              var err = {
                keyword: 'type',
                dataPath: (dataPath || '') + '.gitlab.snippetId',
                schemaPath: '#/properties/gitlab/properties/snippetId/type',
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
            dataPath: (dataPath || '') + '.gitlab',
            schemaPath: '#/properties/gitlab/type',
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
  "required": [],
  "type": "object",
  "properties": {
    "audioVisual": {
      "type": "object",
      "properties": {
        "showTrayName": {
          "type": "boolean"
        },
        "showBuildTime": {
          "type": "boolean"
        },
        "showBrokenBuildTime": {
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
          "type": "number"
        },
        "clickToShowMenu": {
          "type": "boolean"
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
            "username": {
              "type": ["string", "null"]
            },
            "password": {
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
          "type": "object",
          "patternProperties": {
            ".*": {
              "type": "object",
              "properties": {
                "projectId": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "stage": {
                  "type": ["string", "null"]
                },
                "removed": {
                  "type": "boolean"
                },
                "isNew": {
                  "type": "boolean"
                }
              },
              "required": ["projectId", "name"],
              "additionalProperties": false
            }
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
    "github": {
      "type": "object",
      "properties": {
        "gistId": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "gitlab": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        },
        "snippetId": {
          "type": "string"
        }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
};
validate.errors = null;
module.exports = validate;