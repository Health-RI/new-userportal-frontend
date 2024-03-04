// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';

export interface SearchResult {
  id: number;
  title: string;
  description: string;
}

export const searchDatasets = async (searchTerm: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get(`/api/search`, { params: { q: searchTerm } });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
