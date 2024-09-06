// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import {
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import ngfLogo from "../public/thumbnail_Logo NGF_met_kaart.png";
import euLogo from "../public/thumbnail_NL_Funded_by_NextGenEU_vert_RGB_WHITE_OUTLINE.png";

function Footer() {
  return (
    <footer className="mt-8 flex flex-col items-center justify-between gap-y-4 border-t-4 border-t-primary bg-primary p-7 text-white md:flex-row md:gap-x-4 md:gap-y-0">
      <div className="flex flex-col gap-2">
        {/* <Image src={flag} alt="EU flag" width={80} /> */}
        <div className="text-s items-left flex flex-col md:text-sm lg:w-1/2">
          <p>
            Health-RI heeft geld ontvangen van de Europese Unie&rsquo;s
            NextGenerationEU en het Nationaal Groeifonds.
          </p>
        </div>
        <div>
          <div className="flex grid-cols-3">
            <div>
              <Image
                src={euLogo}
                alt="Logo gefinancierd door de Europese Unie"
                className="ml-auto h-32 max-h-full object-scale-down pr-1"
              />
            </div>
            <div>
              <Image
                src={ngfLogo}
                alt="Nationaal Groeifonds logo"
                className="ml-auto h-32 max-h-full object-scale-down pr-1"
              />
            </div>
            <p className=""></p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs md:text-sm lg:w-1/3">
          {/* GDI project receives funding from the European Union’s Digital Europe
          <br />
          Programme under grant agreement number 101081813. */}
          Health-RI is een Nederlands initiatief gericht op het faciliteren en
          stimuleren van een geïntegreerde (data)infrastructuur voor
          gezondheidsgegevens, toegankelijk voor onderzoekers, burgers,
          zorgverleners en het bedrijfsleven. Deze infrastructuur maakt het
          optimaal gebruiken van gezondheidsgegevens, lichaamsmateriaal- en
          monsters en medische beelden mogelijk. Het draagt daarnaast bij aan
          een lerend zorgsysteem en het sneller mogelijk maken van
          gepersonaliseerde gezondheid.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-center gap-11 text-warning">
          <a
            href="https://www.linkedin.com/company/health-ri/"
            target="_blank"
            rel="noopener"
            // className="hover:text-info"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-lg md:text-2xl"
            />
          </a>
          <a
            color="primary"
            href="https://twitter.com/health__ri"
            target="_blank"
            rel="noopener"
            // className="hover:text-info"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="text-lg md:text-2xl"
            />
          </a>
          <a
            color="primary"
            href="https://www.youtube.com/channel/UCOnAoZWtUjuDZE8ZjnYeBtA"
            target="_blank"
            rel="noopener"
            // className="hover:text-info"
          >
            <FontAwesomeIcon icon={faYoutube} className="text-lg md:text-2xl" />
          </a>
          <a
            color="primary"
            href="https://www.health-ri.nl/"
            target="_blank"
            rel="noopener"
            // className="hover:text-info"
          >
            <FontAwesomeIcon icon={faGlobe} className="text-lg md:text-2xl" />
          </a>
        </div>
        <a
          className="text-xs md:text-left md:text-sm"
          href="mailto:datacatalogue@health-ri.nl"
        >
          datacatalogue&#64;health-ri.nl
        </a>
      </div>
    </footer>
  );
}

export default Footer;
