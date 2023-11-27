import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CkanService } from '../ckan.service';

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

  constructor(private route: ActivatedRoute, private ckanService: CkanService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      this.loadSearchResults(query);
    });
  }

  loadSearchResults(query: string): void {
    this.ckanService.searchDatasets(query).subscribe(data => {
      this.allResults = data;
      this.populateUniquePublishers();
      this.filteredPublishers = [...this.uniquePublishers];
      this.filterResults();
     
    });
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


}
