(function (window) {
    window['env'] = window['env'] || {};

    window['env']['production'] = false;
    window['env']['backendUrl'] = '';
    window['env']['identityServerUrl'] = 'https://healthri-keycloack-dev.azurewebsites.net/auth/realms/master';
    window['env']['identityServerClientId'] = 'gdi-userportal-app';
})(this);