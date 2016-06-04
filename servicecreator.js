function createTranslationService(execlib, ParentServicePack, translationlib) {
  'use strict';
  var ParentService = ParentServicePack.Service,
    execSuite = execlib.execSuite,
    lib = execlib.lib,
    qlib = lib.qlib;

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function TranslationService(prophash) {
    ParentService.call(this, prophash);
    var st = lib.extend(prophash.storage, {
        propertyhash: {
          table: 'vocabulary'
        }
      });
    console.log(st);
    this.startSubServiceStatically('allex_vocabularydataservice', 'vocabulary', {
      storage: st
    });
  }
  
  ParentService.inherit(TranslationService, factoryCreator);
  
  TranslationService.prototype.__cleanUp = function() {
    ParentService.prototype.__cleanUp.call(this);
  };

  TranslationService.prototype.translate = execSuite.dependentServiceMethod(['vocabulary'], [], function (vocabulary, thingy, language, defer) {
    var job = new translationlib.Translator(vocabulary, language);
    qlib.promise2defer(job.go(thingy), defer);
  });

  TranslationService.prototype.propertyHashDescriptor = {
    storage: {
      type: 'object'
    }
  };
  
  return TranslationService;
}

module.exports = createTranslationService;
