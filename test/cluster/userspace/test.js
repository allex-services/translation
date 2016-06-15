var util = require('util');

function dump(obj) {
  return util.inspect(obj, {depth:7});
}
function onTranslated(hash, lang, translation) {
  console.log(' === ');
  console.log('original', dump(hash));
  console.log('to', lang);
  console.log('translated', dump(translation));
  console.log(' === ');
}
function doTranslate(qlib, sink, obj, lang) {
  sink.call('translate', obj, lang).then(onTranslated.bind(null, obj, lang));
}
function doMergeTranslate(qlib, sink, obj, lang) {
  sink.call('mergetranslate', obj, lang).then(onTranslated.bind(null, obj, lang));
}
function doTest (taskobj) {
  var sink  = taskobj.sink, qlib, hash, lang;
  if (!sink) {
    process.exit(0);
    return;
  }
  qlib = taskobj.execlib.lib.qlib;
  hash = {
    caption: 'Choose an option',
    options: {
      small: 'Small',
      medium: 'Medium',
      big: 'Big'
    },
    optionsarry: [
      {caption: 'Small', choose: [{name: 'Small'}, 'Big', 'Medium']},
      {caption: 'Medium'},
      {caption: 'Big'}
    ]
  };
  ['sr-lat', 'sr-cyr'].forEach(doTranslate.bind(null, qlib, sink, hash));
  ['sr-lat', 'sr-cyr'].forEach(doMergeTranslate.bind(null, qlib, sink, hash));
}



module.exports = {
  sinkname: 'Translator',
  identity: {name: 'user', role: 'user'},
  task: {
    name: doTest
  }
};
