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

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-y-4 border-t-4 border-t-primary bg-primary p-7 text-white md:flex-row md:gap-x-4 md:gap-y-0">
      <div className="flex items-center gap-4">
        {/* <Image src={flag} alt="EU flag" width={80} /> */}
        <p className="text-xs md:text-sm lg:w-1/2">
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
          href="mailto:gdi-coordination@elixir-europe.org"
        >
          datacatalogue&#64;health-ri.nl
        </a>
      </div>
    </footer>
  );
}

export default Footer;
