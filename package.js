Package.describe({
  name: 'roni:accounts-okta',
  version: '0.1.0',
  summary: 'Meteor login service for Okta accounts.',
  git: 'https://github.com/rohundhar/meteor-accounts-okta',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  // Meteor Version 
  api.versionsFrom('1.8.0.2');

  api.use(['accounts-base', 'ecmascript'], ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('roni:okta@0.1.0', ['client', 'server']);

  api.addFiles('okta.js');

});
