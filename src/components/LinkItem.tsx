// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SPDX-License-Identifier: Apache-2.0

import { SidebarLink } from "./Sidebar";

type LinkItemProps = {
  link: SidebarLink;
};

function LinkItem({ link }: LinkItemProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="hover:underline"
    >
      {link.label}
    </a>
  );
}

export default LinkItem;
