// SPDX-FileCopyrightText: 2024 Stichting Health-RI
// SPDX-FileContributor: PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

(function (window) {
  window["env"] = window["env"] || {};

  window["env"]["production"] = true;
  window["env"]["backendUrl"] = "${BACKEND_URL}";
  window["env"]["identityServerUrl"] = "${IDENTITY_SERVER_URL}";
  window["env"]["identityServerClientId"] = "${IDENTITY_SERVER_CLIENT_ID}";
})(this);
