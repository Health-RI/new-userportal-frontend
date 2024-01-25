import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { PartialDataset } from 'src/app/interfaces/dataset';
import { Filter } from 'src/app/interfaces/filter';
import { CkanService } from '../../services/ckan.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  results: PartialDataset[] = [];
  totalResults: number = 0;

  currentSearchQuery: string = '';
  currentFilters: Filter[] = [];
  currentFilterQuery: string = '';
  currentSortingField: string = 'score desc';

  pageSize: number = 12;
  currentPage: number = 0;
  pageSizeOptions: number[] = [12, 24, 48];

  constructor(
    private route: ActivatedRoute,
    private ckanService: CkanService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.loadSearchResults(this.currentSearchQuery, this.currentFilterQuery, this.currentSortingField);
    });
  }

  loadSearchResults(query: string, filter: string, sortBy: string): void {
    const start = this.currentPage * this.pageSize;
    this.ckanService.searchDatasets(query, filter, sortBy, start, this.pageSize).subscribe((data) => {
      this.results = data.results;
      this.totalResults = data.count;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    this.loadSearchResults(this.currentSearchQuery, this.currentFilterQuery, this.currentSortingField);
  }

  onSelectItem(item: any): void {
    const itemId = item.id;
    this.router.navigate(['/datasets', itemId]);
  }

  onClearFilter(): void {
    this.currentFilters = [];
    this.currentFilterQuery = '';
    this.loadSearchResults(this.currentSearchQuery, this.currentFilterQuery, this.currentSortingField);
  }

  onReceiveFilter(filter: Filter): void {
    this.updateFilters(filter);
    this.createQuery();
    this.loadSearchResults(this.currentSearchQuery, this.currentFilterQuery, this.currentSortingField);
  }

  onSortSelectChange(event: Event): void {
    this.currentSortingField = (event.target as HTMLSelectElement).value;
    this.loadSearchResults(this.currentSearchQuery, this.currentFilterQuery, this.currentSortingField);
  }

  private updateFilters(newFilter: Filter): void {
    const filterLabels = this.currentFilters.map((filter) => filter.label);
    const indexFilter = filterLabels.indexOf(newFilter.label);
    indexFilter === -1
      ? (this.currentFilters = [...this.currentFilters, newFilter])
      : this.updateFilterWithNewValues(newFilter, indexFilter);
  }

  private updateFilterWithNewValues(newFilter: Filter, indexOfFilterToUpdate: number): void {
    this.currentFilters = this.currentFilters.map((filter: Filter, idx: number) =>
      idx === indexOfFilterToUpdate ? newFilter : filter,
    );
  }

  private createQuery(): void {
    this.currentFilterQuery = this.currentFilters
      .map((filter: Filter) => {
        return {
          ...filter,
          values: this.handleFilterValuesWithSpace(filter.values),
        };
      })
      .map(this.createQueryFromFilter)
      .reduce((acc: string, str: string) => acc + str, '');
  }

  private handleFilterValuesWithSpace(values: string[]) {
    return values.map((value: string) => (value.includes(' ') ? `"${value}"` : value));
  }

  private createQueryFromFilter(filter: Filter): string {
    const { ckanProp, values } = filter;
    const separator = ckanProp === 'theme' || ckanProp === 'format' ? '' : ':';
    const correctedValues =
      ckanProp === 'organization' ? values.map((value: string) => value.toLowerCase().replaceAll(' ', '-')) : values;
    return correctedValues.length === 0 ? '' : `${ckanProp}${separator}(${correctedValues.join(' OR ')})+`;
  }
}
