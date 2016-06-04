function createServicePack(execlib) {
  return execlib.loadDependencies([
    'allex:translation:lib'
  ], realCreator.bind(null, execlib));
}

function realCreator(execlib, translationlib) {
  'use strict';
  var ret = require('./clientside')(execlib),
    execSuite = execlib.execSuite,
    ParentServicePack = execSuite.registry.get('.');

  ret.Service = require('./servicecreator')(execlib, ParentServicePack, translationlib);
  return execlib.lib.q(ret);
}

module.exports = createServicePack;
