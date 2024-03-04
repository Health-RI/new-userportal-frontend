// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useState} from "react";
import { useRouter } from "next/navigation";
import { searchDatasets, SearchResult } from "@/services/ckan/search";
import { FiSearch } from "react-icons/fi";

const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  delay: number,
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<F>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const fetchSuggestions = async (term: string) => {
    if (term.trim()) {
      try {
        const results = await searchDatasets(term);
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedFetchSuggestions(term);
  };

  const handleSelectSuggestion = (suggestion: SearchResult) => {
    router.push(`/datasets/${suggestion.id}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className='my-6 w-full'>
      <form className='flex' onSubmit={handleSubmit}>
        <input
          className='flex-grow border-2 border-r-0 border-primary p-4 text-lg focus:border-primary focus:outline-none'
          type='search'
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder='Search datasets...'
          name='search'
          autoComplete='on'
        />
        <button
          type='submit'
          className='flex items-center justify-center bg-secondary p-4 text-white'
        >
          <FiSearch size='20px' />
        </button>
      </form>
      {searchResults.length > 0 && (
        <ul className='mt-2 border border-gray-300'>
          {searchResults.map((result) => (
            <li
              key={result.id}
              className='cursor-pointer p-2 hover:bg-warning'
              onClick={() => handleSelectSuggestion(result)}
            >
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};