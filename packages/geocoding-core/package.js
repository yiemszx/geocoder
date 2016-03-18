Package.describe({
  name: 'tmgeo:geocoding-core',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
    "elasticsearch": "9.0.0",
    "node-geocoder": "3.4.1",
    "fast-levenshtein": "1.0.7",
    "csv-parse": "1.0.1",
    "geolib": "2.0.18"
});

Package.onUse(function(api){

  api.versionsFrom(['METEOR@1.0']);

  api.use(["templating", "underscore", "session", "mongo", "ddp"]);

  api.addFiles([

  ], ['client', 'server']);

  api.addFiles([
  ], ['client']);

  api.addFiles([
    'lib/core.js',
    'lib/server/extractor.js',
    'lib/server/export.js',
    'lib/server/concatenator.js'
  ], ['server']);

  api.export('GdsGeocoding', 'server');

});
