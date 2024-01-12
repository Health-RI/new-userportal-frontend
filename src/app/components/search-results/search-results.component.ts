import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { CkanService } from '../../services/ckan.service';
import { Filter } from 'src/app/interfaces/filter';
import { PartialDataset } from 'src/app/interfaces/dataset';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  allResults: PartialDataset[] = [];
  results: PartialDataset[] = [];
  totalResults: number = 0;

  currentSearchQuery: string = '';
  currentFilters: Filter[] = [];
  currentFilterQuery: string = '';
  currentSortingField: string = 'relevance desc';

  pageSize: number = 12;
  currentPage: number = 0;
  pageSizeOptions: number[] = [12, 24, 48];

  constructor(
    private route: ActivatedRoute,
    private ckanService: CkanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve all values for filters (must go through all the pages)
    this.ckanService
      .searchDatasets('', '', this.currentSortingField, 0, CkanService.MAX_RESULT_PAGES)
      .subscribe((data) => {
        this.allResults = data.results;
      });

    this.route.queryParams.subscribe((_) => {
      this.loadSearchResults(
        this.currentSearchQuery,
        this.currentFilterQuery,
        this.currentSortingField
      );
    });
  }

  loadSearchResults(query: string, filter: string, sortBy: string): void {
    const start = this.currentPage * this.pageSize;
    this.ckanService
      .searchDatasets(query, filter, sortBy, start, this.pageSize)
      .subscribe((data) => {
        this.results = data.results;
        this.totalResults = data.count;
      });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    this.loadSearchResults(
      this.currentSearchQuery,
      this.currentFilterQuery,
      this.currentSortingField
    );
  }

  onSelectItem(item: any): void {
    const itemId = item.id;
    this.router.navigate(['/datasets', itemId]);
  }

  onClearFilter(): void {
    this.currentFilters = [];
    this.currentFilterQuery = '';
    this.loadSearchResults(
      this.currentSearchQuery,
      this.currentFilterQuery,
      this.currentSortingField
    );
  }

  onReceiveFilter(filter: Filter): void {
    this.updateFilters(filter);
    this.createQuery();
    this.loadSearchResults(
      this.currentSearchQuery,
      this.currentFilterQuery,
      this.currentSortingField
    );
  }

  onSortSelectChange(event: any): void {
    this.currentSortingField = event.target?.value;
    this.loadSearchResults(
      this.currentSearchQuery,
      this.currentFilterQuery,
      this.currentSortingField
    );
  }

  private updateFilters(newFilter: Filter): void {
    const filterLabels = this.currentFilters.map((filter) => filter.label);
    const indexFilter = filterLabels.indexOf(newFilter.label);
    indexFilter === -1
      ? (this.currentFilters = [...this.currentFilters, newFilter])
      : this.updateFilterWithNewValues(newFilter, indexFilter);
  }

  updateFilterWithNewValues(newFilter: Filter, indexOfFilterToUpdate: number): void {
    this.currentFilters = this.currentFilters.map((filter: Filter, idx: number) =>
      idx === indexOfFilterToUpdate ? newFilter : filter
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
    const { ckanLabel: label, values } = filter;
    const separator = label === 'theme' || label === 'format' ? '' : ':';
    const correctedValues =
      label === 'organization'
        ? values.map((value: string) => value.toLowerCase().replaceAll(' ', '-'))
        : values;
    return correctedValues.length === 0
      ? ''
      : `${label}${separator}(${correctedValues.join(' OR ')})+`;
  }
}
