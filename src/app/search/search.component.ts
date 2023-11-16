import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CkanService } from '../ckan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchResults$: Observable<any[]> | undefined;
  @Output() search = new EventEmitter<string>();

  constructor(private ckanService: CkanService,
    private router: Router) { }

  onSearch(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchResults$ = this.ckanService.searchDatasets(inputValue)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        catchError(error => {
          console.error(error);
          return of([]);
        })
      );
  }


  onSelectItem(item: any): void {
    this.router.navigate(['/search-results'], { queryParams: { query: item.value } });
  }
}
