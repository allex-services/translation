function onTranslated(hash, lang, translation) {
  console.log(' === ');
  console.log('original', hash);
  console.log('to', lang);
  console.log('translated', translation);
  console.log(' === ');
}
function doTranslate(qlib, sink, obj, lang) {
  sink.call('translate', obj, lang).then(onTranslated.bind(null, obj, lang));
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
      {caption: 'Small'},
      {caption: 'Medium'},
      {caption: 'Big'}
    ]
  };
  ['sr-lat', 'sr-cyr'].forEach(doTranslate.bind(null, qlib, sink, hash));
}



module.exports = {
  sinkname: 'Translator',
  identity: {name: 'user', role: 'user'},
  task: {
    name: doTest
  }
};
