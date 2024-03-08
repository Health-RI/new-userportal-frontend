// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Disclaimer() {
  return (
    <div className="md:mt-15 m-5 mt-20 flex flex-row items-center gap-4 rounded-lg bg-warning p-5 text-white">
      <div className="text-2xl">
        <FontAwesomeIcon icon={faExclamationCircle} />
      </div>
      <div className="text-pretty text-xs md:text-sm">
        Voordat u doorgaat, is het belangrijk om te weten dat dit momenteel de test (Beta) versie is
        van de Nationale gezondheidsdatacatalogus. Dit betekent dat op dit moment de zoekopties
        nog zeer beperkt zijn. Bij het implementeren van het DCAT metadata schema worden in de
        ontwikkeling van de catalogus betere zoek en filter methoden aangeboden.
        Onze excuses voor enige instabiliteit en niet-werkende linkjes die u zou kunnen tegenkomen.
      </div>
    </div>
  );
}

export default Disclaimer;
