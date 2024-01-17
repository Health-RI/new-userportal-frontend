(function (window) {
    window['env'] = window['env'] || {};

    window['env']['production'] = false;
    window['env']['backendUrl'] = '';
    window['env']['identityServerUrl'] = 'https://keycloak-test.healthdata.nl/realms/ckan';
    window['env']['identityServerClientId'] = 'ckan';
})(this);