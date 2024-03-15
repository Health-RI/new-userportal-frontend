// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchBarProps = {
  queryParams: Record<string, string | string[] | undefined>;
  size?: "regular" | "large";
};

function SearchBar({ queryParams, size }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  let sizeClass = "h-11";

  if (size === "large") {
    sizeClass = "h-14";
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setQuery(e.target.value);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>): void {
    if (!e.target.value) {
      const params = new URLSearchParams(queryParams as Record<string, string>);
      params.delete("q");
      router.push(`/datasets?${params}`);
    }
  }

  function handleClick(): void {
    const params = new URLSearchParams(queryParams as Record<string, string>);
    params.set("page", "1");
    if (!query) params.delete("q");
    else params.set("q", query);

    router.push(`/datasets?${params}`);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    handleClick();
  }

  return (
    <form onSubmit={handleSubmit} className="text-sm">
      <div className="relative">
        <input
          placeholder="Search"
          className={`${sizeClass} w-full rounded-lg border-2 border-primary px-4 py-[9px] shadow-sm transition-all duration-200 ease-in-out hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary`}
          value={query}
          onChange={handleQueryChange}
          onBlur={handleBlur}
        ></input>
        <div
          className={`${sizeClass} item-stretch absolute bottom-0 right-0 flex border-primary`}
        >
          <button
            type="button"
            className="flex w-full cursor-pointer items-center rounded-r-lg bg-primary px-4 tracking-wide text-white transition-colors duration-200 hover:bg-secondary sm:w-auto"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
