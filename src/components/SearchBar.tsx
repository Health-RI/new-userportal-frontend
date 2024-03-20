// SPDX-FileCopyrightText: 2024 PNED G.I.E.
// SPDX-License-Identifier: Apache-2.0
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { datasetList } from "@/services/ckan";

type SearchBarProps = {
  queryParams: Record<string, string | string[] | undefined>;
  size?: "regular" | "large";
};

function SearchBar({ queryParams, size }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [fetchSuggestions, setFetchSuggestions] = useState(false);
  const router = useRouter();

  let sizeClass = "h-11";
  if (size === "large") {
    sizeClass = "h-14";
  }

  useEffect(() => {
    const initialQuery = Array.isArray(queryParams.q) ? queryParams.q[0] : queryParams.q;
    if (initialQuery) {
      setQuery(initialQuery);
      setFetchSuggestions(false);
    }
  }, [queryParams.q]);

  useEffect(() => {
    if (fetchSuggestions && query.trim()) {
      const timeoutId = setTimeout(async () => {
        const result = await datasetList({ query, limit: 5 });
        setSuggestions(result.datasets.map((dataset) => dataset.title));
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
    }
  }, [query, fetchSuggestions]);

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setQuery(e.target.value);
    setFetchSuggestions(true);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>): void {
    if (!e.target.value) {
      const params = new URLSearchParams(queryParams as Record<string, string>);
      params.delete("q");
      router.push(`/datasets?${params}`);
    }
  }
  
  function redirectToDataset(searchQuery: string): void {
    const params = new URLSearchParams(queryParams as Record<string, string>);
    params.set("page", "1");
    params.set("q", searchQuery);
    router.push(`/datasets?${params}`);
  }

  function handleClick(): void {
    redirectToDataset(query)
  }

  function handleSuggestionClick(suggestion: string) {
    setQuery(suggestion);
    setSuggestions([]);
    redirectToDataset(suggestion);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    redirectToDataset(query);
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
        {suggestions.length > 0 && (
          <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-white-smoke bg-white shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 first:rounded-t-md last:rounded-b-md hover:bg-primary hover:text-white"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
