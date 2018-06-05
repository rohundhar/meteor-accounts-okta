Package.describe({
  name: 'riffyn:accounts-okta',
  version: '0.1.0',
  summary: 'Meteor login service for Okta accounts.',
  git: 'https://github.com/RiffynInc/meteor-accounts-okta',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.0.1');

  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('riffyn:okta@0.1.0', ['client', 'server']);

  api.addFiles('okta.js');

});
