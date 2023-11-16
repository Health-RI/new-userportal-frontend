import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CkanService } from '../ckan.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  allResults: any[] = [];
  filteredResults: any[] = [];
  selectedGroup: string | undefined;
  selectedLicense: string | undefined;
  selectedFormat: string | undefined;

  constructor(private route: ActivatedRoute, private ckanService: CkanService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      this.loadSearchResults(query);
    });
  }

  loadSearchResults(query: string): void {
    // Replace with actual API call to fetch data
    this.ckanService.searchDatasets(query).subscribe(data => {
      //this.allResults = data.results;
      this.filterResults();
    });
  }

  filterResults(): void {
    this.filteredResults = this.allResults.filter(item =>
      (!this.selectedGroup || item.group === this.selectedGroup) &&
      (!this.selectedLicense || item.license === this.selectedLicense) &&
      (!this.selectedFormat || item.format === this.selectedFormat)
    );
  }

  onFilterChange(): void {
    this.filterResults();
  }
}
