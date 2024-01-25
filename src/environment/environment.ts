export const environment = {
  // @ts-expect-error assets/env.js is loading the values of these variables
  production: window['env']['production'],
  // @ts-expect-error assets/env.js is loading the values of these variables
  backendUrl: window['env']['backendUrl'],
  // @ts-expect-error assets/env.js is loading the values of these variables
  identityServerUrl: window['env']['identityServerUrl'],
  // @ts-expect-error assets/env.js is loading the values of these variables
  identityServerClientId: window['env']['identityServerClientId'],
};
