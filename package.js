Package.describe({
  name: 'clinical:hipaa-logger',
  version: '2.1.6',
  summary: 'Write HIPAA events to a logging collection.  No UI provided.',
  git: 'http://github.com/clinical-meteor/hipaa-logger',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-base@1.4.0');
  api.use('ecmascript@0.13.0');
  api.use('react-meteor-data@2.1.2');
  api.use('session');
  api.use('mongo');

  api.use('clinical:hl7-fhir-data-infrastructure@6.23.6');

  api.addFiles('lib/HipaaLog.js');
  api.addFiles('lib/HipaaLogger.js');

  api.addFiles('server/methods.js', 'server');

  api.export('HipaaLogger');
  api.export('HipaaLog');
});

Npm.depends({
  "simpl-schema": "1.10.2",
  "lodash": "4.17.21"
})