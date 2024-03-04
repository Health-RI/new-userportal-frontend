// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";

type SearchBarProps = {
  queryParams: Record<string, string | string[] | undefined>;
};

export function Search({ queryParams }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const params = new URLSearchParams(queryParams as Record<string, string>);
    params.set("page", "1");
    if (!e.target.value || e.target.value.length < 3) params.delete("q");
    else params.set("q", e.target.value);

    router.push(`${pathname}?${params}`);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  
  return (
    <div className="my-6 w-full">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          className="flex-grow border-2 border-r-0 border-primary p-4 text-lg focus:border-primary focus:outline-none"
          type="search"
          value={queryParams?.q}
          onChange={handleQueryChange}
          placeholder="Search datasets..."
          name="search"
          autoComplete="on"
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-secondary p-4 text-white"
        >
          <FontAwesomeIcon icon={faSearch} className="text-white text-lg" />
        </button>
      </form>
    </div>
  );
}

export default Search;
