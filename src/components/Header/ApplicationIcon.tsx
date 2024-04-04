// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import Link from "next/link";
import { faFileText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ApplicationIcon() {
  return (
    <Link
      href="/applications"
      className="flex items-center text-info hover:text-primary"
    >
      <FontAwesomeIcon icon={faFileText} size="xl" />
    </Link>
  );
}

export default ApplicationIcon;
