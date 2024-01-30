// SPDX-FileCopyrightText: 2024 Stichting Health-RI
// SPDX-FileContributor: PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

(function (window) {
  window["env"] = window["env"] || {};

  window["env"]["production"] = false;
  window["env"]["backendUrl"] = "";
  window["env"]["identityServerUrl"] =
    "https://keycloak-test.healthdata.nl/realms/ckan";
  window["env"]["identityServerClientId"] = "ckan";
})(this);
