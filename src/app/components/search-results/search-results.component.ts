import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { CkanService } from '../../services/ckan.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  allResults: any[] = [];
  filteredResults: any[] = [];

  uniquePublishers: string[] = [];
  selectedPublishers: string[] = [];
  filteredPublishers: string[] = [];

  searchTerms = {
    publisher: '',
    // ... other search terms for different filters
  };

  totalResults: number = 0;
  pageSize: number = 12;
  currentPage: number = 0;
  pageSizeOptions: number[] = [12, 24, 48];
  currentSearchQuery: string = '';

  constructor(private route: ActivatedRoute, private ckanService: CkanService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      this.loadSearchResults(query);
    });
  }

  loadSearchResults(query: string): void {
    const start = this.currentPage * this.pageSize;
    this.ckanService.searchDatasets(query, start, this.pageSize).subscribe(data => {
      this.allResults = data.results;
      this.totalResults = data.count;
      this.populateUniquePublishers();
      this.filteredPublishers = [...this.uniquePublishers];
      this.filterResults();
    });
  }

  handlePageEvent(event: PageEvent): void {
    // Update the page size and index
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    this.loadSearchResults(this.currentSearchQuery);

  }



  filterResults(): void {
    if (this.selectedPublishers.length > 0) {
      this.filteredResults = this.allResults.filter(item =>
        this.selectedPublishers.includes(item.publisher_name)
      );
    } else {
      // If no publishers are selected, do not apply any filter
      this.filteredResults = [...this.allResults];
    }
  }

  onFilterChange(): void {
    this.filterResults();
  }

  populateUniquePublishers(): void {
    const publisherNames = this.allResults.map(item => item.publisher_name);
    this.uniquePublishers = Array.from(new Set(publisherNames));
  }

  clearSelectedPublishers(): void {
    this.clearSearchFilter();
    this.selectedPublishers = [];
    this.filterResults();
  }

  searchFilters(): void {
    this.filteredPublishers = this.uniquePublishers.filter(publisher =>
      publisher.toLowerCase().includes(this.searchTerms.publisher.toLowerCase())
    );
    // Repeat for other filters
  }

  clearSearchFilter(): void {
    this.searchTerms.publisher = '';
    this.searchFilters();
    // Repeat for other filters
  }

  onSelectItem(item: any): void {
    const itemId = item.id;
    this.router.navigate(['/item-details', itemId]);
  }
}
