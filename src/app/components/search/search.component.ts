// SPDX-FileCopyrightText: 2024 Stichting Health-RI
// SPDX-FileContributor: PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { Component } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CkanService } from '../../services/ckan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchResults$: Observable<any[]> | undefined;
  searchTerm: string = '';

  constructor(
    private ckanService: CkanService,
    private router: Router,
  ) {}

  onSearch(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchResults$ = this.ckanService.searchDatasets(inputValue).pipe(
      map((response) => response.results),
      debounceTime(300),
      distinctUntilChanged(),
      catchError((error) => {
        console.error(error);
        return of([]);
      }),
    );
  }

  onSubmit(): void {
    if (this.searchTerm) {
      this.router.navigate(['/datasets'], { queryParams: { query: this.searchTerm } });
    }
  }

  onSelectItem(item: any): void {
    const itemId = item.id;
    this.searchTerm = '';
    this.router.navigate(['/datasets', itemId]);
  }

  resetSearchInput(): void {}
}
