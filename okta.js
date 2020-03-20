Accounts.oauth.registerService('okta');

if (Meteor.isClient){
  /**
   * Meteor.loginWithOkta(options, callback)
   *
   * This method is used on the client side to summon the Okta login page
   * just like you would with any other accounts package. It utilizes the
   * Accounts Base package.
   *
   * @param options
   * @param callback
   */
  Meteor.loginWithOkta = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    if (typeof Accounts._options.restrictCreationByEmailDomain === 'string') {
      options = options ? { ...options } : {};
      options.loginUrlParameters = options.loginUrlParameters ? { ...options.loginUrlParameters } : {};
      options.loginUrlParameters.hd = Accounts._options.restrictCreationByEmailDomain;
    }

    const credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Okta.requestCredential(options, credentialRequestCompleteCallback);
  };

}else{

  // Since autopublish is OFF on this application for most dev and production work, this does not
  // apply. However, if you choose to re-enable autopublish, then you can use the access token 
  // from the client side. 
  const whitelistedFields = Okta.whitelistedFields.filter( (field) => field !== 'emails');


  Accounts.addAutopublishFields({

    forLoggedInUser:
      // publish access token since it can be used from the client
      Okta.whitelistedFields.concat(['accessToken', 'expiresAt']).map( // don't publish refresh token
      function (subfield) { return 'services.okta.' + subfield; }
    ),

    forOtherUsers:
      // even with autopublish, no legitimate web app should be
      // publishing all users' emails
      whitelistedFields.map(
      function (subfield) { return 'services.okta.' + subfield; })
  });

}
