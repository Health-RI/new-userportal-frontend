export const environment = {
    production: true,
    backendUrl: process.env["BACKEND_URL"] || "",
    identityServerUrl: process.env["IDENTITY_SERVER_URL"] || "",  // KeyCloak url + REALM 
    identityServerClientId: process.env["IDENTITY_SERVER_CLIENT_ID"] || "gdi-userportal-app" // Replace with your client ID
}
