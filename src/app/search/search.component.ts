import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CkanService } from '../ckan.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchResults$: Observable<any> | undefined;
  @Output() search = new EventEmitter<string>();

  constructor(private ckanService: CkanService) {}

  onSearch(event: Event): void {
    const inputValue = (event!.target as HTMLInputElement)!.value
    this.searchResults$ = this.ckanService.searchDatasets(inputValue)
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged(), // Ignore if next search term is same as previous
        switchMap(term => term ? this.ckanService.searchDatasets(term) : of([])),
        catchError(error => {
          console.error(error);
          return of([]);
        })
      );
  }




}
